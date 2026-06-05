let daftarMahasiswa = [];
let editIndex = null;

function tampilkanData() {
    const tbody = document.getElementById('tbodyMahasiswa');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let dataFilter = daftarMahasiswa;
    if (searchTerm) {
        dataFilter = daftarMahasiswa.filter(mhs => 
            mhs.nim.toLowerCase().includes(searchTerm) || 
            mhs.nama.toLowerCase().includes(searchTerm)
        );
    }
    
    if (dataFilter.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="5">Tidak ada data</td></tr>';
        document.getElementById('jumlahData').innerText = `Total: ${daftarMahasiswa.length} Mahasiswa`;
        return;
    }
    
    let html = '';
    for (let i = 0; i < dataFilter.length; i++) {
        const mhs = dataFilter[i];
        const originalIndex = daftarMahasiswa.findIndex(m => m.nim === mhs.nim);
        html += `
            <tr>
                <td>${mhs.nim}</td>
                <td>${mhs.nama}</td>
                <td>${mhs.jurusan}</td>
                <td>${mhs.fakultas}</td>
                <td>
                    <button class="btn-edit" onclick="editData(${originalIndex})">Edit</button>
                    <button class="btn-delete" onclick="hapusData(${originalIndex})">Delete</button>
                </td>
            </tr>
        `;
    }
    tbody.innerHTML = html;
    document.getElementById('jumlahData').innerText = `Total: ${daftarMahasiswa.length} Mahasiswa`;
}

function tambahData() {
    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const jurusan = document.getElementById('jurusan').value;
    const fakultas = document.getElementById('fakultas').value;
    
    if (!nim || !nama || !jurusan || !fakultas) {
        alert('Semua field harus diisi!');
        return;
    }
    
    const nimExists = daftarMahasiswa.some(mhs => mhs.nim === nim);
    if (nimExists) {
        alert('NIM sudah terdaftar! Gunakan NIM lain.');
        return;
    }
    
    const mahasiswaBaru = {
        nim: nim,
        nama: nama,
        jurusan: jurusan,
        fakultas: fakultas
    };
    
    daftarMahasiswa.push(mahasiswaBaru);
    resetForm();
    tampilkanData();
    alert('Data berhasil ditambahkan!');
}

function updateData() {
    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const jurusan = document.getElementById('jurusan').value;
    const fakultas = document.getElementById('fakultas').value;
    
    if (!nim || !nama || !jurusan || !fakultas) {
        alert('Semua field harus diisi!');
        return;
    }
    
    daftarMahasiswa[editIndex] = {
        nim: nim,
        nama: nama,
        jurusan: jurusan,
        fakultas: fakultas
    };
    
    resetForm();
    tampilkanData();
    alert('Data berhasil diupdate!');
}

function editData(index) {
    const mhs = daftarMahasiswa[index];
    
    document.getElementById('nim').value = mhs.nim;
    document.getElementById('nama').value = mhs.nama;
    document.getElementById('jurusan').value = mhs.jurusan;
    document.getElementById('fakultas').value = mhs.fakultas;
    
    document.getElementById('btnTambah').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';
    document.getElementById('btnBatal').style.display = 'block';
    
    editIndex = index;
}

function hapusData(index) {
    if (confirm('Yakin ingin menghapus data ini?')) {
        daftarMahasiswa.splice(index, 1);
        tampilkanData();
        alert('Data berhasil dihapus!');
    }
}

function resetForm() {
    document.getElementById('nim').value = '';
    document.getElementById('nama').value = '';
    document.getElementById('jurusan').value = '';
    document.getElementById('fakultas').value = '';
    
    document.getElementById('btnTambah').style.display = 'block';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnBatal').style.display = 'none';
    
    editIndex = null;
}

document.getElementById('btnTambah').addEventListener('click', tambahData);
document.getElementById('btnUpdate').addEventListener('click', updateData);
document.getElementById('btnBatal').addEventListener('click', resetForm);
document.getElementById('searchInput').addEventListener('input', tampilkanData);

let dataAwal = [
    { nim: '123', nama: 'John', jurusan: 'Sistem Informasi', fakultas: 'Teknik' },
    { nim: '456', nama: 'Sarah', jurusan: 'Informatika', fakultas: 'Ilmu Komputer' },
    { nim: '789', nama: 'Mike', jurusan: 'Teknik Komputer', fakultas: 'Teknik' }
];

daftarMahasiswa = dataAwal;
tampilkanData();