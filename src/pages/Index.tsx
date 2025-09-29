import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { PatientDashboard } from "@/components/PatientDashboard";
import { ProviderDashboard } from "@/components/ProviderDashboard";
import { ThemeProvider } from "@/components/ThemeProvider";

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

  return (
    <ThemeProvider defaultTheme="system" storageKey="afrihealth-theme">
      {!connectedWallet ? (
        <LandingPage onRoleSelect={handleWalletConnect} />
      ) : connectedWallet.role === 'patient' ? (
        <PatientDashboard 
          walletAddress={connectedWallet.address}
          onDisconnect={handleDisconnect}
        />
      ) : (
        <ProviderDashboard 
          walletAddress={connectedWallet.address}
          onDisconnect={handleDisconnect}
        />
      )}
    </ThemeProvider>
  );
};

export default Index;
