import { z } from "zod";
import { ProjectStatusEnum } from "./types";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;

export const projectSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  status: z.nativeEnum(ProjectStatusEnum),
  members: z.string().email().array().optional(),
});

export type ProjectSettingsSchemaType = z.infer<typeof projectSettingsSchema>;
