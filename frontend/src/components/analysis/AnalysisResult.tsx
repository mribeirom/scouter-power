import { Button } from "../ui/Button";

interface AnalysisResultProps {
  powerLevel: number;
  classification: string;
  onReset: () => void;
  details?: {
    levantamento: string;
    carga: number;
    repeticao: number;
  };
}

export function AnalysisResult({
  powerLevel,
  classification,
  onReset,
  details,
}: AnalysisResultProps) {
  return (
    <section id="analysis-result" className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in zoom-in duration-500">
      <div className="bg-card border border-border p-1 relative overflow-hidden min-h-[650px] flex flex-col justify-center">
        {/* Scouter corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent"></div>

        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/result.svg"
              alt="Análise de Força"
              className="w-full max-w-lg h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-in slide-in-from-left duration-700"
            />
          </div>

          {/* Right Side: Results */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <div className="inline-block mb-8 px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm self-center md:self-start">
              <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase animate-pulse">
                Análise Concluída
              </span>
            </div>

            <div className="mb-12 flex flex-col gap-6 w-full">
              {/* Classification Block */}
              <div className="bg-background/40 border-l-4 border-accent p-6 relative overflow-hidden group transition-all hover:bg-background/60">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-accent"></div>
                </div>

                <h3 className="font-mono text-[11px] text-foreground/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent/50 animate-pulse"></span>
                  Análise: {details?.levantamento || 'Supino'}
                </h3>

                <p className="font-display text-lg md:text-xl uppercase tracking-wide text-foreground/80 leading-tight">
                  Seu nível de força é
                  <span className="block mt-1 text-4xl md:text-6xl text-accent drop-shadow-[0_0_12px_rgba(var(--accent),0.4)]">
                    {classification}
                  </span>
                </p>
              </div>

              {/* 1RM Estimate Block */}
              <div className="bg-background/40 border-l-4 border-primary p-6 relative overflow-hidden group transition-all hover:bg-background/60">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                </div>

                <h3 className="font-mono text-[11px] text-foreground/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary/50 animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                  Projeção de Carga
                </h3>

                <p className="font-display text-lg md:text-xl uppercase tracking-wide text-foreground/80 leading-tight">
                  Estimamos que seu máximo para 1 repetição seja
                  <span className="block mt-2 text-5xl md:text-7xl text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)] tracking-tighter">
                    20 <span className="text-2xl md:text-4xl text-primary/70">KG</span>
                  </span>
                </p>
              </div>
            </div>

            <div>
              <Button onClick={onReset} className="w-full md:w-auto px-12 py-4 text-xl">
                Nova Análise
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
