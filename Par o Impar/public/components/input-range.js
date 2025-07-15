// Definimos un nuevo componente llamado InputRange
class InputRange extends HTMLElement {
    constructor() {
        super();
        // Creamos un Shadow DOM para encapsular los estilos y el contenido
        this.attachShadow({ mode: 'open' });

        // Agregamos el HTML y CSS del formulario al Shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 2rem;
                }
                .range-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 400px;
                    margin: 0 auto;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                }
                label {
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    padding: 0.75rem;
                    background-color: #4a6fa5;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }
                button:hover {
                    background-color: #3a5a80;
                }
            </style>
            <form class="range-form">
                <div class="input-group">
                    <label for="inicio">Numero inicial:</label>
                    <input type="number" id="inicio" required>
                </div>
                
                <div class="input-group">
                    <label for="fin">Numero final:</label>
                    <input type="number" id="fin" required>
                </div>
                
                <button type="button" id="enviar">Generar Lista</button>
            </form>
        `;
    }

    // Cuando el componente se agrega a la pagina
    connectedCallback() {
        const form = this.shadowRoot.querySelector('.range-form');

        // Si el usuario intenta enviar el formulario, evitamos que la pagina se recargue
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.procesarInput();
        });

        // Cuando el usuario hace clic en el boton, procesamos los datos
        this.shadowRoot.getElementById('enviar').addEventListener('click', () => {
            this.procesarInput();
        });
    }

    // Esta funcion toma los valores que el usuario escribio
    procesarInput() {
        const inicio = parseInt(this.shadowRoot.getElementById('inicio').value);
        const fin = parseInt(this.shadowRoot.getElementById('fin').value);

        // Si los valores no son numeros, mostramos un mensaje de error
        if (isNaN(inicio) || isNaN(fin)) {
            alert('Por favor ingresa numeros validos');
            return;
        }

        // Si el numero inicial es mayor que el final, mostramos un mensaje de error
        if (inicio > fin) {
            alert('El numero inicial debe ser menor o igual al final');
            return;
        }

        // Si todo esta bien, enviamos los datos a otros componentes de la pagina
        this.dispatchEvent(new CustomEvent('rango-seleccionado', {
            bubbles: true,
            composed: true,
            detail: { inicio, fin }
        }));
    }
}

// Registramos el componente para que pueda usarse en HTML como <input-range>
customElements.define('input-range', InputRange);