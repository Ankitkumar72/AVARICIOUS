import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { initialPosts } from '../data/initialPosts';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    // Initialize with fallback data so the page is never empty
    const [posts, setPosts] = useState(initialPosts);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

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
        }

        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from('news_posts')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) {
                console.error('Error fetching posts:', error);
            } else if (data) {
                setPosts(data);
            }

        } catch (err) {
            console.error("Supabase Connection Failed:", err);
        }

        setLoading(false);
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
        <BlogContext.Provider value={{ posts, loading, user, login, logout, fetchPosts }}>
            {children}
        </BlogContext.Provider>
    );
};
