const monster = [

{
    nama:"Kepiting Batu",
    umur:"10 Tahun",
    warnaNama:"#ffffff",

    x:0,
    y:0,

    lebar:48,
    tinggi:48,

    arah:1,
    kecepatan:0.8,

    hp:25,
    hpMaks:25,
    hidup:true,

    damage:4,
    cooldownSerang:0,
    respawnTimer:0,

    xMin:100,
    xMax:600,

    ai:"kepiting"
},

{
    nama:"Roh Biru",
    umur:"1 Juta Tahun",
    warnaNama:"#00ffff",

    x:0,
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
    respawnTimer:0,

    xMin:1500,
    xMax:2200,

    ai:"roh"
}

];

const monsterKepiting =
monster[0];

const monsterRoh =
monster[1];

function acakXMonster(
    m
){
    m.x =
    Math.floor(
        Math.random() *
        (
            m.xMax -
            m.xMin + 1
        )
    ) +
    m.xMin;
}

acakXMonster(
    monsterKepiting
);

acakXMonster(
    monsterRoh
);

function gambarMonster(
    m
){

    if(
        !m.hidup
    ){
        return;
    }

    const x =
    m.x -
    kamera.x;

    const y =
    kanvas.height -
    tinggiRumput -
    m.tinggi;

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

    if(
        m.ai === "kepiting"
    ){
        // kepiting batu

        konteks.fillStyle =
        "#cc4444";

        konteks.fillRect(
            x,
            y + 10,
            48,
            28
        );

        /* CAPIT */

        konteks.fillStyle =
        "#aa3333";

        konteks.fillRect(
            x - 10,
            y + 18,
            12,
            10
        );

        konteks.fillRect(
            x + 46,
            y + 18,
            12,
            10
        );

        /* MATA */

        konteks.fillStyle =
        "#fff";

        konteks.fillRect(
            x + 12,
            y + 2,
            6,
            10
        );

        konteks.fillRect(
            x + 30,
            y + 2,
            6,
            10
        );

        konteks.fillStyle =
        "#000";

        konteks.fillRect(
            x + 14,
            y + 6,
            2,
            2
        );

        konteks.fillRect(
            x + 32,
            y + 6,
            2,
            2
        );

        /* KAKI */

        konteks.fillStyle =
        "#aa3333";

        konteks.fillRect(
            x + 4,
            y + 36,
            6,
            8
        );

        konteks.fillRect(
            x + 14,
            y + 36,
            6,
            8
        );

        konteks.fillRect(
            x + 28,
            y + 36,
            6,
            8
        );

        konteks.fillRect(
            x + 38,
            y + 36,
            6,
            8
        );

    }else{
        // roh biru

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
    }

    /* Bar Hp */

    konteks.fillStyle =
    "#222";

    konteks.fillRect(
        x,
        y - 30,
        48,
        5
    );

    konteks.fillStyle =
    "#ff4444";

    konteks.fillRect(
        x,
        y - 30,
        48 *
        (
            m.hp /
            m.hpMaks
        ),
        5
    );

    /* UMUR */

    konteks.fillStyle =
    m.warnaNama;

    konteks.font =
    "12px Arial";

    konteks.textAlign =
    "center";

    konteks.fillText(
        m.umur,
        x + 24,
        y - 42
    );

    /* NAMA */

    konteks.fillStyle =
    m.warnaNama;

    konteks.font =
    "bold 14px Arial";

    konteks.textAlign =
    "center";

    konteks.fillText(
        m.nama,
        x + 24,
        y - 12
    );
}

function gambarMonsterKepiting(){
    gambarMonster(
        monsterKepiting
    );
}

function gambarMonsterRoh(){
    gambarMonster(
        monsterRoh
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

    let target = null;
    let jarakTerkecil = 999999;

    for(
        const m of monster
    ){

        if(
            !m.hidup
        ){
            continue;
        }

        const jarak =
        Math.abs(
            pemain.x -
            m.x
        );

        if(
            jarak < 90 &&
            jarak < jarakTerkecil
        ){
            target = m;
            jarakTerkecil = jarak;
        }
    }

    if(
        target
    ){

        target.hp -= 10;

        buatDamage(
            target.x,
            kanvas.height - 180,
            "-10",
            "#ff3333"
        );

        if(
            pemain.arah === "kanan"
        ){
            target.x += 25;
        }else{
            target.x -= 25;
        }

        if(
            target.hp <= 0
        ){

            target.hp = 0;
            target.hidup = false;
            target.respawnTimer = 300;
        }
    }
}

function perbaruiMonster(){

    for(
        const m of monster
    ){

        if(
            m.hidup
        ){

            m.x +=
            m.kecepatan *
            m.arah;
        }

        if(
            !m.hidup
        ){

            m.respawnTimer--;

            if(
                m.respawnTimer <= 0
            ){

                m.hp =
                m.hpMaks;

                m.hidup =
                true;

                acakXMonster(
                    m
                );
            }
        }

        const jarakMonster =
        Math.abs(
            m.x -
            pemain.x
        );

        if(
            !pemain.mati &&
            m.hidup &&
            jarakMonster < 60
        ){

            if(
                m.cooldownSerang <= 0
            ){

                pemain.hp -=
                m.damage;

                if(
                    pemain.hp <= 0
                ){
                    pemain.hp = 0;
                    pemain.mati = true;
                }

                buatDamage(
                    pemain.x,
                    pemain.y,
                    "-" + m.damage,
                    "#ffff00"
                );

                m.cooldownSerang = 60;

                if(
                    m.x <
                    pemain.x
                ){
                    pemain.knockbackX = 12;
                }else{
                    pemain.knockbackX = -12;
                }
            }
        }

        if(
            m.cooldownSerang > 0
        ){
            m.cooldownSerang--;
        }
    }
}

function patroliMonster(){

    for(
        const m of monster
    ){

        if(
            m.hidup &&
            m.x > m.xMax
        ){
            m.arah = -1;
        }

        if(
            m.hidup &&
            m.x < m.xMin
        ){
            m.arah = 1;
        }
    }
        }
