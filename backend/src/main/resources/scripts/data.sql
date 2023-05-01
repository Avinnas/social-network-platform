USE my_database;
INSERT INTO `user` (USER_ID, EMAIL, USERNAME, PASSWORD)
VALUES (1, 'email@email.com', 'user', '$2a$10$JpG8ikevB9Lavj3RcuDE5u/BwaT/gaDjkjASo6c8tMA5CXgI1Aggy');
INSERT INTO `user` (USER_ID, EMAIL, USERNAME, PASSWORD)
VALUES (2, 'email2@email.com', 'user2', '$2a$10$JpG8ikevB9Lavj3RcuDE5u/BwaT/gaDjkjASo6c8tMA5CXgI1Aggy');


INSERT INTO `conversation` (conversation_id)
VALUES (1);

INSERT INTO `conversations_users` (conversation_id, user_id)
VALUES (1, 1);
INSERT INTO `conversations_users` (conversation_id, user_id)
VALUES (1, 2);