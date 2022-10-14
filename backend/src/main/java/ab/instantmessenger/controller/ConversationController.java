package ab.instantmessenger.controller;

import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.repository.ConversationRepository;
import ab.instantmessenger.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/conversations")
public class ConversationController {

    @Autowired
    ConversationService conversationService;

    @GetMapping
    public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(conversationService.getAllUserConversations(userDetails));
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> addMessage(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Message message, @PathVariable long id){

        return ResponseEntity.ok(conversationService.addMessage(userDetails, message, id));
    }
}
