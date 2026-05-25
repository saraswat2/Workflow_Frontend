import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User as UserIcon, Loader2, Upload, Camera } from 'lucide-react';
import Button from './Button';
import api from '../services/api';

export default function ProfileModal({ isOpen, onClose, user, onUpdate }) {
  const [name, setName] = useState(user?.name || '');
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize parameters
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Compress cleanly
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setProfileImageUrl(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input so identical file can be re-selected if needed
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        name: name.trim() || null,
        profileImageUrl: profileImageUrl.trim() || null,
      };
      const res = await api.patch('/users/me', payload);
      onUpdate(res.data);
      onClose();
    } catch (err) {
      console.error('Failed to update profile (Full Error):', err);
      console.error('Response Data:', err.response?.data);
      console.error('Status:', err.response?.status);
      setError(`Error ${err.response?.status}: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0c0c0c] border border-white/[0.08] shadow-2xl rounded-3xl p-6 md:p-8 z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6 flex flex-col items-center">
            
            {/* Native Device Picture Upload */}
            <div className="flex flex-col items-center gap-3">
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden" 
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="relative group w-24 h-24 rounded-full border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#6366f1]/50 transition-all flex items-center justify-center overflow-hidden"
              >
                {profileImageUrl ? (
                  <>
                    <img 
                      src={profileImageUrl} 
                      alt="Avatar Preview" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-500 group-hover:text-[#818cf8] transition-colors">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Upload</span>
                  </div>
                )}
              </button>
              {profileImageUrl && (
                 <button 
                   onClick={() => setProfileImageUrl('')} 
                   className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                 >
                   Remove Image
                 </button>
              )}
            </div>

            {/* Display Name Input */}
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Display Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user?.username || 'Enter display name'}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all"
                />
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="!rounded-full px-6 py-2.5 text-sm font-semibold !from-[#4f46e5] !to-[#7c3aed] disabled:opacity-70 flex items-center justify-center min-w-[100px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
