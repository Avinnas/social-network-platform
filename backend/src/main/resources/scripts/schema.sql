USE my_database;
CREATE TABLE `user`
(
    `user_id`  bigint       NOT NULL AUTO_INCREMENT,
    `email`    varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `conversation`
(
    `conversation_id` bigint NOT NULL AUTO_INCREMENT,
    `title`           varchar(255) DEFAULT NULL,
    PRIMARY KEY (`conversation_id`)
);

CREATE TABLE `conversations_users`
(
    `conversation_id` bigint NOT NULL,
    `user_id`         bigint NOT NULL,
    PRIMARY KEY (`conversation_id`, `user_id`),
    FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`conversation_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)

);

CREATE TABLE `message`
(
    `message_id`      bigint        NOT NULL AUTO_INCREMENT,
    `content`         varchar(1000) NOT NULL,
    `date`            datetime(6)   NOT NULL,
    `deleted`         bit(1)        NOT NULL DEFAULT b'0',
    `edited`          bit(1)        NOT NULL DEFAULT b'0',
    `conversation_id` bigint        NOT NULL,
    `user_id`         bigint        NOT NULL,
    PRIMARY KEY (`message_id`),
    KEY `FK6yskk3hxw5sklwgi25y6d5u1l` (`conversation_id`),
    KEY `FKb3y6etti1cfougkdr0qiiemgv` (`user_id`),
    CONSTRAINT `FK6yskk3hxw5sklwgi25y6d5u1l` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`conversation_id`)
);