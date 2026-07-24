const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxBZLpmD9sp_nr9gtzFS5FwWGEw6e3PUIP_UdKynKQn_2cmsgaLYlRMLYP2F49w8_bH/exec";

const html5QrCode = new Html5Qrcode("reader");

function startScanner() {

    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 20,
            qrbox: { width: 250, height: 250 }
        },

        (decodedText) => {

            // Stop kamera
            html5QrCode.stop();

            document.getElementById("reader").style.display = "none";

            document.getElementById("status").innerHTML =
                "<h2>⏳ Mengecek tiket...</h2>";

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
                        <h1 style="color:green;">✅ BERHASIL</h1>
                        <h2>${data.nama}</h2>
                        <h2>Meja ${data.meja}</h2>
                    `;

                }

                else if(data.status == "used"){

                    document.getElementById("status").innerHTML = `
                        <h1 style="color:orange;">⚠️ SUDAH CHECK-IN</h1>
                        <h2>${data.nama}</h2>
                    `;

                }

                else{

                    document.getElementById("status").innerHTML = `
                        <h1 style="color:red;">❌ TIKET TIDAK DITEMUKAN</h1>
                    `;

                }

                document.getElementById("nextScan").style.display = "block";

            })

            .catch(error => {

                console.error(error);

                document.getElementById("status").innerHTML =
                    "<h2>❌ Gagal koneksi server</h2>";

                document.getElementById("nextScan").style.display = "block";

            });

        }

    );

}

startScanner();

document.getElementById("nextScan").onclick = function(){

    document.getElementById("reader").style.display = "block";

    document.getElementById("status").innerHTML =
        "Silakan scan tiket";

    document.getElementById("nextScan").style.display = "none";

    startScanner();

};
