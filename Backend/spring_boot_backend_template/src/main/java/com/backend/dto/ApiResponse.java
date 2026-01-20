package com.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApiResponse {
	String mesg;
	String status;
	
	public ApiResponse(String mesg , String status) {
		this.mesg = mesg;
		this.status = status;
	}
	

}
