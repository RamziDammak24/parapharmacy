package com.ramzi.back.Service;

import com.ramzi.back.DTO.OrderDTO;
import com.ramzi.back.Entity.Order;

import java.util.List;

public interface OrderService {
    OrderDTO CreateOrder(OrderDTO orderDTO);
    List<Order> getAllOrders();
}
