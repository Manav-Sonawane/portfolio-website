import Image from "next/image";

type SkillBadgeProps = {
  label: string;
  logo: string;
  color: string;
};

export default function SkillBadge({ label, logo, color }: SkillBadgeProps) {
  const src = `https://img.shields.io/badge/${encodeURIComponent(
    label
  )}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;

  return (
    <Image
      src={src}
      alt={label}
      width={140}
      height={40}
      className="h-10 w-auto"
      unoptimized
    />
  );
}
