import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
    user: User,
    isAuthenticated: boolean,
    setUser: (user: User) => void,
    clearIsAuthenticated: () => void
};

const initialUser: User = {
    email: '',
    username: '',
    avatar: '',
}

export const useAuth = create<AuthStore>()(
    (set) => ({
        user: initialUser,
        isAuthenticated: false,
        setUser: (user: User) => {set({user: user, isAuthenticated: true})},
        clearIsAuthenticated: () => {set({user: initialUser, isAuthenticated: false})},
    })
)