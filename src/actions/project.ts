"use server";

import { db } from "@/lib/prisma";
import { UserRoleEnum } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createProject({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) throw new Error("User not found");

    const project = await db.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name,
          description,
          ownerId: user.id,
        },
      });

      await tx.userProject.create({
        data: {
          projectId: project.id,
          userId: user.id,
          role: UserRoleEnum.MANAGER,
        },
      });
    });

    revalidatePath("/projects");

    return { success: true, data: project };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error while creating project");
  }
}

export async function getAllProjects() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) throw new Error("User not found");

    const projects = await db.project.findMany({
      include: {
        owner: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const projectsWithMembers = await Promise.all(
      projects.map(async (project) => {
        const memberCount = await db.userProject.count({
          where: { projectId: project.id },
        });
        return { ...project, memberCount };
      })
    );

    console.log("projectMembersCount", projectsWithMembers);

    return projectsWithMembers;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Error while getting all projects");
  }
}
