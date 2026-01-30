package com.backend.order.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.backend.cart.entity.Cart;
import com.backend.cart.entity.CartItem;
import com.backend.cart.repository.CartItemRepository;
import com.backend.cart.repository.CartRepository;
import com.backend.common.Enums.OrderStatus;
import com.backend.common.Enums.PaymentStatus;
import com.backend.notifications.MailService;
import com.backend.order.DTO.AdminOrderItemResponse;
import com.backend.order.DTO.AdminOrderResponse;
import com.backend.order.DTO.MyOrderResponse;
import com.backend.order.DTO.OrderItemResponse;
import com.backend.order.Repository.OrderItemRepository;
import com.backend.order.Repository.OrderRepository;
import com.backend.order.entites.OrderAddress;
import com.backend.order.entites.OrderItem;
import com.backend.order.entites.Orders;
import com.backend.order.entites.Payment;
import com.backend.payment.Repository.PaymentRepository;
import com.backend.product.entity.Product;
import com.backend.product.entity.ProductImage;
import com.backend.product.repository.ProductRepository;
import com.backend.user.Repository.UserAddressRepository;
import com.backend.user.Repository.UserRepository;
import com.backend.user.entites.User;
import com.backend.user.entites.UserAddress;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;
    private final UserAddressRepository userAddressRepository;
    private final MailService mailService;

    @Override
    public Object placeOrder(Long addressId, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart Not Found"));

        List<CartItem> cartItems =
                cartItemRepository.findByCart_CartId(cart.getCartId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart has no items");
        }

        Orders order = new Orders();
        order.setUser(user);
        order.setOrderDateTime(LocalDateTime.now());
        order.setStatus(OrderStatus.PLACED);

        UserAddress selectedAddress =
                userAddressRepository.findByIdAndUser_Id(addressId, userId)
                        .orElseThrow(() -> new RuntimeException("Address not found"));

        OrderAddress orderAddress = new OrderAddress();
        orderAddress.setFullName(user.getFirstname() + " " + user.getLastname());
        orderAddress.setPhone(user.getPhone());
        orderAddress.setAddressLine1(selectedAddress.getAddressLine1());
        orderAddress.setAddressLine2(selectedAddress.getAddressLine2());
        orderAddress.setCity(selectedAddress.getCity());
        orderAddress.setState(selectedAddress.getState());
        orderAddress.setPincode(selectedAddress.getPincode());

        order.setDeliveryAddress(orderAddress);

        Orders savedOrder = orderRepository.save(order);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for product: " + product.getName());
            }

            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getDiscountedPrice());

            totalAmount = totalAmount.add(
                    product.getDiscountedPrice()
                            .multiply(BigDecimal.valueOf(cartItem.getQuantity()))
            );

            orderItemRepository.save(orderItem);
        }

        Payment payment = new Payment();
        payment.setOrder(savedOrder);
        payment.setAmount(totalAmount);
        payment.setStatus(PaymentStatus.PENDING);
        payment.setMode(null);

        paymentRepository.save(payment);

        cartItemRepository.deleteByCart_CartId(cart.getCartId());

        return Map.of(
                "orderId", savedOrder.getId(),
                "orderStatus", savedOrder.getStatus(),
                "paymentStatus", payment.getStatus(),
                "amount", totalAmount
        );
    }

    @Override
    public List<MyOrderResponse> getMyOrders(Long userId) {

        List<Orders> orders =
                orderRepository.findByUserIdOrderByOrderDateTimeDesc(userId);

        return orders.stream().map(order -> {

            Payment payment =
                    paymentRepository.findByOrder_Id(order.getId()).orElse(null);

            List<OrderItem> orderItems =
                    orderItemRepository.findByOrderId(order.getId());

            List<OrderItemResponse> itemResponses =
                    orderItems.stream().map(item -> {

                        String productImage = item.getProduct()
                                .getImages()
                                .stream()
                                .filter(img -> Boolean.TRUE.equals(img.getIsPrimary()))
                                .findFirst()
                                .map(ProductImage::getImageUrl)
                                .orElse(
                                        item.getProduct().getImages().isEmpty()
                                                ? null
                                                : item.getProduct().getImages().get(0).getImageUrl()
                                );

                        OrderItemResponse dto = new OrderItemResponse();
                        dto.setProductId(item.getProduct().getId());
                        dto.setProductName(item.getProduct().getName());
                        dto.setQuantity(item.getQuantity());
                        dto.setPrice(item.getPrice());
                        dto.setProductImage(productImage);
                        return dto;

                    }).toList();

            MyOrderResponse response = new MyOrderResponse();
            response.setOrderId(order.getId());
            response.setOrderDateTime(order.getOrderDateTime());
            response.setOrderStatus(order.getStatus());
            response.setPaymentStatus(payment.getStatus());
            response.setAmount(payment.getAmount());
            response.setItems(itemResponses);

            return response;

        }).toList();
    }

    @Override
    public List<AdminOrderResponse> getAllOrdersForAdmin() {

        List<Orders> orders =
                orderRepository.findAllByOrderByOrderDateTimeDesc();

        return orders.stream().map(order -> {

            Payment payment =
                    paymentRepository.findByOrder_Id(order.getId()).orElse(null);

            List<OrderItem> orderItems =
                    orderItemRepository.findByOrderId(order.getId());

            List<AdminOrderItemResponse> itemResponses =
                    orderItems.stream().map(item -> {

                        AdminOrderItemResponse dto = new AdminOrderItemResponse();
                        dto.setProductId(item.getProduct().getId());
                        dto.setProductName(item.getProduct().getName());
                        dto.setQuantity(item.getQuantity());
                        dto.setPrice(item.getPrice());
                        dto.setTotalAmount(
                                item.getPrice().multiply(
                                        BigDecimal.valueOf(item.getQuantity()))
                        );
                        return dto;

                    }).toList();

            AdminOrderResponse response = new AdminOrderResponse();
            response.setOrderId(order.getId());
            response.setOrderDate(order.getOrderDateTime());
            response.setUserName(
                    order.getUser().getFirstname() + " " + order.getUser().getLastname());
            response.setDeliveryAddress(order.getDeliveryAddress());
            response.setOrderStatus(order.getStatus());
            response.setPaymentStatus(payment.getStatus());
            response.setPaymentMode(payment.getMode());
            response.setTotalAmount(payment.getAmount());
            response.setItems(itemResponses);

            return response;

        }).toList();
    }

    @Override
    public void updateOrderStatus(Long orderId, OrderStatus newStatus) {

        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus currentStatus = order.getStatus();

        if (!isValidTransition(currentStatus, newStatus)) {
            throw new RuntimeException(
                    "Invalid order status transition: "
                            + currentStatus + " → " + newStatus);
        }

        order.setStatus(newStatus);

        Payment payment =
                paymentRepository.findByOrder_Id(orderId).orElse(null);

        if (newStatus == OrderStatus.DELIVERED
                && payment != null
                && payment.getMode() != null
                && payment.getMode().name().equals("COD")) {

            payment.setStatus(PaymentStatus.SUCCESS);
            paymentRepository.save(payment);
        }

        orderRepository.save(order);

        String email = order.getUser().getEmail();
        String subject = "Your order #" + orderId + " status updated";
        String body =
                "Hello " + order.getUser().getFirstname() + ",\n\n"
                        + "Your order #" + orderId + " status has been updated to: "
                        + newStatus + ".\n"
                        + "Thank you for shopping with us!";

        mailService.sendEmail(email, subject, body);
    }

    private boolean isValidTransition(OrderStatus current, OrderStatus next) {

        return switch (current) {
            case PLACED -> next == OrderStatus.CONFIRMED;
            case CONFIRMED -> next == OrderStatus.SHIPPED;
            case SHIPPED -> next == OrderStatus.DELIVERED;
            default -> false;
        };
    }
}
