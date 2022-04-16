let MostrasDatos=`
<div id="div-01">
<div class="col-3">
<h2>Lista de Productos ingresados</h2>            
<table class="table" id="myTabla">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Kilos</th>
      <th>Precio</th>
    </tr>
  </thead>
  <tbody>
   
  </tbody>
</table>

<input type="button" value="  Pagina Principal  " id="idregresar" class="btn btn-primary unboton">
</div>
</div>`;

$(document).ready(function(){
  
    //verificar si ahy una seccion abierta para continuar con el mismo
    var usuario = sessionStorage.getItem('usuario');
    var password = sessionStorage.getItem('password');
    
    // if (usuario!=null && password!=null) {
    //    // document.body.innerHTML=PaginaCargaDatos;
    //   // document.getElementById(".idcontainer").innerHTML = PaginaCargaDato;
    //    //$(".container").html(PaginaCargaDatos);
    //    $(".container").empty();
    //    $(".container").append(PaginaCargaDatos);

    // }
    
    $("#idsubmit").click(function (e) { 
        // tomo los datos
 
     let formulario=$("#idformulario").serialize();

     
   
     
    if ( ValidarCampos()==true ) {
        
        EscribirProducto(formulario);
        e.preventDefault();
        $("#idformulario")[0].reset(); 
      
    }else{
        enviarAlerta("Debe ingresar datos validos",'warning');

    }



    });
    var contenedor = document.getElementById("div-01");

    

  
    //soluciona el problema de no agregar el evento al DOM
    $('body').on('click', '#idListar', function () { 
    
    
        //contenedor.remove();
        
        
        // document.body.innerHTML=PaginaCargaDatos;
       // document.getElementById(".idcontainer").innerHTML = MostrasDatos;
        $(".container").empty();
         $(".container").append(MostrasDatos);
        //$(".container").html(MostrasDatos);
        //trae de la base de datos todos lo productos cargados
        LeerProductos();

    });
    
    //soluciona el problema de no agregar el evento al DOM
    $('body').on('click', '#idregresar', function () { 
       
        
        //contenedor.remove();
       // document.body.innerHTML=PaginaCargaDatos;
       // document.getElementById(".idcontainer").innerHTML = PaginaCargaDato;

        //$(".container").html(PaginaCargaDatos);
    //    $(".container").empty();
    //    $(".container").append(PaginaCargaDatos);

       //redirigir pagina
       window.location.href = 'ingresdedatos.html';

    });


    //ingresar contraseña
    $('body').on('click', '#idBotonPassword', function (e) { 
       
        let formulario=$("#idformulario").serialize();


        
        //verificar password
        //si esta bien enviar a pagina principla
        //solicitar ingresar nuevamente
        //let permitir=EnviarVerificarUsuario(formulario);
        

        //console.log(RecordarUsuario);
       
         EnviarVerificarUsuario(formulario);
       
    });




});




function ValidarCampos(){
    
    
    var x = $("form").serializeArray();
    
    //console.log(x[0].value);

    let nombre= x[0].value;
    let kilos=parseInt(x[1].value);
    let precio=parseInt(x[2].value);
   
    console.log(typeof(kilos));
    
    if (typeof kilos === 'number' && typeof precio === 'number' &&
        kilos>0 && precio >0 &&
        nombre.length >4 ) {
        return true;
    }else{
        
        return false;
    }
}


function LeerProductos(){
    $.ajax({
        type: "POST",
        url: "LeerProductos.php",
        contentType: "application/json; charset=utf-8",
        data: null,
        dataType: "json",
        success: function (result) {
       $.each(result, function () {
       //$('#table').append($("<tbody></tbody>>").attr("value",
       //this.idempleado).text(this.apellido));
      $("#myTabla").append("<tr><th>"+this.nombre+"</th> <th>"+this.kilos+"</th> <th>"+this.precio+"</th></tr>");
       });
       },
       error: function (xhr, status, error) {
        enviarAlerta("Error en la conexion",'success');
       }
       });
}


function EscribirProducto(formulario){
    $.ajax({
        type: "POST",
        url: "AgregarProductos.php",
        //contentType: "aplication/json; charset=utf-8",
        data: formulario,
        //dataType: "json",
        success: function(resultado){
           
           enviarAlerta(resultado,'success');
            console.log("pasooo");
           
        },
        error: function(xhr, status, error){
 
            enviarAlerta("Error en la conexion",'success');
            console.log("pasooo error");
     
        }
        
    });
}


function EnviarVerificarUsuario(formulario){
    $.ajax({
        type: "POST",
        url: "VerificarUsuario.php",
        //contentType: "aplication/json; charset=utf-8",
        data: formulario,
        //dataType: "json",
        success: function(resultado){
           
            //console.log(typeof(resultado));
           if (resultado==="1") {
            var RecordarUsuario= $("#idUser").val();
            var RecordarPassword= $("#idPassword").val();
            sessionStorage.setItem("usuario", RecordarUsuario);
            sessionStorage.setItem("password", RecordarPassword);
            $("#idformulario")[0].reset();

        //     // document.body.innerHTML=PaginaCargaDatos;
        //     //document.getElementById(".idcontainer").innerHTML = PaginaCargaDato;
        //     $(".container").empty();
        //     $(".container").append(PaginaCargaDatos);
        //   //  $(".container").html(PaginaCargaDatos);
        window.location.href = 'ingresdedatos.html';

            return true;
           }
           $("#idformulario")[0].reset();
           enviarAlerta("Password Incorrecta",'warning');
           return false;
           

           
        },
        error: function(xhr, status, error){
            $("#idformulario")[0].reset();
            enviarAlerta("Password Incorrecta",'warning');
            return false;
           
     
        }
        
    });
}


//funcion enviar alertas
function enviarAlerta(mensaje, color) {

    $("#idalerta").append(`<div class="alert alert-${color} alert-dismissible fade show" role="alert">${mensaje}</div>`)

setTimeout(() => {
    $("#idalerta").empty()
}, 4000);


}