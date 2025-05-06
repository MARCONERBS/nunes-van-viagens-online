import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";
import { User, Shield, Briefcase, Edit2, Trash2 } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Administrador", email: "admin@nunesvan.com", role: "admin", createdAt: "2024-05-01" },
  { id: 2, name: "Supervisor 1", email: "supervisor1@nunesvan.com", role: "supervisor", createdAt: "2024-05-02" },
  { id: 3, name: "Funcionário 1", email: "func1@nunesvan.com", role: "funcionario", createdAt: "2024-05-03" },
];

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  supervisor: "Supervisor",
  funcionario: "Funcionário",
};

const roleBadges: Record<string, string> = {
  admin: "bg-blue-100 text-blue-800 border-blue-300",
  supervisor: "bg-green-100 text-green-800 border-green-300",
  funcionario: "bg-gray-100 text-gray-800 border-gray-300",
};

const roleIcons: Record<string, React.ReactNode> = {
  admin: <Shield className="text-blue-700" size={18} />,
  supervisor: <Briefcase className="text-green-700" size={18} />,
  funcionario: <User className="text-gray-700" size={18} />,
};

const AdminUsersPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("funcionario");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Usuário cadastrado (simulado)",
        description: `Nome: ${name}, Email: ${email}, Cargo: ${roleLabels[role]}`,
      });
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("funcionario");
    }, 1000);
  };

  return (
    <div className="max-w-8xl mx-auto py-10 w-full flex flex-col items-center min-h-[80vh] bg-transparent px-8">
      <Card className="border border-gray-200 w-full max-w-full mb-8 px-8 py-8 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold mb-2">CADASTRAR USUÁRIOS</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="name" className="text-xs font-medium mb-1">Nome*</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} required autoComplete="off" className="h-10 text-base" placeholder="Nome do usuário" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="email" className="text-xs font-medium mb-1">Email*</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="off" className="h-10 text-base" placeholder="Email" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="password" className="text-xs font-medium mb-1">Senha*</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" className="h-10 text-base" placeholder="Senha" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="role" className="text-xs font-medium mb-1">Cargo*</Label>
                <select id="role" value={role} onChange={e => setRole(e.target.value)} className="w-full border rounded px-2 py-2 text-base">
                  <option value="admin">Administrador</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="funcionario">Funcionário</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition h-10 text-base" disabled={loading}>
              {loading ? "Cadastrando..." : "SALVAR"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="border border-gray-200 w-full max-w-full px-6 py-6 mt-2 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold mb-2">LISTA DE USUÁRIOS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="sticky top-0 bg-white z-10 shadow-sm">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Nome</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Cargo</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Criado em</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">Nenhum usuário cadastrado ainda.</td>
                  </tr>
                ) : (
                  mockUsers.map(user => (
                    <tr key={user.id} className="border-b hover:bg-blue-50 transition">
                      <td className="px-3 py-2 flex items-center gap-2 font-medium">
                        {roleIcons[user.role]}
                        {user.name}
                      </td>
                      <td className="px-3 py-2">{user.email}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${roleBadges[user.role]}`}>{roleLabels[user.role]}</span>
                      </td>
                      <td className="px-3 py-2">{user.createdAt}</td>
                      <td className="px-3 py-2 flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1" title="Remover">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
