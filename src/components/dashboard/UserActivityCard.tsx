import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Calendar,
  Crown,
  Clock,
  Filter,
  ChevronDown,
  ChevronRight,
  Activity
} from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "inactive" | "trial";
  subscription: "central-mensal" | "central-anual" | "desafio-caverna";
  lastActivity: string;
  joinDate: string;
  activityScore: number;
  activityLogs: string[];
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@exemplo.com",
    avatar: "/api/placeholder/40/40",
    status: "active",
    subscription: "central-anual",
    lastActivity: "2 horas atrás",
    joinDate: "15/01/2024",
    activityScore: 95,
    activityLogs: ["Login realizado", "Módulo concluído", "Exercício enviado"]
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@exemplo.com",
    avatar: "/api/placeholder/40/40",
    status: "active",
    subscription: "desafio-caverna",
    lastActivity: "30 min atrás",
    joinDate: "03/02/2024",
    activityScore: 88,
    activityLogs: ["Desafio iniciado", "Progresso salvo", "Comentário adicionado"]
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro@exemplo.com",
    avatar: "/api/placeholder/40/40",
    status: "trial",
    subscription: "central-mensal",
    lastActivity: "1 dia atrás",
    joinDate: "20/03/2024",
    activityScore: 72,
    activityLogs: ["Trial iniciado", "Primeira aula assistida"]
  },
  {
    id: "4",
    name: "Ana Oliveira",
    email: "ana@exemplo.com",
    avatar: "/api/placeholder/40/40",
    status: "active",
    subscription: "central-anual",
    lastActivity: "3 horas atrás",
    joinDate: "10/02/2024",
    activityScore: 91,
    activityLogs: ["Certificado obtido", "Avaliação completada", "Feedback enviado"]
  }
];

export function UserActivityCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter(user => {
    const statusMatch = statusFilter === "all" || user.status === statusFilter;
    const subscriptionMatch = subscriptionFilter === "all" || user.subscription === subscriptionFilter;
    return statusMatch && subscriptionMatch;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      trial: "outline"
    };
    const colors = {
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      trial: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status === "active" ? "Ativo" : status === "inactive" ? "Inativo" : "Trial"}
      </Badge>
    );
  };

  const getSubscriptionBadge = (subscription: string) => {
    const colors = {
      "central-mensal": "bg-primary/20 text-primary border-primary/30",
      "central-anual": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "desafio-caverna": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    };
    
    const icons = {
      "central-mensal": <Crown className="h-3 w-3 mr-1" />,
      "central-anual": <Crown className="h-3 w-3 mr-1" />,
      "desafio-caverna": <Activity className="h-3 w-3 mr-1" />
    };

    const labels = {
      "central-mensal": "Central Caverna Mensal",
      "central-anual": "Central Caverna Anual", 
      "desafio-caverna": "Desafio Caverna"
    };
    
    return (
      <Badge className={colors[subscription as keyof typeof colors]}>
        {icons[subscription as keyof typeof icons]}
        {labels[subscription as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="glass-effect border-primary/20 shadow-2xl">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isOpen ? <ChevronDown className="h-5 w-5 text-primary" /> : <ChevronRight className="h-5 w-5 text-primary" />}
                <div>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Atividade dos Usuários
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {isOpen ? "Acompanhe a atividade e status dos seus usuários" : `${filteredUsers.length} usuários • Clique para expandir`}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="glass-effect border-primary/20">
                  {filteredUsers.length} usuários
                </Badge>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="flex gap-4 mb-6">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 glass-effect border-primary/20 bg-background/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/20 z-50">
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                <SelectTrigger className="w-56 glass-effect border-primary/20 bg-background/50">
                  <SelectValue placeholder="Plano" />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/20 z-50">
                  <SelectItem value="all">Todos os Planos</SelectItem>
                  <SelectItem value="central-mensal">Central Caverna Mensal</SelectItem>
                  <SelectItem value="central-anual">Central Caverna Anual</SelectItem>
                  <SelectItem value="desafio-caverna">Desafio Caverna</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="glass-effect border-primary/30 hover:bg-primary/10">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avançados
              </Button>
            </div>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg glass-effect border border-primary/10 hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{user.name}</h4>
                        {getStatusBadge(user.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {user.lastActivity}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Desde {user.joinDate}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.activityLogs.map((log, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-muted/20 text-muted-foreground border-muted/30">
                            {log}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right space-y-2">
                      {getSubscriptionBadge(user.subscription)}
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        <span className="font-medium text-primary">{user.activityScore}%</span>
                        <span className="text-muted-foreground text-xs">atividade</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum usuário encontrado com os filtros selecionados</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}