package com.backend.review.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.review.DTO.AddReviewRequest;
import com.backend.review.DTO.ReviewResponse;
import com.backend.review.service.ReviewServiceImpl;
import com.backend.review.service.ReviewService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
	private final ReviewService reviewService;
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> addReview(
	        @RequestBody AddReviewRequest request) {
	   

	    reviewService.addReview(request);

	    return ResponseEntity.ok("Review added successfully");
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<List<ReviewResponse>> getReviewsByProduct(@PathVariable Long productId){
		
		 return ResponseEntity.ok(
	                reviewService.getReviewsByProduct(productId)
	        );
	    }
	@PutMapping("/update")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> updateReview(@RequestBody AddReviewRequest request) {
	    reviewService.updateReview(request);
	    return ResponseEntity.ok("Review updated successfully");
	}

	@DeleteMapping("/delete/{userId}/{productId}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> deleteReview(
	        @PathVariable Long userId,
	        @PathVariable Long productId) {

	    reviewService.deleteReview(userId, productId);
	    return ResponseEntity.ok("Review deleted successfully");
	}


	
	}