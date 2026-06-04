"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0A5CFF",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
  "#EF4444",
];

export default function WorkstreamChart({
  data,
}: {
  data: {
    name: string;
    value: number;
  }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-[420px]">
      <h2 className="text-2xl font-semibold mb-6">
        Workstream Distribution
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
