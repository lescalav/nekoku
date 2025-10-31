export const mostrarResultados = function() {
    let tiempoBruto = sessionStorage.getItem('tiempo');
    let minutos = parseInt(tiempoBruto / 60);
    let segundos = parseInt(tiempoBruto%60);
    let segundosMinutos = minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
    let text = document.getElementById("tiempoutilizado").textContent = segundosMinutos;

    let partidaGanada = localStorage.getItem('resultado');

    if(partidaGanada === 'true') {
        document.querySelector('h1').textContent = '¡Has superado este ---NEKOKU---!'
        document.getElementById('textoTiempo').textContent = 'Lo has hecho en'
        document.querySelector('.recuadroAmarillo').style.visibility = 'visible'
    } else {
        document.querySelector('h1').textContent = '¡Qué mal! No has superado este ---NEKOKU---'
    }

    document.addEventListener('keydown', function(s) {
        if(s.key === 's'|| s.key === 'S') {
            location.replace('bienvenida.html')
        } else if(s.key === 'n' || s.key === 'N') {
            //Tendria que desloggear y borrar el session storage
            location.replace('index.html')
        }
    })


}
