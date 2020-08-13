package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
