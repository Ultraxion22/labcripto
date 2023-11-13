// ==UserScript==
// @name         desencrypt
// @namespace    https://hola.com
// @version      1.0
// @description  codigo para desencriptar cifrado 3
// @match        https://cripto.tiiny.site/*
// @grant        unsafeWindow
// @require https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js#sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA==
// ==/UserScript==

(function() {

  function obtenerContrasenaOculta() {
// Obtener todo el texto de la página
const textoPagina = document.body.innerText;

// Encontrar y concatenar solo las letras mayúsculas
const letrasMayusculas = textoPagina.match(/[A-Z]/g).join('');

return letrasMayusculas;
}
  function agregarDivAlDOM(id, clase) {
      const newDiv = document.createElement("div");
      newDiv.id = id;
      if (clase) {
          newDiv.classList.add(clase);
      }
      document.body.appendChild(newDiv);
  }

  // Función para descifrar mensajes cifrados con 3DES ECB
  function descifrarMensajeCifrado(mensajeCifrado, llave) {
      const decrypted = CryptoJS.TripleDES.decrypt({
          ciphertext: CryptoJS.enc.Base64.parse(mensajeCifrado)
      }, llave, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
  }

  // Obtener todo el texto de la página
  const textoPagina = document.body.innerText;

  // Encontrar y concatenar solo las letras mayúsculas
  const letrasMayusculas = textoPagina.match(/[A-Z]/g).join('');

  const key = obtenerContrasenaOculta();
  console.log("La llave es: ", key);

  // Encontrar y descifrar los mensajes cifrados en los divs
  const divs = document.querySelectorAll('div'); // Obtener todos los divs en la página

  console.log("Los mensajes cifrados son: ", divs.length);

  if (divs.length > 0) {
      console.log("Mensajes descifrados:");

      divs.forEach((div, index) => {
          const mensajeCifrado = div.id;
          const mensajeDescifrado = descifrarMensajeCifrado(mensajeCifrado, key);
          console.log(mensajeCifrado, mensajeDescifrado);
          const span = document.createElement('span');
          span.textContent = mensajeDescifrado;
          div.appendChild(span);
      });
  } else {
      console.log("No se encontraron divs en la página.");
  }
})();