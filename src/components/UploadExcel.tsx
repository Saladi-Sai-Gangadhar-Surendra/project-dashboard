"use client";

type Props = {
  onUpload: (file: File) => void;
};

export default function UploadExcel({
  onUpload,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <label className="font-bold text-lg">
        Upload Dashboard Workbook
      </label>

      <input
        type="file"
        accept=".xlsx,.xls"
        className="block mt-3"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onUpload(file);
          }
        }}
      />
    </div>
  );
}
