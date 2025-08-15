Disciplining  Claude and giving it personality
How to give it multiple personalites [giving it context]
I've been struggling to set up a more efficient claude code workflow, so here are some basic notes to help other beginners.
For context ;) I am using Claude as a full stack engineer working with legacy codebases. I still use Cursor to compare solutions and for simple edits, but find the Claude code tool to make me more efficient when debugging and planning features.
Basics
/add-dir to reference a directory outside of the current 
/compact to keep a summary in context while clearing session history
Use planning mode shift + tab at the start of a session to talk through the goal and define requirements
Of course, provide as much context as possible. Reference specific files with @, paste server logs, drop screenshots, and link to Github issues
It's easy to separate your personal and work accounts:

alias claude-personal="CLAUDE_CONFIG_DIR=~/.claude-personal claude"
The default path for Claude's config files is ~/.claude so all that alias does is open a Claude session using an alternative config directory. 
Claude's Memory
This config directory is basically Claude's memory, where Claude remembers your instructions, cli settings, and sub agents you have defined. These are all simple markdown files. 
These memory files save you a lot of time as they are are included in each sessions context and can be placed in projects themselves. This is a common suggestion for improving responses from Claude.
More context improves results, but try to keep these files brief. It seems advisable to keep instructions in  project files where possible instead of bloating the main Claude file.
CONFIG_DIR / Claude.md

This is the global memory file where your instructions for Claude's personality and behaviour is kept. You can edit this file to give it rules that apply for all sessions. For example, your preferred branch naming convention.
Claude will not update this file unless you specifically tell it to update it's memory file. So saying 'I want you to call me jules' would only be remembered for that session.
You can of course just edit the file manually. 
PROJECT_DIR / Claude.md

In  each of your project directories you can create this file to give context. This saves so much time as both you and Claude don't have to spend time providing context for your projects at the beginning of each session.
In addition to project documentation, you can include commands for running test suites, or important. 
Again Claude won't do this automatically. You should ask Claude to do this for you for each of your projects. The /init command does a pretty good job, or you can provide more specific instructions:
Analyse this codebase, summarise the project's purpose, architecture, and key components, then create the project claude  file
One note is that project memory overrides global memory. For example, your global instruction to 'keep responses short' would be replaced if the project file says to 'explain in detail'.  
PROJECT_DIR / SUB_DIR/ Claude.md

You can go further and provide additional context for project subdirectories. This could be useful for individual features that require more context.
PROJECT_DIR / Plan.md

For larger tasks you can create a seperate file to document the agreed plan and progress. It's good practice to keep this separate from the project file. Just remember to tell Claude to review these custom files when starting new sessions. 
Sub Agents
Agents are simply sub sessions with pre-defined prompts that handle delegated tasks for the main session. With the/agent command you can describe it at a high level and Claude will help you create them. There are many examples online such as security auditor or specialised code reviewers, reusing them is as simple pasting the markdown file into ~/.claude/agents.
Claude will automatically delegate tasks to these agents and it  can be noticed due to a custom colour appearing in the output. You can also ask Claude specifically to use a subagent.
Another  benefit of subagents is to reduce token usage. Opus probably isn't necessary for all of your usage. You can set your main model to Sonnet while using Opus in critical sub agents,  such as a planning agent.
An advanced workflow is to chain sub agents. Claude should do this automatically. But you can make clarifications within your Claude.md file
review my changes, verify the checks pass locally, then submit a PR
@code-reviewer-php > @php-test-suite > @raise-pr
### Sub Agent Suggestions:
- Use @code-reviewer-php when reviewing a PHP project
- Use @code-reviewer-mobile when reviewing an iOS or Android project
Further
More advanced users have defined impressive and complex workflows, but they are all unique to their authors way of working. 
I'd suggesting building up your own Claude memory with minor improvements while using them for inspiration. (how? socriate discussion)
https://harper.blog/2025/05/08/basic-claude-code/
https://github.com/jamesponddotco/llm-prompts/blob/trunk/data/socratic-coder.md
