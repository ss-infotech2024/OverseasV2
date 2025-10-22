import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import {
  Download, LogOut, Menu, X, Home, FileText, Image, Settings,
  ChevronRight, Calendar, Target, Trash2, CheckCircle, AlertCircle,
  User, Mail, Phone, MapPin, GraduationCap, Globe, Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // === FETCH INQUIRIES ===
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    axios
      .get('/api/inquiries', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error('Error fetching inquiries:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // === DELETE INQUIRY ===
  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry? This cannot be undone.')) return;

    setDeletingId(id);
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => prev.filter((i) => i._id !== id));
      alert('Inquiry deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to delete inquiry');
    } finally {
      setDeletingId(null);
    }
  };

  // === EXCEL EXPORT ===
  const exportExcel = () => {
    const rows = [
      ['SS OVERSEAS – ALL INQUIRIES'],
      ['Generated', new Date().toLocaleString()],
      ['Total Records', data.length],
      [],
      [
        'ID', 'Date', 'Name', 'Email', 'Contact', 'DOB', 'Address',
        "Bachelor's", 'Completion', 'Title', 'CGPA', 'SGPA', 'HSC', 'Entrance',
        'IELTS/TOEFL', 'Lang', 'APS',
        'Intake', 'Universities', "Master's", ' Specialization', 'Research',
        'Job Position', 'Level', 'Company', 'Job Title', 'Source'
      ],
      ...data.map(i => [
        i.submissionId,
        new Date(i.submissionDate).toLocaleDateString(),
        `${i.firstName} ${i.lastName}`,
        i.email,
        i.contactNumber,
        i.dateOfBirth || '-',
        i.address || '-',
        i.bachelorsDegree || '-',
        i.bachelorsCompletion || '-',
        i.bachelorsTitle || '-',
        i.bachelorsCGPA || '-',
        i.bachelorsSGPA || '-',
        i.hscGrade || '-',
        i.entranceExamScores || '-',
        i.ieltsToeflScore || '-',
        i.degreeLanguage || '-',
        i.apsCertificate || '-',
        i.targetIntake || '-',
        i.targetUniversities || '-',
        i.mastersSubject || '-',
        i.specialization || '-',
        i.researchTopic || '-',
        i.jobPosition || '-',
        i.jobLevel || '-',
        i.company || '-',
        i.jobTitle || '-',
        i.source || '-',
      ])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = Array(27).fill({ wch: 16 });
    XLSX.utils.book_append_sheet(wb, ws, 'Inquiries');
    XLSX.writeFile(wb, `SS_Inquiries_${Date.now()}.xlsx`);
  };

  // === LOGOUT ===
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // === MENU ITEMS ===
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'applications', label: 'Online Applications', icon: FileText },
    { id: 'hero', label: 'Hero Management', icon: Image },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // === RENDER CONTENT ===
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading inquiries...</span>
        </div>
      );
    }

    switch (activeTab) {
      case 'applications':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Online Applications ({data.length})</h2>
              <button
                onClick={exportExcel}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Download className="w-4 h-4" /> Export Excel
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['ID', 'Date', 'Name', 'Email', 'Contact', "Bachelor's", 'CGPA', "Master's", 'Intake', 'Source', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="text-center py-8 text-gray-500">
                          No applications yet.
                        </td>
                      </tr>
                    ) : (
                      data.map(i => (
                        <tr key={i._id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-2 text-sm font-medium text-blue-600">{i.submissionId}</td>
                          <td className="px-4 py-2 text-sm">{new Date(i.submissionDate).toLocaleDateString()}</td>
                          <td className="px-4 py-2 text-sm font-medium">{i.firstName} {i.lastName}</td>
                          <td className="px-4 py-2 text-sm">{i.email}</td>
                          <td className="px-4 py-2 text-sm">{i.contactNumber}</td>
                          <td className="px-4 py-2 text-sm">{i.bachelorsTitle || '-'}</td>
                          <td className="px-4 py-2 text-sm">{i.bachelorsCGPA || '-'}</td>
                          <td className="px-4 py-2 text-sm">{i.mastersSubject || '-'}</td>
                          <td className="px-4 py-2 text-sm">{i.targetIntake || '-'}</td>
                          <td className="px-4 py-2 text-sm">{i.source || '-'}</td>
                          <td className="px-4 py-2 text-sm flex gap-2">
                            <button
                              onClick={() => setSelected(i)}
                              className="text-blue-600 hover:underline text-xs font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => deleteInquiry(i._id)}
                              disabled={deletingId === i._id}
                              className="text-red-600 hover:underline text-xs font-medium flex items-center gap-1 disabled:opacity-50"
                            >
                              {deletingId === i._id ? (
                                <span className="animate-pulse">Deleting...</span>
                              ) : (
                                <>
                                  <Trash2 className="w-3 h-3" /> Delete
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

      case 'hero':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Hero Banner Management</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Study in Germany..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Free Consultation" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition">
                    <Image className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Save Hero Banner
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">Admin settings coming soon...</p>
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
                      {data.filter(i => new Date(i.submissionDate).getMonth() === new Date().getMonth()).length}
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
                      {data.filter(i => i.targetIntake === 'Winter').length}
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

  // === DETAILS MODAL ===
  const renderDetailsModal = () => {
    if (!selected) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl flex justify-between items-center">
            <h3 className="text-xl font-bold">Application Details - {selected.submissionId}</h3>
            <button onClick={() => setSelected(null)} className="text-white hover:text-gray-200">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Personal Info */}
            <section>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <User className="w-5 h-5" /> Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {selected.firstName} {selected.lastName}</div>
                <div><strong>Date of Birth:</strong> {selected.dateOfBirth || '-'}</div>
                <div><strong>Email:</strong> {selected.email}</div>
                <div><strong>Contact:</strong> {selected.contactNumber}</div>
                <div className="md:col-span-2"><strong>Address:</strong> {selected.address || '-'}</div>
  </div>
            </section>

            {/* Education */}
            <section>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <GraduationCap className="w-5 h-5" /> Educational Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Bachelor's:</strong> {selected.bachelorsDegree || '-'}</div>
                <div><strong>Completion:</strong> {selected.bachelorsCompletion || '-'}</div>
                <div><strong>Title:</strong> {selected.bachelorsTitle || '-'}</div>
                <div><strong>CGPA:</strong> {selected.bachelorsCGPA || '-'}</div>
                <div><strong>SGPA:</strong> {selected.bachelorsSGPA || '-'}</div>
                <div><strong>HSC:</strong> {selected.hscGrade || '-'}</div>
                <div className="md:col-span-2"><strong>Entrance:</strong> {selected.entranceExamScores || '-'}</div>
              </div>
            </section>

            {/* Language */}
            <section>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <Globe className="w-5 h-5" /> Language & Certificates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div><strong>IELTS/TOEFL:</strong> {selected.ieltsToeflScore || '-'}</div>
                <div><strong>Language:</strong> {selected.degreeLanguage || '-'}</div>
                <div><strong>APS:</strong> {selected.apsCertificate || '-'}</div>
              </div>
            </section>

            {/* Study Plans */}
            <section>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <Target className="w-5 h-5" /> Study Plans
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Intake:</strong> {selected.targetIntake || '-'}</div>
                <div><strong>Universities:</strong> {selected.targetUniversities || '-'}</div>
                <div><strong>Master's:</strong> {selected.mastersSubject || '-'}</div>
                <div><strong>Specialization:</strong> {selected.specialization || '-'}</div>
                <div className="md:col-span-2"><strong>Research:</strong> {selected.researchTopic || '-'}</div>
              </div>
            </section>

            {/* Career */}
            <section>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <Briefcase className="w-5 h-5" /> Career Goals
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Position:</strong> {selected.jobPosition || '-'}</div>
                <div><strong>Level:</strong> {selected.jobLevel || '-'}</div>
                <div><strong>Company:</strong> {selected.company || '-'}</div>
                <div><strong>Title:</strong> {selected.jobTitle || '-'}</div>
              </div>
            </section>

            {/* Source */}
            <section>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <AlertCircle className="w-5 h-5" /> Source
              </h4>
              <div className="text-sm"><strong>How did you find us?</strong> {selected.source || '-'}</div>
            </section>
          </div>

          <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-xl flex justify-end">
            <button
              onClick={() => setSelected(null)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* === SIDEBAR === */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-5 border-b flex items-center justify-between">
          <h1 className={`font-bold text-xl text-blue-600 ${!sidebarOpen && 'hidden'}`}>SS ADMIN</h1>
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
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`${!sidebarOpen && 'hidden'}`}>{item.label}</span>
                {activeTab === item.id && sidebarOpen && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
.used
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className={`${!sidebarOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>

      {/* === MODAL === */}
      {renderDetailsModal()}
    </div>
  );
}