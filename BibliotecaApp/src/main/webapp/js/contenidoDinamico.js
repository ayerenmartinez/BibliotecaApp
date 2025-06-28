$(document).ready(function () {
    // Cargar dashboard.jsp por defecto
    $("#contenido-dinamico").load("dashboard.jsp");

    // Cargar profile.jsp al hacer clic en "Mi Perfil"
    $("#btnPerfil").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("profile.jsp");
    });
    
    // Cargar dashboard.jsp al hacer clic en "Dashboard"
    $("#btnDashboard").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("dashboard.jsp");
    });
    
    // Cargar autores.jsp al hacer clic en "Autores"
    $("#btnAutores").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("autores.jsp");
    });
    
    // Cargar editoriales.jsp al hacer clic en "Editoriales"
    $("#btnEditoriales").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("editoriales.jsp");
    });
    
    // Cargar libros.jsp al hacer clic en "Libros"
    $("#btnLibros").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("libros.jsp");
    });
    
    // Cargar cargos.jsp al hacer clic en "Cargos"
    $("#btnCargos").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("cargos.jsp");
    });
    
    // Cargar usuarios.jsp al hacer clic en "Cargos"
    $("#btnUsuarios").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("usuarios.jsp");
    });
    
    // Cargar prestamos.jsp al hacer clic en "Prestamos"
    $("#btnPrestamos").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("prestamos.jsp");
    });
    
    //Ruta base del proyecto
    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));

    // ✅ Cargar categorías y luego ejecutar su JS
    $("#btnCategorias").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load(contextPath + "/categorias", function () {
            // Espera a que se cargue el HTML y luego ejecuta la función
            if (typeof inicializarCategorias === "function") {
                inicializarCategorias();
            } else {
                console.warn("La función inicializarCategorias no está disponible.");
            }
        });
    });
});


