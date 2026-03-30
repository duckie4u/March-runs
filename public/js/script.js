  function freezeVideo(scrollDownId) {
    const scrollElement = document.getElementById(scrollDownId);
    scrollElement.classList.add("show");
}

function handleVideoEnd(scrollDownId) {
    freezeVideo(scrollDownId);
}

const desktopVideo = document.querySelector(".d-none.d-md-block video");
const mobileVideo = document.querySelector(".d-block.d-md-none video");

if (desktopVideo) {
    desktopVideo.addEventListener("ended", () => handleVideoEnd("scrollDownPc"));
}
if (mobileVideo) {
    mobileVideo.addEventListener("ended", () => handleVideoEnd("scrollDownMovil"));
}

gsap.registerPlugin(ScrollTrigger);

// Animación de arco de luz: se dibuja cuando scrolleamos hacia él
gsap.to("#animatedArc", {
  strokeDashoffset: 0,
  duration: 2,
  scrollTrigger: {
    trigger: ".espacio-linea", 
    start: "top center",
    end: "bottom center",
    scrub: 1,
    toggleActions: "play none none reverse"
  }
})

// Animación de la imagen coin-1: fade in y scale
gsap.from(".coin-logo", {
  opacity: 0,
  scale: 0.8,
  y: 50,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".coin-logo",
    start: "top 75%",
    end: "top 25%",
    scrub: 0.5,
    markers: false
  }
});
