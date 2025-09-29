import { DashboardSidebar } from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Users, Shield, FileText, Activity } from "lucide-react";

interface ProviderDashboardProps {
  walletAddress: string;
  onDisconnect: () => void;
}

export const ProviderDashboard = ({ walletAddress, onDisconnect }: ProviderDashboardProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar 
        userRole="provider" 
        walletAddress={walletAddress} 
        onDisconnect={onDisconnect} 
      />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Provider Dashboard
            </h1>
            <p className="text-muted-foreground">
              Access patient records and manage healthcare data
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-3d p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-3xl font-bold text-foreground">156</p>
                </div>
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </div>

            <div className="card-3d p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Consents</p>
                  <p className="text-3xl font-bold text-foreground">89</p>
                </div>
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </div>

            <div className="card-3d p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Records Created</p>
                  <p className="text-3xl font-bold text-foreground">234</p>
                </div>
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </div>

            <div className="card-3d p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Access</p>
                  <p className="text-3xl font-bold text-foreground">45</p>
                </div>
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-3d p-6 bg-card">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Recent Patient Records
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-medical-green/10 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-medical-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Blood Test - Patient #0x1234...Amara</p>
                    <p className="text-sm text-muted-foreground">Lab results recorded - 1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-3d p-6 bg-card">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Pending Access Requests
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-medical-bright/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-medical-bright" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Patient #0x2468...Folake</p>
                    <p className="text-sm text-muted-foreground">Requesting emergency access - 30 mins ago</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};