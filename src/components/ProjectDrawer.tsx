"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ProjectDrawer = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("create-project")) {
      setOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <Drawer open={open} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Project</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDrawer;
