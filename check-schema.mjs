import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('=== CHECKING news_posts TABLE SCHEMA ===\n');

    const { data, error } = await supabase
        .rpc('exec_sql', {
            query: `
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = 'news_posts'
                ORDER BY ordinal_position;
            `
        });

    if (error) {
        console.error('RPC not available, trying direct query...');

        // Try a simple select to see what columns exist
        const { data: sample, error: selectError } = await supabase
            .from('news_posts')
            .select('*')
            .limit(1);

        if (selectError) {
            console.error('Error:', selectError);
        } else {
            console.log('Current columns (from sample row):');
            if (sample.length > 0) {
                Object.keys(sample[0]).forEach(key => {
                    console.log(`  - ${key}: ${typeof sample[0][key]}`);
                });
            } else {
                console.log('Table is empty, trying to infer from error messages...');
            }
        }
    } else {
        console.log('Schema:');
        data.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
        });
    }
}

checkSchema().catch(console.error);
