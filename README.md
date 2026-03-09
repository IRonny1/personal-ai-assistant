# Dev Ticket Agent 🤖

An AI-powered CLI agent that transforms vague feature ideas and business requirements into structured, well-defined Jira tickets — saving developers and tech leads hours of ticket writing every week.

## Overview

Dev Ticket Agent uses the **ReAct (Reasoning + Acting)** pattern to intelligently process raw input, gather missing context, search for best practices, and produce high-quality tickets complete with acceptance criteria, subtasks, and estimates — then creates them directly in Jira.

```
You: need to add product filtering by category

Agent: A few clarifications:
  1. Is this a new feature or an improvement to an existing one?
  2. Should filtering happen on the frontend or via API?

You: new feature, via API

Agent: [fetching your team's DoD from knowledge base...]
       [searching best practices for React filters...]
       [evaluating ticket quality...]
       [creating in Jira...]

✅ Ticket created: PROJ-234
   "Implement product category filtering via API"
   AC: 4 criteria | Subtasks: 3 | Estimate: M
```

## Features

### Task 01 — ReAct Core
The agent runs a continuous Reasoning + Acting loop: it analyzes the raw requirement, decides which tools to invoke, gathers context, and assembles a structured ticket before taking any action.

### Task 02 — Session Memory
Retains context throughout the CLI session — remembers the current project, previously created tickets, and your formatting preferences so you don't repeat yourself.

### Task 03 — Internet Search (Tavily)
Searches the web for relevant best practices and technical approaches. For example, if a task involves infinite scroll, the agent finds current React patterns before writing the ticket.

### Task 04 — RAG Knowledge Base
Maintains a local vector knowledge base containing your team's ticket templates, Definition of Done, and coding guidelines. The agent retrieves relevant context before generating each ticket.

### Task 05 — Input Guardrails
Validates every request before processing:
- Is this actually a task (not a question or noise)?
- Is there enough information to write a meaningful ticket?
- Does a similar ticket already exist in Jira?

### Task 06 — Human-in-the-Loop (HITL)
When requirements are ambiguous, the agent pauses and asks targeted clarifying questions — *"Is this a bug or a feature? Which page does it affect?"* — before continuing.

### Task 07 — MCP Server (Jira Integration)
A custom MCP (Model Context Protocol) server exposes Jira as a set of tools the agent can call:
- `createIssue` — create a new ticket
- `getEpic` — fetch epic context and related issues
- `addSubtasks` — attach subtasks to a parent issue
- `searchIssues` — find existing tickets to avoid duplication

### Task 08 — Evaluator & Optimizer
Before the ticket is created, a separate LLM evaluation pass checks quality: Are acceptance criteria clear? Would a developer understand the task without asking questions? Is there an estimate? If quality is insufficient, the agent rewrites the ticket automatically.

### Task 09 — Structured Output
Every ticket is returned as a typed JSON object, suitable for UI integration or further automation:

```typescript
type Ticket = {
  title: string
  description: string
  acceptanceCriteria: string[]
  subtasks: string[]
  estimate: 'XS' | 'S' | 'M' | 'L' | 'XL'
  labels: string[]
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
}
```

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript / Node.js |
| AI Framework | LangChain.js |
| LLM | Anthropic Claude |
| Vector Store | ChromaDB (local) |
| Search | Tavily API |
| Issue Tracker | Jira REST API v3 |
| Protocol | MCP (Model Context Protocol) |
| Interface | CLI (`readline`) |

## Project Structure

```
dev-ticket-agent/
├── src/
│   ├── agent/
│   │   ├── react-loop.ts        # Task 01: ReAct core loop
│   │   ├── memory.ts            # Task 02: Session memory
│   │   └── evaluator.ts         # Task 08: Quality evaluator
│   ├── tools/
│   │   ├── tavily-search.ts     # Task 03: Internet search
│   │   ├── rag.ts               # Task 04: RAG knowledge base
│   │   └── hitl.ts              # Task 06: Human-in-the-loop
│   ├── guardrails/
│   │   └── input-validator.ts   # Task 05: Input validation
│   ├── mcp/
│   │   └── jira-server.ts       # Task 07: MCP Jira server
│   ├── output/
│   │   └── ticket-schema.ts     # Task 09: Structured output
│   └── cli.ts                   # Entry point
├── knowledge-base/              # Task 04: RAG source docs
│   ├── ticket-templates.md
│   ├── definition-of-done.md
│   └── coding-guidelines.md
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- Jira account with API token
- Anthropic API key
- Tavily API key

### Installation

```bash
git clone https://github.com/your-username/dev-ticket-agent
cd dev-ticket-agent
npm install
cp .env.example .env
# Fill in your API keys in .env
```

### Environment Variables

```env
ANTHROPIC_API_KEY=your_anthropic_key
TAVILY_API_KEY=your_tavily_key
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your@email.com
JIRA_API_TOKEN=your_jira_token
JIRA_PROJECT_KEY=PROJ
```

### Run

```bash
# Index your knowledge base (first time)
npm run rag:index

# Start the agent
npm run start
```

## License

MIT