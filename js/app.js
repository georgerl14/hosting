window.addEventListener('load', initScene)

let bullets = 9, score = 0

function initScene() { 
    let botellas = document.querySelectorAll('.bottle')
    botellas.forEach(botella => {
        botella.setAttribute('disparable_puntuable', '')
    })

    let decoraciones = document.querySelectorAll('.decorado')
    decoraciones.forEach(decorado => {
        decorado.setAttribute('disparable_no_puntuable', '')
    })

    document.querySelector('#textoBala').setAttribute('value', `${bullets} Balas`)
}

AFRAME.registerComponent('disparable_puntuable', {
    init: function () {
        this.el.addEventListener('click', () => {
            if (bullets > 0) {
                dispararArma()
                
                this.el.setAttribute('animation', 'property: scale; to: 0 0 0; dur: 100');
                setTimeout(() => {
                    this.el.parentNode.removeChild(this.el);
                }, 300);

                puntuar()
                finalizar()
            }
        })
    }
})

AFRAME.registerComponent('disparable_no_puntuable', {
    init: function () {
        this.el.addEventListener('click', () => {
            if (bullets > 0) {
                dispararArma()
                finalizar()
            }
        })
    }
})

function puntuar() {
    document.querySelector('#glassbreak').components.sound.playSound();
    document.querySelector('#contador').setAttribute('value', `${++score} Botellas`)
}

function dispararArma() {
    const cursor = document.querySelector('[cursor]');
    const gun = document.querySelector('.model_gun');

    //Realizar el sonido de disparo.
    document.querySelector('#gunshot').components.sound.playSound();

    //Cambiar el color del cursor a rojo.
    cursor.setAttribute('material', 'color', 'red');
    
    //Realizar animaciones de posicion y rotación a la pistola.
    gun.setAttribute('animation__position', 'property: position; to: 0.2 -0.02 -0.08; dur: 200; easing: easeOutQuad');
    gun.setAttribute('animation__rotation', 'property: rotation; to: 220 0 190; dur: 200; easing: easeInQuad');
    
    //Revertir las animaciones de posicion y rotación a la pistola.
    setTimeout(() => {
        gun.setAttribute('animation__rotation', 'property: rotation; to: 180 0 190; dur: 200; easing: easeInQuad');
        gun.setAttribute('animation__position', 'property: position; to: 0.2 -0.02 -0.1; dur: 200; easing: easeOutQuad');
    }, 200);

    //Cambiar el color del cursor a blanco, tras 300 miligundos.
    setTimeout(() => {
        cursor.setAttribute('material', 'color', 'white');
    }, 300);
    
    //Modificar el texto de munición y reducir la cantidad de balas.
    document.querySelector('#textoBala').setAttribute('value', `${--bullets} Balas`)
}

function finalizar() {
    if (bullets == 0) {
        setTimeout(function() {
            document.querySelector('#textoFinal').setAttribute('value', `Botellas disparadas: ${score}`)
            document.querySelector('#panelFinal').setAttribute('visible', 'true')
            document.querySelector('#textoBala').setAttribute('visible', 'false')
            document.querySelector('#contador').setAttribute('visible', 'false')
            document.querySelector('.model_gun').setAttribute('visible', 'false')
        }, 500);
        setTimeout(function() {
            resetear()
        }, 2000);
    }
}

function resetear() {
    location.reload();
}
