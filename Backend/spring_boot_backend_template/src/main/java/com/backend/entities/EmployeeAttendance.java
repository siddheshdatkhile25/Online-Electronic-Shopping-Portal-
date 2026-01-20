package com.backend.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="employee_attendance")

@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeeAttendance {
	@Id
	private int id;
	@Column(name="emp_name")
	private String employeeName;
	private String dept;
	@Column(name="attendance_date")
	private LocalDate attendancedate;
	@Enumerated(EnumType.STRING)
	private Status status;
	private int hoursWorked;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public LocalDate getAttendancedate() {
		return attendancedate;
	}
	public void setAttendancedate(LocalDate attendancedate) {
		this.attendancedate = attendancedate;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public int getHoursWorked() {
		return hoursWorked;
	}
	public void setHoursWorked(int hoursWorked) {
		this.hoursWorked = hoursWorked;
	}
	
	

	
	
}
