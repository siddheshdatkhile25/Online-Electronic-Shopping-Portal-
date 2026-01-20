package com.backend.Service;

import java.time.LocalDate;
import java.util.List;

import com.backend.dto.ApiResponse;
import com.backend.dto.Apireq;
import com.backend.entities.EmployeeAttendance;

public interface EmpAttendanceService {
	ApiResponse addNewEmpAttendance(EmployeeAttendance emp);

	List<EmployeeAttendance> getEmpoyeeStatusAbsent(String status, LocalDate date);
}
