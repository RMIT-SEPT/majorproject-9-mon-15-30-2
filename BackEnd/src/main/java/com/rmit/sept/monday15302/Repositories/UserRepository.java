package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    @Query("select user from User user where user.userName = :username")
    User getUserByUsername(String username);

    @Query("select user from User user where user.id = :Id")
    User getUserById(String Id);
}