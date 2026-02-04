export type Phone = {
  id: string;
  name: string;
  brand: "Samsung" | "Apple" | "Xiaomi" | "Asus" | "Infinix";
  price: number;
  originalPrice?: number;
  rating: number;
  specs: {
    ram: number;
    storage: number;
    screen: string;
    refreshRate: number;
    battery: number;
    camMain: number;
    nfc: boolean;
    network: "4G" | "5G";
  };
  stock: number;
  image: string;
};

export const phones: Phone[] = [
  {
    id: "S25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: 19999000,
    rating: 5.0,
    specs: { ram: 12, storage: 512, screen: "6.8 AMOLED", refreshRate: 120, battery: 5000, camMain: 200, nfc: true, network: "5G" },
    stock: 5,
    image: "https://images.samsung.com/is/image/samsung/assets/id/2501/smartphones/galaxy-s25-ultra/specs/163x346_Titanium_Black_P3.jpg?$163_346_PNG$",
  },
  {
    id: "iphone-17",
    name: "iPhone 17 Pro",
    brand: "Apple",
    price: 18499000,
    rating: 9,
    specs: { ram: 12, storage: 256, screen: "6.9 OLED", refreshRate: 120, battery: 5088, camMain: 48, nfc: true, network: "5G" },
    stock: 8,
    image: "https://www.hellostore.id/cdn/shop/files/iPhone_17_Pro_Max_1.png?v=1759998375",
  },
  {
    id: "infinix-gt",
    name: "Infinix GT 10 Pro",
    brand: "Infinix",
    price: 3499000,
    rating: 4.5,
    specs: { ram: 8, storage: 256, screen: "6.67 AMOLED", refreshRate: 120, battery: 5000, camMain: 108, nfc: true, network: "5G" },
    stock: 2,
    image: "https://global.pro.infinixmobility.com/media/wysiwyg/x6739_gt10pro_base4.png",
  },
  {
    id: "Xiaomi 15T",
    name: "Xiaomi 15T",
    brand: "Xiaomi",
    price: 2799000,
    rating: 4.6,
    specs: { ram: 8, storage: 256, screen: "6.67 AMOLED", refreshRate: 120, battery: 5000, camMain: 108, nfc: true, network: "4G" },
    stock: 15,
    image: "https://media.dinomarket.com/docs/imgTD/2025-10/DM_9F657FFCE4A48338EBF59505C70B3F44_011025171053_ll.jpg",
  },
];