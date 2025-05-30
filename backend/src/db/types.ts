export type GENDER  = 'MALE' | 'FEMALE' | 'OTHER';

export interface User {
    id: string,
    full_name: string;
    username: string;
    password: string;
    gender: GENDER;
    profile_pic: string;
    created_at: string;
    updated_at: string;
};

export type NewUserData = Omit<User,'id' | 'created_at' | 'updated_at'>;
export type Users = Omit<User,'password' | 'created_at' | 'updated_at'>;

export interface Conversation {
    id: string,
    created_at: string;
    updated_at: string;
};

export interface ConversationWithUsers extends Conversation {
    //conversation_id: string,
    participants: Users[];
};

export interface ConversationsWithUsers extends Omit<ConversationWithUsers, 'created_at' | 'updated_at'> {
}



interface UserWithConversations extends User {
    conversations: Conversation[];
};

export interface Message {
    id: string,
    body: string,
    sender_id: string,
    conversation_id: string,
    created_at: string;
    updated_at: string;
};

export interface ConversationWithMessages extends Conversation {
    messages: Message [];
}
