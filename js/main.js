import { usuarioValido } from "../js/services/user.service.js";
import { ejecutarJuego } from "./services/game.service.js";
import { mostrarResultados } from "./services/resultado.service.js"

'use strict'

const pagina = window.location.pathname;

/*----- INICIO DE SESION -----*/

if (pagina.endsWith("index.html") || pagina.endsWith("/")) {

    var boton = document.querySelector('#botonLogin');
    boton.addEventListener('click', function(){

        event.preventDefault(); // Evita que la página se recargue. Si lo quito, no se dirige a la siguiente.

        const usuario = document.querySelector('#usuario').value;
        const contraseña = document.querySelector('#contrasenia').value;

        let posible = usuarioValido.comprobar(contraseña);
        let encontrado;

        if (!posible) {
            document.getElementById('textoError').textContent = 'La contraseña no es válida.';
            // Borra el mensaje después de 2 segundos
            setTimeout(() => {
                document.getElementById('textoError').textContent = '';
            }, 2000);
        } else { // si se encuentra, se valida.
            encontrado = usuarioValido.buscarUsuario(usuario, contraseña);
        }

        if(encontrado) { // si se encuentra, dirige a la siguiente página.
            location.href = 'bienvenida.html'
        }

    });

/*----- BIENVENIDA -----*/

} else if (pagina.endsWith("bienvenida.html")) {
    const botonesNivel = document.querySelectorAll('.nivelboton');

    botonesNivel.forEach(boton => {
        boton.addEventListener('click', () => {
            const nivel = boton.id; // obtiene el nivel clicado
            sessionStorage.setItem('nivel', nivel) // lo almacena en el sessionStorage
            location.href = 'juego.html'
        })
    });

/*----- PAGINA DE JUEGO -----*/
} else if (pagina.endsWith("juego.html")) {
        ejecutarJuego();

/*----- MUESTRA DE RESULTADOS -----*/
} else if (pagina.endsWith("resultados.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        mostrarResultados();
    })
}





