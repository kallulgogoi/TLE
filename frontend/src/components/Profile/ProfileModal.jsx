import React, { useState } from "react";
import { X, User, Link as LinkIcon, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const PRESET_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Trouble",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Molly",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Robot",
];

const ProfileModal = ({ onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    avatar: user?.avatar || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await updateUserProfile(formData);
    setIsLoading(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar Preview & Selection */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={formData.avatar}
                alt="Preview"
                className="w-24 h-24 rounded-full border-4 border-gray-800 object-cover bg-gray-800"
                onError={(e) =>
                  (e.target.src = "https://ui-avatars.com/api/?name=User")
                }
              />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-xs font-bold text-white">Preview</span>
              </div>
            </div>

            {/* Presets */}
            <div className="flex gap-2 justify-center flex-wrap">
              {PRESET_AVATARS.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatar: url })}
                  className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all ${
                    formData.avatar === url
                      ? "border-orange-500 scale-110"
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <img
                    src={url}
                    alt="preset"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Avatar URL
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-orange-600 text-black py-3 rounded-xl font-bold hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Check size={18} /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
