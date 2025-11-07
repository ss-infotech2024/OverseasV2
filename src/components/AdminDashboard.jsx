import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Download, LogOut, Menu, X, Home, FileText, Image, Settings,
  ChevronRight, Calendar, Target, Trash2, User, AlertCircle,
  GraduationCap, Globe, Briefcase, Eye, Search, Mail, Phone,
  Calendar as CalendarIcon, MapPin, BookOpen, Award, MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("applications");
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter(item => 
      item.firstName?.toLowerCase().includes(term) ||
      item.lastName?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.contactNumber?.includes(term) ||
      item.submissionId?.toLowerCase().includes(term) ||
      item.bachelorsTitle?.toLowerCase().includes(term) ||
      item.mastersSubject?.toLowerCase().includes(term) ||
      item.targetIntake?.toLowerCase().includes(term) ||
      item.preferredCountry?.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  // Fetch inquiries
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

  // Delete inquiry
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
      if (selected && selected._id === id) setSelected(null);
      alert("Inquiry deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  // Export to Excel
  const exportExcel = () => {
    const exportData = searchTerm ? filteredData : data;
    
    if (!Array.isArray(exportData) || exportData.length === 0) {
      alert("No data to export");
      return;
    }

    const rows = [
      ["SS OVERSEAS – ALL INQUIRIES"],
      ["Generated", new Date().toLocaleString()],
      ["Total Records", exportData.length],
      searchTerm && ["Search Term", searchTerm],
      [],
      [
        "ID", "Date", "Name", "Email", "Contact", "Bachelor's", "CGPA",
        "Master's", "Intake", "Country", "Source",
      ],
      ...exportData.map((i) => [
        i.submissionId || "-",
        new Date(i.submissionDate).toLocaleDateString(),
        `${i.firstName || ""} ${i.lastName || ""}`.trim(),
        i.email || "-",
        i.contactNumber || "-",
        i.bachelorsTitle || "-",
        i.bachelorsCGPA || "-",
        i.mastersSubject || "-",
        i.targetIntake || "-",
        i.preferredCountry || "-",
        i.source || "-",
      ]),
    ].filter(Boolean);

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

  // Stats for dashboard
  const stats = useMemo(() => ({
    total: data.length,
    thisMonth: data.filter(i => {
      const date = new Date(i.submissionDate);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    winter: data.filter(i => i.targetIntake === "Winter").length,
    fall: data.filter(i => i.targetIntake === "Fall").length,
  }), [data]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading applications...</span>
        </div>
      );
    }

    if (!Array.isArray(data)) {
      return (
        <div className="text-center py-16 text-red-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Error: Invalid data format received from server</p>
        </div>
      );
    }

    switch (activeTab) {
      case "applications":
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Header with Search and Export */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Applications ({filteredData.length})
                </h2>
                {searchTerm && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing results for "{searchTerm}"
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={exportExcel}
                  disabled={filteredData.length === 0}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" /> 
                  <span className="hidden xs:inline">Export Excel</span>
                  <span className="xs:hidden">Export</span>
                </button>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "ID", "Date", "Name", "Email", "Contact",
                        "Degree", "CGPA", "Master's", "Intake", "Country", "Actions"
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="text-center py-12 text-gray-500">
                          <div className="flex flex-col items-center">
                            <Search className="w-8 h-8 text-gray-300 mb-2" />
                            <p>{searchTerm ? "No matching applications found" : "No applications yet"}</p>
                            {searchTerm && (
                              <button
                                onClick={() => setSearchTerm("")}
                                className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                              >
                                Clear search
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((i) => (
                        <tr key={i._id} className="hover:bg-gray-50 text-sm transition-colors">
                          <td className="px-3 py-3 font-medium text-blue-600">
                            {i.submissionId || "—"}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-gray-600">
                            {new Date(i.submissionDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "2-digit"
                            })}
                          </td>
                          <td className="px-3 py-3 font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <span>{i.firstName} {i.lastName}</span>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-gray-600 max-w-[150px] truncate">
                            {i.email}
                          </td>
                          <td className="px-3 py-3 text-gray-600">
                            {i.contactNumber}
                          </td>
                          <td className="px-3 py-3 max-w-[120px] truncate">
                            {i.bachelorsTitle || "—"}
                          </td>
                          <td className="px-3 py-3 text-center font-medium">
                            {i.bachelorsCGPA ? (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                {i.bachelorsCGPA}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="px-3 py-3 max-w-[120px] truncate">
                            {i.mastersSubject || "—"}
                          </td>
                          <td className="px-3 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              i.targetIntake === "Winter"
                                ? "bg-purple-100 text-purple-700"
                                : i.targetIntake === "Fall"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {i.targetIntake || "—"}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-gray-600">
                            {i.preferredCountry || "—"}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelected(i)}
                                className="text-blue-600 hover:text-blue-800 transition p-1 rounded hover:bg-blue-50"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteInquiry(i._id)}
                                disabled={deletingId === i._id}
                                className="text-red-600 hover:text-red-800 transition p-1 rounded hover:bg-red-50 disabled:opacity-50"
                                title="Delete"
                              >
                                {deletingId === i._id ? (
                                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
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

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {filteredData.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p>{searchTerm ? "No matching applications found" : "No applications yet"}</p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                filteredData.map((i) => (
                  <div key={i._id} className="bg-white p-4 rounded-lg border border-gray-200 text-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-600">#{i.submissionId}</p>
                          <p className="text-gray-500 text-xs">
                            {new Date(i.submissionDate).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setSelected(i)}
                          className="text-blue-600 p-1 rounded hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteInquiry(i._id)}
                          disabled={deletingId === i._id}
                          className="text-red-600 p-1 rounded hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="font-semibold text-base mb-1">{i.firstName} {i.lastName}</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {i.email}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {i.contactNumber}
                      </p>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1 text-xs">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {i.bachelorsTitle || "—"}
                      </span>
                      {i.bachelorsCGPA && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          CGPA: {i.bachelorsCGPA}
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full ${
                        i.targetIntake === "Winter" ? "bg-purple-100 text-purple-700" :
                        i.targetIntake === "Fall" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {i.targetIntake || "—"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard
                title="Total Applications"
                value={stats.total}
                icon={FileText}
                color="blue"
              />
              <StatCard
                title="This Month"
                value={stats.thisMonth}
                icon={Calendar}
                color="green"
              />
              <StatCard
                title="Winter Intake"
                value={stats.winter}
                icon={Target}
                color="purple"
              />
              <StatCard
                title="Fall Intake"
                value={stats.fall}
                icon={GraduationCap}
                color="orange"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
              {data.slice(0, 5).map((item, index) => (
                <div key={item._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.firstName} {item.lastName}</p>
                      <p className="text-gray-500 text-xs">{item.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(item.submissionDate).toLocaleDateString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.targetIntake === "Winter" ? "bg-purple-100 text-purple-700" :
                      item.targetIntake === "Fall" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {item.targetIntake || "—"}
                    </span>
                  </div>
                </div>
              ))}
              {data.length === 0 && (
                <p className="text-center text-gray-500 py-4">No applications yet</p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 flex flex-col fixed sm:relative h-screen sm:h-auto z-40`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className={`font-bold text-lg text-blue-600 ${!sidebarOpen && "hidden"}`}>
              SS ADMIN
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-100"
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
                      ? "bg-blue-600 text-white shadow-sm"
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
        <div className="flex-1 p-3 sm:p-6 overflow-auto ml-0 sm:ml-0">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </div>
      </div>

      {/* Candidate Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {selected.firstName} {selected.lastName}
                  </h3>
                  <p className="text-blue-600 text-sm">#{selected.submissionId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <InfoSection title="Personal Information" icon={User}>
                  <InfoItem icon={Mail} label="Email" value={selected.email} />
                  <InfoItem icon={Phone} label="Phone" value={selected.contactNumber} />
                  <InfoItem icon={CalendarIcon} label="Date of Birth" value={selected.dob || "Not provided"} />
                  <InfoItem icon={CalendarIcon} label="Submission Date" 
                    value={new Date(selected.submissionDate).toLocaleString()} />
                </InfoSection>

                {/* Education Background */}
                <InfoSection title="Education Background" icon={GraduationCap}>
                  <InfoItem icon={BookOpen} label="Bachelor's Degree" 
                    value={selected.bachelorsTitle || "Not specified"} />
                  <InfoItem icon={Award} label="Bachelor's CGPA" 
                    value={selected.bachelorsCGPA ? `${selected.bachelorsCGPA} CGPA` : "Not specified"} />
                  <InfoItem icon={BookOpen} label="Master's Interest" 
                    value={selected.mastersSubject || "Not specified"} />
                </InfoSection>

                {/* Study Preferences */}
                <InfoSection title="Study Preferences" icon={Globe}>
                  <InfoItem icon={MapPin} label="Preferred Country" 
                    value={selected.preferredCountry || "Any Country"} />
                  <InfoItem icon={CalendarIcon} label="Target Intake" 
                    value={selected.targetIntake || "Not specified"} />
                  {selected.interestedPrograms && (
                    <div className="col-span-full">
                      <p className="text-sm font-medium text-gray-700 mb-2">Interested Programs:</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.interestedPrograms.map((program, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </InfoSection>

                {/* Additional Information */}
                <InfoSection title="Additional Information" icon={Briefcase}>
                  <InfoItem icon={Globe} label="Source" value={selected.source || "Not specified"} />
                  {selected.workExperience && (
                    <InfoItem icon={Briefcase} label="Work Experience" value={selected.workExperience} />
                  )}
                  {selected.englishProficiency && (
                    <InfoItem icon={Award} label="English Proficiency" value={selected.englishProficiency} />
                  )}
                </InfoSection>
              </div>

              {/* Message */}
              {selected.message && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Additional Message</h4>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selected.message}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t p-4 sm:p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    deleteInquiry(selected._id);
                    setSelected(null);
                  }}
                  disabled={deletingId === selected._id}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deletingId === selected._id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  const iconColors = {
    blue: "text-blue-200",
    green: "text-green-200",
    purple: "text-purple-200",
    orange: "text-orange-200",
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} text-white p-4 sm:p-5 rounded-xl shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/90 text-sm font-medium">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${iconColors[color]}`} />
      </div>
    </div>
  );
}

// Info Section Component
function InfoSection({ title, icon: Icon, children }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-blue-600" />
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm text-gray-600 mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}