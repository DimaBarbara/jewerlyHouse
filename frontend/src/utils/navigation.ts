export interface NavigationType {
  name: string;
  label: string;
}

const navigationList: NavigationType[] = [
  { name: "new", label: "New" },
  { name: "popular", label: "Popular" },
  { name: "all", label: "All" },
  { name: "bracelets", label: "Bracelets" },
  { name: "earrings", label: "Earrings" },
  { name: "necklaces", label: "Necklaces" },
  { name: "rings", label: "Rings" },
];

export default navigationList;
