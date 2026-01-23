
import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import { supabase } from '../supabaseClient';

const EditPost = () => {
    const { id } = useParams();
    const { user, getPost, fetchPosts } = useBlog(); // Create context link
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR
    const [lastUploadedPath, setLastUploadedPath] = useState(null); // Track replacement

    useEffect(() => {
        if (!user) {
            navigate('/login');
            // return; // In a real app, redirection would happen. For dev, maybe we allow viewing.
        }

        if (id) {
            fetchPostData(id);
        }
    }, [id, user, navigate]);

    const fetchPostData = async (postId) => {
        const { data, error } = await supabase
            .from('news_posts')
            .select('*')
            .eq('id', postId)
            .single();

        if (data) {
            setTitle(data.title);
            setContent(data.content);
            setCoordinates(data.coordinates || '');
            setImageUrl(data.image_url || '');
        }
    };

    const handleImageUpload = async (file) => {
        // CLEANUP: If user uploads multiple times, remove the previous "draft" upload to save space
        if (lastUploadedPath) {
            await supabase.storage.from('blog_assets').remove([lastUploadedPath]);
        }

        setStatus('UPLOADING');
        try {
            const fileExt = file.name.split('.').pop() || 'png';
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { data, error } = await supabase.storage
                .from('blog_assets')
                .upload(filePath, file);

            if (error) throw error;

            // Track this path so we can replace it if they upload again
            setLastUploadedPath(filePath);

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('blog_assets')
                .getPublicUrl(filePath);

            setImageUrl(publicUrl);
            setStatus('IDLE');
        } catch (error) {
            console.error('Upload Error:', error);
            setStatus('ERROR');
            if (/bucket not found/i.test(error.message) || error.code === '42P01') {
                alert('STORAGE ERROR: Bucket "blog_assets" not found.\n\nACTION REQUIRED:\n1. Open Supabase SQL Editor.\n2. Run the "src/storage_setup.sql" script.');
            } else {
                alert(`Upload Failed: ${error.message}`);
            }
        }
    };

    const handlePublish = async () => {
        setStatus('SENDING');

        // Dynamic upsert payload
        const payload = {
            title,
            content,
            coordinates,
            image_url: imageUrl,
            updated_at: new Date(new Date().setFullYear(new Date().getFullYear() + 57)).toISOString(),
        };

        if (id) payload.id = id;

        const { data, error } = await supabase
            .from('news_posts')
            .upsert(payload)
            .select();

        if (error) {
            console.error('Transmission Failed:', error);
            setStatus('ERROR');
            if (error.message.includes('Could not find the table') || error.code === '42P01') {
                alert('DB ERROR: Table "news_posts" not found.\n\nACTION REQUIRED:\n1. Go to your Supabase Dashboard.\n2. Open the SQL Editor.\n3. Copy/Paste the contents of "src/db_setup.sql" and run it.');
            } else {
                alert(`Error: ${error.message}`);
            }
        } else {
            setStatus('SUCCESS');
            alert('Transmission Successful: Story Synchronized.');
            fetchPosts(); // REFRESH DATA IMMEDIATELY
            if (!id && data[0]?.id) {
                navigate(`/editor/${data[0].id}`); // Switch to edit mode for the new post
            }
        }
    };

    return (
        <div className="app-main-wrapper" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header minimal={true} />

                <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                    <div className="mono text-accent" style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                        // TERMINAL_EDITOR_V1.0 {id ? `[EDITING: ${id}]` : '[NEW_TRANSMISSION]'}
                    </div>

                    <div style={{ display: 'grid', gap: '40px' }}>

                        {/* Title Input */}
                        <div>
                            <label className="text-secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}>&gt; TITLE_INPUT</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="ENTER_HEADLINE..."
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '2px solid #333',
                                    color: 'white',
                                    fontSize: '2rem',
                                    padding: '10px 0',
                                    fontFamily: 'var(--font-main)',
                                    fontWeight: 'bold',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        {/* Coordinates Input */}
                        <div>
                            <label className="text-secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}>&gt; GLOBAL_COORDINATES</label>
                            <input
                                type="text"
                                value={coordinates}
                                onChange={(e) => setCoordinates(e.target.value)}
                                placeholder="e.g. 40.7° N, 74.0° W"
                                style={{
                                    width: '100%',
                                    background: '#111',
                                    border: '1px solid #333',
                                    color: 'var(--accent-color)',
                                    padding: '10px',
                                    fontFamily: 'var(--font-mono)'
                                }}
                            />
                        </div>

                        {/* Image URL Input with Upload & Paste */}
                        <div>
                            <label className="text-secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}>&gt; COVER_IMAGE_URL [PASTE_SUPPORTED]</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    onPaste={async (e) => {
                                        const items = e.clipboardData?.items;
                                        if (items) {
                                            for (let i = 0; i < items.length; i++) {
                                                if (items[i].type.indexOf('image') !== -1) {
                                                    e.preventDefault();
                                                    const file = items[i].getAsFile();
                                                    await handleImageUpload(file);
                                                }
                                            }
                                        }
                                    }}
                                    placeholder="https://... OR PASTE IMAGE HERE"
                                    style={{
                                        flex: 1,
                                        background: '#111',
                                        border: '1px solid #333',
                                        color: 'var(--accent-color)',
                                        padding: '10px',
                                        fontFamily: 'var(--font-mono)'
                                    }}
                                />
                                <label style={{
                                    cursor: 'pointer',
                                    background: '#333',
                                    color: 'white',
                                    padding: '0 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {status === 'UPLOADING' ? '...' : 'UPLOAD_FILE'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            <div className="mono text-secondary" style={{ fontSize: '0.6rem', marginTop: '5px' }}>
                                HINT: You can copy an image (Ctrl+C) and paste it (Ctrl+V) directly into the box above.
                            </div>
                        </div>

                        {/* Markdown Body */}
                        <div style={{ position: 'relative' }}>
                            <label className="text-secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}>&gt; BODY_CONTENT (MARKDOWN)</label>
                            {/* Grid Background Layer */}
                            <div style={{
                                position: 'absolute',
                                top: '30px',
                                left: 0,
                                width: '100%',
                                height: 'calc(100% - 30px)',
                                zIndex: 0,
                                opacity: 0.1,
                                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                pointerEvents: 'none'
                            }}></div>

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Begin transmission..."
                                style={{
                                    width: '100%',
                                    minHeight: '400px',
                                    background: 'transparent',
                                    border: '1px solid #333',
                                    color: '#ccc',
                                    padding: '20px',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    resize: 'vertical',
                                    outline: 'none',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                            <div className="mono" style={{ alignSelf: 'center', color: status === 'Success' ? 'green' : (status === 'Error' ? 'red' : '#666') }}>
                                STATUS: {status}
                            </div>
                            <button
                                onClick={handlePublish}
                                disabled={status === 'SENDING'}
                                style={{
                                    background: status === 'SENDING' ? '#333' : 'var(--accent-color)',
                                    color: 'black',
                                    padding: '15px 40px',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: status === 'SENDING' ? 'not-allowed' : 'pointer',
                                    fontFamily: 'var(--font-mono)',
                                    letterSpacing: '1px'
                                }}>
                                {status === 'SENDING' ? 'TRANSMITTING...' : 'INITIATE_UPLOAD'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
