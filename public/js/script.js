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
