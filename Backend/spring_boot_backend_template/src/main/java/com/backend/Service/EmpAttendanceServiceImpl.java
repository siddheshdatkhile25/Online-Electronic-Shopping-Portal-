package com.backend.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.Exception.ResourceNotFoundException;
import com.backend.Repository.EmpAttendanceRepository;
import com.backend.dto.ApiResponse;
import com.backend.dto.Apireq;
import com.backend.entities.EmployeeAttendance;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmpAttendanceServiceImpl implements EmpAttendanceService {
	
	@Autowired
	private EmpAttendanceRepository empAttendanceRepo;
	@Override
	public ApiResponse addNewEmpAttendance(EmployeeAttendance emp) {
		System.out.println(emp.toString());
		EmployeeAttendance empEntity = empAttendanceRepo.save(emp);
		if(empEntity == null) {
			throw new ResourceNotFoundException("Failed To add Data");
			
		}
		return new ApiResponse("Record Added Successfully", "Success");
	}
	
	@Override
	public List<EmployeeAttendance> getEmpoyeeStatusAbsent(String status , LocalDate date) {
		List<EmployeeAttendance> emplist = empAttendanceRepo.findByStatusAndAttendancedate(status , date);
		
		return emplist;
	}
	
	

}
