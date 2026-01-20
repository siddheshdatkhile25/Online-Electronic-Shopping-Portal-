package com.backend.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.entities.EmployeeAttendance;


public interface EmpAttendanceRepository extends JpaRepository<EmployeeAttendance, Integer>{
	
	List<EmployeeAttendance> findByStatusAndAttendancedate(String status, LocalDate date);
	
//	@Query("select")
//	List<>
	
}
