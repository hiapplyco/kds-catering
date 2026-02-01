"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Upload,
  Trash2,
  X,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface GalleryImage {
  id?: string;
  url: string;
  alt: string;
  category: string;
  createdAt?: string;
}

const categories = ["All", "Food", "Events", "Chef Yaya"];

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const snapshot = await getDocs(collection(db, "gallery"));
      const galleryImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GalleryImage[];
      setImages(galleryImages.sort((a, b) => 
        (b.createdAt || "").localeCompare(a.createdAt || "")
      ));
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredImages = images.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        // Upload to Firebase Storage
        const timestamp = Date.now();
        const storageRef = ref(storage, `gallery/${timestamp}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        // Save to Firestore
        await addDoc(collection(db, "gallery"), {
          url,
          alt: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
          category: "Food",
          createdAt: new Date().toISOString(),
        });
      }
      await fetchImages();
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

  const handleDelete = async (image: GalleryImage) => {
    if (!image.id) return;
    if (!confirm("Delete this image?")) return;

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "gallery", image.id));
      
      // Try to delete from Storage (might fail if URL is external)
      try {
        const storageRef = ref(storage, image.url);
        await deleteObject(storageRef);
      } catch (e) {
        // Ignore storage deletion errors for external URLs
      }

      await fetchImages();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;
    if (!confirm(`Delete ${selectedImages.length} images?`)) return;

    try {
      await Promise.all(
        selectedImages.map((id) => deleteDoc(doc(db, "gallery", id)))
      );
      setSelectedImages([]);
      await fetchImages();
    } catch (error) {
      console.error("Error bulk deleting:", error);
      alert("Failed to delete some images.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-brown">
            Photo Gallery
          </h1>
          <p className="text-brown/60 mt-1 font-montserrat">
            Manage your website gallery images
          </p>
        </div>
        <div className="flex gap-2">
          {selectedImages.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-montserrat font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete ({selectedImages.length})
            </button>
          )}
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
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
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

      {/* Images Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-orange/30 border-t-orange rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <ImageIcon className="w-12 h-12 text-brown/20 mx-auto mb-4" />
          <p className="text-brown/60 font-montserrat">
            {images.length === 0
              ? "No photos yet. Upload your first image!"
              : "No images in this category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative group aspect-square rounded-xl overflow-hidden bg-cream"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => image.id && toggleSelect(image.id)}
                  className={`p-2 rounded-full transition-colors ${
                    selectedImages.includes(image.id || "")
                      ? "bg-orange text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(image)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Selected indicator */}
              {selectedImages.includes(image.id || "") && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-orange rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Category badge */}
              <div className="absolute bottom-2 left-2">
                <span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
