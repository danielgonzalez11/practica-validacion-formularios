<?php
header('Access-Control-Allow-Origin: *');
$CP = trim($_REQUEST['cp']);
$PoM = trim($_REQUEST['PoM']);
//sleep(2);
//usleep(150000);

/*
$usuarioBD ="root";
$pass ="root";
$host = "localhost";
$bd = "provincias";*/

$usuarioBD ="danielgonzalez_d";
$pass ="danielgonzalez11";
$host = "localhost";
$bd = "danielgonzalez_provincias";
       
$conexion = new mysqli($host,$usuarioBD,$pass,$bd);
$conexion->set_charset("utf8");
//Hacemos una consulta a ver si el usuario existe
	if ($conexion->connect_errno){
		echo ("Se ha producido un error conectado a la base de datos ".$conexion->connect_error);
	    return null;
	 }
	$consulta = $conexion->stmt_init();
	if($PoM == "Provincia"){
			$sentencia="select p.Provincia from t_municipios as m,t_provincias as p where m.CodPostal= ? and m.CodProv=p.CodProv";
			$consulta->prepare($sentencia);
			//Pasamos los parámetros con param
			$consulta->bind_param("i",$CP);
			$consulta->execute();
			$consulta->bind_result($p);
			$valid = "";
			if($consulta->fetch())
			{
			 	$valid= $p;
			 	echo $valid;
			}    

		}
	else{
			$sentencia="select m.Municipio from t_municipios as m,t_provincias as p where m.CodPostal= ? and m.CodProv=p.CodProv";
			$consulta->prepare($sentencia);
			//Pasamos los parámetros con param
			$consulta->bind_param("i",$CP);
			$consulta->execute();
			$consulta->bind_result($m);
			$valid = array();
			$i=0;
			while($consulta->fetch())
			{
			 	$valid[$i]= $m;
			 	$i++;
			}    
			echo json_encode($valid);
	}
?>