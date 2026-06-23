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

function perbaruiMonster(){
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
}

function patroliMonster(){
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
