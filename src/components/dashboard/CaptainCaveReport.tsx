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
    setTimeout(() => {
      setReport(`Ahoy! Captain Cave here with your ${selectedPeriod} analysis. 
      
Revenue streams showing strong momentum with a 23% uptick compared to last period. Customer acquisition has been stellar, with our conversion funnel performing at peak efficiency.

Key insights:
• Top performing segment: Premium subscriptions (+45%)
• Geographic growth: São Paulo region leading at 67% increase
• Customer retention: Solid 94% monthly retention rate
• Emerging opportunity: Corporate packages showing 156% growth potential

Strategic recommendations:
1. Double down on São Paulo market expansion
2. Enhance premium feature set to capture more value
3. Launch corporate sales initiative next quarter
4. Optimize pricing for maximum lifetime value

The data shows we're on the right trajectory, but there's untapped potential in our enterprise segment. Time to make some bold moves!`);
      setIsGenerating(false);
    }, 2000);
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
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateReport} disabled={isGenerating} className="bg-primary hover:bg-primary/90">
            {isGenerating ? "Analyzing..." : "Generate Report"}
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
              {isPlaying ? "Stop" : "Listen to Report"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}