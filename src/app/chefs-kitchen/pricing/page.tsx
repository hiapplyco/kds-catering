"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Save, X, DollarSign, Check } from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Package {
  id?: string;
  name: string;
  description: string;
  priceRange: string;
  features: string[];
  popular?: boolean;
}

const emptyPackage: Package = {
  name: "",
  description: "",
  priceRange: "",
  features: [],
  popular: false,
};

export default function PricingManagementPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Package>(emptyPackage);
  const [newFeature, setNewFeature] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      const snapshot = await getDocs(collection(db, "packages"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Package[];
      setPackages(items);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  }

  const openModal = (item?: Package) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(emptyPackage);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(emptyPackage);
    setNewFeature("");
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, newFeature.trim()],
    });
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    if (!formData.name) return;

    setSaving(true);
    try {
      if (editingItem?.id) {
        await updateDoc(doc(db, "packages", editingItem.id), { ...formData });
      } else {
        await addDoc(collection(db, "packages"), { ...formData });
      }
      await fetchPackages();
      closeModal();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    try {
      await deleteDoc(doc(db, "packages", id));
      await fetchPackages();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-brown">
            Pricing Packages
          </h1>
          <p className="text-brown/60 mt-1 font-montserrat">
            Manage your catering packages and pricing
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-montserrat font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Package
        </button>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-orange/30 border-t-orange rounded-full animate-spin mx-auto" />
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <DollarSign className="w-12 h-12 text-brown/20 mx-auto mb-4" />
          <p className="text-brown/60 font-montserrat">
            No packages yet. Add your first pricing package!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`bg-white rounded-xl p-6 shadow-sm relative ${
                pkg.popular ? "ring-2 ring-orange" : ""
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs px-3 py-1 rounded-full font-montserrat">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-playfair font-bold text-brown mb-1">
                {pkg.name}
              </h3>
              <p className="text-2xl font-bold text-orange mb-2">
                {pkg.priceRange}
              </p>
              <p className="text-sm text-brown/60 mb-4">{pkg.description}</p>

              {pkg.features.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brown/70">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex gap-2 pt-4 border-t border-brown/10">
                <button
                  onClick={() => openModal(pkg)}
                  className="flex-1 flex items-center justify-center gap-1 text-sm text-brown hover:text-orange transition-colors py-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => pkg.id && handleDelete(pkg.id)}
                  className="flex-1 flex items-center justify-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors py-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-brown/10 flex items-center justify-between">
              <h2 className="text-xl font-playfair font-bold text-brown">
                {editingItem ? "Edit Package" : "Add Package"}
              </h2>
              <button onClick={closeModal} className="text-brown/40 hover:text-brown">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                  Package Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange outline-none"
                  placeholder="e.g., Silver Package"
                />
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                  Price Range
                </label>
                <input
                  type="text"
                  value={formData.priceRange}
                  onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                  className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange outline-none"
                  placeholder="e.g., Starting at $55/person"
                />
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                  Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addFeature()}
                    className="flex-1 px-3 py-2 border border-brown/20 rounded-lg focus:border-orange outline-none"
                    placeholder="Add a feature..."
                  />
                  <button
                    onClick={addFeature}
                    className="px-3 py-2 bg-cream text-brown rounded-lg hover:bg-orange/10"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.features.length > 0 && (
                  <ul className="space-y-1">
                    {formData.features.map((f, i) => (
                      <li key={i} className="flex items-center justify-between bg-cream px-3 py-1 rounded">
                        <span className="text-sm">{f}</span>
                        <button onClick={() => removeFeature(i)} className="text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.popular || false}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-orange rounded"
                />
                <span className="text-sm font-montserrat text-brown">
                  Mark as most popular
                </span>
              </label>
            </div>

            <div className="p-6 border-t border-brown/10 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-brown/20 text-brown font-montserrat rounded-lg hover:bg-cream"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formData.name}
                className="flex-1 px-4 py-2 bg-orange text-white font-montserrat rounded-lg hover:bg-orange/90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
