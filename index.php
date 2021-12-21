<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Autorization, X-Requested-With");

// Conexion a la base de datos con usuario, contrasenia y nombre de la base de datos
$servidor = "localhost";
$usuario = "root";
$contrasenia = "123456";
$nombreBD = "prue_empleados";
$conexion = new mysqli($servidor, $usuario, $contrasenia, $nombreBD);

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])) {
    $sqlEmpleados = mysqli_query($conexion, "SELECT * FROM empleados WHERE id=" . $_GET["consultar"]);
    if (mysqli_num_rows($sqlEmpleados) > 0) {
        $empleados = mysqli_fetch_all($sqlEmpleados, MYSQLI_ASSOC);
        echo json_encode($empleados);
        exit();
    }else{
        echo json_encode(["success" => 0]);
    }
}

// Borrar pero se le debe de enviar una clave (para borrar esa dato)
if (isset($_GET["borrar"])) {
    $sqlEmpleados = mysqli_query($conexion, "DELETE FROM empleados WHERE id=" . $_GET["borrar"]);
    if ($sqlEmpleados) {
        echo json_encode(["success" => 1]);
        exit();
    }else{
        echo json_encode(["success" => 0]);
    }
}

// Inserta un nuevo resgistro y recepciona en metodo post los datos de nombre y correo
if (isset($_GET["insertar"])) {
    $data = json_decode(file_get_contents("php://input"));
    $nombre = $data -> nombre;
    $correo = $data -> correo;
    if (($correo != "") && ($nombre != "")) {
        $sqlEmpleados = mysqli_query($conexion, "INSERT INTO empleados(nombre, correo) VALUES('$nombre', '$correo')");
        echo json_encode(["success" => 1]);
    }
    exit();
}

// Actualizar datos pero recepciona datos de nombre, correo y una clave para realizar la actualizacion
if (isset($_GET["actualizar"])) {
    $data = json_decode(file_get_contents("php://input"));
    $id = (isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre = $data -> nombre;
    $correo = $data -> correo;

    $sqlEmpleados = mysqli_query($conexion, "UPDATE empleados SET nombre='$nombre', correo='$correo' WHERE id='$id'");
    echo json_encode(["success" =>1]);
    exit();
}

// Consulta todos los registros de la tabla empleados
$sqlEmpleados = mysqli_query($conexion, "SELECT * FROM empleados");
if (mysqli_num_rows($sqlEmpleados)>0) {
    $empleados = mysqli_fetch_all($sqlEmpleados, MYSQLI_ASSOC);
    echo json_encode($empleados);
}else{
    echo json_encode(["success" => 0]);
}

?>