/**
 * Cloudinary Image URL Helper
 * Generates product image URLs from Cloudinary
 */

import { getProductImageUrl } from '../config/cloudinary';

/**
 * Generate image URL for a product
 * Usage: getImage('Unisex Long Slouchy Beanie (Pink)', 'headgear', 'Beanie')
 */
export const getImage = (
  productName: string,
  category: string,
  subcategory?: string
): string => {
  return getProductImageUrl(productName, category, subcategory);
};

export default getImage;
