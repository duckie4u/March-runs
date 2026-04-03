// ! ================ CARGAR IMÁGENES COMO BACKGROUND ================

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

// // * Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// // * Animación de línea vertical de fondo
window.addEventListener('load', () => {
  const verticalLine = document.querySelector("#verticalLine");
  const logoFinal = document.querySelector("#logoFinal");
  const procesoSection = document.querySelector("#proceso");
  
  if (verticalLine && procesoSection) {
    console.log("✓ Línea vertical encontrada"); // Debug
    
    // // * Animar la línea: se revela mientras scrolleamos
    gsap.to(verticalLine, {
      strokeDashoffset: 0,
      duration: 2,
      scrollTrigger: {
        trigger: "#proceso",
        start: "top 50%",
        end: "bottom 30%",
        scrub: 1,
        invalidateOnRefresh: true,
        // markers: true  // Descomenta para debug
      }
    });
  }

  // // * Cambiar imagen del logo cuando esté centrado en pantalla
  if (logoFinal) {
    console.log("✓ Logo encontrado"); // Debug
    
    let isAlternate = false;
    const originalSrc = logoFinal.src;
    const alternateSrc = originalSrc.replace('coin-logo.png', 'coin-logo-alt.png');

    ScrollTrigger.create({
      trigger: ".logo-section",
      start: "center 40%",
      end: "center 40%",
      onEnter: () => {
        if (!isAlternate) {
          console.log("Logo cambiado a alternativo"); // Debug
          logoFinal.src = alternateSrc;
          isAlternate = true;
        }
      },
      onLeave: () => {
        if (isAlternate) {
          console.log("Logo vuelto a original"); // Debug
          logoFinal.src = originalSrc;
          isAlternate = false;
        }
      }
    });
  }

  // // * Refresh ScrollTrigger después de que todo se cargue
  ScrollTrigger.refresh();
});

// // * Refresh en caso de resize
window.addEventListener('resize', () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.refresh());
});

// ! ================ ENVÍO DE FORMULARIO ================
// // * Conectado a Formspree: https://formspree.io/f/xvzvrneb

const $form = document.querySelector('#contacto form');
const $btn = document.querySelector('#btnEnviar');

$form.addEventListener('submit', async (event) => {
    event.preventDefault(); // // ? Evita que la página se recargue
    
    // // * Guardar texto original del botón
    const originalText = $btn.innerText;
    $btn.innerText = "Enviando... 🔨";
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
        $btn.innerText = "¡Enviado!";
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
