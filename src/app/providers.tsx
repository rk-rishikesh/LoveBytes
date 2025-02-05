'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain, http } from 'viem';
import { filecoin, filecoinCalibration } from 'viem/chains';
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient();

export const myCustomChain = defineChain({
    id: 314159,
    name: "Filecoin Calibration",
    nativeCurrency: {
        decimals: 18,
        name: 'FIL',
        symbol: 'FIL'
    },
    rpcUrls: {
        default: {
            http: ['https://api.calibration.node.glif.io/rpc/v1'],
            webSocket: ['wss://filecoin-calibration.drpc.org']
        }
    },
    blockExplorers: {
        default: { name: 'FilFox', url: 'https://calibration.filfox.info/en' }
    }

})

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
