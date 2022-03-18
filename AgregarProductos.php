<?php

require_once("./db.php");

    //debo agregar localidades a un municipip

    //obtengo el id de municipio

    //en localidad agrego nombre con id de municipio
    $nombreProducto=$_POST["nombreProducto"];
    $pesoKilos=$_POST["pesoKilos"];
    $pesoPrecio=$_POST["pesoPrecio"];
 
    if (isset($_POST["nombreProducto"]) && isset($_POST["pesoKilos"]) && $_POST["pesoPrecio"])   {
 
        //escribo en la base
  
        Escribir("INSERT INTO `Productos`(`nombre`, `kilos`, `precio`) VALUES ('$nombreProducto',$pesoKilos,$pesoPrecio)");
        
        echo "guardo Producto con exito";
    
    }else{
        echo "error en al grabar Producto";
    
    }


?>