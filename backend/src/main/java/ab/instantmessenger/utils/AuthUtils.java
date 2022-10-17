package ab.instantmessenger.utils;

import ab.instantmessenger.model.User;
import ab.instantmessenger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthUtils {

    @Autowired
    static UserRepository userRepository;

    public static User getCurrentUser(){
        return userRepository.findByUsername(getCurrentUserDetails().getUsername());
    }

    public static UserDetails getCurrentUserDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetails) authentication.getPrincipal();
    }
}
