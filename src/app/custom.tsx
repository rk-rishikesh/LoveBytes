import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount, useBalance } from 'wagmi';

export const Wallet = () => {

    const { address } = useAccount();
    const { data: balance } = useBalance({
        address: address,
    });

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button onClick={openConnectModal} type="button">
                                        <Image src="/images/wallet.svg" alt="" width={150} height={20} className="w-[150px]" />
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <Image
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </button>
                                    {balance?.value == BigInt(0) ?
                                        <div className='text-[#FF35D0] text-xl text-center'>
                                            YOUR ACCOUNT BALANCE IS ZERO, GET tFIL{' '}
                                            <a
                                                href="https://faucet.calibnet.chainsafe-fil.io/funds.html"
                                                className="text-[#FF35D0] underline text-xl"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                HERE
                                            </a>{' '} TO PROCEED
                                        </div>
                                        :
                                        <Link href="/lovebyte">
                                           
                                            <Image src="/images/enter.svg" alt="" width={150} height={20} className="w-[150px] -ml-2" />
                                        </Link>}
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};