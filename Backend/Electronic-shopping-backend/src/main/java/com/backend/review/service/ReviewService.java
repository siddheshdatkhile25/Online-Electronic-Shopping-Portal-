package com.backend.review.service;

import java.util.List;

import com.backend.review.DTO.AddReviewRequest;
import com.backend.review.DTO.ReviewResponse;

public interface ReviewService {

	  void addReview(AddReviewRequest request);

	List<ReviewResponse> getReviewsByProduct(Long productId);
}
