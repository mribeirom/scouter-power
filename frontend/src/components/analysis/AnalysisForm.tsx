import { useState } from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { AnalysisResult } from "./AnalysisResult";

export function AnalysisForm() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<null | {
    powerLevel: number;
    classification: string;
    details: {
      levantamento: string;
      carga: number;
      repeticao: number;
    };
  }>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const levantamento = formData.get("levantamento") as string;
    const carga = Number(formData.get("carga"));
    const repeticao = Number(formData.get("repeticao"));
    
    // Simple mock calculation for demonstration
    const powerLevel = Math.round(carga * (1 + repeticao / 30) * 85);
    
    let classification = "Iniciante";
    if (powerLevel > 4000) classification = "Intermediário";
    if (powerLevel > 8000) classification = "Avançado";
    if (powerLevel > 12000) classification = "Elite";

    setIsCalculating(true);

    setTimeout(() => {
      setResult({
        powerLevel,
        classification,
        details: { levantamento, carga, repeticao }
      });
      setIsCalculating(false);
    }, 800);
  };

  if (result) {
    return (
      <AnalysisResult
        powerLevel={result.powerLevel}
        classification={result.classification}
        details={result.details}
        onReset={() => setResult(null)}
      />
    );
  }

  return (
    <section id="analysis" className="py-24 px-6 max-w-5xl mx-auto animate-in fade-in zoom-in duration-500">
      <div 
        className={`bg-card p-1 relative overflow-hidden transition-all duration-500 ease-in-out border min-h-[650px] flex flex-col justify-center ${
          isCalculating 
            ? "scale-[1.03] border-primary border-4 shadow-[0_0_40px_rgba(var(--primary),0.6)]" 
            : "border-border"
        }`}
      >
        {/* Scouter corner accents */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 transition-colors duration-500 ${isCalculating ? 'border-primary' : 'border-accent'}`}></div>
        <div className={`absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 transition-colors duration-500 ${isCalculating ? 'border-primary' : 'border-accent'}`}></div>
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 transition-colors duration-500 ${isCalculating ? 'border-primary' : 'border-accent'}`}></div>
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 transition-colors duration-500 ${isCalculating ? 'border-primary' : 'border-accent'}`}></div>

        <div className="p-8 md:p-12">
          <div className="mb-10 text-center">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm">
              <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
                Input Protocol
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight italic mb-3">
              Análise de <span className="text-primary">Força</span>
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Insira seus dados para que o scouter calcule seu nível atual de força.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="levantamento">Levantamento</Label>
                <select
                  id="levantamento"
                  name="levantamento"
                  required
                  className="flex w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="supino">Supino</option>
                  <option value="agachamento">Agachamento</option>
                  <option value="levantamento terra">Levantamento Terra</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genero">Gênero</Label>
                <select
                  id="genero"
                  name="genero"
                  required
                  className="flex w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carga">Carga (kg)</Label>
                <Input
                  id="carga"
                  name="carga"
                  type="number"
                  min={0}
                  max={500}
                  step="0.5"
                  required
                  placeholder="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  name="idade"
                  type="number"
                  min={10}
                  max={120}
                  required
                  placeholder="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repeticao">Repetição</Label>
                <Input
                  id="repeticao"
                  name="repeticao"
                  type="number"
                  min={1}
                  max={100}
                  required
                  placeholder="5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  name="peso"
                  type="number"
                  min={20}
                  max={300}
                  step="0.1"
                  required
                  placeholder="70"
                />
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto px-12 py-4 text-xl">
              Calcular
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
