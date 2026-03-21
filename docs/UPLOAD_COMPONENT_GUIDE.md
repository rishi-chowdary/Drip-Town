# Cloudinary Upload Component - Quick Start

## Access the Upload Page

Open your browser and go to:
```
http://localhost:5173/admin/upload
```

## How to Use

### Step 1: Select Category
- Choose the product category/folder from the dropdown
- Examples: "Headgear - Beanie", "Smokn (Lighters)", "Accessories - Pocket Watch"

### Step 2: Upload Images
- Click **"Click to Upload Images"** button
- Select one or multiple images at once
- Images will be automatically organized in the correct Cloudinary folder

### Step 3: Copy URLs
- Once uploaded, you'll see your images in a list
- Each image shows:
  - Preview thumbnail
  - File name
  - Folder path (e.g., `cloudinary/headgear/beanie`)
  - Full Cloudinary URL
  - Upload time

### Step 4: Share Links
- **Option A**: Click the copy icon to copy individual URLs
- **Option B**: Click "📥 Export as CSV" to download all URLs at once

## Example Workflow

```
1. Select: "Headgear - Beanie" ✓
2. Upload: pink.jpg, grey.jpg, blue.jpg, brown.jpg, tan.jpg ✓
3. Copy all URLs ✓
4. Share with me in format:

HEADGEAR - BEANIE:
- Pink: https://res.cloudinary.com/[CLOUD]/image/upload/cloudinary/headgear/beanie/pink
- Grey: https://res.cloudinary.com/[CLOUD]/image/upload/cloudinary/headgear/beanie/grey
... etc
```

## Image Naming Tips

✓ **DO:**
- Use simple names: `pink`, `black`, `gold`, `small`, `large`
- Use lowercase: `pocketwatch` not `PocketWatch`
- Can include hyphens: `dark-grey`, `navy-blue`
- Keep it short: `archangel` not `archangel-fancy-lighter-v2`

✗ **DON'T:**
- Use spaces: `dark grey` → use `dark-grey` instead
- Use special characters: `@`, `!`, `#`
- Include file extensions in the name: just `pink` not `pink.jpg`

## CSV Export Format

When you click "📥 Export as CSV", you get a file like:

```csv
Folder,File Name,URL
headgear/beanie,pink,https://res.cloudinary.com/driptown/image/upload/cloudinary/headgear/beanie/pink
headgear/beanie,grey,https://res.cloudinary.com/driptown/image/upload/cloudinary/headgear/beanie/grey
smokn,archangel,https://res.cloudinary.com/driptown/image/upload/cloudinary/smokn/archangel
```

You can then share this CSV with me, and I'll update all product images automatically!

## Supported Formats

- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)
- ✅ WebP (.webp)
- ❌ SVG, PSD, TIFF (not supported)

## Max File Size

- Maximum: **5MB per image**
- Recommended: 1-3MB for web

## Troubleshooting

### Upload widget not showing
- Refresh the page
- Check if `.env.local` has correct Cloudinary credentials
- Make sure you're on `http://localhost:5173/admin/upload`

### Images uploaded but not in list
- The page might need a refresh
- Check Cloudinary dashboard to confirm upload

### Can't see upload widget
- Make sure browser allows popups
- Try disabling ad blockers
- Check browser console (F12) for errors

---

That's it! Start uploading your product images! 📸

Once done, just share the links or CSV file with me and I'll update products.ts automatically.
