package com.ramzi.back.DTO;
import lombok.Data;
@Data
public class ProductDTO {
    private int id;
    private String name;
    private String description;
    private String image;
    private double price;
    private String category;
    private int quantity;
}
