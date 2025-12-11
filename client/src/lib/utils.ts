import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatTime(hours: number): string {
    if (hours < 24) {
        return `${Math.round(hours)} hours`;
    }
    const days = Math.round(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''}`;
}

export function getModeIcon(mode: string): string {
    switch (mode.toLowerCase()) {
        case 'sea':
            return '🚢';
        case 'air':
            return '✈️';
        case 'rail':
            return '🚂';
        case 'truck':
            return '🚛';
        default:
            return '📦';
    }
}

export function getSeverityColor(severity: string): string {
    switch (severity.toLowerCase()) {
        case 'critical':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'high':
            return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'low':
            return 'bg-green-100 text-green-800 border-green-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
}
