const gambarAzurePurba =
new Image();

gambarAzurePurba.src =
"Image/AzurePurba.png";

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
    nama:"Azure Purba",
    umur:"1 Juta Tahun",
    warnaNama:"#00ffff",

    x:0,
    y:0,

    lebar:64,
    tinggi:64,

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

    ai:"azure",

    frame:0,
    frameTimer:0,

    status:"jalan",

    timerGenangan:0,

    delaySerang:0,
    serangSudahKena:false
}

];

const monsterKepiting =
monster[0];

const monsterAzurePurba =
monster[1];

const frameAzureJalan = [

[
    53,
    138,
    297,
    164
],

[
    396,
    138,
    299,
    164
],

[
    733,
    137,
    312,
    165
],

[
    1117,
    137,
    324,
    165
]

];

const frameAzureSerang = [

[
    46,
    397,
    304,
    163
],

[
    390,
    397,
    339,
    163
],

[
    733,
    385,
    352,
    175
],

[
    1118,
    397,
    335,
    163
]

];

const frameAzureMati = [

[
    45,
    721,
    312,
    151
],

[
    386,
    713,
    329,
    158
],

[
    741,
    773,
    351,
    97
],

[
    1152,
    816,
    314,
    54
]

];

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
    monsterAzurePurba
);

function gambarMonster(
    m
){

    if(
        !m.hidup &&
        !(
            m.ai === "azure" &&
            m.status === "mati"
        )
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

    if(
        m.ai === "azure"
    ){
        konteks.fillRect(
            x + 10,
            y + 58,
            44,
            6
        );
    }else{
        konteks.fillRect(
            x + 8,
            y + 45,
            30,
            5
        );
    }

    /* TUBUH */

    if(
        m.ai === "kepiting"
    ){
        /* kepiting batu */

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

    }else if(
        m.ai === "azure"
    ){
        /* Azure Purba */

        let frameY =
        0;

        let source =
        frameAzureJalan;

        if(
            m.status === "jalan"
        ){
            source = frameAzureJalan;
            frameY = 0;
        }else if(
            m.status === "serang"
        ){
            source = frameAzureSerang;
            frameY = 0;
        }else if(
            m.status === "mati"
        ){
            source = frameAzureMati;
            frameY = 0;
        }

        const rect =
        source[
            m.frame
        ];

        if(
            rect
        ){
            konteks.drawImage(
                gambarAzurePurba,
                rect[0],
                rect[1],
                rect[2],
                rect[3],
                x - 8,
                y + 1,
                64,
                64
            );
        }
    }

    /* Bar Hp */

    konteks.fillStyle =
    "#222";

    konteks.fillRect(
        x,
        y - 30,
        m.lebar,
        5
    );

    konteks.fillStyle =
    "#ff4444";

    konteks.fillRect(
        x,
        y - 30,
        m.lebar *
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
        x + m.lebar / 2,
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
        x + m.lebar / 2,
        y - 12
    );
}

function gambarMonsterKepiting(){
    gambarMonster(
        monsterKepiting
    );
}

function gambarMonsterAzurePurba(){
    gambarMonster(
        monsterAzurePurba
    );
}

function gambarMonsterRoh(){
    gambarMonsterAzurePurba();
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
            !m.hidup &&
            !(
                m.ai === "azure" &&
                m.status === "mati"
            )
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

            if(
                target.ai === "azure"
            ){

                target.status = "mati";
                target.frame = 0;
                target.frameTimer = 0;
                target.timerGenangan = 180;
                target.delaySerang = 0;
                target.serangSudahKena = false;

            }else{

                target.hidup = false;
                target.respawnTimer = 300;
            }
        }
    }
}

function perbaruiMonster(){

    for(
        const m of monster
    ){

        if(
            m.ai === "azure" &&
            m.status === "mati"
        ){

            m.frameTimer++;

            if(
                m.frame < 3 &&
                m.frameTimer >= 12
            ){
                m.frameTimer = 0;
                m.frame++;
            }

            if(
                m.hidup
            ){
                m.timerGenangan--;

                if(
                    m.timerGenangan <= 0
                ){
                    m.hidup = false;
                    m.respawnTimer = 300;
                    m.status = "respawn";
                }
            }else{
                m.respawnTimer--;

                if(
                    m.respawnTimer <= 0
                ){
                    m.hp = m.hpMaks;
                    m.hidup = true;
                    m.status = "jalan";
                    m.frame = 0;
                    m.frameTimer = 0;
                    m.timerGenangan = 0;
                    m.delaySerang = 0;
                    m.serangSudahKena = false;

                    acakXMonster(
                        m
                    );
                }
            }

            continue;
        }

        if(
            m.hidup
        ){
            m.x +=
            m.kecepatan *
            m.arah;
        }

        if(
            m.ai === "azure"
        ){

            m.frameTimer++;

            if(
                m.status === "jalan"
            ){

                if(
                    m.frameTimer >= 10
                ){
                    m.frameTimer = 0;
                    m.frame++;

                    if(
                        m.frame > 3
                    ){
                        m.frame = 0;
                    }
                }
            }

            if(
                m.status === "serang"
            ){

                m.delaySerang--;

                if(
                    m.delaySerang <= 0 &&
                    !m.serangSudahKena
                ){

                    if(
                        !pemain.mati &&
                        Math.abs(
                            m.x - pemain.x
                        ) < 70
                    ){

                        pemain.hp -= m.damage;

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

                        if(
                            m.x < pemain.x
                        ){
                            pemain.knockbackX = 12;
                        }else{
                            pemain.knockbackX = -12;
                        }
                    }

                    m.serangSudahKena = true;
                }

                if(
                    m.frameTimer >= 8
                ){

                    m.frameTimer = 0;
                    m.frame++;

                    if(
                        m.frame > 3
                    ){

                        m.frame = 0;
                        m.status = "jalan";
                        m.serangSudahKena = false;
                        m.delaySerang = 0;
                    }
                }
            }
        }

        if(
            !m.hidup
        ){

            m.respawnTimer--;

            if(
                m.respawnTimer <= 0
            ){

                m.hp = m.hpMaks;
                m.hidup = true;
                m.status = "jalan";
                m.frame = 0;
                m.frameTimer = 0;
                m.timerGenangan = 0;
                m.delaySerang = 0;
                m.serangSudahKena = false;

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
            m.status !== "mati" &&
            jarakMonster < 60
        ){

            if(
                m.cooldownSerang <= 0
            ){

                m.cooldownSerang = 90;

                if(
                    m.ai === "azure"
                ){
                    m.status = "serang";
                    m.frame = 0;
                    m.frameTimer = 0;
                    m.delaySerang = 24;
                    m.serangSudahKena = false;
                }else{

                    pemain.hp -= m.damage;

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
            m.ai === "azure" &&
            m.status === "mati"
        ){
            continue;
        }

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
