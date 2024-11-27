package com.ramzi.back.Service;

import com.ramzi.back.DTO.ProductDTO;
import com.ramzi.back.Entity.Product;

import java.util.List;

public interface ProductService {
    ProductDTO CreateProduct(ProductDTO productdto);
    List<Product> getAllProducts();
}
