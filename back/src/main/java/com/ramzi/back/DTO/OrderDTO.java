package com.ramzi.back.DTO;

import lombok.Data;

@Data
public class OrderDTO {
    private String orderId;
    private int userId;
    private String date;
    private double totalPrice;
}
