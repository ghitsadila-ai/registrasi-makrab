const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzwq5HZNNGmaRxlB_OprAgPUECBzlyECXAdQ08vlFIST2gjqcFzQbFJaBcxMNTWiqM7Zg/exec";

function onScanSuccess(decodedText, decodedResult) {

    document.getElementById("status").innerHTML =
        "⏳ Mengecek tiket...";

    html5QrcodeScanner.clear();

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({
            ticket: decodedText
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.status == "success"){

            document.getElementById("status").innerHTML = `
                <h2>✅ Berhasil</h2>
                <p>${data.nama}</p>
                <p>Meja ${data.meja}</p>
            `;

        }

        else if(data.status == "used"){

            document.getElementById("status").innerHTML = `
                <h2>⚠️ Sudah Check-in</h2>
                <p>${data.nama}</p>
            `;

        }

        else{

            document.getElementById("status").innerHTML = `
                <h2>❌ Tiket tidak ditemukan</h2>
            `;

        }

    });

}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,
        qrbox: 250
    }
);

html5QrcodeScanner.render(onScanSuccess);