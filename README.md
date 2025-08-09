# Jules Rosser - Portfolio Website

Personal portfolio and blog site built with Jekyll. Live at [julesrosser.com](https://julesrosser.com)

## Quick Setup

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build
```

Site will be available at `http://localhost:4000`

## Site Structure

### Key Files & Directories
- `_config.yml` - Main site configuration (name, social links, etc.)
- `_includes/sidebar.html` - Profile sidebar with navigation
- `_layouts/` - Page templates (default, page, post, etc.)
- `_pages/` - Static pages (about, projects, blog)
- `_posts/blog/` - Blog posts (technical articles)
- `_posts/project/` - Project showcases
- `assets/css/main.scss` - Main stylesheet
- `assets/images/` - Images and profile photo
- `favicon.ico` - Site icon

### Content Management

#### Adding Blog Posts
Create file: `_posts/blog/YYYY-MM-DD-post-title.md`
```yaml
---
layout: page
author: jules
excerpt: Brief description for preview
category: blog
---

*Date*

### Post Title

Content here...
```

#### Adding Project Posts
Create file: `_posts/project/YYYY-MM-DD-project-name.md`
```yaml
---
layout: page
author: jules
excerpt: Project description
category: project
image: /assets/images/project-screenshot.png
---

Content and screenshots...
```

#### Updating Profile
- Edit `_config.yml` for basic info (name, job title, social links)
- Edit `index.md` for about page content
- Replace `assets/images/profile_image.jpg` for profile photo

## Deployment

### Two-Repository Setup
1. **Source repo**: `portfolio` (this repository) - Contains Jekyll source files
2. **Live site**: `julesssss.github.io` - Contains built HTML files

### Deployment Process
```bash
# 1. Build the site
bundle exec jekyll build

# 2. Copy to GitHub Pages repo (adjust path as needed)
cp -r _site/* ../julesssss.github.io/

# 3. Deploy to live site
cd ../julesssss.github.io
git add .
git commit -m "Update website"
git push origin master
```

Changes go live within 1-5 minutes.

## Common Tasks

### Change Profile Image
```bash
# Replace the profile image
cp /path/to/new-image.jpg assets/images/profile_image.jpg
```

### Create Favicon from Profile
```bash
# Requires ImageMagick (brew install imagemagick)
magick assets/images/profile_image.jpg -resize 32x32 favicon.ico
```

### Add Images to Posts
1. Copy images to `assets/images/`
2. Reference in markdown: `![Alt text](/assets/images/image-name.png)`

## Jekyll Configuration Notes

- Posts must be dated in the past to appear (Jekyll skips future dates)
- Excluded files: `CLAUDE.md`, `.claude/` (see `_config.yml` exclude list)
- Pagination is disabled
- Site uses custom plugins for category generation

## Troubleshooting

### Ruby Version Issues
```bash
# Switch to compatible Ruby version
rbenv local 2.7.4  # or 3.3.4 with updated Gemfile
bundle install
```

### Build Warnings
- Sass deprecation warnings are normal and don't break the site
- Missing pagination template warning can be ignored (pagination disabled)

## Site Architecture

Built on Jekyll with:
- SCSS for styling with partials system
- Custom Ruby plugins for category/tag generation
- Responsive design with mobile support
- SEO optimizations with jekyll-seo-tag plugin

The site follows a clean, minimal design focused on content readability and professional presentation.