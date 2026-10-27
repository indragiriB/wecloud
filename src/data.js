// ─────────────────────────────────────────────────────────────
//  EDIT FILE INI. Semua isi situs berasal dari sini.
//  Teks sudah dalam Bahasa Indonesia; ganti saja kalau perlu.
// ─────────────────────────────────────────────────────────────

const site = {
  // Tampil sebagai tulisan titik-titik besar di hero. Tiap kata satu baris.
  name: 'We Cloud',
  initials: 'WC',
  role: 'Jasa pembuatan website dan aplikasi',
  intro:
    'Dari Solo, kami membuat website dan aplikasi yang cepat, rapi, dan mudah dipakai, untuk bisnis, komunitas, dan organisasi.',

  // Jam di hero memakai zona waktu ini (nama IANA).
  timezone: 'Asia/Jakarta',

  hero: {
    status: 'Menerima proyek baru',
    clockCaption: 'Solo, WIB',
    facts: [
      ['Berbasis di', 'Solo, Jawa Tengah'],
      ['Layanan', 'Website dan aplikasi'],
      ['Teknologi', 'React, TypeScript, Supabase'],
    ],
  },

  nav: [
    { id: 'home', label: 'Beranda' },
    { id: 'work', label: 'Proyek' },
    { id: 'services', label: 'Layanan' },
    { id: 'about', label: 'Tentang' },
    { id: 'contact', label: 'Kontak' },
  ],

  // Teks antarmuka (tombol, label aksesibilitas).
  ui: {
    skip: 'Lewati ke proyek',
    backToTop: 'Kembali ke atas',
    toDark: 'Ganti ke mode gelap',
    toLight: 'Ganti ke mode terang',
    menu: 'Menu',
    close: 'Tutup',
    primaryNav: 'Navigasi utama',
    mobileNav: 'Navigasi seluler',
    viewWork: 'Lihat proyek',
    getInTouch: 'Hubungi kami',
    atAGlance: 'Sekilas',
    jumpTo: 'Loncat ke proyek',
    role: 'Peran',
    builtWith: 'Dibuat dengan',
    live: 'Lihat situs',
    source: 'Kode',
    for: 'untuk',
    suitedFor: 'Cocok untuk',
    copy: 'Salin email',
    copied: 'Tersalin',
    copyFailed: 'Gagal menyalin',
    copiedAnnounce: 'Alamat email disalin',
    copyFailedAnnounce: 'Tidak bisa menyalin',
    writeEmail: 'Kirim email',
    whatsapp: 'Chat WhatsApp',
    placeholder: 'gambar contoh',
  },

  // ── Proyek pilihan ──────────────────────────────────────────
  // image: file di /public/projects/. null = tampil placeholder.
  projects: [
    {
      id: 'monote',
      title: 'Monote',
      year: '2026',
      type: 'Aplikasi catatan',
      role: 'Desain dan pengembangan',
      description:
        'Aplikasi catatan hitam-putih yang tetap jalan tanpa internet. Ada editor Markdown, tag, deadline dengan pengingat, kalender bulanan, dan sinkronisasi antar perangkat. Bisa dipasang sebagai aplikasi desktop maupun aplikasi Android dengan widget.',
      tags: ['React', 'Supabase', 'PWA', 'Android'],
      links: { live: null, code: 'https://github.com/indragiriB/monote' },
      image: '/projects/monote.webp',
      imageAlt: 'Monote: daftar catatan di kiri dan catatan yang sedang dibaca di kanan',
    },
    {
      id: 'rekap-infaq',
      title: 'Rekap Infaq',
      year: '2026',
      type: 'Aplikasi web',
      role: 'Desain dan pengembangan',
      description:
        'Pencatatan dan rekap infaq bulanan untuk satu komunitas. Pembagian ke kas kelompok dan daerah dihitung otomatis, setiap perubahan tercatat siapa yang mengubahnya, dan laporan siap dikirim lewat WhatsApp.',
      tags: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
      links: { live: null, code: 'https://github.com/indragiriB/infaq-app' },
      image: '/projects/infaq.webp',
      imageAlt: 'Rekap Infaq: ringkasan jumlah yang belum disetor, saldo kas, dan rincian pembagian',
    },
    {
      id: 'baswara-studio',
      title: 'Baswara Studio',
      year: '2026',
      type: 'Website bisnis',
      role: 'Desain dan pengembangan',
      description:
        'Website studio foto di Surakarta. Ada galeri 12 foto dengan lightbox yang bisa digeser, daftar harga per kategori, dan formulir yang membuka WhatsApp dengan pesan yang sudah siap dikirim.',
      tags: ['React', 'TypeScript', 'Vite', 'Responsif'],
      links: {
        live: 'https://www.baswarastudio.my.id/',
        code: 'https://github.com/indragiriB/baswarastudio',
      },
      image: '/projects/baswara.png',
      imageAlt: 'Baswara Studio: halaman depan dengan foto pernikahan dan tombol pesan sesi',
    },
  ],

  // ── Layanan ─────────────────────────────────────────────────
  services: {
    meta: '4 layanan',
    items: [
      {
        name: 'Website',
        text: 'Company profile, landing page, katalog, dan website studio atau portofolio. Cepat dibuka di HP, rapi untuk mesin pencari, dan isinya gampang diganti.',
        fits: ['Company profile', 'Landing page', 'Katalog', 'Portofolio'],
      },
      {
        name: 'Aplikasi web',
        text: 'Dashboard, pencatatan, dan alat internal yang menggantikan spreadsheet dan grup chat yang berantakan. Lengkap dengan login, database, dan laporan sesuai alur kerjamu.',
        fits: ['Pencatatan', 'Rekap dan laporan', 'Login dan hak akses'],
      },
      {
        name: 'Aplikasi HP dan offline',
        text: 'Aplikasi yang bisa dipasang di HP atau laptop dan tetap bisa dipakai saat sinyal hilang. Untuk Android, aplikasinya bisa dibungkus jadi aplikasi sungguhan.',
        fits: ['PWA', 'Offline', 'Android'],
      },
      {
        name: 'Redesign dan perawatan',
        text: 'Website lama yang lambat atau berantakan dirapikan jadi responsif. Kami juga membantu domain, hosting, SSL, dan perbaikan setelah rilis.',
        fits: ['Redesign', 'Domain dan hosting', 'Perawatan'],
      },
    ],
    process: {
      title: 'Cara kerja',
      steps: [
        { title: 'Ngobrol', text: 'Kamu ceritakan kebutuhan dan tujuannya. Kami bertanya sampai jelas apa yang perlu dibuat.' },
        { title: 'Proposal', text: 'Ruang lingkup, jadwal, dan biaya ditulis jelas sebelum mulai.' },
        { title: 'Desain', text: 'Kamu melihat rancangan tampilan dan memberi masukan sebelum dikodekan.' },
        { title: 'Bangun', text: 'Dikerjakan bertahap. Hasilnya bisa kamu coba di tengah jalan.' },
        { title: 'Rilis', text: 'Online di domainmu, lalu kami dampingi dan memperbaiki kalau ada yang kurang.' },
      ],
    },
  },

  // ── Tentang ─────────────────────────────────────────────────
  about: {
    // null = placeholder. Atau: '/tim.webp' (file di /public).
    photo: null,
    photoAlt: 'Foto tim We Cloud',
    lede: 'We Cloud adalah studio kecil di Solo yang membuat website dan aplikasi untuk bisnis, komunitas, dan organisasi.',
    paragraphs: [
      'Kami suka mengerjakan hal yang dipakai orang setiap hari: situs studio foto, aplikasi catatan, atau alat rekap untuk komunitas. Tiga proyek di atas adalah contohnya.',
      'Setiap proyek dimulai dari cara kerjamu yang sekarang. Hasilnya dibuat sederhana supaya orang yang jarang memakai teknologi pun bisa langsung memakainya.',
    ],
    facts: [
      ['Berbasis di', 'Solo, Jawa Tengah'],
      ['Melayani', 'Solo dan seluruh Indonesia'],
      ['Bahasa', 'Indonesia, English'],
      ['Balasan', '1 sampai 2 hari kerja'],
      ['Status', 'Menerima proyek baru'],
    ],
    techTitle: 'Teknologi',
    tech: [
      { name: 'Tampilan', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
      { name: 'Data dan login', items: ['Supabase', 'SQL', 'IndexedDB'] },
      { name: 'Aplikasi', items: ['PWA', 'Capacitor (Android)'] },
      { name: 'Rilis', items: ['GitHub Actions', 'GitHub Pages', 'Domain dan SSL'] },
    ],
    principlesTitle: 'Cara kami bekerja',
    principles: [
      { title: 'Cepat dan ringan', text: 'Halaman terbuka cepat di HP dengan sinyal biasa.' },
      { title: 'Gampang dipakai', text: 'Tampilan jelas untuk orang yang jarang memakai aplikasi.' },
      { title: 'Gampang diubah', text: 'Teks, harga, dan foto diatur dari satu file, tanpa perlu mengutak-atik kode.' },
      { title: 'Terbuka', text: 'Kamu tahu apa yang dikerjakan dan berapa biayanya sebelum mulai.' },
    ],
  },

  // ── Kontak ──────────────────────────────────────────────────
  contact: {
    email: 'hello@wecloud.my.id',
    // Nomor WhatsApp format internasional tanpa + (contoh: 6281234567890).
    // Kosongkan untuk menyembunyikan tombolnya.
    whatsapp: '',
    whatsappText: 'Halo We Cloud, saya ingin bertanya tentang pembuatan website atau aplikasi.',
    blurb:
      'Punya ide website atau aplikasi? Ceritakan singkat kebutuhanmu. Kami balas dalam 1 sampai 2 hari kerja dan bantu menentukan langkah pertamanya.',
    // href: null = hanya teks (bukan tautan).
    socials: [
      { label: 'Lokasi', handle: 'Solo, Jawa Tengah', href: null },
      { label: 'GitHub', handle: '@indragiriB', href: 'https://github.com/indragiriB' },
    ],
  },
}

export default site
