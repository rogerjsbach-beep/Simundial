//=================================
// BASE DE DADES DEL SIMUNDIAL
//=================================

const equipos = [

{nombre:"Venezuela (Maxi)", seleccion:"Venezuela", manager:"Maxi"},
{nombre:"Palestina (Gauss)", seleccion:"Palestina", manager:"Gauss"},
{nombre:"Perú (Cobalt)", seleccion:"Perú", manager:"Cobalt"},
{nombre:"Argelia (Kaxx)", seleccion:"Argelia", manager:"Kaxx"},

{nombre:"Yugoslavia (Samy)", seleccion:"Yugoslavia", manager:"Samy"},
{nombre:"Israel (Daigo)", seleccion:"Israel", manager:"Daigo"},
{nombre:"Portugal (Gorilink)", seleccion:"Portugal", manager:"Gorilink"},
{nombre:"Colombia (Caradecol)", seleccion:"Colombia", manager:"Caradecol"},

{nombre:"Chile (Yuno)", seleccion:"Chile", manager:"Yuno"},
{nombre:"Nigeria (Rocky)", seleccion:"Nigeria", manager:"Rocky"},
{nombre:"República Democrática del Congo (Paradox)", seleccion:"República Democrática del Congo", manager:"Paradox"},
{nombre:"El Salvador (Umbreon)", seleccion:"El Salvador", manager:"Umbreon"},

{nombre:"Alemania (Raity)", seleccion:"Alemania", manager:"Raity"},
{nombre:"Cabo Verde (Foxy)", seleccion:"Cabo Verde", manager:"Foxy"},
{nombre:"Grecia (Marcos)", seleccion:"Grecia", manager:"Marcos"},
{nombre:"España (Arceus)", seleccion:"España", manager:"Arceus"},

{nombre:"Uruguay (Eterni)", seleccion:"Uruguay", manager:"Eterni"},
{nombre:"Canadá (Anass)", seleccion:"Canadá", manager:"Anass"},
{nombre:"México (Elecby)", seleccion:"México", manager:"Elecby"},
{nombre:"Japón (Bluff)", seleccion:"Japón", manager:"Bluff"},

{nombre:"Madagascar (Deadma)", seleccion:"Madagascar", manager:"Deadma"},
{nombre:"Gibraltar (Lolx)", seleccion:"Gibraltar", manager:"Lolx"},
{nombre:"Egipto (Oma)", seleccion:"Egipto", manager:"Oma"},
{nombre:"Argentina (Mentita)", seleccion:"Argentina", manager:"Mentita"},

{nombre:"Corea del Norte (Manu)", seleccion:"Corea del Norte", manager:"Manu"},
{nombre:"Suiza (GL)", seleccion:"Suiza", manager:"GL"},
{nombre:"Petoria (Dueye)", seleccion:"Petoria", manager:"Dueye"},
{nombre:"Marruecos (Esqo)", seleccion:"Marruecos", manager:"Esqo"},

{nombre:"Brasil (Era)", seleccion:"Brasil", manager:"Era"},
{nombre:"Islandia (Diego)", seleccion:"Islandia", manager:"Diego"},
{nombre:"Inglaterra (Zephyr)", seleccion:"Inglaterra", manager:"Zephyr"},
{nombre:"Francia (Silcoon)", seleccion:"Francia", manager:"Silcoon"}

];


//=================================
// ESTADÍSTICAS
//=================================

function reiniciarEquipos(){

    equipos.forEach(e=>{

        e.grupo = "";

        e.puntosGrupo = 0;

        e.golesFavor = 0;
        e.golesContra = 0;

        e.victorias = 0;
        e.empates = 0;
        e.derrotas = 0;

        e.puntosClasificacion = 0;

    });

}


//=================================
// VARIABLES GLOBALES
//=================================

let grupos = {};

let calendario = {};

let clasificadosOctavos = [];
let clasificadosCuartos = [];
let clasificadosSemifinales = [];
let finalistas = [];
let perdedoresSemis = [];


//=================================
// FUNCIONES AUXILIARES
//=================================

function aleatorio(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function mezclar(array){

    return array.sort(()=>Math.random()-0.5);

}


//=================================
// CREAR TORNEO
//=================================

function crearTorneo(){

    reiniciarEquipos();

    document.getElementById("resultados").innerHTML = "";
    document.getElementById("campeon").innerHTML = "";

    sortearGrupos();

    generarCalendario();

    mostrarGrupos();

    desbloquearSolo("j1");

}


//=================================
// SORTEO DE GRUPOS
//=================================

function sortearGrupos(){

    grupos = {};

    const letras = ["A","B","C","D","E","F","G","H"];

    letras.forEach(g=>grupos[g]=[]);

    let copia = [...equipos];

    copia = mezclar(copia);

    for(let i=0;i<copia.length;i++){

        const grupo = letras[Math.floor(i/4)];

        copia[i].grupo = grupo;

        grupos[grupo].push(copia[i]);

    }

}


//=================================
// CALENDARIO DE LOS GRUPOS
//=================================

function generarCalendario(){

    calendario = {};

    for(let grupo in grupos){

        const g = grupos[grupo];

        calendario[grupo] = {

            1:[
                [g[0],g[1]],
                [g[2],g[3]]
            ],

            2:[
                [g[0],g[2]],
                [g[1],g[3]]
            ],

            3:[
                [g[0],g[3]],
                [g[1],g[2]]
            ]

        };

    }

}


//=================================
// MOSTRAR LOS GRUPOS
//=================================

function mostrarGrupos(){

    let html = "";

    for(let grupo in grupos){

        ordenarGrupo(grupos[grupo]);

        html += `
        <div class="grupo">

        <h3>GRUPO ${grupo}</h3>

        <table>

        <tr>
        <th>Equipo</th>
        <th>PTS</th>
        <th>GF</th>
        <th>GC</th>
        <th>DG</th>
        </tr>
        `;

        grupos[grupo].forEach(e=>{

            html += `
            <tr>

            <td>${e.nombre}</td>
            <td>${e.puntosGrupo}</td>
            <td>${e.golesFavor}</td>
            <td>${e.golesContra}</td>
            <td>${e.golesFavor-e.golesContra}</td>

            </tr>
            `;

        });

        html += "</table></div>";

    }

    document.getElementById("grupos").innerHTML = html;

}


//=================================
// ORDENAR CLASIFICACIÓN
//=================================

function ordenarGrupo(grupo){

    grupo.sort((a,b)=>{

        if(b.puntosGrupo !== a.puntosGrupo){

            return b.puntosGrupo - a.puntosGrupo;

        }

        const dgA = a.golesFavor-a.golesContra;
        const dgB = b.golesFavor-b.golesContra;

        if(dgB !== dgA){

            return dgB - dgA;

        }

        if(b.golesFavor !== a.golesFavor){

            return b.golesFavor - a.golesFavor;

        }

        return Math.random()-0.5;

    });

}


//=================================
// BOTONES
//=================================

function desbloquearSolo(id){

    const botones = [

        "j1",
        "j2",
        "j3",
        "octavos",
        "cuartos",
        "semis",
        "tercero",
        "final"

    ];

    botones.forEach(b=>{

        document.getElementById(b).disabled = true;

    });

    document.getElementById(id).disabled = false;

}


//=================================
// NUEVO SIMUNDIAL
//=================================

function nuevoSimundial(){

    location.reload();

}
//=================================
// SIMULADOR DE GOLES
//=================================

function numeroGolesPartido() {

    const r = Math.random();

    if (r < 0.12) return 0;
    if (r < 0.37) return 1;
    if (r < 0.67) return 2;
    if (r < 0.87) return 3;
    if (r < 0.96) return 4;
    if (r < 0.99) return 5;

    return 6;

}

function generarMinutoGol() {

    const r = Math.random();

    // Primera parte
    if (r < 0.40) {
        return aleatorio(1,45);
    }

    // Segunda parte
    if (r < 0.92) {
        return aleatorio(46,90);
    }

    // Tiempo añadido primer tiempo
    if (r < 0.96) {
        return "45+" + aleatorio(1,4);
    }

    // Tiempo añadido segundo tiempo
    return "90+" + aleatorio(1,6);

}

function ordenarMinutos(a,b){

    const convertir = (valor)=>{

        if(typeof valor === "number"){
            return valor;
        }

        const partes = valor.split("+");

        return parseInt(partes[0]) + (parseInt(partes[1])/10);

    };

    return convertir(a)-convertir(b);

}


//=================================
// SIMULAR PARTIDO
//=================================

function simularPartido(local, visitante, eliminatoria=false){

    let golesLocal = 0;
    let golesVisitante = 0;

    let goles = [];

    const totalGoles = numeroGolesPartido();

    for(let i=0;i<totalGoles;i++){

        const marcaLocal = Math.random() < 0.5;

        const minuto = generarMinutoGol();

        if(marcaLocal){

            golesLocal++;

            goles.push({
                minuto:minuto,
                equipo:local.seleccion
            });

        }else{

            golesVisitante++;

            goles.push({
                minuto:minuto,
                equipo:visitante.seleccion
            });

        }

    }

    goles.sort((a,b)=>ordenarMinutos(a.minuto,b.minuto));

    let ganador = null;
    let penalesTexto = "";

    // ELIMINATORIAS

    if(eliminatoria && golesLocal === golesVisitante){

        // 25% de posibilidades de gol en la prórroga

        if(Math.random() < 0.25){

            const marcaLocal = Math.random() < 0.5;

            const minutoExtra = aleatorio(91,120);

            if(marcaLocal){

                golesLocal++;

                goles.push({
                    minuto:minutoExtra,
                    equipo:local.seleccion
                });

            }else{

                golesVisitante++;

                goles.push({
                    minuto:minutoExtra,
                    equipo:visitante.seleccion
                });

            }

        }

        // Penaltis

        if(golesLocal === golesVisitante){

            let penLocal = 0;
            let penVisitante = 0;

            for(let i=0;i<5;i++){

                if(Math.random() < 0.75) penLocal++;
                if(Math.random() < 0.75) penVisitante++;

            }

            while(penLocal === penVisitante){

                if(Math.random() < 0.75) penLocal++;
                if(Math.random() < 0.75) penVisitante++;

            }

            ganador = penLocal > penVisitante ? local : visitante;

            penalesTexto = `
            <p>
            Penaltis: ${penLocal} - ${penVisitante}
            </p>
            `;

        }

    }

    if(eliminatoria && !ganador){

        ganador = golesLocal > golesVisitante ? local : visitante;

    }

    return {

        local,
        visitante,
        golesLocal,
        golesVisitante,
        goles,
        ganador,
        penalesTexto

    };

}


//=================================
// ACTUALIZAR ESTADÍSTICAS
//=================================

function actualizarGrupo(partido){

    const local = partido.local;
    const visitante = partido.visitante;

    local.golesFavor += partido.golesLocal;
    local.golesContra += partido.golesVisitante;

    visitante.golesFavor += partido.golesVisitante;
    visitante.golesContra += partido.golesLocal;


    if(partido.golesLocal > partido.golesVisitante){

        local.puntosGrupo += 3;
        local.victorias++;
        visitante.derrotas++;

    }

    else if(partido.golesLocal < partido.golesVisitante){

        visitante.puntosGrupo += 3;
        visitante.victorias++;
        local.derrotas++;

    }

    else{

        local.puntosGrupo++;
        visitante.puntosGrupo++;

        local.empates++;
        visitante.empates++;

    }

}


//=================================
// MOSTRAR PARTIDOS
//=================================
function mostrarPartido(partido){

    let html = `

    <div class="partido">

        <div class="partidoCabecera">

            <div class="equipo">

                <b>${partido.local.seleccion}</b><br>
                <span class="manager">
                Manager: ${partido.local.manager}
                </span>

            </div>

            <div class="resultado">

                ${partido.golesLocal} - ${partido.golesVisitante}

            </div>

            <div class="equipo" style="text-align:right;">

                <b>${partido.visitante.seleccion}</b><br>
                <span class="manager">
                Manager: ${partido.visitante.manager}
                </span>

            </div>

        </div>

        <div class="goles">

    `;


 let golesLocalHTML = "";
let golesVisitanteHTML = "";

if(partido.goles.length === 0){

    golesLocalHTML = " ";
    golesVisitanteHTML = " ";

}else{

    partido.goles.forEach(gol => {

        if(gol.equipo === partido.local.seleccion){

            golesLocalHTML += `
            ${gol.minuto}' - ${gol.equipo}<br>
            `;

        }else{

            golesVisitanteHTML += `
            ${gol.minuto}' - ${gol.equipo}<br>
            `;

        }

    });

}

html += `
<div class="listaGoles">

    <div class="golesLocal">
        ${golesLocalHTML}
    </div>

    <div class="golesVisitante">
        ${golesVisitanteHTML}
    </div>

</div>
`;

    html += partido.penalesTexto;

    html += `
        </div>
    </div>
    `;


    document.getElementById("resultados").innerHTML += html;

}

//=================================
// JORNADAS
//=================================

function simularJornada(numero){

    document.getElementById("resultados").innerHTML +=
    `<h2>JORNADA ${numero}</h2>`;

    for(let grupo in grupos){

        calendario[grupo][numero].forEach(partido=>{

            const resultado = simularPartido(
                partido[0],
                partido[1]
            );

            actualizarGrupo(resultado);

            mostrarPartido(resultado);

        });

    }

    mostrarGrupos();
    actualizarClasificacionSimundial();


    if(numero === 1){

        desbloquearSolo("j2");

    }

    if(numero === 2){

        desbloquearSolo("j3");

    }

    if(numero === 3){

        clasificadosOctavos = [];

        for(let grupo in grupos){

            ordenarGrupo(grupos[grupo]);

            clasificadosOctavos.push(grupos[grupo][0]);
            clasificadosOctavos.push(grupos[grupo][1]);

            grupos[grupo][0].puntosClasificacion += 5;
            grupos[grupo][1].puntosClasificacion += 5;

        }

        actualizarClasificacionSimundial();

        desbloquearSolo("octavos");

    }

}
//=================================
// CLASIFICACIÓN DEL SIMUNDIAL
//=================================

function actualizarClasificacionSimundial() {

    const clasificacion = [...equipos];

    clasificacion.sort((a, b) => {

        const puntosA = a.puntosClasificacion + (a.golesFavor - a.golesContra);
        const puntosB = b.puntosClasificacion + (b.golesFavor - b.golesContra);

        return puntosB - puntosA;

    });

    let html = `
    <table>

    <tr>
    <th>POS</th>
    <th>PARTICIPANTE</th>
    <th>PTS</th>
    </tr>
    `;

    clasificacion.forEach((equipo, index) => {

        const puntos =
            equipo.puntosClasificacion +
            (equipo.golesFavor - equipo.golesContra);

        html += `
        <tr>
        <td>${index + 1}</td>
        <td>${equipo.nombre}</td>
        <td>${puntos}</td>
        </tr>
        `;

    });

    html += "</table>";

    document.getElementById("clasificacion").innerHTML = html;

}


//=================================
// OCTAVOS
//=================================

function simularOctavos() {

    document.getElementById("resultados").innerHTML +=
    "<h2>OCTAVOS DE FINAL</h2>";

    clasificadosCuartos = [];

    for (let i = 0; i < clasificadosOctavos.length; i += 2) {

        const partido = simularPartido(
            clasificadosOctavos[i],
            clasificadosOctavos[i + 1],
            true
        );

        partido.ganador.puntosClasificacion += 5;

        clasificadosCuartos.push(partido.ganador);

        mostrarPartido(partido);

    }

    actualizarClasificacionSimundial();
    desbloquearSolo("cuartos");

}


//=================================
// CUARTOS
//=================================

function simularCuartos() {

    document.getElementById("resultados").innerHTML +=
    "<h2>CUARTOS DE FINAL</h2>";

    clasificadosSemifinales = [];

    for (let i = 0; i < clasificadosCuartos.length; i += 2) {

        const partido = simularPartido(
            clasificadosCuartos[i],
            clasificadosCuartos[i + 1],
            true
        );

        partido.ganador.puntosClasificacion += 5;

        clasificadosSemifinales.push(partido.ganador);

        mostrarPartido(partido);

    }

    actualizarClasificacionSimundial();
    desbloquearSolo("semis");

}


//=================================
// SEMIFINALES
//=================================

function simularSemifinales() {

    document.getElementById("resultados").innerHTML +=
    "<h2>SEMIFINALES</h2>";

    finalistas = [];
    perdedoresSemis = [];

    for (let i = 0; i < clasificadosSemifinales.length; i += 2) {

        const partido = simularPartido(
            clasificadosSemifinales[i],
            clasificadosSemifinales[i + 1],
            true
        );

        partido.ganador.puntosClasificacion += 5;

        finalistas.push(partido.ganador);

        if (partido.ganador === partido.local) {

            perdedoresSemis.push(partido.visitante);

        } else {

            perdedoresSemis.push(partido.local);

        }

        mostrarPartido(partido);

    }

    actualizarClasificacionSimundial();
    desbloquearSolo("tercero");

}


//=================================
// TERCER PUESTO
//=================================

function simularTercerPuesto() {

    document.getElementById("resultados").innerHTML +=
    "<h2>TERCER PUESTO</h2>";

    const partido = simularPartido(
        perdedoresSemis[0],
        perdedoresSemis[1],
        true
    );

    mostrarPartido(partido);

    desbloquearSolo("final");

}


//=================================
// FINAL
//=================================

function simularFinal() {

    document.getElementById("resultados").innerHTML +=
    "<h2>FINAL DEL SIMUNDIAL</h2>";

    const partido = simularPartido(
        finalistas[0],
        finalistas[1],
        true
    );

    partido.ganador.puntosClasificacion += 5;

    mostrarPartido(partido);

    actualizarClasificacionSimundial();

    mostrarCampeon(partido.ganador);

    document.getElementById("final").disabled = true;

}


//=================================
// CAMPEÓN DEL MUNDO
//=================================

function mostrarCampeon(campeon) {

    document.getElementById("campeon").innerHTML = `

    <div class="campeon">

    <h2>¡¡${campeon.seleccion.toUpperCase()} ES CAMPEÓN DEL SIMUNDIAL!!</h2>

    <p>
    Manager: ${campeon.manager}
    </p>

    </div>

    `;

}