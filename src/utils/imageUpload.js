import { supabase } from '../supabaseClient';

/**
 * Uploads an image file to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name (default: 'blog_assets')
 * @returns {Promise<{url: string, error: null} | {url: null, error: string}>}
 */
export async function uploadImageToSupabase(file, bucket = 'blog_assets') {
    try {
        // Validate file is an image
        if (!file.type.startsWith('image/')) {
            return { url: null, error: 'File must be an image' };
        }

        // Generate unique filename using timestamp and random string
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.name.split('.').pop() || 'png';
        const fileName = `${timestamp}-${randomString}.${fileExtension}`;

        // Upload file to Supabase storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Upload error:', error);
            return { url: null, error: error.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        return { url: publicUrl, error: null };
    } catch (err) {
        console.error('Unexpected error during upload:', err);
        return { url: null, error: err.message || 'Upload failed' };
    }
}
