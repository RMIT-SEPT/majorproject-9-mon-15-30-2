package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.CustomerDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDetailsRepository extends CrudRepository<CustomerDetails, String> {
    @Query("select customer from CustomerDetails customer where customer.id = :id")
    CustomerDetails getCustomerById(String id);
}
