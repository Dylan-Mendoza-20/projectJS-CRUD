var url="http://localhost/js/";
var modal = new bootstrap.Modal(document.getElementById("modelId"), {keyboard:false});
var aplicacion = new function(){
    this.nombre = document.getElementById("nombre");
    this.correo = document.getElementById("correo");
    this.idEditar = document.getElementById("idEditar");
    this.nombreEditar = document.getElementById("nombreEditar");
    this.correoEditar = document.getElementById("correoEditar");
    this.empleados=document.getElementById("empleados");
    this.leer = function (){
        var datos = "";
        fetch(url)
        .then(r=>r.json())
        .then((respuesta)=>{

            respuesta.map(
                function(empleado, index, array){
                    datos += "<tr>";
                    datos += "<td>" + empleado.id + "</td>";
                    datos += "<td>" + empleado.nombre + "</td>";
                    datos += "<td>" + empleado.correo + "</td>";
                    datos += '<td> <div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-info" onclick="aplicacion.Editar('+empleado.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="aplicacion.Borrar('+empleado.id+')">Borrar</button></td>';
                    datos += "</tr>"
                }
            );
            return this.empleados.innerHTML = datos;
            console.log(respuesta);
        })
        .catch(console.log);
        // datos="<tr><td>1</td><td>Oscar</td><td>esofp@gmail.com</td><td>Editar | Borrar</td></tr>";
        return this.empleados.innerHTML=datos;
    };
    this.agregar = function(){
        console.log(nombre.value);
        console.log(correo.value);
        var datosEnviar = {nombre: this.nombre.value, correo: this.correo.value}
        fetch(url + "?insertar=1", {method:"POST", body: JSON.stringify(datosEnviar)})
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            console.log("DATOS INSERTADOS");
            this.leer();
            this.clear();
        })
        .catch(console.log);
    };
    this.Borrar = function (id) {
        console.log(id);

        fetch(url + "?borrar=" + id)
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            console.log("Resgistro elimindo " + id);
            this.leer();
        })
        .catch(console.log);
    }
    this.Editar = function (id) {
        console.log(id);
        fetch(url + "?consultar=" + id)
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.nombreEditar.value=datosRespuesta[0]["nombre"];
            this.idEditar.value=datosRespuesta[0]["id"];
            this.correoEditar.value=datosRespuesta[0]["correo"];
        })
        .catch(console.log);
        modal.show();
    }
    this.Actualizar = function () {
        console.log("Actualizar");
        var datosEnviar = {id: this.idEditar.value, nombre: this.nombreEditar.value, correo: this.correoEditar.value}
        fetch(url + "?actualizar=1", {method:"POST", body: JSON.stringify(datosEnviar)})
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            console.log("DATOS MODIFICADOS");
            this.leer();
            modal.hide();
        })
        .catch(console.log);
    }
    this.clear = function () {
        this.nombre.value="";
        this.correo.value="";
    }
}
aplicacion.leer();