import '../scss/index.scss'
import contenedores from '../html/contenedores.html'
import axios from "axios";

class PolySearch extends HTMLElement {
    connectedCallback() {
        this.doSearch(0);
        this.titulo = this.getAttribute('data-titulo'); // RECIBIMOS PARAMETRO DE INDEX.HTML
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = contenedores;
        this.shadowRoot.getElementById('titulo').innerText = this.titulo; // PASO DE PARAMETRO A CONTENEDORES.HTML
        this.shadowRoot.querySelector('#btn-consultar').addEventListener('click', this);
    }

    doSearch(op) {
        var url = "";
        const request = new XMLHttpRequest();
        switch (op) {
            case 0:
                axios.get('https://jsonplaceholder.typicode.com/users', {responseType: 'json'})
                    .then((res)=>this.renderResults(res.data));
                break;
            default:
                axios.get('https://jsonplaceholder.typicode.com/users/'+op, {
                   responseType: 'json'
                }).then((res)=>this.shadowRoot.getElementById('email').innerHTML = res.data.email)
                break;
        }
    }

    renderResults(conten) {
        var listg = document.createElement('SELECT');
        listg.setAttribute("id", "ls");
        for (var i = 0; i < conten.length; i++) {
            var listd = document.createElement('option');
            listd.setAttribute("value", conten[i].id);
            listd.appendChild(document.createTextNode(conten[i].name));
            listg.appendChild(listd);
        }
        this.shadowRoot.getElementById("lista").appendChild(listg);
        this.shadowRoot.querySelector('#ls').addEventListener('change', this);
    }

    handleEvent(event) {
        if (event.type === "change") {
            //console.log(event.target.value);
            this.doSearch(event.target.value);
            event.preventDefault();
        }

        if (event.type === 'click') {
            this.numero = this.shadowRoot.getElementById('txt-consultar').value;
            this.doSearch(this.numero);
            event.preventDefault();
        }
    }
}

customElements.define('poly-search', PolySearch);