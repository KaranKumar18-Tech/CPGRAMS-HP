import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/Layout';
import { HomeView, FileGrievanceView, GRODashboard, AuthWizard, TrackGrievanceView, GrievanceDetailsView } from './components/Views';
import { User, UserRole, Grievance, GrievanceStatus } from './types';
import { Modal } from './components/UI';

type ViewState = 'home' | 'dashboard' | 'file-grievance' | 'track' | 'grievance-details';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingView, setPendingView] = useState<ViewState | null>(null);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('hp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('hp_user', JSON.stringify(authenticatedUser));
    setShowAuthModal(false);
    
    if (pendingView) {
      setView(pendingView);
      setPendingView(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hp_user');
    setView('home');
    setSelectedGrievance(null);
  };

  // Navigation Guards
  const navigateTo = (targetView: ViewState) => {
    if ((targetView === 'file-grievance' || targetView === 'track') && !user) {
      setPendingView(targetView);
      setShowAuthModal(true);
    } else {
      setView(targetView);
    }
  };

  const handleSubmitGrievance = (data: any) => {
    if (!user) return;

    const newGrievance: Grievance = {
      id: `HPG-${Date.now()}`,
      subject: data.subject,
      description: data.description,
      location: data.location,
      district: data.district,
      category: data.category,
      dateFiled: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: GrievanceStatus.UNDER_REVIEW,
      files: data.files ? Array.from(data.files).map((f: any) => f.name) : [],
      isAnonymized: data.isAnonymized,
      timeline: [
        { label: "Submitted", date: new Date().toISOString(), status: 'completed' },
        { label: "Assigned to Department", date: new Date().toISOString(), status: 'completed' },
        { label: "Under Review", date: new Date().toISOString(), status: 'current' }
      ],
      replies: []
    };

    const key = `hp_grievances_${user.mobile}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([newGrievance, ...existing]));

    alert(`Grievance Submitted Successfully! Your ID is ${newGrievance.id}`);
    // Automatically go to tracking view to see the new grievance
    setView('track');
  };

  const handleViewDetails = (g: Grievance) => {
    setSelectedGrievance(g);
    setView('grievance-details');
  };

  const handleReplyGrievance = (message: string) => {
    if (!user || !selectedGrievance) return;

    const reply = {
      author: 'You',
      message: message,
      date: new Date().toISOString()
    };

    const updatedGrievance = {
      ...selectedGrievance,
      replies: [...selectedGrievance.replies, reply],
      lastUpdated: new Date().toISOString()
    };

    // Update State
    setSelectedGrievance(updatedGrievance);

    // Update LocalStorage
    const key = `hp_grievances_${user.mobile}`;
    const allGrievances = JSON.parse(localStorage.getItem(key) || "[]");
    const updatedList = allGrievances.map((g: Grievance) => g.id === updatedGrievance.id ? updatedGrievance : g);
    localStorage.setItem(key, JSON.stringify(updatedList));
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header 
        user={user} 
        onLogout={handleLogout}
        onLoginClick={() => setShowAuthModal(true)}
        onRegisterClick={() => setShowAuthModal(true)}
        onDashboardClick={() => setView('dashboard')}
        onHomeClick={() => setView('home')}
      />

      <main className="flex-grow relative">
        {view === 'home' && (
          <HomeView 
            onFileGrievance={() => navigateTo('file-grievance')} 
            onTrack={() => navigateTo('track')}
          />
        )}

        {view === 'file-grievance' && (
          <FileGrievanceView onSubmit={handleSubmitGrievance} />
        )}

        {view === 'track' && user && (
          <TrackGrievanceView 
            user={user} 
            onViewDetails={handleViewDetails} 
          />
        )}

        {view === 'grievance-details' && selectedGrievance && (
          <GrievanceDetailsView 
            grievance={selectedGrievance} 
            onBack={() => setView('track')}
            onReply={handleReplyGrievance}
          />
        )}

        {view === 'dashboard' && user?.role === UserRole.GRO && (
          <GRODashboard />
        )}
        
        {/* Fallback for unauthorized access to dashboard */}
        {view === 'dashboard' && user?.role !== UserRole.GRO && (
           <div className="text-center py-20">
             <h2 className="text-xl text-red-600">Unauthorized Access</h2>
             <button onClick={() => setView('home')} className="mt-4 underline">Go Home</button>
           </div>
        )}
      </main>

      <Footer />

      {/* Authentication Modal */}
      <Modal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        title=""
      >
        <AuthWizard onAuthenticated={handleAuthSuccess} />
      </Modal>
    </div>
  );
};

export default App;