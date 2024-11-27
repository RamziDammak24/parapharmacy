package com.ramzi.back.Service.Impl;
import com.ramzi.back.DTO.ProductDTO;
import com.ramzi.back.Entity.Product;
import com.ramzi.back.Repository.ProductRepository;
import com.ramzi.back.Service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productrepository;
    public ProductServiceImpl(ProductRepository productrepository) {
        this.productrepository = productrepository;
    }
    @Override
    public ProductDTO CreateProduct(ProductDTO productdto) {
        // Convert ProductDTO to the entity class
        Product product = new Product();
        product.setName(productdto.getName());
        product.setPrice(productdto.getPrice());
        product.setDescription(productdto.getDescription());
        product.setImage(productdto.getImage());
        product.setCategory(productdto.getCategory());
        product.setQuantity(productdto.getQuantity());
        // Save the product entity using the repository
        Product savedProduct = productrepository.save(product);
        // Convert the saved product back to ProductDTO and return
        ProductDTO savedProductDTO = new ProductDTO();
        savedProductDTO.setId(savedProduct.getId());
        savedProductDTO.setName(savedProduct.getName());
        savedProductDTO.setPrice(savedProduct.getPrice());
        savedProductDTO.setDescription(savedProduct.getDescription());
        savedProductDTO.setImage(savedProduct.getImage());
        savedProductDTO.setCategory(savedProduct.getCategory());
        savedProductDTO.setQuantity(savedProduct.getQuantity());

        return savedProductDTO;
    }
    public List<Product> getAllProducts() {
        return productrepository.findAll();
    }
}
