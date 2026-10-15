import { ExperienceLineItem } from "@/components/ExperienceLineItem";

const experience = [
  {
    org: "WHCC",
    role: "Design Engineering · Design Systems",
    dates: "2023 - Now",
  },
  {
    org: "WHCC",
    role: "Frontend Development · UI Design",
    dates: "2020 - 2023",
  },
  {
    org: "Leadous",
    role: "Email Development · Creative Lead",
    dates: "2019 - 2020",
  },
  {
    org: "OppSource",
    role: "Brand Identity · Web Development",
    dates: "2017 - 2019",
  },
];

export function ExperienceList() {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[minmax(10rem,auto)_1fr_auto]">
      {experience.map((item) => (
        <ExperienceLineItem
          key={`${item.org}-${item.role}`}
          org={item.org}
          role={item.role}
          dates={item.dates}
        />
      ))}
    </div>
  );
}
