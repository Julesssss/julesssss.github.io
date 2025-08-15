---
layout: page
author: jules
excerpt: How to use Claude with both personal and work accounts.
category: blog
---

*6th August, 2025*

### Multiple Claude accounts

If you have a personal and work Claude subscription you need a way of switching between them. Logging out and back in is obviously terrible.

It seems the best way to do this is by setting multiple Claude config directories using the undocumented `CLAUDE_CONFIG_DIR` env.

Just add something like this to `~/.zshrc` or `~/.bashrc`:

```bash
alias claude-personal="CLAUDE_CONFIG_DIR=~/.claude-personal claude"
```

Then you can separate work and personal sessions, or run both simultaneously. Conversations and config will be kept separate. Easy.

![Multiple Claude sessions](/assets/images/claude-multiple-1.png)

![Claude personal session](/assets/images/claude-multiple-2.png)