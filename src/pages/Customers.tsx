import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Phone, Search, Download, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Purchase {
  id: string;
  plan: string;
  value: string;
  purchaseDate: string;
  expirationDate: string;
  status: "ativo" | "expirando" | "expirado";
  daysExpired?: number;
  isRefunded?: boolean;
  refundDate?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  purchases: Purchase[];
  totalSpent: string;
  lastActivity: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "GURSKAS",
    email: "cassio.gurskas@gmail.com",
    phone: "+55 11 99999-9999",
    totalSpent: "R$ 297,00",
    lastActivity: "2024-01-15",
    purchases: [
      {
        id: "p1",
        plan: "Modo Caverna PA",
        value: "R$ 97,00",
        purchaseDate: "09/01/2024",
        expirationDate: "09/01/2024",
        status: "expirado",
        daysExpired: 558
      },
      {
        id: "p2",
        plan: "Central Caverna Mensal",
        value: "R$ 200,00",
        purchaseDate: "15/06/2024",
        expirationDate: "15/07/2024",
        status: "expirado",
        daysExpired: 190
      }
    ]
  },
  {
    id: "2",
    name: "CLAUDINEI CORDEIRO",
    email: "claudineicordeiroadm@gmail.com",
    phone: "+55 21 88888-8888",
    totalSpent: "R$ 500,00",
    lastActivity: "2024-07-20",
    purchases: [
      {
        id: "p3",
        plan: "Modo Caverna AF",
        value: "R$ 150,00",
        purchaseDate: "09/01/2024",
        expirationDate: "09/01/2024",
        status: "expirado",
        daysExpired: 558
      },
      {
        id: "p4",
        plan: "Desafio Caverna",
        value: "R$ 350,00",
        purchaseDate: "20/07/2024",
        expirationDate: "20/08/2024",
        status: "ativo"
      }
    ]
  },
  {
    id: "3",
    name: "CARLOS RENATO FÉLIX GAMA SILVA",
    email: "drcarlofgmail.com",
    phone: "N/A",
    totalSpent: "R$ 97,00",
    lastActivity: "2024-01-09",
    purchases: [
      {
        id: "p5",
        plan: "Modo Caverna AF",
        value: "R$ 97,00",
        purchaseDate: "09/01/2024",
        expirationDate: "09/01/2024",
        status: "expirado",
        daysExpired: 558
      }
    ]
  },
  {
    id: "4",
    name: "PEDRO BARROS",
    email: "barrospedro365@gmail.com",
    phone: "+55 31 77777-7777",
    totalSpent: "R$ 150,00",
    lastActivity: "2024-02-09",
    purchases: [
      {
        id: "p6",
        plan: "Central Caverna PA",
        value: "R$ 250,00",
        purchaseDate: "09/02/2024",
        expirationDate: "09/02/2024",
        status: "expirado",
        daysExpired: 528,
        isRefunded: true,
        refundDate: "15/02/2024"
      },
      {
        id: "p7",
        plan: "Central Caverna Anual",
        value: "R$ 150,00",
        purchaseDate: "20/02/2024",
        expirationDate: "20/02/2025",
        status: "ativo"
      }
    ]
  },
  {
    id: "5",
    name: "ANDERSON WILLY",
    email: "anderson.conexao.oficial@gmail.com",
    phone: "+55 85 66666-6666",
    totalSpent: "R$ 147,00",
    lastActivity: "2024-02-09",
    purchases: [
      {
        id: "p8",
        plan: "Modo Caverna CO",
        value: "R$ 147,00",
        purchaseDate: "09/02/2024",
        expirationDate: "09/02/2024",
        status: "expirado",
        daysExpired: 528
      }
    ]
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
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const { toast } = useToast();

  // Get customer status based on their active purchases
  const getCustomerStatus = (customer: Customer) => {
    const activePurchases = customer.purchases.filter(p => !p.isRefunded);
    if (activePurchases.some(p => p.status === "ativo")) return "ativo";
    if (activePurchases.some(p => p.status === "expirando")) return "expirando";
    return "expirado";
  };

  const filteredCustomers = mockCustomers.filter(customer => {
    const customerStatus = getCustomerStatus(customer);
    const matchesStatus = activeFilter === "todos" || customerStatus === activeFilter;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ["Nome", "Email", "Telefone", "Plano", "Status", "Atividade"];
    const csvData = [headers];

    filteredCustomers.forEach(customer => {
      const customerStatus = getCustomerStatus(customer);
      const activePlans = customer.purchases
        .filter(p => !p.isRefunded)
        .map(p => p.plan)
        .join("; ");
      
      csvData.push([
        customer.name,
        customer.email,
        customer.phone,
        activePlans || "Nenhum plano ativo",
        customerStatus,
        customer.lastActivity
      ]);
    });

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `clientes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "CSV Exportado",
      description: `${filteredCustomers.length} clientes exportados com sucesso.`
    });
  };

  const toggleCardExpansion = (customerId: string) => {
    setExpandedCards(prev => 
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

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

  const getPurchaseStatusBadge = (purchase: Purchase) => {
    if (purchase.isRefunded) {
      return <Badge className="bg-orange-500 text-white">REEMBOLSADO</Badge>;
    }
    return getStatusBadge(purchase.status);
  };

  const totalStats = {
    ativos: mockCustomers.filter(c => getCustomerStatus(c) === "ativo").length,
    expirando: mockCustomers.filter(c => getCustomerStatus(c) === "expirando").length,
    expirados: mockCustomers.filter(c => getCustomerStatus(c) === "expirado").length,
    total: mockCustomers.length,
    receita: mockCustomers.reduce((sum, customer) => {
      const totalSpent = parseFloat(customer.totalSpent.replace("R$ ", "").replace(",", "."));
      return sum + totalSpent;
    }, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  };

  return (
    <DashboardLayout>
      <div className="spacing-responsive">
        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-r from-primary to-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">💎</span>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">Gerenciamento de Clientes</h1>
          </div>
          <Button 
            onClick={exportToCSV} 
            variant="premium" 
            size="lg"
            className="flex items-center gap-2 shadow-xl"
          >
            <Download className="h-4 w-4" />
            Exportar CSV ({filteredCustomers.length})
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20">
            <div className="text-2xl md:text-3xl font-bold text-foreground">{totalStats.ativos}</div>
            <div className="text-sm text-muted-foreground">Ativos</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20">
            <div className="text-2xl md:text-3xl font-bold text-foreground">{totalStats.expirando}</div>
            <div className="text-sm text-muted-foreground">Expirando</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20">
            <div className="text-2xl md:text-3xl font-bold text-foreground">{totalStats.expirados}</div>
            <div className="text-sm text-muted-foreground">Expirados</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20">
            <div className="text-2xl md:text-3xl font-bold text-foreground">{totalStats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/20 col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl font-bold text-foreground">{totalStats.receita}</div>
            <div className="text-sm text-muted-foreground">Receita</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-4 md:p-6 rounded-xl bg-background/40 backdrop-blur-sm border border-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-sm font-medium text-muted-foreground">Status</span>
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "filter"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key)}
                  className="shadow-md"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-sm font-medium text-muted-foreground">Buscar</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Digite o nome ou email do cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-white/90 backdrop-blur-sm border-primary/30 focus:border-primary/60 text-black placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {filteredCustomers.map((customer) => {
            const customerStatus = getCustomerStatus(customer);
            const isExpanded = expandedCards.includes(customer.id);
            const activePurchases = customer.purchases.filter(p => !p.isRefunded);
            const refundedPurchases = customer.purchases.filter(p => p.isRefunded);

            return (
              <Card key={customer.id} className="glass-effect border-primary/20 bg-zinc-900/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm font-semibold text-foreground line-clamp-2">
                      {customer.name}
                    </CardTitle>
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(customerStatus)}
                    </div>
                  </div>
                  
                  {/* Plan Pills */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {activePurchases.slice(0, 2).map((purchase, index) => (
                      <Badge 
                        key={purchase.id} 
                        className="text-xs px-2 py-1 bg-primary/20 text-primary border border-primary/30"
                      >
                        {purchase.plan.replace('Central Caverna', 'CC').replace('Modo Caverna', 'MC').replace('Desafio Caverna', 'DC')}
                      </Badge>
                    ))}
                    {activePurchases.length > 2 && (
                      <Badge className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground">
                        +{activePurchases.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-primary">{customer.totalSpent}</p>
                      <p className="text-xs text-muted-foreground">Total gasto</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">{customer.lastActivity}</p>
                      <p className="text-xs text-muted-foreground">Última atividade</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Collapsible open={isExpanded} onOpenChange={() => toggleCardExpansion(customer.id)}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full flex justify-between items-center p-3 hover:bg-primary/10 rounded-lg"
                      >
                        <span className="text-sm font-medium">
                          Ver compras ({customer.purchases.length})
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="space-y-3">
                      {/* Active Purchases */}
                      {activePurchases.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground mb-2">COMPRAS ATIVAS</h4>
                          {activePurchases.map((purchase) => (
                            <div key={purchase.id} className="border border-primary/20 rounded p-3 mb-2">
                              <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-foreground">{purchase.plan}</p>
                                {getPurchaseStatusBadge(purchase)}
                              </div>
                              <p className="text-lg font-bold text-primary mb-2">{purchase.value}</p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p className="text-muted-foreground">COMPRA</p>
                                  <p className="text-foreground">{purchase.purchaseDate}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">EXPIRA</p>
                                  <p className="text-foreground">{purchase.expirationDate}</p>
                                </div>
                              </div>
                              {purchase.daysExpired && (
                                <p className="text-sm text-red-500 mt-2">
                                  {purchase.daysExpired} dias expirado
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Refunded Purchases */}
                      {refundedPurchases.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground mb-2">REEMBOLSOS</h4>
                          {refundedPurchases.map((purchase) => (
                            <div key={purchase.id} className="border border-orange-500/20 rounded p-3 mb-2 bg-orange-500/5">
                              <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-foreground">{purchase.plan}</p>
                                {getPurchaseStatusBadge(purchase)}
                              </div>
                              <p className="text-lg font-bold text-orange-500 mb-2">{purchase.value}</p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p className="text-muted-foreground">COMPRA</p>
                                  <p className="text-foreground">{purchase.purchaseDate}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">REEMBOLSO</p>
                                  <p className="text-foreground">{purchase.refundDate}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}