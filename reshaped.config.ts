const config = {
  themes: {
    productTheme: {
      color: {
        // Foregrounds
        foregroundNeutral: { hex: "#061021", hexDark: "#f0f0f0" },
        foregroundNeutralFaded: { hex: "#6c757d", hexDark: "#a0a0a0" },
        foregroundDisabled: { hex: "#adb5bd", hexDark: "#666666" },
        foregroundPrimary: { hex: "#9108db", hexDark: "#9108db" },
        foregroundCritical: { hex: "#c92a2a", hexDark: "#ff4d4d" },
        foregroundPositive: { hex: "#2bb673", hexDark: "#2bb673" },

        // Borders
        borderNeutral: { hex: "#ced4da", hexDark: "#3a3a3a" },
        borderNeutralFaded: { hex: "#dee2e6", hexDark: "#2d2d2d" },
        borderDisabled: { hex: "#ced4da", hexDark: "#555555" },
        borderPrimary: { hex: "#9108db", hexDark: "#9108db" },
        borderPrimaryFaded: { hex: "#b476e5", hexDark: "#c09ae9" },
        borderCritical: { hex: "#e03131", hexDark: "#ff6666" },
        borderCriticalFaded: { hex: "#f03e3e88", hexDark: "#ff66668a" },
        borderPositive: { hex: "#2bb673", hexDark: "#2bb673" },
        borderPositiveFaded: { hex: "#a8f0c9", hexDark: "#206f4a" },

        // Backgrounds
        backgroundNeutral: { hex: "#f8f9fa", hexDark: "#1a1a1a" },
        backgroundNeutralFaded: { hex: "#f0f2f5", hexDark: "#202020" },
        backgroundDisabled: { hex: "#f1f3f5", hexDark: "#363636" },
        backgroundDisabledFaded: { hex: "#e9ecef", hexDark: "#424242" },
        backgroundPrimary: { hex: "#9108db", hexDark: "#9108db" },
        backgroundPrimaryFaded: { hex: "#f3e6fb", hexDark: "#b476e5" },
        backgroundCritical: { hex: "#c92828", hexDark: "#801212" },
        backgroundCriticalFaded: { hex: "#ca5e5ea8", hexDark: "#4a14148a" },
        backgroundPositive: { hex: "#d9fbe9", hexDark: "#1e4634" },
        backgroundPositiveFaded: { hex: "#e6f4ea", hexDark: "#243c2f" },

        // Page backgrounds
        backgroundPage: { hex: "#ffffff", hexDark: "#0d0d0d" },
        backgroundPageFaded: { hex: "#f8f9fa", hexDark: "#141414" },

        // Elevation
        backgroundElevationBase: { hex: "#ffffff", hexDark: "#121212" },
        backgroundElevationRaised: { hex: "#f1f3f5", hexDark: "#242424" },
        backgroundElevationOverlay: { hex: "#fafafa", hexDark: "#1e1e1e" },

        // Subtle neutral background
        backgroundNeutralSubtle: { hex: "#e9f1ff", hexDark: "#181818" },

        // Fixed
        black: { hex: "#000000", hexDark: "#000000" },
        white: { hex: "#ffffff", hexDark: "#ffffff" },
      },

      fontFamily: {
        body: {
          family: "Questrial, sans-serif",
        },
      },
    },
  },
};

module.exports = config;
