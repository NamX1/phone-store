"use client";
import { useState, useMemo } from "react";
import { phones } from "@/app/data/phones"; // Sesuaikan path
import ProductCard from "@/components/ProductCard"; // Sesuaikan path
import StickyCompare from "@/components/StickyCompare"; // Sesuaikan path
import QuizModal from "@/components/QuizModal"; // Sesuaikan path
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      const matchSearch = phone.name.toLowerCase().includes(search.toLowerCase());
      const matchBrand = selectedBrand === "All" || phone.brand === selectedBrand;
      return matchSearch && matchBrand;
    });
  }, [search, selectedBrand]);

  const brands = ["All", ...Array.from(new Set(phones.map((p) => p.brand)))];

  return (
    <main className="min-h-screen pb-32 bg-zinc-50 text-zinc-900 font-sans">
      {/* Header Hero */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
                TECH<span className="text-indigo-600">SPEC</span>
              </h1>
              <p className="text-zinc-500 text-sm">Best specs, student prices.</p>
            </div>
            
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="group flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Sparkles className="group-hover:animate-spin-slow text-yellow-400" size={16} />
              Ask AI Finder
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Samsung, iPhone, or specs..." 
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 border-transparent focus:bg-white border focus:border-indigo-600 rounded-xl outline-none transition-all text-sm font-medium placeholder:text-zinc-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                    selectedBrand === brand 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-zinc-500 font-medium">
          <SlidersHorizontal size={16} />
          Showing {filteredPhones.length} products
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhones.map((phone) => (
            <ProductCard key={phone.id} phone={phone} />
          ))}
        </div>
        
        {filteredPhones.length === 0 && (
          <div className="text-center py-24">
            <div className="text-zinc-300 text-6xl mb-4">🔍</div>
            <p className="text-zinc-500 font-medium">No products match your search.</p>
            <button onClick={() => {setSearch(""); setSelectedBrand("All")}} className="text-indigo-600 font-bold mt-2 hover:underline text-sm">Clear Filters</button>
          </div>
        )}
      </div>

      <StickyCompare />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}