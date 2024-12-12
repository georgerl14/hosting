window.addEventListener('load', initScene)

let bullets = 9, score = 0
let canShoot = true;

function initScene() { 
    let botellas = document.querySelectorAll('.bottle')
    botellas.forEach(botella => {
        botella.setAttribute('disparable_puntuable', '')
    })

    let decoraciones = document.querySelectorAll('.decorado')
    decoraciones.forEach(decorado => {
        decorado.setAttribute('disparable_no_puntuable', '')
    })
}

AFRAME.registerComponent('disparable_puntuable', {
    init: function () {
        this.el.addEventListener('click', () => {
            if (bullets > 0 && canShoot) {
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
            if (bullets > 0 && canShoot) {
                dispararArma()
                finalizar()
            }
        })
    }
})

function puntuar() {
    document.querySelector('#glassbreak').components.sound.playSound();
    ++score
}

function dispararArma() {
    const cursor = document.querySelector('[cursor]');
    const gun = document.querySelector('.model_gun');
    const bullet = document.querySelector(`#bullet${bullets}`)

    //Realizar el sonido de disparo.
    document.querySelector('#gunshot').components.sound.playSound();

    //Cambiar el color del cursor a rojo.
    cursor.setAttribute('material', 'color', 'red');
    
    //Realizar animaciones de posicion y rotación a la pistola.
    gun.setAttribute('animation__position', 'property: position; to: 0 -0.3 -0.65; dur: 200; easing: easeOutQuad');
    gun.setAttribute('animation__rotation', 'property: rotation; to: 220 0 190; dur: 200; easing: easeInQuad');
    
    //Revertir las animaciones de posicion y rotación a la pistola.
    setTimeout(() => {
        gun.setAttribute('animation__rotation', 'property: rotation; to: 180 0 180; dur: 200; easing: easeInQuad');
        gun.setAttribute('animation__position', 'property: position; to: 0 -0.3 -0.6; dur: 200; easing: easeOutQuad');
    }, 200);

    //Modifica la opacidad de las balas a la mita.
    bullet.setAttribute('material', 'opacity', '0.5')
    
    canShoot = false
    --bullets

    setTimeout(() => {
        canShoot = true
        cursor.setAttribute('material', 'color', 'white')
    }, 700)
}

function finalizar() {
    if (bullets == 0) {
        setTimeout(function() {
            document.querySelector('#textoFinal').setAttribute('value', `Botellas rotas: ${score}`)
            document.querySelector('#panelFinal').setAttribute('visible', 'true')
            
            document.querySelector('.model_gun').setAttribute('visible', 'false')
            document.querySelector('#bulletIcons').setAttribute('visible', 'false')
        }, 500);
        
        setTimeout(function() {
            resetear()
        }, 2500);
    }
}

function resetear() {
    location.reload();
}



