# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Jekyll-based personal portfolio website. Common development commands:

- **Serve locally**: `bundle exec jekyll serve` - Starts development server at http://localhost:4000
- **Build site**: `bundle exec jekyll build` - Generates static site in `_site/` directory
- **Install dependencies**: `bundle install` - Installs Ruby gems specified in Gemfile

## Architecture Overview

This is a Jekyll static site generator project structured as follows:

### Content Organization
- **Posts**: Located in `_posts/` with two categories:
  - `_posts/blog/` - Technical blog posts about Android development
  - `_posts/project/` - Project showcases and case studies
- **Pages**: Static pages in `_pages/` (projects.html, blog.html, resume.md)
- **Layouts**: HTML templates in `_layouts/` for different content types
- **Includes**: Reusable components in `_includes/` (sidebar, head, scripts, etc.)

### Custom Plugins
- **Category Generation** (`_plugins/generate_categories.rb`): Auto-generates category index pages
- **Tag Generation** (`_plugins/tag_gen.rb`): Creates tag-based content organization
- **Gravatar Integration** (`_plugins/gravatar.rb`): Handles profile image display

### Styling System
- **SCSS Architecture**: Main styles in `assets/css/main.scss` with partials:
  - `assets/partials/_vars.scss` - Color and sizing variables
  - `assets/partials/_mixins.scss` - Reusable CSS mixins
  - `assets/partials/_responsive.scss` - Mobile/tablet responsive styles
  - `assets/partials/_syntax.scss` - Code syntax highlighting
- **Layout**: Fixed sidebar with main content area, responsive design

### Content Structure
- **Blog posts**: Focus on Android development (Dagger, Data Binding, Gradle, Dokka)
- **Project posts**: Mobile app showcases with screenshots and technical details
- **Resume**: PDF download available at `/assets/files/Jules-Rosser-Resume.pdf`

### Configuration
- **Site config**: `_config.yml` contains personal info, social links, and Jekyll settings
- **Ruby dependencies**: Managed via Gemfile with Jekyll 3.8.4 and plugins
- **Deployment**: Configured for GitHub Pages-style deployment

When adding new content, follow the existing post structure with proper frontmatter including layout, categories, and dates. Images should be placed in `assets/images/` and referenced appropriately in posts.