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
    document.querySelector('#textoBala').setAttribute('value', `${--bullets} Balas`)
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
