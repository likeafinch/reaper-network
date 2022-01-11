import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { default as useMetaMask } from './useMetaMask';
import { default as useFormHandlers } from './useFormHandlers';
import Reaper from '../artifacts/eth/Reaper.sol/Reaper.json';

const INITIAL_REAPER_FORM = {
  token_id: '',
  token_address: '',
};

const INITIAL_REAPER_FORM_ERRORS = {
  token_id: false,
  token_address: false,
};

const REAPER_FORM_VALIDATORS = {
  token_id: (id) => !id?.length || /\d/g.test(parseInt(id)),
  token_address: (address) =>
    !address?.length || /^0X[a-fA-F0-9]{40}$/g.test(address),
};

const useReaperForm = () => {
  const {
    form: reaperForm,
    submittable,
    handleReset,
    ...reaperFormProps
  } = useFormHandlers(
    INITIAL_REAPER_FORM,
    INITIAL_REAPER_FORM_ERRORS,
    REAPER_FORM_VALIDATORS
  );
  const {
    connectedWalletAddress,
    handleConnectWallet,
    requestAccount,
    hasEthereum,
  } = useMetaMask();
  const [burned, setBurned] = useState(false);

  const handleReapToken = useCallback(async () => {
    if (!hasEthereum()) {
      handleConnectWallet('MetaMask unavailable');
      return;
    }
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.GATSBY_PUBLIC_REAPER_ADDRESS,
      Reaper.abi,
      provider
    );
    const { token_id: tokenId, token_address: tokenAddress } = reaperForm;
    if (connectedWalletAddress && submittable) {
      try {
        await contract.burnExternalToken(tokenAddress, tokenId, {
          from: connectedWalletAddress,
        });
        const reaperTokenId = await contract.tokenOfOwnerByIndex(
          tokenAddress,
          0
        );
        setBurned(await contract.proofOfBurn(reaperTokenId));
        handleReset();
      } catch (err) {
        console.error(err.message);
      }
    }
  }, [
    connectedWalletAddress,
    reaperForm,
    submittable,
    requestAccount,
    handleReset,
    handleConnectWallet,
    hasEthereum,
  ]);

  return {
    handleSubmit: handleReapToken,
    handleReset,
    submittable,
    burned,
    ...reaperForm,
    ...reaperFormProps,
  };
};

export default useReaperForm;
