import { animalesLista } from "../data/animal.data.js";
import { accionesAnimal } from "./animal.service.js";

// VARIABLES GLOBALES 
let puzzle = []; // Actualizacion del array segun se colocan animales
let initialPuzzle = []; // Array inicial

export const ejecutarJuego = () => {

    const nivel = sessionStorage.getItem(['nivel']) // Se obtiene el nivel seleccionado
    const opciones = document.getElementById("animales");
    const tabla = document.getElementById("cuadricula");
    tabla.innerHTML = ''; // Limpiar contenido previo
    const mapaAnimales = {};

    const nombrePorID = { // Asocia cada animal a un número
        1: 'zorro',
        2: 'gato',
        3: 'pollito',
        4: 'perrito',
        5: 'sapo',
        6: 'gorrion',
        7: 'serpiente',
        8: 'tigre',
        9: 'cerdo'
}

        /*-----ARRAY INICIAL POR NIVEL--------*/   
        function generarTabla(nivel) {
            if (nivel === 'principiante') {
                return [[0, 0, 2, 0], [0, 2, 0, 1], [0, 4, 0, 0], [2, 1, 0, 0]]
            } else if (nivel === 'intermedio') {
                return [[5, 3, 0, 0, 0, 0], [4, 0, 6, 3, 5, 0], [1, 0, 0, 0, 0, 4], [0, 4, 5, 1, 0, 2], [6, 5, 0, 2, 0, 0], [2, 1, 0, 6, 4, 0]]
            } else if (nivel === 'avanzado') {
                return [[0, 0, 3, 0, 0, 0, 0, 6, 1], [2, 0, 0, 0, 0, 0, 0, 0, 4], [0, 0, 7, 0, 0, 1, 0, 0, 0], [0, 0, 0, 2, 0, 9, 0, 0, 3], [0, 8, 0, 0, 3, 0, 0, 0, 0],
                [5, 0, 0, 0, 6, 0, 0, 0, 0], [0, 3, 2, 0, 0, 0, 0, 0, 0], [7, 0, 0, 0, 0, 0, 4, 0, 2], [0, 4, 0, 9, 8, 0, 1, 0, 0]]
            }
        }

        /*-----TABLA POR NIVEL--------*/  
        function visualizarTabla(tablero = generarTabla()) {
            tablero.forEach((row, rowIndex) => { // Recorre las filas
                const elementoFila = document.createElement('div');
                elementoFila.classList.add('row');

                row.forEach((cell, columnIndex) => { // Recorre subelementos del array
                    const elementoCelda = document.createElement('div');
                    if (cell !== 0) { // Se agregan las imagenes de los animales del array inicial pasado como parámetro
                        const nombre = nombrePorID[cell];
                        const img = document.createElement('img');
                        img.src = `img/${nombre}.png`;
                        img.classList.add('animalimg');
                        img.draggable = false; // no se pueden arrastrar
                        elementoCelda.appendChild(img);
                    }
                    if (nivel === 'avanzado') {
                        elementoCelda.classList.add('celdas-pequenias'); // En el nivel avanzado, se modifican los tamaños
                    }
                    elementoCelda.classList.add('cell');
                    elementoCelda.classList.add((rowIndex + columnIndex));
                    elementoCelda.setAttribute('data-row', rowIndex);
                    elementoCelda.setAttribute('data-col', columnIndex);
                    elementoFila.appendChild(elementoCelda); // Crea celdas individuales
                });

                tabla.appendChild(elementoFila); // Crea columnas enteras
            });
        }        

        /*-----OPCIONES CREADAS POR NIVEL--------*/  
        function crearOpciones() {

            /* AGREGAR ANIMALES */ 
            let animalesNivel = []
            
            if (nivel === 'principiante') {
                animalesNivel = animalesLista.slice(0, 4)   
            } else if (nivel === 'intermedio') {
                animalesNivel = animalesLista.slice(0, 6)
            } else if (nivel === 'avanzado') {
                animalesNivel = animalesLista.slice(0, 8)
            }
        
            for (let i = 0; i < animalesNivel.length; i++) {
                const img = document.createElement('img')
                img.src = animalesNivel[i].enlace
                img.classList.add('animalimg')
                if (nivel === 'avanzado') {
                    img.classList.add('animales-pequenios');
                }
                img.classList.add('arrastrable')
                img.setAttribute('data-nombre', animalesNivel[i].nombre);
                img.draggable = true
                opciones.appendChild(img)

                mapaAnimales[animalesNivel[i].nombre] = animalesNivel[i]

                // comportamiento dragstart para obtener su clase
                img.addEventListener('dragstart', e =>
                    e.dataTransfer.setData('nombre', img.getAttribute('data-nombre'))
                )
            }
        }

        /*-----COMPORTAMIENTO DRAG & DROP DE LAS CELDAS-----*/
        function determinarComportamientos() {
            
            const elementoDestino = document.querySelectorAll(".cell")
            
            elementoDestino.forEach(celda => {

                celda.addEventListener('dragover', e => {
                    e.preventDefault();
                    celda.classList.add('hover') // cambio de color cuando se arrastra un animal por encima
                })

                celda.addEventListener('dragleave', e => {
                    celda.classList.remove('hover') // cambio de color cuando se pasa el cursor
                })

                celda.addEventListener('drop', e => {
                    e.preventDefault();
                    celda.classList.remove('hover');

                    const nombre = e.dataTransfer.getData('nombre');
                    const animalOriginal = mapaAnimales[nombre];
                    
                    // Se almacenan ubicaciones porque es importante luego para guardar en el Array
                    const row = parseInt(celda.getAttribute('data-row'));
                    const col = parseInt(celda.getAttribute('data-col'));
                    const nuevaUbicacion = `${row}-${col}`; 

                    // Crear copia del objeto animal
                    const copiaAnimal = accionesAnimal.hacerCopia(animalOriginal, nuevaUbicacion);

                    // Crear <img> para la copia
                    const img = document.createElement('img');
                    img.src = copiaAnimal.enlace;
                    img.classList.add('animalimg');
                    img.classList.add('arrastrable') // se aplica la clase del cursor porque se puede hacer click sobre la imagen
                    img.draggable = false; // la copia no es arrastrable

                    // Darle un comportamiento 
                    img.addEventListener('dblclick', e => {
                        img.remove()
                        // Elimina el numero del array
                        row = parseInt(celda.getAttribute('data-row'));
                        col = parseInt(celda.getAttribute('data-col'));
                        puzzle[row][col] = 0;
                    })

                    // Agregar la copia a la celda, solo si esta vacia
                    if (celda.innerHTML === '') {
                        celda.appendChild(img);
                        // Actualizar el Array
                        const idAnimal = Object.keys(nombrePorID).find(key => nombrePorID[key] === nombre);
                        puzzle[row][col] = parseInt(idAnimal);
                        console.log(puzzle);
                    }
                })

                
            });
        }

        /*-----INICIALIZAR LAS FUNCIONES-----*/
        
        initialPuzzle = generarTabla(nivel);
        puzzle = JSON.parse(JSON.stringify(initialPuzzle));
        let solvedPuzzle = [];

        
        visualizarTabla(puzzle);
        crearOpciones();
        determinarComportamientos();

        /*-----ESTABLECER LA CUENTA ATRÁS-----*/

        var tiempoRestante = 0;

        if (nivel === 'principiante') {
                tiempoRestante = 60  
        } else if (nivel === 'intermedio') {
                tiempoRestante = 120
        } else if (nivel === 'avanzado') {
                tiempoRestante = 300
        }

        
        const tiempoTotal = tiempoRestante;
        var contenedorInfo = document.getElementById('cuenta-atras');
        
        var timerId = setInterval(countdown, 1000);
        document.querySelector('.recuadroAmarillo').style.visibility = 'visible'
    
            function countdown() {
                if (tiempoRestante === -1) {
                    clearInterval(timerId);
                    alert("El tiempo se ha agotado.");
                    localStorage.setItem('resultado', false)
                    location.replace('resultados.html')
                } else {
                    let minutos = Math.floor(tiempoRestante / 60)
                    let segundos = tiempoRestante % 60
                    contenedorInfo.textContent = minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
                    tiempoRestante--;
                }

                sessionStorage.setItem('tiempo', (tiempoTotal-tiempoRestante-1).toString()) // se le resta un segundo.
            }


        /*-----BOTON PARA RESETEAR EL TABLERO-----*/

        const botonResetear = document.getElementById("boton-reset")

        botonResetear.addEventListener('click', () => {
            tabla.innerHTML = '';
            puzzle = JSON.parse(JSON.stringify(initialPuzzle));
            console.log("Puzzle reseteado:", puzzle);
            visualizarTabla(puzzle);
            determinarComportamientos();
        });

        /*-----BOTÓN PARA COMPROBAR RESPUESTAS-----*/

        const botonRevisar = document.getElementById("boton-check")
        botonRevisar.addEventListener('click', revisarNekoku)
        
        function revisarNekoku() {
            
            let correcto = true;

            // Revisar fila
            for(let i = 0; i < puzzle.length; i++) {
                const numerosUnicos = new Set();

                puzzle[i].forEach(numero => {
                    if (numero === 0) {
                        correcto = false;
                    } else if(numerosUnicos.has(numero)) {
                        correcto = false;
                    }
                    numerosUnicos.add(numero);
                })
            }
            
            // Revisar columnas
            for (let j = 0; j < puzzle.length; j++) {
                const numerosUnicos = new Set();

                for (let i = 0; i < puzzle.length; i++) {
                    const numero = puzzle[i][j];

                    if (numero === 0) {
                        correcto = false;
                    } else if (numerosUnicos.has(numero)) {
                        correcto = false;
                    } else {
                        numerosUnicos.add(numero);
                    }
                }
            }
            
            // Revisar cuadrantes (9x9)
            if(puzzle.length === 9) {
                for (let fila = 0; fila < 9; fila += 3) {
                    for (let col = 0; col < 9; col += 3) {
                        const numerosUnicos = new Set();

                        for (let i = fila; i < fila + 3; i++) {
                            for (let j = col; j < col + 3; j++) {
                                const numero = puzzle[i][j];
                                if (numero === 0) {
                                    correcto = false;
                                } else if (numerosUnicos.has(numero)) {
                                    correcto = false;
                                } else {
                                    numerosUnicos.add(numero);
                                }
                            }
                        }
                    }
                }
            }
            
            // Si pasa todas las pruebas, te muestra los resultados.
            if(correcto) {
                localStorage.setItem('resultado', true)
                location.replace('resultados.html')
            } else {
                document.getElementById('errores').style.visibility = 'visible'
                // Borrar mensaje después de 5 segundos
                setTimeout(() => {
                    document.getElementById('errores').style.visibility = 'hidden';
                }, 5000);
            }

        }
    
        

        
    }

