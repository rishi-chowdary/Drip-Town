export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  // Headwear (formerly Caps)
  {
    id: "cap-1",
    name: "Urban Shadow Cap",
    category: "headwear",
    price: 49,
    image: "https://images.unsplash.com/photo-1742548635624-02f0008b5027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3RyZWV0d2VhciUyMGNhcCUyMGJsYWNrfGVufDF8fHx8MTc3MzY0OTkzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium cotton cap with embroidered logo. Perfect for urban streetwear style.",
    colors: ["Black", "Grey", "White"],
    sizes: ["S/M", "L/XL"],
  },
  {
    id: "cap-2",
    name: "Minimal Logo Cap",
    category: "headwear",
    price: 55,
    image: "https://images.unsplash.com/photo-1742548635624-02f0008b5027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3RyZWV0d2VhciUyMGNhcCUyMGJsYWNrfGVufDF8fHx8MTc3MzY0OTkzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Clean streetwear cap with subtle branding and adjustable strap.",
    colors: ["Black", "Grey", "White"],
    sizes: ["S/M", "L/XL"],
  },
  {
    id: "cap-3",
    name: "Premium Fitted Cap",
    category: "headwear",
    price: 59,
    image: "https://images.unsplash.com/photo-1742548635624-02f0008b5027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3RyZWV0d2VhciUyMGNhcCUyMGJsYWNrfGVufDF8fHx8MTc3MzY0OTkzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Luxury cap with tonal embroidery and premium stitching.",
    colors: ["Black", "Grey"],
    sizes: ["S/M", "L/XL"],
  },

  // Smoking (formerly Lighters)
  {
    id: "lighter-1",
    name: "Minimal Metal Lighter",
    category: "smoking",
    price: 39,
    image: "https://images.unsplash.com/photo-1663416827986-550f1d4b8380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbGlnaHRlciUyMHNpbHZlciUyMGNocm9tZXxlbnwxfHx8fDE3NzM2NDk5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium metal lighter with sleek design and refillable mechanism.",
    colors: ["Silver", "Black", "Grey"],
  },
  {
    id: "lighter-2",
    name: "Electric Arc Lighter",
    category: "smoking",
    price: 45,
    image: "https://images.unsplash.com/photo-1663416827986-550f1d4b8380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbGlnaHRlciUyMHNpbHZlciUyMGNocm9tZXxlbnwxfHx8fDE3NzM2NDk5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Modern electric lighter with USB charging and windproof design.",
    colors: ["Silver", "Black", "White"],
  },
  {
    id: "lighter-3",
    name: "Classic Steel Lighter",
    category: "smoking",
    price: 49,
    image: "https://images.unsplash.com/photo-1663416827986-550f1d4b8380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbGlnaHRlciUyMHNpbHZlciUyMGNocm9tZXxlbnwxfHx8fDE3NzM2NDk5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Luxury steel lighter with engraved details and premium finish.",
    colors: ["Black", "Silver", "Grey"],
  },

  // Socks
  {
    id: "socks-1",
    name: "Premium Cotton Socks",
    category: "socks",
    price: 29,
    image: "https://images.unsplash.com/photo-1679391903287-b52bee558313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNvY2tzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzczNjQ5OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium cotton blend socks with minimal branding and comfort fit.",
    colors: ["Black", "Grey", "White"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "socks-2",
    name: "Essential Socks Pack",
    category: "socks",
    price: 39,
    image: "https://images.unsplash.com/photo-1679391903287-b52bee558313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNvY2tzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzczNjQ5OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "3-pack premium socks with clean designs and reinforced toe.",
    colors: ["Black Pack", "Mixed Pack"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "socks-3",
    name: "Performance Socks",
    category: "socks",
    price: 34,
    image: "https://images.unsplash.com/photo-1679391903287-b52bee558313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNvY2tzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzczNjQ5OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium athletic socks with moisture-wicking technology.",
    colors: ["Black", "Grey", "White"],
    sizes: ["S", "M", "L"],
  },

  // Stockings
  {
    id: "stocking-1",
    name: "Classic Mesh Stockings",
    category: "stockings",
    price: 44,
    image: "https://images.unsplash.com/photo-1763906472357-f08f61969476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdG9ja2luZ3MlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzY0OTkzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium fashion stockings with timeless design and comfortable fit.",
    colors: ["Black", "Grey", "White"],
    sizes: ["XS/S", "M/L", "XL"],
  },
  {
    id: "stocking-2",
    name: "Luxury Pattern Stockings",
    category: "stockings",
    price: 49,
    image: "https://images.unsplash.com/photo-1763906472357-f08f61969476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdG9ja2luZ3MlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzY0OTkzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Designer stockings with subtle patterns and luxury materials.",
    colors: ["Black", "Grey"],
    sizes: ["XS/S", "M/L", "XL"],
  },

  // Riding Gear
  {
    id: "riding-1",
    name: "Premium Rider Gloves",
    category: "riding",
    price: 79,
    image: "https://images.unsplash.com/photo-1763919417453-dea1172b98fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmlkaW5nJTIwZ2VhcnxlbnwxfHx8fDE3NzM2NDk5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium riding gloves with reinforced palms and touchscreen compatibility.",
    colors: ["Black", "Grey"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "riding-2",
    name: "Urban Rider Jacket",
    category: "riding",
    price: 249,
    image: "https://images.unsplash.com/photo-1763919417453-dea1172b98fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmlkaW5nJTIwZ2VhcnxlbnwxfHx8fDE3NzM2NDk5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Armored riding jacket with reflective details and premium construction.",
    colors: ["Black", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "riding-3",
    name: "Performance Rider Boots",
    category: "riding",
    price: 189,
    image: "https://images.unsplash.com/photo-1763919417453-dea1172b98fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmlkaW5nJTIwZ2VhcnxlbnwxfHx8fDE3NzM2NDk5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Heavy-duty riding boots with steel toe and premium leather.",
    colors: ["Black", "Grey"],
    sizes: ["7", "8", "9", "10", "11", "12"],
  },

  // Mufflers
  {
    id: "muffler-1",
    name: "Classic Winter Muffler",
    category: "mufflers",
    price: 69,
    image: "https://images.unsplash.com/photo-1760551938138-712bd417c12f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBtdWZmbGVyJTIwc2NhcmYlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzY0OTkzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Luxury cashmere blend muffler with minimal design and soft texture.",
    colors: ["Black", "Grey", "White"],
  },
  {
    id: "muffler-2",
    name: "Premium Wool Muffler",
    category: "mufflers",
    price: 79,
    image: "https://images.unsplash.com/photo-1760551938138-712bd417c12f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBtdWZmbGVyJTIwc2NhcmYlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzY0OTkzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium winter scarf with clean lines and oversized fit.",
    colors: ["Black", "Grey", "White"],
  },
  {
    id: "muffler-3",
    name: "Luxury Cashmere Muffler",
    category: "mufflers",
    price: 89,
    image: "https://images.unsplash.com/photo-1760551938138-712bd417c12f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBtdWZmbGVyJTIwc2NhcmYlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzY0OTkzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Limited edition muffler with premium cashmere and luxury packaging.",
    colors: ["Black", "Grey"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};