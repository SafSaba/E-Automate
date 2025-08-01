
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Linkedin, Mail } from 'lucide-react';

const projects = [
  {
    name: 'E-Automate',
    description: 'A fully functional e-commerce web application built with Next.js, Firebase, and Genkit for comprehensive automation testing and AI-powered features.',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Genkit'],
    href: 'https://github.com/SafSaba/E-Automate-SafSaba',
  },
  {
    name: 'Machine Learning Projects',
    description: 'A collection of hands-on classification projects demonstrating practical ML skills and concepts.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    href: 'https://github.com/SafSaba',
  },
];

const skills = [
    'Selenium WebDriver', 'REST Assured', 'Postman', 'Swagger', 'Playwright', 'TestNG', 'JUnit', 'Appium',
    'Java', 'Python', 'TypeScript', 'SQL',
    'Jenkins', 'Azure DevOps', 'Git', 'Docker',
    'MySQL', 'Oracle', 'SQL Server', 'JDBC', 'Informatica PowerCenter',
    'BDD (Cucumber, SpecFlow)', 'POM', 'Hybrid', 'DDT', 'TDD',
    'Splunk', 'Grafana', 'Azure App Insights',
    'Jira', 'ADO', 'Apache POI', 'JSON', 'Windows', 'Linux'
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
                  <AvatarImage src="/safwan-saba.png" alt="Safwan Saba" data-ai-hint="professional headshot" className="object-cover" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold font-headline">Safwan Saba</h1>
                <p className="text-muted-foreground mt-1 text-sm">Senior Software Engineer in Test & Aspiring Machine Learning Engineer | Actively developing skills in Python, MLOps, Leveraging a Decade in Systems Architecture and Cloud</p>
                
                <div className="flex justify-center gap-4 mt-6">
                   <Button asChild variant="outline" size="icon">
                       <Link href="https://github.com/SafSaba" target="_blank"><Github className="h-5 w-5"/></Link>
                   </Button>
                   <Button asChild variant="outline" size="icon">
                       <Link href="https://www.linkedin.com/in/safwansaba/" target="_blank"><Linkedin className="h-5 w-5"/></Link>
                   </Button>
                   <Button asChild variant="outline" size="icon">
                       <Link href="mailto:isafwan@outlook.com"><Mail className="h-5 w-5"/></Link>
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
                  My journey in technology began with a Bachelor's Degree in Software Engineering and Automated Systems, which provided a strong foundation for building and analyzing complex products. Early in my career, that foundation was put to the test when I discovered and reported a significant security flaw in iOS 5.0.1. That experience cemented my passion for ensuring system integrity from the deepest architectural levels.
                </p>
                <p>
                  I've always been driven by the challenge of solving complex problems and a core passion for building intelligent, high-quality systems from the ground up. My decade-long career as a Software Quality Engineer (SDET) provided me with a unique vantage point—a deep, architectural understanding of how disparate components must integrate flawlessly to create a robust and reliable product. I learned to see the entire system, identify gaps others might miss, and ensure quality at every stage.
                </p>
                 <p>
                  Now, I am channeling that same systems-thinking approach into the field of Machine Learning. I am actively deepening my expertise by studying for the AWS Certified AI - Foundation exam and building hands-on classification projects on GitHub "SafSaba'. This practical work is complemented by comprehensive training covering the full machine learning lifecycle—from advanced algorithms and Natural Language Processing (NLP) to MLOps principles and model deployment.
                </p>
                 <p>
                  I am seeking a Machine Learning Engineer role where I can apply my unique blend of architectural insight, automation experience, and new ML capabilities. I am eager to contribute to a team that values a quality-first approach to building the next generation of AI solutions.
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
