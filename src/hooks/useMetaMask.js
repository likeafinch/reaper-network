import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function hasEthereum() {
  return (
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  );
}

export default function useMetaMask() {
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState('');

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState('MetaMask unavailable');
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState('No wallet connected');
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  const handleConnectWallet = (wallet) =>
    setConnectedWalletAddressState(wallet);

  return {
    connectedWalletAddress,
    handleConnectWallet,
    requestAccount,
    hasEthereum,
  };
}
