import * as React from 'react';
import { Link } from 'react-router-dom';
import LoanForm from '@components/LoanForm';
import MainStyle from '@components/MainStyle';

const Apply: React.FC = () => {
  return (
    <MainStyle>
      <div className="relative">
        <Link
          to="/"
          aria-label="Voltar ao início"
          className="absolute top-4 left-4 inline-flex items-center text-secondary hover:text-primary transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="sr-only">Início</span>
        </Link>
        <LoanForm />
      </div>
    </MainStyle>
  );
};

export default Apply;