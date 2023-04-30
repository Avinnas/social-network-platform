package ab.instantmessenger.utils;

import ab.instantmessenger.model.User;
import ab.instantmessenger.repository.UserRepository;
import ab.instantmessenger.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


public class AuthUtils {

  public static User getCurrentUser() {
    return ((UserDetailsImpl) getCurrentUserDetails()).getUser();
  }

  public static UserDetails getCurrentUserDetails() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (UserDetails) authentication.getPrincipal();
  }
}
