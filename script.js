const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzwq5HZNNGmaRxlB_OprAgPUECBzlyECXAdQ08vlFIST2gjqcFzQbFJaBcxMNTWiqM7Zg/exec";


let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,
        qrbox: 250
    }
);



function onScanSuccess(decodedText, decodedResult) {


    document.getElementById("status").innerHTML =
        "⏳ Mengecek tiket...";


    html5QrcodeScanner.pause();



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


        document.getElementById("nextScan").style.display = "block";


    })



    .catch(error => {


        console.error(error);


        document.getElementById("status").innerHTML =

        "❌ Gagal koneksi server";


        document.getElementById("nextScan").style.display = "block";


    });



}



html5QrcodeScanner.render(onScanSuccess);





document.getElementById("nextScan").onclick = function(){


    document.getElementById("status").innerHTML =

    "Silakan scan tiket";


    document.getElementById("nextScan").style.display = "none";


    html5QrcodeScanner.resume();


};