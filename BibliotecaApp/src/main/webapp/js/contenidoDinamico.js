$(document).ready(function () {
    // Ruta base del proyecto
    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));


    // ✅ Cargar dashboard.jsp por defecto y ejecutar script si está disponible
    $("#contenido-dinamico").load("dashboard.jsp", function () {
        if (typeof inicializarDashboard === "function") {
            inicializarDashboard();
        } else {
            $.getScript("js/dashboard.js").done(function () {
                if (typeof inicializarDashboard === "function") {
                    inicializarDashboard();
                }
            });
        }
    });

    // Cargar profile.jsp al hacer clic en "Mi Perfil"
    $("#btnPerfil").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("profile.jsp");
    });

    // Cargar dashboard.jsp al hacer clic en "Dashboard"
    $("#btnDashboard").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load("dashboard.jsp", function () {
            if (typeof inicializarDashboard === "function") {
                inicializarDashboard();
            } else {
                $.getScript("js/dashboard.js").done(function () {
                    if (typeof inicializarDashboard === "function") {
                        inicializarDashboard();
                    }
                });
            }
        });
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

    $("#btnCategorias").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load(contextPath + "/categorias", function () {
            // ✅ Después de cargar el HTML, cargar el JS de categorías dinámicamente
            $.getScript(contextPath+"/js/categorias.js").done(function () {
                if (typeof inicializarCategorias === "function") {
                    inicializarCategorias();
                }
            }).fail(function () {
                console.error("No se pudo cargar js/categorias.js");
            });
        });
    });

    // ✅ Cargar autores.jsp + su JS
    $("#btnAutores").click(function (e) {
        e.preventDefault();
        $("#contenido-dinamico").load(contextPath + "/autores", function () {
            $.getScript(contextPath+"/js/autores.js").done(function () {
                if (typeof inicializarAutores === "function") {
                    inicializarAutores();
                }
            }).fail(function () {
                console.error("No se pudo cargar js/autores.js");
            });
        });
    });

});


