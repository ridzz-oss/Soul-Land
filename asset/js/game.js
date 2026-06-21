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
function gambarMonsterRoh(){

    if(
        !monsterRoh.hidup
    ){
        return;
    }

    const x =
    monsterRoh.x -
    kamera.x;

    const y =
    kanvas.height -
    tinggiRumput -
    monsterRoh.tinggi;

    /* BAYANGAN */

    konteks.fillStyle =
    "rgba(0,0,0,.2)";

    konteks.fillRect(
        x + 8,
        y + 45,
        30,
        5
    );

    /* TUBUH */

    konteks.fillStyle =
    "#66ccff";

    konteks.fillRect(
        x,
        y,
        48,
        48
    );

    /* MATA */

    konteks.fillStyle =
    "#fff";

    konteks.fillRect(
        x + 8,
        y + 10,
        10,
        10
    );

    konteks.fillRect(
        x + 30,
        y + 10,
        10,
        10
    );

    konteks.fillStyle =
    "#000";

    konteks.fillRect(
        x + 12,
        y + 14,
        3,
        3
    );

    konteks.fillRect(
        x + 34,
        y + 14,
        3,
        3
    );

    /* Bar Hp */
    konteks.fillStyle="#222";
    konteks.fillRect(
        x,
        y-30,
        48,
        5
    );
    konteks.fillStyle="#ff4444";
    konteks.fillRect(
        x,
        y-30,
        48*
        (monsterRoh.hp/monsterRoh.hpMaks),
        5
    );

    /* NAMA */

    konteks.fillStyle =
    "#00ffff";

    konteks.font =
    "bold 14px Arial";

    konteks.textAlign =
    "center";

    konteks.fillText(
        "Roh Biru",
        x + 24,
        y - 12
    );

}

/* =====================
   KARAKTER SOUL LAND
===================== */

function gambarPemain(){

    const layarX =
    pemain.x - kamera.x;

    const layarY =
    pemain.y;

    const ayun =
    Math.sin(
        pemain.langkah
    ) * 3;

    /* NAMA */

    konteks.textAlign =
    "center";

    konteks.font =
    "bold 16px Arial";

    konteks.lineWidth = 4;

    konteks.strokeStyle =
    "#000";

    konteks.strokeText(
        "you",
        layarX + 25,
        layarY - 32
    );

    konteks.fillStyle =
    "#00ffff";

    konteks.fillText(
        "you",
        layarX + 25,
        layarY - 32
    );

    konteks.fillStyle =
    "#ffffff";

    konteks.fillText(
        "▼",
        layarX + 25,
        layarY - 12
    );

     /* Bar Hp */
     konteks.fillStyle="#333";
     konteks.fillRect(
         layarX,
         layarY-55,
         50,
         6
     );
     konteks.fillStyle="#00ff66";
     konteks.fillRect(
         layarX,
         layarY-55,
         50*(pemain.hp/pemain.hpMaks),
         6   
     );
     
    /* BAYANGAN */

    konteks.fillStyle =
    "rgba(0,0,0,.2)";

    konteks.fillRect(
        layarX + 10,
        layarY + 75,
        30,
        5
    );

    /* KEPALA */

    konteks.fillStyle =
    "#d9c2a0";

    konteks.fillRect(
        layarX + 8,
        layarY,
        34,
        30
    );

    /* RAMBUT */

    konteks.fillStyle =
    "#7a4b1f";

    konteks.fillRect(
        layarX + 8,
        layarY,
        34,
        10
    );

    /* MATA GROWTOPIA */

    konteks.fillStyle =
    "#fff";

    konteks.fillRect(
        layarX + 13,
        layarY + 12,
        8,
        8
    );

    konteks.fillRect(
        layarX + 29,
        layarY + 12,
        8,
        8
    );

    konteks.fillStyle =
    "#000";

    if(
        pemain.arah ===
        "kanan"
    ){

        konteks.fillRect(
            layarX + 18,
            layarY + 14,
            2,
            2
        );

        konteks.fillRect(
            layarX + 34,
            layarY + 14,
            2,
            2
        );

    }else{

        konteks.fillRect(
            layarX + 14,
            layarY + 14,
            2,
            2
        );

        konteks.fillRect(
            layarX + 30,
            layarY + 14,
            2,
            2
        );

    }

    /* MULUT */

    konteks.fillRect(
        layarX + 22,
        layarY + 23,
        6,
        2
    );

    /* BADAN */

    konteks.fillStyle =
    "#32cd32";

    konteks.fillRect(
        layarX + 10,
        layarY + 30,
        30,
        24
    );

/* animasi */
let progresPukul = 0;

if(
    pemain.animasiPukul > 0
){
    progresPukul =
    Math.sin(
        (12 - pemain.animasiPukul)
        / 12 * Math.PI
    );
}

let tanganKananX =
layarX + 41;

let tanganKananY =
layarY + 32;

if(
    pemain.arah === "kanan"
){

    tanganKananX +=
    progresPukul * 14;

    tanganKananY -=
    progresPukul * 10;

}else{

    tanganKananX -=
    progresPukul * 14;

    tanganKananY -=
    progresPukul * 10;

}

/* TANGAN */

konteks.fillStyle = "#d9c2a0";

/* tangan kiri */
konteks.fillRect(
    layarX + 3,
    layarY + 32,
    6,
    18
);

/* tangan kanan */
konteks.fillRect(
    tanganKananX,
    tanganKananY,
    6,
    18
);

    /* KAKI */

    konteks.fillStyle =
    "#444";

    konteks.fillRect(
        layarX + 14,
        layarY + 54,
        7,
        20 + ayun
    );

    konteks.fillRect(
        layarX + 29,
        layarY + 54,
        7,
        20 - ayun
    );

}

/* Animasi Pukul */
function pukulMonster(){

    if(
        pemain.mati ||
        pemain.animasiPukul > 0
    ){
        return;
    }

    pemain.sedangMemukul = true;

    pemain.animasiPukul = 12;

    const jarak =
    Math.abs(
        pemain.x -
        monsterRoh.x
    );

    if(
        jarak < 90 &&
        monsterRoh.hidup
    ){

        monsterRoh.hp -= 10;
        buatDamage(
            monsterRoh.x,
            kanvas.height-180,
            "-10",
            "#ff3333"
         );

if(
    pemain.arah==="kanan"
){
    monsterRoh.x += 25;
}else{
    monsterRoh.x -= 25;
}

        if(
            monsterRoh.hp <= 0
        ){

            monsterRoh.hp = 0;
            monsterRoh.hidup = false;
            monsterRoh.respawnTimer = 300;

         }

    }

}

/* =====================
   XIAO GANG & RUMAH
===================== */
const rumahAkademi = {
    x:1700,
    lebar:480,
    tinggi:315
};
const xiaoGang = {
    x:1638,
    lebar:64,
    tinggi:120,
    dialogAktif:false,
    dialogTeks:"",
    dialogTimer:0
};
let dekatXiaoGang = false;
const spriteAcademy =
new Image();
spriteAcademy.src =
"Image/Academy.png";
const spriteXiaoGang = new Image();
spriteXiaoGang.src =
"Image/XiaoGang.png";

function gambarRumahAkademi(){
    const offsetBawah = 70;
    
    const x =
    rumahAkademi.x - kamera.x;

    const tanahY =
    kanvas.height - tinggiRumput;

    const y =
    tanahY - rumahAkademi.tinggi + offsetBawah;

    if(
        spriteAcademy.complete
    ){
        konteks.drawImage(
            spriteAcademy,
            x,
            y,
            rumahAkademi.lebar,
            rumahAkademi.tinggi
        );
    }

    }

function gambarXiaoGang(){

    const x =
    xiaoGang.x - kamera.x;

    const tanahY =
    kanvas.height - tinggiRumput;

    const lebarSprite = 64;
    const tinggiSprite = 120;

    /* offset ini buat "nempel" ke tanah */
    const offsetBawah = 15;

    const y =
    tanahY - tinggiSprite + offsetBawah;

    /* Nama */
    konteks.fillStyle = "#ffd700";
    konteks.font = "bold 16px Arial";
    konteks.textAlign = "center";

    konteks.fillText(
        "Xiao Gang",
        x + lebarSprite / 2,
        y - 18
    );

    if(dekatXiaoGang){

        konteks.fillStyle = "#ffffff";
        konteks.font = "bold 14px Arial";

        konteks.fillText(
            "Tap 💬",
            x + lebarSprite / 2,
            y - 38
        );

    }

    /* Bayangan */
    konteks.fillStyle = "rgba(0,0,0,.22)";
    konteks.beginPath();
    konteks.ellipse(
        x + lebarSprite / 2,
        tanahY + 4,
        22,
        7,
        0,
        0,
        Math.PI * 2
    );
    konteks.fill();

    /* Sprite PNG */
    if(
        spriteXiaoGang.complete
    ){
        konteks.drawImage(
            spriteXiaoGang,
            x,
            y,
            lebarSprite,
            tinggiSprite
        );
    }else{
        konteks.fillStyle = "#333";
        konteks.fillRect(
            x,
            y,
            lebarSprite,
            tinggiSprite
        );
    }

    }
        
function gambarDialogXiaoGang(){

    if(xiaoGang.dialogTimer <= 0){
        xiaoGang.dialogAktif = false;
        return;
    }

    xiaoGang.dialogTimer--;

    const x =
    xiaoGang.x - kamera.x;

    const y =
    kanvas.height - tinggiRumput - xiaoGang.tinggi - 70;

    const lebarKotak = 330;
    const tinggiKotak = 76;

    konteks.fillStyle =
    "rgba(255,255,255,0.96)";

    konteks.strokeStyle =
    "#111";

    konteks.lineWidth = 3;

    konteks.beginPath();
    konteks.roundRect(
        x - 150,
        y,
        lebarKotak,
        tinggiKotak,
        14
    );
    konteks.fill();
    konteks.stroke();

    /* ekor bubble */

    konteks.beginPath();
    konteks.moveTo(
        x + 22,
        y + tinggiKotak
    );
    konteks.lineTo(
        x + 38,
        y + tinggiKotak
    );
    konteks.lineTo(
        x + 30,
        y + tinggiKotak + 14
    );
    konteks.closePath();
    konteks.fill();
    konteks.stroke();

    konteks.fillStyle =
    "#111";

    konteks.font =
    "bold 15px Arial";

    konteks.textAlign =
    "left";

    const baris = xiaoGang.dialogTeks.split("\n");

    for(let i = 0; i < baris.length; i++){
        konteks.fillText(
            baris[i],
            x - 132,
            y + 28 + (i * 20)
        );
    }

}

function tampilkanDialogXiaoGang(teks){
    xiaoGang.dialogAktif = true;
    xiaoGang.dialogTeks = teks;
    xiaoGang.dialogTimer = 240;
}

function bicaraXiaoGang(){

    tampilkanDialogXiaoGang(
        "Anak muda, kau datang tepat waktu.\nMari kita lihat Jiwa Bela Diri milikmu nanti."
    );

    }
    
/* =====================
   GAMBAR DAMAGE
===================== */
function buatDamage(x,y,angka,warna){

    popupDamage.push({
        x:x,
        y:y,
        angka:angka,
        warna:warna,
        umur:40
    });

}

function gambarDamage(){

    for(let i=popupDamage.length-1;i>=0;i--){

        const d = popupDamage[i];

        d.y -= 1;
        d.umur--;

        konteks.fillStyle = d.warna;

        konteks.font =
        "bold 22px Arial";

        konteks.textAlign =
        "center";

        konteks.fillText(
            d.angka,
            d.x-kamera.x,
            d.y
        );

        if(d.umur<=0){
            popupDamage.splice(i,1);
        }

    }

}

/* =====================
   GAMBAR MATI
===================== */
function gambarGameOver(){

const menu =
document.getElementById(
    "menuMati"
);

if(
    pemain.mati
){
    menu.style.display =
    "flex";
}else{
    menu.style.display =
    "none";
}

}

/* =====================
   UPDATE
===================== */

function perbarui(){

if(
    pemain.mati
){
    return;
}

pemain.x +=
pemain.knockbackX;

pemain.knockbackX *= 0.85;

if(
    Math.abs(
        pemain.knockbackX
    ) < 0.2
){
    pemain.knockbackX = 0;
}

    if(
        arahKiri ||
        arahKanan
    ){
        pemain.langkah += 0.25;
    }

    if(arahKiri){

        pemain.arah = "kiri";

        pemain.x -=
        pemain.kecepatan;
    }

    if(arahKanan){

        pemain.arah = "kanan";

        pemain.x +=
        pemain.kecepatan;
    }

    pemain.kecepatanY +=
    pemain.gravitasi;

    pemain.y +=
    pemain.kecepatanY;

    const tanah =
    kanvas.height -
    tinggiRumput -
    pemain.tinggi;

    if(
        pemain.y >= tanah
    ){

        pemain.y = tanah;

        pemain.kecepatanY = 0;

        pemain.menyentuhTanah =
        true;

    }else{

        pemain.menyentuhTanah =
        false;

    }

    if(pemain.x < 0){
        pemain.x = 0;
    }

    if(
        pemain.x >
        lebarDunia -
        pemain.lebar
    ){
        pemain.x =
        lebarDunia -
        pemain.lebar;
    }

    kamera.x =
    pemain.x -
    (kanvas.width/2);

    if(kamera.x < 0){
        kamera.x = 0;
    }

    if(
        kamera.x >
        lebarDunia -
        kanvas.width
    ){
        kamera.x =
        lebarDunia -
        kanvas.width;
    }

if(
    pemain.animasiPukul > 0
){

    pemain.animasiPukul--;

    pemain.sedangMemukul = true;

}else{

    pemain.sedangMemukul = false;

}

if(
    monsterRoh.hidup
){

    monsterRoh.x +=
    monsterRoh.kecepatan *
    monsterRoh.arah;

}

if(
    !monsterRoh.hidup
){

    monsterRoh.respawnTimer--;

    if(
        monsterRoh.respawnTimer <= 0
    ){

        monsterRoh.hp =
        monsterRoh.hpMaks;

        monsterRoh.hidup =
        true;

        monsterRoh.x =
        900;

    }

}

const jarakMonster =
Math.abs(
    monsterRoh.x -
    pemain.x
);

if(
    !pemain.mati &&
    monsterRoh.hidup &&
    jarakMonster < 60
){

    if(
        monsterRoh.cooldownSerang<=0
    ){

        pemain.hp -=
        monsterRoh.damage;

if(
    pemain.hp <= 0
){
    pemain.hp = 0;
    pemain.mati = true;
}

        buatDamage(
            pemain.x,
            pemain.y,
            "-8",
            "#ffff00"
        );

        monsterRoh.cooldownSerang = 60;

        if(
            monsterRoh.x <
            pemain.x
        ){
            pemain.knockbackX = 12;
        }else{
            pemain.knockbackX = -12;
        }

    }

}

if(
    monsterRoh.cooldownSerang>0
){
    monsterRoh.cooldownSerang--;
}

const jarakXiaoGang =
Math.abs(
    pemain.x -
    xiaoGang.x
);

dekatXiaoGang =
jarakXiaoGang < 100;

if(dekatXiaoGang){
    tombolPukul.innerHTML = "💬";
}else{
    tombolPukul.innerHTML = "⚔";
}

}

/* =====================
   RENDER
===================== */

function render(){
    gambarLangit();
    gambarAwan();
    gambarPohonPixel();
    gambarRumput();
    gambarRumahAkademi();
    gambarXiaoGang();
    gambarMonsterRoh();
    gambarPemain();
    gambarDamage();
    gambarDialogXiaoGang();
    gambarGameOver();

    /* KABUT DEPAN */

    const gradasi =
    konteks.createLinearGradient(
        0,
        0,
        0,
        250
    );

    gradasi.addColorStop(
        0,
        "rgba(255,255,255,0)"
    );

    gradasi.addColorStop(
        1,
        "rgba(255,255,255,.12)"
    );

    konteks.fillStyle =
    gradasi;

    konteks.fillRect(
        0,
        0,
        kanvas.width,
        250
    );

if(
    monsterRoh.hidup &&
    monsterRoh.x > 1200
){
    monsterRoh.arah = -1;
}

if(
    monsterRoh.hidup &&
    monsterRoh.x < 800
){
    monsterRoh.arah = 1;
}
}

/* =====================
   TOMBOL
===================== */

const tombolKiri =
document.getElementById(
    "tombolKiri"
);

const tombolKanan =
document.getElementById(
    "tombolKanan"
);

const tombolLompat =
document.getElementById(
    "tombolLompat"
);

const tombolPukul =
document.getElementById(
    "tombolPukul"
);

const tombolRespawn =
document.getElementById(
    "tombolRespawn"
);

tombolRespawn.addEventListener(
    "click",
    respawnPemain
);

/* =====================
   FUNGSI LOMPAT
===================== */

function lompat(){

    if(
        pemain.mati
    ){
        return;
    }

    if(
        pemain.menyentuhTanah
    ){

        pemain.kecepatanY =
        pemain.kekuatanLompat;

    }

}

/* =====================
   KONTROL SENTUH
===================== */

tombolKiri.addEventListener(
    "touchstart",
    () => arahKiri = true
);

tombolKiri.addEventListener(
    "touchend",
    () => arahKiri = false
);

tombolKanan.addEventListener(
    "touchstart",
    () => arahKanan = true
);

tombolKanan.addEventListener(
    "touchend",
    () => arahKanan = false
);

tombolLompat.addEventListener(
    "touchstart",
    lompat
);

/* =====================
   KONTROL MOUSE
===================== */

tombolKiri.addEventListener(
    "mousedown",
    () => arahKiri = true
);

tombolKanan.addEventListener(
    "mousedown",
    () => arahKanan = true
);

tombolLompat.addEventListener(
    "mousedown",
    lompat
);

document.addEventListener(
    "mouseup",
    () => {

        arahKiri = false;
        arahKanan = false;

    }
);

/* =====================
   KEYBOARD
===================== */

document.addEventListener(
    "keydown",
    (event)=>{

        if(
            event.key ===
            "ArrowLeft"
        ){
            arahKiri = true;
        }

        if(
            event.key ===
            "ArrowRight"
        ){
            arahKanan = true;
        }

        if(
            event.key ===
            "ArrowUp" ||
            event.key === " "
        ){
            lompat();
        }

    }
);

document.addEventListener(
    "keyup",
    (event)=>{

        if(
            event.key ===
            "ArrowLeft"
        ){
            arahKiri = false;
        }

        if(
            event.key ===
            "ArrowRight"
        ){
            arahKanan = false;
        }

    }
);

/* =====================
   OVERLAY ROTASI
===================== */

const overlayRotasi =
document.getElementById(
    "overlayRotasi"
);

function cekOrientasi(){

    if(
        window.innerHeight >
        window.innerWidth
    ){

        overlayRotasi.style.display =
        "flex";

    }else{

        overlayRotasi.style.display =
        "none";

    }

}

cekOrientasi();

window.addEventListener(
    "resize",
    cekOrientasi
);

/* =====================
   ANTI COPY
===================== */

function aksiUtama(){

    if(dekatXiaoGang){

        bicaraXiaoGang();

    }else{

        pukulMonster();

    }

}

tombolPukul.addEventListener(
    "touchstart",
    aksiUtama
);

tombolPukul.addEventListener(
    "mousedown",
    aksiUtama
);

document.addEventListener(
    "contextmenu",
    function(event){

        event.preventDefault();

    }
);

document.addEventListener(
    "copy",
    function(event){

        event.preventDefault();

    }
);

document.addEventListener(
    "cut",
    function(event){

        event.preventDefault();

    }
);

document.addEventListener(
    "selectstart",
    function(event){

        event.preventDefault();

    }
);

document.addEventListener(
    "dragstart",
    function(event){

        event.preventDefault();

    }
);

/* =====================
   RESPAWN
===================== */
function respawnPemain(){

    pemain.hp =
    pemain.hpMaks;

    pemain.mati =
    false;

    pemain.x =
    300;

    pemain.y =
    0;

    pemain.knockbackX = 0;

}

/* =====================
   GAME LOOP
===================== */

function loopGame(){

    perbarui();

    render();

    requestAnimationFrame(
        loopGame
    );

}

loopGame();
