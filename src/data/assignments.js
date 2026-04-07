const assignments = [
  {
    id: "a1",
    clientId: "c1",
    materialIds: ["MEM-M-02", "MOT-M-02"],
    assignedAt: "2026-04-01",
    returnedAt: null,
    status: "active",
    notes: "Material para trabajo semanal"
  },
  {
    id: "a2",
    clientId: "c1",
    materialIds: ["MEM-M-01", "SEN-M-02"],
    assignedAt: "2026-03-20",
    returnedAt: "2026-03-27",
    status: "closed",
    notes: ""
  },
  {
    id: "a3",
    clientId: "c2",
    materialIds: ["SEN-M-01", "MOT-M-01"],
    assignedAt: "2026-03-25",
    returnedAt: null,
    status: "active",
    notes: ""
  }
];

export default assignments;