"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function checkUser() {
  try {
    const user = await currentUser();

    if (!user) return;

    const dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (dbUser) return;

    await db.user.create({
      data: {
        name: user.fullName || "",
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        clerkUserId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error while check user in DB");
  }
}
