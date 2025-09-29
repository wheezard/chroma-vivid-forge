import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { PatientDashboard } from "@/components/PatientDashboard";
import { ProviderDashboard } from "@/components/ProviderDashboard";

const Index = () => {
  const [connectedWallet, setConnectedWallet] = useState<{
    address: string;
    role: 'patient' | 'provider';
  } | null>(null);

  const handleWalletConnect = (address: string, role: 'patient' | 'provider') => {
    setConnectedWallet({ address, role });
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  if (!connectedWallet) {
    return <WalletConnect onConnect={handleWalletConnect} />;
  }

  if (connectedWallet.role === 'patient') {
    return (
      <PatientDashboard 
        walletAddress={connectedWallet.address}
        onDisconnect={handleDisconnect}
      />
    );
  }

  return (
    <ProviderDashboard 
      walletAddress={connectedWallet.address}
      onDisconnect={handleDisconnect}
    />
  );
};

export default Index;
