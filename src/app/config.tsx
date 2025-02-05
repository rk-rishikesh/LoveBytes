import { http, createConfig } from 'wagmi'
import { filecoinCalibration } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [filecoinCalibration],
  connectors: [
    metaMask(),
  ],
  transports: {
    [filecoinCalibration.id]: http()
  },
})
