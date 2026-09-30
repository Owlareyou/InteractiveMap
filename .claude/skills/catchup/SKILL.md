---
name: catchup
description: Brief overview of the Taiwan Political Relationship Map project — what it is, what was done last, and what to do next. Use when the user invokes /catchup or asks to get caught up on this project.
---

# Catch up on this project

Give the user a short briefing. Read, don't edit.

## Gather

1. `README.md` — the **Progress** table and **Spec decisions** (open items included).
2. `CLAUDE_CODE_PROMPT.md` — only §2 (goal) and §8 (task order), for context on the next task.
3. `git log --oneline -10`, `git status -sb`, and `git log -1 --format=%cr` (how long since the last commit).
4. List files under `src/`, `data/`, `scripts/` to confirm the Progress table matches reality.

## Report (keep it under ~20 lines)

- **What this is** — one or two sentences.
- **Last time** — the most recent commit(s) and when, plus any uncommitted work.
- **Where it stands** — tasks done vs. remaining (e.g. "1 of 10").
- **Next** — the next task, and any open spec decisions or blockers in front of it.

If the Progress table disagrees with the files or git history, say so and
offer to update the README. Remember that the brief requires a file-by-file
plan and approval before starting a new task.
