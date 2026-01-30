"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Users, Heart, Clock, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/sections";

const stats = [
  { icon: Clock, value: "15+", label: "Years of Experience" },
  { icon: Users, value: "500+", label: "Events Catered" },
  { icon: Heart, value: "50k+", label: "Happy Guests" },
  { icon: Award, value: "5.0", label: "Google Rating" },
];

const values = [
  {
    title: "Classic Comfort",
    description:
      "Classic comfort with a contemporary touch. We bring time-honored flavors with modern presentation that makes every event special.",
  },
  {
    title: "Quality",
    description:
      "We source the freshest, highest-quality ingredients. From locally-grown produce to premium meats, quality is never compromised.",
  },
  {
    title: "Professionalism",
    description:
      "From the first call to the last bite, Chef Yaya and her team deliver seamless, organized, and stress-free catering experiences.",
  },
  {
    title: "Community",
    description:
      "Food brings people together. We're proud partners for community events, nonprofit organizations, and celebrations across NYC.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-orange font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-brown mt-2 mb-6"
            >
              Meet <span className="text-orange">Chef Yaya</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-brown/70 leading-relaxed"
            >
              National Black Chef&apos;s Association Hall of Fame recipient.
              NYC&apos;s premier caterer bringing classic comfort with a contemporary
              touch to every event we serve.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/chef/chef-yaya-outdoor-portrait.jpg"
                  alt="Chef Yaya"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange rounded-2xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-brown">
                Award-Winning Cuisine, Exceptional Service
              </h2>
              <div className="w-16 h-1 bg-gold" />
              <div className="space-y-4 text-brown/70 leading-relaxed">
                <p>
                  Chef Yajaira Springer, known as Chef Yaya, is a 2021 National
                  Black Chef&apos;s Association Hall of Fame Award recipient. Based
                  in Brooklyn, she brings classic comfort with a contemporary
                  touch to every event.
                </p>
                <p>
                  KDS Comfort Food has become a trusted partner for community
                  organizations, corporate events, private parties, and celebrations
                  across NYC and the Tri-State area. The food is always delicious,
                  thoughtfully prepared, and well received by guests.
                </p>
                <p>
                  Orders arrive on time, which is critical for the success of
                  events, and the presentation is consistently clean, polished,
                  and visually appealing. Chef Yaya pays close attention to detail
                  and ensures that each event&apos;s needs are met with excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brown">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-gold" />
                  <span className="block text-4xl font-playfair font-bold text-orange">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/70 font-montserrat">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chef Yaya Feature Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              Hall of Fame Chef
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="gold-divider"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/chef/chef-yaya-hall-of-fame-award.jpg"
                  alt="Chef Yaya receiving Hall of Fame Award"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-orange/10 rounded-full px-4 py-2">
                <Award className="w-5 h-5 text-orange" />
                <span className="text-orange font-montserrat font-semibold text-sm">
                  2021 Hall of Fame Recipient
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-brown">
                National Black Chef&apos;s Association
              </h3>
              <p className="text-brown/70 leading-relaxed">
                Chef Yajaira Springer was honored with induction into the National
                Black Chef&apos;s Association Hall of Fame in 2021, recognizing her
                exceptional contributions to the culinary arts and her commitment
                to excellence in every dish she creates.
              </p>
              <p className="text-brown/70 leading-relaxed">
                This prestigious award celebrates Chef Yaya&apos;s dedication to
                preserving culinary traditions while bringing innovative touches
                to classic comfort food that has made KDS Comfort Food a trusted
                name across NYC and the Tri-State area.
              </p>
              <Link
                href="/contact"
                className="btn-primary inline-flex group"
              >
                <span>Book Chef Yaya</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              What We Believe
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading mt-2"
            >
              Our Values
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="gold-divider"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream rounded-xl p-6"
              >
                <h3 className="font-playfair font-semibold text-xl text-orange mb-2">
                  {value.title}
                </h3>
                <p className="text-brown/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Clients Section */}
      <section className="py-20 bg-brown">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              Distinguished Service
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-playfair font-bold text-white mt-2 mb-4"
            >
              Notable Clients & Events
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-gold mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 mt-4 max-w-2xl mx-auto"
            >
              Chef Yaya has had the honor of serving distinguished guests and
              organizations throughout her career, bringing her signature comfort
              cuisine to memorable events.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Senator Schumer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative h-72 rounded-xl overflow-hidden">
                <Image
                  src="/images/chef/chef-yaya-senator-schumer.jpg"
                  alt="Chef Yaya with Senator Chuck Schumer"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-playfair font-bold text-white text-lg">
                    Senator Chuck Schumer
                  </h3>
                  <p className="text-white/70 text-sm">U.S. Senate Majority Leader</p>
                </div>
              </div>
            </motion.div>

            {/* Mayor Dinkins */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="relative h-72 rounded-xl overflow-hidden">
                <Image
                  src="/images/chef/chef-yaya-mayor-dinkins.jpg"
                  alt="Chef Yaya with Mayor David Dinkins"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-playfair font-bold text-white text-lg">
                    Mayor David Dinkins
                  </h3>
                  <p className="text-white/70 text-sm">106th Mayor of New York City</p>
                </div>
              </div>
            </motion.div>

            {/* Avenues for Justice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="relative h-72 rounded-xl overflow-hidden">
                <Image
                  src="/images/chef/chef-yajaira-avenues-for-justice-feature.jpg"
                  alt="Chef Yaya featured by Avenues for Justice"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-playfair font-bold text-white text-lg">
                    Avenues for Justice
                  </h3>
                  <p className="text-white/70 text-sm">Community Partner & Featured Chef</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Notable Clients */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-white/60 font-montserrat text-sm uppercase tracking-wider mb-6">
              Also Proud to Serve
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              {[
                "NYC Public Schools",
                "JCCGCI",
                "Senior Partners Organization",
                "NBCA Hall of Fame",
                "Community Events",
              ].map((org) => (
                <span
                  key={org}
                  className="font-playfair text-lg text-white/80 border-b border-gold/30 pb-1"
                >
                  {org}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
