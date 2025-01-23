<?php
try {
    $con= new PDO(dsn:"mysql:host=localhost;dbname=empresax", username:"root", password:"");
   
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $tabla = $_GET['tabla'];

        $tablas_permitidas = ['centros', 'departamentos', 'empleados'];

        if (in_array($tabla, $tablas_permitidas)) {
            $sql = "SELECT * FROM " . $tabla;
            $stmt = $con->prepare($sql);
            $stmt->execute();

            $resultset = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($resultset);
        } else {
            echo json_encode(["error" => "Tabla no permitida"]);
        }
    } else {
        echo json_encode(["error" => "Método no permitido"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
