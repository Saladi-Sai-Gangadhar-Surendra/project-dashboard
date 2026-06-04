```tsx
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

  const [selectedStatus, setSelectedStatus] =
    useState("All Statuses");

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
            String(t.Owner ?? "")
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

  const statuses: string[] = [
    "All Statuses",
    ...(Array.from(
      new Set(
        workbookData?.MASTER_ACTIONS_COMPLETE?.map(
          (a: any) =>
            String(
              a.Status ?? ""
            ).toLowerCase()
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

  const filteredActions =
    workbookData?.MASTER_ACTIONS_COMPLETE?.filter(
      (action: any) =>
        selectedStatus ===
          "All Statuses" ||
        String(
          action.Status || ""
        )
          .toLowerCase()
          .trim() ===
          selectedStatus
    ) || [];

  const completedCount =
    filteredActions.filter(
      (a: any) =>
        String(
          a.Status || ""
        )
          .toLowerCase()
          .includes("closed")
    ).length;

  const inProgressCount =
    filteredActions.filter(
      (a: any) =>
        String(
          a.Status || ""
        )
          .toLowerCase()
          .includes("progress")
    ).length;

  const notStartedCount =
    filteredActions.filter(
      (a: any) => {
        const status = String(
          a.Status || ""
        )
          .toLowerCase()
          .trim();

        return (
          status.includes(
            "not started"
          ) ||
          status.includes(
            "open"
          )
        );
      }
    ).length;

  const filteredProgress = [
    {
      Project:
        selectedProject ===
        "All Projects"
          ? "Filtered View"
          : selectedProject,

      "Total Tasks":
        filteredTasks.length,

      Completed:
        completedCount,

      "In Progress":
        inProgressCount,

      "Not Started":
        notStartedCount,

      "% Complete":
        filteredActions.length > 0
          ? completedCount /
            filteredActions.length
          : 0,
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        projects={projects}
        owners={owners}
        phases={phases}
        statuses={statuses}
        selectedProject={
          selectedProject
        }
        selectedOwner={
          selectedOwner
        }
        selectedPhase={
          selectedPhase
        }
        selectedStatus={
          selectedStatus
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
        setSelectedStatus={
          setSelectedStatus
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
                filteredActions.length,
            },

            {
              title:
                "Projects",
              value:
                new Set(
                  filteredTasks.map(
                    (t: any) =>
                      t.Project
                  )
                ).size,
            },

            {
              title:
                "Completion %",
              value: `${Math.round(
                (completedCount /
                  (filteredActions.length ||
                    1)) *
                  100
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
                  "Closed",
                value:
                  completedCount,
              },
              {
                name:
                  "In Progress",
                value:
                  inProgressCount,
              },
              {
                name:
                  "Open / Not Started",
                value:
                  notStartedCount,
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
```
