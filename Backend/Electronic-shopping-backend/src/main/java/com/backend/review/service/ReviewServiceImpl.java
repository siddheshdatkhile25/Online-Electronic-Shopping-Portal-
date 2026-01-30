package com.backend.review.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.common.Enums.CustomException;
import com.backend.common.exception.Reviews.ReviewAlreadyExistsException;
import com.backend.order.Repository.OrderItemRepository;
import com.backend.product.repository.ProductRepository;
import com.backend.review.DTO.AddReviewRequest;
import com.backend.review.DTO.ReviewResponse;
import com.backend.review.entity.Review;
import com.backend.review.repository.ReviewRepository;
import com.backend.user.Repository.UserRepository;
import com.backend.user.entites.User;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    @Override
    public void addReview(AddReviewRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check product exists in user's order items
        boolean hasOrdered = orderItemRepository
                .existsByOrder_User_IdAndProduct_Id(request.getUserId(), request.getProductId());

        if (!hasOrdered) {
            throw new RuntimeException("You must purchase product to review");
        }

        // Prevent duplicate review
        boolean alreadyReviewed = reviewRepository
                .existsByUser_IdAndProduct_Id(request.getUserId(), request.getProductId());

        if (alreadyReviewed) {
            throw new ReviewAlreadyExistsException(CustomException.REVIEW_ALREADY_EXISTS_EXCEPTION);
        }

        Review review = new Review();
        review.setUser(user);
        review.setProduct(productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found")));
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());

        reviewRepository.save(review);
    }

    @Override
    public List<ReviewResponse> getReviewsByProduct(Long productId) {

        productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return reviewRepository.findReviewsByProduct(productId);
    }

    @Override
    public void updateReview(AddReviewRequest request) {

        Review review = reviewRepository
            .findByUserIdAndProductId(request.getUserId(), request.getProductId())
            .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        reviewRepository.save(review);
    }


   
    @Override
    public void deleteReview(Long userId, Long productId) {

        Review review = reviewRepository
            .findByUserIdAndProductId(userId, productId)
            .orElseThrow(() -> new RuntimeException("Review not found"));

        reviewRepository.delete(review);
    }

}
