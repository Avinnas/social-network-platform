package ab.instantmessenger.dto;

import ab.instantmessenger.model.Message;

import java.util.List;

public record ConversationPageDto (long conversationId, List<Message> messages){}
