import * as React from 'react';
import { IAmortizationItem } from '../types';
import { formatCurrency } from '@services/api';

interface PaymentScheduleProps {
  schedule: IAmortizationItem[];
  totalInterest: number;
  totalAmount: number;
}

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ schedule, totalInterest, totalAmount }) => {
  return (
    <div className="w-full">
  <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Tabela de Amortização</h3>
        
        {/* Resumo */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Total de Parcelas</p>
            <p className="text-gray-900 font-bold text-xl">{schedule.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Total de Juros</p>
            <p className="text-primary font-bold text-xl">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Valor Total</p>
            <p className="text-gray-900 font-bold text-xl">{formatCurrency(totalAmount)}</p>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-gray-700 font-semibold">Mês</th>
                <th className="text-right py-3 px-2 text-gray-700 font-semibold">Parcela</th>
                <th className="text-right py-3 px-2 text-gray-700 font-semibold">Amortização</th>
                <th className="text-right py-3 px-2 text-gray-700 font-semibold">Juros</th>
                <th className="text-right py-3 px-2 text-gray-700 font-semibold">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr 
                  key={index} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-2 text-gray-800 font-medium">{item.month}</td>
                  <td className="py-3 px-2 text-right text-gray-800">{formatCurrency(item.payment)}</td>
                  <td className="py-3 px-2 text-right text-green-600 font-medium">{formatCurrency(item.principalPaid)}</td>
                  <td className="py-3 px-2 text-right text-purple-600 font-medium">{formatCurrency(item.interest)}</td>
                  <td className="py-3 px-2 text-right text-gray-700">{formatCurrency(item.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentSchedule;