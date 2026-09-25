---
name: Menu flutuante mobile
overview: No mobile, o header sai do fluxo e vira uma barra flutuante no topo que abre os links. No desktop (`md+`) o header sticky atual permanece igual.
todos:
  - id: site-header
    content: "Extrair header para components/site-header.tsx: sticky no md+, barra flutuante + painel no mobile"
    status: completed
  - id: page-wire
    content: Trocar header em app/page.tsx e ajustar respiro do hero no mobile
    status: completed
  - id: verify
    content: "Verificar no browser: menu mobile, âncoras, toggles, player e header desktop"
    status: completed
isProject: false
---

# Menu flutuante no mobile

Header atual em [`app/page.tsx`](app/page.tsx) (linhas 86–110) é sticky, full-bleed, e no mobile quebra em duas linhas: links + Design System, depois som, tema e player. Isso come altura do hero (`min-h-[calc(100svh-7rem)]`).

Breakpoint continua `md`, o mesmo corte do player (`max-md:hidden` no layout, dock `md:hidden` no header).

## Comportamento

- **`md+`:** header sticky atual, sem mudança visual.
- **`< md`:** header sai do fluxo. Barra `fixed` no topo (`top-3`, `inset-x-6`, `z-40`), alinhada à gutter da página.
- Barra usa [`Card`](components/ui/card.tsx) (cantos pixel, `bg-card`, frame) — mesmo bloco do player dock.
- Conteúdo da barra: botão ícone (`Menu` / `Close` de `pixelarticons`, 24px) + `SoundToggle` + `ThemeToggle` + `MusicPlayerWidget` dock (já existe).
- Aberto: segundo `Card` logo abaixo, `nav` com os mesmos links (Sobre, XP, Cases, Stack, Contato) e o botão Design System. Tipografia `font-press-start` igual à atual.
- Fecha ao tocar link, Escape, clique fora ou de novo no botão. `aria-expanded` + `aria-controls`. Sem travar scroll (não é modal; o sheet de baixo já é do [`PlayerDossier`](components/player-dossier.tsx)).
- Fundo do site fica livre. Botão “Conheça o jogador” no rodapé não se move.

## Arquivos

- Novo [`components/site-header.tsx`](components/site-header.tsx) (`"use client"`). Home segue Server Component.
- [`app/page.tsx`](app/page.tsx): troca o `<header>` pelo componente. Hero no mobile ganha respiro sob a barra (`max-md:pt-24` e `max-md:min-h-svh`); `md+` mantém `min-h-[calc(100svh-7rem)]`. `scroll-mt-24` das seções já cobre a barra.

Página do design system não entra: o header dela é só título, sem nav do site.

## Verificação

Viewport mobile: abrir/fechar menu, ir a uma âncora, som, tema, expandir player sem cobrir o painel de forma inutilizável. Viewport `md+`: header sticky idêntico ao atual. Conferir tema claro e escuro.
