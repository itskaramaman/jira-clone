"use client";

import React from "react";
import {
  ProjectStatusEnum,
  ProjectType,
  UserProjectType,
  UserType,
} from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSettingsSchema, ProjectSettingsSchemaType } from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

type Member = UserProjectType & { user: UserType };
type ProjectFormType = {
  project: ProjectType & { owner: UserType };
  members: Member[];
};

const ProjectForm = ({ project, members }: ProjectFormType) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    handleSubmit,
    trigger,
  } = useForm<ProjectSettingsSchemaType>({
    resolver: zodResolver(projectSettingsSchema),
    defaultValues: {
      name: project.name,
      description: project.description || "",
      members: members.map(
        (member) => `${member.user.name} : ${member.user.email}`
      ),
      status: project.status,
    },
  });

  const handleFormSubmit: SubmitHandler<ProjectSettingsSchemaType> = (
    formData
  ) => {
    console.log(formData);
  };

  console.log(errors);

  const handleRemoveEmail = async (member: string) => {
    const members = getValues("members")?.filter(
      (_member) => _member !== member
    );

    console.log(members);
    setValue("members", members);
    await trigger("members");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input type="text" {...register("name")} />
        {errors.name && (
          <span className="text-sm mt-1 text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>
      <div>
        <Label>Description</Label>
        <Textarea {...register("description")} />
        {errors.description && (
          <span className="text-sm mt-1 text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>

      <div>
        <Label>Project Manager</Label>
        <Input type="text" readOnly value={project.owner?.name} />
      </div>
      <div>
        <Label>Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select>
              <SelectTrigger className="w-[180px]" value={field.value}>
                <SelectValue
                  placeholder={
                    field.value.at(0)?.toUpperCase() +
                    field.value.toLocaleLowerCase().substring(1)
                  }
                  className="capitalize"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProjectStatusEnum.ACTIVE}>Active</SelectItem>
                <SelectItem value={ProjectStatusEnum.COMPLETED}>
                  Completed
                </SelectItem>
                <SelectItem value={ProjectStatusEnum.HOLD}>Hold</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <span className="text-sm mt-1 text-red-500">
            {errors.status.message}
          </span>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <Label>Invite Member</Label>
          <div className="flex gap-5">
            <Input type="email" />
            <Button variant="bgBlue">Invite</Button>
          </div>
          {errors.members && (
            <span className="text-sm mt-1 text-red-500">
              {errors.members.message}
            </span>
          )}
          {getValues("members")?.length !== 0 ? (
            <div className="border shadow-sm mt-2 rounded-md p-5">
              {getValues("members")?.map((member) => (
                <div key={member} className="relative inline-block">
                  <Badge
                    variant="outline"
                    className="bg-blue-500 text-white p-2 "
                  >
                    {member}
                  </Badge>
                  <Trash2
                    size={18}
                    onClick={() => handleRemoveEmail(member || "")}
                    className="absolute -top-1.5 -right-1.5 text-red-500 bg-white hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <Label>Members</Label>
          <div>
            {members.map((member) => (
              <Avatar key={member.id}>
                <AvatarImage
                  src={member.user.imageUrl || ""}
                  alt="member-image"
                />
                <AvatarFallback>
                  {member.user.name.at(0)?.toUpperCase() +
                    member.user.name.split(" ").at(1)?.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" variant="bgBlue" className="w-1/6">
        Update
      </Button>
    </form>
  );
};

export default ProjectForm;
