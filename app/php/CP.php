<?php
$CP = trim($_GET['cp']);
$PoM = trim($_GET['PoM']);
//sleep(2);
//usleep(150000);
$usuarioBD ="root";
$pass ="root";
$host = "localhost";
$bd = "provincias";
       
$conexion = new mysqli($host,$usuarioBD,$pass,$bd);
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
			}   $i++; 
	}


echo $valid;
?>