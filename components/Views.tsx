import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Select, TextArea, Badge, Modal } from './UI';
import { DISTRICTS, CATEGORIES, MOCK_GRIEVANCES } from '../constants';
import { Grievance, GrievanceStatus, User, UserRole } from '../types';

// --- FAQ Data & Component ---
const FAQ_ITEMS = [
  { q: "How do I file a grievance?", a: "You can file a grievance by clicking the 'File a Grievance' button on the homepage. You will need to register or login with your mobile number, fill out the details of your complaint, and submit it." },
  { q: "What documents can I upload?", a: "You can upload supporting documents in PDF, DOC, or TXT formats. The maximum file size allowed is 5MB total per grievance." },
  { q: "How long does grievance resolution take?", a: "The target resolution time for most grievances is 15 days. However, complex cases may take longer depending on the department involved." },
  { q: "How do I track my grievance?", a: "Click on 'Track Status' and login with your registered mobile number. You will see a list of your submitted grievances and their current status in real-time." },
  { q: "Can I edit or reopen a grievance?", a: "Once submitted, you cannot edit a grievance. However, if you are not satisfied with the resolution, you can reopen the grievance from your dashboard using the reopen option." },
  { q: "Is my personal information secure?", a: "Yes, your personal information is securely stored and only shared with the concerned department officer for the purpose of resolving your grievance. You also have the option to file anonymously." }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-5 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 group-hover:text-gov-blue transition-colors">{question}</span>
        <span className={`transform transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180 text-gov-blue' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// --- Home Page View ---
export const HomeView: React.FC<{ onFileGrievance: () => void; onTrack: () => void }> = ({ onFileGrievance, onTrack }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section - Text Only */}
      <section className="relative bg-gradient-to-r from-gov-blue to-blue-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10 flex flex-col items-center text-center">
          
          <div className="space-y-6 max-w-3xl">
            <div className="inline-block px-3 py-1 bg-blue-800 rounded-full text-xs font-semibold tracking-wider uppercase mb-2">
              Official Government Service
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Himachal Pradesh<br />Public Grievance Portal
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mx-auto leading-relaxed">
              Empowering citizens with a transparent, responsive, and accountable grievance redressal system.
            </p>
            <div className="pt-2 text-sm text-blue-200 font-medium">
               Under the guidance of the Ministry of Youth Affairs & Sports
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button variant="secondary" size="lg" onClick={onFileGrievance} className="shadow-lg transform hover:-translate-y-1 transition-transform min-w-[200px]">
                File a Grievance
              </Button>
              <Button variant="outline" size="lg" onClick={onTrack} className="bg-white/10 border-white text-white hover:bg-white/20 min-w-[200px]">
                Track Status
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gov-dark">How It Works</h2>
            <p className="mt-4 text-gray-600">Simple 4-step process to get your grievances resolved</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-gov-blue mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2">1. Login / Register</h3>
                <p className="text-sm text-gray-500">Use your mobile number to securely access the portal.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-gov-blue mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2">2. File Grievance</h3>
                <p className="text-sm text-gray-500">Fill in the details, upload evidence, and submit your complaint.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-gov-blue mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2">3. Track Status</h3>
                <p className="text-sm text-gray-500">Get real-time updates and timelines on your dashboard.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-gov-blue mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2">4. Resolution</h3>
                <p className="text-sm text-gray-500">Receive a resolution report and give your feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-16 bg-gov-lightBlue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gov-dark">Impact at a Glance</h2>
              <p className="mt-4 text-gray-600">Delivering transparent governance across the state</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center border-b-4 border-blue-500">
                <div className="text-4xl font-bold text-gov-blue mb-2">45k+</div>
                <div className="text-gray-600 font-medium">Grievances Filed</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center border-b-4 border-green-500">
                <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                <div className="text-gray-600 font-medium">Resolution Rate</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center border-b-4 border-yellow-500">
                <div className="text-4xl font-bold text-yellow-600 mb-2">15</div>
                <div className="text-gray-600 font-medium">Avg. Days to Resolve</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center border-b-4 border-purple-500">
                <div className="text-4xl font-bold text-purple-600 mb-2">4.5/5</div>
                <div className="text-gray-600 font-medium">Citizen Satisfaction</div>
              </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gov-dark mb-4">Frequently Asked Questions</h2>
             <p className="text-gray-600">Common questions about filing and tracking grievances.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 md:px-8">
            {FAQ_ITEMS.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Grievance Wizard View ---
export const FileGrievanceView: React.FC<{ onSubmit: (g: any) => void }> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    district: '',
    category: '',
    subject: '',
    description: '',
    files: [] as File[],
    isAnonymized: false
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Location & Category</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select 
          label="District" 
          options={DISTRICTS} 
          placeholder="Select District"
          value={formData.district}
          onChange={e => setFormData({...formData, district: e.target.value})} 
        />
        <Input 
          label="Town / Village / Pincode" 
          placeholder="Enter specific location"
          value={formData.location}
          onChange={e => setFormData({...formData, location: e.target.value})}
        />
        <Select 
          label="Grievance Category" 
          options={CATEGORIES} 
          placeholder="Select Category"
          value={formData.category}
          onChange={e => setFormData({...formData, category: e.target.value})}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Details & Evidence</h3>
      <Input 
        label="Subject" 
        placeholder="Brief subject of the grievance"
        value={formData.subject}
        onChange={e => setFormData({...formData, subject: e.target.value})}
      />
      <TextArea 
        label="Description (Max 5000 chars)" 
        rows={6} 
        placeholder="Describe your grievance in detail..."
        maxLength={5000}
        value={formData.description}
        onChange={e => setFormData({...formData, description: e.target.value})}
      />
      <div className="bg-gray-50 p-4 rounded border border-dashed border-gray-300">
        <label className="block text-sm font-semibold mb-2">Upload Supporting Documents (Max 3, 5MB Total)</label>
        <input type="file" multiple className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        <p className="text-xs text-gray-500 mt-1">Supported: PDF, DOC, TXT</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
         <input 
           type="checkbox" 
           id="anonymize" 
           checked={formData.isAnonymized}
           onChange={e => setFormData({...formData, isAnonymized: e.target.checked})}
           className="h-4 w-4 text-gov-blue focus:ring-gov-blue border-gray-300 rounded"
         />
         <label htmlFor="anonymize" className="text-sm text-gray-700">Hide my personal details from the department (Anonymize)</label>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Review & Submit</h3>
      <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
        <p><span className="font-semibold">District:</span> {formData.district}</p>
        <p><span className="font-semibold">Location:</span> {formData.location}</p>
        <p><span className="font-semibold">Category:</span> {formData.category}</p>
        <p><span className="font-semibold">Subject:</span> {formData.subject}</p>
        <p><span className="font-semibold">Description:</span> {formData.description}</p>
        <p><span className="font-semibold">Anonymized:</span> {formData.isAnonymized ? 'Yes' : 'No'}</p>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-sm text-yellow-700">
          By submitting, you certify that the information provided is true to the best of your knowledge.
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-2xl font-bold text-gov-dark">File a Grievance</h2>
             <span className="text-sm text-gray-500">Step {step} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gov-blue h-2.5 rounded-full transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
          </div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="flex justify-between mt-8 pt-4 border-t">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
          {step < 3 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button onClick={() => onSubmit(formData)} variant="secondary">Submit Grievance</Button>
          )}
        </div>
      </Card>
    </div>
  );
};

// --- Track Grievance List View ---
export const TrackGrievanceView: React.FC<{ user: User; onViewDetails: (g: Grievance) => void }> = ({ user, onViewDetails }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(`hp_grievances_${user.mobile}`);
    if (data) {
      try {
        setGrievances(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse grievances", e);
      }
    }
  }, [user.mobile]);

  if (grievances.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No grievances found</h2>
        <p className="text-gray-500 mb-8">You haven't filed any grievances with this account yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-gov-dark mb-6">My Grievances</h2>
      <div className="space-y-4">
        {grievances.map(g => (
          <Card key={g.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gov-blue transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{g.id}</span>
                <Badge type={g.status === 'Resolved' ? 'success' : g.status === 'Rejected' ? 'danger' : 'warning'}>{g.status}</Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{g.subject}</h3>
              <p className="text-sm text-gray-500">Last Updated: {new Date(g.lastUpdated).toLocaleDateString()}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onViewDetails(g)}>View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// --- Grievance Details View ---
export const GrievanceDetailsView: React.FC<{ grievance: Grievance; onBack: () => void; onReply: (msg: string) => void }> = ({ grievance, onBack, onReply }) => {
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    onReply(replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-gov-blue mb-6">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to list
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{grievance.subject}</h1>
                <p className="text-sm text-gray-500 mt-1">Filed on {new Date(grievance.dateFiled).toLocaleDateString()} • {grievance.category}</p>
              </div>
              <Badge type={grievance.status === 'Resolved' ? 'success' : 'warning'}>{grievance.status}</Badge>
            </div>
            
            <div className="prose text-gray-700 text-sm bg-gray-50 p-4 rounded border border-gray-100 mb-6">
              {grievance.description}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
               <div><span className="font-semibold block text-gray-500">District</span> {grievance.district}</div>
               <div><span className="font-semibold block text-gray-500">Location</span> {grievance.location}</div>
            </div>
          </Card>

          {/* Reply Section */}
          <Card>
             <h3 className="text-lg font-semibold mb-4">Communication History</h3>
             
             {grievance.replies && grievance.replies.length > 0 ? (
               <div className="space-y-4 mb-6">
                 {grievance.replies.map((reply, idx) => (
                   <div key={idx} className={`flex flex-col ${reply.author === 'You' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${reply.author === 'You' ? 'bg-blue-50 text-blue-900 rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                         <p>{reply.message}</p>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">{reply.author} • {new Date(reply.date).toLocaleString()}</span>
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-sm text-gray-400 italic mb-6">No comments yet.</p>
             )}

             <div className="mt-4">
               <TextArea 
                 placeholder="Type a message to the department..." 
                 value={replyText}
                 onChange={e => setReplyText(e.target.value)}
                 className="mb-2"
               />
               <div className="flex justify-end">
                 <Button size="sm" onClick={handleSubmitReply} disabled={!replyText.trim()}>Send Message</Button>
               </div>
             </div>
          </Card>
        </div>

        {/* Right Col: Timeline */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="text-lg font-semibold mb-6">Status Timeline</h3>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-2">
              {grievance.timeline && grievance.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                    event.status === 'completed' ? 'border-green-500 bg-green-500' : 
                    event.status === 'current' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                  }`}></div>
                  <div className={`${event.status === 'pending' ? 'opacity-50' : ''}`}>
                    <p className="text-sm font-bold text-gray-900">{event.label}</p>
                    <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard View (GRO) ---
export const GRODashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'new' | 'pending' | 'resolved'>('new');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  // In a real app, the GRO would fetch all grievances from a backend. 
  // For this demo, we use the mock constant + we could theoretically read from LS if we wanted 
  // but LS is client-scoped. So we stick to MOCK_GRIEVANCES for the Dashboard demo.
  const filteredGrievances = MOCK_GRIEVANCES.filter(g => {
    // Map status loosely for demo
    if (selectedTab === 'new') return g.status === 'Submitted' || g.status === GrievanceStatus.SUBMITTED;
    if (selectedTab === 'pending') return g.status === 'Pending' || g.status === 'Reopened' || g.status === GrievanceStatus.PENDING;
    return g.status === 'Resolved' || g.status === GrievanceStatus.RESOLVED;
  });

  const openATR = (g: Grievance) => {
    setSelectedGrievance(g);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gov-dark">Nodal Officer Dashboard</h2>
        <Button variant="outline" size="sm">Export Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <Card className="bg-blue-50 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-700">12</div>
            <div className="text-sm text-gray-600">New Grievances</div>
         </Card>
         <Card className="bg-yellow-50 border-l-4 border-yellow-500">
            <div className="text-3xl font-bold text-yellow-700">5</div>
            <div className="text-sm text-gray-600">Pending (>7 Days)</div>
         </Card>
         <Card className="bg-green-50 border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-700">48</div>
            <div className="text-sm text-gray-600">Resolved this Month</div>
         </Card>
         <Card className="bg-red-50 border-l-4 border-red-500">
            <div className="text-3xl font-bold text-red-700">2</div>
            <div className="text-sm text-gray-600">Reopened</div>
         </Card>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="flex border-b">
           {['new', 'pending', 'resolved'].map(tab => (
             <button 
               key={tab}
               className={`px-6 py-3 text-sm font-medium capitalize ${selectedTab === tab ? 'text-gov-blue border-b-2 border-gov-blue bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
               onClick={() => setSelectedTab(tab as any)}
             >
               {tab}
             </button>
           ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrievances.map(g => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gov-blue">{g.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{g.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{g.dateFiled}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{g.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge type={g.status === 'Resolved' ? 'success' : g.status === 'Pending' ? 'warning' : 'info'}>{g.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openATR(g)} className="text-gov-blue hover:text-blue-900">Process</button>
                  </td>
                </tr>
              ))}
              {filteredGrievances.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No grievances found in this category.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Action Taken Report (ATR)">
        {selectedGrievance && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded text-sm">
               <p className="font-bold">{selectedGrievance.id}: {selectedGrievance.subject}</p>
               <p className="mt-1 text-gray-600">{selectedGrievance.description}</p>
            </div>
            <Select label="New Status" options={['Pending', 'Resolved', 'Rejected', 'Forwarded']} />
            <TextArea label="Remarks / Action Taken" rows={4} placeholder="Describe the action taken..." />
            <div className="flex gap-2">
               <input type="checkbox" id="notify" className="mt-1" />
               <label htmlFor="notify" className="text-sm">Notify citizen via SMS/Email</label>
            </div>
            <div className="pt-4 flex justify-end gap-2">
               <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
               <Button onClick={() => { alert("ATR Submitted!"); setModalOpen(false); }}>Submit ATR</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// --- Authentication Wizard ---
export const AuthWizard: React.FC<{ onAuthenticated: (user: User) => void }> = ({ onAuthenticated }) => {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (mobile.length !== 10 || isNaN(Number(mobile))) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError('');
    // Generate 4 digit mock OTP
    const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(mockOtp);
    setStep('otp');
  };

  const handleVerify = () => {
    if (otp === generatedOtp) {
       const user: User = {
         id: mobile,
         name: 'Citizen User',
         role: UserRole.CITIZEN,
         mobile: mobile
       };
       onAuthenticated(user);
    } else {
       setError("Incorrect OTP. Please try again.");
    }
  };

  const handleOfficerDemo = () => {
    const officer: User = {
      id: 'admin',
      name: 'Nodal Officer',
      role: UserRole.GRO,
      mobile: '9999999999'
    };
    onAuthenticated(officer);
  };

  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gov-dark">Citizen Login</h3>
        <p className="text-sm text-gray-500 mt-1">Access your grievances securely</p>
      </div>
      
      {step === 'mobile' ? (
        <div className="space-y-4">
          <Input 
            label="Mobile Number" 
            placeholder="Enter 10-digit mobile number" 
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            error={error}
          />
          <Button fullWidth onClick={handleSendOtp}>Get OTP</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded text-sm mb-4">
             <p className="font-bold text-xs uppercase tracking-wide mb-1">Demo Environment</p>
             <p>Your One-Time Password is: <span className="font-mono font-bold text-lg ml-2">{generatedOtp}</span></p>
          </div>
          <Input 
            label="Enter OTP" 
            placeholder="Enter 4-digit OTP" 
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={error}
          />
          <Button fullWidth onClick={handleVerify}>Verify & Login</Button>
          <button onClick={() => setStep('mobile')} className="w-full text-center text-sm text-gov-blue mt-2 hover:underline">Change Mobile Number</button>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t text-center">
        <button onClick={handleOfficerDemo} className="text-xs text-gray-400 hover:text-gray-600">
          (Demo Only) Login as Nodal Officer
        </button>
      </div>
    </div>
  );
};