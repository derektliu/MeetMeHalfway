"use client";

const COLORS = [
  "bg-amber-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-teal-400",
];

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function ViewerPresence({
  viewers,
  currentUser,
}: {
  viewers: string[];
  currentUser: string;
}) {
  const others = viewers.filter((v) => v !== currentUser);

  if (others.length === 0) return null;

  const label =
    others.length === 1
      ? `${others[0]} is also viewing`
      : others.length === 2
        ? `${others[0]} and ${others[1]} are also viewing`
        : `${others[0]} and ${others.length - 1} others are also viewing`;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex -space-x-2">
        {others.slice(0, 5).map((name) => (
          <div
            key={name}
            className={`w-7 h-7 rounded-full ${getColor(name)} flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#f0ead6]`}
            title={name}
          >
            {name[0].toUpperCase()}
          </div>
        ))}
      </div>
      <span>{label}</span>
    </div>
  );
}
