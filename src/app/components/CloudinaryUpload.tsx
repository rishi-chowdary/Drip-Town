/**
 * Cloudinary Upload Component - Direct Upload Method
 * Allows easy upload of product images and generates URLs
 */

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface UploadedImage {
  publicId: string;
  url: string;
  folder: string;
  fileName: string;
  uploadedAt: string;
}

export function CloudinaryUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('headgear/beanie');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const folderOptions = [
    { value: 'headgear/beanie', label: 'Headgear - Beanie' },
    { value: 'headgear/headbands', label: 'Headgear - Headbands' },
    { value: 'headgear/shortcaps', label: 'Headgear - Short Caps' },
    { value: 'smokn', label: 'Smokn (Lighters)' },
    { value: 'riding', label: 'Riding Gear' },
    { value: 'belts', label: 'Belts' },
    { value: 'socks', label: 'Socks' },
    { value: 'accessories/pocketwatch', label: 'Accessories - Pocket Watch' },
    { value: 'accessories/wallet', label: 'Accessories - Wallet' },
    { value: 'accessories/hanky', label: 'Accessories - Hanky' },
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (!cloudName || !uploadPreset) {
      alert('Cloudinary credentials not configured');
      return;
    }

    setUploading(true);
    const newImages: UploadedImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', `cloudinary/${selectedFolder}`);
      formData.append('resource_type', 'auto');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();

        const newImage: UploadedImage = {
          publicId: data.public_id,
          url: data.secure_url,
          folder: selectedFolder,
          fileName: data.original_filename,
          uploadedAt: new Date().toLocaleString(),
        };

        newImages.push(newImage);
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setUploadedImages((prev) => [...newImages, ...prev]);
    setUploading(false);
    setUploadProgress(0);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const downloadCsv = () => {
    if (uploadedImages.length === 0) {
      alert('No images to export');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Folder,File Name,URL\n';
    uploadedImages.forEach((img) => {
      csvContent += `"${img.folder}","${img.fileName}","${img.url}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'cloudinary-images.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Upload Product Images</h1>
          <p className="text-white/70 text-lg">
            Upload your product images to Cloudinary and get shareable links
          </p>
        </div>

        {/* Upload Section */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8"
          whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
        >
          {/* Folder Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white/80 mb-3">
              Select Folder Category
            </label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all"
            >
              {folderOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-black">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Button */}
          <motion.button
            whileHover={!uploading ? { scale: 1.02 } : {}}
            whileTap={!uploading ? { scale: 0.98 } : {}}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all ${
              uploading
                ? 'bg-gray-600 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            {uploading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Uploading... {uploadProgress}%
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Click to Upload Images
              </>
            )}
          </motion.button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <p className="text-white/50 text-sm mt-3">
            📁 Upload folder: <span className="text-white/70 font-mono">cloudinary/{selectedFolder}</span>
          </p>
        </motion.div>

        {/* Uploaded Images */}
        {uploadedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Uploaded Images ({uploadedImages.length})</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={downloadCsv}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all text-sm font-semibold"
              >
                📥 Export as CSV
              </motion.button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {uploadedImages.map((image, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                      <img
                        src={image.url}
                        alt={image.fileName}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold mb-1">{image.fileName}</p>
                      <p className="text-white/60 text-sm mb-2">
                        📁 {image.folder}
                      </p>
                      <code className="text-white/50 text-xs break-all bg-black/20 px-2 py-1 rounded block">
                        {image.url}
                      </code>
                    </div>

                    {/* Copy Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => copyToClipboard(image.url)}
                      className="flex-shrink-0 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    >
                      {copiedUrl === image.url ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-white/60" />
                      )}
                    </motion.button>
                  </div>

                  <p className="text-white/40 text-xs mt-2">
                    ⏰ {image.uploadedAt}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {uploadedImages.length === 0 && (
          <motion.div
            className="text-center py-12 bg-white/5 border border-dashed border-white/20 rounded-lg"
          >
            <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">No images uploaded yet</p>
            <p className="text-white/40 text-sm mt-2">Click the upload button above to get started</p>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          className="mt-12 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-blue-300 mb-3">📋 Instructions</h3>
          <ul className="text-white/70 text-sm space-y-2">
            <li>✓ Select the correct category folder from the dropdown</li>
            <li>✓ Click "Upload Images" to open the upload widget</li>
            <li>✓ Upload one or multiple images at once</li>
            <li>✓ Keep image names simple (e.g., pink, black, gold)</li>
            <li>✓ Copy the URL or export all as CSV</li>
            <li>✓ Share the URLs in Category format with me</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CloudinaryUpload;
