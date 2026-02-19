"use client";

import { useEffect, useState } from "react";
import { dashboardCampaigns, platformActivities } from "@/data/dummy/dashboard";

// Aliases for local usage
const campaigns = dashboardCampaigns;

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "user";
    setUserRole(role);
  }, []);

  // Superadmin Dashboard
  if (userRole === "super_admin") {
    return (
      <div className="p-4 md:p-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Ringkasan Utama</h1>
          <p className="text-sm text-gray-500 mt-1">
            Pantau metrik utama dan aktivitas sistem AutoWhatsApp.web.id
          </p>
        </div>
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
            {/* Total Pengguna */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm group hover:border-wa-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-wa-green">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="flex items-center text-xs font-medium text-wa-green bg-green-50 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    trending_up
                  </span>
                  +5.2%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">12,450</h3>
              <p className="text-xs text-gray-400 mt-2">
                Perubahan dari minggu lalu
              </p>
            </div>

            {/* Langganan Aktif */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm group hover:border-wa-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <span className="material-symbols-outlined">
                    workspace_premium
                  </span>
                </div>
                <span className="flex items-center text-xs font-medium text-wa-green bg-green-50 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    trending_up
                  </span>
                  +2.1%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500">
                Langganan Aktif
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">8,200</h3>
              <p className="text-xs text-gray-400 mt-2">
                Pelanggan berbayar aktif
              </p>
            </div>

            {/* Pendapatan Bulan Ini */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm group hover:border-wa-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="flex items-center text-xs font-medium text-wa-green bg-green-50 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    trending_up
                  </span>
                  +12.5%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500">
                Pendapatan Bulan Ini
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                Rp 450jt
              </h3>
              <p className="text-xs text-gray-400 mt-2">Total pendapatan kotor</p>
            </div>

            {/* Total Pesan Terkirim */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm group hover:border-wa-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <span className="material-symbols-outlined">send</span>
                </div>
                <span className="flex items-center text-xs font-medium text-wa-green bg-green-50 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    trending_up
                  </span>
                  +8.4%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500">
                Total Pesan Terkirim
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">1.2M</h3>
              <p className="text-xs text-gray-400 mt-2">Volume pesan sistem</p>
            </div>
          </div>

          {/* Pertumbuhan Pengguna Chart */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Pertumbuhan Pengguna
                </h3>
                <p className="text-sm text-gray-500">
                  Statistik pendaftaran user baru dalam 30 hari terakhir
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                <button className="px-3 py-1.5 text-xs font-medium bg-white text-gray-900 shadow-sm rounded-md">
                  30 Hari
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900">
                  3 Bulan
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900">
                  1 Tahun
                </button>
              </div>
            </div>
            <div className="relative h-64 w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pointer-events-none pr-2">
                <span>15k</span>
                <span>10k</span>
                <span>5k</span>
                <span>0</span>
              </div>
              <div className="ml-8 h-full relative">
                {/* Grid lines */}
                <div className="absolute w-full h-full flex flex-col justify-between pointer-events-none">
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="w-full h-px bg-gray-100"></div>
                </div>
                {/* SVG Chart */}
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 1000 250"
                >
                  <defs>
                    <linearGradient
                      id="admin-gradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#25D366"
                        stopOpacity="0.2"
                      ></stop>
                      <stop
                        offset="100%"
                        stopColor="#25D366"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,200 C150,200 150,150 250,150 C350,150 350,180 450,120 C550,60 550,100 650,80 C750,60 750,20 850,40 C950,60 950,10 1000,10 V250 H0 Z"
                    fill="url(#admin-gradient)"
                  ></path>
                  <path
                    d="M0,200 C150,200 150,150 250,150 C350,150 350,180 450,120 C550,60 550,100 650,80 C750,60 750,20 850,40 C950,60 950,10 1000,10"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="3"
                  ></path>
                  <circle
                    className="fill-white stroke-wa-green"
                    cx="250"
                    cy="150"
                    r="4"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    className="fill-white stroke-wa-green"
                    cx="450"
                    cy="120"
                    r="4"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    className="fill-white stroke-wa-green"
                    cx="650"
                    cy="80"
                    r="4"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    className="fill-white stroke-wa-green"
                    cx="850"
                    cy="40"
                    r="4"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    className="fill-white stroke-wa-green"
                    cx="1000"
                    cy="10"
                    r="4"
                    strokeWidth="2"
                  ></circle>
                </svg>
              </div>
            </div>
            {/* X-axis labels */}
            <div className="mt-4 ml-8 flex justify-between text-xs font-medium text-gray-400">
              <span>Jan 01</span>
              <span>Jan 07</span>
              <span>Jan 14</span>
              <span>Jan 21</span>
              <span>Jan 28</span>
            </div>
          </div>

          {/* Aktivitas Terbaru Platform */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <h3 className="text-lg font-bold text-gray-900">
                Aktivitas Terbaru Platform
              </h3>
              <a
                className="text-sm font-medium text-wa-dark hover:text-wa-green"
                href="#"
              >
                Lihat Semua
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                  <tr>
                    <th className="px-6 py-4" scope="col">
                      User
                    </th>
                    <th className="px-6 py-4" scope="col">
                      Aktivitas
                    </th>
                    <th className="px-6 py-4" scope="col">
                      Waktu
                    </th>
                    <th className="px-6 py-4" scope="col">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right" scope="col">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {platformActivities.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${item.initialsColor}`}
                          >
                            {item.initials}
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-xs font-normal text-gray-400">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.activity}{" "}
                        {item.activityDetail && (
                          <span className="text-xs text-gray-400 ml-1">
                            {item.activityDetail}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.time}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${item.statusColor}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <span className="material-symbols-outlined text-[20px]">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Menampilkan{" "}
                <span className="font-bold text-gray-900">5</span> dari{" "}
                <span className="font-bold text-gray-900">128</span> aktivitas
              </p>
              <div className="flex gap-2">
                <button
                  className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  Sebelumnya
                </button>
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50">
                  Berikutnya
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // User Dashboard
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Ringkasan aktivitas WhatsApp Anda</p>
      </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Pesan Terkirim */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Pesan Terkirim
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  12.450
                </h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-wa-green">
                  send
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm mt-4">
              <span className="text-green-600 font-medium flex items-center">
                <span className="material-symbols-outlined text-sm">
                  arrow_upward
                </span>{" "}
                12%
              </span>
              <span className="text-gray-400">vs bulan lalu</span>
            </div>
          </div>

          {/* Perangkat Aktif */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Perangkat Aktif
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  3{" "}
                  <span className="text-lg text-gray-400 font-normal">/ 5</span>
                </h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="material-symbols-outlined text-blue-600">
                  smartphone
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                3 Terhubung
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                0 Terputus
              </span>
            </div>
          </div>

          {/* Sisa Kuota */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Sisa Kuota</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  8.550
                </h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <span className="material-symbols-outlined text-purple-600">
                  pie_chart
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-wa-green h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">
              65% Terpakai
            </p>
          </div>
        </div>

        {/* Chart + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message Volume Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Volume Pesan (7 Hari Terakhir)
              </h2>
              <select className="text-sm border-gray-300 rounded-md text-gray-600 focus:ring-wa-green focus:border-wa-green">
                <option>7 Hari Terakhir</option>
                <option>30 Hari Terakhir</option>
              </select>
            </div>

            <div className="w-full h-64 relative">
              {/* Y-axis labels */}
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                <div className="flex items-center w-full">
                  <span className="w-8">2000</span>
                  <div className="flex-1 h-px bg-gray-100 ml-2"></div>
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8">1500</span>
                  <div className="flex-1 h-px bg-gray-100 ml-2"></div>
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8">1000</span>
                  <div className="flex-1 h-px bg-gray-100 ml-2"></div>
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8">500</span>
                  <div className="flex-1 h-px bg-gray-100 ml-2"></div>
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8">0</span>
                  <div className="flex-1 h-px bg-gray-100 ml-2"></div>
                </div>
              </div>

              {/* SVG Chart */}
              <div className="absolute inset-0 ml-10 flex items-end justify-between px-4 pb-6">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 200"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#25D366"
                        stopOpacity="0.2"
                      ></stop>
                      <stop
                        offset="100%"
                        stopColor="#25D366"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,150 Q50,100 83,120 T166,80 T250,110 T333,50 T416,90 T500,60"
                    fill="none"
                    stroke="#25D366"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <path
                    d="M0,150 Q50,100 83,120 T166,80 T250,110 T333,50 T416,90 T500,60 V200 H0 Z"
                    fill="url(#gradient)"
                    stroke="none"
                  ></path>
                  <circle
                    cx="0"
                    cy="150"
                    fill="white"
                    r="4"
                    stroke="#25D366"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="83"
                    cy="120"
                    fill="white"
                    r="4"
                    stroke="#25D366"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="166"
                    cy="80"
                    fill="white"
                    r="4"
                    stroke="#25D366"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="250"
                    cy="110"
                    fill="white"
                    r="4"
                    stroke="#25D366"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="333"
                    cy="50"
                    fill="white"
                    r="4"
                    stroke="#25D366"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="416"
                    cy="90"
                    fill="white"
                    r="4"
                    stroke="#25D366"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="500"
                    cy="60"
                    fill="white"
                    r="4"
                    stroke="#25D366"
                    strokeWidth="2"
                  ></circle>
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-gray-400 px-2">
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
                <span>Min</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Statistik Cepat
            </h2>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-md">
                    <span className="material-symbols-outlined text-lg">
                      api
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Permintaan API
                    </p>
                    <p className="text-xs text-gray-500">24 jam terakhir</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800">1.204</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 text-orange-600 p-2 rounded-md">
                    <span className="material-symbols-outlined text-lg">
                      error
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Pesan Gagal
                    </p>
                    <p className="text-xs text-gray-500">Perlu perhatian</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800">12</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 text-teal-600 p-2 rounded-md">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Terjadwal
                    </p>
                    <p className="text-xs text-gray-500">Kampanye mendatang</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800">2</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Lihat Laporan Rinci
              </button>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Aktivitas Terkini
            </h2>
            <a
              className="text-sm text-wa-dark hover:text-wa-green font-medium"
              href="#"
            >
              Lihat Semua
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium">Nama Kampanye</th>
                  <th className="px-6 py-3 font-medium">Tanggal</th>
                  <th className="px-6 py-3 font-medium">Perangkat</th>
                  <th className="px-6 py-3 font-medium">Volume</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {campaigns.map((campaign, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{campaign.date}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {campaign.device}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {campaign.volume}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.statusColor}`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined text-[20px]">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    </div>
  );
}
