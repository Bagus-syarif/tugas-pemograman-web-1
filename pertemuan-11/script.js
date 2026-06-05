function hitung() {
    let nama = document.getElementById("nama").value;
    let nilai = parseInt(document.getElementById("nilai").value);
    let grade = "";
    let status = "";
    let hasilDiv = document.getElementById("hasil");

    if (nama === "") {
        alert("⚠️ Nama harus diisi!");
        return;
    }

    if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        alert("⚠️ Nilai harus antara 0 - 100!");
        return;
    }

    if (nilai >= 90) {
        grade = "A (Sangat Baik)";
        status = "LULUS ✨";
    } else if (nilai >= 75) {
        grade = "B (Baik)";
        status = "LULUS ✅";
    } else if (nilai >= 60) {
        grade = "C (Cukup)";
        status = "LULUS 📖";
    } else {
        grade = "D (Perbaikan)";
        status = "TIDAK LULUS 🔄";
    }

    hasilDiv.style.display = "block";

    if (status.includes("LULUS")) {
        hasilDiv.className = "hasil-lulus";
    } else {
        hasilDiv.className = "hasil-gagal";
    }

    hasilDiv.innerHTML = "<h3>📋 Hasil Penilaian</h3>" +
                         "<p><strong>👤 Nama:</strong> " + nama + "</p>" +
                         "<p><strong>📊 Nilai:</strong> " + nilai + " / 100</p>" +
                         "<p><strong>🏆 Grade:</strong> " + grade + "</p>" +
                         "<p><strong>🎯 Status:</strong> " + status + "</p>";

    efekSelesai();
}

function efekSelesai() {
    let tombol = document.querySelector("button");
    tombol.style.transform = "scale(0.98)";
    setTimeout(function() {
        tombol.style.transform = "scale(1)";
    }, 150);
}