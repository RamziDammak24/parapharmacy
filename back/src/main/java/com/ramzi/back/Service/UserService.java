package com.ramzi.back.Service;


import com.ramzi.back.DTO.UserDTO;
import com.ramzi.back.Entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    UserDTO CreateUser(UserDTO userDTO);
    List<User> getAllUsers();

}
