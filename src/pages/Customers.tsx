import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Search } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  value: string;
  purchaseDate: string;
  expirationDate: string;
  status: "ativo" | "expirando" | "expirado";
  daysExpired: number;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "GURSKAS",
    email: "cassio.gurskas@gmail.com",
    phone: "N/A",
    plan: "Modo Caverna PA",
    value: "R$ 0,00",
    purchaseDate: "09/01/2024",
    expirationDate: "09/01/2024",
    status: "expirado",
    daysExpired: 558
  },
  {
    id: "2",
    name: "CLAUDINEI CORDEIRO",
    email: "claudineicordeiroadm@gmail.com",
    phone: "N/A",
    plan: "Modo Caverna AF",
    value: "R$ 0,00",
    purchaseDate: "09/01/2024",
    expirationDate: "09/01/2024",
    status: "expirado",
    daysExpired: 558
  },
  {
    id: "3",
    name: "CARLOS RENATO FÉLIX GAMA SILVA",
    email: "drcarlofgmail.com",
    phone: "N/A",
    plan: "Modo Caverna AF",
    value: "R$ 0,00",
    purchaseDate: "09/01/2024",
    expirationDate: "09/01/2024",
    status: "expirado",
    daysExpired: 558
  },
  {
    id: "4",
    name: "PEDRO BARROS",
    email: "barrospedro365@gmail.com",
    phone: "N/A",
    plan: "Central Caverna PA",
    value: "R$ 0,00",
    purchaseDate: "09/02/2024",
    expirationDate: "09/02/2024",
    status: "expirado",
    daysExpired: 528
  },
  {
    id: "5",
    name: "ANDERSON WILLY",
    email: "anderson.conexao.oficial@gmail.com",
    phone: "N/A",
    plan: "Modo Caverna CO",
    value: "R$ 0,00",
    purchaseDate: "09/02/2024",
    expirationDate: "09/02/2024",
    status: "expirado",
    daysExpired: 528
  },
  {
    id: "6",
    name: "JOÃO PEDRO NASCIMENTO QUADROS",
    email: "joaodpju09@gmail.com",
    phone: "N/A",
    plan: "Central Caverna APP",
    value: "R$ 0,00",
    purchaseDate: "09/02/2024",
    expirationDate: "09/02/2024",
    status: "expirado",
    daysExpired: 527
  }
];

const statusFilters = [
  { key: "todos", label: "Todos", active: true },
  { key: "ativo", label: "Ativos" },
  { key: "expirando", label: "Expirando" },
  { key: "expirado", label: "Expirados" }
];

export default function Customers() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesStatus = activeFilter === "todos" || customer.status === activeFilter;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-500 text-white">ATIVO</Badge>;
      case "expirando":
        return <Badge className="bg-yellow-500 text-white">EXPIRANDO</Badge>;
      case "expirado":
        return <Badge className="bg-red-500 text-white">EXPIRADO</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">{status.toUpperCase()}</Badge>;
    }
  };

  const totalStats = {
    ativos: mockCustomers.filter(c => c.status === "ativo").length,
    expirando: mockCustomers.filter(c => c.status === "expirando").length,
    expirados: mockCustomers.filter(c => c.status === "expirado").length,
    total: mockCustomers.length,
    receita: "R$ 0,00"
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">💎</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Plano Caverna</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalStats.total}</div>
            <div className="text-sm text-muted-foreground">Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalStats.expirando}</div>
            <div className="text-sm text-muted-foreground">Expirando</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalStats.expirados}</div>
            <div className="text-sm text-muted-foreground">Expirados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalStats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalStats.receita}</div>
            <div className="text-sm text-muted-foreground">Receita</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <div className="flex gap-1">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key)}
                  className={activeFilter === filter.key ? "bg-primary text-primary-foreground" : ""}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Buscar</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="glass-effect border-red-500/50 bg-zinc-900/80">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-foreground text-sm">
                    {customer.name}
                  </h3>
                  {getStatusBadge(customer.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-xs text-muted-foreground">{customer.email}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {customer.phone}
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <p className="text-sm font-medium text-foreground">{customer.plan}</p>
                  <p className="text-lg font-bold text-red-500">{customer.value}</p>
                  <p className="text-xs text-muted-foreground">N/A</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <p className="text-muted-foreground">COMPRA</p>
                    <p className="text-foreground">{customer.purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">EXPIRA</p>
                    <p className="text-foreground">{customer.expirationDate}</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium text-red-500">
                    {customer.daysExpired} dias expirado
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}