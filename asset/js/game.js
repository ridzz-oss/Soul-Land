const kanvas =
document.getElementById("duniaGame");

const konteks =
kanvas.getContext("2d");

function ubahUkuran(){

    kanvas.width =
    window.innerWidth;

    kanvas.height =
    window.innerHeight;
}

ubahUkuran();

window.addEventListener(
    "resize",
    ubahUkuran
);

/* =====================
   DUNIA
===================== */
const lebarDunia = 4000;
const tinggiRumput = 100;
const kamera = {
    x:0
};
const monsterRoh = {
    x:900,
    y:0,
    lebar:48,
    tinggi:48,
    arah:1,
    kecepatan:1.2,
    hp:50,
    hpMaks:50,
    hidup:true,
    damage:8,
    cooldownSerang:0,
    respawnTimer:0
};

/* =====================
   PEMAIN
===================== */

const pemain = {
    x:300,
    y:0,
    lebar:48,
    tinggi:48,
    kecepatan:7,
    kecepatanY:0,
    gravitasi:0.8,
    kekuatanLompat:-16,
    menyentuhTanah:false,
    arah:"kanan",
    langkah:0,
    hp:100,
    hpMaks:100,
    sedangMemukul:false,
    animasiPukul:0,
    mati:false,
    knockbackX:0,
    invincible:0
};

/* =====================
   INPUT
===================== */

let arahKiri = false;
let arahKanan = false;
const popupDamage = [];

/* =====================
   AWAN
===================== */

const daftarAwan = [];

for(let i=0;i<12;i++){

    daftarAwan.push({

        x:i*350,

        y:50 + Math.random()*180,

        kecepatan:
        0.2 + Math.random()*0.4,

        ukuran:
        50 + Math.random()*40

    });

}

/* =====================
   GAMBAR LANGIT
===================== */

function gambarLangit(){

    const gradasi =
    konteks.createLinearGradient(
        0,
        0,
        0,
        kanvas.height
    );

    gradasi.addColorStop(
        0,
        "#5ecbff"
    );

    gradasi.addColorStop(
        1,
        "#dff7ff"
    );

    konteks.fillStyle =
    gradasi;

    konteks.fillRect(
        0,
        0,
        kanvas.width,
        kanvas.height
    );

    /* MATAHARI */

    konteks.beginPath();

    konteks.arc(
        kanvas.width - 140,
        90,
        45,
        0,
        Math.PI * 2
    );

    konteks.fillStyle =
    "#ffd93d";

    konteks.fill();

    /* CAHAYA */

    konteks.beginPath();

    konteks.arc(
        kanvas.width - 140,
        90,
        70,
        0,
        Math.PI * 2
    );

    konteks.fillStyle =
    "rgba(255,255,0,0.15)";

    konteks.fill();

}

/* =====================
   GAMBAR AWAN
===================== */

function gambarAwan(){

    for(const awan of daftarAwan){

        awan.x += awan.kecepatan;

        if(
            awan.x >
            lebarDunia + 500
        ){
            awan.x = -500;
        }

        const x =
        awan.x -
        kamera.x * 0.25;

        const y =
        awan.y;

        konteks.fillStyle =
        "rgba(255,255,255,.95)";

        konteks.beginPath();

        konteks.arc(
            x,
            y,
            awan.ukuran,
            0,
            Math.PI*2
        );

        konteks.arc(
            x+45,
            y-20,
            awan.ukuran*0.9,
            0,
            Math.PI*2
        );

        konteks.arc(
            x+95,
            y-5,
            awan.ukuran*0.8,
            0,
            Math.PI*2
        );

        konteks.arc(
            x+145,
            y,
            awan.ukuran*0.65,
            0,
            Math.PI*2
        );

        konteks.fill();
    }

}

/* =====================
   GAMBAR RUMPUT
===================== */

function gambarRumput(){

    const ukuranBlok = 48;

    const yTanah =
    kanvas.height - tinggiRumput;

    for(
        let x = 0;
        x < kanvas.width + ukuranBlok;
        x += ukuranBlok
    ){

        /* RUMPUT ATAS */

        konteks.fillStyle =
        "#3ad85f";

        konteks.fillRect(
            x,
            yTanah,
            ukuranBlok,
            ukuranBlok
        );

        /* GARIS */

        konteks.fillStyle =
        "#45ef70";

        konteks.fillRect(
            x,
            yTanah,
            ukuranBlok,
            4
        );

        /* TANAH */

        konteks.fillStyle =
        "#6e4b24";

        konteks.fillRect(
            x,
            yTanah + 48,
            ukuranBlok,
            60
        );

        /* DETAIL */

        konteks.fillStyle =
        "#5a3d1d";

        konteks.fillRect(
            x + 6,
            yTanah + 58,
            6,
            6
        );

        konteks.fillRect(
            x + 25,
            yTanah + 75,
            5,
            5
        );

    }

    /* RUMPUT KECIL */

    for(
        let x=0;
        x<kanvas.width;
        x+=22
    ){

        konteks.fillStyle =
        "#22c55e";

        konteks.beginPath();

        konteks.moveTo(
            x,
            yTanah
        );

        konteks.lineTo(
            x+4,
            yTanah-14
        );

        konteks.lineTo(
            x+8,
            yTanah
        );

        konteks.fill();

    }

}


/* =====================
   GAMBAR POHON
===================== */
function gambarPohonPixel(){

    const posisiPohon = [
        500,
        1400,
        2400,
        3200
    ];

    for(
        const posisiX
        of posisiPohon
    ){

        const x =
        posisiX -
        kamera.x;

        const y =
        kanvas.height -
        tinggiRumput -
        160;

        /* BATANG */

        konteks.fillStyle =
        "#7a4b1f";

        konteks.fillRect(
            x + 35,
            y + 70,
            20,
            90
        );

        /* DAUN */

        konteks.fillStyle =
        "#29d45b";

        konteks.fillRect(
            x,
            y,
            90,
            90
        );

        konteks.fillStyle =
        "#47ef77";

        konteks.fillRect(
            x + 15,
            y + 15,
            20,
            20
        );

        konteks.fillRect(
            x + 55,
            y + 30,
            18,
            18
        );
    }
}

/* =====================
   MONSTER ROH
===================== */
