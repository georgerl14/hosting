window.addEventListener('load', initScene)

let bullets = 9, score = 0

function initScene() { 
    let bottles = document.querySelectorAll('.bottle')
    bottles.forEach(bottle => {
        bottle.setAttribute('shootable', '')
    })

    let decoraciones = document.querySelectorAll('.decorado')
    decoraciones.forEach(decorado => {
        decorado.setAttribute('no_shootable', '')
    })

    document.querySelector('#textoBala').setAttribute('value', `${bullets} Balas`)
}

AFRAME.registerComponent('shootable', {
    init: function () {
        this.el.addEventListener('click', () => {
            if (bullets > 0) {
                dispararArma()
                
                this.el.setAttribute('animation', 'property: scale; to: 0 0 0; dur: 100');
                setTimeout(() => {
                    this.el.parentNode.removeChild(this.el);
                }, 300);

                const glassSound = document.querySelector('#glassbreak');
                glassSound.components.sound.playSound();
                
                puntuar()
                finalizar()
            }
        })
    }
})

AFRAME.registerComponent('no_shootable', {
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
    document.querySelector('#contador').setAttribute('value', `${++score} Botellas`)
}

function dispararArma() {
    const cursor = document.querySelector('[cursor]');
    const gun = document.querySelector('.model_gun');
    const gunSound = document.querySelector('#gunshot');

    gunSound.components.sound.playSound();

    cursor.setAttribute('material', 'color', 'red');
    
    document.querySelector('#textoBala').setAttribute('value', `${--bullets} Balas`)

    gun.setAttribute('animation__position', 'property: position; to: 0.02 -0.02 -0.03; dur: 200; easing: easeOutQuad');
    gun.setAttribute('animation__rotation', 'property: rotation; to: 220 0 190; dur: 200; easing: easeInQuad');

    setTimeout(() => {
        gun.setAttribute('animation__rotation', 'property: rotation; to: 180 0 190; dur: 200; easing: easeInQuad');
        gun.setAttribute('animation__position', 'property: position; to: 0.02 -0.02 -0.05; dur: 200; easing: easeOutQuad');
    }, 200);

    setTimeout(() => {
        cursor.setAttribute('material', 'color', 'white');
    }, 300);
}

function finalizar() {
    if (bullets == 0) {
        document.querySelector('#textoFinal').setAttribute('value', `Botellas disparadas: ${score}`)
        document.querySelector('#panelFinal').setAttribute('visible', 'true')
        document.querySelector('#textoBala').setAttribute('visible', 'false')
        document.querySelector('#contador').setAttribute('visible', 'false')
        document.querySelector('.model_gun').setAttribute('visible', 'false')

        setTimeout(function() {
            resetear()
        }, 2000);
    }
}

function resetear() {
    location.reload();
}
