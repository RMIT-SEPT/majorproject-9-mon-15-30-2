package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.AdminDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDetailsRepository extends CrudRepository<AdminDetails, String> {

    @Query("select DISTINCT admin.id from AdminDetails admin where admin.service = :service")
    Iterable<String> getAdminIdFromService(@Param("service")  String service);

    @Query("select admin.service from AdminDetails admin where admin.id = :id")
    String getServiceByAdminId(@Param("id") String id);
}
