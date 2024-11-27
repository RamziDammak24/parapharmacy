package com.ramzi.back.Service.Impl;

import com.ramzi.back.Controller.ProductController;
import com.ramzi.back.DTO.UserDTO;
import com.ramzi.back.Entity.User;
import com.ramzi.back.Repository.ProductRepository;
import com.ramzi.back.Repository.UserRepository;
import com.ramzi.back.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDTO CreateUser(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setFirstName(userDTO.getFirstName());
        user.setEmail(userDTO.getEmail());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setPassword(userDTO.getPassword());
        User savedUser = userRepository.save(user);
        UserDTO savedUserDTO = new UserDTO();
        savedUserDTO.setId(savedUser.getId());
        savedUserDTO.setName(savedUser.getName());
        savedUserDTO.setFirstName(savedUser.getFirstName());
        savedUserDTO.setEmail(savedUser.getEmail());
        savedUserDTO.setDateOfBirth(savedUser.getDateOfBirth());
        savedUserDTO.setPassword(savedUser.getPassword());
        return savedUserDTO;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
