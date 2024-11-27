package com.ramzi.back.Controller;

import com.ramzi.back.DTO.ProductDTO;
import com.ramzi.back.Entity.Product;
import com.ramzi.back.Service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }
    @PostMapping("/addproduct")
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        return productService.CreateProduct(productDTO);
    }
}
