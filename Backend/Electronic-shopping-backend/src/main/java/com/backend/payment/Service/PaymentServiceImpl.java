package com.backend.payment.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.backend.common.Enums.OrderStatus;
import com.backend.common.Enums.PaymentMode;
import com.backend.common.Enums.PaymentStatus;
import com.backend.order.Repository.OrderItemRepository;
import com.backend.order.Repository.OrderRepository;
import com.backend.order.entites.OrderItem;
import com.backend.order.entites.Orders;
import com.backend.order.entites.Payment;
import com.backend.payment.DTO.RazorpayVerifyRequest;
import com.backend.payment.DTO.SetPaymentModeRequest;
import com.backend.payment.Repository.PaymentRepository;
import com.backend.payment.Util.RazorPaySignatureUtil;
import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;



import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	@Value("${razorpay.key.id}")
	private String keyId;

	@Value("${razorpay.key.secret}")
	private String keySecret;


	private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final RazorpayClient razorpayClient;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    @Override
    public Object setPaymentMode(Long orderId, SetPaymentModeRequest request) {

        //Fetch order
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Validate order state
        if (!OrderStatus.PLACED.equals(order.getStatus())) {
            throw new RuntimeException("Payment mode cannot be changed");
        }
        
        


        // Fetch payment
        Payment payment = paymentRepository.findByOrder_Id(orderId)
                .orElseGet(() -> {
                    // Create new payment if it doesn't exist
                    Payment newPayment = new Payment();
                    newPayment.setOrder(order);
                   
                    return newPayment;
                });
        
        System.out.println(payment);
        
        // Set payment mode
        payment.setMode(request.getPaymentMode());

        paymentRepository.save(payment);

        
        return Map.of(
                "orderId", orderId,
                "paymentMode", payment.getMode(),
                "message", "Payment mode set successfully"
        );
    }

	@Override
	public Map<String, Object> createRazorpayOrder(Long orderId) throws Exception {
		
	    Payment payment = paymentRepository.findByOrder_Id(orderId)
	            .orElseThrow(() -> new RuntimeException("Payment not found for order"));
	    
		BigDecimal amount = payment.getAmount();

        Map<String, Object> options = new HashMap<>();
        options.put("amount", amount.multiply(BigDecimal.valueOf(100))); 
        options.put("currency", "INR");
        options.put("receipt", "order_" + orderId);

        Order order = razorpayClient.orders.create(
                new org.json.JSONObject(options)
        );

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("key", keyId);

        return response;
	}
	

	@Override
	public String verifyRazorpayPayment(Long orderId, RazorpayVerifyRequest request)
	        throws Exception {

	    boolean isValid = RazorPaySignatureUtil.verify(
	            request.getRazorpayOrderId(),
	            request.getRazorpayPaymentId(),
	            request.getRazorpaySignature(),
	            keySecret
	    );

	    if (!isValid) {
	        throw new RuntimeException("Invalid Razorpay signature");
	    }

	    Payment payment = paymentRepository.findByOrder_Id(orderId)
	            .orElseThrow(() -> new RuntimeException("Payment not found"));

	    Orders order = payment.getOrder();

	    //  Fetch order items
	    List<OrderItem> orderItems =
	            orderItemRepository.findByOrderId(orderId);

	    //  Final stock check & deduction
	    for (OrderItem item : orderItems) {
	        Product product = item.getProduct();

	     // Deduct stock safely
	        int remainingStock = product.getStock() - item.getQuantity();
	        if (remainingStock < 0) {
	            throw new RuntimeException("Insufficient stock for product: " + product.getName());
	        }
	        product.setStock(remainingStock);

	        // Do NOT change 'active' here; keep it true/false only for admin-deactivated products
	        productRepository.save(product);

	    }
	    //last working commit
	    // Update payment
	    payment.setStatus(PaymentStatus.SUCCESS);
	    payment.setMode(PaymentMode.ONLINE);
	    paymentRepository.save(payment);

	    //  Update order status
	    order.setStatus(OrderStatus.PLACED);
	    orderRepository.save(order);

	    return "Payment verified successfully";
	}



}
