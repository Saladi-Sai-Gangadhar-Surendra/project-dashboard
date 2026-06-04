"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22C55E",
  "#2563EB",
  "#F59E0B",
  "#EF4444",
];

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function StatusChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-[420px]">
      <h2 className="text-2xl font-semibold mb-6">
        Status Distribution
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}