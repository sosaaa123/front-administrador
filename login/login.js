document.addEventListener("DOMContentLoaded", () => {
  const url = ""
  const loginForm = document.getElementById("login-form")
  const userInput = document.getElementById("user")
  const passwordInput = document.getElementById("password")

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault() ////Para que no se recargeçue

    const user = userInput.value
    const password = passwordInput.value

    dic = {

        "usuarioIngresado": user,
        "contraseñaIngresada": password
      }


    fetch(url,{

        method: 'POST',
        body: JSON.stringify(dic),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data === true) {

          sessionStorage.setItem("logueado", "true")
          window.location.href = "../panel/panel_de_control.html"
          
      } else {
        alert("Credenciales incorrectas")
      }
    })
    .catch(error => {

      console.error("Ha ocurrido un error:", error)
      alert(error)

    })







   
  })
})
