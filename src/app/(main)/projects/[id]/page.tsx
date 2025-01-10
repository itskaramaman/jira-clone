const Project = async ({ params }: { params: { id: string } }) => {
  const p = await params;
  console.log(p);
  return <div>Project</div>;
};

export default Project;
