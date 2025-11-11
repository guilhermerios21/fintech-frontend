import React from 'react';
import styles from './MainStyle.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="text-center text-sm text-gray-800 py-4">
        <p>© {new Date().getFullYear()} Financing System. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;