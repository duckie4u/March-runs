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

const path = document.querySelector("#animatedArc");

// 1. Calculamos la longitud real de la ruta SVG
const pathLength = path.getTotalLength();

// 2. Configuramos el estado inicial de la línea (oculta)
gsap.set(path, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength
});

// 3. Animación de la línea dibujándose al hacer scroll
gsap.to(path, {
  strokeDashoffset: 0,
  ease: "none",
  scrollTrigger: {
    trigger: "#proceso",
    start: "top center", // Empieza cuando la sección 'proceso' llega al centro
    end: "center center", // Termina de dibujarse justo cuando llegas al coin
    scrub: 1 // Suaviza la animación de retroceso/avance
  }
});

// 4. Animación del Coin y el texto
gsap.from(".primer", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".primer",
    start: "top 80%", // Aparece cuando el row está al 80% de la ventana
    toggleActions: "play none none reverse"
  }
});