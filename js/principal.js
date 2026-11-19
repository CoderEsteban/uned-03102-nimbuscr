/* NimbusCR: interacciones locales sin servicios externos */
(function () {
  'use strict';
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = String(new Date().getFullYear());
  const menuBoton = document.querySelector('.menu-boton');
  const menu = document.getElementById('menu-principal');
  if (menuBoton && menu) menuBoton.addEventListener('click', function () {
    const abierto = menu.classList.toggle('abierto');
    menuBoton.setAttribute('aria-expanded', String(abierto));
  });

  // Datos ficticios para demostrar el seguimiento de paquetes.
  const envios = {
    'NCR-2026-001': {estado:'En tránsito', clase:'', origen:'San José', destino:'Ciudad Quesada', etapas:['Solicitud registrada','Carga recibida','En ruta hacia destino']},
    'NCR-2026-002': {estado:'Entregado', clase:'', origen:'Alajuela', destino:'Liberia', etapas:['Solicitud registrada','Carga recibida','En ruta hacia destino','Entrega completada']},
    'NCR-2026-003': {estado:'En preparación', clase:'advertencia', origen:'Cartago', destino:'Puntarenas', etapas:['Solicitud registrada','Preparación de la carga']}
  };
  const rastreo = document.getElementById('form-rastreo');
  const salidaRastreo = document.getElementById('resultado-rastreo');
  if (rastreo && salidaRastreo) {
    document.querySelectorAll('.codigo-ejemplo').forEach(function (boton) {
      boton.addEventListener('click', function () {
        document.getElementById('codigo').value = boton.dataset.codigo;
        rastreo.requestSubmit();
      });
    });
    rastreo.addEventListener('submit', function (evento) {
      evento.preventDefault();
      const codigo = document.getElementById('codigo').value.trim().toUpperCase();
      const envio = envios[codigo];
      salidaRastreo.replaceChildren();
      const titulo = document.createElement('h3');
      titulo.textContent = envio ? 'Resultado de seguimiento' : 'Código sin resultados';
      salidaRastreo.appendChild(titulo);
      const descripcion = document.createElement('p');
      if (!envio) {
        descripcion.textContent = 'No existe un envío de prueba con ese código. Utiliza NCR-2026-001, NCR-2026-002 o NCR-2026-003.';
        salidaRastreo.appendChild(descripcion);
      } else {
        const estado = document.createElement('span');
        estado.className = 'estado ' + envio.clase;
        estado.textContent = envio.estado;
        salidaRastreo.appendChild(estado);
        descripcion.textContent = codigo + ' · ' + envio.origen + ' → ' + envio.destino;
        salidaRastreo.appendChild(descripcion);
        const lista = document.createElement('ol');
        lista.className = 'linea-tiempo';
        envio.etapas.forEach(function (etapa) {
          const item = document.createElement('li');
          const fuerte = document.createElement('strong');
          fuerte.textContent = etapa;
          item.appendChild(fuerte);
          lista.appendChild(item);
        });
        salidaRastreo.appendChild(lista);
      }
      salidaRastreo.hidden = false;
    });
  }

  const cotizacion = document.getElementById('form-cotizacion');
  const mensaje = document.getElementById('mensaje-cotizacion');
  if (cotizacion && mensaje) {
    cotizacion.addEventListener('submit', function (evento) {
      evento.preventDefault();
      // La validación HTML5 se ejecuta antes del evento submit.
      mensaje.textContent = 'Formulario validado correctamente. Esta es una demostración académica: no se enviaron ni almacenaron datos.';
      mensaje.hidden = false;
      cotizacion.reset();
    });
  }
})();