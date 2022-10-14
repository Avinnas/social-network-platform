package ab.instantmessenger.model;

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
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

    @OneToMany(mappedBy = "conversation")
    List<Message> messages;

    @ManyToMany
    @JoinTable(
            name = "conversations_users",
            joinColumns = { @JoinColumn(name = "conversation_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") }
    )
    List<User> users;
}
