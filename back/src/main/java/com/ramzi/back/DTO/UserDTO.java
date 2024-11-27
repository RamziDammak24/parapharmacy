package com.ramzi.back.DTO;


import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String name;
    private String firstName;
    private String email;
    private String dateOfBirth;
    private String password;
}
