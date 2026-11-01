INSERT INTO users
(username, password, fullname)
VALUES 
('erfan', 'erfan123', 'Erfan Yousufi'), -- 1
('yousuf', 'yousuf123', 'Yousuf Khaliqyar'), -- 2
('wahid', 'wahid123', 'Wahid Ahmad Ahmadi'); -- 3


INSERT INTO setting 
(theme, user_id)
VALUES 
('dark', 2);

INSERT INTO contact
(main_user, contact_user)
VALUES 
(1, 2),
(2, 1),
(3, 2);

INSERT INTO room 
(description)
VALUES
('Room For Full Stack Development'); -- 1

INSERT INTO room_member 
(user_id, room_id)
VALUES 
(1, 1),
(2, 1),
(3, 1);

INSERT INTO message 
(user_id,text, room_id)
VALUES
(1, 'Salam ba Hamagi', 1),
(2, 'Salam Ba to', 1),
(3, 'Saheha diga', 1);