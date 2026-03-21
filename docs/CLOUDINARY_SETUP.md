# Cloudinary Setup Guide for DripTown

## Step 1: Create Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com)
2. Sign up for a **FREE account**
3. Verify your email
4. Log in to your dashboard

## Step 2: Get Your Credentials

From your Cloudinary Dashboard:

1. **Cloud Name**: Located at top of dashboard (e.g., `driptown-xyz`)
2. **API Key**: Go to Settings → API Keys section
3. **Upload Preset** (Optional): 
   - Go to Settings → Upload
   - Create an unsigned upload preset (name it: `driptown_uploads`)
   - This allows uploads without exposing your API secret

## Step 3: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and fill in your credentials:
```
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_API_KEY=your_actual_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=driptown_uploads
VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/your_actual_cloud_name/image/upload
```

**NOTE**: Never commit `.env.local` to Git! It's in `.gitignore`

## Step 4: Create Folder Structure in Cloudinary

Organize your images in Cloudinary with this folder structure:

```
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
│       ├── graphitegrey
│       ├── navyblue
│       ├── skyblue
│       ├── red
│       ├── brown
│       └── green
├── smokn/
│   ├── archangel
│   ├── blackslim
│   ├── blackmini
│   └── ... (21 total)
├── riding/
│   ├── halfgloves
│   ├── snowgloves/
│   │   ├── grey
│   │   └── black
├── belts/
│   ├── doublesided
│   ├── plainblack
│   └── studded
├── socks/
│   ├── blacklong/
│   │   ├── single
│   │   ├── 4pack
│   │   ├── 8pack
│   │   └── 12pack
│   └── ... (more variants)
└── accessories/
    ├── pocketwatch/
    │   ├── flash
    │   ├── aot
    │   └── ... (12 total)
    ├── wallet/
    │   └── brown
    └── hanky/
        ├── white/
        │   ├── single
        │   └── 3pack
```

## Step 5: Upload Images to Cloudinary

### Option A: Using Cloudinary Web Dashboard (Easiest)
1. Log into Cloudinary dashboard
2. Go to Media Library
3. Create the folder structure (click + New folder)
4. Upload images with matching names

### Option B: Using Cloudinary React Widget (In App)
We can add an upload widget component for easy image management in your app.

### Option C: Bulk Upload via Script
```bash
# Install Cloudinary CLI (optional)
npm install -g cloudinary-cli

# Configure it with your credentials, then bulk upload
cloudinary upload path/to/images --folder cloudinary/headgear/beanie
```

## Step 6: Update Product Images

Once images are uploaded, the app will automatically pull them from Cloudinary!

The system works like this:
1. Product name matches your image name in Cloudinary
2. Config file in `src/app/config/cloudinary.ts` maps product names to image paths
3. The app constructs the full URL automatically

Example:
```
Product: "Unisex Long Slouchy Beanie (Pink)"
Category: "headgear"
Subcategory: "Beanie"
↓
Maps to: "headgear/beanie/pink" in Cloudinary
↓
Full URL: https://res.cloudinary.com/[CLOUD_NAME]/image/upload/headgear/beanie/pink
```

## Step 7: Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to a category page
3. You should see your Cloudinary images loading!

## Image Naming Convention

When uploading to Cloudinary:
- **Keep names lowercase**
- **Use hyphens instead of spaces** (e.g., `black-long-socks`)
- **Match the paths in** `src/app/config/cloudinary.ts`

## Adding New Products

When you add new products:

1. **Add entry in products.ts** with the product name
2. **Add mapping in cloudinary.ts** under the appropriate category:
```typescript
'New Product Name': 'category/subcategory/image-name',
```
3. **Upload image to Cloudinary** with matching name in correct folder
4. Done! The app will automatically serve the image.

## Troubleshooting

### Images not loading?
- ✅ Check console errors
- ✅ Verify Cloud Name in `.env.local`
- ✅ Confirm image exists in Cloudinary folder
- ✅ Ensure product name matches config mapping

### Environment variables not working?
- ✅ Restart dev server after editing `.env.local`
- ✅ Make sure no extra spaces in `.env.local`
- ✅ Check that `VITE_` prefix is used

### Rate limiting issues?
- Cloudinary free tier: 25M monthly transformations
- If exceeded, images will show placeholder
- Consider upgrading plan if needed

## Useful Cloudinary Features

### Image Transformations (URLs)
Once setup, you can optimize images:
```
https://res.cloudinary.com/[CLOUD_NAME]/image/upload/
  w_500,h_500,c_fill,q_auto/
  headgear/beanie/pink
```

### Responsive Images
Use Cloudinary's responsive technology:
```typescript
// Automatically serves optimal size based on device
const url = `${baseUrl}/dpr_auto,f_auto,q_auto/headgear/beanie/pink`;
```

## Security Notes

- ✅ `.env.local` is in `.gitignore` - won't be committed
- ✅ API Key is only for read operations (images)
- ✅ Don't use API Secret in frontend code
- ✅ Upload Preset should be "unsigned" type

---

**Setup Complete!** You're ready to upload images and serve them through Cloudinary. 🚀
