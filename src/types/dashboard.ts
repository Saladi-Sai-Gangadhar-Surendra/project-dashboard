export interface KPI {
  title: string;
  value: string | number;
}

export interface ProjectData {
  name: string;
  tasks: number;
}

export interface StatusData {
  name: string;
  value: number;
}

export interface ProgressData {
  project: string;
  completion: number;
  owner: string;
  status: string;
}

export interface STTPData {
  phase: string;
  planned: number;
  actual: number;
}