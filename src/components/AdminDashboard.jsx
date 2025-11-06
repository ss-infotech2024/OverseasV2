import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Download, LogOut, Menu, X, Home, FileText, Image, Settings,
  ChevronRight, Calendar, Target, Trash2, User, AlertCircle,
  GraduationCap, Globe, Briefcase, Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("applications");
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // === FETCH INQUIRIES ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL || "https://overseas-server.onrender.com"}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const arr = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setData(arr);
      })
      .catch((err) => {
        console.error("Error fetching inquiries:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // === DELETE INQUIRY ===
  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    setDeletingId(id);
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL || "https://overseas-server.onrender.com"}/api/inquiries/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) => prev.filter((i) => i._id !== id));
      alert("Inquiry deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  // === EXCEL EXPORT ===
  const exportExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert("No data to export");
      return;
    }

    const rows = [
      ["SS OVERSEAS – ALL INQUIRIES"],
      ["Generated", new Date().toLocaleString()],
      ["Total Records", data.length],
      [],
      [
        "ID", "Date", "Name", "Email", "Contact", "Bachelor's", "CGPA",
        "Master's", "Intake", "Source",
      ],
      ...data.map((i) => [
        i.submissionId || "-",
        new Date(i.submissionDate).toLocaleDateString(),
        `${i.firstName || ""} ${i.lastName || ""}`.trim(),
        i.email || "-",
        i.contactNumber || "-",
        i.bachelorsTitle || "-",
        i.bachelorsCGPA || "-",
        i.mastersSubject || "-",
        i.targetIntake || "-",
        i.source || "-",
      ]),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Inquiries");
    XLSX.writeFile(wb, `SS_Inquiries_${Date.now()}.xlsx`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "applications", label: "Online Applications", icon: FileText },
    { id: "hero", label: "Hero Management", icon: Image },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      );
    }

    if (!Array.isArray(data)) {
      return (
        <div className="text-center py-16 text-red-500">
          Error: Invalid data format
        </div>
      );
    }

    switch (activeTab) {
      case "applications":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Applications ({data.length})
              </h2>
              <button
                onClick={exportExcel}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                <Download className="w-4 h-4" /> Export
              </button>
            </div>

            {/* Responsive Table Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "ID", "Date", "Name", "Email", "Contact",
                        "Degree", "CGPA", "Master's", "Intake", "Source", "Actions"
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="text-center py-10 text-gray-500 text-sm">
                          No applications yet.
                        </td>
                      </tr>
                    ) : (
                      data.map((i) => (
                        <tr key={i._id} className="hover:bg-gray-50 text-xs">
                          <td className="px-2 py-2 font-medium text-blue-600">
                            {i.submissionId || "—"}
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            {new Date(i.submissionDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </td>
                          <td className="px-2 py-2 font-medium max-w-[120px] truncate">
                            {i.firstName} {i.lastName}
                          </td>
                          <td className="px-2 py-2 text-gray-600 max-w-[130px] truncate">
                            {i.email}
                          </td>
                          <td className="px-2 py-2 text-gray-600">
                            {i.contactNumber}
                          </td>
                          <td className="px-2 py-2 max-w-[100px] truncate">
                            {i.bachelorsTitle || "—"}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {i.bachelorsCGPA || "—"}
                          </td>
                          <td className="px-2 py-2 max-w-[100px] truncate">
                            {i.mastersSubject || "—"}
                          </td>
                          <td className="px-2 py-2">
                            <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-medium ${
                              i.targetIntake === "Winter"
                                ? "bg-purple-100 text-purple-700"
                                : i.targetIntake === "Fall"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {i.targetIntake || "—"}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-gray-600 max-w-[80px] truncate">
                            {i.source || "—"}
                          </td>
                          <td className="px-2 py-2">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setSelected(i)}
                                className="text-blue-600 hover:text-blue-800 transition"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteInquiry(i._id)}
                                disabled={deletingId === i._id}
                                className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
                                title="Delete"
                              >
                                {deletingId === i._id ? (
                                  <span className="text-xs">...</span>
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View (Hidden on larger screens) */}
            <div className="block sm:hidden space-y-3">
              {data.map((i) => (
                <div key={i._id} className="bg-white p-3 rounded-lg border border-gray-200 text-xs">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-blue-600">#{i.submissionId}</p>
                      <p className="text-gray-500">
                        {new Date(i.submissionDate).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(i)}
                        className="text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteInquiry(i._id)}
                        disabled={deletingId === i._id}
                        className="text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-medium">{i.firstName} {i.lastName}</p>
                  <p className="text-gray-600 truncate">{i.email}</p>
                  <p className="text-gray-600">{i.contactNumber}</p>
                  <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded">{i.bachelorsTitle || "—"}</span>
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded">{i.bachelorsCGPA || "—"}</span>
                    <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">
                      {i.targetIntake || "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-xs">Total</p>
                    <p className="text-2xl font-bold">{data.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-xs">This Month</p>
                    <p className="text-2xl font-bold">
                      {data.filter(i => new Date(i.submissionDate).getMonth() === new Date().getMonth()).length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-xs">Winter</p>
                    <p className="text-2xl font-bold">
                      {data.filter(i => i.targetIntake === "Winter").length}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-200" />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className={`font-bold text-lg text-blue-600 ${!sidebarOpen && "hidden"}`}>
              SS ADMIN
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 p-1"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`${!sidebarOpen && "hidden"}`}>{item.label}</span>
                  {activeTab === item.id && sidebarOpen && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition text-sm font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span className={`${!sidebarOpen && "hidden"}`}>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </div>
      </div>

      {/* View Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                #{selected.submissionId} – {selected.firstName} {selected.lastName}
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5 text-sm">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Personal</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  <div><span className="text-gray-500">Email:</span> {selected.email}</div>
                  <div><span className="text-gray-500">Phone:</span> {selected.contactNumber}</div>
                  <div><span className="text-gray-500">DOB:</span> {selected.dob || "—"}</div>
                  <div><span className="text-gray-500">Submitted:</span> {new Date(selected.submissionDate).toLocaleString()}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Education</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  <div><span className="text-gray-500">Bachelor's:</span> {selected.bachelorsTitle || "—"}</div>
                  <div><span className="text-gray-500">CGPA:</span> {selected.bachelorsCGPA || "—"}</div>
                  <div><span className="text-gray-500">Master's:</span> {selected.mastersSubject || "—"}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {selected.preferredCountry || "Any Country"}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                    {selected.targetIntake || "Any Intake"}
                  </span>
                  {selected.interestedPrograms && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {selected.interestedPrograms.join(", ")}
                    </span>
                  )}
                </div>
              </div>

              {selected.message && (
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Message</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{selected.message}</p>
                </div>
              )}
            </div>

            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  deleteInquiry(selected._id);
                  setSelected(null);
                }}
                disabled={deletingId === selected._id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 text-sm"
              >
                {deletingId === selected._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}