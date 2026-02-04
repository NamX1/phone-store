"use client";
import { useState } from "react";
import { phones, Phone } from "@/app/data/phones"; // Sesuaikan path kalau beda
import { X, Sparkles, Cpu, Camera, Battery } from "lucide-react";
import ProductCard from "./ProductCard";

export default function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState(5000000);
  const [priority, setPriority] = useState<"gaming" | "camera" | "battery">("gaming");
  const [results, setResults] = useState<Phone[]>([]);

  if (!isOpen) return null;

  const handleFinish = () => {
    setStep(2);
    setLoading(true);

    setTimeout(() => {
      const filtered = phones
        .filter((p) => p.price <= budget + 1000000)
        .sort((a, b) => {
          if (priority === "gaming") return b.specs.refreshRate - a.specs.refreshRate;
          if (priority === "camera") return b.specs.camMain - a.specs.camMain;
          return b.specs.battery - a.specs.battery;
        })
        .slice(0, 2);
      
      setResults(filtered);
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const reset = () => { setStep(0); setResults([]); onClose(); };

  // Helper untuk format currency IDR (tetap IDR karena jual di Indo)
  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all">
      {/* Tambahin 'text-zinc-900' disini supaya semua teks jadi hitam */}
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-zinc-900">
        <button onClick={reset} className="absolute top-4 right-4 z-10 p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={20} /></button>

        {/* STEP 0: Budget */}
        {step === 0 && (
          <div className="p-8 text-center animate-in fade-in slide-in-from-bottom-4">
            <Sparkles className="mx-auto text-indigo-600 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">AI Smart Finder 🤖</h2>
            <p className="text-zinc-500 mb-8">Answer 2 questions, and our AI will find the best match.</p>
            
            <div className="mb-8 max-w-md mx-auto">
              <label className="block text-left font-bold mb-3 text-sm uppercase tracking-wider text-zinc-500">Max Budget</label>
              <input 
                type="range" min="2000000" max="25000000" step="500000" 
                value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right font-bold text-indigo-600 mt-2 text-xl">
                {fmt(budget)}
              </div>
            </div>
            <button onClick={() => setStep(1)} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">Next Step</button>
          </div>
        )}

        {/* STEP 1: Priority */}
        {step === 1 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-2xl font-bold mb-8 text-center">What is your priority?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: "gaming", label: "Gaming", icon: Cpu },
                { id: "camera", label: "Camera", icon: Camera },
                { id: "battery", label: "Battery", icon: Battery },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPriority(item.id as any)}
                  className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    priority === item.id 
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md" 
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <item.icon size={32} />
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
            </div>
            <button onClick={handleFinish} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">Find My Phone</button>
          </div>
        )}

        {/* STEP 2: Loading */}
        {step === 2 && (
          <div className="p-12 text-center flex flex-col items-center justify-center h-100">
            <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-6"></div>
            <h3 className="font-bold text-xl animate-pulse text-zinc-800">AI is analyzing specs...</h3>
            <p className="text-zinc-500 text-sm mt-2">Matching budget {fmt(budget)} with {priority} needs...</p>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 3 && (
          <div className="p-6 bg-zinc-50 h-137.5 overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 text-center text-zinc-900">Top Recommendations For You</h2>
            <div className="grid gap-4">
              {results.length > 0 ? (
                results.map((phone) => (
                  <div key={phone.id} className="scale-95 hover:scale-100 transition-transform duration-300">
                    <ProductCard phone={phone} />
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-zinc-400">
                  <p className="mb-4">No phones found within this budget :(</p>
                  <p className="text-sm">Try increasing your budget.</p>
                </div>
              )}
            </div>
            <button onClick={reset} className="w-full mt-6 bg-white border border-zinc-300 py-3 rounded-xl font-bold hover:bg-zinc-100 text-zinc-700 transition-colors">Search Again</button>
          </div>
        )}
      </div>
    </div>
  );
}