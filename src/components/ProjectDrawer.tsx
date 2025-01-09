"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectSchemaType } from "@/lib/schema";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useFetch from "@/hooks/useFetch";
import { createProject } from "@/actions/project";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProjectDrawer = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ProjectSchemaType>({ resolver: zodResolver(projectSchema) });

  const { loading, data, fn: fnCreateProject } = useFetch(createProject);

  const handleFormSubmit: SubmitHandler<ProjectSchemaType> = async (
    formData
  ) => {
    await fnCreateProject(formData);
    reset();
  };

  useEffect(() => {
    if (!loading && data?.success) {
      toast.success("Project created successfully 🚀");
    }
  }, [data, loading]);

  useEffect(() => {
    if (searchParams.get("create-project")) {
      setOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    reset();
    setOpen(false);
    router.push("/");
  };

  return (
    <Drawer open={open} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Project</DrawerTitle>
        </DrawerHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-4 pb-5 space-y-2"
        >
          <div>
            <Label>Title</Label>
            <Input placeholder="First Project" {...register("name")} />
            {errors.name && (
              <span className="text-red-500 mt-1 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Project Description"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button className="w-full" variant="bgBlue" type="submit">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
            <DrawerClose asChild>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDrawer;
