import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProvidersProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    removeTransaction: (idTransaction: number) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProvidersProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')            
            .then(response => {setTransactions(response.data.transactions)})
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {        
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    async function removeTransaction(idTransaction: number) {        
        api.delete<number>(`transactions/delete/${idTransaction}`)  
            .then(response => {
                if (response.status === 204) {                    
                    toast.success('Registro removido com sucesso.')
                };
            });
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction, removeTransaction }}>
            { children }
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}