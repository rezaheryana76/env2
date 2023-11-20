// Fungsi untuk menghitung mundur
function startCountdown(targetDateTime, callback) {
    const targetDate = new Date(targetDateTime);

    const countdownInterval = setInterval(function () {
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;

        // Konversi selisih waktu ke jam, menit, dan detik
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        console.log(`${hours}:${minutes}:${seconds}`);

        // Panggil callback jika waktu habis
        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            callback();
        }
    }, 1000);
}

// Fungsi untuk melakukan eksekusi API
function executeApi() {
    // Buat objek FormData untuk parameter form encode
    const formData = new FormData();
    formData.append("key", "n8ul5Z3GdgWtqi5luER7ngVVhaz4tgRD4VbemhGKWD45kDSDuzQvJP85rMoAm202");
    formData.append("sign", "3d2dbaeafe231dd488a719a267e898d6");
    formData.append("type", "order");
    formData.append("service", "DANA50");
    formData.append("data_no", "085742632270");

    // Konfigurasi request
    const requestOptions = {
        method: "POST",
        body: formData,
    };

    // Ganti URL API dengan URL yang sesuai
    const apiUrl = "https://vip-reseller.co.id/api/prepaid";

    // Kirim request menggunakan Fetch API
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("Response from API:", data);
            // Lakukan sesuatu dengan data API yang diterima
        })
        .catch(error => console.error("Error:", error));
}

// Fungsi untuk mendapatkan waktu saat ini di zona waktu Asia/Jakarta
function getCurrentTimeInJakarta() {
    const jakartaTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: false,
    });

    return jakartaTime.format(new Date());
}

// Atur waktu target dalam format "YYYY-MM-DDTHH:mm:ss" (misalnya, 2023-12-31T23:59:59)
const targetDateTime = "2023-11-20T15:20:00";

// Mulai hitung mundur
startCountdown(targetDateTime, () => {
    // Waktu habis, eksekusi API
    console.log("Time's up! Executing API...");
    executeApi();
});

// Output waktu saat ini di zona waktu Asia/Jakarta
console.log("Current time in Jakarta:", getCurrentTimeInJakarta());
