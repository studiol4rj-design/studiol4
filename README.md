# Studio L4

Website institucional estático da Studio L4.

A raiz do repositório contém a versão publicada do site. A pasta `reestruturacao-studiol4/` permanece como registro da etapa offline de reformulação aprovada.

## Estrutura publicada

- `index.html`: página inicial institucional.
- `solucoes.html`: visão geral das frentes de serviço.
- `criacao-de-sites.html`: criação e reformulação de sites.
- `sistemas-personalizados.html`: sistemas sob medida para empresas.
- `presenca-digital.html`: presença digital, identidade e materiais.
- `inteligencia-artificial-automacao.html`: IA aplicada e automações práticas.
- `projetos.html`: projetos autorizados.
- `sobre.html`: apresentação institucional da Studio L4.
- `contato.html`: canais de atendimento, WhatsApp, e-mail e formulário.
- `politica-de-privacidade.html`: política de privacidade.
- `termos-de-uso.html`: termos de uso.
- `styles.css`: sistema visual, responsividade, fundos por seção e componentes.
- `script.js`: menu mobile, animações, formulário para WhatsApp e filtros.
- `robots.txt` e `sitemap.xml`: arquivos de SEO.
- `CNAME`: domínio customizado do GitHub Pages.

## Pastas auxiliares

- `reestruturacao-studiol4/`: cópia da reformulação desenvolvida e revisada offline.
- `backup-primeiro-site/`: backup local do primeiro site, ignorado pelo Git.
- `arquivos-originais-locais/`: arquivos locais sensíveis ou pesados, ignorados pelo Git.

## Instalação e execução local

Não há dependências de build. O site é estático e pode ser aberto diretamente pelo navegador.

Para servir localmente, use qualquer servidor estático apontando para a raiz do repositório. Exemplo:

```text
python -m http.server 8765
```

Depois acesse:

```text
http://127.0.0.1:8765/index.html
```

## Build e testes

Não existe etapa de build configurada, pois não há `package.json`, bundler ou dependências externas.

Validações recomendadas antes de cada publicação:

- executar checagem de sintaxe do JavaScript;
- revisar links internos e assets referenciados;
- abrir a página inicial e páginas internas em servidor local;
- conferir responsividade em desktop, tablet e celular;
- revisar SEO, canonical, sitemap e robots;
- confirmar que não há arquivos de ambiente reais versionados.

## Variáveis de ambiente

O site da Studio L4 não utiliza variáveis de ambiente.

Arquivos reais como `.env`, `.env.local` e variações não devem ser versionados. O `.gitignore` bloqueia esses arquivos e permite apenas exemplos como `.env.example`.

## Publicação

O projeto pode ser publicado em GitHub Pages ou outro provedor que sirva sites estáticos a partir da raiz do repositório.

Fluxo seguro:

1. Revisar o estado do Git.
2. Validar HTML, CSS, JavaScript, links e assets.
3. Criar commit organizado.
4. Enviar ao GitHub somente após autorização.
5. Conferir a página publicada após a atualização do provedor.

## Segurança

- `backup-primeiro-site/` não deve ser versionado.
- `arquivos-originais-locais/` não deve ser versionado.
- `fp-peritus/` não faz parte deste website.
- Nenhum `push`, `merge`, deploy ou alteração de infraestrutura deve ser feito sem autorização expressa.
