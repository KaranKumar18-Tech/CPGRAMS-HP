import { Grievance, GrievanceStatus } from './types';

export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: "HP-2024-001",
    subject: "Water Supply Disruption in Mandi",
    description: "Severe water shortage in Ward 4, Mandi for the last 5 days.",
    location: "Mandi",
    district: "Mandi",
    category: "Water Supply",
    dateFiled: "2024-05-20",
    status: GrievanceStatus.PENDING,
    files: ["evidence.jpg"],
    lastUpdated: "2024-05-21",
    isAnonymized: false,
    timeline: [
      { label: "Grievance Filed", date: "2024-05-20", status: "completed" },
      { label: "Assigned to Department", date: "2024-05-21", status: "completed" },
      { label: "Resolution in Progress", date: "2024-05-22", status: "current" }
    ],
    replies: []
  },
  {
    id: "HP-2024-002",
    subject: "Potholes on Shimla Bypass",
    description: "Dangerous potholes causing accidents near the bypass tunnel.",
    location: "Shimla",
    district: "Shimla",
    category: "Roads & Transport",
    dateFiled: "2024-05-18",
    status: GrievanceStatus.RESOLVED,
    files: [],
    atr: "Road maintenance crew dispatched and potholes filled on 2024-05-19.",
    lastUpdated: "2024-05-19",
    isAnonymized: false,
    timeline: [
      { label: "Grievance Filed", date: "2024-05-18", status: "completed" },
      { label: "Work Started", date: "2024-05-19", status: "completed" },
      { label: "Closed", date: "2024-05-19", status: "completed" }
    ],
    replies: [
      { author: "Nodal Officer", message: "We have dispatched a team to fix this.", date: "2024-05-18" }
    ]
  },
  {
    id: "HP-2024-003",
    subject: "Pension Delay",
    description: "Old age pension not received for 3 months.",
    location: "Hamirpur",
    district: "Hamirpur",
    category: "Social Welfare",
    dateFiled: "2024-05-22",
    status: GrievanceStatus.SUBMITTED,
    files: ["pension_book.pdf"],
    lastUpdated: "2024-05-22",
    isAnonymized: true,
    timeline: [
      { label: "Grievance Filed", date: "2024-05-22", status: "current" }
    ],
    replies: []
  }
];

export const DISTRICTS = [
  "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", 
  "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
];

export const CATEGORIES = [
  "Roads & Transport",
  "Water Supply",
  "Electricity",
  "Health & Sanitation",
  "Education",
  "Social Welfare",
  "Police & Law",
  "Others"
];