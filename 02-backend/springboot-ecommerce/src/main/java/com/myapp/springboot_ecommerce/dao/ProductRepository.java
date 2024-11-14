package com.myapp.springboot_ecommerce.dao;

import com.myapp.springboot_ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
