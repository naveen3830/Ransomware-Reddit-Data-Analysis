# Reddit Ransomware Analysis Dashboard

This project is a React-based dashboard that visualizes and analyzes Reddit data related to ransomware. It provides insights into various categories, traffic, and SERP (Search Engine Results Page) performance. The dashboard uses data from a CSV file (`public/Reddit_Archived.csv`) to generate statistics and charts.

## Features

*   **Overall Statistics:** Displays key metrics like total Reddit threads, traffic, and keywords.
*   **Category Breakdown:** Provides a detailed analysis of subcategories related to ransomware, including traffic, keywords, and SERP performance.
*   **Interactive Charts:** Visualizes traffic and SERP data using Recharts.
*   **Sortable Table:** Allows users to sort data by different metrics for detailed analysis.

## Technologies Used

*   React
*   Recharts
*   Tailwind CSS
*   Typescript
*   Vite

## Getting Started

### Prerequisites

*   Node.js (>=18)
*   npm (or yarn)

### Installation

1.  Clone the repository:

    ```bash
    git clone 
    cd naveen3830-ransomware-reddit-data-analysis
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Running the App

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the address provided by Vite (usually `http://localhost:5173/`).

## Data Source

The data for this dashboard is sourced from `public/Reddit_Archived.csv`. This CSV file contains Reddit data related to ransomware, including URLs, traffic, keywords, categories, and other relevant information.

## Project Structure

```text
naveen3830-ransomware-reddit-data-analysis/
├── README.md
├── App.tsx                # Main application component
├── constants.ts           # Contains static data and constants
├── index.html             # HTML entry point
├── index.tsx              # React entry point
├── metadata.json          # Metadata for the project
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── types.ts               # TypeScript types
├── vite.config.ts         # Vite configuration
├── components/            # React components
│   ├── CategoryTable.tsx  # Table component for displaying category data
│   ├── Icons.tsx          # SVG icons
│   ├── SerpChart.tsx      # Chart component for SERP data
│   ├── StatCard.tsx       # Reusable component for displaying statistics
│   └── TrafficChart.tsx   # Chart component for traffic data
└── public/                # Public assets
    └── Reddit_Archived.csv  # CSV data file
```
## Contributing
Feel free to open issues or submit pull requests. Please ensure your code follows the existing style and includes tests where relevant.
