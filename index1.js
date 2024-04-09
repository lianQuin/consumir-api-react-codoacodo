

document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Previene la recarga de la página
  document.getElementById('mensajeError').textContent = ''; // Limpia el mensaje de error anterior

  let nombre = document.getElementById('characterName').value; // Obtiene el nombre del personaje
  let url = `https://rickandmortyapi.com/api/character/?name=${nombre}`; // URL de la API

  axios.get(url)
    .then(response => {
      const main = document.querySelector("#clasificaciones");
      main.innerHTML = '';

      if (response.data.results && response.data.results.length > 0) {
        response.data.results.forEach(personaje => {
          const article = document.createRange().createContextualFragment( /* html */`
            <article>
              <div class="image-container">
                <img src="${personaje.image}" alt="${personaje.name}">
              </div>
              <h2>${personaje.name}</h2>
              <span>${personaje.status}</span>
            </article>
          `);
          main.append(article);
        });
      }
    })
    .catch(error => {
      const main = document.querySelector("#clasificaciones");
      main.innerHTML = '';
     
      console.error('Error capturado:', error);
     
      document.getElementById('mensajeError').textContent = 'Hubo un problema al buscar los datos. Por favor, intenta de nuevo.';
    });
});
