import * as React from 'react';
import styles from './MainStyle.module.css'

type MainStyleProps = {
    children?: React.ReactNode; 
} & React.ComponentProps<'div'>;

const MainStyle: React.FC<MainStyleProps> = ({children}) => {

  return (
    <div 
      className='min-h-[100%] flex justify-center items-center'>
      <div 
        id={styles["container"]} 
        className='bg-contain rounded-[2.5rem] bg-white shadow-xl'
      >
        {children}
      </div>
    </div>
  );
}

export default MainStyle;
