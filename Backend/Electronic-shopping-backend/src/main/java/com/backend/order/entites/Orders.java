package com.backend.order.entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.backend.common.Enums.OrderStatus;
import com.backend.common.entites.BaseEntity;
import com.backend.user.entites.User;

@Entity
@Table(name = "orders")

@AttributeOverride(name = "id", column = @Column(name = "order_id"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Orders extends BaseEntity{

    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "order_date_time")
    private LocalDateTime orderDateTime;

    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;
    

//    @ManyToOne
//    @JoinColumn(name = "payment_id")
//    private Payment payment;

}
