import '../scss/index.scss'
import contenedores from '../html/contenedores.html'
import axios from "axios";

class ChangeAttr extends HTMLElement {
    connectedCallback() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = contenedores;
        this.shadowRoot.querySelector('#btn-changename').addEventListener('click', this);
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
        if (event.type === 'click') {
            this.name = this.shadowRoot.getElementById('new-name').value;
            document.querySelector('poly-search').setAttribute('name', this.name);
        }
    }
}

customElements.define('change-attr', ChangeAttr);