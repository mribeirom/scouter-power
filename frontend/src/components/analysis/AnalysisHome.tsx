import { Button } from "../ui/Button";

export function AnalysisHome() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6">
      {/* Aura Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/20 rounded-full animate-aura-pulse z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-ki-gold/10 rounded-full animate-aura-pulse-slow z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl">
        <div className="inline-block mb-6 px-3 py-1 bg-accent/10 border border-accent/30 rounded-sm">
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase animate-pulse">
            Scanning potential... It's over 8,000!
          </span>
        </div>
        <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tighter leading-[0.85] italic mb-6 animate-reveal-up">
          Descubra seu <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-ki-gold">
            Nivel de força
          </span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 text-balance animate-reveal-up-delay-1">
          Classifique seus levantamentos com base em dados de vários praticantes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-reveal-up-delay-2">
          <Button className="px-10 py-5 text-2xl" onClick={() => document.getElementById('analysis')?.scrollIntoView({ behavior: 'smooth' })}>
            Analisar Força
          </Button>
        </div>
      </div>

      {/* Decorative Scouter Frame */}
      <div className="absolute bottom-10 left-10 hidden lg:block font-mono text-[10px] text-accent/40">
        <div>COORD: 35.21.009</div>
        <div>STATUS: OVERLOAD</div>
        <div className="w-32 h-1 bg-accent/20 mt-1">
          <div className="w-3/4 h-full bg-accent animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
