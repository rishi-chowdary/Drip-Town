/**
 * Cloudinary Configuration
 * Manages all image URLs from Cloudinary for the DripTown application
 */

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/your_cloud_name/image/upload';

/**
 * Product Image Mapping
 * Organize product images by category and then by product name
 * Format: "folder/productName" - Cloudinary will serve the image with this path
 */
export const productImageMap: Record<string, Record<string, string>> = {
  // Headgear - Beanie
  'headgear/beanie': {
    'Unisex Long Slouchy Beanie (Pink)': 'headgear/beanie/pink',
    'Unisex Long Slouchy Beanie (Grey)': 'headgear/beanie/grey',
    'Unisex Long Slouchy Beanie (Blue)': 'headgear/beanie/blue',
    'Unisex Long Slouchy Beanie (Brown)': 'headgear/beanie/brown',
    'Unisex Long Slouchy Beanie (Tan)': 'headgear/beanie/tan',
  },

  // Headgear - Headbands
  'headgear/headbands': {
    'Unisex Headband for Sports and Casual Wear (Dark Grey)': 'headgear/headbands/darkgrey',
    'Unisex Headband for Sports and Casual Wear (Black)': 'headgear/headbands/black',
    'Unisex Headband for Sports and Casual Wear (Grey)': 'headgear/headbands/grey',
  },

  // Headgear - Short Caps
  'headgear/shortcaps': {
    'Woolen Slouchy Beanie Cap (Black)': 'headgear/shortcaps/black',
    'Woolen Slouchy Beanie Cap (Beluga)': 'headgear/shortcaps/beluga',
    'Woolen Slouchy Beanie Cap (Graphite Grey)': 'headgear/shortcaps/graphitegrey',
    'Woolen Slouchy Beanie Cap (Navy Blue)': 'headgear/shortcaps/navyblue',
    'Woolen Slouchy Beanie Cap (Sky Blue)': 'headgear/shortcaps/skyblue',
    'Woolen Slouchy Beanie Cap (Red)': 'headgear/shortcaps/red',
    'Woolen Slouchy Beanie Cap (Brown)': 'headgear/shortcaps/brown',
    'Woolen Slouchy Beanie Cap (Green)': 'headgear/shortcaps/green',
  },

  // Smokn (Lighters)
  'smokn': {
    'Archangel Fancy Lighter': 'smokn/archangel',
    'Black Fancy Slim Lighter': 'smokn/blackslim',
    'Black Mini Lighter': 'smokn/blackmini',
    'Black Matte Keychain Lighter': 'smokn/blackmatte',
    'BMW Keychain Lighter': 'smokn/bmw',
    'Classic Gold Lighter': 'smokn/gold',
    'Copper Cigar Lighter': 'smokn/copper',
    'Toyota Keychain Lighter': 'smokn/toyota',
    'Dark Grey Cigar Lighter': 'smokn/darkgreycigar',
    'Death Note Lighter': 'smokn/deathnote',
    'Designer Gold Keychain Lighter': 'smokn/designergold',
    'Dollar Lighter': 'smokn/dollar',
    'E-LITE Lighter': 'smokn/elite',
    'Gold Feather Printed Lighter': 'smokn/goldfeather',
    'Grey Gear Lighter': 'smokn/greygear',
    'Jack Daniels Lighter': 'smokn/jackdaniels',
    'Leather Cigar Lighter': 'smokn/leathercigar',
    'Malboro Lighter': 'smokn/malboro',
    'Malboro Cigarette Shaped Lighter': 'smokn/malborscigarette',
    'Silver Mini Lighter': 'smokn/silvermini',
    'Supreme Mini Lighter': 'smokn/supreme',
  },

  // Riding Gear
  'riding': {
    'Half Gloves': 'riding/halfgloves',
    'Snow Gloves (Grey)': 'riding/snowgloves/grey',
    'Snow Gloves (Black)': 'riding/snowgloves/black',
  },

  // Belts
  'belts': {
    'Double Sided Belt': 'belts/doublesided',
    'Plain Black Belt': 'belts/plainblack',
    'Studded Belt': 'belts/studded',
  },

  // Socks
  'socks': {
    'Unisex Black Long Socks': 'socks/blacklong/single',
    'Unisex Black Long Socks (Pack of 4)': 'socks/blacklong/4pack',
    'Unisex Black Long Socks (Pack of 8)': 'socks/blacklong/8pack',
    'Unisex Black Long Socks (Pack of 12)': 'socks/blacklong/12pack',
    'Mixed Color Long Socks (Pack of 4)': 'socks/mixedlong/4pack',
    'Black Ankle Socks': 'socks/blackankle/single',
    'Black Ankle Socks (Pack of 3)': 'socks/blackankle/3pack',
    'Black Ankle Socks (Pack of 4)': 'socks/blackankle/4pack',
    'White Ankle Socks': 'socks/whiteankle/single',
    'White Ankle Socks (Pack of 3)': 'socks/whiteankle/3pack',
    'White Ankle Socks (Pack of 4)': 'socks/whiteankle/4pack',
    'Black Stockings': 'socks/blackstockings',
    'Black & White Stockings (2 Pairs)': 'socks/bwstockings/2pair',
    'Black & White Stockings (4 Pairs)': 'socks/bwstockings/4pair',
    'Black & White Stockings (6 Pairs)': 'socks/bwstockings/6pair',
    'White Stockings': 'socks/whitestockings',
  },

  // Accessories - Pocket Watch
  'accessories/pocketwatch': {
    'Flash Pocket Watch': 'accessories/pocketwatch/flash',
    'Attack on Titan Pocket Watch': 'accessories/pocketwatch/aot',
    'No Ghost Pocket Watch': 'accessories/pocketwatch/noghost',
    'Dragon Ball Z Goku Pocket Watch': 'accessories/pocketwatch/goku',
    'Antique Bronze Retro Pocket Watch': 'accessories/pocketwatch/bronze',
    'Superman Pocket Watch': 'accessories/pocketwatch/superman',
    'Skull Pocket Watch': 'accessories/pocketwatch/skull',
    'Batman Pocket Watch': 'accessories/pocketwatch/batman',
    'Football Pocket Watch': 'accessories/pocketwatch/football',
    'Tree Pocket Watch': 'accessories/pocketwatch/tree',
    'Captain America Shield Pocket Watch': 'accessories/pocketwatch/captainamerica',
    'Naruto Akatsuki Pocket Watch': 'accessories/pocketwatch/naruto',
  },

  // Accessories - Wallet
  'accessories/wallet': {
    'Brown Wallet': 'accessories/wallet/brown',
  },

  // Accessories - Hanky
  'accessories/hanky': {
    'White Hanky': 'accessories/hanky/white/single',
    'White Hanky (Pack of 3)': 'accessories/hanky/white/3pack',
  },
};

/**
 * Get full Cloudinary URL for a product image
 * @param productName - The product name
 * @param category - The category (e.g., 'headgear', 'smokn')
 * @param subcategory - Optional subcategory (e.g., 'beanie' for headgear)
 * @returns Full Cloudinary image URL
 */
export const getProductImageUrl = (
  productName: string,
  category: string,
  subcategory?: string
): string => {
  const key = subcategory ? `${category}/${subcategory}` : category;
  const imagePath = productImageMap[key]?.[productName];

  if (!imagePath) {
    console.warn(`Image mapping not found for: ${productName} (${key})`);
    return `${CLOUDINARY_BASE_URL}/placeholder`;
  }

  return `${CLOUDINARY_BASE_URL}/${imagePath}`;
};

/**
 * Get Cloudinary configuration from environment
 */
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'driptown',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  baseUrl: CLOUDINARY_BASE_URL,
};

export default cloudinaryConfig;
