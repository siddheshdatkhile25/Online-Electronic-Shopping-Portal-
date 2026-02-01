package com.backend.common.exception.Reviews;

import com.backend.common.Enums.CustomException;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewAlreadyExistsException extends RuntimeException{


private final CustomException customException;


}


