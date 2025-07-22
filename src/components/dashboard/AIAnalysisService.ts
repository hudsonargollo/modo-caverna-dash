// AI Analysis Service for Capitão Cavernas
export interface MetricData {
  activeUsers: number;
  newUsers: number;
  retentionRate: number;
  conversionRate: number;
  userGrowthData: Array<{ month: string; usuarios: number; novos: number }>;
  retentionData: Array<{ name: string; value: number; color: string }>;
  subscriptionTypes: Array<{ name: string; value: number; color: string }>;
}

export interface AnalysisRequest {
  period: string;
  metrics: MetricData;
  selectedMetrics: string[];
  autoMode: boolean;
}

export interface AnalysisResponse {
  report: string;
  audioUrl?: string;
}

export class AIAnalysisService {
  private openAIKey: string | null = null;
  private fishAudioKey: string = "48a6209e69ae45f8a4964bba60234630";

  setOpenAIKey(key: string) {
    this.openAIKey = key;
    localStorage.setItem('openai_key', key);
  }

  getOpenAIKey(): string | null {
    if (!this.openAIKey) {
      this.openAIKey = localStorage.getItem('openai_key');
    }
    return this.openAIKey;
  }

  private generateCapitaoCavernasPrompt(data: AnalysisRequest): string {
    const { period, metrics, selectedMetrics } = data;
    
    const persona = `Você é o Capitão Cavernas, um sábio analista de dados com décadas de experiência. 
    Você é conhecido por sua sagacidade, sabedoria e capacidade de extrair insights profundos dos dados.
    Sua análise deve ser perspicaz, orientada por dados, mas também humana e compreensível.
    Use seu tom característico de sabedoria ancestral combinado com expertise analítica moderna.`;

    const contextualMetrics = selectedMetrics.map(metric => {
      switch (metric) {
        case 'activeUsers':
          return `Usuários Ativos: ${metrics.activeUsers.toLocaleString('pt-BR')}`;
        case 'newUsers':
          return `Novos Usuários: ${metrics.newUsers.toLocaleString('pt-BR')}`;
        case 'retentionRate':
          return `Taxa de Retenção: ${metrics.retentionRate}%`;
        case 'conversionRate':
          return `Taxa de Conversão: ${metrics.conversionRate}%`;
        case 'userGrowth':
          return `Crescimento de Usuários: ${JSON.stringify(metrics.userGrowthData)}`;
        case 'retention':
          return `Dados de Retenção: ${JSON.stringify(metrics.retentionData)}`;
        case 'subscriptions':
          return `Tipos de Assinatura: ${JSON.stringify(metrics.subscriptionTypes)}`;
        default:
          return '';
      }
    }).join('\n');

    return `${persona}

Analise os seguintes dados de ${period} com sua perspectiva sábia e experiente:

${contextualMetrics}

Forneça uma análise detalhada que inclua:
1. Insights principais sobre o comportamento dos usuários
2. Tendências identificadas nos dados
3. Recomendações estratégicas baseadas em sua experiência
4. Alertas sobre possíveis riscos ou oportunidades
5. Conclusões sábias sobre o estado geral da plataforma

Mantenha o tom profissional mas acessível, como se fosse um conselheiro experiente orientando uma equipe. 
Responda em português brasileiro.
Máximo de 500 palavras.`;
  }

  async generateAnalysis(data: AnalysisRequest): Promise<AnalysisResponse> {
    const openAIKey = this.getOpenAIKey();
    if (!openAIKey) {
      throw new Error('Chave da OpenAI necessária');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: this.generateCapitaoCavernasPrompt(data)
            }
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const result = await response.json();
      const report = result.choices[0]?.message?.content || 'Erro ao gerar análise';

      return { report };
    } catch (error) {
      console.error('Erro na análise AI:', error);
      throw error;
    }
  }

  async generateAudio(text: string): Promise<string> {
    try {
      const response = await fetch('https://api.fish.audio/v1/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.fishAudioKey}`,
        },
        body: JSON.stringify({
          text: text,
          voice: 'masculine_wise',
          speed: 0.9,
          pitch: 0.8,
          format: 'mp3'
        }),
      });

      if (!response.ok) {
        throw new Error(`Fish Audio API error: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Erro na geração de áudio:', error);
      // Fallback para browser speech synthesis
      return '';
    }
  }
}