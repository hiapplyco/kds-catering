"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Star, ExternalLink, Check } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface SiteSettings {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
    tiktok: string;
    yelp: string;
    googleBusiness: string;
  };
}

const defaultSettings: SiteSettings = {
  siteName: "KDS Comfort Food",
  tagline: "NYC's Premier Caterer Specializing in Comfort & Custom Cuisine",
  phone: "(516) 246-3030",
  email: "chefyaya@kdscomfortfood.com",
  address: "Brooklyn, New York",
  socialMedia: {
    instagram: "https://instagram.com/kdscomfortfood",
    facebook: "",
    twitter: "",
    tiktok: "",
    yelp: "",
    googleBusiness: "",
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const docRef = doc(db, "settings", "site");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings({
          ...defaultSettings,
          ...data,
          socialMedia: { ...defaultSettings.socialMedia, ...data.socialMedia },
        } as SiteSettings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, "settings", "site"), settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-orange/30 border-t-orange rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-brown">
          Site Settings
        </h1>
        <p className="text-brown/60 mt-1 font-montserrat">
          Manage your website&apos;s basic information
        </p>
      </div>

      {/* Settings Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm space-y-6"
      >
        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-playfair font-bold text-brown mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange" />
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
                className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="pt-6 border-t border-brown/10">
          <h2 className="text-lg font-playfair font-bold text-brown mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-orange" />
            Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="pt-6 border-t border-brown/10">
          <h2 className="text-lg font-playfair font-bold text-brown mb-4 flex items-center gap-2">
            <Instagram className="w-5 h-5 text-orange" />
            Social Media
          </h2>
          <div className="space-y-4">
            {[
              { key: "instagram" as const, label: "Instagram URL", icon: Instagram, placeholder: "https://instagram.com/kdscomfortfood" },
              { key: "facebook" as const, label: "Facebook URL", icon: Facebook, placeholder: "https://facebook.com/kdscomfortfood" },
              { key: "twitter" as const, label: "Twitter / X URL", icon: Twitter, placeholder: "https://twitter.com/kdscomfortfood" },
              { key: "tiktok" as const, label: "TikTok URL", icon: Globe, placeholder: "https://tiktok.com/@kdscomfortfood" },
              { key: "yelp" as const, label: "Yelp Business URL", icon: Star, placeholder: "https://yelp.com/biz/kds-comfort-food-brooklyn" },
              { key: "googleBusiness" as const, label: "Google Business URL", icon: ExternalLink, placeholder: "https://g.page/kdscomfortfood" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-montserrat font-medium text-brown mb-1">
                  <field.icon className="w-4 h-4 inline mr-1" />
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={settings.socialMedia[field.key]}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, [field.key]: e.target.value },
                      })
                    }
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-brown/20 rounded-lg focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none"
                  />
                  {settings.socialMedia[field.key] && (
                    <Check className="w-4 h-4 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Preview */}
          <div className="mt-6">
            <p className="text-sm font-montserrat font-medium text-brown mb-2">
              Footer Preview
            </p>
            <div className="bg-brown rounded-lg p-4 flex items-center gap-3">
              {[
                { icon: Instagram, url: settings.socialMedia.instagram, label: "Instagram" },
                { icon: Facebook, url: settings.socialMedia.facebook, label: "Facebook" },
                { icon: Twitter, url: settings.socialMedia.twitter, label: "Twitter" },
                { icon: Globe, url: settings.socialMedia.tiktok, label: "TikTok" },
              ].map((link) => (
                <div
                  key={link.label}
                  className={`p-2 rounded-full ${
                    link.url
                      ? "bg-white/10 text-white"
                      : "bg-white/5 text-white/20"
                  }`}
                  title={link.url ? link.label : `${link.label} (not configured)`}
                >
                  <link.icon className="w-5 h-5" />
                </div>
              ))}
              {!settings.socialMedia.instagram &&
                !settings.socialMedia.facebook &&
                !settings.socialMedia.twitter &&
                !settings.socialMedia.tiktok && (
                  <span className="text-white/40 text-sm font-montserrat">
                    No social links configured
                  </span>
                )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-brown/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto px-6 py-3 bg-orange hover:bg-orange/90 text-white font-montserrat font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <span className="text-green-300">✓</span>
                Saved!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Info Note */}
      <div className="bg-orange/10 border border-orange/20 rounded-xl p-4">
        <p className="text-sm text-brown/70 font-montserrat">
          <strong>Note:</strong> Changes to contact info and social links take
          effect on your website immediately after saving.
        </p>
      </div>
    </div>
  );
}
