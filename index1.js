document.getElementById('searchForm').addEventListener('submit', function(event) {
    // Previene la recarga de la página
    event.preventDefault();
  
    // Limpia el mensaje de error anterior
    document.getElementById('mensajeError').textContent = '';
  
    // Obtiene el nombre del personaje del campo de entrada
    let nombre = document.getElementById('characterName').value;
  
    // Define la URL de la API con el parámetro de consulta
    let url = `https://rickandmortyapi.com/api/character/?name=${nombre}`;
  
    // Haz una solicitud a la API
    fetch(url)
      .then(response => {
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        return response.json();
      })
      .then(data => {
        // Limpia el contenido anterior
        const main = document.querySelector("#clasificaciones");
        main.innerHTML = '';
  
        // Verifica si hay resultados antes de intentar mostrarlos
        if (data.results && data.results.length > 0) {
          // Agrega los nuevos resultados
          data.results.forEach(personaje => {
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
        //limpia el contenido anterior
        const main = document.querySelector("#clasificaciones");
        main.innerHTML = '';
        // Maneja cualquier error que ocurra en la solicitud o procesamiento de datos
        console.error('Error capturado:', error);
        // Muestra un mensaje de error al usuario
        document.getElementById('mensajeError').textContent = 'Hubo un problema al buscar los datos. Por favor, intenta de nuevo.';
      });
  });
  
  
  