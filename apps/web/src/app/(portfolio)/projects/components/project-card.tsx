import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectCardProps = {
  year: string;
  name: string;
  description: string;
  url?: string;
};

export default function ProjectCard({
  year,
  name,
  description,
  url,
}: ProjectCardProps) {
  return (
    <Card className="gap-3">
      <CardHeader className="gap-0">
        <CardDescription>{year}</CardDescription>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-balance">{description}</p>
      </CardContent>
      {url && (
        <CardFooter>
          <Button asChild>
            <a href={url} target="_blank">
              Visit
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
