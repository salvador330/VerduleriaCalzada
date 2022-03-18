$(document).ready(function(){

    //verificar si ahy una seccion abierta para continuar con el mismo
    var usuario = sessionStorage.getItem('usuario');
    var password = sessionStorage.getItem('password');

    if (usuario!=null && password!=null) {
        $(".container").html(PaginaCargaDatos);
    }
    
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
        $(".container").html(MostrasDatos);
        //trae de la base de datos todos lo productos cargados
        LeerProductos();

    });
    
    //soluciona el problema de no agregar el evento al DOM
    $('body').on('click', '#idregresar', function () { 
       
        
        //contenedor.remove();
        $(".container").html(PaginaCargaDatos);
       

    });


    //ingresar contraseña
    $('body').on('click', '#idBotonPassword', function (e) { 
       
        let formulario=$("#idformulario").serialize();


        
        //verificar password
        //si esta bien enviar a pagina principla
        //solicitar ingresar nuevamente
        //let permitir=EnviarVerificarUsuario(formulario);
        var RecordarUsuario= $("#idUser").val();

        //console.log(RecordarUsuario);
       
        if ( EnviarVerificarUsuario(formulario)==true ) {
        
          
            //e.preventDefault();
            $("#idformulario")[0].reset();
            //$(".container").html(PaginaCargaDatos); 
          
            
            
            //sessionStorage.setItem("usuario", RecordarUsuario);
           

        }else{
            enviarAlerta("Password Incorrecta",'warning');
    
        }

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

           
        },
        error: function(xhr, status, error){
 
            enviarAlerta("Error en la conexion",'success');
     
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

            $(".container").html(PaginaCargaDatos); 
           }
           return false;

           
        },
        error: function(xhr, status, error){
 
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

let PaginaCargaDatos=`
<br>
                <div class="form-group row-6">
                    <div class="col-3">
                    <form action="" id="idformulario" method="POST" >
  
                        <form action="" id="idformulario" method="POST">
                            <div class="form-group">
                             <label for="ProductoNombre" id="idNombre" > Nombre:</label>              
                             <input type="text" id="idDescripcion"  name="nombreProducto" minlength="4" autocomplete="off"  required>
                            </div>
                           
                            <div class="form-group">
                              <label for="ProductoKilos" id="idKilos" > Kilos:</label><br>
                              <input type="number" id="idDescripcion"  name="pesoKilos" min="1" autocomplete="off"  required>
                            </div>
                   
                            <div class="form-group">
                               <label for="ProductoKilos" id="idPrecio" > Precio:</label><br>
                               <input type="number" id="idDescripcion"  name="pesoPrecio" min="1" autocomplete="off"  required>
                            </div>   
                            <div class="btn-group">
                               <input type="submit" value="    Alta   " id="idsubmit" class="btn btn-primary unboton">
                               <input type="button" value="    Listar   " id="idListar" class="btn btn-primary unboton">
                            </div>
                          </form>
                           
                    </form>
                    </div>
                </div>`;

let MostrasDatos=`

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
`;

let IngresoPassword=`
<br>
<div class="form-group row-6">
<div class="col-3">
<form action="" id="idformulario" method="POST" >

    <form action="" id="idformulario" method="POST">
        <div class="form-group">
            <label> Usuario:</label>              
            <input type="text" id="idUser"  name="usuario" minlength="4" autocomplete="off"  required>
        </div>
        
        <div class="form-group">
            <label> Contraseña:</label><br>
            <input type="password" id="idPassword"  name="contraseña" min="1" autocomplete="off"  required>
        </div>  
        <div class="btn-group">
            <input type="button" value="    Ingresar   " id="idBotonPassword" class="btn btn-primary unboton">
        </div>
        </form>
        
</form>
`;