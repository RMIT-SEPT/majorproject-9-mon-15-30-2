package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.JwtBlacklist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtBlacklistRepository extends CrudRepository<JwtBlacklist, String> {
    JwtBlacklist findByTokenEquals(String token);
}
