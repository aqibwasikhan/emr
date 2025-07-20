import React from 'react';
import { colSpan, gridCols } from './preload-classes';

export interface ColumnSizes {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
}

export const gridBreakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement>, ColumnSizes { }

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: ColumnSizes;
}

export const getResponsiveClasses = (sizes: ColumnSizes, variants: Record<string, string>) => {
    let classes = variants[String(sizes['xs'] || 12)];

    for (const size of gridBreakpoints) {
        const value = sizes[size as keyof ColumnSizes];
        if (value !== undefined && value > -1) {
            classes += ` ${variants[String(`${value}-${size}`)]}`;
        }
    }

    return classes.trim();
};

export const Grid: React.FC<GridProps> = ({
    columns = { xs: 12 },
    children,
    className = '',
    ...divProps
}) => {
    const responsiveClasses = getResponsiveClasses(columns, gridCols);

    return (
        <div className={`grid ${responsiveClasses} ${className}`} {...divProps}>
            {children}
        </div>
    );
};

export const GridItem: React.FC<GridItemProps> = ({
    xs = 12,
    sm,
    md,
    lg,
    xl,
    children,
    className = '',
    ...divProps
}) => {
    const responsiveClasses = getResponsiveClasses({ xs, sm, md, lg, xl }, colSpan);

    return (
        <div className={`${responsiveClasses} ${className}`} {...divProps}>
            {children}
        </div>
    );
};

