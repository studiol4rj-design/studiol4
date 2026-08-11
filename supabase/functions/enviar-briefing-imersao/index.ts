const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ALLOWED_ORIGIN =
  Deno.env.get("ALLOWED_ORIGIN") ?? "https://studiol4.com.br";

const DESTINATARIO = "studiol4rj@gmail.com";
const REMETENTE = "Studio L4 <briefing@studiol4.com.br>";

const FIELD_LABELS: Record<string, string> = {
  nome_negocio: "Nome da empresa, marca ou atividade",
  nome_projeto: "Nome ou título do projeto",
  tipo_projeto: "Tipo de projeto",
  descricao_negocio: "Descrição do negócio",
  segmento: "Segmento de atuação",
  area_atendimento: "Área geográfica de atendimento",
  historia_negocio: "História do negócio",
  servicos_produtos: "Principais serviços ou produtos",
  diferenciais: "Diferenciais do negócio",
  valores: "Valores e princípios",
  publico_alvo: "Público-alvo",
  necessidades_publico: "Necessidades do público",
  percepcao_marca: "Percepção desejada para a marca",
  caracteristicas_marca: "Características da marca",
  objetivo_principal: "Objetivo principal",
  resultados_esperados: "Resultados esperados",
  acao_principal: "Ação principal do usuário",
  possui_logotipo: "Situação do logotipo",
  possui_manual: "Manual de identidade visual",
  cores_marca: "Cores da marca",
  cores_evitar: "Cores que devem ser evitadas",
  estilo_visual: "Estilo visual",
  descricao_estilo: "Descrição do estilo desejado",
  elementos_evitar: "Elementos visuais que devem ser evitados",
  referencias_gosta: "Referências visuais apreciadas",
  referencias_nao_gosta: "Referências não apreciadas",
  concorrentes: "Concorrentes",
  diferenciacao_concorrentes: "Diferenciação em relação aos concorrentes",
  materiais_disponiveis: "Materiais disponíveis",
  origem_imagens: "Origem das imagens",
  informacoes_obrigatorias: "Informações obrigatórias",
  slogan: "Slogan ou frase institucional",
  restricoes_conteudo: "Restrições de conteúdo",
  paginas_site: "Páginas ou seções do site",
  outras_paginas: "Outras páginas",
  destaque_inicial: "Destaque da página inicial",
  recursos_site: "Recursos do site",
  problema_sistema: "Problema que o sistema deverá resolver",
  usuarios_sistema: "Usuários do sistema",
  processo_atual: "Processo operacional atual",
  funcionalidades_sistema: "Funcionalidades do sistema",
  outras_funcionalidades_sistema: "Outras funcionalidades do sistema",
  informacoes_dashboard: "Informações do painel inicial",
  perfis_acesso: "Perfis e níveis de acesso",
  dados_cadastrados: "Dados que serão cadastrados",
  relatorios: "Relatórios e indicadores",
  integracoes: "Integrações necessárias",
  prioridades: "Prioridades do projeto",
  observacoes: "Informações complementares",
};

function corsHeaders(origin: string | null): HeadersInit {
  const origemPermitida =
    origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;

  return {
    "Access-Control-Allow-Origin": origemPermitida,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function labelFor(field: string): string {
  return FIELD_LABELS[field] ??
    field.replaceAll("_", " ").replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(escapeHtml).join("<br>");
  }

  return escapeHtml(String(value ?? "").trim())
    .replaceAll("\n", "<br>");
}

function assertPayloadSize(req: Request): void {
  const contentLength = Number(req.headers.get("content-length") ?? "0");

  if (contentLength > 150_000) {
    throw new Error("PAYLOAD_TOO_LARGE");
  }
}

function validateSubmission(data: Record<string, unknown>): string | null {
  if (String(data.website ?? "").trim() !== "") {
    return "SPAM";
  }

  const name = String(data.nome_negocio ?? "").trim();

  if (name.length < 2 || name.length > 160) {
    return "Nome da empresa inválido.";
  }

  const requiredFields = [
    "descricao_negocio",
    "segmento",
    "servicos_produtos",
    "diferenciais",
    "publico_alvo",
    "percepcao_marca",
    "objetivo_principal",
    "possui_logotipo",
    "referencias_gosta",
    "informacoes_obrigatorias",
    "confirmacao",
  ];

  for (const field of requiredFields) {
    if (!String(data[field] ?? "").trim()) {
      return `Campo obrigatório ausente: ${labelFor(field)}.`;
    }
  }

  const types = Array.isArray(data.tipo_projeto)
    ? data.tipo_projeto
    : [data.tipo_projeto].filter(Boolean);

  const styles = Array.isArray(data.estilo_visual)
    ? data.estilo_visual
    : [data.estilo_visual].filter(Boolean);

  if (types.length === 0) {
    return "Selecione o tipo de projeto.";
  }

  if (styles.length === 0) {
    return "Selecione ao menos um estilo visual.";
  }

  const startedAt = Date.parse(String(data.formulario_iniciado_em ?? ""));

  if (Number.isFinite(startedAt) && Date.now() - startedAt < 3_000) {
    return "SPAM";
  }

  return null;
}

function createEmailHtml(data: Record<string, unknown>): string {
  const ignored = new Set([
    "website",
    "confirmacao",
    "formulario_iniciado_em",
  ]);

  const rows = Object.entries(data)
    .filter(([field]) => !ignored.has(field))
    .filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return String(value ?? "").trim() !== "";
    })
    .map(([field, value]) => `
      <tr>
        <td style="width:34%;padding:14px;vertical-align:top;font-weight:700;color:#374151;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
          ${escapeHtml(labelFor(field))}
        </td>
        <td style="padding:14px;vertical-align:top;color:#111827;line-height:1.55;border-bottom:1px solid #e5e7eb;">
          ${formatValue(value)}
        </td>
      </tr>
    `)
    .join("");

  return `<!DOCTYPE html>
  <html lang="pt-BR">
    <body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#111827;background:#f3f4f6;">
      <div style="width:100%;max-width:800px;margin:0 auto;overflow:hidden;background:#ffffff;border-radius:14px;">
        <div style="padding:30px;color:#ffffff;background:#312e81;">
          <div style="margin-bottom:8px;color:#c4b5fd;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">
            Studio L4
          </div>
          <h1 style="margin:0 0 10px;font-size:25px;">Novo briefing de imersão</h1>
          <p style="margin:0;color:#e5e7eb;line-height:1.5;">
            Foi enviado um novo formulário de direcionamento visual e funcional.
          </p>
        </div>

        <div style="padding:28px;">
          <div style="margin-bottom:22px;padding:18px;background:#f5f3ff;border-left:4px solid #6d28d9;border-radius:8px;">
            <strong style="display:block;margin-bottom:5px;">Empresa ou marca</strong>
            ${escapeHtml(data.nome_negocio)}
          </div>

          <table style="width:100%;border-collapse:collapse;">
            <tbody>${rows}</tbody>
          </table>
        </div>

        <div style="padding:20px 28px;font-size:12px;line-height:1.5;color:#6b7280;background:#f9fafb;">
          E-mail gerado automaticamente pelo formulário interno de briefing da Studio L4.
        </div>
      </div>
    </body>
  </html>`;
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  if (req.method !== "POST") {
    return json({ erro: "Método não permitido." }, 405, origin);
  }

  if (origin && origin !== ALLOWED_ORIGIN) {
    return json({ erro: "Origem não autorizada." }, 403, origin);
  }

  try {
    assertPayloadSize(req);

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada.");
      return json({ erro: "Serviço de envio não configurado." }, 500, origin);
    }

    const data = await req.json() as Record<string, unknown>;
    const validationError = validateSubmission(data);

    if (validationError === "SPAM") {
      return json({ sucesso: true }, 200, origin);
    }

    if (validationError) {
      return json({ erro: validationError }, 400, origin);
    }

    const companyName = String(data.nome_negocio).trim();
    const subject = `Briefing de imersão - ${companyName}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: REMETENTE,
        to: [DESTINATARIO],
        subject,
        html: createEmailHtml(data),
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Erro do Resend:", resendResult);
      return json(
        { erro: "O serviço de e-mail recusou o envio." },
        502,
        origin,
      );
    }

    return json(
      {
        sucesso: true,
        mensagem: "Briefing enviado com sucesso.",
        id: resendResult.id,
      },
      200,
      origin,
    );
  } catch (error) {
    if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
      return json({ erro: "Formulário excedeu o tamanho permitido." }, 413, origin);
    }

    console.error("Erro inesperado:", error);
    return json({ erro: "Erro interno ao enviar o briefing." }, 500, origin);
  }
});
