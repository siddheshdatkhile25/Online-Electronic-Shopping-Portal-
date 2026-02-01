package com.backend.common.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.backend.common.Enums.CustomException;
import com.backend.common.dtos.ApiResponse;
import com.backend.common.exception.ResourceNotFoundException;
import com.backend.common.exception.Reviews.ReviewAlreadyExistsException;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	

	@ResponseStatus(HttpStatus.CONFLICT)
	@ExceptionHandler(ReviewAlreadyExistsException.class)
	ErrorResponse reviewAlreadyExists(ReviewAlreadyExistsException exception) {
	    return logAndReturnCustomException(exception.getCustomException());
	}


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(ex.getMessage(), false));
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse> handleDuplicate(DuplicateResourceException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiResponse(ex.getMessage(), false));
    }
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse> handleRuntime(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(ex.getMessage(), false));
    }
    @ExceptionHandler(MailException.class)
    public ResponseEntity<?> handleMailException(MailException ex){
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("email service failed.Please try again");
    	
    }
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ApiResponse> handleAll(Exception ex) {
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body(new ApiResponse("Something went wrong", false));
//    }
    
    
    private ErrorResponse logAndReturnCustomException(CustomException ex) {
        log.error(
            "Error : {} | Description : {} | Time : {}",
            ex.getMessage(),
            ex.getDescription(),
            ex.getTime()
        );
        return new ErrorResponse(
            ex.getMessage(),
            ex.getDescription(),
            ex.getTime()
        );
    }

    record ErrorResponse(String message, String description, LocalDateTime time) { }

}
