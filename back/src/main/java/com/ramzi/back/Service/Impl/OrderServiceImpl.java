package com.ramzi.back.Service.Impl;

import com.ramzi.back.DTO.OrderDTO;
import com.ramzi.back.Entity.Order;
import com.ramzi.back.Repository.OrderRepository;
import com.ramzi.back.Service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderDTO CreateOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setOrderId(orderDTO.getOrderId());
        order.setDate(orderDTO.getDate());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setUserId(orderDTO.getUserId());

        Order savedOrder = orderRepository.save(order);

        OrderDTO savedOrderDTO = new OrderDTO();
        savedOrderDTO.setOrderId(savedOrder.getOrderId());
        savedOrderDTO.setDate(savedOrder.getDate());
        savedOrderDTO.setTotalPrice(savedOrder.getTotalPrice());
        savedOrderDTO.setUserId(savedOrder.getUserId());

        return savedOrderDTO;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
