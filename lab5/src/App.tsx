import React from 'react';
import CurrencyTable from './components/CurrencyTable';

const App: React.FC = () => {
  return (
    <div>
      <h1>Currency Exchange Rates</h1>
      <CurrencyTable />
    </div>
  );
};

export default App;
