<!-- modalEditarAutor.jsp -->
<div class="modal fade" id="modalEditarAutor" tabindex="-1" role="dialog" aria-labelledby="editarAutoriaLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="formEditarAutor" action="${pageContext.request.contextPath}/autores" method="POST">
                <input type="hidden" name="accion" value="editar">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarAutorLabel">Editar Autor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editIdAutor" name="idAutor">
                    <div class="form-group">
                        <label for="editNombreAutor">Nombres del Autor</label>
                        <input type="text" class="form-control" id="editNombreAutor" name="nombreAutor" required>
                    </div>
                    <div class="form-group">
                        <label for="editApellidoPaternoAutor">Apellido Paterno del Autor</label>
                        <input type="text" class="form-control" id="editApellidoPaternoAutor" name="apellidoPaternoAutor" required>
                    </div>
                    <div class="form-group">
                        <label for="editApellidoMaternoAutor">Apellido Materno del Autor</label>
                        <input type="text" class="form-control" id="editApellidoMaternoAutor" name="apellidoMaternoAutor" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>
