const urlVentas = "https://backend-carrito-filb.vercel.app/ventas/obtener"
const urlClientes = "https://backend-carrito-filb.vercel.app/clientes/obtener"
const urlPV = "https://backend-carrito-filb.vercel.app/paqueteDeViajes/obtener"
const urlVS = "https://backend-carrito-filb.vercel.app/viajes/obtener"

///const urlAutos = "https://backend-carrito-filb.vercel.app/autos/obtener" AUTOS TODAVIA NO ESTA SUBIDA
////const urlExc = "https://backend-carrito-filb.vercel.app/excursiones/obtener" EXCURSIONES TODAVIA NO ESTA SUBIDA


const vsEliminar = "https://backend-carrito-filb.vercel.app/viajes/eliminar"

const inputVentas = document.getElementById("buscadorVentas")
const contenedorVentas = document.querySelector(".contenedorVentas")

const inputClientes = document.getElementById("buscadorClientes")
const contenedorClientes = document.querySelector(".contenedorClientes")

const inputPV = document.getElementById("buscadorPV")
const contenedorPV = document.querySelector(".contenedorPV")

const inputVS = document.getElementById("buscadorVS")
const contenedorVS = document.querySelector(".contenedorVS")

const inputAuto = document.getElementById("buscadorAuto")
const contenedorAuto = document.querySelector(".contenedorAuto")

const inputExc = document.getElementById("buscadorExc")
const contenedorExc = document.querySelector(".contenedorExc")

const formularioPV = document.querySelector(".formPV")
const formularioVS = document.querySelector(".formVS")
const formularioAutos = document.querySelector(".formAuto")
const formularioExcursion = document.querySelector(".formExc")

const resultado = document.getElementById("resultadoCarga")

document.addEventListener("DOMContentLoaded", async () => {

  if (sessionStorage.getItem("logueado") !== "true") {
    window.location.href = "login.html"
  }

  try {
    const res1 = await fetch(urlVentas)
    const data1 = await res1.json()


    const res2 = await fetch(urlClientes)
    const data2 = await res2.json()

    const res3 = await fetch(urlPV)
    const data3 = await res3.json()
    
    const res4 = await fetch(urlVS)
    const data4 = await res4.json()

    ///const res5= await fetch(urlAutos)
    ///const data5 = await res5.json() 

    ///const res6 = await fetch(urlExc)
    //const data6 = await res6.json()

    const ventas = data1.flat() ///Para sacar los diccionarios de la lista en la que estan y ahorrarme recorrerlos
    console.log(ventas)

    const clientes = data2.flat()
    console.log(clientes)

    const PVs = data3.flat()
    console.log(PVs)

    const VSs = data4.flat()
    console.log(VSs)

    ///const autos = data5.flat()
    ///console.log(autos)

    ///const excursiones = data6.flat()
    //console.log(excursiones)

  function borrarRegistro(url, dicID){
  if(confirm(`Desea eliminar el registro con id ${Object.values(dicID)[0]}?`)){
      fetch(url,{

        method: 'POST',
        body: JSON.stringify(dicID),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data =>  {

        console.log(data)
        alert(data.mensaje || JSON.stringify(data))
        

    })
    .catch(error => {

      console.error("Ha ocurrido un error:", error)
      alert(error)

    })
  

  }

  


}


    function verExc(dicId, url, cont){

      fetch(url,{

        method: 'POST',
        body: JSON.stringify(dicId),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then( data =>  {
        ////Si no tiene excursiones me devuelve []
        cont.innerHTML = ""
        cont.innerHTML = `
          <h4 class="excursionesh3">Excursiones</h4>
        `
        console.log(data)
        alert(data.mensaje || JSON.stringify(data))
        excursiones = data.flat()
        
        if (data.length > 0){
            console.log("Tiene excursiones")
           

            excursiones.forEach(i =>{
              const divexc = document.createElement("div")
              divexc.innerHTML = `
              
              <p  class="p_excursion">Excursion id:  ${i["Excursion id"]}</p>
              <p  class="p_excursion">Nombre:  ${i["Nombre"]}</p>
              <p class="p_excursion">Descripcion:  ${i["Descripcion"]}</p>
              <p  class="p_excursion">Lugar:  ${i["Lugar"]}</p>
              <p  class="p_excursion">Inicio:  ${i["Inicio"]}</p>
              <p  class="p_excursion">Final:  ${i["Final"]}</p>
              
              
              `

              cont.appendChild(divexc)


            })
        }

        else {

          const divexc = document.createElement("div")
          divexc.innerHTML = `
          
          <p class="p_excursiones">No hay excursiones para este registro</p>
          
          `

        
          cont.appendChild(divexc)

        }
        

    })
    .catch(error => {

      console.error("Ha ocurrido un error:", error)
      alert(error)

    })

    }


    function vincularExc(){
      const vent = window.open("agregarExc/agregarEx.html", "excursiones", "width=700,height=600,top=100,left=200,resizable=yes,scrollbars=yes")
    }

    function mostrarVentas(ventas) {
      contenedorVentas.innerHTML = ""
      ventas.forEach(i => {
        const div = document.createElement("div")
        div.classList.add("info")

        div.innerHTML = 
        `
          <p>ID: ${i["Id Venta"]}</p>
          <p>Fecha: ${i["Fecha"]}</p>
          <p>Hora: ${i["Hora"]}</p>
          <p>Medio de pago: ${i["Medio de pago"]}</p>
          <p>Cuotas: ${i["Cuotas"] ? "Sí" : "No"}</p>
          <p>Cantidad: ${i["Cantidad"]}</p>
          <p>Código de viaje: ${i["Codigo de viaje"]}</p>
          <p>Tipo: ${i["Tipo"]}</p>
          <p>Precio: $${i["Precio"]}</p>
          
        `
        const btnEliminar = document.createElement("button")
        btnEliminar.classList.add("eliminarVenta", "eliminar")
        btnEliminar.textContent = "Eliminar registro"

        

        
        contenedorVentas.appendChild(div)
      })
    }

    

    function mostrarClientes(clientes){
      contenedorClientes.innerHTML = ""
      clientes.forEach(i =>{
        const div = document.createElement("div")
        div.classList.add("info")

        div.innerHTML = 
        `
          <p>ID: ${i["Usuario id"]}</p>
          <p>Nombre: ${i["Nombre"]}</p>
          <p>Apellido: ${i["Apellido"]}</p>
          <p>Contraseña: ${i["Contraseña"]}</p>
          <p>Email: ${i["Email"]}</p>
          
        `
        const btnEliminar = document.createElement("button")
        btnEliminar.classList.add("eliminarCliente", "eliminar")
        btnEliminar.textContent = "Eliminar registro"

        btnEliminar.dataset.id = i["Usuario id"] ///le creo un data id y le meto el id de su respectivo registro.
        btnEliminar.addEventListener("click", ()=>{
          const id = parseInt(btnEliminar.dataset.id) ///ver si esto trae el  valor realmente
          const dicId = {"uc_id":id}
          borrarRegistro("https://backend-carrito-filb.vercel.app/clientes/eliminar", dicId)
          
        })
      
        div.appendChild(btnEliminar)
        contenedorClientes.appendChild(div)


      })


    }



    function mostrarPVs(PVs){
      contenedorPV.innerHTML = ""
      PVs.forEach(i =>{
        const div = document.createElement("div")
        div.classList.add("info")

        div.innerHTML = 
        `
          <p>Codigo: ${i["Codigo"]}</p>
          <p>Nombre: ${i["Nombre"]}</p>
          <p>Precio: $${i["Precio"]}</p>
          <p>Origen: ${i["Origen"]}</p>
          <p>Destino: ${i["Destino"]}</p>
          <p>Estadia: ${i["Tipo"]}</p>
          <p>Destino: ${i["Descripcion"]}</p>
          <p>Cupos: ${i["Cupos"]}</p>
          <p>Duracion: ${i["Duracion"]}</p>
          <p>Tipo de viaje: ${i["Tipo_de_viaje"]}</p>
          <p>Fecha: ${i["Fecha"]}</p>
          <p>Hora: ${i["Hora"]}</p>
          <p>Estado: ${i["Estado"]}</p>
          
        `
        
        const verExcursiones = document.createElement("button")
        verExcursiones.classList.add("verExcursiones")
        verExcursiones.textContent = "Ver excursiones"
        
        verExcursiones.dataset.id = i["Codigo"]

        const excursionesDiv = document.createElement("div")
        
        div.appendChild(excursionesDiv)


      ////////////////  ACA ESTO Y TRABAJANDO ///////

        const agregarExc = document.createElement("button")
        agregarExc.classList.add("agregarExc")
        agregarExc.textContent = "Agregar excursion"
        agregarExc.dataset.id = i["Codigo"]

        div.appendChild(agregarExc)


        agregarExc.addEventListener("click", ()=>{
          vincularExc()
        })
        
        
        const btnEliminar = document.createElement("button")
        btnEliminar.classList.add("eliminarPV", "eliminar")
        btnEliminar.textContent = "Eliminar registro"

        btnEliminar.dataset.id = i["Codigo"] ///le creo un data id y le meto el id de su respectivo registro.

        verExcursiones.addEventListener("click", ()=>{
          const id = parseInt(verExcursiones.dataset.id)
          const dicId = {"pv_id": id}  
          excursionesDiv.classList.add("excursionesDiv")
          exc = verExc(dicId, "https://backend-carrito-filb.vercel.app/excursiones/obtenerPV", excursionesDiv)

          

        })

        btnEliminar.addEventListener("click", ()=>{
          const id = parseInt(btnEliminar.dataset.id )
          const dicId = {"codigoDeViaje": id}

          borrarRegistro("https://backend-carrito-filb.vercel.app/paqueteDeViajes/eliminar", dicId)
          
        })
      
        div.appendChild(verExcursiones)
        div.appendChild(btnEliminar)
        contenedorPV.appendChild(div)


      })


    }



    function mostrarVSs(VSs){
      contenedorVS.innerHTML = ""
      VSs.forEach(i =>{
        const div = document.createElement("div")
        div.classList.add("info")

        div.innerHTML = 
        `
          <p>Codigo: ${i["Codigo"]}</p>
          <p>Nombre: ${i["Nombre"]}</p>
          <p>Descripcion: ${i["Descripcion"]}</p>
          <p>Precio: $${i["Precio"]}</p>
          <p>Origen: ${i["Origen"]}</p>
          <p>Destino: ${i["Destino"]}</p>
          <p>Transporte: ${i["Transporte"]}</p>
          <p>Fecha: ${i["Fecha"]}</p>
          <p>Hora: ${i["Hora"]}</p>
          <p>Cupos: ${i["Cupos"]}</p>
          <p>Duracion: ${i["Duracion"]}</p>
          <p>Tipo de viaje: ${i["Tipo_de_viaje"]}</p>          
          <p>Estado: ${i["Estado"]}</p>
          

        `
        const btnEliminar = document.createElement("button")
        btnEliminar.classList.add("eliminarVS", "eliminar")
        btnEliminar.textContent = "Eliminar registro"

        btnEliminar.dataset.id = i["Codigo"] 
        btnEliminar.addEventListener("click", ()=>{
          const id = parseInt(btnEliminar.dataset.id )
          const dicId = {"vs_id": id}
          
          borrarRegistro("https://backend-carrito-filb.vercel.app/viajes/eliminar", dicId)
          
        })
      
        div.appendChild(btnEliminar)
        contenedorVS.appendChild(div)


      })


    }

    function mostrarAutos(autos){
      contenedorAuto.innerHTML = ""
      autos.forEach(i =>{
        const div = document.createElement("div")
        div.classList.add("info")

        div.innerHTML = 
        `
          <p>Auto id: ${i["auto id"]}</p>
          <p>Modelo: ${i["modelo"]}</p>
          <p>Disponibles: ${i["disponibles"]}</p>
          <p>Contraseña: ${i["contraseña"]}</p>
          <p>Precio por dia: $${i["precio por dia"]}</p>
          
        `
      
        const btnEliminar = document.createElement("button")
        btnEliminar.classList.add("eliminarAuto", "eliminar")
        btnEliminar.textContent = "Eliminar registro"

        btnEliminar.dataset.id = i["auto id"] 
        btnEliminar.addEventListener("click", ()=>{
          const id = parseInt(btnEliminar.dataset.id )
          const dicId = {"auto_id": id}
          borrarRegistro("https://backend-carrito-filb.vercel.app/autos/eliminar", dicId)
          
        })
      
        div.appendChild(btnEliminar)
        contenedorAuto.appendChild(div)
        


      })


    }


    function mostrarExcursiones(excursiones){
      contenedorExc.innerHTML = ""
      excursiones.forEach(i =>{
        const div = document.createElement("div")
        div.classList.add("info")

        div.innerHTML = 
        `
          <p>Excursion id: ${i["Excursion id"]}</p>
          <p>Nombre: ${i["Nombre"]}</p>
          <p>Inicio: ${i["Inicio"]}</p>
          <p>Final: ${i["Final"]}</p>
          <p>Descripcion: ${i["Descripcion"]}</p>
          <p>Lugar: ${i["Lugar"]}</p>
          

        `
      
        const btnEliminar = document.createElement("button")
        btnEliminar.classList.add("eliminarExc", "eliminar")
        btnEliminar.textContent = "Eliminar registro"

        btnEliminar.dataset.id = i["Excursion id"] 
        btnEliminar.addEventListener("click", ()=>{
          const id = parseInt(btnEliminar.dataset.id )
          dicId = {"excursion_id":id}
          borrarRegistro("https://backend-carrito-filb.vercel.app/excursiones/eliminar", dicId)
          
        })
      
        div.appendChild(btnEliminar)
        contenedorExc.appendChild(div)


      })


    }





    mostrarVentas(ventas)
    
    mostrarClientes(clientes)
  
    mostrarPVs(PVs)
    
    mostrarVSs(VSs)
    
    ///mostrarAutos(autos)
    
    ///mostrarExcursiones(excursiones)
    

  function buscador(input, datos, funcion_mostrar, clave_valor_id) {
  input.addEventListener("input", () => {
    const valor = input.value.trim()
    if (valor === "") {
      mostrar(datos)
      
    }

    const idBuscado = parseInt(valor)
    
    const buscado = datos.find(i => i[clave_valor_id] === idBuscado)

    if (buscado) {
      const demas = datos.filter(i => i[clave_valor_id] !== idBuscado)
      const nuevaLista = [buscado]

      for (let i = 0; i < demas.length; i++) {
        nuevaLista.push(demas[i]);
      }

      funcion_mostrar(nuevaLista);

    } else {
      funcion_mostrar(datos);
    }
  })






}

  buscador(inputVentas, ventas, mostrarVentas, "Id Venta")
  buscador(inputClientes, clientes, mostrarClientes, "Usuario id")
  buscador(inputPV, PVs, mostrarPVs, "Codigo")
  buscador(inputVS, VSs, mostrarVSs, "Codigo")
  buscador(inputAuto, autos, mostrarAutos, "auto id")
  buscador(inputExc, excursiones, mostrarExcursiones, "Excursion id")






function enviarForm(dic, url) {
   fetch(url, {

      method: 'POST',
      body: JSON.stringify(dic),
      headers: {
        'Content-Type': 'application/json'
      }

    })
    .then(response => {
      if (response.ok) {

        alert(response)
        console.log(response.json())
         
      } else {

        console.error("horror:", response.status)
        

      }
    })
    .then(data => {
      if (data) {
        console.log("resp:", data);

      }
    })
    .catch(error => {
      console.error("error:", error)

    })
}


formularioPV.addEventListener("submit", function(event) {
    event.preventDefault()

    const fecha = new Date()
    fecha =   dayjs().format('DD/MM/YYYY');

    const dicPV = {
    nombre: formularioPV.querySelector(".nombrePV").value,
    precio: parseFloat(formularioPV.querySelector(".precioPV").value),
    origen: formularioPV.querySelector(".origenPV").value,
    destino: formularioPV.querySelector(".destinoPV").value,
    estadia: formularioPV.querySelector(".estadiaPV").value,
    tipo: formularioPV.querySelector(".tipoPV").value,

    descripcion: formularioPV.querySelector(".descripcionPV").value,
    cupos: parseInt(formularioPV.querySelector(".cuposPV").value),

    duracion: formularioPV.querySelector(".duracionPV").value,
    tipo_de_viaje: formularioPV.querySelector(".tipoPVn").value,
    hora: formularioPV.querySelector(".horaPV").value,
    fecha: dayjs(formularioPV.querySelector(".fechaPV").value).format('DD/MM/YYYY'), ////yankis de mierda

    

    }
  

    enviarForm(dicPV, "https://backend-carrito-filb.vercel.app/paqueteDeViajes/ingresar")

})



///enviarForm(formularioVS,"https://backend-carrito-filb.vercel.app/viajes/ingresar")
///enviarForm(formularioPV, "https://backend-carrito-filb.vercel.app/paqueteDeViajes/ingresar")
///enviarForm(formularioAutos, "https://backend-carrito-filb.vercel.app/autos/ingresar")
///enviarForm(formularioExcursion, "https://backend-carrito-filb.vercel.app/excursiones/ingresar")







  } catch (error) {

    console.error("Error:", error)
  }
})
