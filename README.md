# Project Name

An Internship project application built with React Js, utilizing **Redux**, **Material-UI (MUI)**, **TailwindCSS**, and custom theming. This project is designed with state management for seamless interaction and scalable development.

## Features

- **Global State Management** with Redux
- **Dynamic Theming** with CSS Variables
- **Responsive UI** using Material-UI (MUI) and TailwindCSS
- **Custom Styling** for a unique look and feel
- **Drag and Drop functionality** for improved user interaction
- **Filtering and Sorting** to manage data effectively

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For global state management.
- **Material-UI (MUI)**: For responsive components and UI design.
- **TailwindCSS**: For utility-first styling and easy customization.
- **CSS Variables**: For dynamic theming and flexible design updates.
- **JavaScript (ES6)**: Core programming language used.
- **React DnD**: For drag-and-drop functionality.
- **LocalStorage**: For caching and managing data locally.

## Color Scheme

The project adopts a professional color scheme:

```css
--cmac-management-font-color-1: #787486;
--cmac-management-font-color-2: #0d062d;
--cmac-management-bg-1: #ffffff;
--cmac-management-bg-2: #f5f5f5;
--cmac-management-bg-3: #5030e514;
--cmac-management-bg-4: #5030e5;
--cmac-management-border-color: #dbdbdb;
```

## Key Components

### 1. **State Management**

This application uses **Redux** to manage global states, ensuring smooth data flow across different components.

### 2. **Material-UI Integration**

**Material-UI** is used to give the project a polished and professional look. It helps in designing components like buttons, modals, and navigation elements that are **fully responsive** and **customizable**.

### 3. **TailwindCSS Styling**

**TailwindCSS** allows for utility-first styling, enabling rapid design iteration. It complements MUI by offering additional flexibility and customization, ensuring that the design remains lightweight while being adaptable.

For example, the dynamic theme is applied using custom CSS variables for responsive design:

```javascript
const handleTheme = () => {
  const theme = cmacManagementStyles;
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};
```

### 4. **Drag-and-Drop**

The project incorporates drag-and-drop functionality using the `onDragEnd` method from `React DnD` to reorder tasks, move items between columns, and maintain productivity flow.

## Installation and Setup

To set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/project-name.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

Once the project is running, you'll have access to a dynamic to-do management system with features such as:

- Adding and updating tasks.
- Dragging tasks between different states (To-Do, In Progress, Done).
- Filtering tasks by priority and due date.
- Visualizing tasks with dynamic theming.

## Project Structure

The project structure is organized as follows:

```
/src
  /components
    /pages
      /management
        /layouts
          /mobile-app
            MobileApp.jsx
          /utils
              CardModule.jsx
              filterModule.jsx
              DateModule.jsx
              TodoForm.jsx
  /redux
    /actions
    /slices
    store.js
  App.js
  index.js
```

- **components/**: Contains reusable UI components.
- **redux/**: Manages all state-related actions and reducers.
- **styles/**: Custom CSS and TailwindCSS configurations.
- **App.js**: Main application component.
