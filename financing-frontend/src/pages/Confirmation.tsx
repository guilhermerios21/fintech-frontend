import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { financeService } from '@services/api';
import { IFinance } from '@types/index';
import MainStyle from '@components/MainStyle';
import Spinner from '@components/Spinner';

const Confirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadFinance();
    }
  }, [id]);

  const loadFinance = async () => {
    if (!id) return;
    try {
      const response = await financeService.getFinanceById(id);
      setFinance(response.finance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainStyle>
        <Spinner />
      </MainStyle>
    );
  }

  return (
    <MainStyle>
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white">Solicitação Enviada com Sucesso!</h1>
        
        <p className="text-gray-300 max-w-md mx-auto">
          Seu pedido de financiamento foi recebido e está sendo analisado. 
          Você receberá uma notificação por e-mail assim que tivermos uma atualização.
        </p>

        {finance && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6 text-left max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Resumo da Solicitação</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Veículo:</span>
                <span className="text-white font-medium">{finance.brand} {finance.modelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white font-medium">{finance.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Parcelas:</span>
                <span className="text-white font-medium">{finance.countOfMonths}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-primary font-medium">Pendente</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center mt-8">
          <Link
            to="/status"
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors"
          >
            Ver Meus Financiamentos
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </MainStyle>
  );
};

export default Confirmation;