-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50) NOT NULL UNIQUE,
    psw VARCHAR(255) NOT NULL
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS puntuaciones (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL UNIQUE,

    TiempoTexto_intento1 INT DEFAULT NULL,
    TiempoTexto_intento2 INT DEFAULT NULL,
    TiempoTexto_intento3 INT DEFAULT NULL,
    TiempoTexto_mejor INT DEFAULT NULL,

    CuentaLetras_intento1 INT DEFAULT NULL,
    CuentaLetras_intento2 INT DEFAULT NULL,
    CuentaLetras_intento3 INT DEFAULT NULL,
    CuentaLetras_mejor INT DEFAULT NULL,

    Sudoku_intento1 INT DEFAULT NULL,
    Sudoku_intento2 INT DEFAULT NULL,
    Sudoku_intento3 INT DEFAULT NULL,
    Sudoku_mejor INT DEFAULT NULL,

    Punteria_intento1 INT DEFAULT NULL,
    Punteria_intento2 INT DEFAULT NULL,
    Punteria_intento3 INT DEFAULT NULL,
    Punteria_mejor INT DEFAULT NULL,

    FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;