// Lógica de video inicial
function freezeVideo(scrollDownId) {
    const scrollElement = document.getElementById(scrollDownId);
    if(scrollElement) scrollElement.classList.add("show");
}

function handleVideoEnd(scrollDownId) {
    freezeVideo(scrollDownId);
}

const desktopVideo = document.querySelector(".d-none.d-md-block video");
const mobileVideo = document.querySelector(".d-block.d-md-none video");

if (desktopVideo) desktopVideo.addEventListener("ended", () => handleVideoEnd("scrollDownPc"));
if (mobileVideo) mobileVideo.addEventListener("ended", () => handleVideoEnd("scrollDownMovil"));

// --- ANIMACIONES GSAP ---
gsap.registerPlugin(ScrollTrigger);

// Esperar a que el DOM esté listo
window.addEventListener('load', () => {
  const path = document.querySelector("#animatedArc");
  
  if (path) {
    // Calcular la longitud real del path
    const pathLength = path.getTotalLength();
    
    // Configurar estado inicial
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });
    
    // Animar el arco con scroll suave
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#proceso",
        start: "top 20%",
        end: "bottom 50%",
        scrub: 0.5, // Suavizar animación
        invalidateOnRefresh: true // Recalcular si cambia el viewport
      }
    });
  }
});

// Animaciones de contenido con mejor timing
gsap.from(".primer", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".primer",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

gsap.from(".segundo", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".segundo",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

gsap.from(".tercer", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".tercer",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});