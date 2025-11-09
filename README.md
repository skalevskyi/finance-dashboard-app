# Finance Tracker

A modern, full-featured personal finance tracking application built with React, TypeScript, and TailwindCSS.

## Screenshots

### Desktop

![Dashboard 1](screenshots/Dashboard%201.png)

![Dashboard 2](screenshots/Dashboard%202.png)

![Dashboard 3](screenshots/Dashboard%203.png)

### Mobile

![Mobile Dashboard 1](screenshots/Mobile%20Dashboard%201.png)

![Mobile Dashboard 2](screenshots/Mobile%20Dashboard%202.png)

![Mobile Dashboard 3](screenshots/Mobile%20Dashboard%203.png)

## Features

- 💰 **Transaction Management**: Add, edit, and delete income and expense transactions
- 📊 **Dashboard**: View financial overview with charts and statistics
- 🎨 **Theme Modes**: 
  - System theme (follows OS preference)
  - Light mode
  - Dark mode
  - Auto-time mode (light from 08:00-20:00, dark otherwise)
- 🌍 **Internationalization**: English and Ukrainian language support
- 📱 **PWA Support**: Installable as a Progressive Web App with offline capabilities
- 🔍 **Filtering**: Filter transactions by date range, category, and type
- 💾 **Local Storage**: All data persisted locally in browser storage
- ♿ **Accessible**: Built with accessibility in mind (ARIA labels, keyboard navigation)

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management with persistence
- **React Router v6** - Client-side routing
- **i18next** - Internationalization framework
- **Recharts** - Chart library
- **Vite Plugin PWA** - PWA support with service worker
- **ESLint + Prettier** - Code quality and formatting

## Project Structure

```
src/
  app/                    # App configuration
    App.tsx              # Main app component
    router.tsx           # Route definitions
    providers/           # Context providers
  components/ui/         # Reusable UI components
    Button.tsx
    Input.tsx
    Select.tsx
    Modal.tsx
    Table.tsx
    Header.tsx
    ThemeToggle.tsx
    LanguageSwitcher.tsx
  features/transactions/ # Transaction feature module
    types/               # TypeScript types
    hooks/               # Custom hooks
    components/          # Feature components
    pages/               # Feature pages
    utils/               # Feature utilities
  pages/                 # Main pages
    Dashboard.tsx
    Settings.tsx
    NotFound.tsx
  store/                 # Zustand stores
    useTransactionsStore.ts
    useThemeStore.ts
  i18n/                  # Internationalization
    index.ts
    en/                  # English translations
    ua/                  # Ukrainian translations
  styles/                # Global styles
    globals.css
    tailwind.css
  utils/                 # Utility functions
    date.ts
    number.ts
    storage.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Configuration

### Theme Modes

The application supports four theme modes:

1. **System**: Follows your operating system's theme preference
2. **Light**: Always light theme
3. **Dark**: Always dark theme
4. **Auto-time**: Automatically switches between light (08:00-20:00) and dark (20:00-08:00)

Theme preference is saved in localStorage and persists across sessions.

### Internationalization

The app supports two languages:
- English (en) - Default
- Ukrainian (ua)

Language preference is detected from browser settings and can be changed in Settings.

### PWA

The app is configured as a Progressive Web App:
- Installable on mobile and desktop
- Offline support with service worker
- Cached assets for faster loading

**Note**: PWA icons need to be added to `public/icons/`:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)

You can generate these icons using online tools or design software. The manifest references these icons for the PWA installation.

To install:
- **Desktop**: Click the install button in the browser address bar
- **Mobile**: Use "Add to Home Screen" option

## Data Storage

All data is stored locally in the browser's localStorage:
- Transactions are persisted automatically
- Theme preference is saved
- No backend required - fully client-side

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The app is optimized for performance:
- Code splitting with React Router
- Lazy loading where appropriate
- Optimized bundle size
- Lighthouse scores target ≥90 for Performance, Accessibility, and Best Practices

## Accessibility

The application follows WCAG guidelines:
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance

## Development

### Code Style

- ESLint with Airbnb-style rules
- Prettier for code formatting
- TypeScript strict mode
- Absolute imports via `@/` alias

### Adding New Features

1. Create feature folder in `src/features/`
2. Add types in `types/` subfolder
3. Create components in `components/` subfolder
4. Add pages in `pages/` subfolder
5. Update router in `src/app/router.tsx`
6. Add translations in `src/i18n/`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
