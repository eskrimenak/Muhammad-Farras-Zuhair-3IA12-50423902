let dataObat = JSON.parse(localStorage.getItem('dataObat')) || [];
let idSedangEdit = null;


const formObat = document.getElementById('medicineForm');
const tombolSimpan = document.getElementById('submitBtn');
const tombolBatal = document.getElementById('cancelBtn');
const daftarObat = document.getElementById('medicineList');
const barisKosong = document.getElementById('emptyRow');
const kotakCari = document.getElementById('searchInput');
const tombolHapusSemua = document.getElementById('clearAllBtn');


const totalObatEl = document.getElementById('totalObat');
const totalStokEl = document.getElementById('totalStok');
const obatHampirExpEl = document.getElementById('obatHampirExp');


const modalKonfirmasi = document.getElementById('confirmModal');
const pesanModal = document.getElementById('modalMessage');
const tombolYa = document.getElementById('confirmYes');
const tombolTidak = document.getElementById('confirmNo');


document.getElementById('kadaluarsa').valueAsDate = new Date();


document.addEventListener('DOMContentLoaded', () => {
    tampilkanDaftarObat();
    perbaruiStatistik();
    

    const hariIni = new Date().toISOString().split('T')[0];
    document.getElementById('kadaluarsa').setAttribute('min', hariIni);
});


formObat.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const obatBaru = {
        id: idSedangEdit || Date.now(),
        nama: document.getElementById('nama').value.trim(),
        kategori: document.getElementById('kategori').value,
        stok: parseInt(document.getElementById('stok').value),
        harga: parseInt(document.getElementById('harga').value),
        kadaluarsa: document.getElementById('kadaluarsa').value,
        deskripsi: document.getElementById('deskripsi').value.trim()
    };
    
    if (idSedangEdit) {

        const index = dataObat.findIndex(obat => obat.id === idSedangEdit);
        dataObat[index] = obatBaru;
    } else {

        dataObat.push(obatBaru);
    }
    
    simpanKeLocalStorage();
    tampilkanDaftarObat();
    perbaruiStatistik();
    resetForm();
    

    tampilkanPesan(
        idSedangEdit ? 'Data obat berhasil diupdate!' : 'Obat baru berhasil ditambahkan!',
        'berhasil'
    );
});


tombolBatal.addEventListener('click', resetForm);


kotakCari.addEventListener('input', tampilkanDaftarObat);


tombolHapusSemua.addEventListener('click', () => {
    if (dataObat.length === 0) return;
    
    tampilkanModalKonfirmasi(
        'Yakin ingin menghapus semua data obat?',
        () => {
            dataObat = [];
            simpanKeLocalStorage();
            tampilkanDaftarObat();
            perbaruiStatistik();
            tampilkanPesan('Semua data telah dihapus!', 'berhasil');
        }
    );
});


tombolYa.addEventListener('click', () => {
    if (typeof window.aksiTertunda === 'function') {
        window.aksiTertunda();
    }
    modalKonfirmasi.style.display = 'none';
});

tombolTidak.addEventListener('click', () => {
    modalKonfirmasi.style.display = 'none';
});


function simpanKeLocalStorage() {
    localStorage.setItem('dataObat', JSON.stringify(dataObat));
}


function tampilkanDaftarObat() {
    const kataKunci = kotakCari.value.toLowerCase();
    

    const dataTersaring = dataObat.filter(obat => 
        obat.nama.toLowerCase().includes(kataKunci) ||
        obat.kategori.toLowerCase().includes(kataKunci) ||
        obat.deskripsi.toLowerCase().includes(kataKunci)
    );
    
    if (dataTersaring.length === 0) {
        barisKosong.style.display = '';
        daftarObat.innerHTML = '';
        daftarObat.appendChild(barisKosong);
        return;
    }
    
    barisKosong.style.display = 'none';
    daftarObat.innerHTML = '';
    
    dataTersaring.forEach(obat => {
        const baris = document.createElement('tr');
        

        const tglKadaluarsa = new Date(obat.kadaluarsa);
        const hariIni = new Date();
        const selisihWaktu = tglKadaluarsa - hariIni;
        const selisihHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
        
        if (selisihHari <= 30 && selisihHari > 0) {
            baris.classList.add('hampir-kadaluarsa');
        }
        
        baris.innerHTML = `
            <td>
                <strong>${obat.nama}</strong>
                ${obat.deskripsi ? `<br><small>${obat.deskripsi}</small>` : ''}
            </td>
            <td>${obat.kategori}</td>
            <td>
                <span class="badge-stok ${obat.stok < 10 ? 'stok-sedikit' : ''}">
                    ${obat.stok}
                </span>
            </td>
            <td>Rp ${obat.harga.toLocaleString('id-ID')}</td>
            <td class="${selisihHari <= 30 ? 'tanggal-hampir-exp' : ''}">
                ${formatTanggal(obat.kadaluarsa)}
                ${selisihHari <= 30 && selisihHari > 0 ? '<br><small>(Segera kadaluarsa)</small>' : ''}
            </td>
            <td class="kolom-aksi">
                <button class="btn btn-edit" onclick="editObat(${obat.id})">
                    <i class="fas fa-edit"></i> Ubah
                </button>
                <button class="btn btn-delete" onclick="hapusObat(${obat.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        
        daftarObat.appendChild(baris);
    });
}


function perbaruiStatistik() {
    totalObatEl.textContent = dataObat.length;
    
    const jumlahStok = dataObat.reduce((total, obat) => total + obat.stok, 0);
    totalStokEl.textContent = jumlahStok;
    
    const hariIni = new Date();
    const obatHampirExp = dataObat.filter(obat => {
        const tglKadaluarsa = new Date(obat.kadaluarsa);
        const selisihWaktu = tglKadaluarsa - hariIni;
        const selisihHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
        return selisihHari <= 30 && selisihHari > 0;
    }).length;
    
    obatHampirExpEl.textContent = obatHampirExp;
}


function editObat(id) {
    const obat = dataObat.find(o => o.id === id);
    if (!obat) return;
    
    idSedangEdit = id;
    

    document.getElementById('nama').value = obat.nama;
    document.getElementById('kategori').value = obat.kategori;
    document.getElementById('stok').value = obat.stok;
    document.getElementById('harga').value = obat.harga;
    document.getElementById('kadaluarsa').value = obat.kadaluarsa;
    document.getElementById('deskripsi').value = obat.deskripsi;
    

    tombolSimpan.innerHTML = '<i class="fas fa-sync-alt"></i> Update Data';
    tombolBatal.style.display = 'inline-flex';
    

    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}


function hapusObat(id) {
    tampilkanModalKonfirmasi(
        'Yakin ingin menghapus data obat ini?',
        () => {
            dataObat = dataObat.filter(o => o.id !== id);
            simpanKeLocalStorage();
            tampilkanDaftarObat();
            perbaruiStatistik();
            tampilkanPesan('Data obat berhasil dihapus!', 'berhasil');
        }
    );
}


function resetForm() {
    formObat.reset();
    idSedangEdit = null;
    tombolSimpan.innerHTML = '<i class="fas fa-save"></i> Simpan Data';
    tombolBatal.style.display = 'none';
    document.getElementById('kadaluarsa').valueAsDate = new Date();
}


function tampilkanModalKonfirmasi(pesan, fungsi) {
    pesanModal.textContent = pesan;
    window.aksiTertunda = fungsi;
    modalKonfirmasi.style.display = 'flex';
}


function tampilkanPesan(pesan, jenis) {

    const notifLama = document.querySelector('.notifikasi');
    if (notifLama) notifLama.remove();
    

    const notif = document.createElement('div');
    notif.className = `notifikasi ${jenis}`;
    notif.innerHTML = `
        <i class="fas fa-${jenis === 'berhasil' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${pesan}</span>
    `;
    

    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${jenis === 'berhasil' ? '#4CAF50' : '#ff9800'};
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideMasuk 0.3s ease;
    `;
    
    document.body.appendChild(notif);
    

    setTimeout(() => {
        notif.style.animation = 'slideKeluar 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}


const gaya = document.createElement('style');
gaya.textContent = `
    @keyframes slideMasuk {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideKeluar {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .stok-sedikit {
        color: #f44336;
        font-weight: bold;
    }
    
    .badge-stok {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 4px;
        background: #e8f5e9;
    }
`;
document.head.appendChild(gaya);


function formatTanggal(tanggalString) {
    const tanggal = new Date(tanggalString);
    return tanggal.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}
