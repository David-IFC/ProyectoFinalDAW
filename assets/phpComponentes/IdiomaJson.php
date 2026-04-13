<?php
// Cargar JSON según el idioma
$json_file = __DIR__ . "/../json/$lang.json";
$texto = json_decode(file_get_contents($json_file), true);

?>