"use client";
import { useStore } from "@/context/StoreContext";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";

export default function ComparePage() {
  const { compareList, toggleCompare } = useStore();

  // Helper untuk highlight pemenang spek
  const isWinner = (val1: number, others: number[]) => {
    return val1 === Math.max(val1, ...others);
  };

  // Format Currency
  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

  if (compareList.length === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50">
            <h1 className="text-2xl font-bold mb-4 text-zinc-900">No phones selected</h1>
            <p className="text-zinc-500 mb-8">Please select at least 2 phones to compare.</p>
            <Link href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                Back to Store
            </Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-600 mb-8 font-medium transition-colors">
          <ArrowLeft size={20} /> Back to Catalog
        </Link>
        
        <h1 className="text-3xl font-black text-zinc-900 mb-8 text-center">Tech Specs Comparison</h1>

        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
                <thead>
                    <tr>
                        <th className="p-6 bg-zinc-50/50 min-w-50 font-bold text-zinc-400 uppercase tracking-wider text-xs">Model</th>
                        {compareList.map(phone => (
                            <th key={phone.id} className="p-6 min-w-62.5 border-b border-zinc-100 align-top relative group">
                                <button 
                                    onClick={() => toggleCompare(phone)}
                                    className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <img src={phone.image} className="w-32 h-32 object-contain mx-auto mb-6 mix-blend-multiply" />
                                <div className="text-center">
                                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">{phone.brand}</div>
                                    <h3 className="font-bold text-xl text-zinc-900 mb-2 leading-tight">{phone.name}</h3>
                                    <div className="text-indigo-600 font-bold text-lg bg-indigo-50 inline-block px-3 py-1 rounded-lg">
                                        {fmt(phone.price)}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                    {/* RAM */}
                    <tr className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-6 font-bold text-zinc-500">RAM</td>
                        {compareList.map(phone => {
                            const others = compareList.map(p => p.specs.ram);
                            const win = isWinner(phone.specs.ram, others);
                            return (
                                <td key={phone.id} className={`p-6 text-center ${win ? 'bg-green-50/50' : ''}`}>
                                    <span className={`text-lg ${win ? 'font-black text-green-700' : 'font-medium text-zinc-700'}`}>
                                        {phone.specs.ram} GB
                                    </span>
                                    {win && <Check size={16} className="inline-block ml-2 text-green-600" />}
                                </td>
                            )
                        })}
                    </tr>

                    {/* Storage */}
                    <tr className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-6 font-bold text-zinc-500">Storage</td>
                        {compareList.map(phone => {
                            const others = compareList.map(p => p.specs.storage);
                            const win = isWinner(phone.specs.storage, others);
                            return (
                                <td key={phone.id} className={`p-6 text-center ${win ? 'bg-green-50/50' : ''}`}>
                                    <span className={`text-lg ${win ? 'font-black text-green-700' : 'font-medium text-zinc-700'}`}>
                                        {phone.specs.storage} GB
                                    </span>
                                </td>
                            )
                        })}
                    </tr>

                    {/* Battery */}
                    <tr className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-6 font-bold text-zinc-500">Battery</td>
                        {compareList.map(phone => {
                            const others = compareList.map(p => p.specs.battery);
                            const win = isWinner(phone.specs.battery, others);
                            return (
                                <td key={phone.id} className={`p-6 text-center ${win ? 'bg-green-50/50' : ''}`}>
                                    <span className={`text-lg ${win ? 'font-black text-green-700' : 'font-medium text-zinc-700'}`}>
                                        {phone.specs.battery} mAh
                                    </span>
                                </td>
                            )
                        })}
                    </tr>

                     {/* Screen */}
                     <tr className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-6 font-bold text-zinc-500">Display</td>
                        {compareList.map(phone => {
                            const others = compareList.map(p => p.specs.refreshRate);
                            const win = isWinner(phone.specs.refreshRate, others);
                            return (
                                <td key={phone.id} className={`p-6 text-center ${win ? 'bg-green-50/50' : ''}`}>
                                    <div className="font-medium text-zinc-900">{phone.specs.screen}</div>
                                    <div className={`text-sm mt-1 ${win ? 'font-bold text-green-600' : 'text-zinc-500'}`}>
                                        {phone.specs.refreshRate}Hz Refresh Rate
                                    </div>
                                </td>
                            )
                        })}
                    </tr>

                    {/* Camera */}
                    <tr className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-6 font-bold text-zinc-500">Main Camera</td>
                        {compareList.map(phone => {
                            const others = compareList.map(p => p.specs.camMain);
                            const win = isWinner(phone.specs.camMain, others);
                            return (
                                <td key={phone.id} className={`p-6 text-center ${win ? 'bg-green-50/50' : ''}`}>
                                    <span className={`text-lg ${win ? 'font-black text-green-700' : 'font-medium text-zinc-700'}`}>
                                        {phone.specs.camMain} MP
                                    </span>
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}