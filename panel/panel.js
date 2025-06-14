const urlVentas = "https://backend-carrito-filb.vercel.app/ventas/obtener"
const urlClientes = "https://backend-carrito-filb.vercel.app/clientes/obtener"
const urlPV = "https://backend-carrito-filb.vercel.app/paqueteDeViajes/obtener"
const urlVS = "https://backend-carrito-filb.vercel.app/viajes/obtener"

///const urlAutos = "https://backend-carrito-filb.vercel.app/autos/obtener" AUTOS TODAVIA NO ESTA SUBIDA
////const urlExc = "https://backend-carrito-filb.vercel.app/excursiones/obtener" EXCURSIONES TODAVIA NO ESTA SUBIDA


const urlPVenviar = "https://backend-carrito-filb.vercel.app/viajes/ingresar"

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
      
        contenedorAuto.appendChild(div)


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





  formularioVS.addEventListener("submit", function(event){
    event.preventDefault()
    const formData = new FormData(formularioVS)
    
    fetch("https://backend-carrito-filb.vercel.app/viajes/ingresar",{
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    })

  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("error:", response.status);
        return null;
      }
    })
    .then(data => {
      if (data) {
        console.log("Respuesta:", data)
      }
    })
    .catch(error => {
      console.error("error:", error)
    })
  


  } catch (error) {

    console.error("Error:", error)
  }
})
