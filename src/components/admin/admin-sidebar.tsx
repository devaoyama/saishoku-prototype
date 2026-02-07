"use client";

import {
  BarChart3,
  Briefcase,
  Calendar,
  FileText,
  Home,
  LayoutDashboard,
  Link2,
  Sparkles,
  Tag,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "運営ダッシュボード", href: "/admin", icon: Home },
  { title: "パートナーダッシュボード", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "予約枠管理", href: "/admin/slots", icon: Calendar },
  { title: "おすすめ求人", href: "/admin/recommendations", icon: Sparkles },
];

const crmItems = [
  { title: "候補者一覧", href: "/admin/candidates", icon: Users },
  { title: "求人一覧", href: "/admin/jobs", icon: Briefcase },
  { title: "選考管理", href: "/admin/selections", icon: UserCheck },
];

const systemItems = [
  { title: "タグマスタ", href: "/admin/tags", icon: Tag },
  { title: "AI履歴書作成", href: "/admin/ai/resume", icon: FileText },
  { title: "市場価値診断", href: "/admin/ai/diagnosis", icon: BarChart3 },
  { title: "CV計測・分析", href: "/admin/analytics", icon: BarChart3 },
  { title: "外部連携", href: "/admin/integrations", icon: Link2 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="admin-sidebar border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-600">
            <span className="text-sm font-bold text-white">才</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">
            管理画面
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>パートナー・予約</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="bg-sidebar-border" />
        <SidebarGroup>
          <SidebarGroupLabel>CRM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {crmItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="bg-sidebar-border" />
        <SidebarGroup>
          <SidebarGroupLabel>AI・分析・連携</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
