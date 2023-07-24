DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteanote`(
in note_id_in int
)
BEGIN
delete from note where note_id=note_id_in;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_notes_userid_based`(
in user_id_in int
)
BEGIN
select n.note_id,n.user_id,u.username,n.subject,n.detail,n.note_date,n.note_insertion from note n
inner join user u on u.user_id=n.user_id
where n.user_id=user_id_in;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_note`(
in user_id_in int,
in subject_in varchar(100),
in note_in varchar(100),
in date_in datetime
)
BEGIN
insert into note (user_id,subject,detail,note_date,note_insertion,loc) values
(user_id_in,subject_in,note_in,date_in,date(sysdate()),0);
select 'inserted' as msg;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login_check`(
in email_in varchar(100),
in password_in varchar(100)
)
BEGIN

if exists(select * from user where email=email_in and password=password_in)
then
select user_id,username,email from user where email=email_in and password=password_in;
select 'Valid Credentials' as msg;
else
select 'Invalid Credentials' as msg;
end if;
END$$
DELIMITER ;
