import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Play, Square, Volume2 } from "lucide-react";

type Period = "daily" | "weekly" | "monthly" | "yearly" | "alltime";

export function CaptainCaveReport() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("monthly");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [report, setReport] = useState<string>("");

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reports = {
      daily: `Análise Diária dos Usuários - ${new Date().toLocaleDateString('pt-BR')}
      
Usuários Ativos: 234
Novos Cadastros: 18
Taxa de Retenção: 87%
Assinaturas Ativas: 156
Cancelamentos: 3

O dia apresenta forte engajamento dos usuários. A taxa de retenção está acima da média semanal e os novos cadastros mostram crescimento consistente.`,
      
      weekly: `Análise Semanal de Atividade dos Usuários
      
Usuários Ativos: 1,456
Novos Cadastros: 89
Taxa de Retenção: 82%
Assinaturas Ativas: 892
Cancelamentos: 12

Esta semana demonstra padrões consistentes de crescimento. A retenção de usuários melhorou 15% em comparação à semana passada.`,
      
      monthly: `Análise Mensal de Usuários e Aquisição
      
Usuários Ativos: 4,567
Novos Cadastros: 378
Taxa de Retenção: 84%
Assinaturas Ativas: 2,834
Cancelamentos: 45

Performance mensal supera expectativas. Fortes métricas de aquisição e retenção indicam crescimento saudável da base de usuários.`,
      
      yearly: `Análise Anual de Crescimento de Usuários
      
Usuários Ativos: 12,456
Novos Cadastros: 3,234
Taxa de Retenção: 86%
Assinaturas Ativas: 8,967
Cancelamentos: 234

Performance anual mostra crescimento excepcional. Todas as métricas principais demonstram expansão sustentada da base de usuários.`,
      
      alltime: `Análise Histórica Completa de Usuários
      
Total de Usuários: 25,678
Total de Cadastros: 18,456
Retenção Média: 85%
Assinaturas Totais: 15,234
Taxa de Conversão: 67%

Dados históricos revelam crescimento sólido com tendências consistentes de crescimento em todas as métricas de usuários.`
    };
    
    setReport(reports[selectedPeriod]);
    setIsGenerating(false);
  };

  const playReport = () => {
    setIsPlaying(!isPlaying);
    // Here we would integrate with speech synthesis
    if (!isPlaying && report) {
      const utterance = new SpeechSynthesisUtterance(report);
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      speechSynthesis.speak(utterance);
      utterance.onend = () => setIsPlaying(false);
    } else {
      speechSynthesis.cancel();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Mic className="h-5 w-5" />
          Captain Cave AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <Select value={selectedPeriod} onValueChange={(value: Period) => setSelectedPeriod(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
              <SelectItem value="alltime">Histórico</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateReport} disabled={isGenerating} className="bg-primary hover:bg-primary/90">
            {isGenerating ? "Analisando..." : "Gerar Relatório"}
          </Button>
        </div>

        {report && (
          <div className="space-y-4">
            <div className="bg-card/50 p-4 rounded-lg border">
              <pre className="whitespace-pre-wrap text-sm text-foreground">{report}</pre>
            </div>
            <Button 
              onClick={playReport} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              {isPlaying ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isPlaying ? "Parar" : "Ouvir Relatório"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}