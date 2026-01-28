# Database Schema Reference

This document lists all columns required for the `news_posts` table based on application code analysis.

## Required Columns

| Column Name | Type | Constraints | Used By | Purpose |
|------------|------|-------------|---------|---------|
| `id` | BIGINT | PRIMARY KEY, AUTO-INCREMENT | All components | Unique identifier |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | BlogContext, cards | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | BlogContext, sorting | Last modification time |
| `title` | TEXT | NOT NULL | EditPost, BlogContext, cards | Post headline |
| `slug` | TEXT | UNIQUE | BlogPost, TransmissionCard, routing | URL-friendly identifier |
| `category` | TEXT | - | BlogContext, cards | Post category/section |
| `content` | TEXT | - | EditPost, BlogPost | Markdown post body |
| `image_url` | TEXT | - | EditPost, BlogContext, cards | Featured image URL |
| `coordinates` | TEXT | - | EditPost | Geographic coordinates metadata |
| `author` | TEXT | - | BlogContext | Post author name |
| `is_published` | BOOLEAN | DEFAULT TRUE | (Future use) | Publication status |

## Code References

### EditPost.jsx
Lines 13-16, 39-42, 89-93:
- Uses: `title`, `content`, `coordinates`, `image_url`
- Performs upsert operations on these fields

### BlogContext.jsx
Line 81:
```javascript
.select('id, title, content, author, created_at, category, image_url, slug')
```

### BlogPost.jsx
Lines 12, 25, 33:
- Uses `slug` for routing and post lookup

### TransmissionCard.jsx
Line 26:
- Uses `slug` or generates from `title`

## Setup Status

✅ **All columns are included** in [`supabase_schema.sql`](file:///e:/Git%20Uploads/Blog-Begining/supabase_schema.sql)

You can now run the SQL script in your Supabase Dashboard to create/update all required columns.
