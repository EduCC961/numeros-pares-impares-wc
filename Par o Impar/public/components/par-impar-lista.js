// Definimos un nuevo componente llamado ParImparLista
class ParImparLista extends HTMLElement {
    constructor() {
        super();
        // Creamos un Shadow DOM para encapsular los estilos y el contenido
        this.attachShadow({ mode: 'open' });

        // Agregamos el HTML y CSS del componente al Shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .resultados {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 1rem;
                    border-radius: 8px;
                    background-color: #f8f9fa;
                }
                h2 {
                    margin-top: 0;
                    color: #333;
                }
                .lista-numeros {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                    gap: 0.5rem;
                }
                .numero {
                    padding: 0.5rem;
                    text-align: center;
                    border-radius: 4px;
                }
                .par {
                    background-color: #d4edda;
                    color: #155724;
                }
                .impar {
                    background-color: #f8d7da;
                    color: #721c24;
                }
            </style>
            <div class="resultados">
                <h2>Resultados</h2>
                <div class="lista-numeros" id="lista"></div>
            </div>
        `;

        // Guardamos una referencia al contenedor donde se mostraran los numeros
        this.listaElement = this.shadowRoot.getElementById('lista');
    }

    // Cuando el componente se agrega a la pagina
    connectedCallback() {
        // Escuchamos el evento 'rango-seleccionado' que envia el otro componente
        document.addEventListener('rango-seleccionado', (e) => {
            // Mostramos los resultados usando el rango recibido
            this.mostrarResultados(e.detail.inicio, e.detail.fin);
        });
    }

    // Esta funcion muestra los numeros pares e impares en pantalla
    mostrarResultados(inicio, fin) {
        // Limpiamos la lista antes de mostrar nuevos resultados
        this.listaElement.innerHTML = '';

        // Recorremos todos los numeros desde el inicio hasta el fin
        for (let i = inicio; i <= fin; i++) {
            // Creamos un elemento para mostrar el numero
            const numeroElement = document.createElement('div');
            // Le damos una clase segun si es par o impar para el color
            numeroElement.className = `numero ${i % 2 === 0 ? 'par' : 'impar'}`;
            // Mostramos el numero
            numeroElement.textContent = i;

            // Creamos un texto pequeño que dice si es par o impar
            const tooltip = document.createElement('span');
            tooltip.textContent = i % 2 === 0 ? ' (Par)' : ' (Impar)';
            tooltip.style.fontSize = '0.8em';

            // Agregamos el texto al elemento del numero
            numeroElement.appendChild(tooltip);
            // Agregamos el elemento a la lista en pantalla
            this.listaElement.appendChild(numeroElement);
        }
    }
}

// Registramos el componente para que pueda usarse en HTML como <par-impar-lista>
customElements.define('par-impar-lista', ParImparLista);