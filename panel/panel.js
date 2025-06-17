

const urlVentas = "https://backend-carrito-filb.vercel.app/ventas/obtener"
///ttps://backend-carrito-filb.vercel.app/ventas/obtener
const urlClientes = "https://backend-carrito-filb.vercel.app/clientes/obtener"
const urlPV = "https://backend-carrito-filb.vercel.app/paqueteDeViajes/obtener"
const urlVS = "https://backend-carrito-filb.vercel.app/viajes/obtener"

const urlAutos = "https://backend-carrito-filb.vercel.app/autos/obtener" 
const urlExc = "https://backend-carrito-filb.vercel.app/excursiones/obtener" 


////Pedir url autos(obtener, vincular a PV, vincular a VS), url para ver relacion pv-auto vs-auto
////Pedir url excursiones(obtener, vincular a PV)
////Pedir url eliminar relacion excursion-pv

///Hacer funcion para verificar administrador en el login de la bd
///Hacer funcion para ver ventas relacionadas a cada cliente



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

    const res5= await fetch(urlAutos)
    const data5 = await res5.json() 

    const res6 = await fetch(urlExc)
    const data6 = await res6.json()

    const ventas = data1.flat() //////777ACAAACAAAAAAAAAAAAAAAAAA 13:09
    ventas.reverse() ///Para sacar los diccionarios de la lista en la que estan y ahorrarme recorrerlos
    console.log(ventas)

    const clientes = data2.flat()
    clientes.reverse()
    console.log(clientes)

    const PVs = data3.flat()
    PVs.reverse()
    console.log(PVs)

    const VSs = data4.flat()
    VSs.reverse()
    console.log(VSs)

    const autosJSON = data5.flat()
    autosJSON.reverse()
    console.log(autosJSON)

    const excursionesJSON = data6.flat()
    excursionesJSON.reverse()
    console.log(excursiones)

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
      if (data.error ||  data.detail?.includes("violates foreign key constraint")) {
          console.log(data)
          alert("no se puede eliminar el registro porque tiene una relacion importante con otro registro, consultar demas tablas.")
          
      } else {
        alert("Registro eliminado exitosamente.")
        location.reload()
      }
        

    })
    .catch(error => {

      console.error("Ha ocurrido un error:", error)
      alert("no se puede eliminar el registro porque tiene una relacion importante, consultar demas tablas.")

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
        ///alert(data.mensaje || JSON.stringify(data))
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


    function verAutos(dicId, url, cont){
      fetch(url,{

        method: 'POST',
        body: JSON.stringify(dicId),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then( data =>  {
        ////Si no tiene autos me devuelve []
        cont.innerHTML = ""
       
        console.log(data)
        ///alert(data.mensaje || JSON.stringify(data))
        const autos = data.flat()
        
        if (data.length > 0){
            console.log("Tiene autos")
             cont.innerHTML = `
              <h4 class="autosh4">Autos</h4>
              `

            autos.forEach(i =>{
              const divexc = document.createElement("div")
  
              divexc.innerHTML = `
              
                  <p class="p_excursion" >Auto id: ${i["auto id"]}</p>
                  <p class="p_excursion" >Modelo: ${i["modelo"]}</p>
                  <p class="p_excursion" >Disponibles: ${i["disponibles"]}</p>
                  <p class="p_excursion" >Contraseña: ${i["contraseña"]}</p>
                  <p class="p_excursion" >Precio por dia: $${i["precio por dia"]}</p>
              
              
              
              `

              cont.appendChild(divexc)


            })
        }

        else {

          const divexc = document.createElement("div")
          divexc.innerHTML = `
          
          <p class="p_excursiones">No hay autos para este registro</p>
          
          `

        
          cont.appendChild(divexc)

        }
        

    })
    .catch(error => {

      console.error("Ha ocurrido un error:", error)
      alert(error)

    })

    }



    vent = document.querySelector(".ventanAgregar")
    function vincularExc(id, excursiones, vent){
     console.log("hola")
     vent.innerHTML = ""
     vent.style.display = "block"
     x = document.createElement("button")
     x.textContent = "X"
     x.classList.add("ventanaCerrar")
     vent.appendChild(x)
    x.addEventListener("click", ()=>{
      vent.style.display = "none"
    })

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
        const agregar = document.createElement("button")
        agregar.textContent = "agregar"
        agregar.dataset.id = i["Excursion id"]

        agregar.addEventListener("click", () =>{
          excId = parseInt(agregar.dataset.id)
          const dicVinc = {
            "pv_id": id,
            "exc_id":excId
          }

          fetch("https://backend-carrito-filb.vercel.app/excursiones/ingresarVinculoPV",{

                method: 'POST',
                body: JSON.stringify(dicVinc),
                headers: {
                'Content-Type': 'application/json'
              }
          })
          .then(response => response.json())
          .then( data =>  {

                console.log(data)
                ///alert(data.mensaje || JSON.stringify(data))
                alert("Excursion agregada")
                location.reload

          })
          .catch(error => {

                console.error("Ha ocurrido un error:", error)
        

          })

        })
        

        div.appendChild(agregar)
        vent.appendChild(div)


      })



    }

    function verVentasClientes(dic, url, cont){
      fetch(url, {

        method: 'POST',
        body: JSON.stringify(dic),
        headers: {
          'Content-Type': 'application/json'}

      })
      .then(response => response.json())
      .then( data =>  {
        ////Si no tiene ventas me devuelve []
        cont.innerHTML = ""

        cont.innerHTML = `
          <h4 class="clientesVenth3">Compras del cliente</h4>
        `
        console.log(data)
        ///alert(data.mensaje || JSON.stringify(data))
        const ventasC = data.flat()
        
        if (data.length > 0){
            console.log("Tiene ventas")
           

            ventasC.forEach(i =>{
              const divexc = document.createElement("div")
              divexc.innerHTML = `
              
                        <p class="p_excursion">ID: ${i["Id Venta"]}</p>
                        <p class="p_excursion">Fecha: ${i["Fecha"]}</p>
                        <p class="p_excursion">Hora: ${i["Hora"]}</p>
                        <p class="p_excursion">Medio de pago: ${i["Medio de pago"]}</p>
                        <p class="p_excursion">Cuotas: ${i["Cuotas"] ? "Sí" : "No"}</p>
                        <p class="p_excursion">Cantidad: ${i["Cantidad"]}</p>
                        <p class="p_excursion">Código de viaje: ${i["Codigo de viaje"]}</p>
                        <p class="p_excursion">Tipo: ${i["Tipo"]}</p>
                        <p class="p_excursion">Precio: $${i["Precio"]}</p>
              
              
              `

              cont.appendChild(divexc)


            })
        }

        else {

          const divexc = document.createElement("div")
          divexc.innerHTML = `
          
          <p class="p_excursiones">Este cliente no tiene compras asociadas</p>
          
          `
          cont.appendChild(divexc)

        }
        

    })
    .catch(error => {

      console.error("Ha ocurrido un error:", error)
      alert(error)

    })

    }

  


    function vincularAuto(dicVinc, autos, vent, url){
     console.log("hola")
     vent.innerHTML = ""
     vent.style.display = "block"
     x = document.createElement("button")
     x.textContent = "X"
     x.classList.add("ventanaCerrar")
     vent.appendChild(x)
    x.addEventListener("click", ()=>{
      vent.style.display = "none"
    })

    autos.forEach(i =>{
        const div = document.createElement("div")
        div.classList.add("info")

        div.innerHTML = 
        `
          <p>Auto id: ${i["auto id"]}</p>
          <p>Modelo: ${i["modelo"]}</p>
          <p>Disponibles: ${i["disponibles"]}</p>
  
          <p>Precio por dia: $${i["precio por dia"]}</p>
          

        `
        const agregar = document.createElement("button")
        agregar.textContent = "agregar"
        agregar.dataset.id = i["auto id"]

        agregar.addEventListener("click", () =>{
          atid = parseInt(agregar.dataset.id)
          dicVinc.at_id = atid
          

          fetch(url,{ /////URL QUE NO ESTA TODAVIA

                method: 'POST',
                body: JSON.stringify(dicVinc),
                headers: {
                'Content-Type': 'application/json'
              }
          })
          .then(response => response.json())
          .then( data =>  {

                console.log(data)
                ///alert(data.mensaje || JSON.stringify(data))
                alert("auto agregado")
                ///location.reload()

          })
          .catch(error => {

                console.error("Ha ocurrido un error:", error)
        

          })

        })
        

        div.appendChild(agregar)
        vent.appendChild(div)


      })



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

        //////////////TRABAJO ACAAAAAAAAAAAAAAAAAAAAAAA

        const btnVerVentas = document.createElement("button")
        btnVerVentas.classList.add("clientesVentasbtn")
        btnVerVentas.textContent = "Ver ventas asociadas"
        btnVerVentas.dataset.id = i["Usuario id"]
        const contVentas = document.createElement("div")
        contVentas.classList.add("excursionesDiv")
        contVentas.style.display = "none"

        div.appendChild(btnVerVentas)
        div.appendChild(contVentas)

        

        btnVerVentas.addEventListener("click", ()=>{
          const id = parseInt(btnVerVentas.dataset.id)
          dic = {
            "uc_id": id
          }
          contVentas.style.display = "block"
          verVentasClientes(dic, "https://backend-carrito-filb.vercel.app/ventas/obtenerUsuario", contVentas)


        })

       

       

        
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
          <p>Descripcion: ${i["Descripcion"]}</p>
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
        div.appendChild(verExcursiones)
        div.appendChild(excursionesDiv)


        const verAutosPVbtn = document.createElement("button")
        verAutosPVbtn.innerText = "Ver Autos"
        verAutosPVbtn.classList.add("verAutosPV")
        verAutosPVbtn.dataset.id = i["Codigo"]
        const autosDiv = document.createElement("div")
        autosDiv.classList.add("excursionesDiv")
        autosDiv.style.display = "none"
        div.appendChild(verAutosPVbtn)
        div.appendChild(autosDiv)
        
        verAutosPVbtn.addEventListener("click", ()=>{
          id = parseInt(verAutosPVbtn.dataset.id)
          dicId = {

            "pv_id": id
          
          }

          autosDiv.style.display = "block"

          verAutos(dicId, "https://backend-carrito-filb.vercel.app/autos/obtenerPV",autosDiv)
        })


        ////ESTOY ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////

        const agregarAutosPVbtn = document.createElement("button")
        agregarAutosPVbtn.textContent = "Agregar auto"
        agregarAutosPVbtn.classList.add("agregarAutobtn")
        agregarAutosPVbtn.dataset.id = i["Codigo"]
        div.appendChild(agregarAutosPVbtn)

        agregarAutosPVbtn.addEventListener("click", () =>{
          id = parseInt(agregarAutosPVbtn.dataset.id)
          dicId = {
             "pv_id": id,
             "at_id": 0
          }

          vincularAuto(dicId, autosJSON, vent, "https://backend-carrito-filb.vercel.app/autos/ingresarVinculoPV") 


        })


      ////////////////  ACA ESTOY TRABAJANDO ///////

        const agregarExc = document.createElement("button")
        agregarExc.classList.add("agregarExc")
        agregarExc.textContent = "Agregar Excursion"
        agregarExc.dataset.id = i["Codigo"]
        
        agregarExc.addEventListener("click", ()=>{
          const id = parseInt(agregarExc.dataset.id)
          vincularExc(id, excursionesJSON, vent, "https://backend-carrito-filb.vercel.app/auto/ingresarVinculoPV")
          console.log("hola")
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

       
        
        div.appendChild(agregarExc)
        
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


        const verAutosVSbtn = document.createElement("button")
        verAutosVSbtn.innerText = "Ver Autos"
        verAutosVSbtn.classList.add("verAutosPV")
        verAutosVSbtn.dataset.id = i["Codigo"]
        const autosDiv = document.createElement("div")
        autosDiv.classList.add("excursionesDiv")
        autosDiv.style.display = "none"
        div.appendChild(verAutosVSbtn)
        div.appendChild(autosDiv)
        
        verAutosVSbtn.addEventListener("click", ()=>{
          id = parseInt(verAutosVSbtn.dataset.id)
          dicId = {

            "vs_id": id
          
          }

          autosDiv.style.display = "block"

          verAutos(dicId, "https://backend-carrito-filb.vercel.app/autos/obtenerVS",autosDiv)
        })


        ////ESTOY ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////

        const agregarAutosVSbtn = document.createElement("button")
        agregarAutosVSbtn.textContent = "Agregar auto"
        agregarAutosVSbtn.classList.add("agregarAutobtn")
        agregarAutosVSbtn.dataset.id = i["Codigo"]
        div.appendChild(agregarAutosVSbtn)

        agregarAutosVSbtn.addEventListener("click", () =>{
          id = parseInt(agregarAutosVSbtn.dataset.id)
          dicId = {
            "vs_id": id,
            "at_id": 0
          }
          vincularAuto(dicId, autosJSON, vent, "https://backend-carrito-filb.vercel.app/autos/ingresarVinculoVS" ) 


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
    
    mostrarAutos(autosJSON)
    
    mostrarExcursiones(excursionesJSON)
    

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
    .then(response => response.json())
    .then(data => {
          alert("Registro agregado exitosamente")
          location.reload()
          console.log(data.Mensaje)

    })

    .catch(error => {
      console.error("Horror:", error)
    })
}




formularioPV.addEventListener("submit", function(event) {
    event.preventDefault()

    

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
    fecha: dayjs(formularioPV.querySelector(".fechaPV").value).format('DD/MM/YY') ////yankis de mierda

    

    }
  
    console.log(dayjs(formularioPV.querySelector(".fechaPV").value).format('DD/MM/YY'))
    enviarForm(dicPV, "https://backend-carrito-filb.vercel.app/paqueteDeViajes/ingresar")

})

formularioVS.addEventListener("submit", function(event) {
    event.preventDefault()
    dicVS = {

      nombre: formularioVS.querySelector(".nombreVS").value,
      descripcion: formularioVS.querySelector(".descripcionVS").value,
      precio: parseFloat(formularioVS.querySelector(".precioVS").value),
      origen: formularioVS.querySelector(".origenVS").value,
      destino: formularioVS.querySelector(".destinoVS").value,
      transporte: formularioVS.querySelector(".transporteVS").value,
      fecha: dayjs(formularioVS.querySelector(".fechaVS").value).format('DD/MM/YY'),
      hora: formularioVS.querySelector(".horaVS").value,
      cupos: parseInt(formularioVS.querySelector(".cuposVS").value),
      duracion_aprox: formularioVS.querySelector(".duracionVS").value,
      tipo_de_viaje: formularioVS.querySelector(".tipoVS").value,





    }


    console.log(dayjs(formularioVS.querySelector(".fechaVS").value).format('DD/MM/YY'))
    enviarForm(dicVS, "https://backend-carrito-filb.vercel.app/viajes/ingresar")

  })


  formularioAutos.addEventListener("submit", function(event){
    event.preventDefault()
    dicAutos = {
      "modelo": document.querySelector(".modeloAuto").value,
      "disponibles": parseInt(document.querySelector(".disponiblesAuto").value),
      "precio_por_dia": parseFloat(document.querySelector(".precioAuto").value)
    }

    enviarForm(dicAutos,"https://backend-carrito-filb.vercel.app/autos/ingresar")
  })



  formularioExcursion.addEventListener("submit", function(event){
    event.preventDefault()
    dicExc = {

      "nombre": document.querySelector(".nombreExc").value,
      "inicio": document.querySelector(".inicioExc").value,
      "final": document.querySelector(".finalExc").value,
      "descripcion": document.querySelector(".descripcionExc").value,
      "lugar": document.querySelector(".lugarExc").value
    }

    console.log(dicExc)
    enviarForm(dicExc,"https://backend-carrito-filb.vercel.app/excursiones/ingresar")
  })







  } catch (error) {

    console.error("Error:", error)
  }
})
