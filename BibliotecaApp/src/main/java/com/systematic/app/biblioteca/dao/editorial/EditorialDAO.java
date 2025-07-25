
package com.systematic.app.biblioteca.dao.editorial;

import com.systematic.app.biblioteca.dao.CRUD;
import com.systematic.app.biblioteca.models.Editorial;
import java.util.Optional;

/**
 *
 * @author anthony
 */
public interface EditorialDAO extends CRUD<Editorial>{
    Optional<Editorial> findByNameEditorial(String nameEditorial);
}
