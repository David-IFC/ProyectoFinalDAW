function ajustarTextoTablaGeneral() {
    // CSS @media queries maneja todo el responsive automáticamente
    // Solo necesitamos mostrar la tabla si estaba oculta
    const table = document.querySelector(".tabla-general");
    if (table) {
        table.style.visibility = "visible";
    }
}

function aplicarSaltosMovilTablaGeneral() {
    const table = document.querySelector(".tabla-general");
    if (!table) return;

    const celdasHeader = table.querySelectorAll("th");

    celdasHeader.forEach((celda) => {
        if (!celda.dataset.textoOriginal) {
            celda.dataset.textoOriginal = celda.textContent.trim();
        }

        if (window.innerWidth <= 1053) {
            const texto = celda.dataset.textoOriginal;
            
            // Caso específico: TiempoTexto -> Tiempo <br> Texto
            if (texto.includes("TiempoTexto") || celda.dataset.column === "1") {
                celda.innerHTML = "Tiempo<br>Texto";
            } 
            // Caso específico: Nombre de usuario (reutilizando lógica existente)
            else if (celda.classList.contains("col-usuario")) {
                celda.innerHTML = texto.replace(/ /g, "<br>");
            }
        } else {
            celda.textContent = celda.dataset.textoOriginal;
        }
    });

    // Celdas de usuario en el cuerpo
    const celdasUsuarioBody = table.querySelectorAll("tbody .col-usuario");
    celdasUsuarioBody.forEach((celda) => {
        if (!celda.dataset.textoOriginal) {
            celda.dataset.textoOriginal = celda.textContent.trim();
        }

        if (window.innerWidth <= 1053) {
            celda.innerHTML = celda.dataset.textoOriginal.replace(/ /g, "<br>");
        } else {
            celda.textContent = celda.dataset.textoOriginal;
        }
    });
}

function initSorting() {
    const table = document.querySelector(".tabla-general");
    if (!table) return;

    const headers = table.querySelectorAll("th");
    const tbody = table.querySelector("tbody");
    let currentColumn = -1;
    let isAscending = true;

    headers.forEach((header, index) => {
        header.addEventListener("click", () => {
            if (currentColumn === index) {
                isAscending = !isAscending;
            } else {
                currentColumn = index;
                isAscending = true;
            }

            // Actualizar clases visuales en las cabeceras
            headers.forEach(h => h.classList.remove("sorted-asc", "sorted-desc"));
            header.classList.add(isAscending ? "sorted-asc" : "sorted-desc");

            const rows = Array.from(tbody.querySelectorAll("tr"));

            const sortedRows = rows.sort((a, b) => {
                const cellA = a.children[index].textContent.trim();
                const cellB = b.children[index].textContent.trim();

                // Manejar celdas vacías (siempre al final independientemente del orden)
                if (cellA === "" && cellB === "") return 0;
                if (cellA === "") return 1;
                if (cellB === "") return -1;

                // Detectar si es numérico
                const numA = parseFloat(cellA);
                const numB = parseFloat(cellB);

                if (!isNaN(numA) && !isNaN(numB)) {
                    return isAscending ? numA - numB : numB - numA;
                }

                // Alfabético
                return isAscending
                    ? cellA.localeCompare(cellB)
                    : cellB.localeCompare(cellA);
            });

            // Limpiar y añadir de nuevo las filas ordenadas
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            sortedRows.forEach((row) => tbody.appendChild(row));
            
            // Re-ejecutar ajustes visuales si es necesario
            ajustarTextoTablaGeneral();
            aplicarSaltosMovilTablaGeneral();
        });
    });
}

window.addEventListener("load", () => {
    aplicarSaltosMovilTablaGeneral();
    ajustarTextoTablaGeneral();
    initSorting();
});

let lastWidth = window.innerWidth;
let resizeTimer;

window.addEventListener("resize", () => {
    // Solo re-ejecutar si el ancho cambia realmente (evita disparos en móviles por scroll)
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        aplicarSaltosMovilTablaGeneral();
        ajustarTextoTablaGeneral();
    }, 100); // Pequeña pausa para que el ajuste sea de una vez
});
