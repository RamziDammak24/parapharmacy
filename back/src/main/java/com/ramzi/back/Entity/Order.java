package com.ramzi.back.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @Column(name = "order_id")
    private String orderId;

    @Column(name = "user_id")
    private int userId; // ID of the user placing the order

    @Column(name = "date")
    private String date; // Order creation date

    @Column(name = "total_price")
    private double totalPrice;
}
