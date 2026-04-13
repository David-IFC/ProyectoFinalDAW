document.addEventListener("DOMContentLoaded", () => {

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