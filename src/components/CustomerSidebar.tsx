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
  User,
  Caravan,
  List,
  Clock,
  Map,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  TicketIcon,
  Home
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
      
      <SidebarContent className="overflow-y-auto">
        <div className="p-4">
          <div className="text-sm text-white/70">Bem-vindo,</div>
          <div className="font-medium">{user?.name}</div>
        </div>
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/")}>
              <Link to="/">
                <Home />
                <span>Página Inicial</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
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
              <Link to="/my-account/passagens">
                <List />
                <span>Minhas Passagens</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/routes")}>
              <Link to="/routes">
                <Map />
                <span>Ver Rotas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/buy-ticket")}>
              <Link to="/routes">
                <TicketIcon />
                <span>Comprar Passagem</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/schedule")}>
              <Link to="/routes">
                <Clock />
                <span>Horários</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/payments")}>
              <Link to="/my-account">
                <CreditCard />
                <span>Meus Pagamentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/messages")}>
              <Link to="/my-account">
                <MessageSquare />
                <span>Mensagens</span>
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
      
      <SidebarFooter className="p-4 mt-auto sticky bottom-0">
        <Button 
          variant="outline" 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-white border-white hover:bg-white hover:text-nunes-primary"
        >
          <LogOut size={16} />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
};

export default CustomerSidebar;
