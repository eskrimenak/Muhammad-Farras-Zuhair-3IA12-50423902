Sistem Penyimpanan Data Obat 📊💊
Aplikasi web untuk mengelola data obat secara efisien dengan penyimpanan lokal menggunakan localStorage. Dibangun dengan HTML, CSS, dan JavaScript murni.

https://img.shields.io/badge/Status-Aktif-brightgreen https://img.shields.io/badge/License-MIT-blue

✨ Fitur Utama
CRUD Lengkap: Tambah, baca, ubah, dan hapus data obat

Penyimpanan Lokal: Data tersimpan di browser pengguna (localStorage)

Pencarian Real-time: Cari obat berdasarkan nama, kategori, atau deskripsi

Statistik Dashboard: Tampilkan jumlah obat, total stok, dan obat mendekati kadaluarsa

Validasi Form: Validasi input dengan tanggal minimum dan field required

Responsif: Tampilan optimal untuk desktop, tablet, dan mobile

Notifikasi Interaktif: Feedback visual untuk setiap aksi

🚀 Demo
Jalankan aplikasi langsung dengan membuka file index.html di browser modern.

📋 Struktur Proyek
text
obat-management/
│
├── index.html          # File HTML utama
├── style.css           # Stylesheet untuk tata letak
├── script.js           # Logika JavaScript
└── README.md           # Dokumentasi ini
🛠️ Teknologi yang Digunakan
HTML5: Struktur halaman web

CSS3: Styling dan layout responsif

JavaScript ES6+: Logika aplikasi dan manipulasi DOM

FontAwesome 6.4.0: Ikon untuk UI

localStorage: Penyimpanan data di browser

CSS Grid & Flexbox: Layout modern

📝 Data Obat yang Disimpan
Setiap obat memiliki atribut berikut:

Nama Obat (wajib)

Kategori (Analgesik, Antibiotik, Vitamin, dll)

Jumlah Stok (angka)

Harga (Rupiah)

Tanggal Kedaluwarsa (date picker)

Deskripsi/Penggunaan (opsional)

🔧 Cara Penggunaan
1. Menambah Obat Baru
Isi form di bagian "Masukkan/Ubah Data Obat"

Klik tombol Simpan Data

Obat akan muncul di tabel daftar

2. Mengedit Obat
Klik tombol Ubah pada baris obat yang ingin diedit

Form akan terisi dengan data yang ada

Ubah data sesuai kebutuhan

Klik Update Data untuk menyimpan perubahan

3. Menghapus Obat
Klik tombol Hapus pada baris obat yang ingin dihapus

Konfirmasi penghapusan di modal yang muncul

4. Mencari Obat
Gunakan kotak pencarian di atas tabel

Ketik nama, kategori, atau deskripsi obat

Hasil akan langsung tersaring

5. Statistik
Jumlah Obat: Total jenis obat yang tersimpan

Total Stok: Jumlah keseluruhan stok semua obat

Mendekati Kadaluarsa: Obat yang kadaluarsa dalam ≤30 hari

⚡ Fitur Keamanan & Validasi
Validasi Input: Semua field wajib diisi (kecuali deskripsi)

Tanggal Minimum: Tidak bisa memilih tanggal sebelum hari ini

Konfirmasi: Konfirmasi untuk aksi hapus

Stok Rendah: Peringatan visual untuk stok <10

Kadaluarsa Mendekati: Highlight untuk obat yang hampir kadaluarsa

🎨 Tampilan Visual
Warna Utama
Primary: #4CAF50 (Hijau - aksi utama)

Secondary: #2196F3 (Biru - edit)

Danger: #f44336 (Merah - hapus)

Warning: #ff9800 (Oranye - peringatan)

Status Visual
✅ Hijau: Aksi berhasil

⚠️ Kuning: Peringatan kadaluarsa

🔴 Merah: Stok sedikit (<10)

🔵 Biru: Data dalam mode edit

📱 Responsivitas
Aplikasi mendukung berbagai ukuran layar:

Desktop (>992px): Layout dua kolom

Tablet (768px-992px): Layout adaptif

Mobile (<768px): Satu kolom, form stacked

💾 Penyimpanan Data
Data disimpan secara lokal di browser pengguna menggunakan localStorage:

Key: dataObat

Format: JSON string

Persistence: Data tetap ada setelah browser ditutup

🐛 Troubleshooting
Masalah Umum:
Data tidak tersimpan: Pastikan browser mendukung localStorage

Form tidak valid: Cek semua field wajib sudah diisi

Tanggal invalid: Gunakan date picker yang disediakan

Solusi:
Clear browser cache jika ada masalah

Gunakan browser versi terbaru

Pastikan JavaScript diaktifkan

🔮 Rencana Pengembangan
Fitur yang direncanakan:

Ekspor data ke CSV/Excel

Backup & restore data

Notifikasi browser untuk kadaluwarsa

Multi-user dengan autentikasi

Dashboard grafik statistik