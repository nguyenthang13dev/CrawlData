// Mock Data Configuration
export const MOCK_CONFIG = {
  // Enable/disable mock data
  USE_MOCK: process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  
  // API delay simulation (in milliseconds)
  API_DELAY: {
    FAST: 200,
    NORMAL: 500,
    SLOW: 1000
  },
  
  // Mock data settings
  MOCK_DATA: {
    // Number of projects to show per page by default
    DEFAULT_PAGE_SIZE: 20,
    
    // Enable random errors for testing
    ENABLE_RANDOM_ERRORS: false,
    
    // Error rate (0-1, where 0 = no errors, 1 = always error)
    ERROR_RATE: 0.1
  }
};

// Helper function to check if mock is enabled
export const isMockEnabled = (): boolean => {
  return MOCK_CONFIG.USE_MOCK;
};

// Helper function to simulate API delay
export const simulateDelay = (ms: number = MOCK_CONFIG.API_DELAY.NORMAL): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to simulate random errors
export const shouldSimulateError = (): boolean => {
  if (!MOCK_CONFIG.MOCK_DATA.ENABLE_RANDOM_ERRORS) {
    return false;
  }
  return Math.random() < MOCK_CONFIG.MOCK_DATA.ERROR_RATE;
};
