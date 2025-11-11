import axios, { AxiosInstance, AxiosError } from 'axios';
import { IFinance, ILoanFormData, ApiResponse, IUser } from '../types/index.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Cria instância do Axios com configurações padrão
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para adicionar o token em todas as requisições
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Evita navegar para rota inexistente no SPA
      // Opcionalmente, poderíamos exibir um toast e redirecionar para a home
      // window.location.hash = '#/';
    }
    return Promise.reject(error);
  }
);

// ============== AUTH SERVICES ==============

export const authService = {
  async register(name: string, email: string, password: string): Promise<ApiResponse<IUser>> {
    try {
      const response = await apiClient.post('/users/register', { name, email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  },

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    try {
      const response = await apiClient.post('/users/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser(): IUser | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

// ============== FINANCE SERVICES ==============

export const financeService = {
  // Criar um novo financiamento
  async createFinance(data: ILoanFormData): Promise<ApiResponse<IFinance>> {
    try {
      const response = await apiClient.post('/tasks', {
        ...data,
        financeDate: new Date(),
        status: 'pending',
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar financiamento');
    }
  },

  // Buscar todos os financiamentos do usuário
  async getFinances(filters?: Record<string, any>): Promise<ApiResponse<IFinance[]>> {
    try {
      const response = await apiClient.get('/tasks', { params: filters });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar financiamentos');
    }
  },

  // Buscar um financiamento específico
  async getFinanceById(id: string): Promise<ApiResponse<IFinance>> {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar financiamento');
    }
  },

  // Atualizar financiamento (completo)
  async updateFinance(id: string, data: Partial<IFinance>): Promise<ApiResponse<IFinance>> {
    try {
      const response = await apiClient.put(`/tasks/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar financiamento');
    }
  },

  // Atualizar financiamento (parcial)
  async patchFinance(id: string, data: Partial<IFinance>): Promise<ApiResponse<IFinance>> {
    try {
      const response = await apiClient.patch(`/tasks/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar financiamento');
    }
  },

  // Deletar financiamento
  async deleteFinance(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar financiamento');
    }
  },

  // Calcular tabela de amortização
  calculateAmortization(principal: number, annualRate: number, months: number) {
    const monthlyRate = annualRate / 12;
    const payment = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

    let balance = principal;
    const schedule = [];
    let totalInterest = 0;

    for (let m = 1; m <= months; m++) {
      const interest = balance * monthlyRate;
      const principalPaid = Math.min(payment - interest, balance);
      balance -= principalPaid;
      totalInterest += interest;

      schedule.push({
        month: m,
        payment: Number(payment.toFixed(2)),
        principalPaid: Number(principalPaid.toFixed(2)),
        interest: Number(interest.toFixed(2)),
        balance: Number(balance.toFixed(2)),
      });
    }

    return {
      schedule,
      totalInterest: Number(totalInterest.toFixed(2)),
      payment: Number(payment.toFixed(2)),
    };
  },
};

// ============== UTILITY FUNCTIONS ==============

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export default apiClient;