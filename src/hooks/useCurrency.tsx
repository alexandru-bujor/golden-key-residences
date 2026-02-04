import { useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { Currency, convertPrice, formatPrice } from '@/lib/data';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convert: (priceEur: number) => number;
  format: (priceEur: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>('EUR');

  const convert = useCallback(
    (priceEur: number) => convertPrice(priceEur, currency),
    [currency]
  );

  const format = useCallback(
    (priceEur: number) => formatPrice(convertPrice(priceEur, currency), currency),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
