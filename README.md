# KBS Harvester Rental Calculator

A modern, mobile-friendly web application for calculating rental costs for KBS Harvester equipment based on usage time.

## Features

- **Hourly Rate Selection**: Choose from predefined hourly rates (₹2,300 - ₹2,700)
- **Time Input**: Input hours and minutes separately with a clean interface
- **Real-time Calculation**: Calculate costs instantly with minute-wise precision
- **History Tracking**: View calculation history with the ability to clear
- **Responsive Design**: Mobile-optimized UI that works on all devices
- **Modern UI**: Clean, professional design with green branding

## UI Components

### Header
- Green background with sparkle icon
- "KBS Harvester" title
- "Rental Calculator" subtitle

### Rate Selection
- Dollar sign icon
- Dropdown with hourly rates
- "PER HOUR" label below the rate

### Time Input
- Clock icon
- Separate input fields for hours and minutes
- Colon separator between fields
- Uppercase "HOURS" and "MINUTES" labels

### Action Buttons
- **CALCULATE COST**: Green button with calculator icon
- **RESET**: White button with border

### Result Display
- Shows calculated total cost prominently
- Displays rate and duration used
- Appears after calculation

### Bottom Navigation
- **Calculator**: Active tab for main functionality
- **History**: Tab to view calculation history

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks with localStorage persistence

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Usage

1. Select an hourly rate from the dropdown
2. Enter the number of hours (0-999)
3. Enter the number of minutes (0-60)
4. Click "CALCULATE COST" to see the result
5. Use "RESET" to clear inputs
6. Switch to "History" tab to view past calculations

## Design Features

- **Color Scheme**: Green (#16a34a) primary, white cards, gray-50 background
- **Typography**: Bold headings, medium body text
- **Spacing**: Consistent 4-unit spacing system
- **Shadows**: Subtle shadows for depth
- **Rounded Corners**: xl (12px) border radius for modern look
- **Mobile First**: Optimized for mobile devices with touch-friendly inputs

## File Structure

```
src/
├── components/
│   ├── RateSelector.tsx      # Hourly rate selection
│   ├── TimeInputs.tsx        # Hours and minutes input
│   ├── CalculationResult.tsx # Calculate button
│   └── CalculationHistory.tsx # History display
├── data/
│   └── rateChart.ts          # Rate calculations
├── hooks/
│   └── useLocalStorage.ts    # Local storage hook
├── types/
│   └── calculator.ts         # TypeScript types
├── utils/
│   └── calculations.ts       # Calculation logic
└── App.tsx                   # Main application component
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

Private project for KBS Harvester.
# KBS_Calculator
