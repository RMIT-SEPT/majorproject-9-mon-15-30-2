package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.AdminDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDetailsRepository extends CrudRepository<AdminDetails, Long> {
}
