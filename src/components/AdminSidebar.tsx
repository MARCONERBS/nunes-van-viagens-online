
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
  SidebarTrigger
} from "./ui/sidebar";
import {
  LayoutDashboard,
  Caravan,
  List,
  User,
  Clock,
  Map,
  CreditCard,
  PieChart,
  MessageSquare,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar variant="inset" className="bg-nunes-primary text-white">
      <SidebarHeader className="p-4 flex items-center">
        <Caravan size={28} className="text-nunes-accent mr-2" />
        <span className="text-xl font-bold logo">Nunes Van</span>
        <div className="flex-grow" />
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        <div className="p-4">
          <div className="text-sm text-white/70">Administrador</div>
          <div className="font-medium">{user?.name || 'Admin'}</div>
        </div>
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin")}>
              <Link to="/admin">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/rotas")}>
              <Link to="/admin">
                <Caravan />
                <span>Gerenciar Vans</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/rotas")}>
              <Link to="/admin">
                <Map />
                <span>Gerenciar Rotas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/horarios")}>
              <Link to="/admin">
                <Clock />
                <span>Horários</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/passagens")}>
              <Link to="/admin">
                <List />
                <span>Reservas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/pagamentos")}>
              <Link to="/admin">
                <CreditCard />
                <span>Pagamentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/clientes")}>
              <Link to="/admin">
                <User />
                <span>Clientes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/relatorios")}>
              <Link to="/admin">
                <PieChart />
                <span>Relatórios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/mensagens")}>
              <Link to="/admin">
                <MessageSquare />
                <span>Mensagens</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/configuracoes")}>
              <Link to="/admin">
                <Settings />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-white border-white hover:bg-white hover:text-nunes-primary"
        >
          <LogOut size={16} />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
      
      {/* Add the sidebar rail to allow reopening the menu when collapsed */}
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
