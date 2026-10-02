import { LineItem } from "@/components/LineItem";

const experience = [
  { org: "WHCC", role: "Design Engineer", dates: "2023 - Now" },
  { org: "WHCC", role: "UI Designer & Developer", dates: "2020 - 2023" },
  { org: "Leadous", role: "Web Designer & Developer", dates: "2019 - 2020" },
  { org: "OppSource", role: "Web Designer & Developer", dates: "2017 - 2019" },
];

export function ExperienceList() {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[minmax(10rem,auto)_1fr_auto]">
      {experience.map((item, i) => (
        <LineItem
          key={`${item.org}-${i}`}
          org={item.org}
          role={item.role}
          dates={item.dates}
        />
      ))}
    </div>
  );
}
