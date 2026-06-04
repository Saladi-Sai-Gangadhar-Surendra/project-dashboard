"use client";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import KpiCards from "../components/KpiCards";
import ProjectChart from "../components/ProjectChart";
import StatusChart from "../components/StatusChart";
import ProgressTable from "../components/ProgressTable";
import UploadExcel from "../components/UploadExcel";

import { readExcel } from "../utils/readExcel";

export default function Home() {
  const [sheetNames, setSheetNames] =
    useState<string[]>([]);

  const [workbookData, setWorkbookData] =
    useState<any>(null);

  const [selectedProject, setSelectedProject] =
    useState("All Projects");

  const [selectedOwner, setSelectedOwner] =
    useState("All Owners");

  const [selectedPhase, setSelectedPhase] =
    useState("All Workstreams");

  async function handleUpload(
    file: File
  ) {
    const result =
      await readExcel(file);

    setSheetNames(
      result.workbook.SheetNames
    );

    setWorkbookData(
      result.sheets
    );

    console.log(
      result.sheets
    );

    console.log(
      result.sheets
        .MASTER_TASKS_COMPLETE?.[0]
    );
  }

  const projects: string[] = [
    "All Projects",
    ...(workbookData
      ?.PROJECT_PROGRESS_TRACKER?.map(
        (p: any) =>
          String(p.Project)
      ) || []),
  ];

  const owners: string[] = [
    "All Owners",
    ...(Array.from(
      new Set(
        workbookData?.MASTER_TASKS_COMPLETE?.map(
          (t: any) =>
            String(
              t.Owner ?? ""
            )
        ) || []
      )
    ) as string[]),
  ];

  const phases: string[] = [
    "All Workstreams",
    ...(Array.from(
      new Set(
        workbookData?.MASTER_TASKS_COMPLETE?.map(
          (t: any) =>
            String(
              t.Workstream ?? ""
            )
        ) || []
      )
    ) as string[]),
  ];

  const filteredTasks =
    workbookData?.MASTER_TASKS_COMPLETE?.filter(
      (task: any) =>
        (selectedProject ===
          "All Projects" ||
          task.Project ===
            selectedProject) &&
        (selectedOwner ===
          "All Owners" ||
          task.Owner ===
            selectedOwner) &&
        (selectedPhase ===
          "All Workstreams" ||
          task.Workstream ===
            selectedPhase)
    ) || [];

  const filteredProgress =
    selectedProject ===
    "All Projects"
      ? workbookData
          ?.PROJECT_PROGRESS_TRACKER ||
        []
      : workbookData
          ?.PROJECT_PROGRESS_TRACKER?.filter(
            (p: any) =>
              p.Project ===
              selectedProject
          ) || [];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        projects={projects}
        owners={owners}
        phases={phases}
        selectedProject={
          selectedProject
        }
        selectedOwner={
          selectedOwner
        }
        selectedPhase={
          selectedPhase
        }
        setSelectedProject={
          setSelectedProject
        }
        setSelectedOwner={
          setSelectedOwner
        }
        setSelectedPhase={
          setSelectedPhase
        }
      />

      <main className="flex-1 p-12 overflow-auto">
        <h1 className="text-6xl font-bold mb-8">
          Executive Dashboard
        </h1>

        <UploadExcel
          onUpload={handleUpload}
        />

        {sheetNames.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow mb-6">
            <h2 className="font-bold text-xl mb-3">
              Workbook Loaded
            </h2>

            {sheetNames.map(
              (sheet) => (
                <p key={sheet}>
                  ✓ {sheet}
                </p>
              )
            )}
          </div>
        )}

        <KpiCards
          data={[
            {
              title:
                "Total Tasks",
              value:
                filteredTasks.length,
            },

            {
              title:
                "Open Actions",
              value:
                workbookData
                  ?.MASTER_ACTIONS_COMPLETE
                  ?.length || 0,
            },

            {
              title:
                "Projects",
              value:
                workbookData
                  ?.PROJECT_PROGRESS_TRACKER
                  ?.length || 0,
            },

            {
              title:
                "Completion %",
              value:
                selectedProject ===
                "All Projects"
                  ? `${Math.round(
                      (filteredProgress.reduce(
                        (
                          sum: number,
                          p: any
                        ) =>
                          sum +
                          (p[
                            "% Complete"
                          ] || 0),
                        0
                      ) /
                        (filteredProgress.length ||
                          1)) *
                        100
                    )}%`
                  : `${Math.round(
                      ((filteredProgress[0]
                        ?.[
                        "% Complete"
                      ] || 0) *
                        100)
                    )}%`,
            },
          ]}
        />

        <div className="grid grid-cols-2 gap-8 mt-8">
          <ProjectChart
            data={filteredProgress.map(
              (p: any) => ({
                name:
                  p.Project,
                tasks:
                  p[
                    "Total Tasks"
                  ] || 0,
              })
            )}
          />

          <StatusChart
            data={[
              {
                name:
                  "Completed",
                value:
                  filteredProgress.reduce(
                    (
                      sum: number,
                      p: any
                    ) =>
                      sum +
                      (p.Completed ||
                        0),
                    0
                  ),
              },

              {
                name:
                  "In Progress",
                value:
                  filteredProgress.reduce(
                    (
                      sum: number,
                      p: any
                    ) =>
                      sum +
                      (p[
                        "In Progress"
                      ] || 0),
                    0
                  ),
              },

              {
                name:
                  "Not Started",
                value:
                  filteredProgress.reduce(
                    (
                      sum: number,
                      p: any
                    ) =>
                      sum +
                      (p[
                        "Not Started"
                      ] || 0),
                    0
                  ),
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <ProgressTable
            data={filteredProgress.map(
              (p: any) => ({
                project:
                  p.Project,

                completion:
                  Math.round(
                    (p[
                      "% Complete"
                    ] || 0) * 100
                  ),
              })
            )}
          />
        </div>
      </main>
    </div>
  );
}
