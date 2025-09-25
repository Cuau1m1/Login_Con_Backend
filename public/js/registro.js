// public/js/registro.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const usuario = document.getElementById('usuario').value; // Correo
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, usuario, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'login.html'; // Redirige al login
        } else {
            alert(result.message);
        }
    });
});