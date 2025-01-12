import { getProjectById } from "@/actions/project";
import ProjectForm from "./_components/ProjectForm";

const ProjectSettings = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { project, members } = await getProjectById(id);
  return (
    <div>
      <h2 className="text-6xl tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text p-2">
        {project?.name}
      </h2>
      <ProjectForm project={project} members={members} />
    </div>
  );
};

export default ProjectSettings;
