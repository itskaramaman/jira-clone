import { Home, Inbox } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const sidebarLinks = [
  {
    text: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    text: "Projects",
    icon: Inbox,
    path: "/projects",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="pt-28">
        <SidebarGroup>
          <SidebarMenu>
            {sidebarLinks.map((item) => (
              <SidebarMenuItem key={item.path}>
                <Link
                  href={item.path}
                  className="flex flex-row items-center gap-2 text-gray-600 hover:bg-blue-500 hover:text-white p-2 rounded-md"
                >
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
