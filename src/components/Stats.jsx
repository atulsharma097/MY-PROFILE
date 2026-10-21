import { LuLayers, LuUsers } from "react-icons/lu";
import { profile } from "../data/content";

const icons = { layers: LuLayers, users: LuUsers };

export default function Stats() {
  return (
    <div className="flex items-start gap-8">
      {profile.stats.map(({ value, label, icon }) => {
        const Icon = icons[icon];
        return (
          <div key={label} className="flex flex-col items-center">
            <Icon className="mb-1 text-base text-white" />
            <span className="font-ui text-[17px] font-bold leading-none">{value}</span>
            <span className="mt-1 font-ui text-[8px] tracking-[0.2em] text-white/70">{label}</span>
          </div>
        );
      })}
    </div>
  );
}