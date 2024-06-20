// Declarar la variable tipo array que guardará las puntuaciones
let puntuaciones = [0, 0];
let rondaActual = 1;
const numRondas = 5;

// Creamos un array que guardará los resultados de cada jugador en cada ronda
let lanzamientosJug1 = [];
let lanzamientosJug2 = [];

// Escuchar los eventos que el usuario pulse
document.querySelector("#btn1").addEventListener("click", lanzarDadosJugador1);
document.querySelector("#btn2").addEventListener("click", lanzarDadosJugador2);
// Cuando se llama a una función desde un evento no hay que ponerle los paréntesis del final


// ÉSTA ES OTRA FORMA de hacer la función dentro del evento
document.querySelector("#btnFin").addEventListener("click", () => {
    // Creamos una salida para indicar el ganador
    for (let i = 0; i < numRondas; i++) {
        let sumaJugador1 = lanzamientosJug1[i] ? lanzamientosJug1[i][0] + lanzamientosJug1[i][1] : 0;
        let sumaJugador2 = lanzamientosJug2[i] ? lanzamientosJug2[i][0] + lanzamientosJug2[i][1] : 0;
        /*
        AQUÍ HACEMOS LA CUENTA DE LAS PUNTUACIONES DE CADA TIRADA DE CADA UNO DE LOS
        JUGADORES (POSICIÓN 0 ES JUGADOR 1 Y POSICIÓN 1 ES JUGADOR 2) */

        if (sumaJugador1 > sumaJugador2) {
            puntuaciones[0]++;
        } else if (sumaJugador2 > sumaJugador1) {
            puntuaciones[1]++;
        }
    }

    let ganador = determinarGanador();

    // Creamos el código HTML para la salida
    let puntuacionesHTML = 
       `<h3>Puntuaciones acumuladas</h3>
        <p>Jugador 1 - ${puntuaciones[0]}</p>
        <p>Jugador 2 - ${puntuaciones[1]}</p>
        <h3>Ganador: ${ganador}</h3>
        `;

    // Le damos la salida a la página HTML
    document.querySelector("#puntuaciones").innerHTML = puntuacionesHTML;

    //Deshabilitamos los botones de tirada
    document.querySelector("#btn1").disabled = true;
    document.querySelector("#btn2").disabled = true;
    document.querySelector("#btnFin").disabled = true;
});


function determinarGanador() {

    if (puntuaciones[0] > puntuaciones[1]) {
        return "Jugador 1";
    } else if (puntuaciones[1] > puntuaciones[0]) {
        return "Jugador 2";
    } else {
        return "Empate";
    }
}


//Crear una función para mostrar dado
function crearImagenDado(valor) {

    let img = document.createElement("img");
    // img.src = `img/${valor}.png`;
    // img.alt = `Dado ${valor}`;
    img.setAttribute("src", `img/${valor}.png`);
    img.setAttribute("alt", `Dado ${valor}`);

    return img;
}


function lanzarDadosJugador1() {
    if (rondaActual > numRondas) return; //No hará nada porque ya habrá alcanzado el límite de rondas

    //Si no pasa por el if generamos el valor del dado
    //Voy a pner las dos formas de hacerlo:
    let dado1 = parseInt((Math.random() * 6) + 1); // parseInt te machaca los decimales y se queda sólo con la parte entera
    let dado2 = Math.floor((Math.random() * 6) + 1); // floor Redondea al entero inferior (Como puede sacar 6.8 no podemos nunca redondear hacia arriba)
    lanzamientosJug1.push([dado1, dado2]);

    actualizarRondaHTML(rondaActual, dado1, dado2, "jugador1");

    // Desahabilitamos el botón uno para que no repita tirada
    document.querySelector("#btn1").disabled = true;
    document.querySelector("#btn2").disabled = false;
}
function lanzarDadosJugador2() {
    if (rondaActual > numRondas) return; //No hará nada porque ya habrá alcanzado el límite de rondas

    //Si no pasa por el if generamos el valor del dado
    //Voy a pner las dos formas de hacerlo:
    let dado1 = parseInt((Math.random() * 6) + 1); // parseInt te machaca los decimales y se queda sólo con la parte entera
    let dado2 = Math.floor((Math.random() * 6) + 1); // floor Redondea al entero inferior (Como puede sacar 6.8 no podemos nunca redondear hacia arriba)
    lanzamientosJug2.push([dado1, dado2]);

    actualizarRondaHTML(rondaActual, dado1, dado2, "jugador2");
    rondaActual++;

    // Desahabilitamos el botón dos para que no repita tirada
    document.querySelector("#btn2").disabled = true;
    document.querySelector("#btn1").disabled = false;
}

function actualizarRondaHTML(ronda, dado1, dado2, jugador) {

    let rondaDiv = document.querySelector(`#ronda-${ronda}`);

    if (!rondaDiv) {
        rondaDiv = document.createElement("div");
        rondaDiv.classList.add("ronda");
        // rondaDiv.className = "ronda"; De ésta manera también podemos agregarle una clase
        rondaDiv.setAttribute("id", `ronda-${ronda}`);
        rondaDiv.innerHTML =
           `<h3>Ronda ${ronda}</h3>
            <div class = "dados" id="dados-ronda-${ronda}">
                <div id="jugador1-ronda-${ronda}"></div>
                <div id="jugador2-ronda-${ronda}"></div>
            </div>`;

        document.querySelector("#rondas").appendChild(rondaDiv);
    }

    // Cogemos del HTML lo que hemos creado en el bloque anterior (jugador1-ronda1 por ej.)
    let jugadorDiv = document.querySelector(`#${jugador}-ronda-${ronda}`);
    jugadorDiv.innerHTML = "";

    // Creamos los dados en el HTML con el valor que hemos recibido de los dados random
    jugadorDiv.appendChild(crearImagenDado(dado1));
    jugadorDiv.appendChild(crearImagenDado(dado2));

    let suma = dado1 + dado2;
    //Operador ternario
    jugadorDiv.innerHTML += `<p> Jugador ${jugador === "jugador1" ? 1 : 2} : ${suma}</p>`;

}


