import {
    Building,
    Home,
    Users,
    FileText,
    CreditCard,
    Wrench,
    Bell,
    Settings,
    type LucideIcon,
  } from "lucide-react";
  
  export interface SidebarItemBase {
    label: string;
    href?: string;
    icon?: LucideIcon;
    tooltip?: string;
  }
  
  export interface SidebarSubItem extends SidebarItemBase {
    type: "item";
  }
  
  export interface SidebarItemWithChildren extends SidebarItemBase {
    type: "collapsible";
    defaultOpen?: boolean;
    children: SidebarSubItem[];
  }
  
  export type SidebarItem = SidebarSubItem | SidebarItemWithChildren;
  
  export interface SidebarGroup {
    label: string;
    items: SidebarItem[];
  }
  
  export const sidebarData: SidebarGroup[] = [
    {
      label: "Management",
      items: [
        {
          type: "item",
          label: "Dashboard",
          href: "/dashboard",
          icon: Home,
          tooltip: "Dashboard",
        },
        {
          type: "collapsible",
          label: "Portfolio",
          icon: Building,
          tooltip: "Properties",
          defaultOpen: true,
          children: [
            {
              type: "item",
              label: "Overview",
              href: "/dashboard/properties",
            },
            {
              type: "item",
              label: "All Properties",
              href: "/dashboard/all-properties/",
            },
            {
              type: "item",
              label: "Add Property",
              href: "dashboard/all-properties/add/",
            },
            {
              type: "item",
              label: "Units & Rooms",
              href: "/dashboard/properties/units",
            },
            {
              type: "item",
              label: "Amenities",
              href: "/dashboard/properties/amenities",
            },
            {
              type: "item",
              label: "Performance",
              href: "/dashboard/properties/performance",
            },
          ],
        },
        {
          type: "item",
          label: "Tenants",
          href: "/dashboard/tenants",
          icon: Users,
          tooltip: "Tenants",
        },
        {
          type: "item",
          label: "Leases",
          href: "/dashboard/leases",
          icon: FileText,
          tooltip: "Leases",
        },
        {
          type: "item",
          label: "Payments",
          href: "/dashboard/payments",
          icon: CreditCard,
          tooltip: "Payments",
        },
        {
          type: "item",
          label: "Maintenance",
          href: "/dashboard/maintenance",
          icon: Wrench,
          tooltip: "Maintenance",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          type: "item",
          label: "Notifications",
          href: "/dashboard/notifications",
          icon: Bell,
          tooltip: "Notifications",
        },
        {
          type: "item",
          label: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
          tooltip: "Settings",
        },
      ],
    },
  ];