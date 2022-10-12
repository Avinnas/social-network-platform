package ab.instantmessenger.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {

    private String accessToken;
    private String type = "Basic";
    private String username;
    private String password;

    public JwtResponse(String jwt, String username, String password) {

        this.accessToken = jwt;
        this.username = username;
        this.password = password;
    }
}
