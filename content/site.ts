import type { ProgressProps } from "@/components/ui/progress";
import type { TimelineEntry } from "@/components/ui/retro-timeline";

export const site = {
  name: "Carlos Augusto",
  headline: "Desenvolvedor Full Stack | Java · React · PostgreSQL",
  location: "Teresina, PI",
  email: "carlos.aug.developer@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/carlos-augusto-miranda-brandão-243317183/",
  github: "https://github.com/Jackie098",
  cv: "/cv_Carlos_Augusto_09-26.pdf",
  cvFilename: "CV_Carlos_Augusto.pdf",
  avatar: "/carlos-pixel-profile-avatar.png",
  logoCa: "/carlos-augusto-logo-ca.png",
  logoCaLight: "/carlos-augusto-logo-ca-light.png",
  logoMark: "/carlos-augusto-logo-mark.png",
  logoMarkLight: "/carlos-augusto-logo-mark-light.png",
  favicon: "/carlos-augusto-logo-mark.ico",
  faviconLight: "/carlos-augusto-logo-mark-light.ico",
  heroCodingAvatar: "/carlos-pixel-avatar-coding-laptop-tight-frame.png",
  heroCodingAvatarLight:
    "/carlos-pixel-avatar-coding-desliga-isso-deadpan-tight-frame.png",
  techMageAvatar: "/carlos-pixel-avatar-tech-mage.png",
  pitch:
    "Desenvolvo produtos e sistemas sob medida, com foco em performance, clareza e resultado para o negócio.",
  playerBio:
    "Transformo ideia em produto com direção, priorizando impacto, clareza e custo inteligente. Faço perguntas que evitam retrabalho, cuido da experiência final e encontro caminhos viáveis para tirar projeto do papel com mais segurança.",
  about: [
    "Ajudo empresas e negócios a transformar necessidade em software útil, com foco em produto bem pensado, execução enxuta e experiência que faz sentido para quem usa.",
    "Hoje atuo na ETIPI, evoluindo serviços digitais do Detran-PI com Java/Spring, React/Next e RabbitMQ. Como freelancer, também entreguei a plataforma da Associação JET: landing, backoffice e API em Quarkus + PostgreSQL.",
    "Também passei pela Datasales, em automação de marketing para varejo com React, Node serverless e AWS, integrando canais como Facebook, Instagram, WhatsApp e SMS. Inglês ETSET B2 para leitura técnica e documentação.",
  ],
} as const;

export const profileTags = ["React", "Java", "PostgreSQL"] as const;

export const timeline: TimelineEntry[] = [
  {
    id: "etipi",
    year: "2024",
    title: "Desenvolvedor Fullstack",
    org: "ETIPI — Teresina, PI",
    description:
      "Evoluo serviços digitais do Detran-PI no PiDigital, com Java/Spring e React. Entreguei fluxos em produção como renovação de CNH com selfie, transferência de propriedade e primeiro emplacamento, sempre com foco em escala e usabilidade.",
    tags: ["Java/Spring", "React/Next", "RabbitMQ"],
    type: "work",
    current: true,
  },
  {
    id: "jet",
    year: "25–26",
    title: "Desenvolvedor Full Stack (Freelance)",
    org: "Associação Desportiva JET (J&T) — Sul do Piauí",
    description:
      "Concebi e entreguei a plataforma completa da associação: landing, backoffice e API. Estruturei gestão de membros, patrocínio e check-in, com Quarkus + PostgreSQL, CMS em Strapi e deploy otimizado para operação enxuta.",
    tags: ["Quarkus", "React", "PostgreSQL"],
    type: "work",
  },
  {
    id: "ipdelve",
    year: "2023",
    title: "Desenvolvedor Fullstack",
    org: "IPdelve — Floriano, PI",
    description:
      "Atuei no front em React/Next e entrei no Django REST quando a API virou gargalo. Ajudei a manter o produto em movimento num contexto de MVP e time enxuto.",
    tags: ["React", "Django REST"],
    type: "work",
  },
  {
    id: "datasales",
    year: "21–22",
    title: "Desenvolvedor Fullstack",
    org: "Datasales — São Paulo",
    description:
      "Trabalhei em produto de automação de marketing para varejo com React, Node/TypeScript e serverless na AWS. Integrei publicação para Facebook, Instagram, WhatsApp e SMS no mesmo fluxo, além de atuar em legado, APIs e evolução contínua do produto.",
    tags: ["React", "Node", "AWS"],
    type: "work",
  },
  {
    id: "ifpi-ads",
    year: "17–22",
    title: "Tecnólogo em ADS",
    org: "IFPI — Instituto Federal do Piauí",
    description:
      "Formação que consolidou base em desenvolvimento, arquitetura de software, estrutura de dados e visão prática de produto.",
    tags: ["ADS"],
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
    id: "etipi",
    title: "PiDigital / Detran-PI",
    org: "ETIPI — serviços digitais do cidadão",
    description:
      "Atuei na evolução de serviços digitais do Detran-PI para reduzir atrito no atendimento e levar mais autonomia ao cidadão. Entreguei fluxos como renovação de CNH com selfie, transferência de propriedade e primeiro emplacamento, além de padronizar feedbacks em um backoffice único. Resultado: operações reais, usadas em produção por cidadãos e servidores.",
    tags: ["Java/Spring", "React/Next", "Oracle", "RabbitMQ", "Keycloak"],
    variant: "primary",
  },
  {
    id: "jet",
    title: "Associação JET",
    org: "J&T — presença digital ponta a ponta",
    description:
      "A associação precisava captar, organizar e operar melhor sua base. Estruturei a solução ponta a ponta: landing para aquisição, backoffice para gestão e API para sustentar membros, patrocínios e check-in por CPF. Também deixei a operação mais leve com CMS sem deploy e build native que reduziu consumo de infraestrutura.",
    tags: ["Quarkus", "PostgreSQL", "React", "Next.js", "Strapi"],
    variant: "secondary",
  },
  {
    id: "datasales",
    title: "Datasales",
    org: "Automação de marketing para varejo",
    description:
      "Trabalhei em produto de automação para varejo que centralizava campanhas em múltiplos canais. No front, organizei fluxos longos com validações até o envio; no backend, integrei Facebook, Instagram, WhatsApp e SMS em arquitetura serverless. Resultado: operação mais fluida para equipes de marketing e produto em uso real.",
    tags: ["React", "Node", "TypeScript", "AWS"],
    href: "https://datasales.io/",
    variant: "accent",
  },
];

export type SiteTech = {
  id: string;
  name: string;
};

export const tech: SiteTech[] = [
  { id: "react", name: "React" },
  { id: "node", name: "Node.js" },
  { id: "java", name: "Java" },
  { id: "spring", name: "Spring" },
  { id: "quarkus", name: "Quarkus" },
  { id: "sql", name: "PostgreSQL" },
  { id: "rabbit", name: "RabbitMQ" },
  { id: "python", name: "Python" },
  { id: "ts", name: "TypeScript" },
  { id: "next", name: "Next.js" },
];

export type SiteSkill = {
  label: string;
  value: number;
  variant: NonNullable<ProgressProps["variant"]>;
};

export const skills: SiteSkill[] = [
  { label: "React", value: 85, variant: "primary" },
  { label: "Node", value: 85, variant: "mana" },
  { label: "Java / Spring / Quarkus", value: 85, variant: "accent" },
  { label: "SQL", value: 75, variant: "exp" },
  { label: "RabbitMQ", value: 60, variant: "warning" },
  { label: "Python", value: 50, variant: "secondary" },
];
