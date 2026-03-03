"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Trash2,
  X,
  Image as ImageIcon,
  Check,
  Play,
  Film,
  Pencil,
  Save,
  RefreshCw,
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface GalleryItem {
  id?: string;
  url: string;
  alt: string;
  category: string;
  createdAt?: string;
  type?: "image" | "video";
  mediaType?: string;
  thumbnailUrl?: string;
}

const categories = [
  "All",
  "Food",
  "Events",
  "Chef Yaya",
  "Community",
  "Weddings",
  "Corporate",
  "Private Parties",
  "Drop-Off",
];

const mediaFilters = ["All", "Images", "Videos"];

function inferType(item: GalleryItem): "image" | "video" {
  if (item.type === "video" || item.mediaType?.startsWith("video")) return "video";
  if (/\.(mp4|mov|webm|avi)(\?|$)/i.test(item.url)) return "video";
  return "image";
}

export default function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mediaFilter, setMediaFilter] = useState("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Food");
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const [replacingItem, setReplacingItem] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  // Sync upload category when filter changes (except "All")
  useEffect(() => {
    if (activeCategory !== "All") {
      setUploadCategory(activeCategory);
    }
  }, [activeCategory]);

  async function fetchItems() {
    try {
      const snapshot = await getDocs(collection(db, "gallery"));
      const galleryItems = snapshot.docs.map((d) => {
        const data = d.data();
        const item: GalleryItem = {
          id: d.id,
          url: data.url || "",
          alt: data.alt || "",
          category: data.category || "Food",
          createdAt: data.createdAt || "",
          type: data.type,
          mediaType: data.mediaType,
          thumbnailUrl: data.thumbnailUrl,
        };
        item.type = inferType(item);
        return item;
      });
      setItems(
        galleryItems.sort((a, b) =>
          (b.createdAt || "").localeCompare(a.createdAt || "")
        )
      );
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter((item) => {
    if (item.id && brokenImages.has(item.id)) return false;
    const catMatch =
      activeCategory === "All" || item.category === activeCategory;
    const mediaMatch =
      mediaFilter === "All" ||
      (mediaFilter === "Images" && item.type === "image") ||
      (mediaFilter === "Videos" && item.type === "video");
    return catMatch && mediaMatch;
  });

  const imageCount = items.filter((i) => i.type === "image").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const isVideo = file.type.startsWith("video/");
        const timestamp = Date.now();
        const folder = isVideo ? "gallery/videos" : "gallery";
        const storageRef = ref(storage, `${folder}/${timestamp}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(db, "gallery"), {
          url,
          alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          category: uploadCategory,
          type: isVideo ? "video" : "image",
          mediaType: file.type,
          createdAt: new Date().toISOString(),
        });
      }
      await fetchItems();
      setUploadSuccess(`Uploaded to "${uploadCategory}" category`);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Failed to upload. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!item.id) return;
    if (!confirm(`Delete this ${item.type || "item"}?`)) return;

    try {
      await deleteDoc(doc(db, "gallery", item.id));
      try {
        const storageRef = ref(storage, item.url);
        await deleteObject(storageRef);
      } catch {
        // Ignore storage deletion errors for external URLs
      }
      await fetchItems();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    if (!confirm(`Delete ${selectedItems.length} items?`)) return;

    try {
      await Promise.all(
        selectedItems.map((id) => deleteDoc(doc(db, "gallery", id)))
      );
      setSelectedItems([]);
      await fetchItems();
    } catch (error) {
      console.error("Error bulk deleting:", error);
      alert("Failed to delete some items.");
    }
  };

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item.id || null);
    setEditAlt(item.alt);
    setEditCategory(item.category);
  };

  const saveEdit = async (item: GalleryItem) => {
    if (!item.id) return;
    try {
      await updateDoc(doc(db, "gallery", item.id), {
        alt: editAlt,
        category: editCategory,
      });
      setEditingItem(null);
      await fetchItems();
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => new Set(prev).add(id));
  };

  const startReplace = (item: GalleryItem) => {
    setReplacingItem(item);
    replaceInputRef.current?.click();
  };

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingItem?.id) {
      setReplacingItem(null);
      return;
    }

    setUploading(true);
    try {
      const isVideo = file.type.startsWith("video/");
      const timestamp = Date.now();
      const folder = isVideo ? "gallery/videos" : "gallery";
      const storageRef = ref(storage, `${folder}/${timestamp}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "gallery", replacingItem.id), {
        url,
        type: isVideo ? "video" : "image",
        mediaType: file.type,
      });

      // Try to delete old file from storage
      try {
        const oldRef = ref(storage, replacingItem.url);
        await deleteObject(oldRef);
      } catch {
        // Ignore - old URL may be external
      }

      await fetchItems();
      setUploadSuccess("File replaced successfully");
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (error) {
      console.error("Error replacing:", error);
      alert("Failed to replace file. Please try again.");
    } finally {
      setUploading(false);
      setReplacingItem(null);
      if (replaceInputRef.current) {
        replaceInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-brown">
            Gallery Manager
          </h1>
          <p className="text-brown/60 mt-1 font-montserrat">
            {imageCount} images · {videoCount} videos · {items.length} total
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-montserrat font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete ({selectedItems.length})
            </button>
          )}
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            className="border border-brown/20 rounded-lg px-3 py-2 text-sm font-montserrat text-brown bg-white"
          >
            {categories
              .filter((c) => c !== "All")
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-montserrat font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
          {uploadSuccess && (
            <span className="text-sm text-sage font-montserrat font-medium animate-pulse">
              {uploadSuccess}
            </span>
          )}
        </div>
      </div>

      {/* Media Type Tabs */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap gap-2">
          {mediaFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setMediaFilter(filter)}
              className={`px-4 py-1 rounded-full text-sm font-montserrat transition-colors inline-flex items-center gap-1.5 ${
                mediaFilter === filter
                  ? "bg-brown text-white"
                  : "bg-cream text-brown hover:bg-brown/10"
              }`}
            >
              {filter === "Videos" && <Film className="w-3.5 h-3.5" />}
              {filter === "Images" && <ImageIcon className="w-3.5 h-3.5" />}
              {filter}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-montserrat transition-colors ${
                activeCategory === cat
                  ? "bg-orange text-white"
                  : "bg-cream text-brown hover:bg-orange/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-orange/30 border-t-orange rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <ImageIcon className="w-12 h-12 text-brown/20 mx-auto mb-4" />
          <p className="text-brown/60 font-montserrat">
            {items.length === 0
              ? "No items yet. Upload your first image or video!"
              : "No items match the current filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative group rounded-xl overflow-hidden bg-cream"
            >
              {/* Edit Form */}
              {editingItem === item.id ? (
                <div className="p-3 space-y-2 bg-white border-2 border-orange rounded-xl">
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      className="w-full aspect-square object-cover rounded-lg"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.alt}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover rounded-lg"
                      unoptimized
                    />
                  )}
                  <input
                    type="text"
                    value={editAlt}
                    onChange={(e) => setEditAlt(e.target.value)}
                    placeholder="Alt text / caption"
                    className="w-full text-sm border rounded-lg px-2 py-1.5 font-montserrat text-brown"
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full text-sm border rounded-lg px-2 py-1.5 font-montserrat text-brown"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-sage text-white text-sm font-montserrat px-3 py-1.5 rounded-lg hover:bg-sage/90"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-cream text-brown text-sm font-montserrat px-3 py-1.5 rounded-lg hover:bg-cream/80"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="aspect-square relative">
                    {item.type === "video" ? (
                      <>
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        {/* Play icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                            <Play
                              className="w-6 h-6 text-white ml-0.5"
                              fill="currentColor"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={() => item.id && handleImageError(item.id)}
                      />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => item.id && toggleSelect(item.id)}
                        className={`p-2 rounded-full transition-colors ${
                          selectedItems.includes(item.id || "")
                            ? "bg-orange text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => startReplace(item)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        title="Replace file"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Selected indicator */}
                    {selectedItems.includes(item.id || "") && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-orange rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {/* Type + Category badges */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {item.type === "video" && (
                        <span className="text-xs bg-purple-600/80 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Film className="w-3 h-3" />
                          Video
                        </span>
                      )}
                      <span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Hidden file input for replace */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleReplace}
        className="hidden"
      />
    </div>
  );
}
