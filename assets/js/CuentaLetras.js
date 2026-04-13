const tiempoLimite = 10;
document.querySelector(".numeroTiempo-TiempoTexto").textContent = tiempoLimite;
/**es el tiempo que tiene el usuario para realizar la accion */
let tiempoTextoUsuario = tiempoLimite;
/**se usa para detener setInterval */
let pararTiempo;
let aciertos = 0;
let errores = 0;
let resultado = 0;
/** para poder eliminar las 2 palabras necesito almacenar aparte de la palabra su id para acceder a la 
 * etiqueta correspondiente en el html.
 */
let IDpalabra = "";
/** este vector contiene las palabras seleccionadas por el usuario  */
let palabrasSeleccionadas = [];
/**este vector contiene el id de las palabras seleccionadas */
let idpalabrasSeleccionadas = [];
/**Numero de palabras que el usuario dispondra para hacer parejas */
const numeroPalabras = 10;
/** vector que contendra las palabras que han pasado el filtro de seleccion */
let palabrasElegidas = [];
//estas 2 variables se usan para rellenar el vector de palabrasElegidas
let palabra1 = "";
let palabra2 = "";
/**indica el numero minimo de espacios que ocuparan las parejas -1 dado que empieza en 0*/
const minParejas = 5;
/**si una palabra seleccionada se encuentra en el vector se tiene que cambiar por otra */
let controlRepetida = false;
/** vector con las todas las palabras que pueden formar parte de la lista de palabras que el usuario tendra para seleccionar */
const palabrasEs = [
    // ───── 40 parejas de anagramas (80 palabras) ─────

    // 3–4 letras
    "amor", "roma",
    "sal", "las",
    "cosa", "saco",
    "lima", "mila",
    "mora", "coma",

    // 4–5 letras
    "ruta", "casa",
    "nota", "tina",
    "velo", "sapo",
    "pila", "lipa",
    "nido", "odin",
    "cita", "vino",
    "seda", "café",


    // 5 letras
    "prisa", "fuego",
    "campo", "libro",
    "perla", "mesa",
    "trapo", "porta",
    "claro", "coral",
    "marca", "carta",

    // 6 letras
    "camino", "monica",
    "sarten", "entras",
    "lienzo", "solete",
    "torneo", "correr",
    "cuadro", "lucero",

    // 7–8 letras
    "cartones", "camiones",
    "relacion", "ventanas",
    "esparto", "portado",


    // ───── 20 palabras sin pareja ─────
    "casa",
    "arbol",
    "libro",
    "ventana",
    "montana",
    "rio",
    "mariposa",
    "sol",
    "luna",
    "fuego",
    "tierra",
    "computadora",
    "teclado",
    "pantalla",
    "mesa",
    "silla",
    "reloj",
    "camion",
    "ciudad",
    "bosque",
    "esternocleidomastoideo",
    "supercalifragilisticoespialidoso"
];

const palabrasEn = [

    // ───── 10 pairs of 4 letters ─────
    "moon", "star",
    "book", "tree",
    "wind", "fire",
    "rock", "sand",
    "ship", "road",
    "blue", "gold",
    "king", "wolf",
    "rain", "snow",
    "milk", "fish",
    "ring", "bell",

    // ───── 10 pairs of 5 letters ─────
    "apple", "grape",
    "chair", "table",
    "plant", "stone",
    "light", "sound",
    "water", "bread",
    "smile", "dream",
    "green", "black",
    "sweet", "spice",
    "train", "plane",
    "heart", "brain",

    // ───── 10 pairs of 7 letters ─────
    "teacher", "student",
    "morning", "evening",
    "journey", "freedom",
];
let palabras = [];
if (sessionStorage.getItem('idioma') == "es") {
    palabras = palabrasEs;

} else if (sessionStorage.getItem('idioma') == "en") {
    palabras = palabrasEn;
}

/**Se activa cuando el usuario pulsa el boton para empezar a escribir */
function empezar() {

    //para iniciar la cuenta atras 
    let divPalabras = document.querySelector(".textoInformativo");
    divPalabras.classList.add("transformado");
    let listaPalabras = document.querySelector(".textoInformativo");
    //aumentamos el tamaño del tiempo cuando se inicia el temporizador
    let textoTiempoFont = document.querySelector(".tiempo");
    textoTiempoFont.style.fontSize = "20px";
    //desaparece el boton empezar
    ocultarBotonEmpezar();
    //espera antes de iniciar el ejercicio
    let segundos = 3;

    if (sessionStorage.getItem('idioma') == "es") {

        listaPalabras.innerHTML = `Prepárate para contar en ${segundos} s`;
    } else if (sessionStorage.getItem('idioma') == "en") {

        listaPalabras.innerHTML = "Get ready to count in " + segundos + " s";
    }
    //iniciamos la animacion de la zona del indicador de preparacion
    document.querySelector(".textoInformativo").style.animation = "parpadeoTextarea 1s ease-in-out infinite";
    //iniciamos temporizador
    const cuentaAtras = setInterval(() => {

        segundos--;
        if (sessionStorage.getItem('idioma') == "es") {

            listaPalabras.innerHTML = `Prepárate para contar en ${segundos} s`;
        } else if (sessionStorage.getItem('idioma') == "en") {

            listaPalabras.innerHTML = "Get ready to count in " + segundos + " s";
        }

        if (segundos === -1) {

            clearInterval(cuentaAtras);
            //indicamos al usuario que puede seleccionar una palabra
            if (sessionStorage.getItem('idioma') == "es") {

                listaPalabras.innerHTML = "Selecciona una palabra";
            } else if (sessionStorage.getItem('idioma') == "en") {

                listaPalabras.innerHTML = "Select a word";
            }

            //paramos al animacion del texto informativo
            document.querySelector(".textoInformativo").style.animation = "null";
            //preparamos las palabras para el usuario
            preparaPalabras();
            //actualizamos el tiempo
            tiempoTextoUsuario = tiempoLimite;

            document.querySelector(".numeroTiempo-TiempoTexto").textContent = tiempoTextoUsuario;

            //cambiamos la imagen del temporizador
            const imagen = document.querySelector(".img");
            imagen.src = "assets/img/relojArena.png";
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

                //modificamos el texto con el tiempo cada segundo

                if (tiempoTextoUsuario >= 0) {
                    document.querySelector(".numeroTiempo-TiempoTexto").textContent = tiempoTextoUsuario;
                    return;
                }
                //ponemos en blanco el color de todas las palabras restantes por si hay alguna seleccionada
                for (let index = 0; index < numeroPalabras; index++) {
                    document.getElementById("Palabra" + index).style.color = "white";

                }

                //Se acaba el temporizador
                clearInterval(pararTiempo);
                restaurarVelocidadParticulas();
                //Actualizamos la puntuacion en la base de datos
                ActualizaPuntos("CuentaLetras", resultado);
                //ocultamos el reloj
                ocultarDivTiempo();
                //ocultamos el texto informativo
                document.querySelector(".textoInformativo").style.display = "none";
                //mostramos los resultados
                document.querySelector(".divResultados").classList.remove("oculto");
                //mostramos el boton reintentar
                //Actualizamos la tabla de resultados y mostramos el boton reintentar
                const reintentar = document.querySelector(".reintentar");
                // Activamos transición
                reintentar.classList.remove("oculto");

                reintentar.classList.add("mostrar");

                reintentar.style.boxShadow = "none";
                //hacemos que no se pueda interactuar con la lista de palabras a contar

                document.querySelector(".palabrasLetrasAContrar").style.pointerEvents = "none";


            }, 1000);

        }
    }, 1000)

}
/**se activa al seleccionar una palabra y se llama con el id de la palabra que has pulsado
 * selecciona la palabra modificando el css para que el usuario vea que ha sido seleccionada
 */
function seleccionDePalabra(idPalabra) {
    let texto;
    //El vector no tiene elementos
    if (palabrasSeleccionadas.length == 0) {
        idpalabrasSeleccionadas[0] = "Palabra" + idPalabra;
        palabrasSeleccionadas[0] = document.querySelector('#' + "Palabra" + idPalabra).innerHTML;
        document.querySelector('#' + "Palabra" + idPalabra).style.color = "#00ffcc";
        if (sessionStorage.getItem('idioma') == "es") {

            texto = "Primera palabra seleccionada : ";
        } else if (sessionStorage.getItem('idioma') == "en") {

            texto = "First word selected: ";
        }
        document.querySelector(".textoInformativo").innerHTML = texto + palabrasSeleccionadas[0];
        document.querySelector(".textoInformativo").style.color = "white";
        IDpalabra = idPalabra;
        //El vector contiene elementos
    } else if (palabrasSeleccionadas.length > 0) {
        //se comprueba si has seleccionado el primer elemento por segunda vez
        if (palabrasSeleccionadas[0] == document.querySelector('#' + "Palabra" + idPalabra).innerHTML) {
            IDpalabra = "";
            palabrasSeleccionadas = [];
            idpalabrasSeleccionadas = [];
            if (sessionStorage.getItem('idioma') == "es") {

                texto = "Selecciona una palabra";
            } else if (sessionStorage.getItem('idioma') == "en") {

                texto = "Select a word";
            }
            document.querySelector(".textoInformativo").innerHTML = texto;
            document.querySelector(".textoInformativo").style.color = "white";
            document.querySelector('#' + "Palabra" + idPalabra).style.color = "white";

            //añadimos el segundo elemento al vector
        } else {
            if (sessionStorage.getItem('idioma') == "es") {
                document.querySelector(".textoInformativo").innerHTML = "primera palabra seleccionada con el id: " + palabrasSeleccionadas[0];
                document.querySelector(".textoInformativo").innerHTML += "<br>" + "el segundo elemento seleccionado es: " + document.querySelector('#' + "Palabra" + idPalabra).innerHTML;
                palabrasSeleccionadas[1] = document.querySelector('#' + "Palabra" + idPalabra).innerHTML;
                idpalabrasSeleccionadas[1] = "Palabra" + idPalabra;

            } else if (sessionStorage.getItem('idioma') == "en") {

                document.querySelector(".textoInformativo").innerHTML = "first selected word with id: " + palabrasSeleccionadas[0];
                document.querySelector(".textoInformativo").innerHTML += "<br>" + "the second selected item is: " + document.querySelector('#' + "Palabra" + idPalabra).innerHTML;
                palabrasSeleccionadas[1] = document.querySelector('#' + "Palabra" + idPalabra).innerHTML;
                idpalabrasSeleccionadas[1] = "Palabra" + idPalabra;
            }

            //si tienen las mismas letras
            if (palabrasSeleccionadas[0].length == palabrasSeleccionadas[1].length) {

                if (sessionStorage.getItem('idioma') == "es") {
                    document.querySelector(".textoInformativo").innerHTML = "La palabra " + palabrasSeleccionadas[0] + " y la palabra " +
                        palabrasSeleccionadas[1] + " tienen el mismo numero de letras que es: " + palabrasSeleccionadas[0].length;

                } else if (sessionStorage.getItem('idioma') == "en") {

                    document.querySelector(".textoInformativo").innerHTML = "The word " + palabrasSeleccionadas[0] + " y la palabra " +
                        palabrasSeleccionadas[1] + " they have the same number of letters, which is: " + palabrasSeleccionadas[0].length;
                }

                //eliminamos los elementos de la lista
                document.querySelector('#' + "Palabra" + idPalabra).style.visibility = "hidden";
                document.querySelector('#' + "Palabra" + IDpalabra).style.visibility = "hidden";

                //añadimos  la pareja de palabras a la lista de palabras acertadas
                document.querySelector(".tablaPalabrasAcertadas").innerHTML += "<li>" + palabrasSeleccionadas[0] + " -- " + palabrasSeleccionadas[1];
                palabrasSeleccionadas = [];
                idpalabrasSeleccionadas = [];
                IDpalabra = "";
                aciertos++;
                document.querySelector(".numeroAciertos").innerHTML = aciertos;
                document.querySelector(".numeroPuntuacion").innerHTML = aciertos - errores;
                document.querySelector(".textoInformativo").style.color = "#00FF66";
                resultado = aciertos - errores;

                //si no tienen las mismas letras
            } else {
                if (sessionStorage.getItem('idioma') == "es") {
                    document.querySelector(".textoInformativo").innerHTML = "La palabra " + palabrasSeleccionadas[0] +
                        " tiene " + palabrasSeleccionadas[0].length + " letras " + "y" + " la palabra " + palabrasSeleccionadas[1] +
                        " tiene " + palabrasSeleccionadas[1].length + " letras";

                } else if (sessionStorage.getItem('idioma') == "en") {

                    document.querySelector(".textoInformativo").innerHTML = "The word " + palabrasSeleccionadas[0] +
                        " have " + palabrasSeleccionadas[0].length + " Letters " + "and" + " the word " + palabrasSeleccionadas[1] +
                        " have " + palabrasSeleccionadas[1].length + " Letters";

                }

                palabrasSeleccionadas = [];
                document.getElementById(idpalabrasSeleccionadas[0]).style.color = "white";
                idpalabrasSeleccionadas = [];
                IDpalabra = "";
                errores++;
                if ((aciertos - errores) < 0) {
                    resultado = 0
                } else {
                    resultado = aciertos - errores;
                }
                document.querySelector(".numeroErrores").innerHTML = errores;
                document.querySelector(".numeroPuntuacion").innerHTML = resultado;
                document.querySelector(".textoInformativo").style.color = "#FF0033";

            }
        }
    }


}
/** mezclamos los elementos de un vector de manera que ninguno de ellos acabe en la misma posicion que ocupaba al
 * principio
 */
function mezclarSinMismaPosicion(arr) {

    let resultado;
    let valido = false;

    while (!valido) {

        resultado = [...arr].sort(() => Math.random() - 0.5);
        valido = resultado.every((el, i) => el !== arr[i]);
    }

    return resultado;
}
/** elegimos las palabras con las que jugara el usuario */
function preparaPalabras() {

    //rellenamos el vector de palabrasElegidas con parejas de palabras
    for (let index = 0; index < minParejas; index = index + 2) {
        //primero seleccionamos 2 palabras que tengan el mismo numero de letras
        //con este bucle me aseguro de que no sean la misma palabra
        while (palabra1 == palabra2 || palabra1.length != palabra2.length || controlRepetida) {
            //la ponemos a falso dado que si hay alguna palabra repetida lo comprobamos mas adelante
            controlRepetida = false;
            //elegimos la primera palabra de entre todas las del vector
            palabra1 = palabras[Math.floor(Math.random() * palabras.length)];
            //ahora seleccionamos la segunda palabra
            palabra2 = palabras[Math.floor(Math.random() * palabras.length)];
            //si el vector ya tiene algun elemento hay que comprobar que las palabras no esten dentro
            if (palabrasElegidas.length != 0) {
                //recorremos el vector para comprobar si las palabras seleccionadas estan dentro
                for (let indice = 0; indice < palabrasElegidas.length; indice++) {

                    if (palabrasElegidas[indice] == palabra1 || palabrasElegidas[indice] == palabra2) {
                        //en caso de que una o las dos palabras esten dentro del vector, repetimos el bucle
                        controlRepetida = true;
                    }
                }
            }
        }

        //rellenamos las posiciones del vector palabrasElegidas

        palabrasElegidas[index] = palabra1;
        palabrasElegidas[index + 1] = palabra2;
        //reseteamos las varibles delas palabras
        palabra1 = "";
        palabra2 = "";
    }
    //rellenamos el resto del vector con palabras aleatorias pero que no esten en el vector
    //ya no tienen por que ser parejas

    for (let index = minParejas + 1; index < numeroPalabras; index++) {
        //nos aseguramos que siempre entra la primera vez
        controlRepetida = true;
        while (controlRepetida) {
            //la ponemos a falso dado que si hay alguna palabra repetida lo comprobamos mas adelante
            controlRepetida = false;
            //elegimos la primera palabra de entre todas las del vector
            palabra1 = palabras[Math.floor(Math.random() * palabras.length)];

            //recorremos el vector para comprobar si las palabras seleccionadas estan dentro
            for (let indice = 0; indice < palabrasElegidas.length; indice++) {

                if (palabrasElegidas[indice] == palabra1) {
                    //en caso de que una o las dos palabras esten dentro del vector, repetimos el bucle
                    controlRepetida = true;
                }
            }

        }
        palabrasElegidas[index] = palabra1;
        palabra1 = "";

    }
    //mezclamos el vector 
    palabrasElegidas = mezclarSinMismaPosicion(palabrasElegidas);

    //rellenamos la lista de palabras
    for (let index = 0; index < palabrasElegidas.length; index++) {

        document.querySelector(".palabrasLetrasAContrar").innerHTML += '<li id="Palabra' + index
            + '" onclick="seleccionDePalabra(' + index + ')">' + palabrasElegidas[index] + '</li>';

    }
    //mostramos la lista de palabras que inicialmente estaba oculta
    document.querySelector(".divPalabrasAleatorias").style.display = "flex";
    document.querySelector(".palabrasLetrasAContrar").style.display = "flex";

}

function ocultarBotonEmpezar() {

    const botones = document.querySelector(".botonesFila");

    // fuerza al navegador a aplicar estilos actuales
    botones.offsetHeight;

    botones.classList.add("ocultar");

    botones.addEventListener("transitionend", () => {
        botones.remove();
    }, { once: true });
}

function reload() {
    location.reload();
}
























