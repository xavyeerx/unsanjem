import type { Service, ServiceTab } from "@/types";

export const serviceTabs: ServiceTab[] = [
  { id: "all", name: "All" },
  { id: "anjem", name: "Anjem" },
  { id: "survei", name: "Survei Kost" },
  { id: "berkas", name: "Urus Berkas" },
];

export const services: Service[] = [
  {
    id: 1,
    title: "Antar Jemput",
    image: "/images/service-anjem.jpg",
    rating: 5,
    trips: "40.000+",
    price: "RP 5K",
    category: "anjem",
  },
  {
    id: 2,
    title: "Survei Kost",
    image: "/images/service-survei.jpg",
    rating: 5,
    trips: "50+",
    price: "RP 15k",
    category: "survei",
  },
  {
    id: 3,
    title: "Urus Berkas Kampus",
    image: "/images/service-berkas.jpg",
    rating: 5,
    trips: "200+",
    price: "RP 15k",
    category: "berkas",
  },
];

