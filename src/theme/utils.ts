import { theme } from './theme';

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700;

export const getColor = (color: keyof typeof theme.colors, shade: ColorShade) => {
    return theme.colors[color][shade as keyof (typeof theme.colors)[typeof color]];
};

export const getSpacing = (space: keyof typeof theme.spacing) => {
    return theme.spacing[space];
};

export const getFontSize = (size: keyof typeof theme.typography.fontSizes) => {
    return theme.typography.fontSizes[size];
};

export const getFontWeight = (weight: keyof typeof theme.typography.fontWeights) => {
    return theme.typography.fontWeights[weight];
};

export const getRadius = (size: keyof typeof theme.borders.radius) => {
    return theme.borders.radius[size];
};

export const getShadow = (size: keyof typeof theme.shadows) => {
    return theme.shadows[size];
}; 