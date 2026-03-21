// Botswana Districts
export const BOTSWANA_DISTRICTS = [
  { id: "central", name: "Central", population: 638604 },
  { id: "ghanzi", name: "Ghanzi", population: 43355 },
  { id: "kgalagadi", name: "Kgalagadi", population: 52890 },
  { id: "kgatleng", name: "Kgatleng", population: 91660 },
  { id: "kweneng", name: "Kweneng", population: 304549 },
  { id: "north-east", name: "North-East", population: 70025 },
  { id: "north-west", name: "North-West", population: 175631 },
  { id: "south-east", name: "South-East", population: 89492 },
  { id: "southern", name: "Southern", population: 222647 },
  { id: "gaborone", name: "Gaborone", population: 231626 },
  { id: "francistown", name: "Francistown", population: 98961 },
] as const;

export type RiskLevel = "critical" | "warning" | "good";

export interface DistrictRisk {
  districtId: string;
  districtName: string;
  riskLevel: RiskLevel;
  riskScore: number;
  stockDays: number;
  facilitiesReporting: number;
  totalFacilities: number;
  patientsAtRisk: number;
}

export const DISTRICT_RISKS: DistrictRisk[] = [
  { districtId: "central", districtName: "Central", riskLevel: "warning", riskScore: 65, stockDays: 18, facilitiesReporting: 42, totalFacilities: 48, patientsAtRisk: 156 },
  { districtId: "ghanzi", districtName: "Ghanzi", riskLevel: "critical", riskScore: 85, stockDays: 7, facilitiesReporting: 8, totalFacilities: 12, patientsAtRisk: 89 },
  { districtId: "kgalagadi", districtName: "Kgalagadi", riskLevel: "good", riskScore: 25, stockDays: 45, facilitiesReporting: 10, totalFacilities: 10, patientsAtRisk: 12 },
  { districtId: "kgatleng", districtName: "Kgatleng", riskLevel: "good", riskScore: 30, stockDays: 38, facilitiesReporting: 15, totalFacilities: 16, patientsAtRisk: 23 },
  { districtId: "kweneng", districtName: "Kweneng", riskLevel: "warning", riskScore: 58, stockDays: 21, facilitiesReporting: 28, totalFacilities: 32, patientsAtRisk: 134 },
  { districtId: "north-east", districtName: "North-East", riskLevel: "good", riskScore: 22, stockDays: 52, facilitiesReporting: 14, totalFacilities: 14, patientsAtRisk: 8 },
  { districtId: "north-west", districtName: "North-West", riskLevel: "critical", riskScore: 78, stockDays: 9, facilitiesReporting: 18, totalFacilities: 24, patientsAtRisk: 203 },
  { districtId: "south-east", districtName: "South-East", riskLevel: "good", riskScore: 18, stockDays: 60, facilitiesReporting: 12, totalFacilities: 12, patientsAtRisk: 5 },
  { districtId: "southern", districtName: "Southern", riskLevel: "warning", riskScore: 52, stockDays: 24, facilitiesReporting: 22, totalFacilities: 28, patientsAtRisk: 98 },
  { districtId: "gaborone", districtName: "Gaborone", riskLevel: "good", riskScore: 15, stockDays: 72, facilitiesReporting: 8, totalFacilities: 8, patientsAtRisk: 14 },
  { districtId: "francistown", districtName: "Francistown", riskLevel: "warning", riskScore: 48, stockDays: 28, facilitiesReporting: 6, totalFacilities: 8, patientsAtRisk: 67 },
];

// Medicine Categories
export interface Medicine {
  id: string;
  name: string;
  category: "tb" | "antimalarial" | "chronic";
  stockOnHand: number;
  monthlyConsumption: number;
  stockDays: number;
  riskLevel: RiskLevel;
  inTransit: number;
  reorderPoint: number;
  expiryDate?: string;
}

export const MEDICINES: Medicine[] = [
  // TB Medicines
  { id: "rifampicin", name: "Rifampicin 150mg", category: "tb", stockOnHand: 45000, monthlyConsumption: 8500, stockDays: 159, riskLevel: "good", inTransit: 20000, reorderPoint: 25000 },
  { id: "isoniazid", name: "Isoniazid 100mg", category: "tb", stockOnHand: 12000, monthlyConsumption: 7200, stockDays: 50, riskLevel: "warning", inTransit: 15000, reorderPoint: 20000 },
  { id: "pyrazinamide", name: "Pyrazinamide 500mg", category: "tb", stockOnHand: 8500, monthlyConsumption: 6800, stockDays: 38, riskLevel: "warning", inTransit: 0, reorderPoint: 18000 },
  { id: "ethambutol", name: "Ethambutol 400mg", category: "tb", stockOnHand: 3200, monthlyConsumption: 5100, stockDays: 19, riskLevel: "critical", inTransit: 10000, reorderPoint: 15000 },
  // Antimalarials
  { id: "al", name: "Artemether-Lumefantrine", category: "antimalarial", stockOnHand: 28000, monthlyConsumption: 4200, stockDays: 200, riskLevel: "good", inTransit: 5000, reorderPoint: 12000 },
  { id: "quinine", name: "Quinine Sulphate 300mg", category: "antimalarial", stockOnHand: 6500, monthlyConsumption: 2800, stockDays: 70, riskLevel: "good", inTransit: 3000, reorderPoint: 8000 },
  { id: "artesunate", name: "Artesunate 60mg Inj", category: "antimalarial", stockOnHand: 1800, monthlyConsumption: 1200, stockDays: 45, riskLevel: "warning", inTransit: 2500, reorderPoint: 4000 },
  // Chronic Care
  { id: "metformin", name: "Metformin 500mg", category: "chronic", stockOnHand: 52000, monthlyConsumption: 12000, stockDays: 130, riskLevel: "good", inTransit: 20000, reorderPoint: 30000 },
  { id: "amlodipine", name: "Amlodipine 5mg", category: "chronic", stockOnHand: 18000, monthlyConsumption: 9500, stockDays: 57, riskLevel: "warning", inTransit: 15000, reorderPoint: 25000 },
  { id: "enalapril", name: "Enalapril 10mg", category: "chronic", stockOnHand: 4500, monthlyConsumption: 6200, stockDays: 22, riskLevel: "critical", inTransit: 8000, reorderPoint: 18000 },
  { id: "hctz", name: "Hydrochlorothiazide 25mg", category: "chronic", stockOnHand: 31000, monthlyConsumption: 7800, stockDays: 119, riskLevel: "good", inTransit: 10000, reorderPoint: 20000 },
];

// Facilities
export interface Facility {
  id: string;
  name: string;
  type: "hospital" | "clinic" | "health-post";
  district: string;
  stockLevel: number;
  lastReport: string;
  patientsServed: number;
  riskLevel: RiskLevel;
}

export const FACILITIES: Facility[] = [
  { id: "pmh", name: "Princess Marina Hospital", type: "hospital", district: "gaborone", stockLevel: 92, lastReport: "2024-01-15", patientsServed: 1250, riskLevel: "good" },
  { id: "nyangabgwe", name: "Nyangabgwe Referral Hospital", type: "hospital", district: "francistown", stockLevel: 78, lastReport: "2024-01-15", patientsServed: 980, riskLevel: "good" },
  { id: "sekgoma", name: "Sekgoma Memorial Hospital", type: "hospital", district: "central", stockLevel: 45, lastReport: "2024-01-14", patientsServed: 620, riskLevel: "warning" },
  { id: "maun-hospital", name: "Letsholathebe II Hospital", type: "hospital", district: "north-west", stockLevel: 28, lastReport: "2024-01-13", patientsServed: 450, riskLevel: "critical" },
  { id: "ghanzi-hospital", name: "Ghanzi Primary Hospital", type: "hospital", district: "ghanzi", stockLevel: 22, lastReport: "2024-01-12", patientsServed: 280, riskLevel: "critical" },
  { id: "molepolole-clinic", name: "Molepolole Clinic", type: "clinic", district: "kweneng", stockLevel: 65, lastReport: "2024-01-15", patientsServed: 180, riskLevel: "warning" },
  { id: "ramotswa-clinic", name: "Ramotswa Clinic", type: "clinic", district: "south-east", stockLevel: 88, lastReport: "2024-01-15", patientsServed: 145, riskLevel: "good" },
  { id: "kasane-clinic", name: "Kasane Primary Hospital", type: "hospital", district: "north-west", stockLevel: 35, lastReport: "2024-01-14", patientsServed: 190, riskLevel: "warning" },
];

// Shipments
export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: "in-transit" | "delivered" | "delayed" | "pending";
  eta: string;
  items: { medicine: string; quantity: number }[];
  value: number;
}

export const SHIPMENTS: Shipment[] = [
  { id: "SHP-2024-001", origin: "CMS Gaborone", destination: "Ghanzi Primary Hospital", status: "in-transit", eta: "2024-01-17", items: [{ medicine: "Ethambutol 400mg", quantity: 2000 }, { medicine: "Isoniazid 100mg", quantity: 3000 }], value: 45000 },
  { id: "SHP-2024-002", origin: "CMS Gaborone", destination: "Letsholathebe II Hospital", status: "delayed", eta: "2024-01-16", items: [{ medicine: "Enalapril 10mg", quantity: 1500 }, { medicine: "Amlodipine 5mg", quantity: 2500 }], value: 32000 },
  { id: "SHP-2024-003", origin: "CMS Gaborone", destination: "Sekgoma Memorial Hospital", status: "pending", eta: "2024-01-18", items: [{ medicine: "Pyrazinamide 500mg", quantity: 4000 }], value: 28000 },
  { id: "SHP-2024-004", origin: "CMS Gaborone", destination: "Molepolole Clinic", status: "in-transit", eta: "2024-01-16", items: [{ medicine: "Metformin 500mg", quantity: 5000 }], value: 15000 },
  { id: "SHP-2024-005", origin: "CMS Gaborone", destination: "Nyangabgwe Referral Hospital", status: "delivered", eta: "2024-01-15", items: [{ medicine: "Artemether-Lumefantrine", quantity: 3000 }], value: 52000 },
];

// Patients (for clinician view)
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  condition: "tb" | "malaria" | "diabetes" | "hypertension";
  treatmentPhase: string;
  adherence: number;
  nextPickup: string;
  facility: string;
  riskLevel: RiskLevel;
  treatmentStart: string;
  treatmentEnd: string;
}

export const PATIENTS: Patient[] = [
  { id: "P-001", name: "Kelebogile M.", age: 34, gender: "F", condition: "tb", treatmentPhase: "Intensive Phase", adherence: 95, nextPickup: "2024-01-18", facility: "Princess Marina Hospital", riskLevel: "good", treatmentStart: "2023-11-01", treatmentEnd: "2024-05-01" },
  { id: "P-002", name: "Thabo K.", age: 52, gender: "M", condition: "diabetes", treatmentPhase: "Maintenance", adherence: 78, nextPickup: "2024-01-16", facility: "Molepolole Clinic", riskLevel: "warning", treatmentStart: "2022-06-15", treatmentEnd: "ongoing" },
  { id: "P-003", name: "Neo S.", age: 28, gender: "F", condition: "tb", treatmentPhase: "Continuation Phase", adherence: 62, nextPickup: "2024-01-14", facility: "Ghanzi Primary Hospital", riskLevel: "critical", treatmentStart: "2023-08-20", treatmentEnd: "2024-02-20" },
  { id: "P-004", name: "Mpho D.", age: 45, gender: "M", condition: "hypertension", treatmentPhase: "Controlled", adherence: 88, nextPickup: "2024-01-20", facility: "Ramotswa Clinic", riskLevel: "good", treatmentStart: "2021-03-10", treatmentEnd: "ongoing" },
  { id: "P-005", name: "Lesego B.", age: 38, gender: "F", condition: "tb", treatmentPhase: "Intensive Phase", adherence: 45, nextPickup: "2024-01-12", facility: "Letsholathebe II Hospital", riskLevel: "critical", treatmentStart: "2023-12-01", treatmentEnd: "2024-06-01" },
  { id: "P-006", name: "Kabelo T.", age: 67, gender: "M", condition: "diabetes", treatmentPhase: "Maintenance", adherence: 92, nextPickup: "2024-01-22", facility: "Nyangabgwe Referral Hospital", riskLevel: "good", treatmentStart: "2019-08-05", treatmentEnd: "ongoing" },
];

// Continuity Alerts
export interface ContinuityAlert {
  id: string;
  type: "missed-pickup" | "low-adherence" | "stock-risk" | "treatment-gap";
  severity: RiskLevel;
  patientId?: string;
  patientName?: string;
  facility?: string;
  district?: string;
  medicine?: string;
  message: string;
  timestamp: string;
  daysOverdue?: number;
}

export const CONTINUITY_ALERTS: ContinuityAlert[] = [
  { id: "CA-001", type: "missed-pickup", severity: "critical", patientId: "P-005", patientName: "Lesego B.", facility: "Letsholathebe II Hospital", district: "North-West", medicine: "TB Regimen", message: "Patient missed pickup - 3 days overdue", timestamp: "2024-01-15T08:00:00", daysOverdue: 3 },
  { id: "CA-002", type: "stock-risk", severity: "critical", facility: "Ghanzi Primary Hospital", district: "Ghanzi", medicine: "Ethambutol 400mg", message: "Stock will run out in 5 days - 89 patients at risk", timestamp: "2024-01-15T06:00:00" },
  { id: "CA-003", type: "low-adherence", severity: "warning", patientId: "P-003", patientName: "Neo S.", facility: "Ghanzi Primary Hospital", district: "Ghanzi", medicine: "TB Regimen", message: "Adherence dropped below 70% - intervention needed", timestamp: "2024-01-14T14:00:00" },
  { id: "CA-004", type: "treatment-gap", severity: "warning", patientId: "P-002", patientName: "Thabo K.", facility: "Molepolole Clinic", district: "Kweneng", medicine: "Metformin", message: "2-day gap detected in treatment continuity", timestamp: "2024-01-14T10:00:00" },
  { id: "CA-005", type: "stock-risk", severity: "warning", district: "North-West", medicine: "Enalapril 10mg", message: "District stock below reorder point - 203 patients may be affected", timestamp: "2024-01-15T07:00:00" },
];

// Stock Trends (for charts)
export interface StockTrend {
  date: string;
  tb: number;
  antimalarial: number;
  chronic: number;
}

export const STOCK_TRENDS: StockTrend[] = [
  { date: "Oct", tb: 85, antimalarial: 92, chronic: 88 },
  { date: "Nov", tb: 78, antimalarial: 88, chronic: 82 },
  { date: "Dec", tb: 65, antimalarial: 85, chronic: 75 },
  { date: "Jan", tb: 52, antimalarial: 90, chronic: 68 },
];

// Disease Surveillance Data
export interface SurveillanceData {
  district: string;
  tbCases: number;
  malariaCases: number;
  tbTreatmentSuccess: number;
  malariaTreatmentSuccess: number;
  month: string;
}

export const SURVEILLANCE_DATA: SurveillanceData[] = [
  { district: "Central", tbCases: 145, malariaCases: 23, tbTreatmentSuccess: 82, malariaTreatmentSuccess: 95, month: "Jan" },
  { district: "Ghanzi", tbCases: 67, malariaCases: 45, tbTreatmentSuccess: 68, malariaTreatmentSuccess: 88, month: "Jan" },
  { district: "North-West", tbCases: 198, malariaCases: 89, tbTreatmentSuccess: 71, malariaTreatmentSuccess: 91, month: "Jan" },
  { district: "Kweneng", tbCases: 112, malariaCases: 12, tbTreatmentSuccess: 79, malariaTreatmentSuccess: 97, month: "Jan" },
  { district: "Southern", tbCases: 89, malariaCases: 8, tbTreatmentSuccess: 85, malariaTreatmentSuccess: 98, month: "Jan" },
  { district: "Gaborone", tbCases: 56, malariaCases: 3, tbTreatmentSuccess: 92, malariaTreatmentSuccess: 100, month: "Jan" },
];

// User Roles
export type UserRole = "cms" | "facility" | "logistics" | "clinician" | "surveillance" | "patient";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  facility?: string;
  district?: string;
  email: string;
}

export const DEMO_USERS: Record<UserRole, User> = {
  cms: { id: "U-001", name: "Dr. Moagi Keabetswe", role: "cms", email: "moagi.k@cms.gov.bw" },
  facility: { id: "U-002", name: "Nurse Dineo Molefe", role: "facility", facility: "Princess Marina Hospital", district: "Gaborone", email: "dineo.m@pmh.gov.bw" },
  logistics: { id: "U-003", name: "Tebogo Ratsoma", role: "logistics", email: "tebogo.r@cms.gov.bw" },
  clinician: { id: "U-004", name: "Dr. Kagiso Phiri", role: "clinician", facility: "Nyangabgwe Referral Hospital", district: "Francistown", email: "kagiso.p@nyangabgwe.gov.bw" },
  surveillance: { id: "U-005", name: "Boitumelo Nkwe", role: "surveillance", email: "boitumelo.n@moh.gov.bw" },
  patient: { id: "P-001", name: "Kelebogile M.", role: "patient", facility: "Princess Marina Hospital", email: "kelebogile.m@mail.com" },
};

// National KPIs
export const NATIONAL_KPIS = {
  totalFacilities: 212,
  facilitiesReporting: 189,
  reportingRate: 89,
  totalPatients: 45230,
  patientsOnTreatment: 12450,
  continuityRate: 87,
  criticalAlerts: 8,
  warningAlerts: 23,
  avgStockDays: 42,
  shipmentsInTransit: 12,
};
