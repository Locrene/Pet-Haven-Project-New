package com.pethaven.service;

import com.pethaven.dto.JwtResponse;
import com.pethaven.dto.LoginRequest;
import com.pethaven.dto.SignupRequest;
import com.pethaven.entity.User;
import com.pethaven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .toList().get(0);

        return new JwtResponse(jwt,
                               userDetails.getId(),
                               userDetails.getUsername(),
                               userDetails.getEmail(),
                               userDetails.getFirstName(),
                               List.of(role));
    }

    public User registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                           signUpRequest.getEmail(),
                           encoder.encode(signUpRequest.getPassword()),
                           signUpRequest.getFirstName());

        user.setLastName(signUpRequest.getLastName());
        user.setPhone(signUpRequest.getPhone());
        user.setAddress(signUpRequest.getAddress());

        return userRepository.save(user);
    }
}