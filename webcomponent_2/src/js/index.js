import '../scss/index.scss'
import contenedores from '../html/contenedores.html'
import axios from "axios";

class PolySearch extends HTMLElement {
    connectedCallback() {
        this.doSearch(0);
        this.name = this.getAttribute('name'); // RECIBIMOS PARAMETRO DE INDEX.HTML
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = contenedores;
        this.shadowRoot.getElementById('name').innerText = this.name; // PASO DE PARAMETRO A CONTENEDORES.HTML
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
                }).then((res)=>this.updateEmail(res.data.email))
                break;
        }
    }

    attributeChangedCallback(attr, old_value, new_value){
        if (attr === "name"){
            this.shadowRoot.getElementById('name').innerText = new_value; // PASO DE PARAMETRO A CONTENEDORES.HTML
        }
    }

    //Debo decirle al navegador qué atributos debo observar:
    static get observedAttributes(){
        return ['name']
    }

    updateEmail(email) {
        document.getElementById('external-div').innerHTML = email;
        this.shadowRoot.getElementById('email').innerHTML = email;
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