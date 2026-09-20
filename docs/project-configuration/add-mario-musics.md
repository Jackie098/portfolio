# Mario Music Player — Especificação

## Objetivo

Adicionar player de músicas temáticas do Mario Bros ao projeto. O player é um componente global (presente em todas as páginas) com estética retro/neon consistente com o design system existente.

---

## Músicas

Baixar e hospedar em `public/music/` (formato `.mp3`). As 7 faixas:

| id | Arquivo | Título exibido |
|----|---------|----------------|
| 1 | `overworld.mp3` | Overworld Theme |
| 2 | `underground.mp3` | Underground Theme |
| 3 | `starman.mp3` | Starman (Invincibility) |
| 4 | `castle.mp3` | Castle Theme |
| 5 | `water.mp3` | Water (Underwater) Theme |
| 6 | `athletic.mp3` | Athletic Theme (SMW) |
| 7 | `game-over.mp3` | Game Over |

Usar fontes livres/CC0 (ex.: [downloads.khinsider.com](https://downloads.khinsider.com), [zophar.net](https://www.zophar.net/music) ou conversão de `.nsf` com `nsf2midi`). Nunca hospedar ROMs — apenas assets de áudio derivados.

---

## Componentes a criar

### `components/music-player/music-provider.tsx`

Context global do player. Padrão análogo ao `SoundProvider` existente (`components/sound-provider.tsx`).

- Estado: `tracks[]`, `currentIndex`, `playing`, `progress` (0–100), `volume` (0–1), `shuffle`, `repeat` (`none | one | all`)
- Usa `HTMLAudioElement` via `useRef` (não Web Audio API — precisamos de arquivos de áudio reais)
- Hook público: `useMusicPlayer()` — seguro fora do provider (retorna no-ops)
- Persistir no `localStorage`: `currentIndex`, `volume`, `shuffle`, `repeat` (não `playing` — autoplay é opt-in)
- Autoplay ao montar: tentativa silenciosa via `.play().catch()`. Se bloqueado pelo browser (política de autoplay), marcar `playing = false` e aguardar primeira interação do usuário — sem lançar erro
- Exportar: `MusicProvider`, `useMusicPlayer`, `type Track`

### `components/music-player/music-player-widget.tsx`

Widget visual. `"use client"`. Usa `useMusicPlayer()`.

**Layout — mini player fixo** (canto inferior direito, `fixed bottom-4 right-4 z-50`):

```
┌──────────────────────────────────────────────┐
│ [♪ ícone]  OVERWORLD THEME          [▼ / ▲] │  ← header colapsável
├──────────────────────────────────────────────┤  (expansível)
│ [|◀]  [▶/⏸]  [▶|]   [🔀]  [🔁]            │  ← controles
│ ████████░░░░░░░░░░░░░░  01:23 / 02:15       │  ← barra de progresso clicável
│ [🔊 ─────────────────]                       │  ← slider de volume
└──────────────────────────────────────────────┘
```

- **Colapsável**: clique no header recolhe/expande o painel de controles. Estado em `useState`; salvar preferência no `localStorage` (`music-player-expanded`)
- Largura fixa `w-72` expandido, `w-auto` colapsado (só header)
- Usar `Card` + `CardHeader` + `CardContent` de `components/ui/card.tsx`
- Usar `Button` de `components/ui/button.tsx` com `variant="ghost" size="icon"` nos controles
- Usar `Progress` de `components/ui/progress.tsx` com `variant="accent"` para a barra de progresso
- A barra de progresso deve ser **clicável** para seek: wrapper `<div onClick={handleSeek}>` calcula `clientX / width * 100`
- Slider de volume: `<input type="range">` estilizado com as CSS vars do design system (sem lib externa)

**Ícones** (todos de `pixelarticons/react`, `width={24} height={24} aria-hidden`):

| Ação | Ícone |
|------|-------|
| Faixa anterior | `ChevronLeft` |
| Play | `Play` |
| Pause | `Pause` |
| Próxima faixa | `ChevronRight` |
| Shuffle on/off | `Shuffle` |
| Repeat (none→all→one) | `Repeat` / `Repeat1` |
| Volume alto | `Volume3` |
| Volume médio | `Volume2` |
| Volume baixo | `Volume1` |
| Mudo | `VolumeX` |
| Nota musical (header) | `Music` |
| Expandir/recolher | `ChevronRight` (rotacionado 90°) / `ChevronLeft` (rotacionado 90°) — via `rotate-90` / `-rotate-90` Tailwind |

**Estética retro obrigatória:**

- `font-press-start` em nome da faixa, tempo, labels
- Bordas pixel (`pixel-corners` já definido no CSS global)
- Glow neon no botão play ativo: `drop-shadow(0 0 8px var(--accent))`
- Botão play/pause com `variant="ghost"` e `text-accent` quando tocando
- Sem hex hardcoded — apenas tokens (`text-primary`, `bg-card`, `border-border`, etc.)

### `components/music-player/index.ts`

Barrel: re-exporta `MusicProvider` e `MusicPlayerWidget`.

---

## Integração

### `app/layout.tsx`

1. Importar `MusicProvider` e `MusicPlayerWidget`
2. Envolver `SoundProvider` (ou filhos) com `MusicProvider`
3. Renderizar `<MusicPlayerWidget />` junto com `<RetroCursor />` e `<SelectionRandomizer />`

Ordem de providers:
```tsx
<ThemeProvider>
  <SoundProvider>
    <MusicProvider>
      {children}
      <RetroCursor />
      <SelectionRandomizer />
      <MusicPlayerWidget />
    </MusicProvider>
  </SoundProvider>
</ThemeProvider>
```

### `app/design-system/page.tsx`

Adicionar seção **"Music Player"** na página de design system, mostrando o widget inline (não fixo) com `position: relative` para demonstração. Usar mesma estrutura de seção `<section>` das demais.

---

## Regras do design system (não violar)

- Cores **somente** por tokens CSS (`bg-card`, `text-primary`, `border-border`…) — sem hex hardcoded
- Reutilizar `Button`, `Card`, `Progress` existentes — não recriar primitivos
- `cn()` de `@/lib/utils` para composição de classes
- `"use client"` apenas nos componentes com estado/interatividade
- Estados obrigatórios nos botões: `hover`, `active`, `focus-visible` (ring neon visível), `disabled`
- Acessibilidade: `aria-label` em todos os botões de ícone, `role="progressbar"` na barra, `aria-pressed` no shuffle/repeat
- Mobile-first; TS estrito, sem `any`
- Não instalar libs novas — usar apenas o que está no `package.json`
