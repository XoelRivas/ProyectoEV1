document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario");
    const nombreInput = document.getElementById("nombre");
    const passwordInput = document.getElementById("password");
    const errorNombre = document.getElementById("error-nombre");
    const errorPassword = document.getElementById("error-password");
    const limpiar = document.getElementById("limpiar");

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,20}$/;
    const regexPassword = /^[A-Za-z0-9·$%&/()]{8,16}$/;

    function validarNombre(){
        const nombre = nombreInput.value.trim();
        errorNombre.innerHTML = "";
        if (nombre === ""){
            errorNombre.style.display="block";
            errorNombre.innerHTML = "Nombre obligatorio";
        } else if (!regexNombre.test(nombre)){
            errorNombre.style.display="block";
            errorNombre.innerHTML = "Nombre inválido";
        }
        if (nombre.length > 20){
            errorNombre.style.display="block";
            errorNombre.innerHTML = "El nombre no puede tener más de 20 caracteres";
        }
    }

    function validarPassword(){
        const password = passwordInput.value.trim();
        errorPassword.innerHTML = "";
        if (password === ""){
            errorPassword.style.display="block";
            errorPassword.innerHTML = "La contraseña es obligatoria";
        } else if (!regexPassword.test(password)){
            errorPassword.style.display="block";
            errorPassword.innerHTML = "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
        }
    }

    nombreInput.addEventListener("blur", validarNombre);
    passwordInput.addEventListener("blur", validarPassword);

    formulario.addEventListener("submit", function(event){
        event.preventDefault();
        validarNombre();
        validarPassword();

        if (errorNombre.textContent === "" && errorPassword.textContent === ""){
            window.location.href = "main.html";
        }
    });

    limpiar.addEventListener("click", function(){
        nombreInput.value = "";
        passwordInput.value = "";
        errorNombre.textContent = "";
        errorPassword.textContent = "";
    })
});