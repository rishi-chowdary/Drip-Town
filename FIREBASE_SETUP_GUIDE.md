# Firebase Setup Guide for DripTown

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Create Project"
3. Enter project name: `driptown-auth`
4. Click "Create"

## Step 2: Enable Required APIs

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for and enable these APIs:
   - **Google Sign-In API**
   - **Firebase Authentication**
   - **Firestore Database** (optional, for storing user profiles)

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. If prompted, configure the OAuth consent screen first:
   - User Type: External
   - Fill in app name, email, etc.
4. For OAuth client, select:
   - Application type: **Web application**
   - Name: `DripTown Web`
   - Add authorized origins: 
     - `http://localhost:5173`
     - `http://localhost:5174`
     - Your production domain
   - Add authorized redirect URIs (same as above)
5. Copy your **Client ID**

## Step 4: Set Up Firebase (Optional but Recommended)

### Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Create Project**
3. Choose your Google Cloud Project (from Step 1)
4. Enable Firebase Authentication:
   - Go to **Build** → **Authentication**
   - Click **Get Started**
   - Enable **Google** as a sign-in method
   - Add your OAuth 2.0 Client ID from Step 3
5. Get your Firebase Config:
   - Go to **Project Settings** → **Your apps** → Add web app
   - Copy the config object

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456

# Optional: Google OAuth Client ID (if not using Firebase)
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

Your Firebase config object looks like:
```json
{
  "apiKey": "AIzaSy...",
  "authDomain": "driptown-demo.firebaseapp.com",
  "projectId": "driptown-demo",
  "storageBucket": "driptown-demo.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abc123def456"
}
```

## Step 6: Install Firebase

```bash
npm install firebase
```

## Step 7: Test the Authentication

1. Restart your development server: `npm run dev`
2. Navigate to `/auth` page
3. Click "Sign in with Google"
4. You should see Google's sign-in popup
5. After sign-in, you'll be redirected to home page

## Step 8: Update Checkout Flow

The Checkout page will automatically check for logged-in users and use their data.

## Troubleshooting

### "Invalid Client ID" Error
- Verify your Client ID in Firebase Console
- Check that your domain is added to authorized origins
- Make sure environment variables are loaded (restart dev server)

### Google Sign-In Popup Won't Open
- Check browser console for errors
- Ensure Firebase is properly initialized
- Verify your firebaseConfig has correct values

### User Not Persisting After Refresh
- Firebase handles this automatically via `onAuthStateChanged`
- User data is synced to localStorage as backup

## Production Deployment

Before deploying to production:

1. Update Firebase project settings with your production domain
2. Add production domain to Google OAuth authorized origins
3. Enable HTTPS for your production site (required for Google Sign-In)
4. Update `.env.production` with production Firebase config
5. Set up Firebase Hosting or connect to your own server

## Optional: Adding User Profile Display

To show user profile data in the Navigation:

```tsx
import { useAuth } from "../context/AuthContext";

export function UserProfile() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div>
      <img src={user.photoURL} alt={user.displayName} />
      <span>{user.displayName || user.email}</span>
    </div>
  );
}
```

## Optional: Firestore Integration

To store additional user data (address, preferences, etc.):

```bash
npm install firebase
```

Then in your code:

```tsx
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Add this to firebase.ts

const saveUserData = async (user, additionalData) => {
  await setDoc(doc(collection(db, "users"), user.uid), {
    email: user.email,
    displayName: user.displayName,
    ...additionalData,
    updatedAt: new Date(),
  });
};
```
