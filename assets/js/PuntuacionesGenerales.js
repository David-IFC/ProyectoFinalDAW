function ajustarTextoTablaGeneral() {
    const celdas = document.querySelectorAll(".tabla-general td");

    celdas.forEach((celda) => {
        let tamano = 16;
        celda.style.fontSize = tamano + "px";

        while (celda.scrollWidth > celda.clientWidth && tamano > 8) {
            tamano -= 1;
            celda.style.fontSize = tamano + "px";
        }
    });
}

function aplicarSaltosMovilTablaGeneral() {
    const celdasUsuario = document.querySelectorAll(".tabla-general .col-usuario");

    celdasUsuario.forEach((celda) => {
        if (!celda.dataset.textoOriginal) {
            celda.dataset.textoOriginal = celda.textContent.trim();
        }

        if (window.innerWidth <= 740) {
            celda.innerHTML = celda.dataset.textoOriginal.replace(/ /g, "<br>");
        } else {
            celda.textContent = celda.dataset.textoOriginal;
        }
    });
}

window.addEventListener("load", () => {
    aplicarSaltosMovilTablaGeneral();
    ajustarTextoTablaGeneral();
});

window.addEventListener("resize", () => {
    aplicarSaltosMovilTablaGeneral();
    ajustarTextoTablaGeneral();
});
