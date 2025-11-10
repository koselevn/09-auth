import { User } from "@/types/user";
import { use } from "react";
import { create } from "zustand";

interface AuthStore {
    user: User,
    isAuthenticated: boolean,
    setUser: (User: User) => void,
    clearIsAuthenticated: () => void
};

const initalUser: User = {
    email: '',
    username: '',
    avatar: '',
}

export const useAuth = create<AuthStore>()(
    (set) => ({
        user: initalUser,
        isAuthenticated: false,
        setUser: (user: User) => {set({user: user, isAuthenticated: true})},
        clearIsAuthenticated: () => {set({user: initalUser, isAuthenticated: false})},
    })
)