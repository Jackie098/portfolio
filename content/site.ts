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
  pitch:
    "Full stack em serviços públicos e produto: Java (Spring/Quarkus), React/Next e PostgreSQL — da API ao backoffice, em produção.",
  playerBio:
    "Pergunto até o produto achar rumo. Otimizo pelo budget e pela UX: app enxuto pro cliente, claro pra quem usa. Dou vida a ideia, amadureço produto e abro caminho que ainda não estava no mapa.",
  about: [
    "Formado em Análise e Desenvolvimento de Sistemas pelo IFPI. Hoje estou na ETIPI, no time de Sustentação do PiDigital: funcionalidades digitais do Detran-PI em Java/Spring, React/Next e RabbitMQ.",
    "Como freelancer, concebi e entreguei a plataforma da Associação JET (J&T): landing, backoffice e API em Quarkus + PostgreSQL.",
    "Antes, fullstack em varejo na Datasales (React, Node serverless, AWS e publicação em Facebook, Instagram, WhatsApp e SMS). Passagem mais curta na IPdelve, em patentes. Inglês: ETSET B2 — leio documentação; a fala ainda está em progresso.",
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
      "Sustentação do PiDigital: novas funcionalidades em Java e React para fluxos do Detran-PI (Renach e Renavam). Entregas em produção para cidadãos e servidores — renovação de CNH com selfie, transferência de propriedade e primeiro emplacamento.",
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
      "Presença digital ponta a ponta: landing Next.js, backoffice React e API Quarkus + PostgreSQL. Membros, patrocínio e check-in; CMS Strapi; produção native (GraalVM) com pipeline em Vercel, Railway e GitLab CI.",
    tags: ["Quarkus", "React", "PostgreSQL"],
    type: "work",
  },
  {
    id: "ipdelve",
    year: "2023",
    title: "Desenvolvedor Fullstack",
    org: "IPdelve — Floriano, PI",
    description:
      "React/Next na plataforma de patentes; Django REST quando a API travava o front.",
    tags: ["React", "Django REST"],
    type: "work",
  },
  {
    id: "datasales",
    year: "21–22",
    title: "Desenvolvedor Fullstack",
    org: "Datasales — São Paulo",
    description:
      "Automação de marketing para varejo: React (MUI), Node/TypeScript e serverless na AWS (Lambda, S3, RDS, CloudWatch). Publicação de artes no mesmo fluxo — Facebook, Instagram, WhatsApp e SMS — com formulários longos até o envio. APIs JWT/MySQL e correção de legado em Scrum.",
    tags: ["React", "Node", "AWS"],
    type: "work",
  },
  {
    id: "ifpi-ads",
    year: "17–22",
    title: "Tecnólogo em ADS",
    org: "IFPI — Instituto Federal do Piauí",
    description:
      "Análise e Desenvolvimento de Sistemas (março de 2017 – janeiro de 2022).",
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
      "Fila no balcão e fluxos do Detran ainda manuais. No time de Sustentação, evoluí Renach e Renavam em Java e React: renovação de CNH com selfie, transferência de propriedade e primeiro emplacamento. Padronizei feedbacks num backoffice unificado e colaborei na UI do Keycloak. Prova: serviços usados por cidadãos e servidores no Piauí.",
    tags: ["Java/Spring", "React/Next", "Oracle", "RabbitMQ", "Keycloak"],
    variant: "primary",
  },
  {
    id: "jet",
    title: "Associação JET",
    org: "J&T — presença digital ponta a ponta",
    description:
      "Associação precisava de captação e gestão operacional. Entreguei landing (Next.js) com pré-cadastro, backoffice (React + Vite) e API Quarkus + PostgreSQL: membros pagantes e patrocinados, categorias Ouro/Prata/Bronze e check-in por CPF. CMS Strapi para notícias sem deploy; native GraalVM cortou RAM de ~2 GB para picos de ~300 MB.",
    tags: ["Quarkus", "PostgreSQL", "React", "Next.js", "Strapi"],
    variant: "secondary",
  },
  {
    id: "datasales",
    title: "Datasales",
    org: "Automação de marketing para varejo",
    description:
      "Varejista precisava publicar encarte e campanha em várias plataformas no mesmo fluxo. Segmentei formulários com validações distintas até o envio e, no backend, integrei Facebook, Instagram, WhatsApp e SMS em Node serverless na AWS. Prova: produto vivo em datasales.io.",
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
