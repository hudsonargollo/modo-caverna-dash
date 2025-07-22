import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Mic, Play, Square, Volume2, Settings, Key, Brain, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AIAnalysisService, MetricData, AnalysisRequest } from "./AIAnalysisService";

type Period = "daily" | "weekly" | "monthly" | "yearly" | "alltime";

interface CaptainCaveReportProps {
  metricsData?: MetricData;
}

export function CaptainCaveReport({ metricsData }: CaptainCaveReportProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("monthly");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [report, setReport] = useState<string>("");
  const [openAIKey, setOpenAIKey] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "activeUsers", "newUsers", "retentionRate", "conversionRate"
  ]);
  
  const aiService = new AIAnalysisService();

  // Default metrics data if not provided
  const defaultMetrics: MetricData = {
    activeUsers: 2847,
    newUsers: 456,
    retentionRate: 84.2,
    conversionRate: 12.8,
    userGrowthData: [
      { month: "Jan", usuarios: 1200, novos: 240 },
      { month: "Fev", usuarios: 1450, novos: 250 },
      { month: "Mar", usuarios: 1780, novos: 330 },
      { month: "Abr", usuarios: 2100, novos: 320 },
      { month: "Mai", usuarios: 2450, novos: 350 },
      { month: "Jun", usuarios: 2800, novos: 350 },
    ],
    retentionData: [
      { name: "Ativos", value: 72, color: "hsl(var(--primary))" },
      { name: "Inativos", value: 18, color: "hsl(var(--chart-2))" },
      { name: "Cancelados", value: 10, color: "hsl(var(--chart-3))" },
    ],
    subscriptionTypes: [
      { name: "Premium", value: 45, color: "hsl(var(--primary))" },
      { name: "Gratuito", value: 35, color: "hsl(var(--chart-2))" },
      { name: "Enterprise", value: 20, color: "hsl(var(--chart-4))" },
    ],
  };

  const currentMetrics = metricsData || defaultMetrics;

  // Auto-generate report on page load if auto mode is enabled
  useEffect(() => {
    if (autoMode && openAIKey && !report) {
      generateAIReport();
    }
  }, [autoMode, openAIKey]);

  // Load saved OpenAI key on mount
  useEffect(() => {
    const savedKey = aiService.getOpenAIKey();
    if (savedKey) {
      setOpenAIKey(savedKey);
    }
  }, []);

  const generateAIReport = async () => {
    if (!openAIKey) {
      toast.error("Por favor, configure sua chave da OpenAI nas configurações");
      setShowSettings(true);
      return;
    }

    setIsGenerating(true);
    setReport("");
    setAudioUrl("");

    try {
      aiService.setOpenAIKey(openAIKey);
      
      const analysisRequest: AnalysisRequest = {
        period: selectedPeriod,
        metrics: currentMetrics,
        selectedMetrics,
        autoMode,
      };

      const response = await aiService.generateAnalysis(analysisRequest);
      setReport(response.report);

      // Generate audio with Fish Audio
      try {
        const audio = await aiService.generateAudio(response.report);
        if (audio) {
          setAudioUrl(audio);
        }
      } catch (audioError) {
        console.warn("Falha na geração de áudio, usando speech synthesis do navegador");
      }

      toast.success("Análise do Capitão Cavernas gerada com sucesso!");
    } catch (error) {
      console.error("Erro na geração da análise:", error);
      toast.error("Erro ao gerar análise. Verifique sua chave da OpenAI.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const saveOpenAIKey = () => {
    if (openAIKey.trim()) {
      aiService.setOpenAIKey(openAIKey.trim());
      toast.success("Chave da OpenAI salva com sucesso!");
      setShowSettings(false);
    } else {
      toast.error("Por favor, insira uma chave válida");
    }
  };

  const playReport = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && report) {
      // Try Fish Audio first, fallback to browser speech synthesis
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(report);
        utterance.rate = 0.9;
        utterance.pitch = 0.8;
        speechSynthesis.speak(utterance);
        utterance.onend = () => setIsPlaying(false);
      }
    } else {
      speechSynthesis.cancel();
    }
  };

  const metricOptions = [
    { id: "activeUsers", label: "Usuários Ativos" },
    { id: "newUsers", label: "Novos Usuários" },
    { id: "retentionRate", label: "Taxa de Retenção" },
    { id: "conversionRate", label: "Taxa de Conversão" },
    { id: "userGrowth", label: "Crescimento de Usuários" },
    { id: "retention", label: "Dados de Retenção" },
    { id: "subscriptions", label: "Tipos de Assinatura" },
  ];

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-primary">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Capitão Cavernas - Análise IA
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Label htmlFor="auto-mode">Auto</Label>
              <Switch 
                id="auto-mode"
                checked={autoMode}
                onCheckedChange={setAutoMode}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSettings && (
          <Card className="p-4 border-dashed">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Key className="h-4 w-4" />
                Configurações da IA
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="openai-key">Chave OpenAI</Label>
                <div className="flex gap-2">
                  <Input
                    id="openai-key"
                    type="password"
                    placeholder="sk-..."
                    value={openAIKey}
                    onChange={(e) => setOpenAIKey(e.target.value)}
                  />
                  <Button onClick={saveOpenAIKey} size="sm">
                    Salvar
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Métricas para Análise</Label>
                <div className="grid grid-cols-2 gap-2">
                  {metricOptions.map((metric) => (
                    <div key={metric.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric.id}
                        checked={selectedMetrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                      />
                      <Label htmlFor={metric.id} className="text-sm">
                        {metric.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-4 items-center flex-wrap">
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
          <Button 
            onClick={generateAIReport} 
            disabled={isGenerating || !openAIKey} 
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Analisando...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Gerar Análise IA
              </>
            )}
          </Button>
        </div>

        {report && (
          <div className="space-y-4">
            <div className="bg-card/50 p-4 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <Mic className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Análise do Capitão Cavernas</span>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {report}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={playReport} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                {isPlaying ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isPlaying ? "Parar" : "Ouvir Análise"}
              </Button>
              {audioUrl && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 text-xs"
                >
                  <Sparkles className="h-3 w-3" />
                  Fish Audio
                </Button>
              )}
            </div>
          </div>
        )}

        {!openAIKey && !showSettings && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Key className="h-4 w-4" />
              <span className="text-sm">
                Configure sua chave da OpenAI para ativar a análise IA do Capitão Cavernas
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}