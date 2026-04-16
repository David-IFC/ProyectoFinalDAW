function ajustarTextoTablaGeneral() {
    const table = document.querySelector(".tabla-general");
    if (!table) return;
    
    table.style.visibility = "hidden";
    const celdas = table.querySelectorAll("td, th");

    // Desactivar transiciones para evitar el efecto de parpadeo durante el cálculo
    celdas.forEach(c => c.style.transition = "none");

    celdas.forEach((celda) => {
        let tamano = window.innerWidth <= 1053 ? 12 : 16;

        if (window.innerWidth <= 1053 && celda.tagName === "TD" && (celda.cellIndex === 0)) {
            const esCuentaLetras = celda.textContent.trim().includes("CuentaLetras");
            celda.style.fontSize = esCuentaLetras ? "11px" : "10px";
            celda.style.whiteSpace = "normal";
            celda.style.wordBreak = "break-word";
            return;
        }

        celda.style.fontSize = tamano + "px";

        if (window.innerWidth <= 1053 && celda.textContent.trim().includes("CuentaLetras")) {
            celda.style.fontSize = "11px";
        }
        
        if (window.innerWidth <= 1053) {
            celda.style.whiteSpace = "normal";
            celda.style.wordBreak = "break-word";
        } else {
            celda.style.whiteSpace = "nowrap";
        }

        while (celda.scrollWidth > celda.clientWidth && tamano > 6) {
            tamano -= 1;
            celda.style.fontSize = tamano + "px";
        }
    });

    table.style.visibility = "visible";

    // Restaurar transiciones después de que el layout esté estable
    setTimeout(() => {
        celdas.forEach(c => c.style.transition = "");
    }, 50);
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

            const rows = Array.from(tbody.querySelectorAll("tr"));

            const sortedRows = rows.sort((a, b) => {
                const cellA = a.children[index].textContent.trim();
                const cellB = b.children[index].textContent.trim();

                if (cellA === "" && cellB === "") return 0;
                if (cellA === "") return 1;
                if (cellB === "") return -1;

                const numA = parseFloat(cellA);
                const numB = parseFloat(cellB);

                if (!isNaN(numA) && !isNaN(numB)) {
                    return isAscending ? numA - numB : numB - numA;
                }

                return isAscending
                    ? cellA.localeCompare(cellB)
                    : cellB.localeCompare(cellA);
            });

            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            sortedRows.forEach((row) => tbody.appendChild(row));
            ajustarTextoTablaGeneral();
        });
    });
}

window.addEventListener("load", () => {
    ajustarTextoTablaGeneral();
    initSorting();
});

let lastWidth = window.innerWidth;
let resizeTimer;

window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ajustarTextoTablaGeneral();
    }, 100);
});
