"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Phone } from "@/app/data/phones";

type StoreContextType = {
  wishlist: string[];
  compareList: Phone[];
  toggleWishlist: (id: string) => void;
  toggleCompare: (phone: Phone) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Phone[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const toggleCompare = (phone: Phone) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === phone.id)) return prev.filter((p) => p.id !== phone.id);
      if (prev.length >= 3) { alert("Maksimal 3 HP!"); return prev; }
      return [...prev, phone];
    });
  };

  return (
    <StoreContext.Provider value={{ wishlist, compareList, toggleWishlist, toggleCompare }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore error");
  return context;
};