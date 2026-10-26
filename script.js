document.getElementById('anio').textContent = new Date().getFullYear();

// Menú en móvil
const btn = document.getElementById('menu-btn'), menu = document.getElementById('menu');
const cerrar = () => { menu.classList.remove('abierto'); btn.setAttribute('aria-expanded', false); };
btn.addEventListener('click', () => btn.setAttribute('aria-expanded', menu.classList.toggle('abierto')));
menu.addEventListener('click', e => { if (e.target.closest('a')) cerrar(); });

// "Ver servicio" y "Cotizar" dejan elegido el servicio en el formulario (solo en la portada)
document.querySelectorAll('[data-servicio]').forEach(a => a.addEventListener('click', () => {
  document.getElementById('servicio').value = a.dataset.servicio;
}));

// El formulario abre el correo con la solicitud ya redactada (solo en la portada)
const form = document.getElementById('form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const cuerpo = `Nombre: ${v('nombre')}\nTeléfono: ${v('tel')}\nComuna: ${v('ciudad')}\nServicio: ${v('servicio')}\n\nDetalles:\n${v('detalle')}`;
  window.location.href = `mailto:carileolopezerwin@gmail.com?subject=${encodeURIComponent('Solicitud de presupuesto - ' + v('servicio'))}&body=${encodeURIComponent(cuerpo)}`;
  document.getElementById('estado').textContent = 'Se abrió tu correo con la solicitud lista. Solo falta enviarla.';
});

// Si llegas desde una página de servicio, el formulario deja elegido ese servicio
const selServ = document.getElementById('servicio');
const pedido = new URLSearchParams(location.search).get('servicio');
if (selServ && pedido && [...selServ.options].some(o => o.text === pedido)) selServ.value = pedido;
