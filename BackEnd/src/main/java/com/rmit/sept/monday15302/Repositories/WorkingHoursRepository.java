package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.WorkingHours;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkingHoursRepository extends CrudRepository<WorkingHours, String> {

    @Query("select hours from WorkingHours hours where hours.admin_id.id = :admin_id and hours.day = :day")
    WorkingHours findByAdmin_idAndDay(String admin_id, int day);

    @Query("select hours from WorkingHours hours where hours.admin_id.id = :admin_id")
    List<WorkingHours> findByAdmin_id(String admin_id);

}
