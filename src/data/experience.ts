export type ExperienceItem = {
  org: string;
  role: string;
  // Figma had "2020 - Now" as a placeholder on every row — fill in real years.
  dates: string;
};

export const experience: ExperienceItem[] = [
  { org: "WHCC", role: "Design Engineer", dates: "2020 - Now" },
  { org: "WHCC", role: "UX Designer & Developer", dates: "2020 - Now" },
  { org: "Leadous", role: "Web Design & Development", dates: "2020 - Now" },
  { org: "OppSource", role: "Web Design & Development", dates: "2020 - Now" },
];
