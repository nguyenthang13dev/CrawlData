// Define the ThemeContextProps type to match the current implementation
export interface ThemeContextProps {
    currentTheme: 'light' | 'dark';
    setCurrentTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

