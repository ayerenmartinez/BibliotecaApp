package com.systematic.app.biblioteca.controllers;

import com.systematic.app.biblioteca.config.DBConnection;
import com.systematic.app.biblioteca.dao.autor.AutorDAO;
import com.systematic.app.biblioteca.dao.autor.AutorDAOImpl;
import com.systematic.app.biblioteca.dao.categorialibro.CategoriaLibroDAO;
import com.systematic.app.biblioteca.dao.categorialibro.CategoriaLibroDAOImpl;
import com.systematic.app.biblioteca.dao.editorial.EditorialDAO;
import com.systematic.app.biblioteca.dao.editorial.EditorialDAOImpl;
import com.systematic.app.biblioteca.services.autor.AutorService;
import com.systematic.app.biblioteca.services.autor.AutorServiceImpl;
import com.systematic.app.biblioteca.services.categorialibro.CategoriaLibroService;
import com.systematic.app.biblioteca.services.categorialibro.CategoriaLibroServiceImpl;
import com.systematic.app.biblioteca.services.editorial.EditorialService;
import com.systematic.app.biblioteca.services.editorial.EditorialServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;

/**
 *
 * @author anthony
 */
@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String accion = req.getParameter("accion");
        if ("totales".equalsIgnoreCase(accion)) {
            try (Connection connection = DBConnection.getConnection()) {
                AutorDAO autorDAO = new AutorDAOImpl(connection);
                AutorService autorService = new AutorServiceImpl(autorDAO);
                CategoriaLibroDAO categoriaLibroDAO = new CategoriaLibroDAOImpl(connection);
                CategoriaLibroService categoriaLibroService = new CategoriaLibroServiceImpl(categoriaLibroDAO);
                EditorialDAO editorialDAO = new EditorialDAOImpl(connection);
                EditorialService editorialService = new EditorialServiceImpl();
                int totalAutores = autorService.totalRegistros();
                int totalCategorias = categoriaLibroService.totalRegistros();
                //int totalEditoriales = editorialService.totalRegistros();

                String json = String.format(
                        "{\"totalAutores\":%d,\"totalCategorias\":%d}",
                        totalAutores, totalCategorias
                );
                resp.setContentType("application/json");
                resp.setCharacterEncoding("UTF-8");
                resp.getWriter().write(json);
            } catch (Exception e) {
                e.printStackTrace();
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al obtener los totales");
            }
        } else {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción inválida");
        }
    }

}
