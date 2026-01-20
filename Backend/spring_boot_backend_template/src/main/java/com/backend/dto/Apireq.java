package com.backend.dto;

import java.time.LocalDate;

import com.backend.entities.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Apireq {
	private String employeeName;
	private String dept;
	private LocalDate attendancedate;
	private Status status;
	private int hoursWorked;
}
