export interface User {
    id: number;
    username: string;
    email: string;
}

export interface UserProfile {
    id: number;
    user: User;
    bio?: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: User;
    created_at: string;
    updated_at: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthContextType {
    isAuthenticated: boolean | null;
    refreshToken: () => Promise<void>;
    auth: () => Promise<void>;
}