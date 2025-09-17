  const popup = document.getElementById('popup');
  const mostrarBtn = document.getElementById('mostrarBtn');
  const cerrarBtn = document.getElementById('cerrarBtn');
  const select = document.getElementById('opciones');

  mostrarBtn.addEventListener('click', () => {
    popup.style.display = 'block';
  });

  cerrarBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  select.addEventListener('change', () => {
    const grado = select.value;
    window.location.href = `./grados/${grado}.html`;
  });

