import React, { useRef } from 'react';
import { HiPhoto, HiXMark } from 'react-icons/hi2';

const ImageUploader = ({ newImages, setNewImages, existingImages, setExistingImages }) => {
  const fileInputRef = useRef(null);

  // Handle file select
  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...filesArray]);
    }
  };

  // Remove a newly selected file from upload queue
  const handleRemoveNew = (index) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Remove an existing database image URL
  const handleRemoveExisting = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const getImageUrl = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const hostUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${hostUrl}${url}`;
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        Property Images (Max 10 images)
      </label>

      {/* Drag & Drop Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-8 text-center cursor-pointer bg-slate-50 hover:bg-amber-50/10 transition duration-200"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
        <HiPhoto className="mx-auto h-12 w-12 text-slate-400 mb-3" />
        <span className="text-sm font-semibold text-slate-800 block">Click to upload files</span>
        <span className="text-xs text-slate-400 mt-1 block">Supports JPEG, PNG, WEBP (Max 5MB each)</span>
      </div>

      {/* Image Preview Grid */}
      {((existingImages && existingImages.length > 0) || (newImages && newImages.length > 0)) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
          {/* Previews of Existing (Already Uploaded) Images */}
          {existingImages?.map((url, index) => (
            <div key={`existing-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={getImageUrl(url)}
                alt="Property preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveExisting(url)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 hover:bg-red-700 text-white shadow transition opacity-0 group-hover:opacity-100 duration-200"
              >
                <HiXMark className="h-4.5 w-4.5" />
              </button>
              <span className="absolute bottom-1.5 left-1.5 bg-slate-900/75 backdrop-blur-sm text-[8px] text-white px-1.5 py-0.5 rounded uppercase font-semibold">
                Saved
              </span>
            </div>
          ))}

          {/* Previews of New Files */}
          {newImages?.map((file, index) => {
            const previewUrl = URL.createObjectURL(file);
            return (
              <div key={`new-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={previewUrl}
                  alt="New preview"
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(previewUrl)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNew(index)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 hover:bg-red-700 text-white shadow transition opacity-0 group-hover:opacity-100 duration-200"
                >
                  <HiXMark className="h-4.5 w-4.5" />
                </button>
                <span className="absolute bottom-1.5 left-1.5 bg-amber-500 text-[8px] text-slate-900 px-1.5 py-0.5 rounded uppercase font-bold">
                  New
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
