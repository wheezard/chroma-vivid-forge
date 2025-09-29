import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletConnectProps {
  onConnect: (address: string, role: 'patient' | 'provider') => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const simulateWalletConnection = async (role: 'patient' | 'provider') => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAddress = role === 'patient' 
      ? '0x1234...Amara' 
      : '0x5678...DrKemi';
    
    toast({
      title: "Wallet Connected",
      description: `Connected as ${role} with address ${mockAddress}`,
    });
    
    onConnect(mockAddress, role);
    setIsConnecting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12 hero-parallax">
          <div className="parallax-layer">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground">
              AfriHealth{" "}
              <span className="text-transparent bg-gradient-to-r from-medical-green to-medical-bright bg-clip-text">
                Ledger
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Secure, patient-controlled medical records powered by blockchain technology.
              Encrypted healthcare data management for Africa.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="card-3d border-2 hover:border-medical-green/30 transition-all duration-500">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-medical-soft to-medical-green rounded-full flex items-center justify-center mb-6 card-float">
                <Shield className="w-12 h-12 text-medical-deep" />
              </div>
              <CardTitle className="text-3xl font-display text-foreground">
                Patient Portal
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Access your encrypted medical records securely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-medical-green" />
                  <span>Control your medical data</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-medical-green" />
                  <span>Grant & revoke provider access</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-medical-green" />
                  <span>Blockchain-verified records</span>
                </div>
              </div>
              
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => simulateWalletConnection('patient')}
                disabled={isConnecting}
              >
                <Wallet className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Connect as Patient'}
              </Button>
            </CardContent>
          </Card>

          <Card className="card-3d border-2 hover:border-medical-bright/30 transition-all duration-500">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-accent/20 to-accent rounded-full flex items-center justify-center mb-6 card-float">
                <Shield className="w-12 h-12 text-accent-foreground" />
              </div>
              <CardTitle className="text-3xl font-display text-foreground">
                Healthcare Provider
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Access patient records with proper consent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-accent" />
                  <span>Consent-based data access</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-accent" />
                  <span>Add new medical records</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-accent" />
                  <span>Verified provider credentials</span>
                </div>
              </div>
              
              <Button
                variant="accent"
                size="lg"
                className="w-full"
                onClick={() => simulateWalletConnection('provider')}
                disabled={isConnecting}
              >
                <Wallet className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Connect as Provider'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            Powered by Hedera Consensus Service • IPFS • Advanced Encryption
          </p>
        </div>
      </div>
    </div>
  );
};