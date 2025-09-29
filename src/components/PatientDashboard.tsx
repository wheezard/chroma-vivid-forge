import { DashboardSidebar } from "./DashboardSidebar";
import { FileText, Shield, Activity } from "lucide-react";

interface PatientDashboardProps {
  walletAddress: string;
  onDisconnect: () => void;
}

export const PatientDashboard = ({ walletAddress, onDisconnect }: PatientDashboardProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar 
        userRole="patient" 
        walletAddress={walletAddress} 
        onDisconnect={onDisconnect} 
      />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Patient Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your medical records and consent permissions
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-3d p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-3xl font-bold text-foreground">24</p>
                </div>
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </div>

            <div className="card-3d p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Consents</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                </div>
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </div>

            <div className="card-3d p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Access</p>
                  <p className="text-3xl font-bold text-foreground">12</p>
                </div>
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-3d p-6 bg-card">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-medical-green/10 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-medical-green" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">New medical record added</p>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Johnson - 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};