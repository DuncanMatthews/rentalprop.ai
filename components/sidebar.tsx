import { Building } from "lucide-react";
import { SignOutButton } from "@/components/navigation/SignOutButton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData, SidebarItem, SidebarSubItem } from "@/lib/data";

export function DashboardSidebar() {
  return (
    <SidebarRoot>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Building className="h-6 w-6" />
          <span className="font-semibold">PropertyPro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, index) => (
                  <RenderSidebarItem key={`${item.label}-${index}`} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <SignOutButton />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </SidebarRoot>
  );
}

function RenderSidebarItem({ item }: { item: SidebarItem }) {
  if (item.type === "collapsible") {
    return (
      <Collapsible defaultOpen={item.defaultOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.tooltip}>
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((child, index) => (
                <RenderSidebarSubItem 
                  key={`${child.label}-${index}`} 
                  item={child} 
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.tooltip}>
        <a href={item.href}>
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function RenderSidebarSubItem({ item }: { item: SidebarSubItem }) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <a href={item.href}>
          <span>{item.label}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}