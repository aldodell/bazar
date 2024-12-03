<?php

/**
 * Bazar PHP Server
 */

//include("../Kicsy/KMessageClass.php");
//include("../Kicsy/KMySQL.php");

//User
$user = "bazar";
$password = "bazar2024.";
$databaseName = "bazar";

//Connect to database
$database = new PDO("mysql:host=localhost;dbname=$databaseName", $user, $password);


//Convert json to object
$message = json_decode($_POST["message"], false);


switch ($message->action) {
    case "login":
        $sql = "select * from usuarios where cedula = ? and email = ?";
        $statement = $database->prepare($sql);
        $statement->execute(array($message->payload->cedula, $message->payload->email));
        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            echo json_encode($row);
        } else {
            echo "ERROR_USER_NOT_FOUND";
        }
        break;

    case "submitOrder":
        try {
            $sql = "insert into ordenes (cedulaEmprendedor, monto) values (?,?)";
            $statement = $database->prepare($sql);
            $statement->execute(array($message->payload->cedula, $message->payload->monto));

            $sql = "SELECT id FROM ordenes WHERE cedulaEmprendedor = ? ORDER BY id DESC LIMIT 1";
            $statement = $database->prepare($sql);
            $statement->execute(array($message->payload->cedula));
            $row = $statement->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $order = json_encode($row);
                echo $order;
            } else {
                echo "ERROR";
            }

        } catch (Exception $e) {
            echo "ERROR";
        }

        break;

    case "getOrders":
        try {
            $cedula = $message->payload->cedula;
            //$lastId = $message->payload->orderId;
            $sql = "select * from ordenes where cedulaEmprendedor = ? order by id desc";
            $statement = $database->prepare($sql);
            $statement->execute(array($cedula));
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            echo "ERROR";
        }
        break;

    case "getAllOrders":
        try {
            $sql = "select * from ordenes order by id desc";
            $statement = $database->prepare($sql);
            $statement->execute();
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            echo "ERROR";
        }
        break;

    case "markOrderAsPaid":
        try {
            $sql = "update ordenes set cancelado = 1, fechaHoraPago = now(),  bolivares = ?, dolares = ? where id = ?";
            $statement = $database->prepare($sql);
            $statement->execute(array($message->payload->bolivares, $message->payload->dolares, $message->payload->id));
            echo "OK";
        } catch (Exception $e) {
            echo "ERROR";
        }
        break;

    case "getAllUsers":
        try {
            $sql = "select concat(apellidos,', ',nombres) as label, cedula as value from usuarios order by apellidos,nombres desc";
            $statement = $database->prepare($sql);
            $statement->execute();
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            echo "ERROR";
        }
        break;
}
