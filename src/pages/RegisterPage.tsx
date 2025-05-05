import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "../components/ui/use-toast";
import { supabase } from '../lib/supabaseClient';

const RegisterPage: React.FC = () => {
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const cpf = (form.elements.namedItem('cpf') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "A senha e a confirmação de senha devem ser iguais.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          cpf,
          phone,
          role: 'customer',
        },
      },
    });

    if (error) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu e-mail para confirmar a conta.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input 
                id="name" 
                placeholder="Digite seu nome completo" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input 
                id="cpf" 
                placeholder="000.000.000-00" 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                placeholder="(00) 00000-0000" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-nunes-primary hover:bg-nunes-primary/90"
            >
              Criar conta
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-nunes-secondary font-semibold hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
