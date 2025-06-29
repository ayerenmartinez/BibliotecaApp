<%@page import="com.systematic.app.biblioteca.models.Autor"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%
    List<Autor> listaAutores = (List<Autor>) request.getAttribute("autores");
    System.out.println("autores = " + listaAutores);
%>
<div class="container-fluid pt-3">
    <div class="row">
        <div class="col-12">

            <div class="row mb-2">
                <div class="col-sm-6">
                    <h3>Mantenimiento de Autores</h3>
                </div>
                <div class="col-sm-6 text-right">
                    <button class="btn btn-primary" id="btnNuevoAutor">
                        <i class="fas fa-plus"></i> Nuevo Autor
                    </button>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <table id="tablaAutores" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombres</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <% if (listaAutores != null) {
                                    for (Autor autor : listaAutores) {
                            %>
                            <tr>
                                <td><%= autor.getIdAutor()%></td>
                                <td><%= autor.getNombreAutor()%></td>
                                <td><%= autor.getApellidoPaterno()%></td>
                                <td><%= autor.getApellidoMaterno()%></td>
                                <td>
                                    <button class="btn btn-sm btn-warning btnEditar" data-id="<%= autor.getIdAutor()%>"
                                            data-nombre="<%=autor.getNombreAutor()%>"
                                            data-apellido-paterno="<%= autor.getApellidoPaterno()%>"
                                            data-apellido-materno="<%= autor.getApellidoMaterno()%>">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button id="btnEliminar" class="btn btn-sm btn-danger" data-id="<%= autor.getIdAutor()%>"
                                            data-nombre="<%=autor.getNombreAutor()%>"
                                            data-apellido-paterno="<%= autor.getApellidoPaterno()%>"
                                            data-apellido-materno="<%= autor.getApellidoMaterno()%>">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <%   }
                                }%>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>

