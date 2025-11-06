import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Download, LogOut, Menu, X, Home, FileText, Image, Settings,
  ChevronRight, Calendar, Target, Trash2, User, AlertCircle,
  GraduationCap, Globe, Briefcase, Eye, EyeOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState([]); // Always an array
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
        console.log("Fetched inquiries:", res.data);
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
        `${i.firstName || ""} ${i.lastName || ""}`,
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
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading inquiries...</span>
        </div>
      );
    }

    if (!Array.isArray(data)) {
      return (
        <div className="text-center py-12 text-red-500">
          Error: Invalid data format from server
        </div>
      );
    }

    switch (activeTab) {
      case "applications":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Online Applications ({data.length})
              </h2>
              <button
                onClick={exportExcel}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Download className="w-4 h-4" /> Export Excel
              </button>
            </div>

            {/* === DETAILED VIEW MODAL === */}
            {selected && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Inquiry Details – {selected.submissionId}
                    </h3>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Personal Info */}
                    <section>
                      <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" /> Personal Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{selected.firstName} {selected.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selected.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact Number</p>
                          <p className="font-medium">{selected.contactNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{selected.dob || "-"}</p>
                        </div>
                      </div>
                    </section>

                    {/* Academic Background */}
                    <section>
                      <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" /> Academic Background
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Bachelor's Degree</p>
                          <p className="font-medium">{selected.bachelorsTitle || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">CGPA / Percentage</p>
                          <p className="font-medium">{selected.bachelorsCGPA || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Master's Subject (if any)</p>
                          <p className="font-medium">{selected.mastersSubject || "-"}</p>
                        </div>
                      </div>
                    </section>

                    {/* Study Preferences */}
                    <section>
                      <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" /> Study Preferences
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Preferred Country</p>
                          <p className="font-medium">{selected.preferredCountry || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Target Intake</p>
                          <p className="font-medium">{selected.targetIntake || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Interested Programs</p>
                          <p className="font-medium">{selected.interestedPrograms?.join(", ") || "-"}</p>
                        </div>
                      </div>
                    </section>

                    {/* Additional Info */}
                    <section>
                      <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> Additional Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Source</p>
                          <p className="font-medium">{selected.source || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Message / Notes</p>
                          <p className="font-medium whitespace-pre-wrap">{selected.message || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Submitted On</p>
                          <p className="font-medium">
                            {new Date(selected.submissionDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="border-t p-4 flex justify-end gap-3">
                    <button
                      onClick={() => setSelected(null)}
                      className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        deleteInquiry(selected._id);
                        setSelected(null);
                      }}
                      disabled={deletingId === selected._id}
                      className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {deletingId === selected._id ? "Deleting..." : "Delete Inquiry"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "ID",
                        "Date",
                        "Name",
                        "Email",
                        "Contact",
                        "Bachelor's",
                        "CGPA",
                        "Master's",
                        "Intake",
                        "Source",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                      <tr>
                        <td
                          colSpan={11}
                          className="text-center py-8 text-gray-500"
                        >
                          No applications yet.
                        </td>
                      </tr>
                    ) : (
                      data.map((i) => (
                        <tr key={i._id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-2 text-sm font-medium text-blue-600">
                            {i.submissionId}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {new Date(i.submissionDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-sm font-medium">
                            {i.firstName} {i.lastName}
                          </td>
                          <td className="px-4 py-2 text-sm">{i.email}</td>
                          <td className="px-4 py-2 text-sm">
                            {i.contactNumber}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {i.bachelorsTitle || "-"}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {i.bachelorsCGPA || "-"}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {i.mastersSubject || "-"}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {i.targetIntake || "-"}
                          </td>
                          <td className="px-4 py-2 text-sm">{i.source || "-"}</td>
                          <td className="px-4 py-2 text-sm flex gap-3">
                            <button
                              onClick={() => setSelected(i)}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium"
                            >
                              <Eye className="w-4 h-4" /> View
                            </button>
                            <button
                              onClick={() => deleteInquiry(i._id)}
                              disabled={deletingId === i._id}
                              className="text-red-600 hover:text-red-800 flex items-center gap-1 text-xs font-medium disabled:opacity-50"
                            >
                              {deletingId === i._id ? (
                                <span className="animate-pulse">Deleting...</span>
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4" /> Delete
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Applications</p>
                    <p className="text-3xl font-bold">{data.length}</p>
                  </div>
                  <FileText className="w-10 h-10 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">This Month</p>
                    <p className="text-3xl font-bold">
                      {data.filter(
                        (i) =>
                          new Date(i.submissionDate).getMonth() ===
                          new Date().getMonth()
                      ).length}
                    </p>
                  </div>
                  <Calendar className="w-10 h-10 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Winter Intake</p>
                    <p className="text-3xl font-bold">
                      {data.filter((i) => i.targetIntake === "Winter").length}
                    </p>
                  </div>
                  <Target className="w-10 h-10 text-purple-200" />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* === SIDEBAR === */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-5 border-b flex items-center justify-between">
          <h1
            className={`font-bold text-xl text-blue-600 ${
              !sidebarOpen && "hidden"
            }`}
          >
            SS ADMIN
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900 p-1"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`${!sidebarOpen && "hidden"}`}>
                  {item.label}
                </span>
                {activeTab === item.id && sidebarOpen && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className={`${!sidebarOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}