package com.ramzi.back.Controller;


import com.ramzi.back.DTO.OrderDTO;
import com.ramzi.back.Entity.Order;
import com.ramzi.back.Service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping("/addorder")
    public OrderDTO createOrder(@RequestBody OrderDTO orderdto) {
        return orderService.CreateOrder(orderdto);
    }

}
