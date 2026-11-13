fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        const menu = document.getElementById('menu');
        const ul = document.createElement('ul');

        data.menu.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
            ul.appendChild(li);
        });

        menu.appendChild(ul);
    })
    .catch(error => console.error('Error al cargar el menú:', error));
