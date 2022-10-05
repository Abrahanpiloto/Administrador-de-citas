//Variables
const mascotaImput = document.querySelector("#mascota");  // 1
const propietarioImput = document.querySelector("#propietario");
const telefonoImput = document.querySelector("#telefono");
const fechaImput = document.querySelector("#fecha");
const horaImput = document.querySelector("#hora");
const sintomasImput = document.querySelector("#sintomas");

const formulario = document.querySelector("#nueva-cita");

const contenedorCitas = document.querySelector("#citas");

let editando;

//Clases

class Citas {       //5
    constructor () {
        this.citas = [];
        
    }

    agregarCita(cita) {  //10
        this.citas = [...this.citas, cita];
        // console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
    
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

class UI {  //6
    
    imprimirAlerta(mensaje, tipo) {
        //crea el div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12");
        
        //agregar clase en base al tipo de error
        if(tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } 
        
        else {
            divMensaje.classList.add("alert-success");
        }
    
        //mensaje de error
        divMensaje.textContent = mensaje;

        //agrega al DOM
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        //quita la alert despues de 5 seg
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);



    }   
    
    imprimirCitas({citas}) {   //13.1

        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono,fecha, hora, sintomas, id} = cita;
    
            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            divCita.dataset.id = id;
         
            //Scripting de los elementos de la cita:

            const mascotaParrafo = document.createElement("h2");
            mascotaParrafo.classList.add("card-title", "font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("p");
            propietarioParrafo.innerHTML = `
                <span class = "font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement("p");
            telefonoParrafo.innerHTML = `
                <span class = "font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement("p");
            fechaParrafo.innerHTML = `
                <span class = "font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement("p");
            horaParrafo.innerHTML = `
                <span class = "font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement("p");
            sintomasParrafo.innerHTML = `
                <span class = "font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //crea el boton eliminar:   // 14
            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger", "mr-2");
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>'

            btnEliminar.onclick = () => eliminarCita(id);

            //crea boton pa editar cita  //16
            const btnEditar = document.createElement("button");
            btnEditar.classList.add("btn", "btn-primary");
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>';

            btnEditar.onclick = () => cargarEdicion(cita);  //17

            //agrega los parrafos al divCita
            
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            divCita.appendChild(btnEliminar);  //14.1

            divCita.appendChild(btnEditar);  // 16.1

            //agrega las citas al HTML
            contenedorCitas.appendChild(divCita);

        })
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

//Instancias (de tipo globales)

const ui = new UI();  //6.1
const administrarCitas = new Citas();  //5.1


//Eventos
eventListeners();
function eventListeners () {      // 2
    mascotaImput.addEventListener("change", datosCita);
    propietarioImput.addEventListener("change", datosCita);
    telefonoImput.addEventListener("change", datosCita);
    fechaImput.addEventListener("change", datosCita);
    horaImput.addEventListener("change", datosCita);
    sintomasImput.addEventListener("change", datosCita);

    formulario.addEventListener("submit", nuevaCita);

}


 //Objeto con informacion de la cita
const citaObj = {      // 3
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}


//Funciones

//Agrega los datos al objeto cita (citaObj) // 4
function datosCita (e) {  
    citaObj[e.target.name] = e.target.value;
    // console.log(citaObj);
}


//valida y agrega una nueva cita a la clase de citas  //7
function nuevaCita (e) {      
    e.preventDefault();
    // extraer la informacion del objeto de cita
    const {mascota, propietario, telefono,fecha, hora, sintomas} = citaObj;

    //Validacion
    if(mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");

        return;
    }

    if(editando) {
        ui.imprimirAlerta("Editado correctamente");

        //pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        //regresa el texto del boton a su estado original:
        formulario.querySelector("button[type='submit']").textContent = "Crear Cita";

        //quitar modo edicion
        editando = false;

    } else {
    //genera un id unico //8
    citaObj.id = Date.now();

    //creando una nueva cita  administrarCitas contiene el arreglo con las citas//9
    administrarCitas.agregarCita({...citaObj});

    //mensaje agregado correctamente
    ui.imprimirAlerta("Se agregó correctamente");
    }
 

    //reinicia el formulario //11
    formulario.reset();

    //reinicia el objeto citaObj  //12.1
    reiniciarObj ();

    //muestra el HTML de las citas  //13
    ui.imprimirCitas(administrarCitas);



}

//funcion que reinicia el objeto citaObj  // 12
function reiniciarObj () {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}



function eliminarCita(id) { //15
    //eliminar cita
    administrarCitas.eliminarCita(id);

    //muestra un mensaje 
    ui.imprimirAlerta("Cita eliminada correctamente");

    //refresca las citas
    ui.imprimirCitas(administrarCitas);
}

//Carga los datos y el modo edicion  //17.1
function cargarEdicion (cita) {
    const {mascota, propietario, telefono,fecha, hora, sintomas, id} = cita;

    //llena los inputs
    mascotaImput.value = mascota;
    propietarioImput.value = propietario;
    telefonoImput.value = telefono;
    fechaImput.value = fecha;
    horaImput.value = hora;
    sintomasImput.value =sintomas;

    //llena el objeto para q no aparezca el msj de todos los campos obligatorios
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //cambia el texto del boton
    formulario.querySelector("button[type='submit']").textContent = "Guardar Cambios";

    editando = true;
}