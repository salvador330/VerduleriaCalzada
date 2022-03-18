<?php

require_once("./db.php");

    // user/password harcodeada
    $UserHardCodeado="scirino";
    $PasswordHardCodeada="123";


    $usuario=$_POST["usuario"];
    $contrasena=$_POST["contrasena"];

 
    if (isset($_POST["usuario"]) && isset($_POST["contrasena"]) &&
        $usuario===$UserHardCodeado && $contrasena===$PasswordHardCodeada
    )   {
 
        //verifico password ok
  
        
        
        print_r(1);
    
    }else{
        print_r(0);
    
    }


?>