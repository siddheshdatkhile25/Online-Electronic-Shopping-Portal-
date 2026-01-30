package com.backend.review.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.review.DTO.ReviewResponse;
import com.backend.review.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long>{

	//if review already exists
	boolean existsByUser_IdAndProduct_Id(Long userId, Long productId);

	//JPQL DTO Projection
	@Query("""
			SELECT new com.backend.review.DTO.ReviewResponse(
			r.id,r.rating,r.comment,r.createdAt,CONCAT(r.user.firstname, ' ', r.user.lastname),r.user.id)
			FROM Review r
			WHERE r.product.id= :productId
			ORDER BY r.createdAt DESC
			
			""")
	
	//r.user.name => Review->User->Name
	List<ReviewResponse> findReviewsByProduct(@Param("productId")Long productId);
	
	Optional<Review> findByUserIdAndProductId(Long userId, Long productId);

	
}
