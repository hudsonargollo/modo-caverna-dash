import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CaptainCaveReport } from "@/components/dashboard/CaptainCaveReport";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  RefreshCw,
  Download
} from "lucide-react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

// Sample data matching your current dashboard
const financialData = [
  { month: "Mai", receita: 120000, custos: 80000 },
  { month: "Jun", receita: 140000, custos: 85000 },
  { month: "Jul", receita: 160000, custos: 90000 },
  { month: "Ago", receita: 180000, custos: 95000 },
  { month: "Set", receita: 200000, custos: 100000 },
  { month: "Out", receita: 220000, custos: 110000 },
  { month: "Nov", receita: 240000, custos: 120000 },
  { month: "Dez", receita: 260000, custos: 130000 },
];

const statusData = [
  { name: "Autorizadas", value: 85, color: "hsl(var(--chart-2))" },
  { name: "Canceladas", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Pendentes", value: 5, color: "hsl(var(--chart-1))" },
];

const paymentMethodData = [
  { method: "PIX", value: 45 },
  { method: "Cartão", value: 35 },
  { method: "Boleto", value: 15 },
  { method: "Outros", value: 5 },
];


export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral do seu negócio</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Captain Cave AI Analysis */}
        <CaptainCaveReport />

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            title="Receita Total"
            value="R$ 794.584,11"
            subtitle="Custos: R$ 550.207,57"
            icon={DollarSign}
            trend={{ value: "+12.5%", direction: "up" }}
          />
          <MetricCard
            title="Lucro Líquido"
            value="R$ 244.376,54"
            subtitle="Margem: 30.8%"
            icon={TrendingUp}
            trend={{ value: "+8.2%", direction: "up" }}
          />
          <MetricCard
            title="Clientes Únicos"
            value="8.587"
            subtitle="Únicos"
            icon={Users}
            trend={{ value: "+5.1%", direction: "up" }}
          />
          <MetricCard
            title="Assinaturas Ativas"
            value="8.904"
            subtitle="Total Ativo"
            icon={Calendar}
            trend={{ value: "+3.4%", direction: "up" }}
          />
          <MetricCard
            title="Expira em 30 dias"
            value="166"
            subtitle="Reembolsos: 813"
            icon={TrendingDown}
            trend={{ value: "-2.1%", direction: "down" }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Financial Performance */}
          <Card className="glass-effect shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                📈 Performance Financeira
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    formatter={(value) => [`R$ ${value.toLocaleString()}`, ""]} 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="receita" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={3}
                    name="Receita"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="custos" 
                    stroke="hsl(var(--chart-4))" 
                    strokeWidth={2}
                    name="Custos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Transaction Status */}
          <Card className="glass-effect shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                📊 Status das Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="glass-effect shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                📊 Vendas e Métodos de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentMethodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="method" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Plano Caverna Section */}
        <Card className="glass-effect shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              🏔️ Plano Caverna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <MetricCard
                title="Ativos"
                value="3.856"
                className="bg-chart-2/10 border-chart-2/20"
              />
              <MetricCard
                title="Expirando"
                value="166"
                className="bg-chart-1/10 border-chart-1/20"
              />
              <MetricCard
                title="Expirados"
                value="1.073"
                className="bg-chart-4/10 border-chart-4/20"
              />
              <MetricCard
                title="Total"
                value="5.095"
                className="bg-muted/20 border-muted/30"
              />
              <MetricCard
                title="Receita"
                value="R$ 0,00"
                className="bg-accent/10 border-accent/20"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}