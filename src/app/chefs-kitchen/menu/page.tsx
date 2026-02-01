"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  UtensilsCrossed,
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface MenuItem {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: string;
  dietary: string[];
  popular?: boolean;
}

const categories = [
  "All",
  "Appetizers",
  "Entrées",
  "Sides",
  "Desserts",
  "Beverages",
];

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"];

const emptyItem: MenuItem = {
  name: "",
  description: "",
  category: "Entrées",
  price: "",
  dietary: [],
  popular: false,
};

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuItem>(emptyItem);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const snapshot = await getDocs(collection(db, "menuItems"));
      const menuItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MenuItem[];
      setItems(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(emptyItem);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(emptyItem);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category) return;

    setSaving(true);
    try {
      if (editingItem?.id) {
        // Update existing
        await updateDoc(doc(db, "menuItems", editingItem.id), {
          ...formData,
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Create new
        await addDoc(collection(db, "menuItems"), {
          ...formData,
          createdAt: new Date().toISOString(),
        });
      }
      await fetchItems();
      closeModal();
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      await deleteDoc(doc(db, "menuItems", id));
      await fetchItems();
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const toggleDietary = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter((d) => d !== option)
        : [...prev.dietary, option],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-brown">
            Menu Items
          </h1>
          <p className="text-brown/60 mt-1 font-montserrat">
            Manage your catering menu
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-montserrat font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
          />
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
          <UtensilsCrossed className="w-12 h-12 text-brown/20 mx-auto mb-4" />
          <p className="text-brown/60 font-montserrat">
            {items.length === 0
              ? "No menu items yet. Add your first item!"
              : "No items match your search."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-playfair font-bold text-brown">
                    {item.name}
                  </h3>
                  <span className="text-xs text-orange font-montserrat">
                    {item.category}
                  </span>
                </div>
                <span className="text-lg font-bold text-brown">{item.price}</span>
              </div>
              <p className="text-sm text-brown/60 mb-3 line-clamp-2">
                {item.description}
              </p>
              {item.dietary && item.dietary.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.dietary.map((d) => (
                    <span
                      key={d}
                      className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 pt-3 border-t border-brown/10">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 flex items-center justify-center gap-1 text-sm text-brown hover:text-orange transition-colors py-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => item.id && handleDelete(item.id)}
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
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-brown/10 flex items-center justify-between">
                <h2 className="text-xl font-playfair font-bold text-brown">
                  {editingItem ? "Edit Menu Item" : "Add Menu Item"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-brown/40 hover:text-brown"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
                    placeholder="e.g., Braised Oxtails"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none bg-white"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
                    placeholder="e.g., $18/person or Market Price"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none resize-none"
                    placeholder="Describe the dish..."
                  />
                </div>

                {/* Dietary */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-2">
                    Dietary Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleDietary(option)}
                        className={`px-3 py-1 rounded-full text-sm font-montserrat transition-colors ${
                          formData.dietary.includes(option)
                            ? "bg-green-500 text-white"
                            : "bg-cream text-brown hover:bg-green-100"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular || false}
                    onChange={(e) =>
                      setFormData({ ...formData, popular: e.target.checked })
                    }
                    className="w-4 h-4 text-orange rounded focus:ring-orange"
                  />
                  <span className="text-sm font-montserrat text-brown">
                    Mark as popular item
                  </span>
                </label>
              </div>

              <div className="p-6 border-t border-brown/10 flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-brown/20 text-brown font-montserrat rounded-lg hover:bg-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !formData.name}
                  className="flex-1 px-4 py-2 bg-orange text-white font-montserrat rounded-lg hover:bg-orange/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
