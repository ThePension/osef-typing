# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Osef Typing is a typing speed trainer built with Quasar v2, Vue 3, and TypeScript. The application supports multiple languages (French, English, German) and offers two typing modes: word-based and text-based practice.

## Common Commands

```bash
# Install dependencies
npm install

# Start development server with hot-reload
quasar dev

# Build for production
quasar build

# Lint code
npm run lint

# Format code
npm run format
```

## Architecture

### Core Components

- **TypingComponent** (`src/components/common/TypingComponent.vue`): Shared component handling all typing mechanics, WPM calculation, and user input validation. Used by both typing modes.

### Pages

- **WordsTypingPage** (`src/pages/WordsTypingPage.vue`): Displays random words from language-specific database
- **TextTypingPage** (`src/pages/TextTypingPage.vue`): Displays random texts (quotes, passages) from language-specific database
- Both pages use the same TypingComponent with different data sources

### State Management

- **Pinia** for state management
- **Language Store** (`src/stores/language.ts`): Manages current language selection (FR, EN, DE)
- Language changes trigger automatic refresh of words/texts via Pinia action subscriptions

### Data Structure

- **Word Database** (`src/assets/words.ts`): Language-keyed object with common words for each supported language
- **Text Database** (`src/assets/texts.ts`): Language-keyed object with quotes and passages for each supported language
- Both export getter functions (`getWords()`, `getTexts()`) that accept a language parameter

### Typing Mechanics

The TypingComponent implements:
- **WPM Calculation**: Characters typed ÷ 5 (avg word length) ÷ elapsed minutes
- **Real-time Validation**: Compares user input to current word on each keystroke
- **Word States**: NOT_TYPED, TO_TYPE, CORRECT, INCORRECT, CURRENTLY_INCORRECT (for visual feedback)
- **Infinite Scrolling**: Automatically loads new words/texts when user approaches end of visible content
- **Dynamic Line Width**: Calculates characters per line based on window width (`Math.floor(Math.min(800, Math.floor(window.innerWidth)) / 12.5)`)
- **Escape Key**: Press ESC to refresh and restart

### Routing

Routes defined in `src/router/routes.js`:
- `/` and `/words` → WordsTypingPage
- `/text` → TextTypingPage
- All routes use MainLayout with navigation drawer

### Layout

MainLayout (`src/layouts/MainLayout.vue`) provides:
- Top toolbar with app title and GitHub link
- Language selector (visible above 500px width, moves to drawer below)
- Navigation drawer with route links to Words/Text modes

## Technology Stack

- **Framework**: Quasar v2 with Vite
- **UI Library**: Vue 3 with Composition API (`<script setup>`)
- **Language**: TypeScript with strict mode enabled
- **State**: Pinia
- **Routing**: Vue Router v4 (hash mode)
- **Icons**: Bootstrap Icons, Material Icons
- **Linting**: ESLint with Vue 3 essential rules + Prettier

## Development Notes

- TypeScript strict mode is enabled in `quasar.config.ts`
- The project recently migrated from Quasar v1 to v2 and from JavaScript to TypeScript
- Dev server automatically opens browser window
- Hash-based routing is used (not history mode)
