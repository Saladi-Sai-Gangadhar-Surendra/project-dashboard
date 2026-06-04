import * as XLSX from "xlsx";

export async function readExcel(
  file: File
) {
  const data =
    await file.arrayBuffer();

  const workbook =
    XLSX.read(data, {
      type: "array",
    });

  const sheets: Record<
    string,
    any[]
  > = {};

  workbook.SheetNames.forEach(
    (sheetName) => {
      const sheet =
        workbook.Sheets[sheetName];

      sheets[sheetName] =
        XLSX.utils.sheet_to_json(
          sheet,
          {
            defval: "",
          }
        );
    }
  );

  return {
    workbook,
    sheets,
  };
}