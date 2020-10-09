function renderProductos(productos) {
  const container = document.querySelector('.prod-cont');
  let etiquetasProductos = ""


  productos.products.forEach(function (producto) {

    let tarjeta = `<article>
                  <div class="prod-img">
                      <img src=" ${producto.imgUrl}" alt="">
                  </div>
                  <div class="prod-card">
                    <div class="header-card">
                      <h3 class="subtitulos">${producto.title}</h3>
                      <h3 class="subtitulos">${producto.currency} <span class="${(producto.discountPrice) ? "tachado" : ""} ">${producto.price} </span>
                      ${ (producto.discountPrice) ? producto.discountPrice : ""}
                      &nbsp;&nbsp; stock: ${producto.inStock}</h3>
                    </div>
                      <p>${producto.description}</p>
                  </div>
                  </article>`

    etiquetasProductos += tarjeta
  })

  container.innerHTML = etiquetasProductos;
}

//Buscar producto
obtenerProductos()
  .then(function (productos) {
    console.log(productos);
    renderProductos(productos)
    return productos;
  })
  // .then(productos=> {
//     console.log(productos);
//     fetch('http://localhost:3005/api/productList', {
//       method: 'POST',
//       body: JSON.stringify(productos),
//       headers: { 'Content-Type': 'application/json'}
//
//     }).then(()=>{
//       console.log('Se mando el array');
//     }).catch(err=>{console.log(err)})
// })
