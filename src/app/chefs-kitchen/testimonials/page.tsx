"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Star,
  Edit2,
  Trash2,
  X,
  Save,
  Check,
  Clock,
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

interface Testimonial {
  id?: string;
  name: string;
  event: string;
  quote: string;
  rating: number;
  date: string;
  approved: boolean;
}

const emptyTestimonial: Testimonial = {
  name: "",
  event: "",
  quote: "",
  rating: 5,
  date: new Date().toISOString().split("T")[0],
  approved: true,
};

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Testimonial>(emptyTestimonial);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[];
      setTestimonials(items);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === "pending") return !t.approved;
    if (filter === "approved") return t.approved;
    return true;
  });

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(emptyTestimonial);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(emptyTestimonial);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.quote) return;

    setSaving(true);
    try {
      if (editingItem?.id) {
        await updateDoc(doc(db, "testimonials", editingItem.id), { ...formData });
      } else {
        await addDoc(collection(db, "testimonials"), { ...formData });
      }
      await fetchTestimonials();
      closeModal();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      await fetchTestimonials();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const toggleApproval = async (testimonial: Testimonial) => {
    if (!testimonial.id) return;
    try {
      await updateDoc(doc(db, "testimonials", testimonial.id), {
        approved: !testimonial.approved,
      });
      await fetchTestimonials();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-brown">
            Testimonials
          </h1>
          <p className="text-brown/60 mt-1 font-montserrat">
            Manage customer reviews and testimonials
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-montserrat font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex gap-2">
          {[
            { key: "all", label: "All" },
            { key: "pending", label: "Pending" },
            { key: "approved", label: "Approved" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-4 py-1 rounded-full text-sm font-montserrat transition-colors ${
                filter === f.key
                  ? "bg-orange text-white"
                  : "bg-cream text-brown hover:bg-orange/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-orange/30 border-t-orange rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Star className="w-12 h-12 text-brown/20 mx-auto mb-4" />
          <p className="text-brown/60 font-montserrat">
            No testimonials found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTestimonials.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-playfair font-bold text-brown">
                      {item.name}
                    </h3>
                    {item.approved ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Approved
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-orange">{item.event}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-brown/70 italic mb-4">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between pt-4 border-t border-brown/10">
                <span className="text-sm text-brown/50">{item.date}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleApproval(item)}
                    className={`px-3 py-1 rounded text-sm font-montserrat transition-colors ${
                      item.approved
                        ? "text-yellow-600 hover:bg-yellow-50"
                        : "text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {item.approved ? "Unapprove" : "Approve"}
                  </button>
                  <button
                    onClick={() => openModal(item)}
                    className="px-3 py-1 rounded text-sm font-montserrat text-brown hover:bg-cream transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => item.id && handleDelete(item.id)}
                    className="px-3 py-1 rounded text-sm font-montserrat text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
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
                  {editingItem ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <button onClick={closeModal} className="text-brown/40 hover:text-brown">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Event Type
                  </label>
                  <input
                    type="text"
                    value={formData.event}
                    onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange outline-none"
                    placeholder="e.g., Wedding, Corporate Event"
                  />
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                    Testimonial *
                  </label>
                  <textarea
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange outline-none resize-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.approved}
                    onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                    className="w-4 h-4 text-orange rounded"
                  />
                  <span className="text-sm font-montserrat text-brown">
                    Approved (visible on website)
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
                  disabled={saving || !formData.name || !formData.quote}
                  className="flex-1 px-4 py-2 bg-orange text-white font-montserrat rounded-lg hover:bg-orange/90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
