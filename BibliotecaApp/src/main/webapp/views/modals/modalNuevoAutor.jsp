<!-- Modal Nuevo Autor -->
<div class="modal fade" id="modalNuevoAutor" tabindex="-1" role="dialog" aria-labelledby="modalNuevoAutorLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-header bg-primary">
                <h5 class="modal-title" id="modalNuevoAutorLabel">Registrar Nuevo Autor</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            
            <form id="formNuevoAutor">
                <input type="hidden" name="accion" value="registrar">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nombreAutor">Nombre del Autor</label>
                        <input type="text" class="form-control" id="txtNombreAutor" name="txtNombreAutor" required>
                    </div>
                    <div class="form-group">
                        <label for="apellidoPaternoAutor">Apellido Paterno del Autor</label>
                        <input type="text" class="form-control" id="txtApellidoPaternoAutor" name="txtApellidoPaternoAutor" required>
                    </div>
                     <div class="form-group">
                        <label for="apellidoMaternoAutor">Apellido Materno del Autor</label>
                        <input type="text" class="form-control" id="txtApellidoMaternoAutor" name="txtApellidoMaternoAutor" required>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>

        </div>
    </div>
</div>
