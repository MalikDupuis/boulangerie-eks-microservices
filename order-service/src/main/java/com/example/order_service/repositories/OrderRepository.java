package com.example.order_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.order_service.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {}
