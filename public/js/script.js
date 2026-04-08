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

const videos = document.querySelectorAll("video");
const gradientRow = document.querySelector('.gradient-row');

videos.forEach(video => {
  video.addEventListener("ended", () => {
    const isMobileViewport = window.matchMedia('(max-width: 767.98px)').matches;
    const scrollPc = document.getElementById("scrollDownPc");
    const scrollMovil = document.getElementById("scrollDownMovil");

    if (scrollPc && !isMobileViewport) scrollPc.classList.add("scroll-visible");
    if (scrollMovil && isMobileViewport) scrollMovil.classList.add("scroll-visible");
    if (gradientRow && isMobileViewport) gradientRow.classList.add("visible");
  });
});

// ! ================ ANIMACIONES GSAP ================

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const animatedLine = document.querySelector('#animatedLine');
  const logoFinal = document.querySelector('#logoFinal');
  const procesoSection = document.querySelector('#proceso');
  const floatingBtn = document.querySelector('.btn-flotante-directo');
  const baseLogoSrc = logoFinal?.getAttribute('src') || '';
  const alternateLogoSrc = baseLogoSrc.replace('coin-logo.png', 'coin-logo-alt.png');

  if (animatedLine && procesoSection) {
    console.log("✓ Línea animada encontrada");

    // Create the line animation - grows from top to bottom
    const lineAnimation = gsap.to(animatedLine, {
      attr: { height: 3000 },
      scrollTrigger: {
        trigger: '#proceso',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Check if we're at 50% progress for logo swap
          if (logoFinal && self.progress >= 0.5) {
            if (!logoFinal.dataset.alternateActive) {
              console.log("Logo swapped to alternate");
              
              // Fade out
              gsap.to(logoFinal, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  logoFinal.src = alternateLogoSrc;
                  logoFinal.classList.add('is-alt-logo');
                  // Fade in
                  gsap.to(logoFinal, {
                    opacity: 1,
                    duration: 0.3
                  });
                }
              });
              
              logoFinal.dataset.alternateActive = 'true';
            }
          } else if (logoFinal && logoFinal.dataset.alternateActive === 'true') {
            console.log("Logo swapped back to original");
            
            // Fade out
            gsap.to(logoFinal, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                logoFinal.src = baseLogoSrc;
                logoFinal.classList.remove('is-alt-logo');
                // Fade in
                gsap.to(logoFinal, {
                  opacity: 1,
                  duration: 0.3
                });
              }
            });
            
            logoFinal.dataset.alternateActive = 'false';
          }
        }
      }
    });
  }

  // Floating button visibility on scroll
  if (floatingBtn) {
    ScrollTrigger.create({
      trigger: '#proceso',
      start: 'top center',
      onEnter: () => {
        floatingBtn.classList.add('visible');
      },
      onLeaveBack: () => {
        floatingBtn.classList.remove('visible');
      }
    });
  }

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();
});

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
