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

        // ⚠️ FINAL SAFETY NET: Force loading to false after 6s no matter what
        // This ensures the app never gets stuck in "Loading" state
        const safetyNet = setTimeout(() => {
            setLoading(l => {
                if (l) {
                    console.warn("DEBUG: Safety Net triggered - forcing loading=false");
                    return false;
                }
                return l;
            });
        }, 6000);

        return () => clearTimeout(safetyNet);
    }, []);

    const fetchPosts = async () => {
        console.log("DEBUG: fetchPosts STARTED - SAFETY TIMEOUT VERSION");
        setLoading(true);
        setError(null);

        // Safety timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            console.warn("DEBUG: Fetch timed out - forcing loading false");
            setLoading(false);
        }, 5000);

        try {
            // Check if supabase client exists
            if (!supabase) {
                throw new Error("Supabase client is not initialized");
            }

            console.log("DEBUG: Fetching from news_posts table...");

            // Simple, direct fetch - no Promise.race, no timeouts
            const { data, error: fetchError } = await supabase
                .from('news_posts')
                .select('id, title, content, author, created_at, category, image_url, slug')
                .order('updated_at', { ascending: false });

            console.log("DEBUG: Fetch completed", {
                success: !fetchError,
                rowCount: data?.length || 0
            });

            if (fetchError) {
                console.error('Supabase Error:', fetchError);
                setError(fetchError.message);

                // Fallback to cache on error
                const cached = localStorage.getItem('cached_posts');
                if (cached) {
                    setPosts(JSON.parse(cached));
                }
            } else if (data) {
                console.log("DEBUG: Setting posts and caching");
                setPosts(data);
                localStorage.setItem('cached_posts', JSON.stringify(data));
            }

        } catch (err) {
            console.error("Fetch Exception:", err);
            setError(err.message || 'Network Error');

            // Fallback to cache on exception
            const cached = localStorage.getItem('cached_posts');
            if (cached) {
                setPosts(JSON.parse(cached));
            }
        } finally {
            clearTimeout(timeoutId);
            console.log("DEBUG: Setting loading to false");
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
