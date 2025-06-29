// 🟢 Variable global para almacenar el nombre anterior de la categoría
var nombreCategoriaAnterior = nombreCategoriaAnterior || "";

function inicializarCategorias() {
    const contextPath = obtenerContextPath();

    inicializarDataTable('#tablaCategorias', contextPath);
    mostrarModalEditarCategoria();         
    mostrarModalNuevaCategoria();
    registrarCategoria(contextPath);
    editarCategoria(contextPath);          
    eliminarCategoria(contextPath);
    
}

function obtenerContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
}

function inicializarDataTable(selector, contextPath) {
    $(selector).DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        ordering: true,
        responsive: true,
        language: {
            url: contextPath + "/adminlte/plugins/datatables/Spanish.json"
        }
    });
}

function mostrarAlertaSweetAlert2(titulo, mensaje, icono = 'success') {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    });
}

function mostrarModalNuevaCategoria() {
    $(document).off('click', '#btnNuevaCategoria').on('click', '#btnNuevaCategoria', function () {
        $('#modalNuevaCategoria').modal('show');
    });
}

function registrarCategoria(contextPath) {
    $('#formNuevaCategoria').off('submit').on('submit', function (e) {
        e.preventDefault();

        const nombreCategoria = $('#txtNombreCategoria').val();

        $.ajax({
            url: contextPath + "/categorias",
            method: "POST",
            data: {
                accion: "registrar",
                txtNombreCategoria: nombreCategoria
            },
            success: function () {
                $('#modalNuevaCategoria').modal('hide');
                mostrarAlertaSweetAlert2('¡Categoría registrada!', `La categoría "${nombreCategoria}" fue registrada correctamente.`);
                $("#btnCategorias").trigger("click");
            },
            error: function () {
                mostrarAlertaSweetAlert2('Error', 'Hubo un error al registrar la categoría.', 'error');
            }
        });
    });
}

function mostrarModalEditarCategoria() {
    $(document).off('click', '.btnEditar').on('click', '.btnEditar', function () {
        const id = $(this).data('id');
        const nombre = $(this).data('nombre');

        nombreCategoriaAnterior = nombre;

        $('#editIdCategoria').val(id);
        $('#editNombreCategoria').val(nombre);
        $('#modalEditarCategoria').modal('show');
    });
}

function editarCategoria(contextPath) {
    $('#modalEditarCategoria').off('submit').on('submit', function (e) {
        e.preventDefault();

        const idCategoria = $('#editIdCategoria').val();
        const nombreCategoria = $('#editNombreCategoria').val();

        $.ajax({
            url: contextPath + "/categorias",
            method: 'POST',
            data: {
                accion: 'editar',
                idCategoria,
                nombreCategoria
            },
            success: function () {
                $('#modalEditarCategoria').modal('hide');
                mostrarAlertaSweetAlert2('¡Categoría actualizada!', `Se cambió de "${nombreCategoriaAnterior}" a "${nombreCategoria}".`);
                $("#btnCategorias").trigger("click");
            },
            error: function () {
                mostrarAlertaSweetAlert2('Error', 'No se pudo editar la categoría.', 'error');
            }
        });
    });
}

function eliminarCategoria(contextPath) {
    $(document).off('click', '#btnEliminar').on('click', '#btnEliminar', function () {
        const idCategoria = $(this).data('id');
        const nombreCategoria = $(this).data('nombre');

        Swal.fire({
            title: 'Eliminación de Categoría',
            text: `¿Está seguro de eliminar la categoría "${nombreCategoria}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: contextPath + "/categorias",
                    method: 'POST',
                    data: {
                        accion: 'eliminar',
                        idCategoria
                    },
                    success: function () {
                        mostrarAlertaSweetAlert2('¡Eliminado!', 'La categoría ha sido eliminada correctamente.');
                        $("#btnCategorias").trigger("click");
                    },
                    error: function () {
                        mostrarAlertaSweetAlert2('Error', 'No se pudo eliminar la categoría.', 'error');
                    }
                });
            }
        });
    });
}
