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
  const processIntro = document.querySelector('.process-intro');
  const processSteps = gsap.utils.toArray('.process-step');
  const dynamicCards = gsap.utils.toArray('.dynamic-card');
  const floatingBtn = document.querySelector('.btn-flotante-directo');
  const floatingBtnContent = floatingBtn?.querySelector('.btn-flotante-content');
  const baseLogoSrc = logoFinal?.getAttribute('src') || '';
  const alternateLogoSrc = baseLogoSrc.replace('coin-logo.png', 'coin-logo-alt.png');
  let floatingBtnTiltInterval;

  const triggerFloatingBtnTilt = () => {
    if (!floatingBtnContent) return;
    floatingBtnContent.classList.remove('is-tilting');
    void floatingBtnContent.offsetWidth;
    floatingBtnContent.classList.add('is-tilting');
  };

  const startFloatingBtnAttention = () => {
    if (!floatingBtn) return;
    floatingBtn.classList.add('visible');
    triggerFloatingBtnTilt();
    clearInterval(floatingBtnTiltInterval);
    floatingBtnTiltInterval = window.setInterval(triggerFloatingBtnTilt, 4500);
  };

  const stopFloatingBtnAttention = () => {
    if (!floatingBtn) return;
    floatingBtn.classList.remove('visible');
    clearInterval(floatingBtnTiltInterval);
    floatingBtnContent?.classList.remove('is-tilting');
  };

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

  if (processIntro) {
    gsap.from(processIntro.querySelectorAll('.process-kicker, .process-heading'), {
      opacity: 0,
      y: 36,
      stagger: 0.14,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: processIntro,
        start: 'top 82%'
      }
    });
  }

  processSteps.forEach((step, index) => {
    const copyItems = step.querySelectorAll('.process-copy > *');
    const coinWrap = step.querySelector('.process-coin-wrap');
    const coin = step.querySelector('.coin-logo');
    const direction = index % 2 === 0 ? 1 : -1;

    const stepTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: step,
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      }
    });

    stepTimeline.from(copyItems, {
      opacity: 0,
      y: 44,
      stagger: 0.14,
      duration: 0.82,
      ease: 'power3.out'
    });

    if (coinWrap && coin) {
      stepTimeline.from(coinWrap, {
        opacity: 0,
        x: direction * 70,
        duration: 0.78,
        ease: 'power3.out'
      }, 0.08);

      stepTimeline.from(coin, {
        scale: 0.4,
        rotation: direction * 24,
        y: 28,
        duration: 1.05,
        ease: 'back.out(1.7)',
        transformOrigin: '50% 50%'
      }, 0.08);
    }
  });

  dynamicCards.forEach((card, index) => {
    const direction = index % 2 === 0 ? 1 : -1;

    gsap.from(card, {
      opacity: 0,
      y: 68,
      rotateX: 9,
      rotateZ: direction * 2.2,
      scale: 0.94,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 84%',
        toggleActions: 'play none none reverse'
      }
    });

    const cardText = card.querySelectorAll('h2, p, button, label, input');
    if (cardText.length) {
      gsap.from(cardText, {
        opacity: 0,
        y: 22,
        stagger: 0.06,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });

  // Floating button visibility on scroll
  if (floatingBtn) {
    ScrollTrigger.create({
      trigger: '#proceso',
      start: 'top center',
      onEnter: startFloatingBtnAttention,
      onEnterBack: startFloatingBtnAttention,
      onLeaveBack: stopFloatingBtnAttention
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
