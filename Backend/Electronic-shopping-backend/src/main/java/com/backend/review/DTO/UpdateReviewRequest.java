package com.backend.review.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateReviewRequest {
    private Long userId;
    private Long productId;
    private int rating;
    private String comment;
}