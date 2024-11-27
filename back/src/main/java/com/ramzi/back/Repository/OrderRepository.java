package com.ramzi.back.Repository;

import com.ramzi.back.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String>
{
}
