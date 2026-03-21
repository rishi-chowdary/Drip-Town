/**
 * Quick Reference: Using Cloudinary in DripTown
 * 
 * Files involved:
 * 1. src/app/config/cloudinary.ts - Configuration and mappings
 * 2. src/app/utils/imageHelper.ts - Helper function
 * 3. src/app/data/products.ts - Product data
 * 4. .env.local - Environment variables (NOT in git)
 * 5. docs/CLOUDINARY_SETUP.md - Full setup guide
 */

// ============================================
// EXAMPLE 1: Getting Image URL in Components
// ============================================

import { getImage } from '@/app/utils/imageHelper';

export function ProductCard({ product }) {
  const imageUrl = getImage(
    product.name,           // "Unisex Long Slouchy Beanie (Pink)"
    product.category,       // "headgear"
    product.subcategory     // "Beanie"
  );

  return <img src={imageUrl} alt={product.name} />;
}

// ============================================
// EXAMPLE 2: Using in products.ts
// ============================================

import { getImage } from '../utils/imageHelper';

export const products = [
  {
    id: "beanie-slouchy-1",
    name: "Unisex Long Slouchy Beanie (Pink)",
    category: "headgear",
    subcategory: "Beanie",
    price: 45,
    image: getImage(
      "Unisex Long Slouchy Beanie (Pink)",
      "headgear",
      "Beanie"
    ),
    // ... rest of product
  },
];

// ============================================
// EXAMPLE 3: Direct URL Construction
// ============================================

import { getProductImageUrl } from '@/app/config/cloudinary';

const url = getProductImageUrl(
  "Blue Woolen Cap",
  "headgear"
);
console.log(url);
// Output: https://res.cloudinary.com/[CLOUD_NAME]/image/upload/headgear/shortcaps/blue

// ============================================
// EXAMPLE 4: Adding New Product with Image
// ============================================

// Step 1: Add to products.ts
const newProduct = {
  id: "new-product-1",
  name: "New Amazing Product",
  category: "smokn",
  price: 49,
  image: getImage("New Amazing Product", "smokn"),
  // ...
};

// Step 2: Add mapping to src/app/config/cloudinary.ts
const productImageMap = {
  'smokn': {
    'New Amazing Product': 'smokn/new-amazing-product',
    // ...
  }
};

// Step 3: Upload image to Cloudinary
// Path: cloudinary/smokn/new-amazing-product.[jpg/png]

// ============================================
// ENVIRONMENT SETUP
// ============================================

/* File: .env.local (DO NOT commit to git!)

VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_UPLOAD_PRESET=driptown_uploads
VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/your-cloud-name/image/upload

*/

// ============================================
// UPDATING PRODUCT IMAGES
// ============================================

/*
When you have image URLs from Cloudinary, update products.ts like:

{
  id: "beanie-slouchy-1",
  name: "Unisex Long Slouchy Beanie (Pink)",
  category: "headgear",
  subcategory: "Beanie",
  price: 45,
  image: getImage("Unisex Long Slouchy Beanie (Pink)", "headgear", "Beanie"),
  // Old: image: "https://via.placeholder.com/500x500?text=...",
  description: "...",
  colors: ["Pink"],
  sizes: ["One Size"],
}
*/

// ============================================
// CLOUDINARY FOLDER STRUCTURE
// ============================================

/*
cloudinary/
├── headgear/
│   ├── beanie/
│   │   ├── pink
│   │   ├── grey
│   │   ├── blue
│   │   ├── brown
│   │   └── tan
│   ├── headbands/
│   │   ├── darkgrey
│   │   ├── black
│   │   └── grey
│   └── shortcaps/
│       ├── black
│       ├── beluga
│       └── ...
├── smokn/
│   ├── archangel
│   ├── blackslim
│   └── ... (21 products)
├── riding/
├── belts/
├── socks/
└── accessories/
    ├── pocketwatch/
    ├── wallet/
    └── hanky/
*/

// ============================================
// COMMON TASKS
// ============================================

// Task: Get URL for a headgear beanie
import { getImage } from '@/app/utils/imageHelper';
const beanieUrl = getImage("Unisex Long Slouchy Beanie (Pink)", "headgear", "Beanie");

// Task: Get URL for a lighter
const lighterUrl = getImage("Archangel Fancy Lighter", "smokn");

// Task: Get all Cloudinary config
import cloudinaryConfig from '@/app/config/cloudinary';
console.log(cloudinaryConfig.cloudName);
console.log(cloudinaryConfig.baseUrl);

// ============================================
// FINAL CHECKLIST
// ============================================

/*
Before deploying:

☐ .env.local file created with real Cloudinary credentials
☐ Cloudinary account has all product images uploaded
☐ Folder structure matches config/cloudinary.ts mappings
☐ Product names in products.ts match image names in cloudinary.ts config
☐ All image URLs resolve correctly (test loading a product page)
☐ .env.local is in .gitignore (should not be committed)

*/
