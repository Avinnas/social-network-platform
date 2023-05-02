package ab.instantmessenger.controller;

import ab.instantmessenger.dto.MessageReadDto;
import ab.instantmessenger.dto.MessageWriteDto;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessagingController {

  private final ConversationService conversationService;
  private final SimpMessagingTemplate simpMessagingTemplate;

  public MessagingController(ConversationService conversationService, SimpMessagingTemplate simpMessagingTemplate) {
    this.conversationService = conversationService;
    this.simpMessagingTemplate = simpMessagingTemplate;
  }

  @MessageMapping("/conversations/{conversationId}/messages")
  public void sendMessage(MessageWriteDto messageDto, @DestinationVariable long conversationId) {
    String destination = "/topic/conversations/" + conversationId + "/messages";

    MessageReadDto message = conversationService.addMessage(messageDto, conversationId);
    simpMessagingTemplate.convertAndSend(destination, message);
  }

  @MessageMapping("/conversations/{conversationId}/messages/{messageId}/delete")
  public void deleteMessage(
      @DestinationVariable long messageId, @DestinationVariable long conversationId) {
    String destination = "/topic/conversations/" + conversationId + "/messages";

    MessageReadDto deleted = conversationService.markDeletedMessage(messageId);
    simpMessagingTemplate.convertAndSend(destination, deleted);
  }
}
