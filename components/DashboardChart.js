import React from 'react';
import htm from 'htm';
import Chart from 'chart.js/auto';

const html = htm.bind(React.createElement);
const { useRef, useEffect } = React;

/**
 * A React component to wrap a Chart.js instance, handling creation and destruction.
 * This is an example of integrating a non-React library into a React component.
 */
export const DashboardChart = ({ chartConfig, theme }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Destroy previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        
        const style = getComputedStyle(document.documentElement);
        // Update chart defaults for theme
        Chart.defaults.color = style.getPropertyValue('--text-color').trim();
        Chart.defaults.borderColor = style.getPropertyValue('--border-color').trim();

        chartRef.current = new Chart(canvasRef.current, chartConfig);

    }, [chartConfig, theme]); // Re-create chart if config or theme changes

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return html`
        <div className="chart-container">
            <canvas ref=${canvasRef}></canvas>
        </div>
    `;
};