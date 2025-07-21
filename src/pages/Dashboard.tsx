import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CaptainCaveReport } from "@/components/dashboard/CaptainCaveReport";
import { UserActivityCard } from "@/components/dashboard/UserActivityCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  UserCheck,
  Crown,
  RefreshCw,
  Download,
  Target
} from "lucide-react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

// Sample data for user analytics
const userGrowthData = [
  { month: "Jan", usuarios: 1200, novos: 240 },
  { month: "Fev", usuarios: 1450, novos: 250 },
  { month: "Mar", usuarios: 1780, novos: 330 },
  { month: "Abr", usuarios: 2100, novos: 320 },
  { month: "Mai", usuarios: 2450, novos: 350 },
  { month: "Jun", usuarios: 2800, novos: 350 },
];

const retentionData = [
  { name: "Ativos", value: 72, color: "hsl(var(--primary))" },
  { name: "Inativos", value: 18, color: "hsl(var(--chart-2))" },
  { name: "Cancelados", value: 10, color: "hsl(var(--chart-3))" },
];

const subscriptionTypes = [
  { name: "Premium", value: 45, color: "hsl(var(--primary))" },
  { name: "Gratuito", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Enterprise", value: 20, color: "hsl(var(--chart-4))" },
];


export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Dashboard de Usuários
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Acompanhe a atividade, aquisição e retenção dos seus usuários
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="glass-effect border-primary/30 hover:bg-primary/10">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Captain Cave Report */}
        <div className="mb-8">
          <CaptainCaveReport />
        </div>

        {/* Key User Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Usuários Ativos"
            value="2.847"
            subtitle="+15.3%"
            icon={Users}
            trend={{ value: "+15.3%", direction: "up" }}
          />
          <MetricCard
            title="Novos Cadastros"
            value="456"
            subtitle="+22.1%"
            icon={UserPlus}
            trend={{ value: "+22.1%", direction: "up" }}
          />
          <MetricCard
            title="Taxa de Retenção"
            value="84.2%"
            subtitle="+3.8%"
            icon={UserCheck}
            trend={{ value: "+3.8%", direction: "up" }}
          />
          <MetricCard
            title="Conversão para Premium"
            value="12.8%"
            subtitle="+5.2%"
            icon={Crown}
            trend={{ value: "+5.2%", direction: "up" }}
          />
        </div>

        {/* User Activity Card */}
        <div className="mb-8">
          <UserActivityCard />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="glass-effect border-primary/20 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Crescimento de Usuários
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Evolução da base de usuários e novos cadastros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--primary))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))"
                    }}
                  />
                  <Bar dataKey="usuarios" fill="hsl(var(--primary))" radius={4} name="Total de Usuários" />
                  <Bar dataKey="novos" fill="hsl(var(--chart-2))" radius={4} name="Novos Cadastros" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Retenção de Usuários
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Status atual dos usuários na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={retentionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {retentionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--primary))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {retentionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-effect border-primary/20 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Tendência de Atividade
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Evolução mensal da atividade dos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--primary))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="usuarios" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    name="Usuários Ativos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Tipos de Assinatura
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Distribuição dos planos de assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subscriptionTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--primary))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {subscriptionTypes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}