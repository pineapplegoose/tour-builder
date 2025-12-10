'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

interface User {
    userId: Id<"users">;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user: clerkUser, isLoaded } = useUser();
    const [convexUser, setConvexUser] = useState<User | null>(null);

    const ensureUser = useMutation(api.users.ensureUser);
    const currentUser = useQuery(
        api.users.getCurrentUser,
        clerkUser ? {} : "skip"
    );

    useEffect(() => {
        async function setupUser() {
            if (isLoaded && clerkUser) {
                try {
                    // Ensure user exists in Convex
                    await ensureUser({
                        email: clerkUser.emailAddresses[0]?.emailAddress || "",
                        name: clerkUser.fullName || clerkUser.firstName || "User",
                    });
                } catch (error) {
                    console.error("Error ensuring user:", error);
                }
            }
        }

        setupUser();
    }, [clerkUser, isLoaded, ensureUser]);

    useEffect(() => {
        if (currentUser) {
            setConvexUser({
                userId: currentUser._id,
                email: currentUser.email,
                name: currentUser.name,
            });
        } else {
            setConvexUser(null);
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{
            user: convexUser,
            isLoading: !isLoaded
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}