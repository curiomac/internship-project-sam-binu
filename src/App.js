import AppRouter from "./components/routes/index";
import { HelmetProvider } from "react-helmet-async";
import "./styles/css/doc.root.css";
import "./styles/css/app.css";
import "./styles/scss/cmac.styles.alpha.dragon.scss";
import { useEffect } from "react";

function App() {
  // Defining management styles as CSS custom properties
  const cmacManagementStyles = {
    "--cmac-management-font-color-1": "#787486",
    "--cmac-management-font-color-2": "#0D062D",
    "--cmac-management-bg-1": "#FFFFFF",
    "--cmac-management-bg-2": "#F5F5F5",
    "--cmac-management-bg-3": "#5030E514",
    "--cmac-management-bg-4": "#5030E5",
    "--cmac-management-border-color": "#DBDBDB",
  };

  // Function to set document dimensions in CSS variables
  const documentDimensions = () => {
    const docWidth = window.innerWidth; // Getting current document width
    const docHeight = window.innerHeight; // Getting current document height
    document.documentElement.style.setProperty(
      "--cmac-doc-width",
      `${docWidth}px`
    ); // Setting document width as CSS variable
    document.documentElement.style.setProperty(
      "--cmac-doc-height",
      `${docHeight}px`
    ); // Setting document height as CSS variable
  };

  // Function to apply theme styles to the document
  const handleTheme = () => {
    const findThemeId = cmacManagementStyles; // Getting defined theme styles
    for (let [key, value] of Object.entries(findThemeId)) {
      document.documentElement.style.setProperty(key, value); // Applying each style property
    }
  };

  useEffect(() => {
    window.addEventListener("resize", documentDimensions); // Adding resize event listener
    documentDimensions(); // Setting initial document dimensions
    return () => {
      window.removeEventListener("resize", documentDimensions); // Cleaning up event listener on unmount
    };
  }, []);

  useEffect(() => {
    handleTheme(0); // Applying theme styles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;
