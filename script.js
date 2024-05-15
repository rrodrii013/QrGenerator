let body = document.querySelector('body');
let btnGenerador = document.getElementById('btn-generador');
let ingresoH1 = document.getElementById('ingreso');
let qr = document.getElementById('qr'); 
let input = document.getElementById('inputUrl');
let inputError = document.getElementById('url-invalid');
let btnInicio = document.getElementById('btn-inicio');
let btnDescarga = document.getElementById('btn-descarga');
let botones = document.getElementById('botones');

//Función para verificar si el URL no  es válido
function urlFake(url) {

    const urlOk = /^(ftp|http|https):\/\/[^ "]+$/;

    //Retorna si el URL no cumple con las condiciones
    return !urlOk.test(url)

}


//Carga nuevamente la página
function generaNuevaQr() {
    window.location.reload();
}
btnInicio.addEventListener('click', generaNuevaQr);



btnGenerador.addEventListener('click', function (event)  {

    event.preventDefault();

    let vacio = '';

    if (input.value === vacio || urlFake(input.value)) {

        //mensaje URL debe ser válido
        inputError.style.display = 'block';

    }else{

        //Deshabilitar el btn para no generar más de un QR
        btnGenerador.disabled = true;

        body.style.cursor = 'progress';

        //La función new QRCode genera automaticamente un QR gracias a la librería 
            new QRCode(qr, input.value);

         setTimeout(function() {
            inputError.style.display = 'none';
            body.style.cursor = 'default';
            btnGenerador.style.display = 'none';
            ingresoH1.style.display = 'none';
            qr.style.display = 'block';
            botones.style.display = 'block'
        
        }, 2000)

    }

})


function descargaQr() {
    
    // Captura el contenido del div como una imagen usando html2canvas
    html2canvas(qr, {

        //'onrendered': especificar una función de devolución de llamada
        onrendered: function(canvas) {
            
            // Convertir el canvas a una URL de datos PNG
            let imagenURL = canvas.toDataURL('image/png');

            // Crear un enlace <a> para descargar la imagen
            let enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = imagenURL;
            enlaceDescarga.download = 'qr.png'; // Nombre predeterminado del archivo

            // Agregar el enlace al documento y hacer clic en él
            document.body.appendChild(enlaceDescarga);
            enlaceDescarga.click();

            // Eliminar el enlace del documento
            document.body.removeChild(enlaceDescarga);
        }
    });
}

btnDescarga.addEventListener('click', descargaQr);
