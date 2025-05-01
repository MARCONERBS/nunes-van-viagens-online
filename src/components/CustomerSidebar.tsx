
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
  SidebarTrigger
} from "./ui/sidebar";
import {
  User,
  Caravan,
  List,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

const CustomerSidebar = () => {
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
          <div className="text-sm text-white/70">Bem-vindo,</div>
          <div className="font-medium">{user?.name}</div>
        </div>
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/my-account")}>
              <Link to="/my-account">
                <User />
                <span>Meu Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/my-account/passagens")}>
              <Link to="/my-account">
                <List />
                <span>Minhas Passagens</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/routes")}>
              <Link to="/routes">
                <Caravan />
                <span>Procurar Rotas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/my-account/configuracoes")}>
              <Link to="/my-account">
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
    </Sidebar>
  );
};

export default CustomerSidebar;
