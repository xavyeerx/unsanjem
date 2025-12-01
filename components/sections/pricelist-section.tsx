"use client";

import Image from "next/image";
import { Cloud, Moon } from "lucide-react";
import FadeIn from "@/components/fade-in";
import { usePriceCalculator } from "@/hooks/use-price-calculator";
import { serviceDescriptions } from "@/data/services";
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
    serviceType,
    distance,
    isRainy,
    isEarlyMorning,
    setServiceType,
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

            {/* Service Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Pilih Layanan
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="service"
                    value="antar-jemput"
                    checked={serviceType === "antar-jemput"}
                    onChange={(e) =>
                      setServiceType(
                        e.target.value as "antar-jemput" | "jastip"
                      )
                    }
                    className="w-5 h-5 text-accent focus:ring-accent"
                  />
                  <span className="text-foreground">Anjem (Antar Jemput)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="service"
                    value="jastip"
                    checked={serviceType === "jastip"}
                    onChange={(e) =>
                      setServiceType(
                        e.target.value as "antar-jemput" | "jastip"
                      )
                    }
                    className="w-5 h-5 text-accent focus:ring-accent"
                  />
                  <span className="text-foreground">Jastip (Jasa Titip)</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                {serviceDescriptions[serviceType]}
              </p>
            </div>

            {/* Distance Input */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Jarak (Meter)
              </h4>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
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
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg transition-colors ${
                    isRainy
                      ? "bg-accent text-white border-accent"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                >
                  <Cloud className="w-5 h-5" />
                  <span className="text-sm font-medium">Hujan</span>
                </button>
                <button
                  type="button"
                  onClick={toggleEarlyMorning}
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg transition-colors ${
                    isEarlyMorning
                      ? "bg-accent text-white border-accent"
                      : "bg-background text-foreground border-border hover:bg-muted"
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
            <div className="bg-accent rounded-lg p-4 space-y-2 max-w-md">
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
