import React, { useState, useEffect } from 'react';
import { financeService, formatCurrency, formatDate } from '@services/api';
import { useAuth } from '@store/index';
import { IFinance } from '@types/index';
import MainStyle from '@components/MainStyle';
import PaymentSchedule from '@components/PaymentSchedule';
import Spinner from '@components/Spinner';

const Status: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [finances, setFinances] = useState<IFinance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFinance, setSelectedFinance] = useState<IFinance | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadFinances();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadFinances = async () => {
    try {
      const response = await financeService.getFinances();
      setFinances(response.finances || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (finance: IFinance) => {
    setSelectedFinance(finance);
    setShowSchedule(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pending':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'in_progress':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'completed':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      approved: 'Aprovado',
      pending: 'Pendente',
      rejected: 'Rejeitado',
      in_progress: 'Em Andamento',
      completed: 'Concluído',
    };
    return statusMap[status] || status;
  };

  if (!isAuthenticated) {
    return (
      <MainStyle>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h2>
          <p className="text-gray-300">Você precisa estar logado para ver seus financiamentos.</p>
        </div>
      </MainStyle>
    );
  }

  if (loading) {
    return (
      <MainStyle>
        <Spinner />
      </MainStyle>
    );
  }

  if (showSchedule && selectedFinance) {
    const principal = selectedFinance.value - (selectedFinance.downPayment || 0);
    const amortization = financeService.calculateAmortization(
      principal,
      selectedFinance.interestRate,
      selectedFinance.countOfMonths
    );

    return (
      <MainStyle>
        <div className="space-y-6">
          <button
            onClick={() => setShowSchedule(false)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Detalhes do Financiamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Veículo:</p>
                <p className="text-white font-semibold">{selectedFinance.brand} {selectedFinance.modelName}</p>
              </div>
              <div>
                <p className="text-gray-400">Tipo:</p>
                <p className="text-white font-semibold">{selectedFinance.type}</p>
              </div>
              <div>
                <p className="text-gray-400">Valor Total:</p>
                <p className="text-white font-semibold">{formatCurrency(selectedFinance.value)}</p>
              </div>
              <div>
                <p className="text-gray-400">Entrada:</p>
                <p className="text-white font-semibold">{formatCurrency(selectedFinance.downPayment || 0)}</p>
              </div>
            </div>
          </div>

          <PaymentSchedule
            schedule={amortization.schedule}
            totalInterest={amortization.totalInterest}
            totalAmount={principal + amortization.totalInterest}
          />
        </div>
      </MainStyle>
    );
  }

  return (
    <MainStyle>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Meus Financiamentos
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {finances.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Você ainda não possui financiamentos.</p>
            <a
              href="/apply"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors"
            >
              Solicitar Financiamento
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {finances.map((finance) => (
              <div
                key={finance._id}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {finance.brand} {finance.modelName}
                    </h3>
                    <p className="text-gray-400 text-sm">{finance.type}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(
                      finance.status
                    )}`}
                  >
                    {getStatusText(finance.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Valor</p>
                    <p className="text-white font-semibold">{formatCurrency(finance.value)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Parcelas</p>
                    <p className="text-white font-semibold">{finance.countOfMonths}x</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Taxa</p>
                    <p className="text-white font-semibold">{(finance.interestRate * 100).toFixed(2)}% a.a.</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Data</p>
                    <p className="text-white font-semibold">{formatDate(finance.financeDate)}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(finance)}
                  className="w-full mt-2 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainStyle>
  );
};

export default Status;