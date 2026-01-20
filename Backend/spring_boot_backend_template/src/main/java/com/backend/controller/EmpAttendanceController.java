package com.backend.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Service.EmpAttendanceService;
import com.backend.dto.ApiResponse;
import com.backend.dto.Apireq;
import com.backend.entities.EmployeeAttendance;


import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/empattendance")
public class EmpAttendanceController {
	
	@Autowired
	private  EmpAttendanceService attendanceService;
	
	@PostMapping
	ResponseEntity<?> addNewEmployeeAttendance(@RequestBody EmployeeAttendance emp){
		try {
			System.out.println(emp);
			return ResponseEntity.status(HttpStatus.OK)
					.body(attendanceService.addNewEmpAttendance(emp));
		}catch(RuntimeException e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage(), "Failed"));
		}
	}
	
	@GetMapping("/fetchemployeees")
	ResponseEntity<?> fetchEmployeesBystatus(@RequestParam LocalDate date ){
		try {
			String status = "ABSENT";
			return ResponseEntity.status(HttpStatus.OK)
					.body(attendanceService.getEmpoyeeStatusAbsent(status, date));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage(), "Failed"));
		}
	}
	
	@GetMapping
	ResponseEntity<?> fetchEmployeesPresentInGivenRange(@RequestParam LocalDate date ){
		try {
			String status = "ABSENT";
			return ResponseEntity.status(HttpStatus.OK)
					.body(attendanceService.getEmpoyeeStatusAbsent(status, date));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage(), "Failed"));
		}
	}
	
	
	
	
	
	
	
	

}
