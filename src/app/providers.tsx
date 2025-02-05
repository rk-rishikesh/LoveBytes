'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { defineChain, http } from 'viem';
// import { filecoin, filecoinCalibration } from 'viem/chains';
import { WagmiProvider } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient();

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
