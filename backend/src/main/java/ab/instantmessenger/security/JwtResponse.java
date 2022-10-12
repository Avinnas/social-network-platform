package ab.instantmessenger.security;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {

    private String token;
    private String type = "Basic";
    private String username;
    private String password;

    public JwtResponse(String jwt, String username, String password) {

        this.token = jwt;
        this.username = username;
        this.password = password;
    }
}
