# Quick Start Guide

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Features Implemented

✅ **Transaction Management**
- Add, edit, and delete transactions
- Filter by date range, category, and type
- LocalStorage persistence

✅ **Dashboard**
- Financial overview with KPIs
- Monthly chart using Recharts
- Recent transactions list

✅ **Theme System**
- System theme (follows OS)
- Light mode
- Dark mode
- Auto-time mode (light 08:00-20:00, dark otherwise)
- Theme persistence in localStorage

✅ **Internationalization**
- English (en) - default
- Ukrainian (ua)
- Language switcher in header and settings

✅ **PWA Support**
- Installable as Progressive Web App
- Offline support with service worker
- Cached assets for faster loading

✅ **Accessibility**
- ARIA labels and roles
- Keyboard navigation
- Semantic HTML
- Focus management

## 📁 Project Structure

```
src/
  app/              # App configuration & routing
  components/ui/    # Reusable UI components
  features/        # Feature modules
  pages/           # Main pages
  store/           # Zustand stores
  i18n/            # Translations
  utils/           # Utility functions
  styles/          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📝 Notes

- **PWA Icons**: Add `icon-192x192.png` and `icon-512x512.png` to `public/icons/` for full PWA support
- **Node Version**: Requires Node.js 20.19+ or 22.12+ (currently using 18.20.8 - upgrade recommended)
- **Data Storage**: All data is stored in browser localStorage (no backend required)

## 🎯 Next Steps

1. Add PWA icons to `public/icons/`
2. Customize categories in transaction form
3. Add more chart types if needed
4. Deploy to your preferred hosting platform

Enjoy your finance tracker! 💰

