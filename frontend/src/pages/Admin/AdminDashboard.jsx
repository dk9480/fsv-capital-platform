// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import api from '../../services/api';

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();
// //   const [applications, setApplications] = useState([]);
// //   const [stats, setStats] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
// //   const [filterStatus, setFilterStatus] = useState('');
// //   const [filterSector, setFilterSector] = useState('');

// //   const token = localStorage.getItem('adminToken');

// //   useEffect(() => {
// //     if (!token) {
// //       navigate('/admin/login');
// //       return;
// //     }
// //     fetchData();
// //   }, [token, search, filterStatus, filterSector]);

// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       const filters = {};
// //       if (search) filters.search = search;
// //       if (filterStatus) filters.status = filterStatus;
// //       if (filterSector) filters.sector = filterSector;
      
// //       const [appsRes, statsRes] = await Promise.all([
// //         api.getApplications(token, filters),
// //         api.getStats(token)
// //       ]);
      
// //       if (appsRes.success) setApplications(appsRes.applications);
// //       if (statsRes.success) setStats(statsRes.stats);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleStatusChange = async (id, newStatus) => {
// //     try {
// //       await api.updateStatus(token, id, newStatus);
// //       fetchData();
// //     } catch (error) {
// //       console.error('Error updating status:', error);
// //     }
// //   };

// //   const handleExport = async () => {
// //     try {
// //       const response = await api.exportApplications(token);
// //       if (response.success) {
// //         const csvContent = response.data.map(row => 
// //           Object.values(row).join(',')
// //         ).join('\n');
        
// //         const blob = new Blob([`${Object.keys(response.data[0] || {}).join(',')}\n${csvContent}`], { type: 'text/csv' });
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = `fsv_applications_${new Date().toISOString().split('T')[0]}.csv`;
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //       }
// //     } catch (error) {
// //       console.error('Error exporting:', error);
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     const colors = {
// //       'New': 'bg-blue-100 text-blue-800',
// //       'Reviewing': 'bg-yellow-100 text-yellow-800',
// //       'Shortlisted': 'bg-green-100 text-green-800',
// //       'Rejected': 'bg-red-100 text-red-800',
// //       'Funded': 'bg-purple-100 text-purple-800'
// //     };
// //     return colors[status] || 'bg-gray-100 text-gray-800';
// //   };

// //   if (loading) {
// //     return <div className="text-center py-8">Loading...</div>;
// //   }

// //   return (
// //     <div>
// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
// //         <div className="bg-white rounded-lg p-4 shadow-sm">
// //           <p className="text-sm text-gray-500">Total</p>
// //           <p className="text-2xl font-bold">{stats.total || 0}</p>
// //         </div>
// //         <div className="bg-white rounded-lg p-4 shadow-sm">
// //           <p className="text-sm text-gray-500">New</p>
// //           <p className="text-2xl font-bold text-blue-600">{stats.new || 0}</p>
// //         </div>
// //         <div className="bg-white rounded-lg p-4 shadow-sm">
// //           <p className="text-sm text-gray-500">Shortlisted</p>
// //           <p className="text-2xl font-bold text-green-600">{stats.shortlisted || 0}</p>
// //         </div>
// //         <div className="bg-white rounded-lg p-4 shadow-sm">
// //           <p className="text-sm text-gray-500">Funded</p>
// //           <p className="text-2xl font-bold text-purple-600">{stats.funded || 0}</p>
// //         </div>
// //         <div className="bg-white rounded-lg p-4 shadow-sm">
// //           <p className="text-sm text-gray-500">Avg Score</p>
// //           <p className="text-2xl font-bold text-fsv-navy">{stats.averageScore || 0}</p>
// //         </div>
// //       </div>

// //       {/* Filters */}
// //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// //         <div className="flex flex-wrap gap-4">
// //           <input
// //             type="text"
// //             placeholder="Search by startup or founder..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="input-field flex-1"
// //           />
// //           <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field w-40">
// //             <option value="">All Status</option>
// //             <option value="New">New</option>
// //             <option value="Reviewing">Reviewing</option>
// //             <option value="Shortlisted">Shortlisted</option>
// //             <option value="Rejected">Rejected</option>
// //             <option value="Funded">Funded</option>
// //           </select>
// //           <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)} className="input-field w-40">
// //             <option value="">All Sectors</option>
// //             <option value="Fintech">Fintech</option>
// //             <option value="AI">AI</option>
// //             <option value="Blockchain">Blockchain</option>
// //             <option value="SaaS">SaaS</option>
// //           </select>
// //           <button onClick={handleExport} className="btn-primary">
// //             Export CSV
// //           </button>
// //         </div>
// //       </div>

// //       {/* Applications Table */}
// //       <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-gray-50 border-b">
// //             <tr>
// //               <th className="text-left p-4 text-sm font-semibold">Startup</th>
// //               <th className="text-left p-4 text-sm font-semibold">Founder</th>
// //               <th className="text-left p-4 text-sm font-semibold">Sector</th>
// //               <th className="text-left p-4 text-sm font-semibold">Stage</th>
// //               <th className="text-left p-4 text-sm font-semibold">Score</th>
// //               <th className="text-left p-4 text-sm font-semibold">Status</th>
// //               <th className="text-left p-4 text-sm font-semibold">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {applications.map((app) => (
// //               <tr key={app._id} className="border-b hover:bg-gray-50">
// //                 <td className="p-4">
// //                   <div>
// //                     <p className="font-medium">{app.startupName}</p>
// //                     <p className="text-xs text-gray-500">{new Date(app.submittedAt).toLocaleDateString()}</p>
// //                   </div>
// //                 </td>
// //                 <td className="p-4">{app.founderNames}</td>
// //                 <td className="p-4">{app.industry}</td>
// //                 <td className="p-4">{app.currentStage}</td>
// //                 <td className="p-4">
// //                   <span className={`font-bold ${app.dealScore >= 70 ? 'text-green-600' : app.dealScore >= 50 ? 'text-yellow-600' : 'text-gray-600'}`}>
// //                     {app.dealScore}
// //                   </span>
// //                 </td>
// //                 <td className="p-4">
// //                   <select
// //                     value={app.status}
// //                     onChange={(e) => handleStatusChange(app._id, e.target.value)}
// //                     className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(app.status)} border-0`}
// //                   >
// //                     <option value="New">New</option>
// //                     <option value="Reviewing">Reviewing</option>
// //                     <option value="Shortlisted">Shortlisted</option>
// //                     <option value="Rejected">Rejected</option>
// //                     <option value="Funded">Funded</option>
// //                   </select>
// //                 </td>
// //                 <td className="p-4">
// //                   <button
// //                     onClick={() => navigate(`/admin/application/${app._id}`)}
// //                     className="text-fsv-navy hover:underline text-sm"
// //                   >
// //                     View Details
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
        
// //         {applications.length === 0 && (
// //           <div className="text-center py-8 text-gray-500">No applications found</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;





// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../services/api';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [allApplications, setAllApplications] = useState([]);
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [filterSector, setFilterSector] = useState('');

//   const token = localStorage.getItem('adminToken');

//   // Load all applications once on mount
//   useEffect(() => {
//     if (!token) {
//       navigate('/admin/login');
//       return;
//     }
//     loadAllData();
//   }, [token]);

//   const loadAllData = async () => {
//     try {
//       setLoading(true);
//       const [appsRes, statsRes] = await Promise.all([
//         api.getApplications(token),
//         api.getStats(token)
//       ]);
      
//       if (appsRes.success) setAllApplications(appsRes.applications);
//       if (statsRes.success) setStats(statsRes.stats);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // INSTANT filtering - no API calls, just local filtering
//   const filteredApplications = useMemo(() => {
//     let filtered = [...allApplications];
    
//     // Filter by search (startup name or founder name)
//     if (search.trim()) {
//       const searchLower = search.toLowerCase();
//       filtered = filtered.filter(app => 
//         app.startupName?.toLowerCase().includes(searchLower) ||
//         app.founderNames?.toLowerCase().includes(searchLower)
//       );
//     }
    
//     // Filter by status
//     if (filterStatus) {
//       filtered = filtered.filter(app => app.status === filterStatus);
//     }
    
//     // Filter by sector
//     if (filterSector) {
//       filtered = filtered.filter(app => 
//         app.industry?.toLowerCase().includes(filterSector.toLowerCase())
//       );
//     }
    
//     return filtered;
//   }, [allApplications, search, filterStatus, filterSector]);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await api.updateStatus(token, id, newStatus);
//       // Update local state instead of refetching
//       setAllApplications(prev => 
//         prev.map(app => app._id === id ? { ...app, status: newStatus } : app)
//       );
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await api.exportApplications(token);
//       if (response.success) {
//         const headers = Object.keys(response.data[0] || {});
//         const csvRows = response.data.map(row => 
//           headers.map(header => JSON.stringify(row[header] || '')).join(',')
//         );
//         const csvContent = [headers.join(','), ...csvRows].join('\n');
        
//         const blob = new Blob([csvContent], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `fsv_applications_${new Date().toISOString().split('T')[0]}.csv`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error('Error exporting:', error);
//       alert('Error exporting data');
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       'New': 'bg-blue-100 text-blue-800',
//       'Reviewing': 'bg-yellow-100 text-yellow-800',
//       'Shortlisted': 'bg-green-100 text-green-800',
//       'Rejected': 'bg-red-100 text-red-800',
//       'Funded': 'bg-purple-100 text-purple-800'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   // Show loading only on first load
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-16">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-fsv-navy border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500">Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Total</p>
//           <p className="text-2xl font-bold text-fsv-navy">{allApplications.length}</p>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">New</p>
//           <p className="text-2xl font-bold text-blue-600">
//             {allApplications.filter(a => a.status === 'New').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Reviewing</p>
//           <p className="text-2xl font-bold text-yellow-600">
//             {allApplications.filter(a => a.status === 'Reviewing').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Shortlisted</p>
//           <p className="text-2xl font-bold text-green-600">
//             {allApplications.filter(a => a.status === 'Shortlisted').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Funded</p>
//           <p className="text-2xl font-bold text-purple-600">
//             {allApplications.filter(a => a.status === 'Funded').length}
//           </p>
//         </div>
//       </div>

//       {/* Filters - INSTANT local filtering */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <label className="text-xs text-gray-500 mb-1 block">🔍 Instant Search</label>
//             <input
//               type="text"
//               placeholder="Type startup or founder name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="input-field w-full"
//               autoFocus
//             />
//             {search && (
//               <p className="text-xs text-green-600 mt-1">
//                 ⚡ Found {filteredApplications.length} result(s) for "{search}"
//               </p>
//             )}
//           </div>
//           <div>
//             <label className="text-xs text-gray-500 mb-1 block">Status</label>
//             <select 
//               value={filterStatus} 
//               onChange={(e) => setFilterStatus(e.target.value)} 
//               className="input-field w-40"
//             >
//               <option value="">All Status</option>
//               <option value="New">New</option>
//               <option value="Reviewing">Reviewing</option>
//               <option value="Shortlisted">Shortlisted</option>
//               <option value="Rejected">Rejected</option>
//               <option value="Funded">Funded</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-xs text-gray-500 mb-1 block">Sector</label>
//             <select 
//               value={filterSector} 
//               onChange={(e) => setFilterSector(e.target.value)} 
//               className="input-field w-40"
//             >
//               <option value="">All Sectors</option>
//               <option value="Fintech">Fintech</option>
//               <option value="AI">AI</option>
//               <option value="Blockchain">Blockchain</option>
//               <option value="SaaS">SaaS</option>
//               <option value="DeepTech">DeepTech</option>
//             </select>
//           </div>
//           <div className="flex items-end">
//             <button onClick={handleExport} className="btn-primary">
//               📥 Export CSV
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Results count */}
//       <div className="mb-4 flex justify-between items-center">
//         <p className="text-sm text-gray-500">
//           Showing <span className="font-semibold text-fsv-navy">{filteredApplications.length}</span> of{' '}
//           <span className="font-semibold">{allApplications.length}</span> application(s)
//         </p>
//         {(search || filterStatus || filterSector) && (
//           <button 
//             onClick={() => {
//               setSearch('');
//               setFilterStatus('');
//               setFilterSector('');
//             }} 
//             className="text-xs text-red-500 hover:text-red-700 transition-colors"
//           >
//             ✕ Clear all filters
//           </button>
//         )}
//       </div>

//       {/* Applications Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-100">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left p-4 text-sm font-semibold text-gray-600">Startup</th>
//               <th className="text-left p-4 text-sm font-semibold text-gray-600">Founder</th>
//               <th className="text-left p-4 text-sm font-semibold text-gray-600">Sector</th>
//               <th className="text-left p-4 text-sm font-semibold text-gray-600">Stage</th>
//               <th className="text-left p-4 text-sm font-semibold text-gray-600">Score</th>
//               <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
//               <th className="text-left p-4 text-sm font-semibold text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredApplications.map((app) => (
//               <tr key={app._id} className="border-b hover:bg-gray-50 transition-colors">
//                 <td className="p-4">
//                   <div>
//                     <p className="font-medium text-gray-900">{app.startupName}</p>
//                     <p className="text-xs text-gray-400">{new Date(app.submittedAt).toLocaleDateString()}</p>
//                   </div>
//                 </td>
//                 <td className="p-4 text-gray-700">{app.founderNames}</td>
//                 <td className="p-4">
//                   <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//                     {app.industry}
//                   </span>
//                 </td>
//                 <td className="p-4 text-gray-700">{app.currentStage}</td>
//                 <td className="p-4">
//                   <span className={`font-bold text-lg ${app.dealScore >= 70 ? 'text-green-600' : app.dealScore >= 50 ? 'text-yellow-600' : 'text-gray-500'}`}>
//                     {app.dealScore}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <select
//                     value={app.status}
//                     onChange={(e) => handleStatusChange(app._id, e.target.value)}
//                     className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(app.status)} border-0 cursor-pointer focus:ring-2 focus:ring-fsv-navy`}
//                   >
//                     <option value="New">New</option>
//                     <option value="Reviewing">Reviewing</option>
//                     <option value="Shortlisted">Shortlisted</option>
//                     <option value="Rejected">Rejected</option>
//                     <option value="Funded">Funded</option>
//                   </select>
//                 </td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => navigate(`/admin/application/${app._id}`)}
//                     className="text-fsv-navy hover:underline text-sm font-medium"
//                   >
//                     View Details →
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {filteredApplications.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             {search || filterStatus || filterSector ? (
//               <>
//                 <p className="text-lg mb-2">🔍 No matching applications found</p>
//                 <p className="text-sm">Try different search terms or clear filters</p>
//               </>
//             ) : (
//               <>
//                 <p className="text-lg mb-2">📭 No applications yet</p>
//                 <p className="text-sm">When startups apply, they will appear here</p>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
  ComposedChart, Area
} from 'recharts';
import api from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [allApplications, setAllApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({
    monthlyApplications: [],
    scoreTrend: [],
    sectorDistribution: [],
    stageDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSector, setFilterSector] = useState('');

  const token = localStorage.getItem('adminToken');

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Load all applications once on mount
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
    loadChartData();
  }, [token]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [appsRes, statsRes] = await Promise.all([
        api.getApplications(token),
        api.getStats(token)
      ]);
      
      if (appsRes.success) setAllApplications(appsRes.applications);
      if (statsRes.success) setStats(statsRes.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChartData = async () => {
    try {
      const response = await api.getChartData(token);
      if (response.success) {
        setChartData(response.data);
      }
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  };

  // INSTANT filtering - no API calls, just local filtering
  const filteredApplications = useMemo(() => {
    let filtered = [...allApplications];
    
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(app => 
        app.startupName?.toLowerCase().includes(searchLower) ||
        app.founderNames?.toLowerCase().includes(searchLower)
      );
    }
    
    if (filterStatus) {
      filtered = filtered.filter(app => app.status === filterStatus);
    }
    
    if (filterSector) {
      filtered = filtered.filter(app => 
        app.industry?.toLowerCase().includes(filterSector.toLowerCase())
      );
    }
    
    return filtered;
  }, [allApplications, search, filterStatus, filterSector]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateStatus(token, id, newStatus);
      setAllApplications(prev => 
        prev.map(app => app._id === id ? { ...app, status: newStatus } : app)
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.exportApplications(token);
      if (response.success) {
        const headers = Object.keys(response.data[0] || {});
        const csvRows = response.data.map(row => 
          headers.map(header => JSON.stringify(row[header] || '')).join(',')
        );
        const csvContent = [headers.join(','), ...csvRows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fsv_applications_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Error exporting data');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-800',
      'Reviewing': 'bg-yellow-100 text-yellow-800',
      'Shortlisted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Funded': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-fsv-navy border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-fsv-navy">{allApplications.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">New</p>
          <p className="text-2xl font-bold text-blue-600">
            {allApplications.filter(a => a.status === 'New').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Reviewing</p>
          <p className="text-2xl font-bold text-yellow-600">
            {allApplications.filter(a => a.status === 'Reviewing').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Shortlisted</p>
          <p className="text-2xl font-bold text-green-600">
            {allApplications.filter(a => a.status === 'Shortlisted').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Funded</p>
          <p className="text-2xl font-bold text-purple-600">
            {allApplications.filter(a => a.status === 'Funded').length}
          </p>
        </div>
      </div>

      {/* Analytics Charts Section - NEW */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
        <h2 className="text-xl font-bold text-fsv-navy mb-6">📊 Analytics Dashboard</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chart 1: Applications per month */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Applications Per Month</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData.monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0A1929" name="Applications" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Average Deal Score Trend */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Average Deal Score Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData.scoreTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#FFB74D" name="Deal Score" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Sector-wise Distribution */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Sector-wise Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData.sectorDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.sectorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4: Stage-wise Funnel */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Stage-wise Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData.stageDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="stage" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#008080" name="Applications" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters - INSTANT local filtering */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500 mb-1 block">🔍 Instant Search</label>
            <input
              type="text"
              placeholder="Type startup or founder name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field w-full"
              autoFocus
            />
            {search && (
              <p className="text-xs text-green-600 mt-1">
                ⚡ Found {filteredApplications.length} result(s) for "{search}"
              </p>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Status</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)} 
              className="input-field w-40"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
              <option value="Funded">Funded</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Sector</label>
            <select 
              value={filterSector} 
              onChange={(e) => setFilterSector(e.target.value)} 
              className="input-field w-40"
            >
              <option value="">All Sectors</option>
              <option value="Fintech">Fintech</option>
              <option value="AI">AI</option>
              <option value="Blockchain">Blockchain</option>
              <option value="SaaS">SaaS</option>
              <option value="DeepTech">DeepTech</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleExport} className="btn-primary">
              📥 Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-fsv-navy">{filteredApplications.length}</span> of{' '}
          <span className="font-semibold">{allApplications.length}</span> application(s)
        </p>
        {(search || filterStatus || filterSector) && (
          <button 
            onClick={() => {
              setSearch('');
              setFilterStatus('');
              setFilterSector('');
            }} 
            className="text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            ✕ Clear all filters
          </button>
        )}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-gray-600">Startup</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-600">Founder</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-600">Sector</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-600">Stage</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-600">Score</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-gray-900">{app.startupName}</p>
                    <p className="text-xs text-gray-400">{new Date(app.submittedAt).toLocaleDateString()}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-700">{app.founderNames}</td>
                <td className="p-4">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {app.industry}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{app.currentStage}</td>
                <td className="p-4">
                  <span className={`font-bold text-lg ${app.dealScore >= 70 ? 'text-green-600' : app.dealScore >= 50 ? 'text-yellow-600' : 'text-gray-500'}`}>
                    {app.dealScore}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(app.status)} border-0 cursor-pointer focus:ring-2 focus:ring-fsv-navy`}
                  >
                    <option value="New">New</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Funded">Funded</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/admin/application/${app._id}`)}
                    className="text-fsv-navy hover:underline text-sm font-medium"
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredApplications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {search || filterStatus || filterSector ? (
              <>
                <p className="text-lg mb-2">🔍 No matching applications found</p>
                <p className="text-sm">Try different search terms or clear filters</p>
              </>
            ) : (
              <>
                <p className="text-lg mb-2">📭 No applications yet</p>
                <p className="text-sm">When startups apply, they will appear here</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;