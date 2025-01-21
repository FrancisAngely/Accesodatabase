<?php
try {
    $dsn = 'mysql:host=localhost;dbname=empresax';
    $usuario = 'root';
    $contrasena = "";

    $con = new PDO($dsn, $usuario, $contrasena);

    $sql = "SELECT * FROM departamentos";
    $stmt = $con->prepare($sql);
    $stmt->execute();

    $resultset = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($resultset);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
