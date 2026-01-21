# 📦 E-Commerce Project – Spring Boot Module Structure

## Root Package
com.cdac.ecommerce



---

## 1️⃣ User Management Module

Handles user registration, authentication, roles, profile, and addresses.
```
com.cdac.ecommerce.user
│
├── controller
│ └── UserController.java
│
├── service
│ ├── UserService.java
│ └── UserServiceImpl.java
│
├── repository
│ ├── UserRepository.java
│ └── AddressRepository.java
│
├── entity
│ ├── User.java
│ └── UserAddress.java
│
└── dto
├── UserRegisterDTO.java
├── UserLoginDTO.java
└── UserResponseDTO.java
```


**Responsibilities**
- User registration & login
- Role-based access
- Profile & address management
- Activity tracking

---

## 2️⃣ Product & Category Management Module

Manages product catalog and classification.
```
com.cdac.ecommerce.product
│
├── controller
│ ├── ProductController.java
│ └── CategoryController.java
│
├── service
│ ├── ProductService.java
│ ├── ProductServiceImpl.java
│ ├── CategoryService.java
│ └── CategoryServiceImpl.java
│
├── repository
│ ├── ProductRepository.java
│ ├── CategoryRepository.java
│ └── ProductImageRepository.java
│
├── entity
│ ├── Product.java
│ ├── Category.java
│ └── ProductImage.java
│
└── dto
├── ProductRequestDTO.java
├── ProductResponseDTO.java
└── CategoryDTO.java
```


---

## 3️⃣ Cart Management Module

Handles temporary product selection before checkout.
```
com.cdac.ecommerce.cart
│
├── controller
│ └── CartController.java
│
├── service
│ ├── CartService.java
│ └── CartServiceImpl.java
│
├── repository
│ ├── CartRepository.java
│ └── CartItemRepository.java
│
├── entity
│ ├── Cart.java
│ └── CartItem.java
│
└── dto
├── AddToCartDTO.java
└── CartResponseDTO.java
```


**Note:** Cart logic is backend-controlled for security and consistency.

---

## 4️⃣ Wishlist Module

Allows users to save products for future reference.
```
com.cdac.ecommerce.wishlist
│
├── controller
│ └── WishlistController.java
│
├── service
│ ├── WishlistService.java
│ └── WishlistServiceImpl.java
│
├── repository
│ └── WishlistRepository.java
│
├── entity
│ └── Wishlist.java
│
└── dto
└── WishlistDTO.java
```


---

## 5️⃣ Order Management Module

Handles order creation and order history.
```
com.cdac.ecommerce.order
│
├── controller
│ └── OrderController.java
│
├── service
│ ├── OrderService.java
│ └── OrderServiceImpl.java
│
├── repository
│ ├── OrderRepository.java
│ └── OrderItemRepository.java
│
├── entity
│ ├── Order.java
│ └── OrderItem.java
│
└── dto
├── OrderRequestDTO.java
└── OrderResponseDTO.java
```


---

## 6️⃣ Payment Module

Manages payment processing and payment status.
```
com.cdac.ecommerce.payment
│
├── controller
│ └── PaymentController.java
│
├── service
│ ├── PaymentService.java
│ └── PaymentServiceImpl.java
│
├── repository
│ └── PaymentRepository.java
│
├── entity
│ └── Payment.java
│
└── dto
└── PaymentDTO.java
```


---

## 7️⃣ Delivery / Shipping Module

Tracks delivery status and logistics.
```
com.cdac.ecommerce.delivery
│
├── controller
│ └── DeliveryController.java
│
├── service
│ ├── DeliveryService.java
│ └── DeliveryServiceImpl.java
│
├── repository
│ └── DeliveryRepository.java
│
├── entity
│ └── Delivery.java
│
└── dto
└── DeliveryStatusDTO.java
```


---

## 8️⃣ Review & Rating Module

Manages product reviews and ratings.
```
com.cdac.ecommerce.review
│
├── controller
│ └── ReviewController.java
│
├── service
│ ├── ReviewService.java
│ └── ReviewServiceImpl.java
│
├── repository
│ └── ReviewRepository.java
│
├── entity
│ └── Review.java
│
└── dto
└── ReviewDTO.java
```


---

## 9️⃣ Notification Module

Handles system-generated notifications.
```
com.cdac.ecommerce.notification
│
├── controller
│ └── NotificationController.java
│
├── service
│ ├── NotificationService.java
│ └── NotificationServiceImpl.java
│
├── repository
│ └── NotificationRepository.java
│
├── entity
│ └── Notification.java
│
└── dto
└── NotificationDTO.java 
```



---

## 🔟 Activity Log & Audit Module

Tracks user actions for security and auditing.

```
com.cdac.ecommerce.activity
│
├── service
│ ├── ActivityLogService.java
│ └── ActivityLogServiceImpl.java
│
├── repository
│ └── ActivityLogRepository.java
│
└── entity
└── ActivityLog.java
```



(No controller – internal usage only)

---

## 🔐 Security Module (JWT Based)

Handles authentication and authorization.

```
com.cdac.ecommerce.security
│
├── config
│ ├── SecurityConfig.java
│ └── JwtConfig.java
│
├── filter
│ └── JwtAuthenticationFilter.java
│
├── util
│ └── JwtUtil.java
│
└── service
    └── CustomUserDetailsService.java
```

**Responsibilities**
- JWT token generation & validation
- User authentication & authorization
- Security configuration & CORS setup
- Custom user details loading



## ⚙️ Common / Shared Module

Reusable utilities and exception handling.
```
com.cdac.ecommerce.common
│
├── exception
│ ├── GlobalExceptionHandler.java
│ └── ResourceNotFoundException.java
│
├── response
│ └── ApiResponse.java
│
└── util
└── Constants.java
```
