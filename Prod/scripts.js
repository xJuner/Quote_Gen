document.addEventListener('DOMContentLoaded', () => {
    const locButtons = document.querySelectorAll('input[name="ubicacion"]');
    const formContainers = document.querySelectorAll('.form-container');

    const showForm = (formId) => {
        formContainers.forEach(form => {
            form.style.display = 'none';
        });
        const targetForm = document.getElementById(formId);
        if (targetForm) {
            targetForm.style.display = 'block';
        }
    };

    if (locButtons.length > 0) {
        locButtons.forEach(button => {
            button.addEventListener('change', (event) => {
                const targetId = event.target.getAttribute('data-target');
                showForm(targetId);
                habilitarCoberturas();
                cambiarIdioma();
            });
        });
        const initialChecked = document.querySelector('input[name="ubicacion"]:checked');
        if (initialChecked) {
            showForm(initialChecked.getAttribute('data-target'));
        }
    }

    const buttons = document.querySelectorAll('.plantillas button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            if (textToCopy) {
                copyText(textToCopy);
            }
        });
    });

    habilitarCoberturas();
    cambiarIdioma();
});

let idiomaSeleccionado = 'es';

function cambiarIdioma() {
    idiomaSeleccionado = document.getElementById("idioma").value;

    const form1 = document.getElementById('vehiculoForm');
    if (form1 && form1.style.display !== 'none') {
        const declinaLabel = form1.querySelector('label[for="declina"]');
        const basicaLabel = form1.querySelector('label[for="basica"]');
        const totalLabel = form1.querySelector('label[for="total"]');

        if (declinaLabel) declinaLabel.textContent = idiomaSeleccionado === 'es' ? 'Declina' : 'Decline';
        if (basicaLabel) basicaLabel.textContent = idiomaSeleccionado === 'es' ? 'Basica' : 'Basic';
        if (totalLabel) totalLabel.textContent = idiomaSeleccionado === 'es' ? 'Total' : 'Full';
    }

    const form2 = document.getElementById('electForm');
    if (form2 && form2.style.display !== 'none') {
        // Corrected IDs to match the HTML
        const declinaLabel = form2.querySelector('label[for="declinatxt"]');
        const basicaLabel = form2.querySelector('label[for="basicatxt"]');
        const totalLabel = form2.querySelector('label[for="totaltxt"]');

        if (declinaLabel) declinaLabel.textContent = idiomaSeleccionado === 'es' ? 'Declina' : 'Decline';
        if (basicaLabel) basicaLabel.textContent = idiomaSeleccionado === 'es' ? 'Basica' : 'Basic';
        if (totalLabel) totalLabel.textContent = idiomaSeleccionado === 'es' ? 'Total' : 'Full';
    }
}

function habilitarCoberturas() {
    const form1 = document.getElementById('vehiculoForm');
    if (form1 && form1.style.display !== 'none') {
        const imagenElement = form1.querySelector("#imagen");
        if (!imagenElement) return;

        const imagenSeleccionada = imagenElement.value.split(':')[0];
        const radioDeclinaInput = form1.querySelector('input[value="Declina"]');

        if (!radioDeclinaInput) return;

        if (imagenSeleccionada === "Staria") {
            const labelElement = form1.querySelector('label[for="declina"]');
            radioDeclinaInput.style.display = "none";
            if (labelElement) labelElement.style.display = "none";
            if (radioDeclinaInput.checked) {
                const basicaInput = form1.querySelector('input[value="Basica"]');
                if (basicaInput) basicaInput.checked = true;
            }
        } else {
            const labelElement = form1.querySelector('label[for="declina"]');
            radioDeclinaInput.style.display = "";
            if (labelElement) labelElement.style.display = "inline-block";
        }
    }

    const form2 = document.getElementById('electForm');
    if (form2 && form2.style.display !== 'none') {
        const imagenElement = form2.querySelector("#imagen2");
        if (!imagenElement) return;

        const imagenSeleccionada = imagenElement.value.split(':')[0];
        const radioDeclinaInput = form2.querySelector('input[value="Declina"]');

        if (!radioDeclinaInput) return;

        if (imagenSeleccionada === "Staria") {
             const labelElement = form2.querySelector('label[for="declinatxt"]');
             radioDeclinaInput.style.display = "none";
             if (labelElement) labelElement.style.display = "none";
             if (radioDeclinaInput.checked) {
                 const basicaInput = form2.querySelector('input[value="Basica"]');
                 if (basicaInput) basicaInput.checked = true;
             }
        } else {
            const labelElement = form2.querySelector('label[for="declinatxt"]');
            radioDeclinaInput.style.display = "";
            if (labelElement) labelElement.style.display = "inline-block";
        }
    }
}

// Global function for coverage translation
function traducirCobertura(cobertura, idioma) {
    if (idioma === 'es') {
        if (cobertura === 'Decline') return 'Declina';
        if (cobertura === 'Basic') return 'Basica';
        if (cobertura === 'Full') return 'Total';
    } else {
        if (cobertura === 'Declina') return 'Decline';
        if (cobertura === 'Basica') return 'Basic';
        if (cobertura === 'Total') return 'Full';
    }
    return cobertura;
}

// Global function for Form 1 deposit calculation
function calculateDeposito_form1(vehiculo, cobertura) {
    const smallVehicles = ["Accent", "Elantra", "Tucson", "Kona", "Rav4"];
    const largeVehicles = ["Santa Fe", "Staria"];

    if (smallVehicles.includes(vehiculo)) {
        switch(cobertura) {
            case "Declina": return "$750";
            case "Basica": return "$500";
            case "Total": return "$250";
            default: return "$500";
        }
    } else if (largeVehicles.includes(vehiculo)) {
        switch(cobertura) {
            case "Declina": return "$950";
            case "Basica": return "$750";
            case "Total": return "$250";
            default: return "$750";
        }
    } else {
        return "hasta $1,000";
    }
}

// Global function for Form 2 deposit calculation (MOVED AND CORRECTED)
function calculateDeposito_form2(cobertura) {
    if (cobertura === "Declina" || cobertura === "Decline") {
        return idiomaSeleccionado === "es" ? "Hasta $2,000" : "Up to $2,000";
    } else if (cobertura === "Basica" || cobertura === "Total" || cobertura === "Full" || cobertura === "Basic") {
        return "$0.01";
    } else {
        return idiomaSeleccionado === "es" ? "No definido" : "Undefined";
    }
}

function generarImagen() {
    const activeForm = document.querySelector('.form-container[style*="block"]');
    if (!activeForm) {
        alert(idiomaSeleccionado === 'es' ? 'No hay formulario visible.' : 'No visible form.');
        return;
    }
    const formId = activeForm.id;
    
    if (formId === 'vehiculoForm') {
        generarImagen_form1();
    } else if (formId === 'electForm') {
        generarImagen_form2();
    } else {
        alert(idiomaSeleccionado === 'es' ? 'Formulario no reconocido.' : 'Unrecognized form.');
    }
}

// Lógica y función de cotización para el Formulario 1
function generarImagen_form1() {
    const imagenElement = document.getElementById("imagen");
    const precioElement = document.getElementById("precio");
    const resultadoDiv = document.getElementById("resultado");

    if (!imagenElement || !precioElement || !resultadoDiv) {
        console.error('Required form elements not found in Form 1');
        return;
    }

    const imagenSeleccionada = imagenElement.value;
    const [vehiculo, rutaImagen] = imagenSeleccionada.split(':');
    const coberturaSeleccionada = document.querySelector('#vehiculoForm input[name="cobertura"]:checked');

    if (!coberturaSeleccionada) {
        alert(idiomaSeleccionado === 'es' ? "Por favor, selecciona una cobertura." : "Please select a coverage.");
        return;
    }

    const cobertura = coberturaSeleccionada.value;
    const precio = precioElement.value;

    if (!precio) {
        alert(idiomaSeleccionado === 'es' ? "Por favor, ingresa un precio válido." : "Please enter a valid price.");
        return;
    }

    const fechaRecoleccion = getElementValue("fechaRecoleccion") || '';
    const horaRecoleccion = getElementValue("horaRecoleccion") || '';
    const fechaDevolucion = getElementValue("fechaDevolucion") || '';
    const horaDevolucion = getElementValue("horaDevolucion") || '';
    
    const formattedFechaRecoleccion = formatDateWithTime(fechaRecoleccion, horaRecoleccion, idiomaSeleccionado);
    const formattedFechaDevolucion = formatDateWithTime(fechaDevolucion, horaDevolucion, idiomaSeleccionado);

    const ubicacionRecoleccion = getElementValue("ubicacionRecoleccion") || '';
    const ubicacionDevolucion = getElementValue("ubicacionDevolucion") || '';
    const texto = getElementValue("texto") || '';
    const quotation = getElementValue("Quote") || '';

    const deposito = calculateDeposito_form1(vehiculo, cobertura);

    resultadoDiv.style.display = "flex";
    resultadoDiv.innerHTML = generateQuotationHTML_form1({
        vehiculo,
        rutaImagen,
        cobertura,
        deposito,
        fechaRecoleccion: formattedFechaRecoleccion,
        fechaDevolucion: formattedFechaDevolucion,
        ubicacionRecoleccion,
        ubicacionDevolucion,
        quotation,
        texto,
        precio
    });

    const textoAdicionalResultado = document.getElementById("textoAdicionalResultado");
    if (textoAdicionalResultado) {
        textoAdicionalResultado.style.display = texto.trim() === "" ? "none" : "block";
    }
}

// Lógica y función de cotización para el Formulario 2
function generarImagen_form2() {
    const imagenElement = document.getElementById("imagen2");
    const precioElement = document.getElementById("precio2");
    const resultadoDiv = document.getElementById("resultado");

    if (!imagenElement || !precioElement || !resultadoDiv) {
        console.error('Required form elements not found in Form 2');
        return;
    }

    const imagenSeleccionada = imagenElement.value;
    const [vehiculo, rutaImagen] = imagenSeleccionada.split(':');
    const coberturaSeleccionada = document.querySelector('#electForm input[name="cobertura2"]:checked');

    if (!coberturaSeleccionada) {
        alert(idiomaSeleccionado === 'es' ? "Por favor, selecciona una cobertura." : "Please select a coverage.");
        return;
    }

    const cobertura = coberturaSeleccionada.value;
    const precio = precioElement.value;

    if (!precio) {
        alert(idiomaSeleccionado === 'es' ? "Por favor, ingresa un precio válido." : "Please enter a valid price.");
        return;
    }
    
    const fechaRecoleccion = getElementValue("fechaRecoleccion2") || '';
    const horaRecoleccion = getElementValue("horaRecoleccion2") || '';
    const fechaDevolucion = getElementValue("fechaDevolucion2") || '';
    const horaDevolucion = getElementValue("horaDevolucion2") || '';

    const formattedFechaRecoleccion = formatDateWithTime(fechaRecoleccion, horaRecoleccion, idiomaSeleccionado);
    const formattedFechaDevolucion = formatDateWithTime(fechaDevolucion, horaDevolucion, idiomaSeleccionado);

    const ubicacionRecoleccion = getElementValue("ubicacionRecoleccion2") || '';
    const ubicacionDevolucion = getElementValue("ubicacionDevolucion2") || '';
    const texto = getElementValue("texto2") || '';
    const quotation = getElementValue("Quote2") || '';

    const deposito = calculateDeposito_form2(cobertura);

    resultadoDiv.style.display = "flex";
    resultadoDiv.innerHTML = generateQuotationHTML_form2({
        vehiculo,
        rutaImagen,
        cobertura,
        deposito,
        fechaRecoleccion: formattedFechaRecoleccion,
        fechaDevolucion: formattedFechaDevolucion,
        ubicacionRecoleccion,
        ubicacionDevolucion,
        quotation,
        texto,
        precio
    });

    const textoAdicionalResultado = document.getElementById("textoAdicionalResultado");
    if (textoAdicionalResultado) {
        textoAdicionalResultado.style.display = texto.trim() === "" ? "none" : "block";
    }
}

function generateQuotationHTML_form1(data) {
    const {
        vehiculo, rutaImagen, cobertura, deposito, fechaRecoleccion,
        fechaDevolucion, ubicacionRecoleccion, ubicacionDevolucion,
        quotation, texto, precio
    } = data;

    return `
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
                <div class="precio">$${precio} USD<br>${idiomaSeleccionado === 'es' ? 'Total Estimado e Impuestos' : 'Estimated Total Taxes included'}</div>
                <br>
                <p class="nota" style="color: red; font-weight: bold;">${idiomaSeleccionado === 'es' ? '* Cotización válida por 24 horas' : '* Quotation valid for 24 hours'}</p>
            </div>
        </div>
    `;
}

function generateQuotationHTML_form2(data) {
    const {
        vehiculo, rutaImagen, cobertura, deposito, fechaRecoleccion,
        fechaDevolucion, ubicacionRecoleccion, ubicacionDevolucion,
        quotation, texto, precio
    } = data;

    return `
        <div class="tarjeta">
            <div class="encabezado">
                <img src="logo.png" alt="Logo">
                ${idiomaSeleccionado === 'es' ? 'Vehículo - Clase' : 'Vehicle - Class'}
            </div>
            <div class="imagen">
                <img src="${rutaImagen}" alt="Vehículo">
            </div>
            <div class="contenido">
                <h2> ${vehiculo} ${idiomaSeleccionado === 'es' ? 'o Similar' : 'or Similar'}</h2>
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
}

function getElementValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function formatDateWithTime(dateString, timeString, lang) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(lang, options);
    if (timeString) {
      return `${formattedDate} @ ${timeString}`;
    }
    return formattedDate;
}

function limpiarFormulario() {
    const confirmacion = confirm(idiomaSeleccionado === 'es' ?
        "¿Estás seguro de que deseas limpiar el formulario?" :
        "Are you sure you want to clear the form?");

    if (confirmacion) {
        const activeForm = document.querySelector('.form-container[style*="block"]');
        if (activeForm) {
            activeForm.reset();
        }
        const resultadoDiv = document.getElementById("resultado");
        if (resultadoDiv) {
            resultadoDiv.style.display = "none";
            resultadoDiv.innerHTML = '';
        }
    }
}

function guardarComoImagen() {
    const resultadoDiv = document.getElementById("resultado");

    if (!resultadoDiv || resultadoDiv.style.display === 'none' || !resultadoDiv.innerHTML.trim()) {
        alert(idiomaSeleccionado === 'es' ?
            'Error: No hay cotización para guardar' :
            'Error: No quotation to save');
        return;
    }

    if (typeof html2canvas === 'undefined') {
        alert(idiomaSeleccionado === 'es' ?
            'Error: La librería html2canvas no está cargada. Agrega el script:\n<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>' :
            'Error: html2canvas library is not loaded. Add the script:\n<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>');
        return;
    }

    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = idiomaSeleccionado === 'es' ? 'Generando imagen...' : 'Generating image...';
    loadingMsg.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 5px; z-index: 10000;
    `;
    document.body.appendChild(loadingMsg);

    html2canvas(resultadoDiv, {
        backgroundColor: null, scale: 2, useCORS: true, allowTaint: true, logging: false
    }).then((canvas) => {
        const croppedCanvas = recortarCanvas(canvas);
        const enlace = document.createElement('a');
        enlace.href = croppedCanvas.toDataURL('image/png');
        enlace.download = 'cotizacion.png';
        enlace.click();
        document.body.removeChild(loadingMsg);
        showCopyFeedback(idiomaSeleccionado === 'es' ? 'Imagen descargada' : 'Image downloaded');
    }).catch((error) => {
        console.error('Error al guardar la imagen:', error);
        if (document.body.contains(loadingMsg)) document.body.removeChild(loadingMsg);
        alert(idiomaSeleccionado === 'es' ?
            'Error al guardar la imagen: ' + error.message :
            'Error saving image: ' + error.message);
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
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => showCopyFeedback()).catch(() => fallbackCopyText(text));
    } else {
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textarea);
}

function showCopyFeedback(message = null) {
    const feedback = document.createElement('div');
    feedback.textContent = message || (idiomaSeleccionado === 'es' ? 'Plantilla copiada' : 'Plantilla copiada');
    feedback.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 10px 20px;
        background: #4CAF50; color: white; border-radius: 4px; z-index: 9999;
        font-family: "Oxanium", sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(feedback);
    setTimeout(() => {
        if (document.body.contains(feedback)) document.body.removeChild(feedback);
    }, 2000);
}