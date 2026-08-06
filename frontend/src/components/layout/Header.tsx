import { Button } from "../ui/Button";

export function Header() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md px-6 py-2 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src="/favicon.svg" alt="Scouter" className="w-16 h-auto object-cover" />
        <span className="font-display text-2xl tracking-tight uppercase">
          Scouter<span className="text-primary">Power</span>
        </span>
      </div>


      <Button variant="ghost" className="px-4 py-2 text-xs">
        SYNC_DATA
      </Button>
    </nav>
  );
}
