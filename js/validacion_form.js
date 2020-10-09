
const form = document.querySelector('form');
const inptNombre = document.querySelector("input[name='nombre']");
const inptEmail = document.querySelector("input[name= 'email']");
const inptTel = document.querySelector("input[name='telefono']");
const selAsunto = document.querySelector("select[name='asunto']");
const textMensaje = document.querySelector("textarea[name='mensaje']");


const spanMensaje = document.querySelector('#spanMensaje');
const spanTel = document.querySelector('#spanTel');
const spanNombre = document.querySelector('#spanNombre');
const spanEmail = document.querySelector('#spanEmail');
const spanAsunto = document.querySelector('#spanAsunto');

//listeners
inptNombre.addEventListener('input', (e) => {
  validar(e.target, spanNombre);
})

inptEmail.addEventListener('input', (e) => {
  validar(e.target, spanEmail)
})

/*La entrada de telefono no es obligatoria, pero si el usr desea
incluirlo debe validarse el pattern.*/
inptTel.addEventListener('input', (e) => {
  spanTel.style = 'color: gray';
  validar(e.target, spanTel)
})

selAsunto.addEventListener('input', (e) => {
  validar(e.target, spanAsunto);
})

/*El mensaje no debe contener mas de 300 caracteres. Esta validación se hace
especificamente en el listener, fuera de la funcion validar.*/
textMensaje.addEventListener('input', (e) => {
  validar(e.target, spanMensaje)
  if (e.target.value.length > 300) {
    textMensaje.style = 'background-color: #ff8787';
  }
})

/*validacion de form (submit)
El metodo checkValidity verifica que se cumplan las validaciones de required
y patern en cada elemento.*/
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!inptNombre.checkValidity()) {
    mostrarError(inptNombre, spanNombre);
  }

  if (!inptEmail.checkValidity()) {
    mostrarError(inptEmail, spanEmail);
  }

  if (!selAsunto.checkValidity()) {
    mostrarError(selAsunto, spanAsunto);
  }

  if (!textMensaje.checkValidity()) {
    mostrarError(textMensaje, spanMensaje);
  }

// Creo objeto con datos del formulario.
  const obj={name: inptNombre.value,
            email: inptEmail.value,
            phone: inptTel.value,
            subject: selAsunto.value,
            message: textMensaje.value};

//Funcion para enviar datos del form.
if (form.checkValidity()) {
  enviarDatosForm(obj)
  form.reset();
}
})

/* Funcion para verificar la validez de cada elemento del form.
Verifica si se cumple con el required y con los paterns seteados en HTML.*/
function validar(inptTarget, spanErr) {
  if (inptTarget.checkValidity()) {
    spanErr.textContent = "";
    inptTarget.style = "border:solid 2px green; outline: 0px;";
  } else {
    mostrarError(inptTarget, spanErr);
  }
}

//Funcion para mostrar el error en cada elemento del form.
function mostrarError(inptTarget, spanErr) {
  if (inptTarget.validity.valueMissing) {
    spanErr.textContent = 'El campo es requerido.';
  }
  if (inptTarget.name === 'email') {
    if (inptTarget.validity.patternMismatch) {
      spanErr.textContent = 'Debe ingresar una direccion de email con formato: ejemplo@dominio.com'
    }
  }
  if (inptTarget.name === 'nombre') {
    if (inptTarget.validity.patternMismatch) {
      spanErr.textContent = 'La entrada no debe contener espacios al inicio.'
    }
  }
  if (inptTarget.name === 'telefono') {
    if (inptTarget.validity.patternMismatch) {
      spanErr.textContent = 'Ingresar codido de área (sin el cero) seguido del número (solo números sin espacios).'
    }
  }
  inptTarget.style = "background-color: #ff8787; border: solid 2px red";
}
