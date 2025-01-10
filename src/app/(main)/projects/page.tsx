import { getAllProjects } from "@/actions/project";
import ProjectCard from "./_components/ProjectCard";
import Link from "next/link";

const ProjectPage = async () => {
  const projects = await getAllProjects();

  return (
    <div className="w-full">
      <h1 className="text-6xl tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
        Recent Projects
      </h1>
      {projects.length === 0 ? (
        <div className="flex justify-center pt-5">
          <h1 className="text-xl text-muted-foreground">
            No projects yet, Lets create one.
          </h1>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
