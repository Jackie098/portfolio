# Prompt — Design System Retro Game

## 1. Objetivo

Criar um pequeno **design system** para padronizar a UI do projeto, com estética **retro game / 8-bit / cyberpunk neon**. O entregável são componentes reutilizáveis, acessíveis e tipados, mais os tokens de design que os alimentam.

## 2. Contexto do projeto (stack real)

Antes de escrever qualquer código, leia o guia relevante em `node_modules/next/dist/docs/` — esta versão do Next tem breaking changes.

- **Framework:** Next.js `16.3.4` (App Router, RSC habilitado)
- **UI:** React `19.2.8`
- **Estilo:** Tailwind CSS `v4` (config via CSS em `app/globals.css`, `@theme` + CSS variables — NÃO usar `tailwind.config.js`)
- **Componentes base:** shadcn/ui (style `new-york`, `cssVariables: true`, baseColor `neutral`)
- **Variantes:** `class-variance-authority` (CVA)
- **Merge de classes:** `clsx` + `tailwind-merge` via helper `cn()` em `lib/utils.ts`
- **Ícones:** `lucide-react`
- **Tema claro/escuro:** `next-themes` (já existe `components/theme-provider.tsx`)

**Aliases:** `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.

## 3. Escopo

### Reset inicial
- Apagar todos os componentes de UI criados até agora (páginas de exemplo/demo e componentes não usados).
- **Manter** `package.json` e a configuração do Next (`next.config.ts`, `tsconfig.json`).
- Manter também `theme-provider.tsx`, `lib/utils.ts` e a infra do shadcn.

### Componentes a entregar (nesta ordem)
1. **Tipografia** (tokens + utilitários)
2. **Espaçamento** (escala de tokens)
3. **Botão** (`Button`)
4. **Card** (`Card` + subcomponentes)
5. **Input** (`Input`, com label/hint/erro)
6. **Progress bar** (`Progress`)

## 4. Referências visuais

- Screenshots em `./references/` (jogo "Opala Quest" — botões arredondados amarelos/azuis, pixel art, telas de onboarding, loja, progresso).
- Botões pixelados clássicos: `./references/vintage-*.avif`.
- Design system gamificado de referência: https://v0-old-game-design-system.vercel.app/

> Há **dois sabores** nas referências: (a) neon/cyberpunk escuro (painel "RETRO GAMING UI") e (b) claro/arredondado ("Opala Quest"). O design system usa o **tema neon escuro como padrão (dark)** e um **tema light** coerente, ambos com os tokens de cor da seção 5.

## 5. Design tokens

Definir todos os tokens como **CSS variables** em `app/globals.css` dentro de `@theme` (Tailwind v4), expostos como cores/utilitários Tailwind.

### 5.1 Tipografia

**Fontes** (carregar via `next/font/google` no `app/layout.tsx`, expor como CSS variables):
- **Press Start 2P** → headings, botões e labels de UI (essência 8-bit). Variável: `--font-press-start`, utilitário `.font-press-start`.
- **Orbitron** → corpo de texto e descrições (sci-fi, boa legibilidade). Variável: `--font-orbitron`, utilitário `.font-orbitron`.

**Escala tipográfica:**

| Token | Uso | Tamanho |
|-------|-----|---------|
| Heading 1 | `text-2xl` | 24px |
| Heading 2 | `text-xl` | 20px |
| Heading 3 | `text-lg` | 18px |
| Heading 4 / Body | `text-base` | 16px |
| Small | `text-sm` | 14px |
| Caption | `text-xs` | 12px |

**Efeitos de texto (utilitários):**
- `.retro-glow` → neon glow (text-shadow em camadas na cor atual).
- `.terminal-cursor` → cursor piscando (animação `blink`).

> Regra: Press Start 2P é pesada visualmente — usar só em títulos/labels curtos; corpo longo sempre em Orbitron. Considerar `letter-spacing` e `line-height` maiores para legibilidade da pixel font.

### 5.2 Cores

**Cores de marca (neon):**

| Nome | Hex | Uso |
|------|-----|-----|
| Primary — Neon Blue | `#00D3F2` | Ações primárias |
| Secondary — Neon Purple | `#8E51FF` | Ações secundárias, info |
| Accent — Neon Pink | `#FF0080` | Destaques |
| Danger — Cyber Red | `#FF0040` | Erros, barras de vida |
| Warning — Neon Yellow | `#FFFF00` | Avisos, energia |
| Success — Neon Green | `#00FF41` | Sucesso |

**Neutros:**

| Nome | Hex | Uso |
|------|-----|-----|
| Dark Background | `#111827` | Fundo principal |
| Panel Background | `#1F2937` | Fundo de cards |
| Border | `#4B5563` | Bordas inativas |
| Text Primary | `#F3F4F6` | Texto primário |
| Text Secondary | `#9CA3AF` | Texto secundário |

> Mapear cada cor para semantic tokens do shadcn (`--background`, `--foreground`, `--primary`, `--card`, `--border`, `--destructive` etc.) para os componentes base funcionarem. Manter contraste AA (texto sobre fundos escuros).

### 5.3 Espaçamento

Escala base de **4px** (múltiplos: 4, 8, 12, 16, 24, 32, 48, 64). Usar a escala nativa do Tailwind; se criar tokens custom, documentar. Cantos/estética: bordas marcadas (2px), radius pequeno/pixelado (evitar cantos muito arredondados no tema neon).

## 6. Especificação por componente

Cada componente deve: usar `cn()`, expor `variant`/`size` via CVA quando fizer sentido, encaminhar `ref` e `...props`, ser tipado com TS, e ter estados de foco visíveis (`focus-visible`).

### Button
- **Variants:** `primary`, `secondary`, `accent`, `danger`, `warning`, `success`, `ghost`/`outline`.
- **Sizes:** `sm`, `md` (default), `lg`, `icon`.
- **Estados:** default, hover (glow intensifica), active (leve "press"/translate), `focus-visible` (ring neon), `disabled` (opacidade + sem glow).
- Label em Press Start 2P, borda neon, glow na cor da variante. Suportar `asChild` (Radix Slot) e ícone lucide opcional.

### Card
- Subcomponentes: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- Fundo `Panel Background`, borda neon sutil, título em Press Start 2P, corpo em Orbitron. Variante opcional com glow de borda.

### Input
- Campo texto com fundo escuro, borda neon, `placeholder` em Text Secondary, `focus-visible` com ring/glow neon.
- Apoios: `label`, `hint`, `error` (borda/hint em Danger quando inválido), `disabled`.
- Acessível: associar `label`/`id`, `aria-invalid`, `aria-describedby`.

### Progress
- Barra de progresso 0–100 com trilho escuro e preenchimento em gradiente neon (variantes: health/danger, mana/primary, exp/success).
- Mostrar `value` opcional (`%`) e `label`. Acessível: `role="progressbar"`, `aria-valuenow/min/max`.

## 7. Requisitos técnicos e de qualidade

- **Server Components por padrão**; marcar `"use client"` apenas onde há interatividade/estado.
- Sem libs novas além das já listadas em `package.json` (confirmar antes de instalar qualquer coisa).
- Tipos TS estritos; sem `any`.
- Acessibilidade: foco visível, contraste AA, `aria-*` corretos, navegação por teclado.
- Responsivo (mobile-first — referências são telas de iPhone).
- **Suportar dark E light** via `next-themes`: o tema neon é o **dark** (padrão); definir um tema **light** coerente (fundos claros, neons rebaixados p/ manter contraste AA). Todos os componentes devem funcionar nos dois modos.

## 8. Entregáveis

1. `app/globals.css` com `@theme`, CSS variables (cores, fontes), utilitários (`.retro-glow`, `.terminal-cursor`, `.font-*`) e keyframes.
2. Fontes configuradas em `app/layout.tsx` via `next/font/google`.
3. Componentes em `components/ui/`: `button.tsx`, `card.tsx`, `input.tsx`, `progress.tsx` (+ tipografia/espaçamento onde couber).
4. Uma **página de showcase** na rota **`/design-system`** (`app/design-system/page.tsx`) demonstrando cada componente em todas as variantes/estados, com **toggle de tema (dark/light)**, espelhando o layout da referência "RETRO GAMING UI".

## 9. Critérios de aceite

- [ ] Componentes antigos removidos; `package.json` e config do Next intactos.
- [ ] Todos os tokens (cores, fontes, escala) refletidos em `globals.css` e usados pelos componentes.
- [ ] Cada componente cobre variantes e estados descritos (incl. `focus-visible` e `disabled`).
- [ ] Página de showcase renderiza sem erros e cobre 100% das variantes.
- [ ] `npm run build` e `npm run lint` passam sem erros.
- [ ] Acessibilidade validada (labels, aria, contraste, teclado).

## 10. Antes de começar

Se algo estiver ambíguo (ex.: quais componentes legados exatamente apagar, detalhes de animação/glow), **pergunte antes** em vez de assumir. Decisões já fixadas: **tema dark + light**, showcase em **`/design-system`**.
