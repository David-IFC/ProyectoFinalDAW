
const tiempoLimite = 20;
document.querySelector(".numeroTiempo-TiempoTexto").innerHTML = tiempoLimite;
/**es el tiempo que tiene el usuario para realizar la accion */
let tiempoTextoUsuario = tiempoLimite;
/**se usa para detener setInterval */
let pararTiempo;
let aciertos = 0;
let errores = 0;
let puntuacionFinal = 0;
/** el numero de espacios en blanco que contendra la matriz */
let espaciosEnBlanco = 10;
/**determina si se pone o no un valor en blanco en la matriz del usuario--1 numero 0 blanco */
let numeroOblanco = 0;
/** esta sera la matriz solución a partir de la cual se generara la matriz que 
 * vera el usuario
 */
const solucionBase = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1]
];
/** es la matriz aleatoria que se genererara en base a la matrizBase y que servira para comprobar la solucion */
let matrizSolucion = [];
/** es la matriz que vera el usuario */
let matrizUsuario = [];

/** mezcla los elementos de un vector */
function mezclarArray(arr) {

    return arr.sort(() => Math.random() - 0.5);
}
/**generamos la matriz aleatoria que se usara para verificar el resultado */
function generarSolucion() {

    //intercambiamos las filas
    let filas = mezclarArray([0, 1]);
    let filas2 = mezclarArray([2, 3]);
    let ordenFilas = filas.concat(filas2);
    //intercambiamos columnas
    let columnas = mezclarArray([0, 1]);
    let columnas2 = mezclarArray([2, 3]);
    let ordenColumnas = columnas.concat(columnas2);

    //construimos la matriz con los cambiamos realizados anteriormente
    for (let filas = 0; filas < solucionBase[0].length; filas++) {

        matrizSolucion[filas] = [];
        for (let columnas = 0; columnas < solucionBase[0].length; columnas++) {

            matrizSolucion[filas][columnas] = solucionBase[ordenFilas[filas]][ordenColumnas[columnas]];
        }
    }

}

/** 
 * Cuenta cuántas soluciones tiene un Sudoku 4x4.
 * La matriz usa "" para celdas vacías.
 */
function contarSoluciones(tablero) {

    let soluciones = 0;

    // Función que verifica si se puede poner 'num' en tablero[fila][col]
    function esValido(tablero, fila, col, num) {
        // Revisar fila y columna
        for (let i = 0; i < 4; i++) {
            if (tablero[fila][i] == num) return false;
            if (tablero[i][col] == num) return false;
        }
        // Revisar bloque 2x2
        let startFila = Math.floor(fila / 2) * 2;
        let startCol = Math.floor(col / 2) * 2;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (tablero[startFila + i][startCol + j] == num) return false;
            }
        }
        return true;
    }

    // funcion de backtracking para contar todas las soluciones
    function backtrack(tablero, fila = 0, col = 0) {
        if (fila === 4) {
            soluciones++;
            return;
        }

        let nextFila = col === 3 ? fila + 1 : fila;
        let nextCol = col === 3 ? 0 : col + 1;

        if (tablero[fila][col] !== "") {
            backtrack(tablero, nextFila, nextCol);
        } else {
            for (let num = 1; num <= 4; num++) {
                if (esValido(tablero, fila, col, num)) {
                    tablero[fila][col] = num;
                    backtrack(tablero, nextFila, nextCol);
                    tablero[fila][col] = "";
                }
            }
        }
    }

    backtrack(tablero);
    return soluciones;
}

/**despues de pasarle el numero de espacios en blancos que queremos que tenga la matriz 
 * cosntruye matrizUsuario en base a matrizSolucion pero teniendo en cuenta el numero de espacios
 * en blanco,tambien activa el temporizador
 */
function generarMatrizUsuario(espacios) {
    //aumentamos el tamaño del tiempo cuando se inicia el temporizador
    const textoTiempo = document.querySelector(".tiempo");
    textoTiempo.style.fontSize = "20px";

    espacios = espaciosEnBlanco;
    // Copiamos la solución completa para que no de error al verificar las soluciones
    matrizUsuario = matrizSolucion.map(fila => [...fila]);
    //si quedan espacios en blanco por poner recorre la matriz poniendo valores en blanco de forma aleatoria
    while (espacios > 0) {

        for (let filas = 0; filas < matrizSolucion.length; filas++) {

            if (matrizUsuario[filas] == undefined) {
                matrizUsuario[filas] = [];
            }


            for (let columnas = 0; columnas < matrizSolucion[filas].length; columnas++) {
                //determinamos si se pone o no numero
                numeroOblanco = Math.floor(Math.random() * 2);
                //comprobamos tambien si quedan espacios en blancos que poner y si el sitio ya era un espacio en blanco
                if (numeroOblanco == 0 && espacios > 0 && matrizUsuario[filas][columnas] != "") {

                    let datoTemporal = matrizUsuario[filas][columnas];

                    matrizUsuario[filas][columnas] = "";

                    if (contarSoluciones(matrizUsuario) == 1) {

                        espacios--;
                    } else {
                        matrizUsuario[filas][columnas] = datoTemporal;
                    }


                } else {
                    //para no pisar elementos comprobamos que no hay nada antes
                    if (matrizUsuario[filas][columnas] == undefined) {

                        matrizUsuario[filas][columnas] = matrizSolucion[filas][columnas];

                    }

                }

            }
        }

    }
    //gestionamos lo que pasa con el tiempo
    gestionTemporal();

}


/**Esta funcion genera la matriz sobre la que el usuario tendra que trabajar */
function generacionSudoku() {

    //se crea la matrizSolucion
    generarSolucion();

    //obtenemos la matriz del usuario con espacios en blanco

    generarMatrizUsuario(espaciosEnBlanco);
    //modificamos el elemento con id tablero del html
    const tablero = document.querySelector("#tablero");


    for (let filas = 0; filas < matrizUsuario.length; filas++) {

        const tr = document.createElement("tr");

        for (let columnas = 0; columnas < matrizUsuario[filas].length; columnas++) {

            const td = document.createElement("td");
            //en este caso el espacio no es en blanco
            if (matrizUsuario[filas][columnas] !== "") {
                // Casilla fija
                td.textContent = matrizUsuario[filas][columnas];
                td.classList.add("fija");
                td.id = "Numero " + filas + " " + columnas;
            } else {
                // Casilla editable
                const textarea = document.createElement("textarea");
                // textarea.resize= none;
                textarea.id = "Numero " + filas + " " + columnas;
                textarea.rows = 1;
                textarea.cols = 1;
                textarea.maxLength = 1;
                textarea.dataset.fila = filas;
                textarea.dataset.col = columnas;
                // Listener para solo permitir números del 1 al 4
                textarea.addEventListener("input", () => {
                    textarea.value = textarea.value.replace(/[^1-4]/g, "");
                });


                td.appendChild(textarea);
            }

            tr.appendChild(td);
        };

        tablero.appendChild(tr);
    }
}

/** comprobara si el valor introducido por el usuario es o no el correcto */
function validanumero(id) {

    //nos pasan el id del textarea que ha modificado el usuario con el formato Nombre filas columnas
    //lo dividimos por espacios de forma que en la posicion 1 nos quedan las filas y en la posicion 2 las columnas
    let vectorid = id.split(" ");
    let filas = vectorid[1];
    let columnas = vectorid[2];

    const celda = document.getElementById(id);


    if (!celda || celda.tagName !== "TEXTAREA") {
        // No es una casilla editable del usuario
        return;
    }
    //obtenemos del html el valor introducido por el usuario
    let valorUsuario = celda.value.trim();


    //si el usuario introduce el numero correctamente
    if (valorUsuario == matrizSolucion[filas][columnas]) {
        celda.style.color = "green";
        aciertos++;

    } else if (valorUsuario !== "") {
        celda.style.color = "red";
        errores++;



    }


}
/** se encarga de llevar el contador y de los eventos que ocurren al iniciar el temporizador y al finalizarlo
 * tales como inhabilitar elementos o mostrar la puntuacion de pantalla
 */
function gestionTemporal() {

    tiempoTextoUsuario = tiempoLimite;
    //inicia la cuenta atras en el TA
    let textarea = document.querySelector(".textoUsuario-TiempoTexto");
    let contenedor = document.querySelector(".textAreaBotones-TiempoTexto");
    contenedor.classList.add("transformado");
    textarea.classList.remove("oculto");
    textarea.readOnly = true;
    textarea.disabled = true;
    textarea.classList.add("bloqueado");

    let segundos = 3;



    if (sessionStorage.getItem('idioma') == "es") {

        textarea.value = `Prepárate para pensar en ${segundos}s`;
    } else if (sessionStorage.getItem('idioma') == "en") {

        textarea.value = `Get ready to think in  ${segundos}s`;
    }
    const cuentaAtras = setInterval(() => {

        segundos--;

        if (sessionStorage.getItem('idioma') == "es") {

            textarea.value = `Prepárate para pensar en ${segundos}s`;
        } else if (sessionStorage.getItem('idioma') == "en") {

            textarea.value = `Get ready to think in ${segundos}s`;
        }

        if (segundos === -1) {

            document.querySelector(".textAreaBotones-TiempoTexto").style.display = "none";
            clearInterval(cuentaAtras);


            //mostramos la tabla

            document.querySelector(".matriz").style.display = "table";
            //gestion de el p tiempo
            document.querySelector(".numeroTiempo-TiempoTexto").textContent = tiempoTextoUsuario;

            //cambiamos la imagen del temporizador
            const imagen = document.querySelector(".img");
            imagen.src = "assets/img/relojArena.png";
            //quitamos el TA
            textarea = document.querySelector(".textoUsuario-TiempoTexto");
            textarea.style.display = "none";
            //cambio el color del texto y el fondo del temporizador
            const textoTiempo = document.querySelector(".numeroTiempo-TiempoTexto");
            const letraS = document.querySelector(".letraS");
            textoTiempo.style.color = "black";
            letraS.style.color = "black";
            textoTiempo.style.fontWeight = "bold";
            letraS.style.fontWeight = "bold";
            textoTiempo.style.fontSize = "20px";
            letraS.style.fontSize = "20px";
            const fondoTemporizador = document.querySelector(".divTiempo");
            fondoTemporizador.style.background = "#00ffcc";
            ralentizarParticulas();

            //guardamos el PID del proceso que se crea al ejecutar setInterval para poder pararlo mas
            //adelante
            pararTiempo = setInterval(() => {

                tiempoTextoUsuario = tiempoTextoUsuario - 1;

                document.querySelector(".numeroTiempo-TiempoTexto").textContent = tiempoTextoUsuario;
                //Se acaba el temporizador
                if (tiempoTextoUsuario == -1) {

                    clearInterval(pararTiempo);
                restaurarVelocidadParticulas();

                    ocultarDivTiempo();
                    //hacemos que los textareas no se puedan editar
                    const textareas = document.querySelectorAll("textarea");

                    for (let i = 0; i < textareas.length; i++) {
                        textareas[i].readOnly = true;
                    }


                    //Comprobamos la puntuacion del usuario
                    let id;
                    for (let filas = 0; filas < matrizUsuario.length; filas++) {

                        for (let columnas = 0; columnas < matrizUsuario[filas].length; columnas++) {

                            id = "Numero " + filas + " " + columnas;

                            validanumero(id);

                        }

                    }

                    const resultado = document.querySelector(".resultadoTiempo");

                    // Función interna para manejar la puntuación de forma asíncrona
                    const procesarRecordYActualizar = async () => {
                        let puntuacionFinal = Math.max(0, aciertos - errores);

                        if (sessionStorage.getItem('usuarioLogeado') === 'true') {
                            try {
                                // 1. Comprobar si es máxima puntuación ANTES de actualizar la DB
                                const esMaxima = await esPuntuacionMaxima("Sudoku", puntuacionFinal);

                                if (esMaxima) {
                                    resultado.classList.add("nueva-puntuacion-maxima");
                                    if (sessionStorage.getItem('idioma') == "en") {
                                        resultado.style.setProperty('--record-text', '"Personal"');
                                        resultado.style.setProperty('--personal-text', '"Record"');
                                        resultado.style.setProperty('--right-position', '-100px');
                                    }
                                }
                                // 2. Actualizar puntos en la DB
                                ActualizaPuntos("Sudoku", puntuacionFinal);
                            } catch (error) {
                                console.error('Error al verificar puntuación máxima:', error);
                            }
                        }

                        // 3. Mostrar resultados y aplicar estilos neón
                        resultado.classList.remove("oculto");
                        resultado.classList.add("mostrar");
                        resultado.style.display = "block";
                        resultado.style.opacity = "1";
                        resultado.style.transform = "translateY(-8px) scale(1)";

                        resultado.offsetHeight;
                        if (sessionStorage.getItem('idioma') == "es") {
                            resultado.innerHTML =
                                "Aciertos: " + aciertos + " &nbsp;&nbsp;&nbsp;" +
                                "Errores: " + errores + "<br> <br>" + "<span class='puntuacion'> Puntuacion: " + puntuacionFinal
                                + "</span>";

                        } else if (sessionStorage.getItem('idioma') == "en") {

                            resultado.innerHTML =
                                "Hits: " + aciertos + " &nbsp;&nbsp;&nbsp;" +
                                "Mistakes: " + errores + "<br> <br>" + "<span class='puntuacion'> Score: " + puntuacionFinal
                                + "</span>";
                        }

                        document.querySelector(".puntuacion").style.fontSize = "20px";
                        let grosorActual = window.getComputedStyle(resultado).borderWidth;
                        let grosor = parseInt(grosorActual) + 5;
                        resultado.style.borderWidth = grosor + "px";

                        const botonReintentar = document.querySelector(".reintentar");
                        botonReintentar.classList.remove("oculto");
                        botonReintentar.style.display = "inline";
                        botonReintentar.style.boxShadow = "none";
                    };

                    procesarRecordYActualizar();

                }
            }, 1000);
        }
    }, 1000)


}


