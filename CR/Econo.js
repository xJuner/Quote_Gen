let idiomaSeleccionado = 'es';

function cambiarIdioma() {
    idiomaSeleccionado = document.getElementById("idioma").value;
    

    document.querySelector('label[for="declina"]').textContent = idiomaSeleccionado === 'es' ? 'Declina' : 'Decline';
    document.querySelector('label[for="basica"]').textContent = idiomaSeleccionado === 'es' ? 'Basica' : 'Basic';
    document.querySelector('label[for="total"]').textContent = idiomaSeleccionado === 'es' ? 'Total' : 'Full';
}

function habilitarCoberturas() {
    const imagenSeleccionada = document.getElementById("imagen").value.split(':')[0];
    
    const radioDeclinaInput = document.querySelector('input[value="Declina"]');
    
    if (imagenSeleccionada === "Staria") {
        const labelElement = radioDeclinaInput.nextElementSibling;
        
        radioDeclinaInput.style.display = "none";
        if (labelElement) {
            labelElement.style.display = "none";
        }
        
        if (radioDeclinaInput.checked) {
            document.querySelector('input[value="Basica"]').checked = true;
        }
    } else {
        radioDeclinaInput.style.display = "";
        const labelElement = radioDeclinaInput.nextElementSibling;
        if (labelElement) {
            labelElement.style.display = "inline-block";
        }
    }
}

function generarImagen() {
    function traducirCobertura(cobertura, idioma) {
        if (idioma === 'es') {
            if (cobertura === 'Decline') return 'Declina';
            if (cobertura === 'Basic') return 'Basica';
            if (cobertura === 'Full') return 'Total';
        } else {
            if (cobertura === 'Declina') return 'Declined';
            if (cobertura === 'Basica') return 'Basic';
            if (cobertura === 'Total') return 'Full';
        }
        return cobertura; 
    }

    const imagenSeleccionada = document.getElementById("imagen").value;
    const [vehiculo, rutaImagen] = imagenSeleccionada.split(':');
    

    const coberturaSeleccionada = document.querySelector('input[name="cobertura"]:checked');
    

    if (!coberturaSeleccionada) {
        alert(idiomaSeleccionado === 'es' ? "Por favor, selecciona una cobertura." : "Please select a coverage.");
        return;
    }
    
    const cobertura = coberturaSeleccionada.value;
    
    const precio = document.getElementById("precio").value;
    const fechaRecoleccion = document.getElementById("fechaRecoleccion").value;
    const fechaDevolucion = document.getElementById("fechaDevolucion").value;
    const ubicacionRecoleccion = document.getElementById("ubicacionRecoleccion").value;
    const ubicacionDevolucion = document.getElementById("ubicacionDevolucion").value;
    const texto = document.getElementById("texto").value;
    const quotation = document.getElementById("Quote").value;

    let deposito;

    if (vehiculo === "Accent" || vehiculo === "Elantra" || vehiculo === "Tucson" || vehiculo === "Kona" || vehiculo === "Rav4") {
        if (cobertura === "Declina") {
            deposito = "$750";
        } else if (cobertura === "Basica") {
            deposito = "$500";
        } else if (cobertura === "Total") {
            deposito = "$250";
        }
    } else if (vehiculo === "Santa Fe" || vehiculo === "Staria") {
        if (cobertura === "Declina") {
            deposito = "$950";
        } else if (cobertura === "Basica") {
            deposito = "$750";
        } else if (cobertura === "Total") {
            deposito = "$250";
        }
    } else {
        deposito = "hasta $1,000";
    }

    if (!precio) {
        alert(idiomaSeleccionado === 'es' ? "Por favor, ingresa un precio válido." : "Please enter a valid price.");
        return;
    }

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.display = "flex";

    resultadoDiv.innerHTML = `
        <div class="tarjeta">
            <div class="encabezado">
                <img src="logo.png" alt="Logo">
                ${idiomaSeleccionado === 'es' ? 'Vehículo - Clase' : 'Vehicle - Class'}
            </div>
            <div class="imagen">
                <img src="${rutaImagen}" alt="Vehículo">
            </div>
            <div class="contenido">
                <h2>Hyundai ${vehiculo} ${idiomaSeleccionado === 'es' ? 'o Similar' : 'or Similar'}</h2>
                <div class="detalles">
                    <p><i class="fas fa-shield-alt"></i> <strong>${idiomaSeleccionado === 'es' ? 'Cobertura' : 'Coverage'}: ${traducirCobertura(cobertura, idiomaSeleccionado)}</strong></p>
                    <p><i class="fas fa-lock"></i> <strong>${idiomaSeleccionado === 'es' ? 'Depósito en Garantía' : 'Security Deposit'}: <span class="deposito">${deposito}</span></strong></p>
                    <p><i class="fas fa-calendar-alt"></i> <strong>${idiomaSeleccionado === 'es' ? 'Fecha de Recolección' : 'Pick-up Date'}:</strong> ${fechaRecoleccion}</p>
                    <p><i class="fas fa-calendar-alt"></i> <strong>${idiomaSeleccionado === 'es' ? 'Fecha de Devolución' : 'Drop-off Date'}:</strong> ${fechaDevolucion}</p>
                    <p><i class="fas fa-map-marker-alt"></i> <strong>${idiomaSeleccionado === 'es' ? 'Ubicación de Recolección' : 'Pick-up Location'}:</strong> ${ubicacionRecoleccion}</p>
                    <p><i class="fas fa-map-marker-alt"></i> <strong>${idiomaSeleccionado === 'es' ? 'Ubicación de Devolución' : 'Drop-off Location'}:</strong> ${ubicacionDevolucion}</p>
                    <p><i class="fas fa-file-invoice"></i> <strong>${idiomaSeleccionado === 'es' ? 'Número de Cotización' : 'Quote Number'}:</strong> ${quotation}</p>
                    <p id="textoAdicionalResultado"><span id="iconoTextoResultado"><i class="fas fa-file-alt"></i></span> <strong>${texto}</strong></p>
                </div>
                <br>
                <div class="precio">$${precio} USD<br>${idiomaSeleccionado === 'es' ? 'Estimado total de la Renta Impuestos incluidos' : 'Estimated Total Taxes included'}</div>
                <br>
                <p class="nota" style="color: red; font-weight: bold;">${idiomaSeleccionado === 'es' ? '* Cotización válida por 24 horas' : '* Quotation valid for 24 hours'}</p>
            </div>
        </div>
    `;

    const textoAdicionalResultado = document.getElementById("textoAdicionalResultado");
    if (texto.trim() === "") {
        textoAdicionalResultado.style.display = "none"; 
    } else {
        textoAdicionalResultado.style.display = "block"; 
    }
}

function limpiarFormulario() {

    const confirmacion = confirm("¿Estás seguro de que deseas limpiar el formulario?");
    
    if (confirmacion) {
        document.getElementById("vehiculoForm").reset(); 


        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.style.display = "none";
        resultadoDiv.innerHTML = '';
    }
}

function guardarComoImagen() {
    const resultadoDiv = document.getElementById("resultado");

    html2canvas(resultadoDiv, {
        backgroundColor: null,
        scale: 2
    }).then((canvas) => {
        const croppedCanvas = recortarCanvas(canvas);

        const enlace = document.createElement('a');
        enlace.href = croppedCanvas.toDataURL('image/png');
        enlace.download = 'cotizacion.png'; 
        enlace.click();
    }).catch((error) => {
        console.error('Error al guardar la imagen:', error);
    });
}

function recortarCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    let minX = w, minY = h, maxX = 0, maxY = 0;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            if (!(data[i] > 240 && data[i+1] > 240 && data[i+2] > 240 && data[i+3] > 0)) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (minX > maxX || minY > maxY) return canvas;

    const croppedWidth = maxX - minX + 1;
    const croppedHeight = maxY - minY + 1;
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;
    const croppedCtx = croppedCanvas.getContext('2d');
    croppedCtx.drawImage(canvas, minX, minY, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);

    return croppedCanvas;
}


function copyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  
  textarea.select();
  document.execCommand('copy');
  
  document.body.removeChild(textarea);
  
  showCopyFeedback();
}


function showCopyFeedback() {
  const feedback = document.createElement('div');
  feedback.textContent = 'Se copio con exito';
  feedback.style.position = 'fixed';
  feedback.style.top = '20px';
  feedback.style.right = '20px';
  feedback.style.padding = '10px 20px';
  feedback.style.background = '#4CAF50';
  feedback.style.color = 'white';
  feedback.style.borderRadius = '4px';
  feedback.style.zIndex = '9999';
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    document.body.removeChild(feedback);
  }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.plantillas button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-text');
      if (textToCopy) {
        copyText(textToCopy);
      }
    });
  });
});