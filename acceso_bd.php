<?php
header('Content-Type: application/json');

$log_file = 'log.txt';

try {
    $con = new PDO("mysql:host=localhost;port=3307;dbname=empresax", "root", "");
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    file_put_contents($log_file, "Método recibido: " . $_SERVER['REQUEST_METHOD'] . PHP_EOL, FILE_APPEND);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $tabla = $_GET['tabla'] ?? '';
        file_put_contents($log_file, "GET solicitado para tabla: $tabla" . PHP_EOL, FILE_APPEND);

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
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $accion = $_POST['accion'] ?? '';
        file_put_contents($log_file, "POST solicitado con acción: $accion" . PHP_EOL, FILE_APPEND);

        if ($accion === 'add_department') {
            $stmt = $con->prepare("SELECT MAX(Numero) AS max_dept_number FROM departamentos");
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $new_dept_number = ($row['max_dept_number'] ?? 0) + 1;
            $director_id = $_POST['Director'] ?? null;
            $dept_head_id = $_POST['Depto_jefe'] ?? null;
            $centro = $_POST['tipoCentro'] ?? null;
            $presupuesto = $_POST['Presupuesto'] ?? null;
            $nombre = $_POST['Nombre'] ?? null;
            $Tipo_dir = $_POST['Tipo_dir'] ?? null;

            if (empty($director_id) || empty($centro) || empty($presupuesto) || empty($nombre) || empty($Tipo_dir)) {
                file_put_contents($log_file, "Faltan campos obligatorios" . PHP_EOL, FILE_APPEND);
                echo json_encode(["error" => "Todos los campos son obligatorios, excepto Depto_jefe."]);
                exit;
            }

            if (!is_numeric($dept_head_id)) {
                $dept_head_id = null;
            }

            $sql = "INSERT INTO departamentos (Numero, Centro, Director, Tipo_dir, Presupuesto, Depto_jefe, Nombre) 
            VALUES (:new_dept_number, :centro, :director_id, :Tipo_dir, :presupuesto, :dept_head_id, :nombre)";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':new_dept_number', $new_dept_number, PDO::PARAM_INT);
            $stmt->bindParam(':centro', $centro, PDO::PARAM_STR);
            $stmt->bindParam(':director_id', $director_id, PDO::PARAM_STR);
            $stmt->bindParam(':Tipo_dir', $Tipo_dir, PDO::PARAM_STR);
            $stmt->bindParam(':presupuesto', $presupuesto, PDO::PARAM_INT);
            $stmt->bindParam(':dept_head_id', $dept_head_id, is_null($dept_head_id) ? PDO::PARAM_NULL : PDO::PARAM_INT);
            $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);

            if ($stmt->execute()) {
                file_put_contents($log_file, "Departamento añadido correctamente" . PHP_EOL, FILE_APPEND);
                echo json_encode(["success" => "Nuevo departamento añadido exitosamente"]);
            } else {
                $error = $stmt->errorInfo();
                file_put_contents($log_file, "Error al añadir: " . $error[2] . PHP_EOL, FILE_APPEND);
                echo json_encode(["error" => "Error al añadir el departamento: " . $error[2]]);
            }
        } elseif ($accion === 'search_employees') {
            $search_dept = $_POST['search_dept'] ?? null;

            if (!$search_dept) {
                echo json_encode(["error" => "No se proporcionó el ID del departamento."]);
                exit;
            }

            $sql = "SELECT Nombre, Telefono, Salario FROM empleados WHERE Departamento = :search_dept";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':search_dept', $search_dept, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $resultset = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($resultset);
            } else {
                $error = $stmt->errorInfo();
                echo json_encode(["error" => "Error al buscar empleados: " . $error[2]]);
            }
        } else {
            echo json_encode(["error" => "Acción no válida"]);
        }
    } else {
        echo json_encode(["error" => "Método no permitido"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}