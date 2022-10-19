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
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long conversationId;

    String title;

    @OneToMany(mappedBy = "conversation")
    @JsonBackReference
    List<Message> messages;

    @ManyToMany
    @JoinTable(
            name = "conversations_users",
            joinColumns = { @JoinColumn(name = "conversation_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") }
    )
    List<User> users;
}
