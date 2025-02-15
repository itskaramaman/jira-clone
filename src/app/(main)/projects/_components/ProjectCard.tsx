"use client";

import { ProjectStatusEnum, ProjectType, UserType } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowUpIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProjectCardProp = ProjectType & { owner: UserType } & {
  memberCount: number;
};

const ProjectCard = ({ project }: { project: ProjectCardProp }) => {
  const router = useRouter();

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/projects/settings/${project.id}`);
  };
  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <div className="absolute right-5 top-5">
        <span onClick={handleSettingsClick}>
          <Settings size={16} className="hover:animate-spin duration-1000" />
        </span>
      </div>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label className="flex items-center">
            <span>Project Status:</span>
            {project.status === ProjectStatusEnum.ACTIVE ? (
              <span className="text-blue-500 flex items-center">
                <ArrowUpIcon size={16} />
                Active
              </span>
            ) : project.status === ProjectStatusEnum.COMPLETED ? (
              <span>
                <CheckCircle2 className="text-green" /> Completed
              </span>
            ) : (
              <span>Hold</span>
            )}
          </Label>
          <Label>
            Manager:{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-1 rounded-md">
              {project.owner.name}
            </span>
          </Label>
          <Label>Members: {project.memberCount}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Created At: {format(new Date(project.createdAt), "PP")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
