// Types para o sistema de financiamento

export type VehicleType = 
  | "SUV" 
  | "Sedan" 
  | "Hatch" 
  | "Convertible" 
  | "Coupe" 
  | "Minivan" 
  | "Pickup Truck" 
  | "Wagon" 
  | "Van" 
  | "Other";

export type FinanceStatus = 
  | "approved" 
  | "rejected" 
  | "pending" 
  | "in_progress" 
  | "completed";

export interface IFinance {
  _id?: string;
  brand: string;
  modelName: string;
  type: VehicleType;
  value: number;
  countOfMonths: number;
  userId: string;
  downPayment?: number;
  interestRate: number;
  installmentValue?: number;
  vehicleSpecs?: any;
  financeDate: Date;
  status: FinanceStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAmortizationItem {
  month: number;
  payment: number;
  principalPaid: number;
  interest: number;
  balance: number;
}

export interface IAmortizationSchedule {
  schedule: IAmortizationItem[];
  totalInterest: number;
  payment: number;
}

export interface ILoanFormData {
  brand: string;
  modelName: string;
  type: VehicleType;
  value: number;
  downPayment: number;
  interestRate: number;
  countOfMonths: number;
  userId: string;
}

export interface ApiResponse<T = any> {
  status: number;
  message?: string;
  data?: T;
  finance?: T;
  finances?: T[];
  user?: T;
}

export interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Permite aplicar um token (modo dev) sem recarregar a página
  applyToken?: (token: string, user: IUser) => void;
}

// Export default vazio para permitir imports default
export default {};