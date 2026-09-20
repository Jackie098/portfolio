import type { ProgressProps } from "@/components/ui/progress";
import type { TimelineEntry } from "@/components/ui/retro-timeline";

export const site = {
  name: "Carlos Augusto",
  headline: "Web Developer | JavaScript | NodeJS | ReactJS",
  location: "Floriano, PI",
  email: "carlos.aug.developer@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/carlos-augusto-miranda-brandão-243317183/",
  github: "https://github.com/Jackie098",
  pitch:
    "Produto web ponta a ponta: React no cliente, Node e TypeScript no servidor — e liderança de time quando a entrega precisa de direção, não só de código.",
  about: [
    "Hoje estou na ETIPI, no time de customização do PiDigital: novas funcionalidades no sistema, em produção, no Piauí.",
    "Antes disso liderei sprint e produto (IPdelve), coordenei 3 pessoas num gateway de pagamentos (Lekko) e entreguei fullstack em varejo (Datasales): React, Node serverless e AWS, com integrações de Facebook, Instagram, WhatsApp e SMS.",
    "Quando o backend travava o frontend, aprendi Django REST e entrei na API. Inglês: EF SET B2 — leio documentação; a fala ainda está em progresso.",
  ],
} as const;

export const profileTags = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node",
  "AWS",
] as const;

export const timeline: TimelineEntry[] = [
  {
    id: "etipi",
    year: "2024",
    title: "Desenvolvedor Fullstack",
    org: "ETIPI — Teresina, PI",
    description:
      "Time de customização do PiDigital: novas funcionalidades no sistema da Empresa de Tecnologia da Informação do Piauí.",
    tags: ["Fullstack", "Customização"],
    type: "work",
    current: true,
  },
  {
    id: "lekko",
    year: "23–24",
    title: "Tech Lead",
    org: "Lekko Tecnologia — São João dos Patos, MA",
    description:
      "Gateway de pagamentos e coordenação de um time de 3 desenvolvedores.",
    tags: ["Pagamentos", "Liderança"],
    type: "work",
  },
  {
    id: "ipdelve",
    year: "2023",
    title: "Front, Tech Lead e Fullstack",
    org: "IPdelve — Floriano, PI",
    description:
      "Comecei no front (práticas, performance, bugs e features). Virei tech lead: sprints com o PO, granularização do trabalho e decisões técnicas. Depois entrei no backend com Django REST para a API não travar o frontend.",
    tags: ["React", "Next.js", "Django REST", "Scrum"],
    type: "work",
  },
  {
    id: "datasales",
    year: "21–22",
    title: "Fullstack Developer",
    org: "Datasales — São Paulo",
    description:
      "Produto de automação de marketing para varejo: APIs em Node/serverless, React no cliente, AWS (S3, Lambda, CloudWatch, Route53, RDS) e integrações com Facebook, Instagram, WhatsApp e SMS.",
    tags: ["React", "Node", "AWS", "Serverless"],
    type: "work",
  },
  {
    id: "ifpi-monitor",
    year: "2019",
    title: "Monitor — POO e programação web",
    org: "IFPI — Floriano",
    description:
      "Monitoria de orientação a objetos em Java (2019) e de backend Node (rotas, tipos de requisição, banco) em 2021.",
    tags: ["Java", "Node"],
    type: "edu",
  },
  {
    id: "ifpi-ads",
    year: "17–22",
    title: "Tecnólogo em ADS",
    org: "IFPI — Instituto Federal do Piauí",
    description:
      "Formação voltada ao mercado: redes, segurança web, SO, POO, desktop, web, mobile, gestão de projetos, métodos ágeis e estrutura de dados.",
    tags: ["ADS"],
    type: "edu",
  },
  {
    id: "gostack",
    year: "19–21",
    title: "GoStack 9.0",
    org: "Rocketseat",
    description:
      "Bootcamp prático: Node, React, React Native, testes, CI e deploy — da primeira rota à loja.",
    tags: ["Node", "React", "React Native"],
    type: "edu",
  },
];

export type SiteProject = {
  id: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  href?: string;
  variant: "primary" | "secondary" | "accent";
};

export const projects: SiteProject[] = [
  {
    id: "datasales",
    title: "Datasales",
    org: "Automação de marketing para varejo",
    description:
      "Varejista precisava publicar encarte e campanha em várias plataformas no mesmo fluxo. Segmentei formulários com validações distintas até o envio e, no backend, integrei as APIs de Facebook, Instagram, WhatsApp e SMS. Prova: produto vivo em datasales.io.",
    tags: ["React", "Node", "Serverless", "AWS"],
    href: "https://datasales.io/",
    variant: "primary",
  },
  {
    id: "ipdelve",
    title: "Mercado de Patentes",
    org: "IPdelve — inteligência competitiva",
    description:
      "Front travava na API. Entrei no Django REST, documentei e desbloqueei entrega. No cliente, Next/React, design system e Scrum com o time até o MVP. Prova: mercadodepatente.com.br.",
    tags: ["Next.js", "Django REST", "AWS", "Scrum"],
    href: "https://mercadodepatente.com.br/about-us",
    variant: "secondary",
  },
  {
    id: "lekko",
    title: "Gateway de pagamentos",
    org: "Lekko Tecnologia",
    description:
      "Produto de pagamento sem time grande. Construí o gateway e dirigi 3 desenvolvedores — prazo e direção técnica, não só código. Sem URL pública.",
    tags: ["Tech Lead", "Pagamentos"],
    variant: "accent",
  },
];

export type SiteTech = {
  id: string;
  name: string;
};

export const tech: SiteTech[] = [
  { id: "js", name: "JavaScript" },
  { id: "ts", name: "TypeScript" },
  { id: "react", name: "React" },
  { id: "node", name: "Node.js" },
  { id: "aws", name: "AWS" },
  { id: "serverless", name: "Serverless" },
  { id: "django", name: "Django REST" },
  { id: "scrum", name: "Scrum / Jira" },
  { id: "java", name: "Java" },
];

export type SiteSkill = {
  label: string;
  value: number;
  variant: NonNullable<ProgressProps["variant"]>;
};

export const skills: SiteSkill[] = [
  { label: "React / JS", value: 85, variant: "primary" },
  { label: "Node / TS", value: 80, variant: "mana" },
  { label: "AWS / Serverless", value: 70, variant: "accent" },
  { label: "Django REST", value: 55, variant: "exp" },
  { label: "Java", value: 40, variant: "warning" },
  { label: "Scrum / lead", value: 75, variant: "secondary" },
];
