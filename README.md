# ThyaGa Recipe Finder

A React-based recipe search and discovery application that allows users to find and save recipes from around the world. The application features a clean, intuitive interface with responsive design for both mobile and desktop users.

## Setup Instructions

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later) or yarn (v1.22.0 or later)

### Installation Steps
1. Clone the repository
```bash
git clone https://github.com/HirunaIlukpitiya/thyaga-recipe-finder.git
cd thyaga-recipe-finder
```
2. Install dependencies
```bash
npm install
```
3. Start the development server
```bash
npm run dev
```
4. Open your browser and navigate to http://localhost:3000 (or the port shown in your terminal)

## Design Choices

### UI Framework
- Tailwind CSS: Used for rapid UI development with utility classes
- Mobile-first approach: All components are designed to be responsive from mobile to desktop

### Architecture
- Component-based structure: Modular components for better code organization and reusability
- Context API: Used for global state management (search results, favorites, loading state)
- Custom hooks: Created for specific functionalities like search and favorites management

### UI Elements
- Card-based layout: For displaying recipe items in a grid
- Facebook-style cover images: For recipe details with curved overlapping content
- Floating action buttons: For navigation and favorites
- Client-side pagination: For managing large sets of search results

## Features Implemented

### 1. Recipe Search
- Search by recipe name
- Search by ingredient
- Search by category

### 2. Browse & Discovery
- Trending recipes section
- Browse by food category
- Responsive category grid

### 3. Recipe Details
- Full recipe information display
- Ingredients list
- Step-by-step instructions
- Recipe source and video links (when available)

### 4. User Features
- Add/remove favorites
- Favorites persistence via localStorage

### 5. UI/UX
- Responsive design for all screen sizes
- Loading indicators during API calls
- Pagination for search results
- Empty state handling
- Back navigation

## Challenges Faced

### 1. API Integration Challenges
- Handling inconsistent data from the recipe API
- Managing different response formats
- Error handling for missing recipe data

### 2. State Management
- Coordinating search state across components
- Implementing favorites system with localStorage persistence
- Managing pagination state client-side

### 4. Responsive Design
- Creating a consistent experience across all device sizes
- Optimizing layout for both desktop and mobile
- Ensuring UI elements are appropriately sized for touch interfaces