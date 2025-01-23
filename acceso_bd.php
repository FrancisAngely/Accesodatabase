<?php
try {
    $dsn = 'mysql:host=localhost;port=3306;dbname=empresax';
    $usuario = 'root';
    $contrasena = "";

    $con = new PDO($dsn, $usuario, $contrasena);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica si se recibió una solicitud GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtiene el nombre de la tabla de la consulta GET
        $tabla = $_GET['tabla'];

        // Lista de tablas permitidas
        $tablas_permitidas = ['centros', 'departamentos', 'empleados'];

        // Verifica si la tabla solicitada está en la lista de tablas permitidas
        if (in_array($tabla, $tablas_permitidas)) {
            // Prepara y ejecuta la consulta para obtener los datos de la tabla seleccionada
            $sql = "SELECT * FROM " . $tabla;
            $stmt = $con->prepare($sql);
            $stmt->execute();

            // Obtiene todos los resultados
            $resultset = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Devuelve los resultados en formato JSON
            echo json_encode($resultset);
        } else {
            // Si la tabla no está permitida, devuelve un mensaje de error
            echo json_encode(["error" => "Tabla no permitida"]);
        }
    } else {
        // Si no es una solicitud GET, devuelve un mensaje de error
        echo json_encode(["error" => "Método no permitido"]);
    }
} catch (PDOException $e) {
    // Manejo de errores
    echo json_encode(["error" => $e->getMessage()]);
}
