
import React, { useState, useEffect, useRef } from 'react';
import { useBlog } from '../context/BlogContext';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { uploadImageToSupabase } from '../utils/imageUpload';
import Header from '../Header';
import './EditorConsole.css';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useBlog();
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const contentTextareaRef = useRef(null);
    const imageUrlInputRef = useRef(null);

    // Form state
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [author, setAuthor] = useState('');
    const [customTimestamp, setCustomTimestamp] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    // Auto-generate slug from title
    useEffect(() => {
        if (title && !slug) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setSlug(generatedSlug);
        }
    }, [title, slug]);

    // Fetch post if editing
    useEffect(() => {
        const fetchPostData = async () => {
            if (!id || id === 'new') return;

            try {
                const { data, error } = await supabase
                    .from('news_posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data) {
                    setTitle(data.title || '');
                    setSlug(data.slug || '');
                    setCategory(data.category || '');
                    setContent(data.content || '');
                    setImageUrl(data.image_url || '');
                    setCoordinates(data.coordinates || '');
                    setAuthor(data.author || '');
                    setCustomTimestamp(data.custom_timestamp || '');
                    setIsPublished(data.is_published || false);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                alert('Failed to load post');
            }
        };

        fetchPostData();
    }, [id]);

    // Save post function
    const savePost = async (publishStatus) => {
        if (!title || !content) {
            alert('Title and content are required');
            return;
        }

        setSaving(true);

        try {
            const postData = {
                title,
                slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                category,
                content,
                image_url: imageUrl,
                coordinates,
                author: author || currentUser?.email || 'Anonymous',
                custom_timestamp: customTimestamp,
                is_published: publishStatus
            };

            let result;
            if (id && id !== 'new') {
                // Update existing post
                result = await supabase
                    .from('news_posts')
                    .update(postData)
                    .eq('id', id)
                    .select();
            } else {
                // Create new post
                result = await supabase
                    .from('news_posts')
                    .insert([postData])
                    .select();
            }

            if (result.error) throw result.error;

            alert(publishStatus ? 'Post published successfully!' : 'Draft saved successfully!');

            if (id === 'new' && result.data && result.data[0]) {
                navigate(`/edit/${result.data[0].id}`);
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save post: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveDraft = () => savePost(false);
    const handlePublish = () => {
        if (confirm('Are you sure you want to publish this post?')) {
            savePost(true);
        }
    };

    // Handle paste event for clipboard images
    const handlePaste = async (e) => {
        console.log('PASTE EVENT DETECTED');
        const items = e.clipboardData?.items;
        if (!items) {
            console.log('No clipboard items found');
            return;
        }

        console.log('Clipboard items:', items.length);

        // Check if clipboard contains an image
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            console.log(`Item ${i} type:`, item.type);

            if (item.type.startsWith('image/')) {
                console.log('IMAGE DETECTED! Processing...');
                e.preventDefault(); // Prevent default paste behavior for images

                const file = item.getAsFile();
                if (!file) {
                    console.log('Failed to get file from clipboard item');
                    continue;
                }

                console.log('File details:', { name: file.name, type: file.type, size: file.size });
                setUploading(true);

                try {
                    console.log('Starting upload to Supabase...');
                    // Upload image to Supabase
                    const { url, error } = await uploadImageToSupabase(file);

                    if (error) {
                        console.error('Upload failed:', error);
                        alert('Failed to upload image: ' + error);
                        return;
                    }

                    console.log('Upload successful! URL:', url);

                    // Insert markdown image syntax at cursor position
                    const textarea = contentTextareaRef.current;
                    if (textarea) {
                        const cursorPos = textarea.selectionStart;
                        const textBefore = content.substring(0, cursorPos);
                        const textAfter = content.substring(cursorPos);
                        const imageMarkdown = `![Uploaded image](${url})`;

                        const newContent = textBefore + imageMarkdown + textAfter;
                        setContent(newContent);

                        console.log('Markdown inserted at position:', cursorPos);

                        // Move cursor after the inserted markdown
                        setTimeout(() => {
                            textarea.focus();
                            const newCursorPos = cursorPos + imageMarkdown.length;
                            textarea.setSelectionRange(newCursorPos, newCursorPos);
                        }, 0);
                    }
                } catch (err) {
                    console.error('Paste error:', err);
                    alert('Failed to process image');
                } finally {
                    setUploading(false);
                }

                break; // Only process the first image
            }
        }
    };

    // Handle paste event for IMAGE_URL field
    const handleImageUrlPaste = async (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        // Check if clipboard contains an image
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.type.startsWith('image/')) {
                e.preventDefault();
                console.log('IMAGE pasted in IMAGE_URL field!');

                const file = item.getAsFile();
                if (!file) continue;

                setUploadingImage(true);

                try {
                    const { url, error } = await uploadImageToSupabase(file);

                    if (error) {
                        alert('Failed to upload image: ' + error);
                        return;
                    }

                    console.log('Image uploaded! URL:', url);
                    setImageUrl(url);
                } catch (err) {
                    console.error('Image paste error:', err);
                    alert('Failed to process image');
                } finally {
                    setUploadingImage(false);
                }

                break;
            }
        }
    };


    return (
        <div className="app-main-wrapper">
            <div className="app-layout">
                {/* Corner Markers */}
                <div className="corner-marker corner-top-left"></div>
                <div className="corner-marker corner-top-right"></div>
                <div className="corner-marker corner-bottom-left"></div>
                <div className="corner-marker corner-bottom-right"></div>

                <div className="editor-console">
                    {/* Use Main App Header */}
                    <Header />

                    {/* Action Buttons */}
                    <div className="editor-actions">
                        <button
                            className="btn-draft"
                            onClick={handleSaveDraft}
                            disabled={saving}
                        >
                            {saving ? 'SAVING...' : 'SAVE_DRAFT'}
                        </button>
                        <button
                            className="btn-publish"
                            onClick={handlePublish}
                            disabled={saving}
                        >
                            {saving ? 'PUBLISHING...' : 'PUBLISH'}
                        </button>
                    </div>

                    {/* Main Form */}
                    <div className="editor-form">
                        <div className="form-group">
                            <label>TITLE</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter post title..."
                                className="input-field"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>SLUG</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="Auto-generated from title"
                                    className="input-field"
                                />
                            </div>

                            <div className="form-group">
                                <label>CATEGORY</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="e.g. technology, design"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>CONTENT {uploading && <span style={{ color: '#00ff00' }}>(Uploading image...)</span>}</label>
                            <textarea
                                ref={contentTextareaRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onPaste={handlePaste}
                                placeholder="Write your post content here... (You can paste images directly!)"
                                className="textarea-field"
                                rows={15}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>IMAGE_URL {uploadingImage && <span style={{ color: '#00ff00' }}>(Uploading...)</span>}</label>
                                <input
                                    ref={imageUrlInputRef}
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    onPaste={handleImageUrlPaste}
                                    placeholder="Paste image or enter URL"
                                    className="input-field"
                                />
                            </div>

                            <div className="form-group">
                                <label>COORDINATES</label>
                                <input
                                    type="text"
                                    value={coordinates}
                                    onChange={(e) => setCoordinates(e.target.value)}
                                    placeholder="e.g. 0X88.2.1"
                                    className="input-field"
                                />
                            </div>

                            <div className="form-group">
                                <label>CUSTOM_TIMESTAMP <span style={{ fontSize: '0.7rem', color: '#666' }}>(optional - for display only)</span></label>
                                <input
                                    type="text"
                                    value={customTimestamp}
                                    onChange={(e) => setCustomTimestamp(e.target.value)}
                                    placeholder="e.g. 2083.12.05 | 06:00 UTC"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>AUTHOR</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder={currentUser?.email || 'Anonymous'}
                                className="input-field"
                            />
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isPublished}
                                    onChange={(e) => setIsPublished(e.target.checked)}
                                />
                                <span>PUBLISHED</span>
                            </label>
                        </div>

                        {imageUrl && (
                            <div className="form-group">
                                <label>IMAGE PREVIEW</label>
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="preview-image"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="editor-footer">
                        <div className="footer-left">
                            <span>PIXY|NEWS_EDITOR</span>
                        </div>
                        <div className="footer-right">
                            <span className="status-indicator">●</span>
                            <span>SYSTEM_ACTIVE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
