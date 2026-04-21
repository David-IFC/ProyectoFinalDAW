const details = document.querySelector('.idioma');
const summaryFlag = details.querySelector('summary .flag');
const summaryText = details.querySelector('summary span[data-key]');
const links = details.querySelectorAll('a');

var idiomaActivo;

// Eliminar sessionStorage si el usuario cerró sesión
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('logout') === 'success') {
    sessionStorage.removeItem('usuarioLogeado');
    // Limpiar el parámetro de la URL
    window.history.replaceState({}, document.title, window.location.pathname + window.location.search.replace(/[?&]logout=success/, ''));
}

if (!sessionStorage.getItem("idiomaInicializado")) {

    idiomaActivo = 'es';
    sessionStorage.setItem("idioma", "es");
    // Guardamos la marca
    sessionStorage.setItem("idiomaInicializado", "true");

} else {
    idiomaActivo = sessionStorage.getItem('idioma');

}

cargarIdioma(idiomaActivo);



//  actualizar lista de idiomas en el menú
function actualizarListaIdiomas() {
    links.forEach(link => {
        const lang = link.dataset.lang;
        link.style.display = (lang === idiomaActivo) ? 'none' : 'block';
    });
}



//  enlaces de idioma
links.forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();

        const lang = link.dataset.lang;

        // Actualizar idioma activo y guardar en sessionStorage
        idiomaActivo = lang;
        sessionStorage.setItem('idioma', lang);

        // Cargar el idioma seleccionado
        await cargarIdioma(lang);
    });
});

//  cerrar <details> al hacer click fuera
document.addEventListener('click', event => {
    if (!details.contains(event.target)) {
        details.open = false;
    }
});

async function cargarIdioma(lang) {

    const response = await fetch(`assets/json/${lang}.json`);
    const texts = await response.json();

    // Actualizar bandera y texto del summary
    const idiomaMap = {
        es: { src: "https://flagcdn.com/32x24/es.png", alt: "España", textKey: "idioma" },
        en: { src: "https://flagcdn.com/32x24/us.png", alt: "Estados Unidos", textKey: "idioma" },

    };

    const map = idiomaMap[lang];
    if (map) {
        summaryFlag.src = map.src;
        summaryFlag.alt = map.alt;
        summaryText.textContent = texts[map.textKey] || '';
    }

    // Cambiar todos los textos de la página que tengan data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (texts[key]) el.textContent = texts[key];
    });

    // Cambiar título del documento si existe
    if (texts['titulo']) document.title = texts['titulo'];

    // Actualizar lista de idiomas (ocultar el idioma activo)
    actualizarListaIdiomas();
}
