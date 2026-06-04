"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    name: string;
    tasks: number;
  }[];
}

export default function ProjectChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-[420px]">
      <h2 className="text-2xl font-semibold mb-6">
        Tasks by Project
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="tasks"
            fill="#0A5CFF"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}