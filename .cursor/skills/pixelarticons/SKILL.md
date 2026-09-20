---
name: pixelarticons
description: Escolher e adicionar ícones pixel art com pixelarticons neste projeto (plano free). Use ao adicionar, trocar ou procurar um ícone, ou quando precisar confirmar se um ícone é gratuito ou Pro.
---

# pixelarticons — plano free

Ícones pixel art 24×24. O projeto usa **somente o conjunto free (MIT, 639 nomes)**.
Não há licença Pro: nunca rode `npx pixelarticons upgrade`, nunca copie path data de ícone Pro.

## Fluxo para adicionar um ícone

1. **Escolher o nome.** Nomes são kebab-case no catálogo (`arrow-right`) e PascalCase no React (`ArrowRight`).
2. **Confirmar que é free** — o pacote npm instalado contém apenas o conjunto free, então a verificação é local:

   ```bash
   ls node_modules/pixelarticons/react/ | grep -i '^ArrowRight'
   ```

   Existe → free, pode usar. Não existe → é Pro (ou o nome está errado).
3. **Se for Pro:** escolha uma alternativa free ou avise o usuário, com link para
   `https://pixelarticons.com/icon/<nome-kebab>/`. Não improvise desenhando o ícone.
4. **Usar** conforme as regras abaixo.

### Procurar por palavra-chave

Sem rede, liste o que está instalado (só free):

```bash
ls node_modules/pixelarticons/react/*.js | xargs -n1 basename | sed 's/.js$//' | grep -i volume
```

Catálogo completo (inclui Pro, marcado com status): `https://pixelarticons.com/icons.json`.
Se houver MCP disponível, `search_icons` / `get_icon` do servidor oficial também servem.

## Regras de uso

```tsx
// ✅ GOOD
import { Heart } from "pixelarticons/react"
<Heart width={24} height={24} className="text-accent" aria-hidden />

// ❌ BAD — import da raiz do pacote
import { Heart } from "pixelarticons"

// ❌ BAD — tamanho fora do múltiplo de 24 (pixels borram)
<Heart width={20} height={20} />

// ❌ BAD — cor fixa; quebra tema claro/escuro
<Heart fill="#00d3f2" />
```

- **Tamanhos:** apenas 12, 24, 48, 72, 96. Defina via `width`/`height`.
- **Cor:** os paths usam `fill="currentColor"`; controle pela cor do texto (`text-primary`, `text-muted-foreground`).
- **Não** altere `d` nem `viewBox`.
- **Variantes de estilo** existem por sufixo no nome: `HeartSharp`, `HeartGlyph`, `HeartSolid`.
  Nem todo ícone tem todas; o estilo base sempre existe — confirme com o mesmo `ls`.
- **SVG cru** (ex.: data URI para `cursor`): os arquivos estão em `node_modules/pixelarticons/svg/<nome>.svg`.
  Em data URI, `currentColor` não funciona — resolva a cor no `globals.css`, por tema.

## Acessibilidade

- Ícone acompanhando texto → `aria-hidden`.
- Ícone sozinho como único conteúdo de um controle → `aria-label` **no controle**, `aria-hidden` no ícone.
- Ícone que comunica estado (som ligado/desligado, tema) → o rótulo deve descrever a ação, e o controle usa `aria-pressed` quando for toggle.
