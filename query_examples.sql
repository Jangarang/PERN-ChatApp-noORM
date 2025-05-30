SELECT m.id, m.body, m.sender_id, m.conversation_id, m.created_at,
m.updated_at ,c.id AS conversation_id, c.created_at AS conversation_created_at, 
c.updated_at AS conversation_updated_at
FROM conversations c
LEFT JOIN messages m ON m.conversation_id = c.id
WHERE c.id IN ('330a6fec-5dd8-4732-8761-770478b1506e');

SELECT u.id, u.full_name, u.profile_pic
            FROM users u 
            JOIN user_conversations uc ON u.id = uc.user_id
            WHERE uc.conversation_id IN (
                SELECT conversation_id
                FROM user_conversations
				WHERE user_id = 'a226b6c5-ecde-49f9-b8ee-fb27824c68e5'
            )
			AND u.id != 'a226b6c5-ecde-49f9-b8ee-fb27824c68e5'

This is from find_conversations_between_users_query
// console.log('join_user_conversation_query id1: ', userId1 );
        // console.log('join_user_conversation_query id2: ', userId2 );
        // const result = await db.query(`
        //     SELECT 1
        //     FROM user_conversations uc1
        //     JOIN user_conversations uc2
        //         ON uc1.conversations_id = uc2.converation_id
        //     WHERE uc1.user_id = $1
        //     AND uc2.user_id = $2
        //     LIMIT 1;
        // `);