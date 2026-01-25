import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    // Initialize with cached data if available for INSTANT load
    const [posts, setPosts] = useState(() => {
        try {
            const cached = localStorage.getItem('cached_posts');
            return cached ? JSON.parse(cached) : [];
        } catch {
            return [];
        }
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        // Safe auth check
        try {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setUser(session?.user ?? null);
            }).catch(err => console.warn("Supabase Auth Error (Check credentials):", err));

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setUser(session?.user ?? null);
            });

            // Clean up subscription on unmount
            return () => {
                subscription?.unsubscribe();
            };
        } catch (err) {
            console.warn("Supabase Client Error:", err);
            setError(err.message);
        }

        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        console.log("DEBUG: fetchPosts STARTED - FORCED_BYPASS_V2");
        setLoading(true);
        setError(null);

        // BYPASS LOGIC:
        // Force loading to false after 100ms.
        // This PROVES if we can update the state.
        setTimeout(() => {
            console.log("DEBUG: FORCED LOADING FALSE");
            setLoading(false);
            setError("DEBUG_BYPASS_COMPLETE");
        }, 100);
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <BlogContext.Provider value={{ posts, loading, error, user, login, logout, fetchPosts }}>
            {children}
        </BlogContext.Provider>
    );
};
