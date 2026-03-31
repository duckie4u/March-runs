// ! ================ CARGAR IMÁGENES COMO BACKGROUND ================
// // * Convierte las imágenes picture en background-image para llenar la tarjeta

document.querySelectorAll('.referidos-card-image').forEach(container => {
  const picture = container.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const source = picture.querySelector('source');
      const imageUrl = source ? source.srcset : img.src;
      container.style.backgroundImage = `url('${imageUrl}')`;
    }
  }
});

// ! ================ LÓGICA DE VIDEO INICIAL ================
// // * Muestra el scroll-down indicator cuando el video termina

function freezeVideo(scrollDownId) {
    const scrollElement = document.getElementById(scrollDownId);
    if(scrollElement) scrollElement.classList.add("show");
}

function handleVideoEnd(scrollDownId) {
    freezeVideo(scrollDownId);
}

// // ? Selecciona videos según breakpoint (desktop/móvil)
const desktopVideo = document.querySelector(".d-none.d-md-block video");
const mobileVideo = document.querySelector(".d-block.d-md-none video");

if (desktopVideo) desktopVideo.addEventListener("ended", () => handleVideoEnd("scrollDownPc"));
if (mobileVideo) mobileVideo.addEventListener("ended", () => handleVideoEnd("scrollDownMovil"));

// ! ================ ANIMACIONES GSAP ================
// // * Requiere: ScrollTrigger plugin para scroll-linked animations

gsap.registerPlugin(ScrollTrigger);

// // ? Esperar a que el DOM esté completamente cargado
// // ! getTotalLength() solo funciona cuando el SVG está renderizado
window.addEventListener('load', () => {
  const mainArc = document.querySelector("#animatedArc");
  const tails = [
    document.querySelector("#cometTail-1"),
    document.querySelector("#cometTail-2"),
    document.querySelector("#cometTail-3"),
    document.querySelector("#cometTail-4")
  ];
  
  if (mainArc) {
    // // * Calcular longitudes reales de los paths SVG
    const mainArcLength = mainArc.getTotalLength();
    const tailLengths = tails.map(tail => tail ? tail.getTotalLength() : 0);
    
    // // * Configurar estado INICIAL: paths están ocultos
    gsap.set(mainArc, {
      strokeDasharray: mainArcLength,
      strokeDashoffset: mainArcLength
    });
    
    // // ? Configurar colas ocultas inicialmente
    tails.forEach((tail, index) => {
      if (tail) {
        gsap.set(tail, {
          strokeDasharray: tailLengths[index],
          strokeDashoffset: tailLengths[index]
        });
      }
    });
    
    // // ! LÍNEA PRINCIPAL: Se revela al scrollear de 0% a 50%
    gsap.to(mainArc, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#proceso",
        start: "top 20%",      // // ? Empieza cuando #proceso esté al 20% del viewport
        end: "50% 50%",        // // ? Termina a mitad de la sección
        scrub: 0.5,            // // ? Suavidad: 0.5s delay
        invalidateOnRefresh: true
      }
    });
    
    // // ! COLAS: Se revelan con delay después de la línea principal
    tails.forEach((tail, index) => {
      if (tail) {
        gsap.to(tail, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#proceso",
            start: "35% 50%",    // // ? Empieza más tarde (efecto de dispersión)
            end: "100% 50%",
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });
      }
    });
  }
});

// ! ================ ANIMACIONES DE CONTENIDO ================
// // * Fade-in + movimiento vertical en cada sección

gsap.registerPlugin(ScrollTrigger);

const mainPath = document.querySelector("#animatedArc");
const tails = gsap.utils.toArray([
  "#cometTail-1",
  "#cometTail-2",
  "#cometTail-3",
  "#cometTail-4"
]);

const totalLength = mainPath.getTotalLength();

// inicial
gsap.set(mainPath, {
  strokeDasharray: totalLength,
  strokeDashoffset: totalLength
});

tails.forEach(t => {
  const len = t.getTotalLength();
  gsap.set(t, {
    strokeDasharray: len,
    strokeDashoffset: len,
    opacity: 0
  });
});

// timeline principal
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#proceso",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.5
  }
});

// animación de la línea
tl.to(mainPath, {
  strokeDashoffset: 0,
  ease: "none"
});

// aparición progresiva de coins (sincronizadas con la línea)
tl.to(".coin-1", { opacity: 1, scale: 1 }, 0.3);
tl.to(".coin-2", { opacity: 1, scale: 1 }, 0.55);
tl.to(".coin-3", { opacity: 1, scale: 1 }, 0.75);

// 🔥 momento CLAVE: cuando se centra
tl.to(tails, {
  strokeDashoffset: 0,
  opacity: 1,
  stagger: 0.1,
  ease: "power2.out"
}, 0.82);
// ! ================ ENVÍO DE FORMULARIO ================
// // * Conectado a Formspree: https://formspree.io/f/xvzvrneb

const $form = document.querySelector('#contacto form');
const $btn = document.querySelector('#btnEnviar');

$form.addEventListener('submit', async (event) => {
    event.preventDefault(); // // ? Evita que la página se recargue
    
    // // * Guardar texto original del botón
    const originalText = $btn.innerText;
    $btn.innerText = "Enviando... 🚀";
    $btn.disabled = true;

    // // ? Recolectar datos del formulario
    const formData = new FormData($form);

    // // * Enviar vía POST a Formspree
    const response = await fetch($form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    // // ! SI ENVÍO EXITOSO
    if (response.ok) {
        $form.reset(); // // ? Limpiar campos
        $btn.innerText = "¡Mensaje Enviado! ✅";
        $btn.classList.replace('btn-metallic', 'btn-success'); // // ? Cambiar a verde
        
        // // ? Restaurar botón después de 4 segundos
        setTimeout(() => {
            $btn.innerText = originalText;
            $btn.disabled = false;
            $btn.classList.replace('btn-success', 'btn-metallic');
        }, 4000);

    } else {
        // // ! ERROR EN ENVÍO
        alert("Algo falló. Revisa tu conexión.");
        $btn.innerText = originalText;
        $btn.disabled = false;
    }
});
