```tsx
type SidebarProps = {
  projects: string[];
  owners: string[];
  phases: string[];
  statuses: string[];

  selectedProject: string;
  selectedOwner: string;
  selectedPhase: string;
  selectedStatus: string;

  setSelectedProject: (value: string) => void;
  setSelectedOwner: (value: string) => void;
  setSelectedPhase: (value: string) => void;
  setSelectedStatus: (value: string) => void;
};

export default function Sidebar({
  projects,
  owners,
  phases,
  statuses,

  selectedProject,
  selectedOwner,
  selectedPhase,
  selectedStatus,

  setSelectedProject,
  setSelectedOwner,
  setSelectedPhase,
  setSelectedStatus,
}: SidebarProps) {
  return (
    <div className="w-72 min-h-screen bg-[#07003a] text-white p-8">
      <h1 className="text-5xl font-bold mb-16">
        Dashboard
      </h1>

      <div className="mb-10">
        <label className="block text-xl mb-3">
          Project
        </label>

        <select
          value={selectedProject}
          onChange={(e) =>
            setSelectedProject(e.target.value)
          }
          className="w-full bg-transparent border-b border-white pb-2"
        >
          {projects.map((project) => (
            <option
              key={project}
              value={project}
              className="text-black"
            >
              {project}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <label className="block text-xl mb-3">
          Owner
        </label>

        <select
          value={selectedOwner}
          onChange={(e) =>
            setSelectedOwner(e.target.value)
          }
          className="w-full bg-transparent border-b border-white pb-2"
        >
          {owners.map((owner) => (
            <option
              key={owner}
              value={owner}
              className="text-black"
            >
              {owner}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <label className="block text-xl mb-3">
          Workstream
        </label>

        <select
          value={selectedPhase}
          onChange={(e) =>
            setSelectedPhase(e.target.value)
          }
          className="w-full bg-transparent border-b border-white pb-2"
        >
          {phases.map((phase) => (
            <option
              key={phase}
              value={phase}
              className="text-black"
            >
              {phase}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <label className="block text-xl mb-3">
          Status
        </label>

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value)
          }
          className="w-full bg-transparent border-b border-white pb-2"
        >
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
              className="text-black"
            >
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
```
