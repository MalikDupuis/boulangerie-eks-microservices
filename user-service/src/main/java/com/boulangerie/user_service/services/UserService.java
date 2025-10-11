package com.boulangerie.user_service.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boulangerie.user_service.models.User;
import com.boulangerie.user_service.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }
}
