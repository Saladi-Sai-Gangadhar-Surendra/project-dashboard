interface KPI {
  title: string;
  value: string | number;
}

interface Props {
  data: KPI[];
}

export default function KpiCards({ data }: Props) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {data.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <h3 className="text-gray-500 text-lg">
            {item.title}
          </h3>

          <p className="text-5xl font-bold mt-3">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}