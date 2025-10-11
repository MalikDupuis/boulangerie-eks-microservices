package com.example.order_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.order_service.models.Order;
import com.example.order_service.services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAll() {
        return orderService.findAll();
    }

    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderService.save(order);
    }
}