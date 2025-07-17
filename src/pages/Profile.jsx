import React, { useState } from "react";
import {
  UserCircle,
  Mail,
  Phone,
  Shield,
  Edit2,
  Save,
  X,
  Camera,
  Calendar,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "Muhammad Akbar Fajar Fadillah Tandean",
    email: "admin@smabi.sch.id",
    phone: "0812-3456-7890",
    role: "Administrator",
    createdAt: "1 Januari 2024",
  });

  const [editData, setEditData] = useState({ ...adminData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...adminData });
  };

  const handleSave = () => {
    setAdminData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...adminData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profil Admin
          </h1>
          <p className="text-gray-600">
            Kelola informasi akun administrator sistem
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="text-white" size={24} />
              <h2 className="text-xl font-semibold text-white">
                Informasi Administrator
              </h2>
            </div>

            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-all duration-200"
              >
                <Edit2 size={18} />
                <span>Edit Profil</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                >
                  <Save size={18} />
                  <span>Simpan</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                >
                  <X size={18} />
                  <span>Batal</span>
                </button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {/* Profile Picture & Name Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <UserCircle size={80} className="text-white" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200">
                    <Camera size={20} />
                  </button>
                )}
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center md:text-left">
                {!isEditing ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {adminData.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      <Shield size={16} />
                      <span>{adminData.role}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        value={editData.role}
                        onChange={(e) =>
                          handleInputChange("role", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Moderator">Moderator</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Email */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Mail size={20} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Email</span>
                </div>
                {!isEditing ? (
                  <p className="text-gray-700 pl-13">{adminData.email}</p>
                ) : (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Masukkan email"
                  />
                )}
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Phone size={20} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Telepon</span>
                </div>
                {!isEditing ? (
                  <p className="text-gray-700 pl-13">{adminData.phone}</p>
                ) : (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Masukkan nomor telepon"
                  />
                )}
              </div>
            </div>

            {/* Created Date */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 block">
                    Akun Dibuat
                  </span>
                  <p className="text-gray-700">{adminData.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
