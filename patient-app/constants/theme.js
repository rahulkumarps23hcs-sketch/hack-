export const lightTheme = {
  colors: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    textMain: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
  },
};

export const darkTheme = {
  colors: {
    primary: '#818CF8',
    secondary: '#A78BFA',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    background: '#111827',
    surface: '#1F2937',
    textMain: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export const theme = lightTheme;
