function validarFormulario() {
    console.log("Validando");

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const mensajeElemento = document.getElementById('mensajeValidacion');

    let mensaje = [];
    
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    const arroba = usuario.split('@');
    
    if (arroba.length !== 2 || !dominiosPermitidos.includes(arroba[1])) {
        console.warn("correo invalido o dominio no permitido");
        mensaje.push("El correo debe ser: gmail.com, hotmail.com, yahoo.com o outlook.com ");
    } else {
        mensaje.push("Correo correcto");
        console.log("Correo correcto");
    }


    if (password.length < 8) {
        console.warn("El password tiene menos de 8 caracteres ");
        mensaje.push("El password debe tener al menos 8 caracteres");
    }

    if (!/[A-Z]/.test(password)) {
        mensaje.push("El password debe incluir al menos una letra mayuscula");
    }
    if (!/[a-z]/.test(password)) {
        mensaje.push("El password debe incluir al menos una letra minuscula");
    }
 
    if (!/[0-9]/.test(password)) {
        console.warn("El password no contiene un numero");
        mensaje.push("El password debe incluir al menos un numero");
    }
    
    if (mensaje.length === 0) {
        mensaje.push("Password correcto");
        console.log("Password correcto");
    }

    if (mensaje.length > 0) {
        mensajeElemento.style.color = 'black'; 
        mensajeElemento.innerHTML = mensaje.join('<br>');
        console.log(" Fin vali");
        return false; 
    } else {
        mensajeElemento.style.color = 'green';
        mensajeElemento.innerHTML = "todo bien";
        console.log("todo bien");
        return true; 
    }
}