import { usuarioNekoku } from "../models/user.model.js";

//Registros pegados de usuarios.json
const jsonUsuarios = `[   
    {"id":1, "nombre" : "Iker", "apellido" : "Arana", "usuario":"iarana", "contraseña":"1234Abcd"},
    {"id":2, "nombre" : "Ander", "apellido" : "Goikoetxea", "usuario":"agoikoetxea", "contraseña":"5678Efgh"},
    {"id":3, "nombre" : "Jokin", "apellido" : "Olano", "usuario":"jolano", "contraseña":"9012Ijkl"}
]
`;

//Lectura como JSON
const historico_users = JSON.parse(jsonUsuarios)

//Creacion de objetos a partir de cada registro del Array
export const USUARIOS_NEKOKU = historico_users.map(
    user => { new usuarioNekoku(
        user.id,
        user.nombre,
        user.apellido,
        user.usuario,
        user.contraseña
    ),
    
    localStorage.setItem(user.usuario, user.contraseña);

    return user;
});

