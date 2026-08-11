import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { AnalysisResult } from "./AnalysisResult";
import { analyzeStrength } from "../../lib/api";
import { strengthAnalysisSchema, type StrengthAnalysisFormData, EXERCISES, GENDERS } from "../../lib/schema";

export function AnalysisForm() {
  const [result, setResult] = useState<null | {
    powerLevel: number;
    classification: string;
    details: {
      levantamento: string;
      carga: number;
      repeticao: number;
    };
  }>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<StrengthAnalysisFormData>({
    resolver: zodResolver(strengthAnalysisSchema),
    defaultValues: {
      levantamento: "supino",
      genero: "masculino",
    }
  });

  const analyzeMutation = useMutation({
    mutationFn: analyzeStrength,
    onSuccess: (data, variables) => {
      setResult({
        powerLevel: data.rm1_estimado_kg,
        classification: data.classificacao,
        details: { 
          levantamento: variables.exercicio, 
          carga: variables.peso_exercicio, 
          repeticao: variables.repeticoes 
        }
      });
      toast.success("Análise concluída com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao analisar força:", error);
      toast.error(error instanceof Error ? error.message : "Ocorreu um erro ao conectar com o servidor.");
    }
  });

  const onSubmit = (data: StrengthAnalysisFormData) => {
    analyzeMutation.mutate({
      exercicio: data.levantamento,
      genero: data.genero,
      idade: data.idade,
      peso_corporal: data.peso,
      peso_exercicio: data.carga,
      repeticoes: data.repeticao
    });
  };

  const isCalculating = analyzeMutation.isPending;

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

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="levantamento">Levantamento</Label>
                <select
                  id="levantamento"
                  {...register("levantamento")}
                  className="flex w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors capitalize"
                >
                  {EXERCISES.map(ex => (
                    <option key={ex} value={ex}>{ex}</option>
                  ))}
                </select>
                {errors.levantamento && <span className="text-destructive text-xs">{errors.levantamento.message}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="genero">Gênero</Label>
                <select
                  id="genero"
                  {...register("genero")}
                  className="flex w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors capitalize"
                >
                  {GENDERS.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {errors.genero && <span className="text-destructive text-xs">{errors.genero.message}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carga">Carga (kg)</Label>
                <Input
                  id="carga"
                  type="number"
                  step="0.5"
                  placeholder="100"
                  {...register("carga", { valueAsNumber: true })}
                />
                {errors.carga && <span className="text-destructive text-xs">{errors.carga.message}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  type="number"
                  placeholder="25"
                  {...register("idade", { valueAsNumber: true })}
                />
                {errors.idade && <span className="text-destructive text-xs">{errors.idade.message}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repeticao">Repetição</Label>
                <Input
                  id="repeticao"
                  type="number"
                  placeholder="5"
                  {...register("repeticao", { valueAsNumber: true })}
                />
                {errors.repeticao && <span className="text-destructive text-xs">{errors.repeticao.message}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  step="0.1"
                  placeholder="70"
                  {...register("peso", { valueAsNumber: true })}
                />
                {errors.peso && <span className="text-destructive text-xs">{errors.peso.message}</span>}
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto px-12 py-4 text-xl" disabled={isCalculating}>
              {isCalculating ? "Calculando..." : "Calcular"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
