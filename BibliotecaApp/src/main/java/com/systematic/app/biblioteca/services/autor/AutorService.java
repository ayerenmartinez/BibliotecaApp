package com.systematic.app.biblioteca.services.autor;

import com.systematic.app.biblioteca.models.Autor;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author anthony
 */
public interface AutorService {

    Optional<Autor> findByNameAutor(String nombreAutor);

    Optional<Autor> findById(Integer id);

    List<Autor> findAll();

    void insertarAutor(Autor autor);

    void actualizarAutor(Autor autor);

    void eliminarAutor(Integer id);

    int totalRegistros();
}
