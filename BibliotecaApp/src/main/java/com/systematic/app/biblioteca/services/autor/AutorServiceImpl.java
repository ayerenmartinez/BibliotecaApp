package com.systematic.app.biblioteca.services.autor;

import com.systematic.app.biblioteca.dao.autor.AutorDAO;
import com.systematic.app.biblioteca.models.Autor;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author anthony
 */
public class AutorServiceImpl implements AutorService {

    private final AutorDAO autorDAO;

    public AutorServiceImpl(AutorDAO autorDAO) {
        this.autorDAO = autorDAO;
    }

    @Override
    public Optional<Autor> findByNameAutor(String nombreAutor) {
        return autorDAO.findByNameAutor(nombreAutor);
    }

    @Override
    public Optional<Autor> findById(Integer id) {
        return autorDAO.findById(id);
    }

    @Override
    public List<Autor> findAll() {
        return autorDAO.obtenerTodos();
    }

    @Override
    public void insertarAutor(Autor autor) {
        autorDAO.insertar(autor);
    }

    @Override
    public void actualizarAutor(Autor autor) {
        autorDAO.actualizar(autor);
    }

    @Override
    public void eliminarAutor(Integer id) {
        autorDAO.eliminar(id);
    }

    @Override
    public int totalRegistros() {
        return autorDAO.totalRegistros();
    }

}
