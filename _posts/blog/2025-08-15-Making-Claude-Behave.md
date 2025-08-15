---
layout: page
title: "Making Claude Behave"
date: 2025-08-15
author: jules
category: blog
excerpt: "After hearing great things about the Claude code agent, I made the switch from Cursor, but becoming efficient was a bit of a struggle. So here are some notes to help other beginners get started with Claude code."
---

*15th August, 2025*

After hearing great things about the [Claude code agent](https://www.anthropic.com/claude-code), I made the switch from Cursor, but becoming efficient was a bit of a struggle. So here are some notes to help other beginners get started with Claude code.

_For context ;) I am using Claude as a full stack engineer working on many existing codebases._

### Basics

- Create `CLAUDE.md` memory files, they are essential
- The [GitHub CLI](https://cli.github.com/) tool is essential for efficient Claude usage
- Use planning mode `shift + tab` at the start of a session to create a detailed plan with clear requirements
- Provide specific context: reference specific files with `@`, paste server logs, drop screenshots, and link to Github issues

### Claude Memory Training
Similar to Cursor rules, [Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory#determine-memory-type) is made of markdown files that hold its instructions and knowledge. These memory files are persistent context included in every sessions context. For improved results create a memory file for every directory you work from!

You can have memory files at the global, project, and even subproject level. The files are not created by default, but you can create them with the `/memory` and `/init` commands:

More context improves results, but keep memory files focused. Don't bloat them with hundreds of hard to manage rules. Keep rules in their relevant file:

![Claude memory](/assets/images/claude-memory.png)

#### User memory
 
- `~/.claude/CLAUDE.md`

This is the user memory file where Claude's global personality and behaviour rules can be set. For example, your preferred branch naming convention. Use this to make Claude always behave in certain ways:

```
- Git branches should be prefixed with jules- and use camel case
- Git commit messages should be a brief single line message
- Avoid phrases like "You're absolutely right"
```

[Here's](https://gist.github.com/Julesssss/170f73bb35dff22c110d3b56128b741c) an example Claude file attempting to make Claude more analytical I found in a HackerNews comment that is working well.

#### Project Memory
 
- `~/your-project/CLAUDE.md`

In each project directory this file holds project context. Include information such as project architecture, commands for running tests, links to style guides.

Claude's `/init` command does a pretty good job of creating this project file for you. Or you can provide more specific instructions:

> _Analyse this codebase, summarise the project's purpose, architecture, and key components, and relation to other repos, then create a claude project file_

I had to review these files and remove some unnecessary sections, but Claude makes this easy: _'Remove that migration section and any specific library version'_

#### Subdirectory Memory

- `~/.../your-project/sub-directory/CLAUDE.md`

You can go further and provide additional context for subdirectories. This is useful for documenting features that require more context.

Do this where possible to avoid bloating the project level Claude file. Again you can ask Claude to help you create these files: 

> _For the the following directories within this project, summarise the contents and purpose, then writing a claude file_ 

![Claude init](/assets/images/claude-init.png)

#### Other Memory Stuff

![Claude rule](/assets/images/claude-rule.png)

- The `#` shortcut lets you quickly add a new rule to your current or main memory file
- You can use a `~/your-project/CLAUDE.local.md` file for personal memory that builds on the team's shared memory

### Models

As tempting as it is, you don't need the most expensive Opus model for great results. According to Anthropic it's overkill for most tasks. And expensive! This is just 7 work days of usage:

![Claude costs](/assets/images/claude-costs.png)

Use `/model opus-plan` for a balance between models. It'll use Opus for initial discussion then will switch to Sonnet once you exit planning mode.

Another tip is to set  the Sonnet model as default, then create a sub agent for specific purposes that uses the more expensive Opus model.

Still it is way more expensive that using the same agents in Cursor… It doesn't take long to hit the limit of my personal subscription.

### Agents

[Agents](https://docs.anthropic.com/en/docs/claude-code/sub-agents) are specialised Claude instances for a specific task with a fresh context.  Define an agent once and Claude will automatically delegate relevant tasks to it, assuming your agents are defined clearly.

![Claude agents](/assets/images/claude-subagent.png)

Claude will help you create agents with the `/agent` command, or you can copy one of the many [examples](https://github.com/wshobson/agents) online such as [code reviewer](https://github.com/qdhenry/Claude-Command-Suite/blob/main/.claude/agents/code-auditor.md).

Copying them is as simple pasting the markdown file into `/Users/jules/.claude/agents`.

Code reviewer is an easy starting agent, but I would suggest creating agents as you find yourself repeating prompts, rather than copying specialised agents. I was very excited to get my first custom [raise-pr](https://gist.github.com/Julesssss/3e65b2b461ad8a5d9c41a53f7e82f876) agent working.

A workflow that is working well for me is to spend as much time as possible in plan mode, and to refactor as much repeated prompting as possible to specialised agents:

> **[triage agent ](https://gist.github.com/Julesssss/8aa9d57785a22dd21758e07dc1997b5f)>  implement > [code-review agent](https://gist.github.com/Julesssss/d4b190f2d7d73847e4d9abd7ce4c3a9c), commit changes, [raise pr agent](https://gist.github.com/Julesssss/3e65b2b461ad8a5d9c41a53f7e82f876)**

### Permissions

Claude asks for permissions the first time it does specific actions such as reading a GitHub issue or running a bash command. It repeats this for each new directory, but you can simply ask Claude to copy an existing file to prevent this.

Add the `settings.local.json` file to `.gitignore` to avoid this annoying diff. I guess you could use a similar file to set repository level rules for all contributors but haven't tried this.

![Claude permissions settings](/assets/images/claude-permissions.png)

### Multiple accounts

Finally, it's [easy](https://julesrosser.com/blog/Multiple-Claude-accounts.html) to separate your personal and work accounts using an alias. Maybe this could be used to give Claude different personalities.

```
alias claude-personal="CLAUDE_CONFIG_DIR=~/.claude-personal claude"
```

### Links

Here are some cool links for more advanced Claude usage:

- [Socratic Coder](https://github.com/jamesponddotco/llm-prompts/blob/trunk/data/socratic-coder.md) < thorough project planning through conversation
- [Getting good results from Claude Code](https://news.ycombinator.com/item?id=44836879) < Interesting HN discussion
- [Claude Code Best Practices](https://youtu.be/gv0WHhKelSE?si=AV7iMsFbcvYPSA8L) < Presentation from Anthropic
- [Claude command suite agents](https://github.com/qdhenry/Claude-Command-Suite/tree/main/.claude/agents) < advanced Claude workflows

