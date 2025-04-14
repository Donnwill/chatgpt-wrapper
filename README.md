# ChatGPT Dashboard Widget Challenge

## Overview

This repository contains a starter project for the "ChatGPT Dashboard Widget" coding challenge. Your task is to implement a ChatGPT-powered chat widget inside the provided dashboard application.

## Challenge Requirements

### Basic Requirements (Must Have)

1. **Chat Widget UI**:
   - Implement a floating widget in the bottom right corner of the dashboard
   - When clicked, it should open a dialog/popover with a chat interface
   - Basic chat design (input field, message history, send button)

2. **ChatGPT Integration**:
   - Connect to OpenAI's API to use GPT-4o
   - Users should be able to chat back and forth with the AI
   - Implement proper error handling for API calls

3. **System Prompt**:
   - Add capability to insert a system prompt that is not visible to the user
   - This system prompt should provide the AI with company-specific context

4. **Database Integration**:
   - Use the pre-configured Prisma setup to connect to a Postgres database (Supabase recommended)
   - Save all chat messages in the database
   - Implement proper data modeling for conversations and messages

### Optional Advanced Features

These features are not required but will demonstrate higher proficiency:

1. **Multiple Chat Sessions**:
   - Allow users to create and switch between multiple chat conversations
   - Implement proper UI for managing these conversations
   - Save conversation metadata and messages in the database

2. **Message Streaming**:
   - Implement streaming responses from ChatGPT for better UX
   - Show typing indicators during response generation

3. **Web Search Tool**:
   - Add a web search capability to the chat
   - Allow the AI to use web search results in its responses

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A PostgreSQL database (Supabase recommended)
- OpenAI API key

### Setup Instructions

1. Clone this repository
2. Copy `.env.example` to `.env.local` and fill in your database credentials and OpenAI API key
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Run the database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Project Structure

- `/app` - Next.js app router structure
- `/components` - React components
- `/lib` - Utility functions and database client
- `/prisma` - Prisma schema and migrations

## Submission Guidelines

1. Fork this repository
2. Implement the required features
3. Ensure your code is well-documented and follows best practices
4. Submit your solution as a link to your repository


## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Supabase Documentation](https://supabase.com/docs)

Good luck! 