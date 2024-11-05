// Definisi Class Buku
class Buku {
    constructor(judul, penulis, tahun) {
        this.judul = judul;
        this.penulis = penulis;
        this.tahun = tahun;
    }
4
    tampilkanInfo() {
        return `${this.judul} oleh ${this.penulis} (${this.tahun})`;
    }
}

// Array untuk menyimpan daftar buku dan buku favorit
let daftarBuku = [];
let bukuFavorit = [];

// Mengambil elemen DOM
const formTambahBuku = document.getElementById('form-tambah-buku');
const divDaftarBuku = document.getElementById('daftar-buku');
const divBukuFavorit = document.getElementById('buku-favorit');
const btnSimpanNama = document.getElementById('btnSimpanNama');
const salamPengguna = document.getElementById('salamPengguna');

// Event Listener untuk Form Tambah Buku
formTambahBuku.addEventListener('submit', function (e) {
    e.preventDefault();
    tambahBuku();
});

// Fungsi untuk menambahkan buku ke daftar
function tambahBuku() {
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;

    // Validasi input
    if (judul === '' || penulis === '' || tahun === '') {
        alert('Semua kolom harus diisi!');
        return;
    }

    const bukuBaru = new Buku(judul, penulis, tahun);
    daftarBuku.push(bukuBaru);
    simpanDaftarBuku(); // Simpan daftar buku setelah menambahkan buku baru
    tampilkanDaftarBuku();
    formTambahBuku.reset();
}

// Fungsi untuk menyimpan daftar buku ke Local Storage
function simpanDaftarBuku() {
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
}

// Fungsi untuk menampilkan daftar buku
function tampilkanDaftarBuku() {
    divDaftarBuku.innerHTML = '';

    daftarBuku.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('bg-gray-100', 'rounded-md', 'p-4', 'mb-4', 'shadow', 'flex', 'justify-between', 'items-center');

        divBuku.innerHTML = `
            <p class="font-semibold">${buku.tampilkanInfo()}</p>
            <div class="flex gap-2">
                <button class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 w-32" onclick="tambahKeFavorit(${index})">
                    Tambah ke Favorit
                </button>
                <button class="bg-red-500 text-white font-semibold py-1 px-3 rounded-md shadow-md hover:bg-red-600 transition duration-200 w-32" onclick="hapusBuku(${index})">
                    Hapus
                </button>
            </div>
        `;
        divDaftarBuku.appendChild(divBuku);
    });
}

// Fungsi untuk menambahkan buku ke favorit
function tambahKeFavorit(index) {
    const buku = daftarBuku[index];

    // Cek apakah buku sudah ada di favorit
    const sudahAda = bukuFavorit.some(favBuku => {
        return favBuku.judul === buku.judul &&
            favBuku.penulis === buku.penulis &&
            favBuku.tahun === buku.tahun;
    });

    if (sudahAda) {
        alert('Buku ini sudah ada di daftar favorit!');
        return;
    }

    bukuFavorit.push(buku);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

// Fungsi untuk menghapus buku dari daftar utama
function hapusBuku(index) {
    daftarBuku.splice(index, 1);
    simpanDaftarBuku();
    tampilkanDaftarBuku();
}

// Fungsi untuk menyimpan buku favorit ke Local Storage
function simpanBukuFavorit() {
    localStorage.setItem('bukuFavorit', JSON.stringify(bukuFavorit));
}

// Fungsi untuk menampilkan buku favorit
function tampilkanBukuFavorit() {
    divBukuFavorit.innerHTML = '';

    bukuFavorit.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('bg-yellow-100', 'rounded-md', 'p-4', 'mb-4', 'shadow', 'flex', 'justify-between', 'items-center');

        divBuku.innerHTML = `
            <p class="font-semibold">${buku.tampilkanInfo()}</p>
            <button class="bg-red-500 text-white font-semibold py-1 px-3 rounded-md shadow-md hover:bg-red-600 transition duration-200 w-32" onclick="hapusDariFavorit(${index})">
                Hapus
            </button>
        `;
        divBukuFavorit.appendChild(divBuku);
    });
}

// Fungsi untuk menghapus buku dari favorit
function hapusDariFavorit(index) {
    bukuFavorit.splice(index, 1);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

// Event Listener untuk tombol simpan nama pengguna
btnSimpanNama.addEventListener('click', function () {
    const nama = document.getElementById('namaPengguna').value;
    if (nama === '') {
        alert('Masukkan nama Anda!');
        return;
    }
    sessionStorage.setItem('namaPengguna', nama);
    tampilkanNamaPengguna();
    document.getElementById('namaPengguna').value = '';
});

// Fungsi untuk menampilkan nama pengguna
function tampilkanNamaPengguna() {
    const nama = sessionStorage.getItem('namaPengguna');

    if (nama) {
        salamPengguna.textContent = `Selamat datang, ${nama}!`;
        salamPengguna.classList.add('text-center', 'font-semibold', 'text-lg', 'text-sky-500');
    } else {
        salamPengguna.textContent = '';
    }
}

// Memuat data saat halaman dimuat
window.onload = function () {
    // Memuat daftar buku dari Local Storage
    if (localStorage.getItem('daftarBuku')) {
        const storedBooks = JSON.parse(localStorage.getItem('daftarBuku'));
        // Rekonstruksi objek buku menjadi instance dari kelas Buku
        daftarBuku = storedBooks.map(book => {
            return new Buku(book.judul, book.penulis, book.tahun);
        });
        tampilkanDaftarBuku();
    }

    // Memuat buku favorit dari Local Storage
    if (localStorage.getItem('bukuFavorit')) {
        const storedFavorites = JSON.parse(localStorage.getItem('bukuFavorit'));
        // Rekonstruksi objek buku menjadi instance dari kelas Buku
        bukuFavorit = storedFavorites.map(book => {
            return new Buku(book.judul, book.penulis, book.tahun);
        });
        tampilkanBukuFavorit();
    }

    // Menampilkan nama pengguna dari Session Storage
    tampilkanNamaPengguna();
};