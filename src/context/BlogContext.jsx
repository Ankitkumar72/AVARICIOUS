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
                console.error('Error fetching posts (using fallback):', error);
                // Keep initialPosts if invalid
            } else if (data && data.length > 0) {
                setPosts(data);
            }
            // If data is empty array (valid db, no posts), we might want to keep showing fallback? 
            // Or assume the user deleted everything. Let's show fallback if DB is empty to avoid "broken" look for now.
            else if (data && data.length === 0) {
                // For now, let's allow empty DB to show "No Data Found" if they genuinely have a connected DB but no posts.
                // But typically if they just started, it's safer to keep showing the demo data until they add a post.
                // Let's stick with: if empty, show fallback? No, that prevents clearing the blog.
                // Correct logic: if error, show fallback. If success but empty, show empty.
                setPosts([]);
            }

        } catch (err) {
            console.error("Supabase Connection Failed:", err);
            // Fallback remains in state
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
