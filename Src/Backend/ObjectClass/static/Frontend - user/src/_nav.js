export default {
  items: [
    {
      name: 'Beranda',
      url: '/beranda',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Konten',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Buku',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Data Buku',
          url: '/base/buku',
          icon: 'icon-folder',
        },
        {
          name: 'Rekomendasi Buku',
          url: '/base/rekomendasi_buku',
          icon: 'icon-folder',
        },
        {
          name: 'Berdasarkan kategori',
          url: '/base',
          icon: 'icon-puzzle',
          children: [
            {
              name: 'Buku Kedokteran',
              url: '/base/buku_dokter',
              icon: 'icon-folder',
            },
            {
              name: 'Buku Keperawatan',
              url: '/base/buku_perawat',
              icon: 'icon-folder',
            },
            {
              name: 'Buku Farmasi',
              url: '/base/buku_farmasi',
              icon: 'icon-folder',
            },
          ]
        },
        // {
        //   name: 'Tahun Terbit',
        //   url: '/base',
        //   icon: 'icon-puzzle',
        //   children: [
        //     {
        //       name: 'Terbitan terbaru',
        //       url: '/base/tahun_descending',
        //       icon: 'icon-folder',
        //     },
        //     {
        //       name: 'Terbitan terlama',
        //       url: '/base/tahun_ascending',
        //       icon: 'icon-folder',
        //     },
        //   ]
        // },
        // {
        //   name: 'Mengurutkan A ke Z',
        //   url: '/base/ascending',
        //   icon: 'icon-folder',
        // },
        // {
        //   name: 'Mengurutkan Z ke A',
        //   url: '/base/descending',
        //   icon: 'icon-folder',
        // }
      ],
    },
    {
      name: 'Ulasan & Kontak',
      url: '/ulasan',
      icon: 'icon-globe',
    },
    // {
    //   name: 'Kontak Kami',
    //   url: '/contact',
    //   icon: 'icon-globe',
    // }
  ],
};
