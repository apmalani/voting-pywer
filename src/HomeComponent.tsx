import React from 'react';
import CalculatorComponent from './CalculatorComponent';
import HeaderComponent from './HeaderComponent';

function HomeComponent() {
    return (
      <div className="HomeComponent">
        <HeaderComponent></HeaderComponent>
        <CalculatorComponent></CalculatorComponent>
      </div>
  
  
    );
  }
  
  export default HomeComponent;