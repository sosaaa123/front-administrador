document.addEventListener("DOMContentLoaded", () => {
  const url = "https://dragonball-api.com/api/characters/1";
  const loginForm = document.getElementById("login-form");
  const userInput = document.getElementById("user");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault() ////Para que no se recargeçue

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();

      if (userInput.value === data.name && passwordInput.value === data.gender) {

        sessionStorage.setItem("logueado", "true");
        window.location.href = "../panel/panel_de_control.html"
        
      } else {
        alert("Datos incorrectos");
      }
    } catch (error) {
      console.log("Error en inicar sesion:", error);
    }
  });
});
