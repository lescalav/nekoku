import { animal } from "../models/animal.model.js"

export const accionesAnimal = {
    hacerCopia(animalOriginal, nuevaUbicacion = '') {
        return new animal(
            animalOriginal.nombre, 
            nuevaUbicacion
        );
    }

}