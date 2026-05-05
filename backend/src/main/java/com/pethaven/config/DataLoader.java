package com.pethaven.config;

import com.pethaven.entity.Pet;
import com.pethaven.entity.User;
import com.pethaven.repository.PetRepository;
import com.pethaven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create sample users
        if (userRepository.count() == 0) {
            User admin = new User("admin", "admin@pethaven.com", passwordEncoder.encode("admin123"), "Admin");
            admin.setRole(User.UserRole.ADMIN);
            userRepository.save(admin);

            User user1 = new User("johndoe", "john@example.com", passwordEncoder.encode("password"), "John");
            user1.setLastName("Doe");
            user1.setPhone("09171234567");
            userRepository.save(user1);

            User user2 = new User("janesmith", "jane@example.com", passwordEncoder.encode("password"), "Jane");
            user2.setLastName("Smith");
            user2.setPhone("09281234567");
            userRepository.save(user2);
        }

        // Create sample pets
        if (petRepository.count() == 0) {
            User john = userRepository.findByUsername("johndoe").orElse(null);
            User jane = userRepository.findByUsername("janesmith").orElse(null);

            Pet pet1 = new Pet("Luna", 2, "Cebu City", "Golden Retriever", "Friendly and loves cuddles", "/images/dog1.jpg", "John Doe", "09171234567");
            pet1.setOwner(john);
            petRepository.save(pet1);

            Pet pet2 = new Pet("Browny", 5, "Labangon", "Askal", "Energetic and loyal", "/images/dog2.jpg", "Jane Smith", "09281234567");
            pet2.setOwner(jane);
            petRepository.save(pet2);

            Pet pet3 = new Pet("Rocky", 3, "Lapu-Lapu", "German Shepherd", "Smart and protective", "/images/dog3.jpg", "John Doe", "09171234567");
            pet3.setOwner(john);
            petRepository.save(pet3);

            Pet pet4 = new Pet("Milo", 1, "Mandaue", "Mixed", "Playful and affectionate", "/images/dog4.jpg", "Jane Smith", "09281234567");
            pet4.setOwner(jane);
            petRepository.save(pet4);

            Pet pet5 = new Pet("Bella", 2, "Talisay", "Shih Tzu", "Calm and great with kids", "/images/dog1.jpg", "John Doe", "09171234567");
            pet5.setOwner(john);
            petRepository.save(pet5);

            Pet pet6 = new Pet("Coco", 4, "Consolacion", "Askal", "Street-smart and gentle", "/images/dog2.jpg", "Jane Smith", "09281234567");
            pet6.setOwner(jane);
            petRepository.save(pet6);

            Pet pet7 = new Pet("Nala", 1, "Cebu City", "Mixed Breed", "Tiny bundle of energy", "/images/dog3.jpg", "John Doe", "09171234567");
            pet7.setOwner(john);
            petRepository.save(pet7);

            Pet pet8 = new Pet("Max", 6, "Mandaue", "Labrador", "Laid-back and loves walks", "/images/dog4.jpg", "Jane Smith", "09281234567");
            pet8.setOwner(jane);
            petRepository.save(pet8);

            Pet pet9 = new Pet("Daisy", 3, "Lapu-Lapu", "Poodle Mix", "Fluffy and loves attention", "/images/dog1.jpg", "John Doe", "09171234567");
            pet9.setOwner(john);
            petRepository.save(pet9);

            Pet pet10 = new Pet("Bruno", 5, "Labangon", "Rottweiler Mix", "Big but super gentle", "/images/dog2.jpg", "Jane Smith", "09281234567");
            pet10.setOwner(jane);
            petRepository.save(pet10);

            Pet pet11 = new Pet("Kitty", 2, "Talisay", "Puspin", "Independent and curious", "/images/dog3.jpg", "John Doe", "09171234567");
            pet11.setOwner(john);
            petRepository.save(pet11);

            Pet pet12 = new Pet("Buddy", 1, "Cebu City", "Beagle Mix", "Nose always to the ground", "/images/dog4.jpg", "Jane Smith", "09281234567");
            pet12.setOwner(jane);
            petRepository.save(pet12);
        }
    }
}