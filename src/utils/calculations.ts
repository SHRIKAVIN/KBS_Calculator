import { rateChart, HourlyRate } from '../data/rateChart';
import { CalculationResult } from '../types/calculator';

export function calculateRentalCost(
  hourlyRate: HourlyRate,
  hours: number,
  minutes: number
): CalculationResult {
  const hoursCost = hours * hourlyRate;
  const minutesCost = minutes > 0 ? rateChart[hourlyRate][minutes as keyof typeof rateChart[HourlyRate]] || 0 : 0;
  const totalCost = hoursCost + minutesCost;

  return {
    hoursCost,
    minutesCost,
    totalCost
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}