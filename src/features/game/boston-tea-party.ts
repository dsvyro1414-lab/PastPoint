import type { Scene } from "./model";

export const bostonTeaPartyScene: Scene = {
  id: "boston-tea-party",
  panoramaUrl: "/images/boston-tea-party-panorama.png",
  event: "Boston Tea Party",
  acceptedEventAliases: [
    "Boston Tea Party",
    "The Boston Tea Party",
    "Бостонское чаепитие",
  ],
  year: 1773,
  date: "1773-12-16",
  location: {
    label: "Griffin's Wharf, Boston, Massachusetts",
    lat: 42.3515,
    lng: -71.0514,
  },
  explanation:
    "The tea chests, colonial merchant ships, nighttime harbor setting, and eighteenth-century clothing point toward the Boston Tea Party, which took place in Boston on December 16, 1773.",
};
