---
name: pixel-avatar-assets
description: Gera e refina assets pixel art consistentes do avatar/personagem Carlos para este portfolio. Use ao criar imagens do avatar, sprites, poses, cenas codando, ilustrações retro-tech, variações de perfil ou prompts de imagem baseados no personagem.
---

# Pixel Avatar Assets

## Objetivo

Criar assets visuais do mesmo personagem do portfolio, mantendo consistência com o avatar pixel art existente e com o design system retro game / neon do projeto.

## Referências

- Avatar canônico do projeto: `public/carlos-pixel-profile-avatar.png` (`/carlos-pixel-profile-avatar.png` no app)
- Sprite em pé: `public/carlos-pixel-avatar-standing.png` (`/carlos-pixel-avatar-standing.png` no app)
- Cena codando no notebook, versão original com frame: `public/carlos-pixel-avatar-coding-laptop.png` (`/carlos-pixel-avatar-coding-laptop.png` no app)
- Cena codando no notebook, versão sem frame: `public/carlos-pixel-avatar-coding-laptop-no-frame.png` (`/carlos-pixel-avatar-coding-laptop-no-frame.png` no app)
- Cena codando no notebook, versão recomendada para hero com frame justo: `public/carlos-pixel-avatar-coding-laptop-tight-frame.png` (`/carlos-pixel-avatar-coding-laptop-tight-frame.png` no app)
- Variação Player Dossier / Tech Mage: `public/carlos-pixel-avatar-tech-mage.png` (`/carlos-pixel-avatar-tech-mage.png` no app)
- Variação tema claro / irritado com texto: `public/carlos-pixel-avatar-odeio-luz.png` (`/carlos-pixel-avatar-odeio-luz.png` no app)
- Variação tema claro / irritado codando: `public/carlos-pixel-avatar-coding-odeio-luz.png` (`/carlos-pixel-avatar-coding-odeio-luz.png` no app)
- Variação tema claro / cansado codando: `public/carlos-pixel-avatar-coding-desliga-isso.png` (`/carlos-pixel-avatar-coding-desliga-isso.png` no app)
- Variação tema claro / inexpressivo com olheiras: `public/carlos-pixel-avatar-coding-desliga-isso-deadpan.png` (`/carlos-pixel-avatar-coding-desliga-isso-deadpan.png` no app)
- Variação tema claro / inexpressivo com frame justo: `public/carlos-pixel-avatar-coding-desliga-isso-deadpan-tight-frame.png` (`/carlos-pixel-avatar-coding-desliga-isso-deadpan-tight-frame.png` no app)
- Foto original do rosto, se disponível na conversa, serve apenas para identidade facial. O avatar canônico manda no estilo.
- Foto do notebook, se disponível na conversa, serve para cenas codando.
- Não use caminhos internos de sessão do Cursor como referência canônica; copie assets aprovados para `public/`.

## Identidade do personagem

Manter em todas as gerações:

- Homem jovem brasileiro, pele quente média-clara.
- Cabelo preto/castanho muito escuro, repartido perto do meio, volume no topo, mechas caindo na testa.
- Sobrancelhas grossas e escuras.
- Olhos escuros, limpos e expressivos.
- Bigode fino conectado visualmente a cavanhaque/barba curta no queixo.
- Rosto slim, expressão simpática, focada e confiante.
- Visual de desenvolvedor full stack: criativo, técnico, profissional, não corporativo demais.

## Estilo Obrigatório

- Pixel art nítido, com pixels quadrados visíveis.
- Mais cartoon que realista.
- Sombreamento em blocos, pouco dithering.
- Silhueta forte e legível em tamanho pequeno.
- Paleta dark retro-tech.
- Fundo simples, sem ruído.
- Aparência compatível com cards `pixel-corners`, bordas neon e tema dark padrão.

## Paleta Do Projeto

Use como direção visual:

- Background/card: slate escuro, próximo de `#111827` e `#1f2937`.
- Primary neon: cyan, próximo de `#00d3f2`.
- Accent: magenta, próximo de `#ff0080`.
- Secondary: violeta, próximo de `#8e51ff`.
- Foreground: cinza claro, próximo de `#f3f4f6`.

Não precisa citar hex no resultado final, mas use esses valores em prompts de geração quando ajudar consistência.

## Prompt Base

Use este bloco como base e adapte cena/pose:

```text
Use the provided pixel art avatar as the canonical reference for the character. Generate the same character in a consistent retro-tech pixel art style: young Brazilian man, warm medium-light skin, dark center-parted hair with loose front strands, thick dark eyebrows, dark expressive eyes, thin mustache connected to a small goatee/chin stubble, slim face, friendly confident expression.

Keep the image more cartoonized than realistic. Use crisp square pixels, blocky cel shading, strong silhouette, limited palette, and clean readable shapes. Match the portfolio design system: dark slate background, cyan neon primary accents, subtle magenta/violet highlights, retro game UI feeling, compatible with pixel-corner cards and neon borders.

No text, no watermark, no photorealism, no 3D render, no anime style, no soft digital painting, no busy background, no distorted face.
```

## Variações Comuns

### Corpo Inteiro

```text
Create a full-body front-facing sprite of the same character. Standing pose, relaxed developer posture, dark casual tech outfit, subtle cyan/magenta details, readable from small size. Keep proportions cartoon but not childish.
```

### Codando No Notebook

```text
Create the same character coding on a black gaming laptop. If a laptop photo is provided, use it as secondary reference for the black angular laptop, sticker-like details, and cyan glow. Character is seated, hands on keyboard, screen glow lighting the face, focused slight smile. No readable text or real logos.
```

Para uso no hero, mantenha o frame neon cyan, mas ele deve ser o limite visual da imagem: sem margem, padding ou faixa escura fora da moldura. O conteúdo fica dentro do frame; o glow do notebook e da silhueta pode sobressair dentro da composição sem criar segunda borda externa. No tema claro, use só o frame cyan — sem pixels roxos/magenta nos cantos.

### Player Dossier / Tech Mage

```text
Create the same character as a retro RPG tech developer: standing in a slight 3/4 pose, holding a small notebook or pixel terminal, surrounded by subtle abstract code blocks and neon particles. Professional, creative, no weapons, no fantasy excess.
```

### Tema Claro / Odeio Luz

```text
Create the same character in a light theme profile-card avatar. Expression is annoyed/upset, eyebrows furrowed, eyes narrowed, frown or grimace. Background is clean light gray/off-white. Black shirt with readable pixel text: "Odeio luz". Keep cyan accents adapted to light theme.
```

Para manter o contexto do hero, use variação codando: personagem sentado no notebook, rosto olhando para o usuário, camiseta legível. Para feição 😑, use rosto inexpressivo/deadpan, olhos retos ou semicerrados, olheiras visíveis, boca neutra e texto "Desliga isso". Hero light usa a versão `deadpan-tight-frame`.

## Checklist Antes De Gerar

- Personagem ainda parece o avatar canônico?
- Cabelo, bigode, cavanhaque e sobrancelhas bateram?
- Cena combina com portfolio dev retro-tech?
- Asset funciona pequeno?
- Fundo não compete com o personagem?
- Neon cyan é acento, não banho de luz excessivo?
- Sem texto/logos/watermark?

## Ao Responder

Se usuário pedir prompt, entregue prompt pronto para copiar.
Se usuário pedir imagem, use ferramenta de geração de imagem com `aspect_ratio` adequado e inclua `public/carlos-pixel-profile-avatar.png` em `reference_image_paths` quando disponível.
Para assets de UI pequenos, prefira `1:1`. Para cenas/ilustrações, escolha proporção conforme uso informado.
Depois de gerar imagem aprovada, copie o arquivo final para `public/` com nome estável e atualize esta skill se o asset virar referência recorrente.
