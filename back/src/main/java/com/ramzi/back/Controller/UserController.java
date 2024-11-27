package com.ramzi.back.Controller;


import com.ramzi.back.DTO.UserDTO;
import com.ramzi.back.Entity.User;
import com.ramzi.back.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
    @PostMapping("/adduser")
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.CreateUser(userDTO);
    }
}
