const tiempoLimite = 10;
document.querySelector(".numeroTiempo-TiempoTexto").innerHTML = tiempoLimite;
/**es el tiempo que tiene el usuario para realizar la accion */
let tiempoTextoUsuario = tiempoLimite;
/**se usa para detener setInterval */
let pararTiempo;
let aciertos = 0;
let errores = 0;
let resultadoFinal = 0;
/**decididira que paneles se ponen a verde */
let panelVerde = 0;
/**guardar el cursor original para restaurarlo después */
let cursorOriginal = "";
/**sirve para almacenar  el color de la casilla en cuestion  */
let colorFondo;


function cambiarFondo() {
    const celdas = document.querySelectorAll("td");
    for (let index = 0; index < celdas.length; index++) {

        celdas[index].addEventListener("click", () => {
            if (document.getElementById(index).style.backgroundColor == "green") {
                celdas[index].style.backgroundColor = "red";
                aciertos++;
            }

        });

    }
}


/**se encarga de iniciar el temporizador asi como de  editar los elementos
 * que se ven afectados por el temporizador
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
    //añadimos los liseners a las casillas
    cambiarFondo();
    document.querySelector(".matrizColores").disabled = true;
    let segundos = 3;
    if (sessionStorage.getItem('idioma') == "es") {

        textarea.value = `Pulsa celdas iluminadas en ${segundos}s`;
    } else if (sessionStorage.getItem('idioma') == "en") {
        textarea.value = `Press the highlighted cells in ${segundos}s`;
    }

    const cuentaAtras = setInterval(() => {

        segundos--;
        if (sessionStorage.getItem('idioma') == "es") {

            textarea.value = `Pulsa celdas iluminadas en ${segundos}s`;
        } else if (sessionStorage.getItem('idioma') == "en") {
            textarea.value = `Press the highlighted cells in ${segundos}s`;
        }

        if (segundos === -1) {

            document.querySelector(".textAreaBotones-TiempoTexto").style.display = "none";
            clearInterval(cuentaAtras);
            //añadir clase cursor-precision a la tabla
            const tabla = document.querySelector("body.Punteria table");
            if (tabla) {
                tabla.classList.add("cursor-precision");
            }
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

            pararTiempo = setInterval(() => {

                tiempoTextoUsuario = tiempoTextoUsuario - 1;

                document.querySelector(".numeroTiempo-TiempoTexto").textContent = tiempoTextoUsuario;

                if (tiempoTextoUsuario > 0) {
                    //obtenemos el id de forma aleatoria
                    panelVerde = Math.floor(Math.random() * 100);
                    colorFondo = document.getElementById(panelVerde).style.backgroundColor;
                    //comprobamos que la celda no este ya pintada de verde;
                    while (colorFondo == "green" || colorFondo == "red") {

                        panelVerde = Math.floor(Math.random() * 100);
                        colorFondo = document.getElementById(panelVerde).style.backgroundColor;
                    }
                    document.getElementById(panelVerde).style.background = "green";
                    //aumentamos la aparicion de puntos verdes
                    if (tiempoTextoUsuario <= tiempoLimite / 2) {
                        //obtenemos el id de forma aleatoria
                        panelVerde = Math.floor(Math.random() * 100);
                        colorFondo = document.getElementById(panelVerde).style.backgroundColor;
                        //comprobamos que la celda no este ya pintada de verde;
                        while (colorFondo == "green"|| colorFondo == "red") {

                            panelVerde = Math.floor(Math.random() * 100);
                            colorFondo = document.getElementById(panelVerde).style.backgroundColor;
                        }
                        document.getElementById(panelVerde).style.background = "green";
                        //aumentamos la aparicion de puntos verdes
                    }
                }
                //Se acaba el temporizador
                if (tiempoTextoUsuario == -1) {

                    clearInterval(pararTiempo);
                    //quitar clase cursor-precision de la tabla
                    const tabla = document.querySelector("body.Punteria table");
                    if (tabla) {
                        tabla.classList.remove("cursor-precision");
                    }
                    restaurarVelocidadParticulas();
                    ocultarDivTiempo();
                    //deshabilitamos los eventos de las celdas
                    const celdas = document.querySelectorAll("td");
                    for (let index = 0; index < celdas.length; index++) {
                        celdas[index].style.pointerEvents = "none";
                    }
                    //por cada casilla en color verde es un error
                    for (let index = 0; index < celdas.length; index++) {
                        if (document.getElementById(index).style.backgroundColor == "green") {

                            errores++;

                            const td = document.getElementById(index);

                            td.style.backgroundColor = "#ff0040";
                            td.style.boxShadow = "0 0 12px rgba(255, 0, 64, 1), 0 0 25px rgba(255, 0, 64, 0.8)";
                            td.style.transform = "scale(1.2)";

                        }
                    }


                    const resultado = document.querySelector(".resultadoTiempo");
                    resultado.classList.remove("oculto");
                    resultado.classList.add("mostrar");
                    resultado.style.display = "block"; // fuerza que se muestre
                    resultado.style.opacity = "1";
                    resultado.style.transform = "translateY(-8px) scale(1)";
                    resultado.offsetHeight;

                    let Aciertos;
                    let Errores;
                    let Puntuacion;
                    if (sessionStorage.getItem('idioma') == "es") {

                        Aciertos = "Aciertos: ";
                        Errores = "Errores: ";
                        Puntuacion = "Puntuacion: ";
                    } else if (sessionStorage.getItem('idioma') == "en") {
                        Aciertos = "Corrects: ";
                        Errores = "Mistakes: ";
                        Puntuacion = "Score: ";
                    }
                    if ((aciertos - errores) < 0) {
                        resultadoFinal = 0;
                    } else {
                        resultadoFinal = aciertos - errores;
                    }
                    resultado.innerHTML =
                        Aciertos + aciertos + " &nbsp;&nbsp;&nbsp;" +
                        Errores + errores + "<br> <br>" + "<span class='puntuacion'>" + Puntuacion + resultadoFinal
                        + "</span>";
                    document.querySelector(".puntuacion").style.fontSize = "20px";
                    let grosorActual = window.getComputedStyle(resultado).borderWidth;
                    // Convertir a número
                    let grosor = parseInt(grosorActual);
                    // Aumentar el grosor
                    grosor += 5;
                    resultado.style.borderWidth = grosor + "px";
                    const botonReintentar = document.querySelector(".reintentar");
                    botonReintentar.classList.remove("oculto");
                    botonReintentar.style.display = "inline";
                    botonReintentar.style.boxShadow = "none";

                    //Actualizamos la puntuacion en la base de datos
                    ActualizaPuntos("Punteria", resultadoFinal);
                }
            }, 1000);

        }


    }, 1000)

}



