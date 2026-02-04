"use client";
import { useStore } from "@/context/StoreContext"; // Sesuaikan path
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StickyCompare() {
  const { compareList, toggleCompare } = useStore();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-zinc-200 shadow-[0_-5px_30px_-5px_rgba(0,0,0,0.1)] p-4 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {compareList.map((phone) => (
                <div key={phone.id} className="relative group shrink-0 bg-white p-2 pl-3 pr-8 rounded-lg border border-zinc-200 shadow-sm w-44 flex items-center gap-3">
                    <img src={phone.image} className="w-8 h-8 object-contain mix-blend-multiply" />
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold truncate text-zinc-800">{phone.name}</p>
                        <p className="text-[10px] text-zinc-500">{phone.specs.ram}GB / {phone.specs.storage}GB</p>
                    </div>
                    <button 
                        onClick={() => toggleCompare(phone)}
                        className="absolute top-1/2 -translate-y-1/2 right-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded p-1 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
            
            <div className="hidden md:flex flex-col justify-center px-4 border-l border-zinc-200 min-w-fit">
                <span className="text-sm font-bold text-zinc-900">{compareList.length}/3</span>
                <span className="text-xs text-zinc-500">Selected</span>
            </div>
        </div>

        <Link 
            href="/compare" 
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-lg ${
                compareList.length > 1 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5" 
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
            }`}
            onClick={(e) => compareList.length < 2 && e.preventDefault()}
        >
            Compare Now <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}