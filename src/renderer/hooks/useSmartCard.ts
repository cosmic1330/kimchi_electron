import { useEffect } from 'react';

export default function useSmartCard() {
  const startUpSmartCard = () => {
    window.electron.smartCard.run();
  };

  const startUpNFTCard = () => {
    window.electron.smartCard.runNFT();
  };

  useEffect(() => {
    window.electron.smartCard.listen(console.log);
    return () => {
      window.electron.smartCard.remove();
    };
  }, []);
  return { startUpSmartCard, startUpNFTCard };
}
