// listado de productos - Malu
// import config from '../config.js'

const config={
  URL_BACKEND: 'http://localhost:3005'
}

function obtenerProductos() {

  return fetch(`${config.URL_BACKEND}/api/productList/`)
    .then(
      function (response) {
        return response.json()
      })
}

//Funcion fetch para enviar datos del form al servidor.
function enviarDatosForm(objDatos) {

  fetch(`${config.URL_BACKEND}/api/contactForm/`, {
    method: 'POST',
    body: JSON.stringify(objDatos),
    headers: { 'Content-Type': 'application/json' },

  }).then((res) => {
    return res.json()
  }).then((res) => {
    console.table("Datos enviados", res)

  }).catch(err=> console.log(console.error))

}

// Recupera cupones de descuento
function descuentos(name) {

  fetch(`${config.URL_BACKEND}/api/discounts/`)
    .then(function (response) {

      return response.json()
    })
    .then(function (cupon) {
      const baucher= cupon.discount[0]

      alert(`Estimado/a ${name}. Gracias por elegirnos! Le obsequiamos el código ${baucher.text} para obtener un ${baucher.discountPercentage}% de descuento con su compra.`);
    })

}

// Funcion enviar datos del usuario al servidor
function enviarDatosServer(name, email, sendEmail, token) {

  let usuario = {
    token,
    name,
    email,
    sendEmail
  }


  fetch(`${config.URL_BACKEND}/api/usersData/`, {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    return res.json()
  }).then((res) => {
    console.log("Usuario Enviado", res)
  })

}

// Funcion Obtener Portada
function obtenerPortada() {

  fetch(`${config.URL_BACKEND}/api/images/Guayerd Bikes - CyberMonday is comming!`)
    .then(
      function (response) {
        return response.json()
      }
    )
    .then(
      function (portada) {

        const portadaDiv = document.querySelector('.portada')
        const urlImg = portada.image.imgUrl
        portadaDiv.style.background = `black url("${urlImg}") no-repeat center center/contain`

      }
    )
}
