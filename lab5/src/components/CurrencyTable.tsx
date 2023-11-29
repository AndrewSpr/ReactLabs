import React, { useEffect, useState } from 'react';

interface Currency {
  date: string;
  rate: number;
}

const CurrencyTable: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        // Запит до API для отримання курсів валют за останні 7 днів
        const response = await fetch(
          'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date=20211208&period=7'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }

        const data = await response.json();
        // Фільтрація валют та обрання необхідних для відображення
        const filteredCurrencies = data
          .filter((currency: { cc: string }) => ['USD', 'EUR', 'GBP'].includes(currency.cc))
          .map((currency: { date: string; rate: number }) => ({
            date: currency.date,
            rate: currency.rate.toFixed(2),
          }));

        setCurrencies(filteredCurrencies);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>USD</th>
          <th>EUR</th>
          <th>GBP</th>
        </tr>
      </thead>
      <tbody>
        {currencies.map((currency) => (
          <tr key={currency.date}>
            <td>{currency.date}</td>
            <td>{currency.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
