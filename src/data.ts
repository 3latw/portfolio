export const profile = {
  name: 'Alaa Ziad Tawalbeh',
  headline: 'Software Developer | Full Stack & Flutter | Computer Science Graduate at JUST',
  github: 'https://github.com/3latw',
  linkedin: 'https://www.linkedin.com/in/alaa-tawalbeh-1ab0b93b8/',
  phone: '+962 795333908',
  phoneHref: 'tel:+962795333908',
  email: '3latawalbeh@gmail.com',
  cvUrl: '/files/Alaa-Ziad-Tawalbeh-CV.pdf',
  heroVideo: '/media/IMG_673ppppp2.MP4' as string | null,
  heroPoster: '/media/alaa-portrait.jpg',
}

export type Project = {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  image?: string
  github?: string
  live?: string
  status: 'draft' | 'published'
}

// Only published records appear. Add completed projects here; no layout edits needed.
export const projects: Project[] = []

// Verified against the user-supplied CV.
export const skills = [
  { number: '01', name: 'Full Stack', subtitle: 'Web development', description: 'Web applications with ASP.NET Core, MVC architecture, authentication, and RESTful APIs.', tags: ['ASP.NET Core 6', 'C#', 'HTML5', 'CSS3', 'JavaScript', 'REST APIs'] },
  { number: '02', name: 'Flutter & Dart', subtitle: 'Mobile development', description: 'Cross-platform mobile application development with Flutter and Dart.', tags: ['Flutter', 'Dart', 'Mobile applications'] },
  { number: '03', name: 'Databases', subtitle: 'Data & integration', description: 'Database management and integration for web and mobile applications.', tags: ['SQL Server', 'MySQL', 'Entity Framework Core', 'Database Management'] },
  { number: '04', name: 'Developer Toolkit', subtitle: 'Tools & workflow', description: 'Version control, Python, and AI-assisted development as part of the development workflow.', tags: ['Git', 'GitHub', 'Python', 'AI-Assisted Development'] },
]
