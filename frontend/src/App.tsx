import { Header } from "./components/layout/Header";
import { AnalysisHome } from "./components/analysis/AnalysisHome";
import { AnalysisForm } from "./components/analysis/AnalysisForm";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Scouter Overlay Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-accent/30 animate-scanline"></div>
      </div>

      <Header />

      <main>
        <AnalysisHome />
        <AnalysisForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
