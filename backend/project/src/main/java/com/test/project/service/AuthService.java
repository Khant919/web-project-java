package com.test.project.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.test.project.dto.AuthRequest;
import com.test.project.dto.AuthResponse;
import com.test.project.model.User;
import com.test.project.repositories.UserRepo;

@Service
public class AuthService {

    private final UserRepo userRepo;

    public AuthService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public AuthResponse signup(AuthRequest request) {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse("Email already exists", 0);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // ⚠️ plaintext, use BCrypt in real app!
        user.setUsername(request.getUsername());
        user.setCoins(200); // signup bonus
        userRepo.save(user);

        return new AuthResponse("Signup successful", user.getCoins());
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepo.findByEmail(request.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            User user = userOpt.get();
            user.setCoins(user.getCoins() + 50); // login reward
            userRepo.save(user);
            return new AuthResponse(user.getId(), "Login successful", user.getCoins());
        }
        return new AuthResponse(0, "Invalid credentials", 0);
    }

    public AuthResponse forgotPassword(String email) {
        Optional<User> userOpt = userRepo.findByEmail(email);
        if (userOpt.isPresent()) {
            // Here we just simulate reset link (no email service yet)
            return new AuthResponse("Password reset link sent to " + email, 0);
        }
        return new AuthResponse("Email not found", 0);
    }
}
