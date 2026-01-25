// Simple script to check database contents
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Connecting to Supabase...');
console.log('URL:', supabaseUrl ? 'FOUND' : 'MISSING');
console.log('KEY:', supabaseKey ? 'FOUND' : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
    console.log('\n=== CHECKING NEWS_POSTS TABLE ===\n');

    const { data, error } = await supabase
        .from('news_posts')
        .select('id, title, category, image_url, created_at, updated_at')
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('ERROR:', error);
        return;
    }

    console.log(`Found ${data.length} posts:\n`);

    data.forEach((post, index) => {
        console.log(`${index + 1}. ID: ${post.id}`);
        console.log(`   Title: ${post.title}`);
        console.log(`   Category: ${post.category}`);
        console.log(`   Image: ${post.image_url ? 'YES' : 'NO'}`);
        console.log(`   Created: ${post.created_at}`);
        console.log(`   Updated: ${post.updated_at}`);
        console.log('');
    });
}

checkDatabase().catch(console.error);
