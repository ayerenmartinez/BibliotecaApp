function inicializarDashboard() {
    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
    cargarTotales();
    function cargarTotales() {
        $.ajax({
            url: contextPath + "/dashboard?accion=totales",
            method: "GET",
            dataType: "json",
            success: function (data) {
                $('#totalAutores').text(data.totalAutores);
                $('#totalCategorias').text(data.totalCategorias);
                // Puedes agregar más totales aquí
            },
            error: function (xhr) {
                console.error("Error al cargar datos del dashboard:", xhr.responseText);
                Swal.fire("Error", "No se pudo obtener los totales del dashboard.", "error");
            }
        });
    }

    // Redireccionar a cada módulo
    $("#verCategorias").click(function (e) {
        e.preventDefault();
        $("#btnCategorias").trigger("click");
    });

    $("#verAutores").click(function (e) {
        e.preventDefault();
        $("#btnAutores").trigger("click");
    });

    $("#verLibros").click(function (e) {
        e.preventDefault();
        $("#btnLibros").trigger("click");
    });

    $("#verUsuarios").click(function (e) {
        e.preventDefault();
        $("#btnUsuarios").trigger("click");
    });

    $("#verEditoriales").click(function (e) {
        e.preventDefault();
        $("#btnEditoriales").trigger("click");
    });

    $("#verPrestamos").click(function (e) {
        e.preventDefault();
        $("#btnPrestamos").trigger("click");
    });

    $("#verCargos").click(function (e) {
        e.preventDefault();
        $("#btnCargos").trigger("click");
    });

}