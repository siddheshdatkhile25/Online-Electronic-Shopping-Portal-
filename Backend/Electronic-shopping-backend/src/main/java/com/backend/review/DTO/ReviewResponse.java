package com.backend.review.DTO;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewResponse {

    private Long id;
    private int rating;
    private String comment;
    private LocalDateTime createdAt; 
    private String userName;          
    private Long userId;
}
