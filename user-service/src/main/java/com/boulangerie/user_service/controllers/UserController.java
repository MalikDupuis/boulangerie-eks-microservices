package com.boulangerie.user_service.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boulangerie.user_service.models.User;
import com.boulangerie.user_service.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public Optional<User> getById(Long id) {
        return userService.findById(id);
    }
    
}
