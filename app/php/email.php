<?php
header('Access-Control-Allow-Origin: *');
$email = trim($_REQUEST['Email']);
//sleep(2);
//usleep(150000);

/*
$usuarioBD ="root";
$pass ="root";
$host = "localhost";
$bd = "usuario";*/

$usuarioBD ="danielgonzalez_d";
$pass ="danielgonzalez11";
$host = "localhost";
$bd = "danielgonzalez_usuario";
       
$conexion = new mysqli($host,$usuarioBD,$pass,$bd);
$conexion->set_charset("utf8");
//Hacemos una consulta a ver si el usuario existe
	if ($conexion->connect_errno){
		echo ("Se ha producido un error conectado a la base de datos ".$conexion->connect_error);
	    return null;
	 }
	$consulta = $conexion->stmt_init();
	$sentencia="Select email from emails where email = ? ";
	$consulta->prepare($sentencia);
	//Pasamos los parámetros con param
	$consulta->bind_param("s",$email);
	$consulta->execute();
	$valid = 'true';
	if($consulta->fetch())
	{
	 	$valid= 'false';
	}    


echo $valid;
?>