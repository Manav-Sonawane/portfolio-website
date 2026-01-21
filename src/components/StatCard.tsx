type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export default function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="border border-gray-800 p-5 rounded-lg bg-black/40">
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-semibold text-green-400">{value}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );
}
