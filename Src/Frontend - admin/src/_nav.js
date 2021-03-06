export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',

    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Data',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Akun',
          url: '/base/user_tabel',
          icon: 'icon-puzzle',
          children:[
            {
              name: 'Data User',
              url: '/base/user_tabel',
              icon: 'icon-folder',
            },
            {
              name: 'Data Admin',
              url: '/base/admin_tabel',
              icon: 'icon-folder',
            },
          ]
        },
        {
          name: 'Buku',
          url: '/base/',
          icon: 'icon-puzzle',
          children: [
            {
              name: 'Data Kategori',
              url: '/base/nakes_tabel',
              icon: 'icon-folder',
            },
            {
              name: 'Data Jenis Buku',
              url: '/base/jenis_tabel',
              icon: 'icon-folder',
            },
            {
              name: 'Data Penulis Buku',
              url: '/base/penulis_tabel',
              icon: 'icon-folder',
            },
            {
              name: 'Data Penerbit Buku',
              url: '/base/penerbit_tabel',
              icon: 'icon-folder',
            },
            {
              name: 'Data Buku',
              url: '/base/buku_tabel',
              icon: 'icon-folder',
            },
          ]
        },
        {
          name: 'Penilaian',
          url: '/base/',
          icon: 'icon-puzzle',
          children: [
            {
              name: 'Data Kriteria Buku',
              url: '/base/kriteria_tabel',
              icon: 'icon-folder',
            },
            {
              name: 'Data Nilai Buku',
              url: '/base/nilai_tabel',
              icon: 'icon-folder',
            },
            {
              name: 'Data Rekomendasi',
              url: '/base/vikor_tabel',
              icon: 'icon-folder',
            },
          ]
        },
        {
          name: 'Data Ulasan',
          url: '/base/review',
          icon: 'icon-folder',
        },

      ],
    }
  ],
};
