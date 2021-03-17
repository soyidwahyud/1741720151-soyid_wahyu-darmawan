import React from 'react';

//Tabel
const Tables = React.lazy(() => import('./views/Base/Tabel/Tables'));
const BukuTables = React.lazy(() => import('./views/Base/Tabel/BukuTables/BukuTables'));
const RekomendasiTables = React.lazy(() => import('./views/Base/Tabel/RekomendasiTables/RekomendasiTables'));
const BukuDokter = React.lazy(() => import('./views/Base/Tabel/NakesTables/BukuDokter'));
const BukuPerawat = React.lazy(() => import('./views/Base/Tabel/NakesTables/BukuPerawat'));
const BukuFarmasi = React.lazy(() => import('./views/Base/Tabel/NakesTables/BukuFarmasi'));
const TahunAscending = React.lazy(() => import('./views/Base/Tabel/TahunTables/TahunAscending'));
const TahunDescending = React.lazy(() => import('./views/Base/Tabel/TahunTables/TahunDescending'));
const AscendingTables = React.lazy(() => import('./views/Base/Tabel/AscendingTables/AscendingTables'));
const DescendingTables = React.lazy(() => import('./views/Base/Tabel/DescendingTables/DescendingsTables'));
const ContactTables = React.lazy(() => import('./views/Base/Tabel/ContactTables/ContactTables'));
const UlasanTables = React.lazy(() => import('./views/Base/Tabel/UlasanTables/UlasanTables'));
const DetailBukuTables = React.lazy(() => import ('./views/Base/Tabel/DetailBukuTables/DetailBukuTables'))

const Dashboard = React.lazy(() => import('./views/Dashboard'));


const routes = [
  { path: '/beranda', exact: true, name: 'Beranda' },
  { path: '/beranda', name: 'Beranda', component: Dashboard },

  //Tabel
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/buku', name: 'Data Buku', component: BukuTables },
  { path: '/base/rekomendasi_buku', name: 'Data Rekomendasi Buku', component: RekomendasiTables },
  { path: '/base/buku_dokter', name: 'Buku Kedokteran', component: BukuDokter },
  { path: '/base/buku_perawat', name: 'Buku Keperawatan', component: BukuPerawat },
  { path: '/base/buku_farmasi', name: 'Buku Farmasi', component: BukuFarmasi },
  { path: '/base/tahun_ascending', name: 'Terbitan Terlama', component: TahunAscending },
  { path: '/base/tahun_descending', name: 'Terbitan Terbaru', component: TahunDescending },
  { path: '/base/ascending', name: 'Mengurutkan A ke Z', component: AscendingTables },
  { path: '/base/descending', name: 'Mengurutkan Z ke A', component: DescendingTables },
  { path: '/base/detail', name: 'Detail', component: DetailBukuTables },
  { path: '/ulasan', name: 'Ulasan', component: UlasanTables },
  { path: '/contact', name: 'Kontak Kami', component: ContactTables },


];

export default routes;
