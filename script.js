document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('section, .seccion-portada');
    const itemsPunto = document.querySelectorAll('.item-punto');
    const enlacesNavegacion = document.querySelectorAll('nav a');
    const botonMenuMovil = document.getElementById('botonMenuMovil');
    const menuNavegacion = document.getElementById('menuNavegacion');
    const fondoOscuroMenu = document.getElementById('fondoOscuroMenu');
    const botonSubirArriba = document.getElementById('botonSubirArriba');

    function alternarMenu() {
        const estaAbierto = menuNavegacion.classList.toggle('abierto');
        fondoOscuroMenu.classList.toggle('activo', estaAbierto);
        botonMenuMovil.innerHTML = estaAbierto ? '✕' : '☰';
        document.body.style.overflow = estaAbierto ? 'hidden' : '';
    }

    botonMenuMovil.addEventListener('click', alternarMenu);
    fondoOscuroMenu.addEventListener('click', alternarMenu);

    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', () => {
            if (menuNavegacion.classList.contains('abierto')) {
                alternarMenu();
            }
        });
    });

    function actualizarPuntoActivo() {
        let seccionActual = 'portada';

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 60) {
            seccionActual = 'contacto';
        } else {
            secciones.forEach(seccion => {
                const parteSuperior = seccion.offsetTop;
                if (window.scrollY >= (parteSuperior - 180)) {
                    seccionActual = seccion.getAttribute('id');
                }
            });
        }

        itemsPunto.forEach(item => {
            item.classList.remove('activo');
            if (item.getAttribute('data-seccion') === seccionActual) {
                item.classList.add('activo');
            }
        });

        enlacesNavegacion.forEach(enlace => {
            enlace.classList.remove('activo');
            if (enlace.getAttribute('href') === `#${seccionActual}`) {
                enlace.classList.add('activo');
            }
        });

        if (window.scrollY > 300) {
            botonSubirArriba.classList.add('mostrar');
        } else {
            botonSubirArriba.classList.remove('mostrar');
        }
    }

    window.addEventListener('scroll', actualizarPuntoActivo);
    actualizarPuntoActivo();

    botonSubirArriba.addEventListener('click', () => {
        botonSubirArriba.classList.add('animar');
        setTimeout(() => {
            botonSubirArriba.classList.remove('animar');
        }, 400);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const ImagenAmpliada = document.getElementById('ImagenAmpliada');
    const imagenVisor = document.getElementById('imagenVisor');
    const cerrarVisor = document.getElementById('cerrarVisor');
    const tarjetasInstalaciones = document.querySelectorAll('.tarjeta-instalacion');

    tarjetasInstalaciones.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            const imagen = tarjeta.querySelector('img');
            imagenVisor.src = imagen.src;
            ImagenAmpliada.classList.add('activo');
        });
    });

    cerrarVisor.addEventListener('click', () => {
        ImagenAmpliada.classList.remove('activo');
    });

    ImagenAmpliada.addEventListener('click', (evento) => {
        if (evento.target === ImagenAmpliada) {
            ImagenAmpliada.classList.remove('activo');
        }
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && ImagenAmpliada.classList.contains('activo')) {
            ImagenAmpliada.classList.remove('activo');
        }
    });
});