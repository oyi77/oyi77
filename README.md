# Windows OS-Themed Portfolio

An interactive portfolio website built with Next.js 14+ that mimics a Windows desktop environment. Features draggable windows, a terminal emulator, and a modern glassmorphic design with neon accents.

## Features

- **Desktop Environment**: Grid-based background with desktop icons
- **Window System**: Draggable, resizable windows with minimize/maximize/close controls
- **Terminal Emulator**: Interactive terminal with command parser
- **Profile Window**: Professional summary with animated metrics
- **Experience Window**: Timeline view of work experience with collapsible sections
- **Projects Terminal**: Command-line interface to browse projects
- **Stats Dashboard**: Visual statistics with animated charts
- **Taskbar**: Bottom dock with active window indicators and real-time clock
- **Responsive Design**: Adapts to desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom neon theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Charts**: Recharts
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oyi77-1
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This generates a static export in the `out` directory, ready for deployment to GitHub Pages or any static hosting service.

## Deployment

### GitHub Pages

1. Configure the repository settings to use GitHub Pages
2. Set the base path in `.env.local`:
```
NEXT_PUBLIC_BASE_PATH=/repository-name
```

3. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy on push to main.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `out` directory to your hosting service.

## Project Structure

```
/app
  /(desktop)
    page.tsx              # Main desktop view
/components
  /desktop                # Desktop grid and icons
  /windows                # Window components
  /taskbar                # Taskbar components
  /terminal               # Terminal emulator
/lib
  /store                  # Zustand state management
  /data                   # Static data files
  /github                 # GitHub API integration
  /utils                  # Utility functions
/public
  /assets                 # Icons and images
```

## Environment Variables

Create a `.env.local` file (optional):

```
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_BASE_PATH=/repository-name
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT

## Author

Muchammad Fikri Izzuddin (Oyi77)
