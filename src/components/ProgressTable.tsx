type ProgressItem = {
  project: string;
  completion: number;
};

export default function ProgressTable({
  data,
}: {
  data: ProgressItem[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-3xl font-bold mb-6">
        Project Progress
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Project
            </th>

            <th className="text-left py-3">
              Completion
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.project}
              className="border-b"
            >
              <td className="py-4">
                {item.project}
              </td>

              <td className="py-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${item.completion}%`,
                    }}
                  />
                </div>

                <span className="text-sm font-semibold">
                  {item.completion}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}