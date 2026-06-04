"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OwnerChart({
  data,
}: {
  data: {
    name: string;
    tasks: number;
  }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-[420px]">
      <h2 className="text-2xl font-semibold mb-6">
        Tasks by Owner
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
