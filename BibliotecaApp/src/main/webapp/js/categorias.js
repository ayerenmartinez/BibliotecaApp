
function inicializarCategorias() {

    let nombreCategoriaAnterior = "";

    //MOSTRAR DATATABLE
    $('#tablaCategorias').DataTable({
        language: {
            url: window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)) + "/adminlte/plugins/datatables/Spanish.json"
        }
    });

    //MOSTRAR MODAL PARA EDITAR DATOS
    $(document).on('click', '.btnEditar', function () {
        const id = $(this).data('id');
        const nombre = $(this).data('nombre');

        nombreCategoriaAnterior = nombre; //Guardo el Nombre anterior de la categoría

        $('#editIdCategoria').val(id);
        $('#editNombreCategoria').val(nombre);
        $('#modalEditarCategoria').modal('show');
    });

    //MOSTRAR  MODAL PARA REGISTRAR UNA NUEVA CATEGORIA
    $(document).on('click', '#btnNuevaCategoria', function () {
        $('#modalNuevaCategoria').modal('show');
    });

    $('#formEditarCategoria').submit(function (e) {
        e.preventDefault();
        const id = $('#editIdCategoria').val();
        const nombre = $('#editNombreCategoria').val();

        // Aquí va tu AJAX o redirección
        console.log('Editar: ', id, nombre);
    });

    // Enviar formulario de nueva categoría vía AJAX
    $('#formNuevaCategoria').submit(function (e) {
        e.preventDefault();

        const nombreCategoria = $('#txtNombreCategoria').val();

        $.ajax({
            url: window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)) + "/categorias",
            method: "POST",
            data: {
                accion: "registrar",
                txtNombreCategoria: nombreCategoria
            },
            success: function (response) {
                $('#modalNuevaCategoria').modal('hide');
                // Mostrar alerta SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: '¡Categoría registrada!',
                    text: `La categoría "${nombreCategoria}" fue registrada correctamente.`,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });

                $("#btnCategorias").trigger("click"); // Recarga la vista
            },
            error: function (xhr, status, error) {
                console.error("Error al registrar categoría:", error);
                alert("Hubo un error al registrar la categoría.");
            }
        });
    });


    // ELIMINAR CATEGORÍA CON SWEETALERT2
    $(document).on('click', '#btnEliminar', function () {
        const idCategoria = $(this).data('id');
        const nombreCategoria = $(this).data('nombre');

        Swal.fire({
            title: 'Eliminación de Categoría',
            text: `Esta seguro de Eliminar la Categoría "${nombreCategoria}".`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)) + "/categorias",
                    method: 'POST',
                    data: {
                        accion: 'eliminar',
                        idCategoria: idCategoria
                    },
                    success: function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Eliminado!',
                            text: 'La categoría ha sido eliminada correctamente.',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            $("#btnCategorias").trigger("click"); // Recarga la vista
                        });
                    },
                    error: function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar la categoría.',
                            confirmButtonColor: '#d33'
                        });
                    }
                });
            }
        });
    });

    // EDITAR CATEGORÍA CON SWEETALERT2
    $('#modalEditarCategoria').submit(function (e) {
        e.preventDefault();

        const idCategoria = $('#editIdCategoria').val();
        const nombreCategoria = $('#editNombreCategoria').val();

        $.ajax({
            url: window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)) + "/categorias",
            method: 'POST',
            data: {
                accion: 'editar',
                idCategoria: idCategoria,
                nombreCategoria: nombreCategoria
            },
            success: function (response) {
                $('#modalEditarCategoria').modal('hide');

                Swal.fire({
                    icon: 'success',
                    title: '¡Categoría actualizada!',
                    text: `Se cambió la categoría de "${nombreCategoriaAnterior}" a "${nombreCategoria}".`,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then(() => {
                    $("#btnCategorias").trigger("click"); // Recarga la vista dinámica
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo editar la categoría.',
                    confirmButtonColor: '#d33'
                });
            }
        });
    });

}