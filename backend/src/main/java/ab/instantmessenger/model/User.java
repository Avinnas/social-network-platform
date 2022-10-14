package ab.instantmessenger.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long userId;

    String username;

    String email;

    String password;

    @JsonBackReference(value = "user-conversations")
    @ManyToMany(mappedBy = "users")
    List<Conversation> conversations;

    @JsonBackReference(value = "user-messages")
    @OneToMany(mappedBy = "user")
    List<Message> messages;
}
