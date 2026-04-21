const CLAVE_PARTICULAS = "configuracionParticulas";
const NUMERO_PARTICULAS = 80;

function crearConfiguracionParticulas() {
    const creadasEn = Date.now();
    const particulas = [];

    for (let i = 0; i < NUMERO_PARTICULAS; i++) {
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 15 + 5;

        particulas.push({
            left: Math.random() * 100,
            top: Math.random() * 100,
            size,
            duration,
            creadasEn
        });
    }

    sessionStorage.setItem(CLAVE_PARTICULAS, JSON.stringify(particulas));
    return particulas;
}

function obtenerConfiguracionParticulas() {
    const particulasGuardadas = sessionStorage.getItem(CLAVE_PARTICULAS);

    if (!particulasGuardadas) {
        return crearConfiguracionParticulas();
    }

    try {
        const particulas = JSON.parse(particulasGuardadas);

        if (!Array.isArray(particulas) || particulas.length === 0) {
            return crearConfiguracionParticulas();
        }

        return particulas;
    } catch {
        return crearConfiguracionParticulas();
    }
}

function crearParticula(particulaConfig) {
    const particula = document.createElement("div");
    particula.classList.add("neon-particle");

    particula.style.left = particulaConfig.left + "vw";
    particula.style.top = particulaConfig.top + "vh";
    particula.style.width = particulaConfig.size + "px";
    particula.style.height = particulaConfig.size + "px";
    particula.style.animationDuration = particulaConfig.duration + "s";

    const segundosTranscurridos = (Date.now() - particulaConfig.creadasEn) / 1000;
    const progresoActual = segundosTranscurridos % particulaConfig.duration;
    particula.style.animationDelay = "-" + progresoActual + "s";

    return particula;
}

/**genera las particulas que se ven por pantalla */
function generaParticulas() {
    if (document.querySelector(".neon-particle")) {
        return;
    }

    const body = document.body;
    const configuracionParticulas = obtenerConfiguracionParticulas();

    configuracionParticulas.forEach((particulaConfig) => {
        body.appendChild(crearParticula(particulaConfig));
    });
}

//llamo a la funcion desde aqui para que todas las paginas lo tengan
generaParticulas();

function ralentizarParticulas() {
    const particulas = document.querySelectorAll(".neon-particle");

    particulas.forEach((particula) => {
        const animacion = particula.getAnimations()[0];

        if (animacion) {
            animacion.updatePlaybackRate(0.35);
            return;
        }

        particula.style.animationPlayState = "paused";
    });
}

function restaurarVelocidadParticulas() {
    const particulas = document.querySelectorAll(".neon-particle");

    particulas.forEach((particula) => {
        const animacion = particula.getAnimations()[0];

        if (animacion) {
            animacion.updatePlaybackRate(1);
            return;
        }

        particula.style.animationPlayState = "running";
    });
}
/**oculta la div de clase divTiempo  */
function ocultarDivTiempo() {
    const divTiempo = document.querySelector(".divTiempo");

    divTiempo.style.display = "none";
}

/**oculta la div de clase divTiempo con una transicion */
function ocultarDivTiempo2() {

    const divTiempo = document.querySelector(".divTiempo");

    divTiempo.classList.add("ocultar");

    // Eliminar del DOM despues de que termine la transicion
    divTiempo.addEventListener("transitionend", () => {
        divTiempo.remove();
    }, { once: true });
}

/** aplica la animacion de fade-out */
function transicion(url) {

    // anadimos al css el fade-out
    document.body.classList.add('fade-out');

    // duracion
    setTimeout(() => {
        window.location.href = url;
    }, 600);

}

function recargar(url) {

    window.location.href = url + "?lang=" + sessionStorage.getItem('idioma');

}

/**para que la flecha hacia atras funcione dado que al hacer fade-out se inhabilita*/
window.addEventListener("pageshow", () => {
    document.body.classList.remove("fade-out");
});

/**recarga la pagina para poder volver a intentarlo
 */

function reload() {
    window.location.href = window.location.pathname;
}

/**transforma el boton empezar en un textarea */
function transform() {

    const boton = document.querySelector(".botonEmpezarTiempo-TiempoTexto");
    const textarea = document.querySelector(".textoUsuario-TiempoTexto");

    boton.addEventListener("click", () => {
        boton.style.display = "none";
        textarea.classList.add("activo");
    });
}
/** recibe el nombre del juego del que actualizar los puntos, y los puntos a actualizar */
function ActualizaPuntos(nombreJuego,resultado) {

    fetch('assets/db/ActualizarPuntuacion.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'juego='+nombreJuego+'&puntuacion=' + resultado
    });

}

/** comprueba si la puntuación obtenida es la puntuación máxima del usuario en ese juego
 * @param {string} nombreJuego - nombre del juego (TiempoTexto, Sudoku, CuentaLetras, Punteria)
 * @param {number} puntuacion - puntuación obtenida
 * @returns {Promise<boolean>} - true si es la puntuación máxima, false en caso contrario
 */
async function esPuntuacionMaxima(nombreJuego, puntuacion) {
    try {
        const response = await fetch('assets/db/ConsultarPuntuacionMaxima.php', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'juego=' + nombreJuego + '&puntuacion=' + puntuacion
        });
        const resultado = await response.json();
        return resultado.es_maxima;
    } catch (error) {
        console.error('Error al consultar puntuación máxima:', error);
        return false;
    }
}
