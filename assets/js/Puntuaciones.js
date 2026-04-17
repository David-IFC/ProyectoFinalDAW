function ajustarTextoTablaGeneral() {
    // CSS @media queries maneja todo el responsive automáticamente
    // Solo necesitamos mostrar la tabla si estaba oculta
    const table = document.querySelector(".tabla-general");
    if (table) {
        table.style.visibility = "visible";
    }
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
