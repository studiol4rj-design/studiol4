# Studio L4

Website institucional estático da Studio L4.

Este repositório mantém a versão publicada atual na raiz e a reformulação revisada em `reestruturacao-studiol4/` até a aprovação final de substituição.

## Estrutura atual

- `index.html`, `styles.css`, `script.js`: versão atualmente publicada na raiz.
- `robots.txt`, `sitemap.xml`, `CNAME`: arquivos de publicação e domínio da versão atual.
- `*.png`, `*.webp`, `favicon*`, `apple-touch-icon.png`: ativos visuais compartilhados.
- `arquivos-originais-locais/`: backup local de arquivos originais, fora do versionamento.
- `reestruturacao-studiol4/`: nova versão institucional preparada offline.

## Nova estrutura do website

A reformulação em `reestruturacao-studiol4/` é composta por páginas estáticas em HTML, CSS e JavaScript puro:

- `index.html`: página inicial institucional.
- `solucoes.html`: visão geral das frentes de serviço.
- `criacao-de-sites.html`: página de criação e reformulação de sites.
- `sistemas-personalizados.html`: página de sistemas personalizados.
- `presenca-digital.html`: página de presença digital e identidade.
- `inteligencia-artificial-automacao.html`: página de IA e automação.
- `projetos.html`: projetos autorizados.
- `sobre.html`: posicionamento e apresentação da Studio L4.
- `contato.html`: atendimento, WhatsApp, e-mail e formulário.
- `politica-de-privacidade.html`: política de privacidade.
- `termos-de-uso.html`: termos de uso.
- `styles.css`: sistema visual responsivo, fundos por seção, grid, formulários e rodapé.
- `script.js`: menu mobile, animações de entrada, formulário para WhatsApp e filtros.
- `robots.txt` e `sitemap.xml`: arquivos de SEO para a nova estrutura.
- `content-architecture.md`: referência editorial para expansão futura.

## Instalação e execução local

Não há dependências de build. O projeto é estático.

Para visualizar a versão atual publicada, abra `index.html` na raiz.

Para visualizar a reformulação offline, abra:

```text
reestruturacao-studiol4/index.html
```

Também é possível servir localmente com qualquer servidor estático apontando para `reestruturacao-studiol4/`.

## Build e testes

Não existe etapa de build configurada, pois não há `package.json`, bundler ou dependências externas.

Validações recomendadas antes da publicação:

- executar checagem de sintaxe do JavaScript;
- revisar links internos e assets referenciados;
- abrir a página inicial e páginas internas em servidor local;
- conferir responsividade em desktop, tablet e celular;
- revisar SEO, canonical, sitemap e robots;
- confirmar que não há arquivos de ambiente reais versionados.

## Variáveis de ambiente

A reformulação da Studio L4 não utiliza variáveis de ambiente.

Arquivos reais como `.env`, `.env.local` e variações não devem ser versionados. O `.gitignore` bloqueia esses arquivos e permite apenas exemplos como `.env.example`.

## Publicação

A publicação definitiva deve ocorrer somente após autorização expressa.

Fluxo sugerido:

1. Revisar o estado do Git.
2. Confirmar que apenas arquivos da Studio L4 serão versionados.
3. Copiar a versão aprovada de `reestruturacao-studiol4/` para a raiz de publicação, preservando backups quando necessário.
4. Revalidar localmente a raiz final.
5. Criar commit organizado.
6. Enviar ao GitHub somente após aprovação para `push`.

Mensagem de commit sugerida:

```text
feat: reformulate Studio L4 institutional website
```

## Observações

- `fp-peritus/` não faz parte da reformulação da Studio L4.
- `reestruturacao-studiol4.zip` é um artefato local e deve ser confirmado antes de qualquer versionamento.
- Nenhum `push`, `merge`, deploy ou alteração de infraestrutura deve ser feito sem autorização expressa.
