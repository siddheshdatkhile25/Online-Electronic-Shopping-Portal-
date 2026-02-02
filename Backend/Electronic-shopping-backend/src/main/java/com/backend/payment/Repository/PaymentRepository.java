package com.backend.payment.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.order.entites.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
	Optional<Payment> findByOrder_Id(Long orderId);
	
	
}
