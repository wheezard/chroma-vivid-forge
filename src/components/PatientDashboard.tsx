import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Shield, 
  Eye, 
  Download, 
  Share2, 
  Clock, 
  CheckCircle, 
  Users,
  Lock,
  ExternalLink
} from "lucide-react";

interface PatientDashboardProps {
  walletAddress: string;
  onDisconnect: () => void;
}

export const PatientDashboard = ({ walletAddress, onDisconnect }: PatientDashboardProps) => {
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  // Mock medical records data
  const medicalRecords = [
    {
      id: 1,
      type: "Diagnosis",
      provider: "Dr. Kemi Adebayo",
      date: "2025-09-28",
      diagnosis: "Acute Bronchitis",
      treatment: "Amoxicillin 500mg, 3x daily for 7 days",
      status: "verified",
      hederaTxId: "0x789xyz...",
      encrypted: true,
    },
    {
      id: 2,
      type: "Specialist Consultation",
      provider: "Dr. Bola Ogundimu",
      date: "2025-10-05",
      diagnosis: "Post-viral cough syndrome",
      treatment: "Inhaled corticosteroid, cough suppressant",
      status: "verified",
      hederaTxId: "0xHIJ123...",
      encrypted: true,
    },
  ];

  // Mock active consents
  const activeConsents = [
    {
      id: 1,
      provider: "Dr. Bola Ogundimu",
      specialization: "Pulmonology",
      grantedDate: "2025-09-28",
      expiryDate: "2025-10-28",
      dataAccess: ["Diagnosis", "Treatment"],
      status: "active"
    }
  ];

  const toggleRecordDetails = (recordId: number) => {
    setSelectedRecord(selectedRecord === recordId ? null : recordId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Patient Dashboard
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Lock className="w-4 h-4" />
              Connected: {walletAddress}
            </p>
          </div>
          <Button variant="outline" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="records" className="text-lg font-display">
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="consents" className="text-lg font-display">
              Data Consents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-display font-semibold">Your Medical Records</h2>
                <p className="text-muted-foreground">Encrypted and stored securely on IPFS</p>
              </div>
              <Badge variant="secondary" className="verification-badge verified">
                <CheckCircle className="w-4 h-4 mr-2" />
                Blockchain Verified
              </Badge>
            </div>

            <div className="records-grid grid gap-6">
              {medicalRecords.map((record) => (
                <Card key={record.id} className="record-card border-2 hover:border-medical-green/30">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-3 font-display">
                          <FileText className="w-5 h-5 text-medical-green" />
                          {record.type}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {record.date}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Shield className="w-4 h-4" />
                            {record.provider}
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="pulse-medical">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {selectedRecord === record.id ? (
                      <div className="space-y-4 bg-muted p-4 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-medical-deep">Diagnosis</h4>
                          <p className="text-foreground">{record.diagnosis}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-medical-deep">Treatment</h4>
                          <p className="text-foreground">{record.treatment}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ExternalLink className="w-4 h-4" />
                          <span>Hedera TX: {record.hederaTxId}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Encrypted medical data</p>
                      </div>
                    )}
                    
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="medical"
                        size="sm"
                        onClick={() => toggleRecordDetails(record.id)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4" />
                        {selectedRecord === record.id ? 'Hide' : 'View'} Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consents" className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-semibold">Data Access Consents</h2>
              <p className="text-muted-foreground">Manage who can access your medical data</p>
            </div>

            <div className="grid gap-6">
              {activeConsents.map((consent) => (
                <Card key={consent.id} className="card-3d border-2 hover:border-accent/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-display">
                      <Users className="w-5 h-5 text-accent" />
                      {consent.provider}
                    </CardTitle>
                    <CardDescription>
                      Specialization: {consent.specialization}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-medical-deep">Granted Date</p>
                          <p className="text-foreground">{consent.grantedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-medical-deep">Expires</p>
                          <p className="text-foreground">{consent.expiryDate}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-medical-deep mb-2">Data Access Granted</p>
                        <div className="flex flex-wrap gap-2">
                          {consent.dataAccess.map((access, index) => (
                            <Badge key={index} variant="secondary">
                              {access}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" size="sm" className="flex-1">
                        Modify Access
                      </Button>
                      <Button variant="destructive" size="sm">
                        Revoke Consent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};