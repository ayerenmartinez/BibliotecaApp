package com.systematic.app.biblioteca.controllers;

import com.systematic.app.biblioteca.config.DBConnection;
import com.systematic.app.biblioteca.dao.autor.AutorDAO;
import com.systematic.app.biblioteca.dao.autor.AutorDAOImpl;
import com.systematic.app.biblioteca.models.Autor;
import com.systematic.app.biblioteca.services.autor.AutorService;
import com.systematic.app.biblioteca.services.autor.AutorServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;


/**
 *
 * @author anthony
 */

@WebServlet("/autores")
public class ControlAutoresServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = DBConnection.getConnection()) {
            AutorDAO autorDAO = new AutorDAOImpl(connection);
            AutorService autorService = new AutorServiceImpl(autorDAO);
            List<Autor> autores = autorService.findAll();
            if (autores == null || autores.isEmpty()) {
                req.setAttribute("mensaje", "No hay autores registradas");
            }
            req.setAttribute("autores", autores);
            req.getRequestDispatcher("/views/autores.jsp").forward(req, resp);
        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al cargar autores");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String accion = req.getParameter("accion");

        if (accion == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción no especificada.");
            return;
        }

        try (Connection connection = DBConnection.getConnection()) {
            AutorDAO autorDAO = new AutorDAOImpl(connection);
            AutorService autorService = new AutorServiceImpl(autorDAO);
            switch (accion) {
                case "registrar": {
                    String nombreAutor = req.getParameter("txtNombreAutor");
                    String apellidoPaternoAutor = req.getParameter("txtApellidoPaternoAutor");
                    String apellidoMaternoAutor = req.getParameter("txtApellidoMaternoAutor");

                    if (Arrays.asList(nombreAutor, apellidoPaternoAutor, apellidoMaternoAutor)
                            .stream()
                            .anyMatch(s -> s == null || s.trim().isEmpty())) {
                        resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Todos los campos del autor son obligatorios.");
                        return;
                    }
                    Autor autor = new Autor();
                    autor.setNombreAutor(nombreAutor);
                    autor.setApellidoPaterno(apellidoPaternoAutor);
                    autor.setApellidoMaterno(apellidoMaternoAutor);
                    autorService.insertarAutor(autor);
                    resp.setStatus(HttpServletResponse.SC_OK);
                    resp.getWriter().write("Autor registrado exitosamente");
                    break;
                }
                case "editar": {
                    
                    Integer idAutor = Integer.valueOf(req.getParameter("idAutor"));
                    String nombreAutor = req.getParameter("nombreAutor");
                    String apellidoPaternoAutor = req.getParameter("apellidoPaternoAutor");
                    String apellidoMaternoAutor = req.getParameter("apellidoMaternoAutor");
                    
                     if (Arrays.asList(nombreAutor, apellidoPaternoAutor, apellidoMaternoAutor)
                            .stream()
                            .anyMatch(s -> s == null || s.trim().isEmpty())) {
                        resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Datos incompletos para editar el Autor.");
                        return;
                    }
                    
                    Autor autor = new Autor();
                    autor.setIdAutor(idAutor);
                    autor.setNombreAutor(nombreAutor.trim());
                    autor.setApellidoPaterno(apellidoPaternoAutor);
                    autor.setApellidoMaterno(apellidoMaternoAutor);
                    autorService.actualizarAutor(autor);
                    resp.setStatus(HttpServletResponse.SC_OK);
                    resp.getWriter().write("Autor actualizado exitosamente");
                    recargarAutores(req, resp);
                    break;
                }
                case "eliminar": {
                    Integer idAutor = Integer.valueOf(req.getParameter("idAutor"));
                    if (idAutor == null) {
                        resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "el código del autor es requerido");
                        return;
                    }
                    
                    autorService.eliminarAutor(idAutor);
                    resp.setStatus(HttpServletResponse.SC_OK);
                    resp.getWriter().write("Autor eliminado exitosamente");
                    recargarAutores(req, resp);
                    break;
                }

                default:
                    throw new AssertionError();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al registrar el autor");
        }
    }

    private void recargarAutores(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            // Redirige al mismo servlet para recargar la lista
            resp.sendRedirect(req.getContextPath() + "/autores");
        } catch (IOException e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al recargar la vista de autores");
        }
    }
}
