import { USUARIOS_NEKOKU } from "../data/user.data.js";


export const usuarioValido = { 
    comprobar(contraseña) {
        var  patron = /^[A-Za-z0-9]+$/;
        if (contraseña.match(patron)) {
            console.log('La contraseña cumple los requisitos')
            return true
        } else {
            console.log('La contraseña no cumple los requisitos')
            return false
        }
    },

    buscarUsuario(usuario, contraseña) {
        
        let encontrado = false;

        for (let i = 0; i < USUARIOS_NEKOKU.length; i++) {
            if (USUARIOS_NEKOKU[i].usuario === usuario &&  USUARIOS_NEKOKU[i].contraseña === contraseña) {
                sessionStorage.setItem("nombre", USUARIOS_NEKOKU[i].nombre);
                sessionStorage.setItem("usuario", USUARIOS_NEKOKU[i].usuario);
                encontrado = true;
                break;
            }
        }
        

        return encontrado;
    }

}
