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
        console.log("DEBUG: fetchPosts STARTED");
        setLoading(true);
        setError(null); // Clear previous errors

        // Safety Timeout: If DB hangs for > 5 seconds, stop loading so UI doesn't freeze.
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => {
                console.log("DEBUG: Timeout Reached");
                reject(new Error('Request timed out (5s limit)'));
            }, 5000)
        );

        try {
            if (!supabase) throw new Error("Supabase client is MISSING (Check .env)");

            console.log("DEBUG: calling supabase.from('news_posts')");
            const fetchPromise = supabase
                .from('news_posts') // Back to 'news_posts' as requested
                .select('*')
                .order('updated_at', { ascending: false });

            // specific check for timeout vs fetch
            const result = await Promise.race([fetchPromise, timeoutPromise]);

            // Supabase returns { data, error } object on success
            const { data, error } = result;

            console.log("DEBUG: Fetch Result:", { dataReceived: !!data, error: error });

            if (error) {
                console.error('Error fetching posts:', error);
                setError(error.message || 'Unknown Supabase Error');
            } else if (data) {
                setPosts(data);
                localStorage.setItem('cached_posts', JSON.stringify(data));
            }

        } catch (err) {
            console.error("Fetch failed or timed out:", err);
            setError(err.message || 'Network/Timeout Error');
        } finally {
            console.log("DEBUG: fetchPosts FINALLY block - Setting loading to false");
            setLoading(false);
        }
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
