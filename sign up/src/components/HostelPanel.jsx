import React, { useState, useEffect } from "react";

const HostelPanel = () => {
  const [activeRole, setActiveRole] = useState("student"); // student | warden
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // States
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [menu, setMenu] = useState({});
  const [attendance, setAttendance] = useState([]); // {date, records:[{studentId,status}]}

  // Load from localStorage
  useEffect(() => {
    setRooms(JSON.parse(localStorage.getItem("rooms")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setComplaints(JSON.parse(localStorage.getItem("complaints")) || []);
    setLeaves(JSON.parse(localStorage.getItem("leaves")) || []);
    setMenu(JSON.parse(localStorage.getItem("menu")) || {});
    setAttendance(JSON.parse(localStorage.getItem("attendance")) || []);
  }, []);

  // Save to localStorage
  useEffect(() => localStorage.setItem("rooms", JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem("students", JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem("complaints", JSON.stringify(complaints)), [complaints]);
  useEffect(() => localStorage.setItem("leaves", JSON.stringify(leaves)), [leaves]);
  useEffect(() => localStorage.setItem("menu", JSON.stringify(menu)), [menu]);
  useEffect(() => localStorage.setItem("attendance", JSON.stringify(attendance)), [attendance]);

  // --- Functions ---
  const addRoom = (number, capacity, type) =>
    setRooms([...rooms, { id: Date.now(), number, capacity: parseInt(capacity), type, occupants: [] }]);

  const addStudent = (name) =>
    setStudents([...students, { id: Date.now(), name, roomId: null }]);

  const addComplaint = (studentId, text) =>
    setComplaints([...complaints, { id: Date.now(), studentId, text }]);

  const addLeave = (studentId, from, to, reason) =>
    setLeaves([...leaves, { id: Date.now(), studentId, from, to, reason }]);

  const updateMenu = (day, food) => setMenu({ ...menu, [day]: food });

  const allocateRoom = (studentId, roomId) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId && room.occupants.length < room.capacity) {
        return { ...room, occupants: [...room.occupants, studentId] };
      }
      return room;
    });
    const updatedStudents = students.map((s) =>
      s.id === studentId ? { ...s, roomId } : s
    );
    setRooms(updatedRooms);
    setStudents(updatedStudents);
  };

  const markAttendance = (date, records) => {
    const newRecord = { id: Date.now(), date, records };
    setAttendance([...attendance, newRecord]);
  };

  // --- Forms ---
  const handleAddRoom = (e) => {
    e.preventDefault();
    const f = e.target;
    addRoom(f.number.value, f.capacity.value, f.type.value);
    f.reset();
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const f = e.target;
    addStudent(f.name.value);
    f.reset();
  };

  const handleComplaint = (e) => {
    e.preventDefault();
    const f = e.target;
    addComplaint(parseInt(f.studentId.value), f.text.value);
    f.reset();
  };

  const handleLeave = (e) => {
    e.preventDefault();
    const f = e.target;
    addLeave(parseInt(f.studentId.value), f.from.value, f.to.value, f.reason.value);
    f.reset();
  };

  const handleMenu = (e) => {
    e.preventDefault();
    const f = e.target;
    updateMenu(f.day.value, f.food.value);
    f.reset();
  };

  const handleAllocation = (e) => {
    e.preventDefault();
    const f = e.target;
    allocateRoom(parseInt(f.studentId.value), parseInt(f.roomId.value));
    f.reset();
  };

  const handleAttendance = (e) => {
    e.preventDefault();
    const f = e.target;
    const date = f.date.value;
    const records = students.map((s) => ({
      studentId: s.id,
      status: f[`status-${s.id}`].value,
    }));
    markAttendance(date, records);
    f.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">Hostel Management Panel</h1>

        {/* Dropdown Role Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
          >
            {activeRole === "student" ? "Student" : "Warden"} ▼
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
              <button
                onClick={() => {
                  setActiveRole("student");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Student
              </button>
              <button
                onClick={() => {
                  setActiveRole("warden");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Warden
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* ---------------- STUDENT PANEL ---------------- */}
        {activeRole === "student" && (
          <>
            {/* Student Registration */}
            <div>
              <h2 className="text-xl font-bold mb-4">Register as Student</h2>
              <form onSubmit={handleAddStudent} className="flex gap-4 mb-4">
                <input name="name" placeholder="Student Name" className="border p-2 rounded flex-1" required />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
              </form>
              <ul className="list-disc ml-6">
                {students.map((s) => (
                  <li key={s.id}>
                    {s.name} {s.roomId ? `(Room ${rooms.find(r=>r.id===s.roomId)?.number})` : "(No Room)"}
                  </li>
                ))}
              </ul>
            </div>

            {/* Allocate Room */}
            <div>
              <h2 className="text-xl font-bold mb-4">Select Room</h2>
              <form onSubmit={handleAllocation} className="flex gap-4 mb-4 flex-wrap">
                <select name="studentId" className="border p-2 rounded" required>
                  <option value="">Select Student</option>
                  {students.filter(s => !s.roomId).map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <select name="roomId" className="border p-2 rounded" required>
                  <option value="">Select Room</option>
                  {rooms.filter(r => r.occupants.length < r.capacity).map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.number} - {r.type} ({r.occupants.length}/{r.capacity})
                    </option>
                  ))}
                </select>
                <button className="bg-green-600 text-white px-4 py-2 rounded">Allocate</button>
              </form>
            </div>

            {/* Complaints */}
            <div>
              <h2 className="text-xl font-bold mb-4">Submit Complaint</h2>
              <form onSubmit={handleComplaint} className="flex gap-4 mb-4 flex-wrap">
                <select name="studentId" className="border p-2 rounded" required>
                  <option value="">Select Student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <input name="text" placeholder="Complaint" className="border p-2 rounded flex-1" required />
                <button className="bg-red-600 text-white px-4 py-2 rounded">Submit</button>
              </form>
            </div>

            {/* Leaves */}
            <div>
              <h2 className="text-xl font-bold mb-4">Apply Leave</h2>
              <form onSubmit={handleLeave} className="flex gap-4 mb-4 flex-wrap">
                <select name="studentId" className="border p-2 rounded" required>
                  <option value="">Select Student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <input type="date" name="from" className="border p-2 rounded" required />
                <input type="date" name="to" className="border p-2 rounded" required />
                <input name="reason" placeholder="Reason" className="border p-2 rounded flex-1" required />
                <button className="bg-yellow-600 text-white px-4 py-2 rounded">Apply</button>
              </form>
            </div>

            {/* Mess Menu */}
            <div>
              <h2 className="text-xl font-bold mb-4">Mess Menu</h2>
              <ul className="list-disc ml-6">
                {Object.keys(menu).length === 0 && <p>No menu set by warden yet.</p>}
                {Object.keys(menu).map((day) => (
                  <li key={day}>{day}: {menu[day]}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* ---------------- WARDEN PANEL ---------------- */}
        {activeRole === "warden" && (
          <>
            {/* Room Management */}
            <div>
              <h2 className="text-xl font-bold mb-4">Room Management</h2>
              <form onSubmit={handleAddRoom} className="flex gap-4 mb-4 flex-wrap">
                <input name="number" placeholder="Room Number" className="border p-2 rounded" required />
                <input name="capacity" type="number" placeholder="Capacity" className="border p-2 rounded" required />
                <select name="type" className="border p-2 rounded" required>
                  <option value="">Select Type</option>
                  <option value="2 Seater">2 Seater</option>
                  <option value="3 Seater">3 Seater</option>
                  <option value="4 Seater">4 Seater</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Room</button>
              </form>
              <table className="w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-1">Room</th>
                    <th className="border px-2 py-1">Type</th>
                    <th className="border px-2 py-1">Capacity</th>
                    <th className="border px-2 py-1">Occupants</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((r) => (
                    <tr key={r.id}>
                      <td className="border px-2 py-1">{r.number}</td>
                      <td className="border px-2 py-1">{r.type}</td>
                      <td className="border px-2 py-1">{r.capacity}</td>
                      <td className="border px-2 py-1">
                        {r.occupants.map((sid) => students.find(s=>s.id===sid)?.name).join(", ") || "Empty"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mess Menu */}
            <div>
              <h2 className="text-xl font-bold mb-4">Mess Menu Management</h2>
              <form onSubmit={handleMenu} className="flex gap-4 mb-4 flex-wrap">
                <select name="day" className="border p-2 rounded" required>
                  <option value="">Select Day</option>
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input name="food" placeholder="Menu for the day" className="border p-2 rounded flex-1" required />
                <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              </form>
              <ul className="list-disc ml-6">
                {Object.keys(menu).map((day) => (
                  <li key={day}>{day}: {menu[day]}</li>
                ))}
              </ul>
            </div>

            {/* Complaints */}
            <div>
              <h2 className="text-xl font-bold mb-4">Complaints</h2>
              <ul className="list-disc ml-6">
                {complaints.length === 0 && <p>No complaints yet.</p>}
                {complaints.map((c) => (
                  <li key={c.id}>{students.find(s=>s.id===c.studentId)?.name}: {c.text}</li>
                ))}
              </ul>
            </div>

            {/* Leaves */}
            <div>
              <h2 className="text-xl font-bold mb-4">Leave Applications</h2>
              <table className="w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-1">Student</th>
                    <th className="border px-2 py-1">From</th>
                    <th className="border px-2 py-1">To</th>
                    <th className="border px-2 py-1">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((l) => (
                    <tr key={l.id}>
                      <td className="border px-2 py-1">{students.find(s=>s.id===l.studentId)?.name}</td>
                      <td className="border px-2 py-1">{l.from}</td>
                      <td className="border px-2 py-1">{l.to}</td>
                      <td className="border px-2 py-1">{l.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Students */}
            <div>
              <h2 className="text-xl font-bold mb-4">All Students</h2>
              <ul className="list-disc ml-6">
                {students.length === 0 && <p>No students registered yet.</p>}
                {students.map((s) => (
                  <li key={s.id}>{s.name} {s.roomId ? `(Room ${rooms.find(r=>r.id===s.roomId)?.number})` : "(No Room)"}</li>
                ))}
              </ul>
            </div>

            {/* ---------------- NEW: Attendance ---------------- */}
            <div>
              <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>
              <form onSubmit={handleAttendance} className="space-y-4">
                <input type="date" name="date" className="border p-2 rounded" required />
                <table className="w-full border">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border px-2 py-1">Student</th>
                      <th className="border px-2 py-1">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id}>
                        <td className="border px-2 py-1">{s.name}</td>
                        <td className="border px-2 py-1">
                          <select name={`status-${s.id}`} className="border p-1 rounded">
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="bg-green-600 text-white px-4 py-2 rounded">Save Attendance</button>
              </form>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Attendance Records</h3>
                {attendance.length === 0 && <p>No attendance marked yet.</p>}
                {attendance.map((record) => (
                  <div key={record.id} className="mb-4 border p-2 rounded bg-white">
                    <h3 className="font-semibold">Date: {record.date}</h3>
                    <ul className="list-disc ml-6">
                      {record.records.map((r, idx) => (
                        <li key={idx}>
                          {students.find((s) => s.id === r.studentId)?.name}: {r.status}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HostelPanel;
