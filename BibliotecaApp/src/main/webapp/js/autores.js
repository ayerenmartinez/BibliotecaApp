// 🟢 Variable global para almacenar el nombre anterior del autor
var nombreAutorAnterior = nombreAutorAnterior || "";

function inicializarAutores() {

    const contextPath = obtenerContextPath();
    inicializarDataTable(contextPath);
    mostrarModalNuevoAutor();
    mostrarModalEditarAutor();
    registrarAutor(contextPath);
    editarAutor(contextPath);
    eliminarAutor(contextPath);

}

function mostrarModalEditarAutor() {
    $(document).off('click', '.btnEditar').on('click', '.btnEditar', function () {
        const id = $(this).data('id');
        const nombre = $(this).data('nombre');
        const apellidoPaterno = $(this).data('apellido-paterno');
        const apellidoMaterno = $(this).data('apellido-materno');
        nombreAutorAnterior = nombre;
        $('#editIdAutor').val(id);
        $('#editNombreAutor').val(nombre);
        $('#editApellidoPaternoAutor').val(apellidoPaterno);
        $('#editApellidoMaternoAutor').val(apellidoMaterno);
        $('#modalEditarAutor').modal('show');
    });
}

function obtenerContextPath() {
    return  window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
}

function inicializarDataTable(contextPath) {
    //MOSTRAR DATATABLE
    $('#tablaAutores').DataTable({
        language: {
            url: contextPath + "/adminlte/plugins/datatables/Spanish.json"
        }
    });
}

function mostrarAlertaSwettAlert2(titulo, mensaje, icono = 'success') {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    });
}

function eliminarAutor(contextPath) {
// ELIMINAR AUTOR CON SWEETALERT2
    $(document).on('click', '#btnEliminar', function () {
        const idAutor = $(this).data('id');
        const nombreAutor = $(this).data('nombre');

        Swal.fire({
            title: 'Eliminación de Autor',
            text: `Esta seguro de Eliminar el Autor "${nombreAutor}".`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: contextPath + "/autores",
                    method: 'POST',
                    data: {
                        accion: 'eliminar',
                        idAutor: idAutor
                    },
                    success: function () {
                        mostrarAlertaSwettAlert2('¡Eliminado!', 'El autor ha sido eliminado correctamente.');
                        $("#btnAutores").trigger("click");
                    },
                    error: function () {
                        mostrarAlertaSwettAlert2('Error', 'No se pudo eliminar el autor.', 'error');
                    }
                });
            }
        });
    });

}

function registrarAutor(contextPath) {
    // Enviar formulario de nuevo autor vía AJAX para registrar Autores
    $('#formNuevoAutor').off('submit').submit(function (e) {
        e.preventDefault();

        const nombreAutor = $('#txtNombreAutor').val();
        const apellidoPaterno = $('#txtApellidoPaternoAutor').val();
        const apellidoMaterno = $('#txtApellidoMaternoAutor').val();

        $.ajax({
            url: contextPath + "/autores",
            method: "POST",
            data: {
                accion: "registrar",
                txtNombreAutor: nombreAutor,
                txtApellidoPaternoAutor: apellidoPaterno,
                txtApellidoMaternoAutor: apellidoMaterno
            },
            success: function (response) {
                $('#modalNuevoAutor').modal('hide');
                //Llamar al método mostrarAlerta
                mostrarAlertaSwettAlert2('¡Autor registrado!', `El Autor "${nombreAutor}" fue registrado correctamente.`);
                $("#btnAutores").trigger("click"); // Recarga la vista
            },
            error: function (xhr, status, error) {
                mostrarAlertaSwettAlert2('Error', 'Hubo un error al registrar el autor.', 'error');
            }
        });
    });
}

function mostrarModalNuevoAutor() {
    //MOSTRAR  MODAL PARA REGISTRAR UN NUEVO AUTOR
    $(document).on('click', '#btnNuevoAutor', function () {
        $('#modalNuevoAutor').modal('show');
    });
}

function editarAutor(contextPath) {
    $('#formEditarAutor').off('submit').on('submit', function (e) {
        e.preventDefault();

        const idAutor = $('#editIdAutor').val();
        const nombreAutor = $('#editNombreAutor').val();
        const apellidoPaterno = $('#editApellidoPaternoAutor').val();
        const apellidoMaterno = $('#editApellidoMaternoAutor').val();

        $.ajax({
            url: contextPath + "/autores",
            method: "POST",
            data: {
                accion: "editar",
                idAutor,
                nombreAutor,
                apellidoPaternoAutor: apellidoPaterno,
                apellidoMaternoAutor: apellidoMaterno
            },
            success: function () {
                $('#modalEditarAutor').modal('hide');
                mostrarAlertaSwettAlert2('¡Autor actualizado!', `El autor "${nombreAutorAnterior}" fue actualizado correctamente.`);
                $("#btnAutores").trigger("click");
            },
            error: function () {
                mostrarAlertaSwettAlert2('Error', 'No se pudo actualizar el autor.', 'error');
            }
        });
    });
}





