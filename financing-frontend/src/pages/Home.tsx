import * as React from 'react';
import { Link } from 'react-router-dom';
import MainStyle from '@components/MainStyle';

const Home: React.FC = () => {
  return (
    <MainStyle>
      <div className="text-center space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bem-vindo ao <span className="text-primary">Financing System</span>
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Realize o sonho do seu veículo com as melhores condições de financiamento do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aprovação Rápida</h3>
            <p className="text-gray-800 text-sm">Análise e resposta em até 24 horas</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Taxas Competitivas</h3>
            <p className="text-gray-800 text-sm">As melhores taxas do mercado</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processo Simples</h3>
            <p className="text-gray-800 text-sm">100% online e sem burocracia</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Link
            to="/apply"
            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg"
          >
            Solicitar Financiamento
          </Link>
          <Link
            to="/status"
            className="px-8 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-colors duration-200"
          >
            Consultar Status
          </Link>
        </div>
      </div>
    </MainStyle>
  );
};

export default Home;