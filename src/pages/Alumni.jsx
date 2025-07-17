import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus, Users, Search, Filter } from "lucide-react";
import supabase from "../utils/SupaClient";
import Swal from "sweetalert2";
import AlumniModal from "../components/AlumniModal";
import "sweetalert2/dist/sweetalert2.min.css";

const Alumni = () => {
  const [dataAlumni, setDataAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAlumni, setNewAlumni] = useState({
    nama: "",
    jurusan: "",
    jalur: "",
    universitas: "",
    angkatan: "",
  });
  const [editModal, setEditModal] = useState({ visible: false, data: {} });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("alumni").select("*");
    if (error) {
      console.error("Gagal mengambil data alumni:", error.message);
    } else {
      setDataAlumni(data);
    }
    setLoading(false);
  };

  const handleLihat = (alumni) => {
    Swal.fire({
      title: alumni.nama,
      html: `
        <div class="text-left space-y-2">
          <p><strong>Universitas:</strong> ${alumni.universitas}</p>
          <p><strong>Jurusan:</strong> ${alumni.jurusan}</p>
          <p><strong>Jalur:</strong> ${alumni.jalur}</p>
          <p><strong>Angkatan:</strong> ${alumni.angkatan}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#6366f1",
    });
  };

  const handleEdit = (id) => {
    const alumni = dataAlumni.find((a) => a.id === id);
    if (alumni) {
      setEditModal({ visible: true, data: alumni });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus Alumni?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      const { error } = await supabase.from("alumni").delete().eq("id", id);
      if (error) {
        Swal.fire("Gagal!", "Data gagal dihapus.", "error");
      } else {
        setDataAlumni(dataAlumni.filter((item) => item.id !== id));
        Swal.fire("Terhapus!", "Data alumni berhasil dihapus.", "success");
      }
    }
  };

  const handleInputChange = (e) => {
    setNewAlumni({ ...newAlumni, [e.target.name]: e.target.value });
  };

  const handleTambahAlumni = async (e) => {
    e.preventDefault();

    const { nama, jurusan, jalur, universitas, angkatan } = newAlumni;
    if (!nama || !jurusan || !jalur || !universitas || !angkatan) {
      return Swal.fire("Gagal", "Semua kolom wajib diisi!", "warning");
    }

    const { error } = await supabase.from("alumni").insert([
      {
        nama,
        jurusan,
        jalur,
        universitas,
        angkatan,
      },
    ]);

    if (error) {
      console.error("Insert Error:", error);
      Swal.fire("Gagal", "Gagal menambahkan alumni", "error");
    } else {
      setShowModal(false);
      setNewAlumni({
        nama: "",
        jurusan: "",
        jalur: "",
        universitas: "",
        angkatan: "",
      });
      fetchAlumni();
      Swal.fire("Sukses", "Alumni berhasil ditambahkan", "success");
    }
  };

  const handleEditChange = (e) => {
    setEditModal({
      ...editModal,
      data: { ...editModal.data, [e.target.name]: e.target.value },
    });
  };

  const handleUpdateAlumni = async (e) => {
    e.preventDefault();
    const { id, nama, jurusan, jalur, universitas, angkatan } = editModal.data;

    const { error } = await supabase
      .from("alumni")
      .update({ nama, jurusan, jalur, universitas, angkatan })
      .eq("id", id);

    if (error) {
      Swal.fire("Gagal", "Gagal memperbarui alumni", "error");
    } else {
      setEditModal({ visible: false, data: {} });
      fetchAlumni();
      Swal.fire("Sukses", "Alumni berhasil diperbarui", "success");
    }
  };

  // Filter alumni berdasarkan search term
  const filteredAlumni = dataAlumni.filter(
    (alumni) =>
      alumni.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.jurusan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.jalur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.universitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.angkatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Data Alumni
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  Kelola data alumni terdaftar
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              <span className="font-medium">Tambah Alumni</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari alumni berdasarkan nama, jurusan, jalur, universitas, atau angkatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Stats */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-gray-900">
                  {filteredAlumni.length}
                </div>
                <div className="text-gray-600">
                  Alumni {searchTerm ? "ditemukan" : "terdaftar"}
                </div>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Reset pencarian
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 shadow-lg border border-white/20">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
              <span className="ml-3 text-gray-600">Memuat data...</span>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Jurusan
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Jalur
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Universitas
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Angkatan
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAlumni.map((alumni, idx) => (
                    <tr
                      key={alumni.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white/50" : "bg-gray-50/50"
                      } hover:bg-indigo-50/70 transition-all duration-200`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {alumni.nama}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {alumni.jurusan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {alumni.jalur}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {alumni.universitas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {alumni.angkatan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleLihat(alumni)}
                            className="group p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-all duration-200 hover:scale-110"
                            title="Lihat Detail"
                          >
                            <Eye
                              size={16}
                              className="group-hover:scale-110 transition-transform"
                            />
                          </button>
                          <button
                            onClick={() => handleEdit(alumni.id)}
                            className="group p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition-all duration-200 hover:scale-110"
                            title="Edit"
                          >
                            <Pencil
                              size={16}
                              className="group-hover:scale-110 transition-transform"
                            />
                          </button>
                          <button
                            onClick={() => handleDelete(alumni.id)}
                            className="group p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-200 hover:scale-110"
                            title="Hapus"
                          >
                            <Trash2
                              size={16}
                              className="group-hover:scale-110 transition-transform"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAlumni.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <Users className="w-12 h-12 text-gray-400" />
                          <p className="text-gray-500 font-medium">
                            {searchTerm
                              ? "Tidak ada alumni yang ditemukan"
                              : "Belum ada data alumni"}
                          </p>
                          {searchTerm && (
                            <button
                              onClick={() => setSearchTerm("")}
                              className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              Reset pencarian
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <AlumniModal
          visible={showModal}
          isEdit={false}
          data={newAlumni}
          onChange={handleInputChange}
          onClose={() => setShowModal(false)}
          onSubmit={handleTambahAlumni}
        />

        <AlumniModal
          visible={editModal.visible}
          isEdit={true}
          data={editModal.data}
          onChange={handleEditChange}
          onClose={() => setEditModal({ visible: false, data: {} })}
          onSubmit={handleUpdateAlumni}
        />
      </div>
    </div>
  );
};

export default Alumni;
