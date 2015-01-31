<?php
$email = trim($_REQUEST['NIF']);
//sleep(2);
//usleep(150000);
$usuarioBD ="root";
$pass ="root";
$host = "localhost";
$bd = "usuario";
       
$conexion = new mysqli($host,$usuarioBD,$pass,$bd);
//Hacemos una consulta a ver si el usuario existe
	if ($conexion->connect_errno){
		echo ("Se ha producido un error conectado a la base de datos ".$conexion->connect_error);
	    return null;
	 }
	$consulta = $conexion->stmt_init();
	$sentencia="Select NIF from NIFS where NIF = ? ";
	$consulta->prepare($sentencia);
	//Pasamos los parámetros con param
	$consulta->bind_param("s",$email);
	$consulta->execute();
	$valid = 'true';
	if($consulta->fetch())
	{
	 	$valid= 'NIF ya en uso';
	}    

echo $valid;
?>