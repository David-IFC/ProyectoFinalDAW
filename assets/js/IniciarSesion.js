document.addEventListener("DOMContentLoaded", () => {

    // Establecer sessionStorage si el login fue exitoso
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
        sessionStorage.setItem('usuarioLogeado', 'true');
        // Limpiar el parámetro de la URL
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search.replace(/[?&]login=success/, ''));
    }

    const form = document.getElementById("registro");

    if (form) {
        const inputs = form.querySelectorAll("input[required]");

        inputs.forEach(input => {
            input.addEventListener("invalid", e => {
                if (sessionStorage.getItem('idioma') == "es") {
                    input.setCustomValidity("Por favor completa este campo");
                } else if (sessionStorage.getItem('idioma') == "en") {
                    input.setCustomValidity("Please complete this field");
                }
            });

            input.addEventListener("input", e => {
                input.setCustomValidity("");
            });
        });
    }

});