import * as React from 'react';
import { useState } from 'react';
import { financeService, formatCurrency } from '@services/api';
import { useAuth } from '@store/index';
import { VehicleType } from '../types';
import Spinner from './Spinner';

const LoanForm: React.FC = () => {
  const { user, applyToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [devToken, setDevToken] = useState('');
  const [showDevPanel, setShowDevPanel] = useState(false);

  const [formData, setFormData] = useState({
    brand: '',
    modelName: '',
    type: 'Sedan' as VehicleType,
    value: 0,
    downPayment: 0,
    interestRate: 0.08,
    countOfMonths: 12,
  });

  const [showSimulation, setShowSimulation] = useState(false);
  const [simulation, setSimulation] = useState<any>(null);

  // Calcula taxa de juros baseada no número de parcelas
  const calculateInterestRate = (months: number): number => {
    // Taxa base de 6% a.a. para 12 meses
    // Aumenta progressivamente conforme aumenta o prazo
    if (months <= 12) return 0.06;
    if (months <= 24) return 0.08;
    if (months <= 36) return 0.10;
    if (months <= 48) return 0.12;
    return 0.14; // 60 meses
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Se mudou o número de parcelas, atualiza a taxa de juros automaticamente
    if (name === 'countOfMonths') {
      const months = Number(value);
      const newRate = calculateInterestRate(months);
      setFormData((prev) => ({
        ...prev,
        countOfMonths: months,
        interestRate: newRate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'type' ? value : name === 'value' || name === 'downPayment' ? Number(value) : value,
      }));
    }
  };
  const handleTokenLogin = () => {
    if (!devToken.trim()) {
      setError('Por favor, insira um token válido.');
      return;
    }

    try {
      // Decodifica o token JWT para extrair informações do usuário
      const parts = devToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Token inválido');
      }
      
      const payload = JSON.parse(atob(parts[1]));
      const mockUser = {
        _id: payload.sub || 'mock-user-id',
        name: payload.name || 'Usuário Mock',
        email: payload.email || 'mock@example.com',
        role: payload.role || 'customer',
      };

      // Aplica o token via contexto, sem recarregar a página
      applyToken?.(devToken.trim(), mockUser);
      setError('');
    } catch (err) {
      setError('Erro ao processar token. Verifique se o formato está correto.');
    }
  };

  const handleSimulate = () => {
    if (!formData.value || !formData.countOfMonths) {
      setError('Por favor, preencha o valor do veículo e o número de meses.');
      return;
    }

    const principal = formData.value - formData.downPayment;
    const result = financeService.calculateAmortization(principal, formData.interestRate, formData.countOfMonths);
    
    setSimulation(result);
    setShowSimulation(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!user) {
      setError('Você precisa estar logado para solicitar um financiamento.');
      setLoading(false);
      return;
    }

    if (!formData.brand || !formData.modelName || !formData.value || !formData.countOfMonths) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      await financeService.createFinance({
        ...formData,
        userId: user._id || '',
      });
      setSuccess(true);
      setFormData({
        brand: '',
        modelName: '',
        type: 'Sedan',
        value: 0,
        downPayment: 0,
        interestRate: 0.08,
        countOfMonths: 12,
      });
      setShowSimulation(false);
      setSimulation(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao solicitar financiamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Solicite seu Financiamento
        </h2>
        <p className="text-gray-800">
          Preencha os dados do veículo e simule as parcelas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
          {/* Painel de Desenvolvimento - Token */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔧</span>
                <h3 className="text-sm font-bold text-yellow-900">Modo Desenvolvimento</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDevPanel(!showDevPanel)}
                className="text-yellow-700 hover:text-yellow-900 font-medium text-sm"
              >
                {showDevPanel ? '▼ Ocultar' : '▶ Expandir'}
              </button>
            </div>
          
            {showDevPanel && (
              <div className="space-y-3">
                <p className="text-xs text-yellow-800">
                  Cole o token JWT enviado pelo backend da loja para simular login
                </p>
                <textarea
                  value={devToken}
                  onChange={(e) => setDevToken(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-yellow-300 rounded-lg text-gray-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleTokenLogin}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Aplicar Token
                  </button>
                  {user && (
                    <div className="flex-1 bg-green-100 border border-green-300 rounded-lg px-3 py-2">
                      <p className="text-xs text-green-800">
                        ✓ Logado como: <strong>{user.name}</strong> ({user.email})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        {/* Marca e Modelo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-900 mb-2">
              Marca do Veículo
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Ex: Toyota, Honda..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="modelName" className="block text-sm font-medium text-gray-900 mb-2">
              Modelo
            </label>
            <input
              type="text"
              id="modelName"
              name="modelName"
              value={formData.modelName}
              onChange={handleInputChange}
              placeholder="Ex: Corolla, Civic..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Tipo */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-900 mb-2">
            Tipo de Veículo
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatch">Hatch</option>
            <option value="Convertible">Conversível</option>
            <option value="Coupe">Cupê</option>
            <option value="Minivan">Minivan</option>
            <option value="Pickup Truck">Pickup</option>
            <option value="Wagon">Wagon</option>
            <option value="Van">Van</option>
            <option value="Other">Outro</option>
          </select>
        </div>

        {/* Valor e Entrada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-900 mb-2">
              Valor do Veículo (R$)
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value || ''}
              onChange={handleInputChange}
              placeholder="50000"
              min="0"
              step="100"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="downPayment" className="block text-sm font-medium text-gray-900 mb-2">
              Entrada (R$)
            </label>
            <input
              type="number"
              id="downPayment"
              name="downPayment"
              value={formData.downPayment || ''}
              onChange={handleInputChange}
              placeholder="10000"
              min="0"
              step="100"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Taxa de Juros e Meses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-900 mb-2">
              Taxa de Juros Anual
            </label>
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-semibold">
              {(formData.interestRate * 100).toFixed(2)}% a.a.
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Taxa calculada automaticamente pelo prazo
            </p>
          </div>

          <div>
            <label htmlFor="countOfMonths" className="block text-sm font-medium text-gray-900 mb-2">
              Número de Parcelas
            </label>
            <select
              id="countOfMonths"
              name="countOfMonths"
              value={formData.countOfMonths}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="12">12 meses (6% a.a.)</option>
              <option value="24">24 meses (8% a.a.)</option>
              <option value="36">36 meses (10% a.a.)</option>
              <option value="48">48 meses (12% a.a.)</option>
              <option value="60">60 meses (14% a.a.)</option>
            </select>
          </div>
        </div>

        {/* Simulação */}
        {showSimulation && simulation && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Resultado da Simulação</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-800">Valor Financiado:</span>
                <span className="text-gray-900 font-semibold">{formatCurrency(formData.value - formData.downPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Valor da Parcela:</span>
                <span className="text-primary font-bold text-xl">{formatCurrency(simulation.payment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Total de Juros:</span>
                <span className="text-gray-900 font-semibold">{formatCurrency(simulation.totalInterest)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-gray-800">Total a Pagar:</span>
                <span className="text-gray-900 font-bold">{formatCurrency((formData.value - formData.downPayment) + simulation.totalInterest)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Mensagens de erro e sucesso */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-700 text-sm">Financiamento solicitado com sucesso!</p>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSimulate}
            disabled={loading}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors duration-200"
          >
            Simular
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 px-6 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner /> : 'Solicitar Financiamento'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;