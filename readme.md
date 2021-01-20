## Instrucciones de webcomponents con webpack 🤓

Despues de clonar, asegurese de seguir los siguientes pasos:

- Tener node instalado (**sudo apt install nodejs**)
- Tener NPM instalado (**sudo apt install npm**)
- Obtener dependencias (**node install**) <- ejecutar en la raíz del proyecto

Posteriormente podrá construir el webcomponent usando las carpetas SRC y index.html del proyecto. Una vez se haya creado el webcomponent ejecutar:

**npm run build:webcomponent**

Este comando compila un archivo JS el cual contiene todo el trabajo realizado y comprimido en dicho archivo, el cual se encuentra ubicado en

*dist/js/home.js* <- Este es el archivo que le pasamos al cliente (Navegador)

**SE RECOMIENDA CORRER EL PROYECTO DENTRO DE UN VHOST**