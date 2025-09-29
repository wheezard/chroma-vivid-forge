import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Zap, Globe, Heart, Users, ArrowRight, Check, Wallet, Phone, Mail, MapPin } from "lucide-react";
import { WalletConnect } from "./WalletConnect";

interface LandingPageProps {
  onRoleSelect: (address: string, role: 'patient' | 'provider') => void;
}

export const LandingPage = ({ onRoleSelect }: LandingPageProps) => {
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const comingSoonFeatures = [
    { title: "Insurance Pool", icon: Shield, description: "Decentralized insurance coverage for all patients" },
    { title: "Automated AI Payments", icon: Zap, description: "Smart contract-based automatic claim processing" },
    { title: "Telemedicine Integration", icon: Heart, description: "Remote consultation with blockchain records" },
    { title: "IoT Device Integration", icon: Globe, description: "Connect medical devices directly to your records" },
  ];

  const coreFeatures = [
    {
      icon: Lock,
      title: "Patient-Controlled Records",
      description: "You own and control your medical data with cryptographic security. Grant or revoke access at any time."
    },
    {
      icon: Shield,
      title: "Blockchain Verification",
      description: "Every medical record is cryptographically verified and tamper-proof using Hedera Consensus Service."
    },
    {
      icon: Users,
      title: "Provider Network",
      description: "Verified healthcare providers can access your records only with your explicit consent."
    },
    {
      icon: Globe,
      title: "Pan-African Network",
      description: "Seamless healthcare record access across Africa with multi-language support."
    }
  ];

  // Rotate features every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % comingSoonFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleConnect = (address: string, role: 'patient' | 'provider') => {
    onRoleSelect(address, role);
    setShowConnectDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-medical-soft/5"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="hero-parallax mb-12">
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 text-foreground leading-tight">
              AfriHealth{" "}
              <span className="text-transparent bg-gradient-to-r from-medical-green to-medical-bright bg-clip-text">
                Ledger
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              The future of healthcare records in Africa. Secure, patient-controlled, 
              blockchain-powered medical data management for everyone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
              <DialogTrigger asChild>
                <Button variant="hero" size="xl" className="text-lg px-12 py-6 card-3d">
                  <Zap className="w-6 h-6 mr-3" />
                  Launch App
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-display text-center">Connect to AfriHealth Ledger</DialogTitle>
                  <DialogDescription className="text-lg text-center">
                    Choose your role to access the healthcare platform
                  </DialogDescription>
                </DialogHeader>
                <WalletConnect onConnect={handleConnect} />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="xl" className="text-lg px-12 py-6">
              Learn More
            </Button>
          </div>

          {/* Rotating Coming Soon Features */}
          <div className="card-3d bg-card/50 backdrop-blur-sm border border-medical-green/20 rounded-3xl p-8 max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-4">
              <Badge variant="secondary" className="text-medical-green border-medical-green/30 bg-medical-green/10">
                COMING SOON
              </Badge>
            </div>
            <div className="transition-all duration-500 ease-in-out transform">
              {comingSoonFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentFeatureIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95 absolute inset-0'
                  } transition-all duration-500 flex items-center justify-center flex-col`}
                >
                  <feature.icon className="w-12 h-12 text-medical-green mb-4" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-6 text-foreground">
              Why Choose AfriHealth Ledger?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary blockchain technology meets African healthcare needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="card-3d border-2 hover:border-medical-green/30 transition-all duration-500 group">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-medical-soft/20 to-medical-green/20 rounded-full flex items-center justify-center mb-6 card-float group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-10 h-10 text-medical-green" />
                  </div>
                  <CardTitle className="text-xl font-display text-foreground mb-3">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="card-3d p-8">
              <div className="text-4xl font-display font-bold text-medical-green mb-2">99.9%</div>
              <div className="text-lg text-muted-foreground">System Uptime</div>
            </div>
            <div className="card-3d p-8">
              <div className="text-4xl font-display font-bold text-medical-green mb-2">&lt;3s</div>
              <div className="text-lg text-muted-foreground">Average Response Time</div>
            </div>
            <div className="card-3d p-8">
              <div className="text-4xl font-display font-bold text-medical-green mb-2">0</div>
              <div className="text-lg text-muted-foreground">Data Breaches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-display font-bold mb-8 text-foreground">
                Ready to Transform Healthcare?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join thousands of patients and healthcare providers across Africa who trust 
                AfriHealth Ledger with their most important medical data.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Check className="w-6 h-6 text-medical-green" />
                  <span className="text-muted-foreground">100% patient-controlled data</span>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="w-6 h-6 text-medical-green" />
                  <span className="text-muted-foreground">Blockchain-verified records</span>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="w-6 h-6 text-medical-green" />
                  <span className="text-muted-foreground">HIPAA & GDPR compliant</span>
                </div>
              </div>
            </div>

            <div className="card-3d p-8">
              <h3 className="text-2xl font-display font-bold mb-6 text-foreground">Contact Us</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-medical-green" />
                  <span className="text-muted-foreground">hello@afrihealth.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-medical-green" />
                  <span className="text-muted-foreground">+234 (0) 123 456 789</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-medical-green" />
                  <span className="text-muted-foreground">Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-display font-bold text-foreground mb-4 md:mb-0">
              AfriHealth Ledger
            </div>
            <div className="text-sm text-muted-foreground">
              Powered by Hedera Consensus Service • IPFS • Advanced Encryption
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};