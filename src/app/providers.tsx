'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    filecoinCalibration,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: 'Love Byte',
    projectId: 'YOUR_PROJECT_ID',
    chains: [filecoinCalibration],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider >
    );
}
