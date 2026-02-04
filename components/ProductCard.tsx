"use client";
import { Phone } from "@/app/data/phones"; // Sesuaikan path
import { useStore } from "@/context/StoreContext"; // Sesuaikan path
import { Heart, BarChart2, Check } from "lucide-react";

export default function ProductCard({ phone }: { phone: Phone }) {
  const { wishlist, toggleWishlist, compareList, toggleCompare } = useStore();
  const isWishlisted = wishlist.includes(phone.id);
  const isCompared = compareList.some((p) => p.id === phone.id);

  // ENGLISH BADGES logic
  const badges = [];
  if (phone.specs.refreshRate >= 120) badges.push("Gaming Ready");
  if (phone.specs.camMain >= 100) badges.push("Pro Camera");
  if (phone.price < 5000000 && phone.specs.ram >= 8) badges.push("Best Value");

  const formatRupiah = (num: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col h-full relative">
      <div className="relative h-60 bg-zinc-50 p-6 flex items-center justify-center">
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {badges.map((badge) => (
                <span key={badge} className="bg-zinc-900/90 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                    {badge}
                </span>
            ))}
        </div>
        
        <button 
            onClick={() => toggleWishlist(phone.id)}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all z-10 text-zinc-400 hover:text-red-500"
        >
            <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </button>

        <img src={phone.image} alt={phone.name} className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-zinc-500 font-bold mb-1 uppercase tracking-wide">{phone.brand}</p>
        <h3 className="font-bold text-zinc-900 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">{phone.name}</h3>
        
        <div className="flex flex-wrap gap-2 text-[10px] text-zinc-500 mb-4 font-bold uppercase tracking-wide">
            <span className="bg-zinc-100 px-2 py-1 rounded border border-zinc-200">{phone.specs.ram}GB RAM</span>
            <span className="bg-zinc-100 px-2 py-1 rounded border border-zinc-200">{phone.specs.storage}GB</span>
            <span className="bg-zinc-100 px-2 py-1 rounded border border-zinc-200">{phone.specs.network}</span>
        </div>

        {phone.stock < 5 && (
             <div className="mb-4 text-xs text-red-600 font-bold flex items-center gap-1 animate-pulse bg-red-50 w-fit px-2 py-1 rounded">
                🔥 Low Stock: {phone.stock} left
             </div>
        )}

        <div className="mt-auto pt-4 border-t border-zinc-50 flex items-center justify-between">
            <div className="flex flex-col">
                {phone.originalPrice && (
                    <span className="text-xs text-zinc-400 line-through font-medium">{formatRupiah(phone.originalPrice)}</span>
                )}
                <span className="text-indigo-600 font-bold text-lg">{formatRupiah(phone.price)}</span>
            </div>
            
            <button 
                onClick={() => toggleCompare(phone)}
                className={`p-2.5 rounded-xl border transition-all ${isCompared ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'border-zinc-200 text-zinc-400 hover:border-indigo-600 hover:text-indigo-600 bg-white'}`}
                title="Compare"
            >
                {isCompared ? <Check size={18} /> : <BarChart2 size={18} />}
            </button>
        </div>
      </div>
    </div>
  );
}