"use client";

import { useState, useMemo } from "react";
import {
  MINIMUM_PRICE,
  RAINY_FEE,
  EARLY_MORNING_FEE,
} from "@/lib/constants";

// Tiered pricing constants
const PRICE_PER_KM_UNDER_5 = 2500; // Rp 2.5k per km for under 5km
const PRICE_PER_KM_OVER_5 = 2400;  // Rp 2.4k per km for 5km and above
const TIER_THRESHOLD_KM = 5;

interface PriceCalculatorState {
  distance: string;
  isRainy: boolean;
  isEarlyMorning: boolean;
}

interface PriceBreakdown {
  basePrice: number;
  weatherFee: number;
  timeFee: number;
}

// Parse distance that supports both comma and dot as decimal separator
function parseDistance(value: string): number {
  // Replace comma with dot for parsing
  const normalized = value.replace(",", ".");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

export function usePriceCalculator() {
  const [state, setState] = useState<PriceCalculatorState>({
    distance: "",
    isRainy: false,
    isEarlyMorning: false,
  });

  const setDistance = (distance: string) => {
    // Allow numbers, dot, and comma
    const sanitized = distance.replace(/[^0-9.,]/g, "");
    setState((prev) => ({ ...prev, distance: sanitized }));
  };

  const setIsRainy = (isRainy: boolean) => {
    setState((prev) => ({ ...prev, isRainy }));
  };

  const setIsEarlyMorning = (isEarlyMorning: boolean) => {
    setState((prev) => ({ ...prev, isEarlyMorning }));
  };

  const toggleRainy = () => {
    setState((prev) => ({ ...prev, isRainy: !prev.isRainy }));
  };

  const toggleEarlyMorning = () => {
    setState((prev) => ({ ...prev, isEarlyMorning: !prev.isEarlyMorning }));
  };

  const result = useMemo(() => {
    const distanceKm = parseDistance(state.distance);

    // Calculate base price with tiered pricing
    // Under 5km: distance x 2.5k
    // 5km and above: distance x 2.4k
    let basePrice: number;
    if (distanceKm < TIER_THRESHOLD_KM) {
      basePrice = distanceKm * PRICE_PER_KM_UNDER_5;
    } else {
      basePrice = distanceKm * PRICE_PER_KM_OVER_5;
    }

    // Apply minimum price
    if (basePrice < MINIMUM_PRICE && distanceKm > 0) {
      basePrice = MINIMUM_PRICE;
    }

    // Calculate fees
    const weatherFee = state.isRainy ? RAINY_FEE : 0;
    const timeFee = state.isEarlyMorning ? EARLY_MORNING_FEE : 0;

    const estimatedPrice = basePrice + weatherFee + timeFee;

    return {
      estimatedPrice,
      breakdown: {
        basePrice,
        weatherFee,
        timeFee,
      } as PriceBreakdown,
    };
  }, [state]);

  return {
    ...state,
    setDistance,
    setIsRainy,
    setIsEarlyMorning,
    toggleRainy,
    toggleEarlyMorning,
    estimatedPrice: result.estimatedPrice,
    priceBreakdown: result.breakdown,
  };
}



