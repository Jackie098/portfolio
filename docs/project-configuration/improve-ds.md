# Prompt — Evolução do Design System (animações, áudio e ícones)

## 1. Objetivo

O design system retro/neon já existe (ver `input.md`). Agora adicionar uma **camada de interação**: cursor customizado, bordas pixeladas, animações retro, feedback sonoro 8-bit e uma biblioteca de ícones pixel art — **sem regredir acessibilidade nem performance**.

## 2. Estado atual do projeto

**Stack:** Next.js `16.3.4` (App Router, Turbopack) · React `19.2.8` · Tailwind CSS `v4` (tokens via `@theme` em `app/globals.css`, sem `tailwind.config.js`) · CVA · `cn()` em `lib/utils.ts` · `next-themes` (dark neon padrão + light) · `lucide-react`.

**Arquivos existentes:**

```
app/globals.css          # brand tokens neon, semantic tokens dark/light,
                         # .font-press-start .font-orbitron .retro-glow .terminal-cursor
app/layout.tsx           # Press Start 2P + Orbitron (next/font/google)
app/page.tsx             # landing
app/design-system/page.tsx  # showcase
app/not-found.tsx
components/theme-provider.tsx
components/theme-toggle.tsx
components/ui/{button,card,input,progress}.tsx
```

**Regras do projeto:** `.cursor/rules/design-system.mdc` (tokens semânticos, proibido hex hardcoded, CVA, `cn()`, RSC por padrão, a11y). Siga-as.

> Antes de escrever código, leia o guia relevante em `node_modules/next/dist/docs/` — esta versão do Next tem breaking changes.

---

## 3. Acessibilidade — requisito transversal e inegociável

Aplica-se a **todos** os itens abaixo. Nenhum entregável é aceito sem isso.

- **`prefers-reduced-motion: reduce`** desativa ou reduz a versão animada de tudo (cursor, glitch, typing, pulse, spinner, elevação de botão). Estado final sempre legível e utilizável.
- **Som é opt-in**: mudo por padrão, toggle visível na UI, preferência persistida em `localStorage`. Nunca autoplay — `AudioContext` só após gesto do usuário.
- **Foco**: `focus-visible` sempre visível, não substituído por efeito decorativo. Navegação completa por teclado; efeitos de hover têm equivalente em `:focus-visible`.
- **Cursor customizado nunca quebra usabilidade**: manter cursor nativo em campos de texto (`text`), estados `disabled` (`not-allowed`) e dispositivos touch/coarse pointer.
- **Contraste AA** nos dois temas, incluindo estados hover/active.
- Efeitos decorativos (glitch, neon, cursor) são `aria-hidden` / `pointer-events: none`.
- Conteúdo animado com semântica: spinner `role="status"` + `aria-live="polite"`; texto "digitando" deve estar **completo** no DOM para leitores de tela (animar via CSS/máscara ou expor texto final com `aria-label`), nunca entregando texto parcial.

---

## 4. Escopo

### 4.1 Cursor retro animado

- Cursor pixel art custom (ex.: seta/pointer 8-bit), com estado animado sutil no hover sobre elementos interativos.
- Implementar preferencialmente via `cursor: url(...)` com SVG/PNG pixel art (barato, sem JS). Se usar cursor via elemento seguindo o mouse, ele deve ser `pointer-events: none`, `aria-hidden`, e desativado em `pointer: coarse` e em `prefers-reduced-motion`.
- Aplicar `image-rendering: pixelated` onde houver raster.
- Definir como **token/utilitário** em `globals.css`, não inline por componente.

### 4.2 Bordas pixeladas (botões, inputs, cards)

- Substituir `border-radius` arredondado por **cantos pixelados/chanfrados**.
- Escolher **uma** técnica e aplicá-la de forma centralizada como utilitário (ex.: `.pixel-border`):
  - `clip-path: polygon(...)` com recortes de 4px nos cantos, ou
  - `border-image` com SVG inline (data URI) + `border-image-slice`, ou
  - `box-shadow` em degraus (sem blur) simulando pixels.
- Deve funcionar nos dois temas e herdar a cor da variante (usar `currentColor` / token, nunca hex).
- Não pode comprometer o anel de foco: `focus-visible` precisa continuar visível com o novo recorte.

### 4.3 Botão — elevação no hover, afundar no click

- **Hover:** sombra dura pixelada (offset, `blur: 0`) + `translateY(-2px)` → sensação de botão levantando.
- **Active:** sombra encolhe/some + `translateY(+2px)` → botão afunda. Transição curta (~100–150ms).
- `:focus-visible` replica o estado de hover (paridade teclado/mouse).
- `disabled`: sem elevação, sem sombra, sem som.
- Implementar nas variantes existentes do CVA em `components/ui/button.tsx`, sem duplicar classes.

### 4.4 Áudio — blips 8-bit

- Dois sons **distintos**:
  - **Navegação/hover** (mudança de opção): blip curto e agudo.
  - **Click/confirmação**: blip mais grave, timbre diferente (ex.: duas notas).
- Gerar com **Web Audio API** (oscilador `square`, envelope curto) — sem arquivos de áudio, sem dependências novas.
- Entregar `SoundProvider` + hook `useRetroSound()` com API tipo `play("hover" | "click")`, respeitando mute global.
- Integrar em `Button` (hover/focus e click) de forma opcional — o componente não deve quebrar fora do provider.
- Toggle de som na UI usando token/ícone (ver 4.6), estado persistido.

### 4.5 Animações retro

Cada uma como utilitário/componente reutilizável, com keyframes em `globals.css` e variante estática sob `prefers-reduced-motion`:

| Efeito | Requisito |
|--------|-----------|
| **Typing text** | Efeito de digitação em prompt/terminal, com cursor piscando. Texto completo no DOM para leitores de tela. |
| **Glitch** | Deslocamento RGB/clip em camadas. Decorativo, `aria-hidden`. Evitar flashes rápidos (risco fotossensibilidade — nada acima de 3 flashes/s). |
| **Loading spinner** | Rotação/stepping em frames (não suave — passos discretos combinam com pixel art). `role="status"` + texto acessível. |
| **Neon sign** | Glow pulsante com flicker ocasional, reaproveitando `.retro-glow` e tokens neon. |
| **Pulse** | Pulsação suave de escala/glow para chamar atenção (ex.: CTA, badge). |

### 4.6 Ícones — pixelarticons (plano free)

Substituir/complementar `lucide-react` por **[pixelarticons](https://pixelarticons.com/)** (pixel art 24×24 — coerente com o tema).

**Instruções oficiais (de https://pixelarticons.com/ai):**

- Instalar: `npm install pixelarticons`
- Importar **sempre** de `pixelarticons/react` (ou `pixelarticons/react/Nome.js`), **nunca** da raiz do pacote:
  ```tsx
  import { Heart } from "pixelarticons/react"
  ```
- Ícones são paths preenchidos com `fill="currentColor"` → herdam a cor do texto. **Inline o SVG**, não use `<img>`.
- Renderizar em **múltiplos de 24px** (12, 24, 48, 72, 96) para os pixels não borrarem. **Não** usar outros tamanhos e **não** editar o path data.
- Estilos disponíveis por sufixo: `-sharp`, `-glyph`, `-solid`. Nem todo ícone tem todos; o base sempre existe.

**Restrição de licença (crítica):**

- Só **639 nomes** são free (MIT, sem atribuição); o resto é **Pro (pago)**. Este projeto está no **plano free** → usar **exclusivamente** ícones do conjunto free.
- Antes de usar um ícone, **verificar** que o nome está na lista free. Fontes: `https://pixelarticons.com/icons.json` (catálogo com status free/Pro) ou o MCP oficial (`search_icons` / `get_icon`).
- Se o ícone ideal for Pro: escolher alternativa free ou avisar o usuário com o link `https://pixelarticons.com/icon/<nome>/`. **Nunca** copiar path data de ícone Pro.
- Não rodar `npx pixelarticons upgrade` (requer licença).

**Ícones free úteis para este projeto:** `sun`, `moon`, `volume-3`, `volume-x`, `gamepad`, `joystick`, `loading`, `loading-2`, `loading-3`, `spinner`, `heart`, `zap`, `power`, `play`, `pause`, `close`, `check`, `chevron-right`, `terminal`, `trophy`, `skull`, `sword`, `alien`, `robot-face`.

Atualizar `components.json` (`iconLibrary`) se fizer sentido, e migrar `theme-toggle.tsx` para os novos ícones. Remover `lucide-react` só se não sobrar nenhum uso.

### 4.7 Skill de orientação do agente

Criar **`.cursor/skills/pixelarticons/SKILL.md`** para que qualquer agente use a lib corretamente no plano free.

- Frontmatter com `name` e `description` acionável (ex.: "Use ao adicionar/alterar ícones neste projeto").
- Conteúdo enxuto e operacional: caminho de import correto, `currentColor`, tamanhos múltiplos de 24, proibição de editar path data, **e o passo obrigatório de verificar se o ícone é free antes de usar** (com o endpoint de verificação).
- Incluir exemplos ❌/✅ concretos e a lista/fonte dos nomes free.
- Decidir conscientemente entre **skill** (capacidade sob demanda) e **rule** com glob — se a orientação deve valer sempre que ícones forem tocados, uma rule complementar pode ser mais eficaz. Justifique a escolha.

---

## 5. Requisitos técnicos

- **Sem dependências novas** além de `pixelarticons`. Áudio, glitch, typing, spinner: CSS + Web Audio API nativos. Confirme antes de instalar qualquer outra coisa.
- Animações via **CSS transform/opacity** (GPU); evitar animar layout. Nada de `setInterval` para efeitos puramente visuais.
- Server Components por padrão; `"use client"` apenas onde há estado/eventos (som, cursor, typing interativo).
- TS estrito, sem `any`. Zero hex hardcoded — tudo por token.
- Mobile-first; todos os efeitos degradam de forma limpa em touch.
- Limpeza: `gray-matter` e `next-mdx-remote` são resíduos do blog removido — remover se realmente não houver uso.

## 6. Entregáveis

1. `app/globals.css` — novos tokens, utilitários (`.pixel-border`, cursor, glitch, typing, pulse, neon) e keyframes, todos com bloco `prefers-reduced-motion`.
2. `components/ui/button.tsx` atualizado (bordas pixeladas, elevação hover, press no active, som opcional).
3. `components/ui/{input,card}.tsx` com bordas pixeladas.
4. Novos componentes: `sound-provider.tsx` + `use-retro-sound`, `sound-toggle.tsx`, `typing-text.tsx`, `glitch-text.tsx`, `spinner.tsx`, e utilitários neon/pulse.
5. Ícones migrados para pixelarticons (free).
6. `.cursor/skills/pixelarticons/SKILL.md` (+ rule, se justificado).
7. **Showcase `/design-system` atualizado**: seção nova para cada efeito (cursor, bordas, elevação, sons, typing, glitch, spinner, neon, pulse, grid de ícones), com toggles de som e tema.

## 7. Critérios de aceite

- [ ] Todo efeito animado tem fallback sob `prefers-reduced-motion`.
- [ ] Som mudo por padrão, com toggle persistido; hover e click têm timbres distintos.
- [ ] Cursor custom não atrapalha inputs, disabled nem touch.
- [ ] Bordas pixeladas em button/input/card, sem perder anel de foco visível.
- [ ] Botão: levanta no hover **e** no `focus-visible`; afunda no active; inerte quando `disabled`.
- [ ] 100% dos ícones usados pertencem ao conjunto free (verificado, não presumido).
- [ ] Skill criada e suficiente para outro agente acertar sem consultar o site.
- [ ] Showcase cobre todos os efeitos novos.
- [ ] `npm run lint` e `npm run build` passam (usar Node 22 — `nvm use`, ver `.nvmrc`).
- [ ] Navegação por teclado completa; contraste AA nos dois temas.

## 8. Antes de começar

Proponha primeiro um **plano curto**: técnica escolhida para bordas pixeladas, desenho do cursor, parâmetros dos dois blips e lista de ícones free por caso de uso. Se algo estiver ambíguo (ex.: remover `lucide-react` de vez, skill vs. rule), **pergunte em vez de assumir**.
