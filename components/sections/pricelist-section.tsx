"use client";

import Image from "next/image";
import { Cloud, Moon } from "lucide-react";
import FadeIn from "@/components/fade-in";
import { usePriceCalculator } from "@/hooks/use-price-calculator";
import { pricelistImages } from "@/data/pricelist";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface PricelistSectionProps {
  onImageClick: (images: ImageItem[], startIndex: number) => void;
}

export default function PricelistSection({
  onImageClick,
}: PricelistSectionProps) {
  const {
    distance,
    isRainy,
    isEarlyMorning,
    setDistance,
    toggleRainy,
    toggleEarlyMorning,
    estimatedPrice,
  } = usePriceCalculator();

  return (
    <section
      id="pricelist"
      className="py-16 md:py-24 bg-card relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-accent">
              PRICELIST
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Pricelist Image with Blur Background */}
          <FadeIn
            direction="left"
            className="relative w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Blurred Background Images */}
              <div className="absolute -inset-4 md:-inset-8">
                {/* Left blur */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-[85%] aspect-[3/4] opacity-40">
                  <Image
                    src="/images/poster_blur.png"
                    alt=""
                    fill
                    className="object-cover rounded-2xl"
                    aria-hidden="true"
                  />
                </div>
                {/* Right blur */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-[85%] aspect-[3/4] opacity-40">
                  <Image
                    src="/images/poster_blur.png"
                    alt=""
                    fill
                    className="object-cover rounded-2xl"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Main Image */}
              <button
                onClick={() => onImageClick(pricelistImages, 0)}
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border shadow-2xl hover:shadow-3xl transition-all cursor-zoom-in z-10"
              >
                <Image
                  src={pricelistImages[0].src}
                  alt={pricelistImages[0].alt}
                  fill
                  className="object-cover"
                  priority
                />
              </button>
            </div>

            {/* Hint text */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Klik gambar untuk memperbesar
            </p>
          </FadeIn>

          {/* Right Side - Price Calculator */}
          <FadeIn direction="right" className="flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-accent mb-2">
                Mau Ke Tujuan Lain?
              </h3>
              <h4 className="text-lg md:text-xl font-semibold text-accent/70">
                CEK RUTEMU DISINI
              </h4>
            </div>

            {/* Service Info */}
            <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-foreground">
                Butuh dianter atau dijemput ke kampus? Kamu bisa pesan driver buat antar sampai tujuan kok!
              </p>
            </div>

            {/* Distance Input */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Jarak (KM)
              </h4>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 pr-14 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  KM
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Contoh: 1,5 atau 2.4
              </p>
            </div>

            {/* Optional Conditions */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Kondisi Opsional
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={toggleRainy}
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg transition-all duration-200 ${
                    isRainy
                      ? "bg-accent text-white border-accent shadow-lg scale-[1.02]"
                      : "bg-background text-foreground border-border hover:bg-muted hover:scale-[1.01]"
                  }`}
                >
                  <Cloud className="w-5 h-5" />
                  <span className="text-sm font-medium">Hujan</span>
                </button>
                <button
                  type="button"
                  onClick={toggleEarlyMorning}
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg transition-all duration-200 ${
                    isEarlyMorning
                      ? "bg-accent text-white border-accent shadow-lg scale-[1.02]"
                      : "bg-background text-foreground border-border hover:bg-muted hover:scale-[1.01]"
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Dini Hari (Jam &gt;22:00)
                  </span>
                </button>
              </div>
            </div>

            {/* Estimated Price */}
            <div className="bg-accent rounded-lg p-4 space-y-2 max-w-md shadow-lg">
              <div>
                <span className="text-sm text-white/90 font-semibold">
                  Estimasi Biaya
                </span>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  Rp. {estimatedPrice.toLocaleString("id-ID")}
                </p>
              </div>
              <p className="text-[11px] text-white/90 leading-relaxed">
                Harga ini berupa estimasi. Faktor cuaca, waktu, dan kondisi lain
                dapat mempengaruhi perubahan harga. Silakan tanyakan ke driver
                untuk detail pastinya.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

