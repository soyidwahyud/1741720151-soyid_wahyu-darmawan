import React from 'react';

//Tabel
const Tables = React.lazy(() => import('./views/Base/Tabel/Tables'));
const UserTables = React.lazy(() => import('./views/Base/Tabel/UserTables/UserTables'));
const NakesTables = React.lazy(() => import('./views/Base/Tabel/NakesTables/NakesTables'));
const JenisTables = React.lazy(() => import('./views/Base/Tabel/JenisTables/JenisTables'));
const PenulisTables = React.lazy(() => import('./views/Base/Tabel/PenulisTables/PenulisTables'));
const PenerbitTables = React.lazy(() => import('./views/Base/Tabel/PenerbitTables/PenerbitTables'));
const BookTables = React.lazy(() => import('./views/Base/Tabel/BookTables/BookTables'));
const ReviewTables = React.lazy(() => import('./views/Base/Tabel/ReviewTables/ReviewTables'));
const NilaiTables = React.lazy(()=> import('./views/Base/Tabel/NilaiTables/NilaiTables'))
const KriteriaTables = React.lazy(()=> import('./views/Base/Tabel/KriteriaTables/KriteriaTables'))
const HitungVikorTables = React.lazy(()=> import('./views/Base/Tabel/HitungVikorTables/HitungVikorTables'))
const AdminTables = React.lazy(() => import('./views/Base/Tabel/AdminTables/AdminTables'));

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  //Tabel
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/user_tabel', name: 'User Tables', component: UserTables },
  { path: '/base/nakes_tabel', name: 'Nakes Tables', component: NakesTables },
  { path: '/base/jenis_tabel', name: 'Jenis Tables', component: JenisTables },
  { path: '/base/penulis_tabel', name: 'Penulis Tables', component: PenulisTables },
  { path: '/base/penerbit_tabel', name: 'Penerbit Tables', component: PenerbitTables },
  { path: '/base/buku_tabel', name: 'Book Tables', component: BookTables },
  { path: '/base/review', name: 'Review Tables', component: ReviewTables },
  { path: '/base/kriteria_tabel', name: 'Kriteria Tables', component: KriteriaTables },
  { path: '/base/vikor_tabel', name: 'Hitung Vikor Tables', component: HitungVikorTables },
  { path: '/base/nilai_tabel', name: 'Nilai Tables', component: NilaiTables },
  { path: '/base/admin_tabel', name: 'Admin Tables', component: AdminTables },


];

export default routes;
