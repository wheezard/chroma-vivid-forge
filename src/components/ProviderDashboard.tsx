import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Shield, 
  FileText, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  Lock,
  ExternalLink,
  UserCheck
} from "lucide-react";

interface ProviderDashboardProps {
  walletAddress: string;
  onDisconnect: () => void;
}

export const ProviderDashboard = ({ walletAddress, onDisconnect }: ProviderDashboardProps) => {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  // Mock authorized patients data
  const authorizedPatients = [
    {
      id: 1,
      name: "Amara Johnson",
      address: "0x1234...Amara",
      consentDate: "2025-09-28",
      expiryDate: "2025-10-28",
      accessLevel: ["Diagnosis", "Treatment"],
      lastAccessed: "2025-10-01",
      recordCount: 2
    }
  ];

  // Mock patient records
  const patientRecords = [
    {
      id: 1,
      patientId: 1,
      type: "Diagnosis",
      date: "2025-09-28",
      diagnosis: "Acute Bronchitis",
      treatment: "Amoxicillin 500mg, 3x daily for 7 days",
      notes: "Patient presented with 2-week history of persistent dry cough. Minimal improvement after 7 days of antibiotic therapy.",
      hederaTxId: "0x789xyz..."
    },
    {
      id: 2,
      patientId: 1,
      type: "Specialist Consultation",
      date: "2025-10-05",
      diagnosis: "Post-viral cough syndrome",
      treatment: "Inhaled corticosteroid, cough suppressant",
      notes: "Chest X-ray normal. Spirometry shows mild restriction. Recommend follow-up in 2 weeks.",
      hederaTxId: "0xHIJ123..."
    }
  ];

  const togglePatientRecords = (patientId: number) => {
    setSelectedPatient(selectedPatient === patientId ? null : patientId);
  };

  const getPatientRecords = (patientId: number) => {
    return patientRecords.filter(record => record.patientId === patientId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Provider Dashboard
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <UserCheck className="w-4 h-4 text-accent" />
              Dr. Kemi Adebayo • License: MD001234 • {walletAddress}
            </p>
          </div>
          <Button variant="outline" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="patients" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="patients" className="text-lg font-display">
              Authorized Patients
            </TabsTrigger>
            <TabsTrigger value="add-record" className="text-lg font-display">
              Add Medical Record
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-display font-semibold">Patients with Active Consent</h2>
                <p className="text-muted-foreground">Access medical records with valid patient consent</p>
              </div>
              <Badge variant="secondary" className="verification-badge verified">
                <Shield className="w-4 h-4 mr-2" />
                Provider Verified
              </Badge>
            </div>

            <div className="grid gap-6">
              {authorizedPatients.map((patient) => (
                <Card key={patient.id} className="card-3d border-2 hover:border-accent/30">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-3 font-display">
                          <Users className="w-5 h-5 text-accent" />
                          {patient.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            {patient.address}
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="pulse-medical">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active Consent
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-semibold text-medical-deep">Consent Granted</p>
                        <p className="text-foreground">{patient.consentDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-medical-deep">Expires</p>
                        <p className="text-foreground">{patient.expiryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-medical-deep">Records Available</p>
                        <p className="text-foreground">{patient.recordCount} records</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-medical-deep mb-2">Access Level</p>
                      <div className="flex flex-wrap gap-2">
                        {patient.accessLevel.map((access, index) => (
                          <Badge key={index} variant="secondary">
                            {access}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="accent"
                      onClick={() => togglePatientRecords(patient.id)}
                      className="w-full mb-4"
                    >
                      <FileText className="w-4 h-4" />
                      {selectedPatient === patient.id ? 'Hide' : 'View'} Medical Records
                    </Button>

                    {selectedPatient === patient.id && (
                      <div className="space-y-4 bg-muted p-4 rounded-lg">
                        <h4 className="font-semibold text-medical-deep">Medical Records</h4>
                        {getPatientRecords(patient.id).map((record) => (
                          <Card key={record.id} className="bg-background">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-display">{record.type}</CardTitle>
                                <Badge variant="outline" className="text-xs">
                                  {record.date}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-sm font-semibold text-medical-deep">Diagnosis</p>
                                <p className="text-foreground">{record.diagnosis}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-medical-deep">Treatment</p>
                                <p className="text-foreground">{record.treatment}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-medical-deep">Clinical Notes</p>
                                <p className="text-foreground">{record.notes}</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ExternalLink className="w-4 h-4" />
                                <span>Hedera TX: {record.hederaTxId}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add-record" className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-semibold">Create New Medical Record</h2>
              <p className="text-muted-foreground">Add encrypted medical records for authorized patients</p>
            </div>

            <Card className="card-3d border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-display">
                  <Plus className="w-5 h-5 text-medical-green" />
                  New Medical Record
                </CardTitle>
                <CardDescription>
                  All data will be encrypted and stored on IPFS with blockchain verification
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-medical-deep">Patient</label>
                    <Input placeholder="Select patient..." />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-medical-deep">Record Type</label>
                    <Input placeholder="Diagnosis, Treatment, Lab Results..." />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-medical-deep">Diagnosis</label>
                  <Input placeholder="Primary diagnosis..." />
                </div>

                <div>
                  <label className="text-sm font-semibold text-medical-deep">Treatment Plan</label>
                  <Textarea 
                    placeholder="Prescribed medications, procedures, recommendations..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-medical-deep">Clinical Notes</label>
                  <Textarea 
                    placeholder="Additional observations, patient history, follow-up recommendations..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button variant="medical" size="lg" className="w-full">
                  <Shield className="w-5 h-5" />
                  Create Encrypted Record
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};