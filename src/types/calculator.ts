export interface CalculationHistory {
  id: string;
  hourlyRate: number;
  hours: number;
  minutes: number;
  totalCost: number;
  timestamp: Date;
}

export interface CalculationResult {
  hoursCost: number;
  minutesCost: number;
  totalCost: number;
}