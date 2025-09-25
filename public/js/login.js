// public/js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert('¡Login exitoso!');
            // Aquí podrías redirigir a otra página, por ejemplo:
            // window.location.href = 'dashboard.html';
        } else {
            alert(result.message);
        }
    });
});