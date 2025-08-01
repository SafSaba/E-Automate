
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Linkedin, Mail } from 'lucide-react';

const projects = [
  {
    name: 'E-Automate-SafSaba',
    description: 'A fully functional e-commerce web application built with Next.js, Firebase, and Genkit for comprehensive automation testing and AI-powered features.',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Genkit'],
    href: 'https://github.com/your-username/e-automate-safsaba',
  },
  {
    name: 'Project Two',
    description: 'A brief and engaging description of another one of your standout projects. Highlight the key technologies and what you learned.',
    tags: ['React', 'Node.js', 'GraphQL', 'MongoDB'],
    href: 'https://github.com/your-username/project-two',
  },
  {
    name: 'Project Three',
    description: 'Describe your third project here. Focus on the problem it solves and the impact it had. Keep it concise and compelling for recruiters.',
    tags: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    href: 'https://github.com/your-username/project-three',
  },
];

const skills = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'Firebase', 'Google Cloud', 'Genkit', 'Tailwind CSS',
  'Git & GitHub', 'CI/CD', 'Agile Methodologies'
];

export default function AboutPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <Card className="sticky top-20 text-center">
              <CardContent className="p-6">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/50">
                  {/* Replace with your actual image URL */}
                  <AvatarImage src="https://placehold.co/200x200.png" alt="Safwan Saba" data-ai-hint="professional headshot" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold font-headline">Safwan Saba</h1>
                <p className="text-muted-foreground mt-1">[Your Title, e.g., Senior Software Engineer]</p>
                
                <div className="flex justify-center gap-4 mt-6">
                   <Button asChild variant="outline" size="icon">
                       <Link href="https://github.com/your-username" target="_blank"><Github className="h-5 w-5"/></Link>
                   </Button>
                   <Button asChild variant="outline" size="icon">
                       <Link href="https://linkedin.com/in/safwansaba" target="_blank"><Linkedin className="h-5 w-5"/></Link>
                   </Button>
                   <Button asChild variant="outline" size="icon">
                       <Link href="mailto:your-email@example.com"><Mail className="h-5 w-5"/></Link>
                   </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Hello! I'm Safwan Saba, a passionate and results-driven software engineer with a knack for building innovative and efficient solutions. My journey in technology has been driven by a deep curiosity and a desire to solve complex problems.
                </p>
                <p>
                  Here, you can write a compelling paragraph about your professional background. Mention your years of experience, key areas of expertise (e.g., front-end, back-end, AI), and the types of companies or projects you've worked on.
                </p>
                 <p>
                  This is a great place to add a bit about your personal interests or what motivates you. It helps recruiters see the person behind the code! For example: "When I'm not coding, I enjoy [Your Hobby 1] and [Your Hobby 2]."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Here are a few projects I'm proud of. You can find more on my GitHub.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {projects.map((project) => (
                  <div key={project.name} className="flex flex-col sm:flex-row gap-6 p-4 border rounded-lg hover:bg-card">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-muted-foreground mt-1 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                       <Button asChild>
                           <Link href={project.href} target="_blank">View on GitHub <Github className="ml-2 h-4 w-4"/></Link>
                       </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
