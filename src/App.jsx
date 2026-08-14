import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageHeader from './components/PageHeader';
import Dashboard from './pages/Dashboard';
import AllLetters from './pages/AllLetters';
import LetterForm from './pages/LetterForm';
import ViewLetter from './pages/ViewLetter';
import PreviewLetter from './pages/PreviewLetter';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { storage, STORAGE_KEYS } from './utils/storage';
import { normalizeLetters, normalizeProfile, normalizeSettings, generateId, generateLetterName } from './utils/helpers';
import { sampleLetters, sampleProfile, sampleSettings } from './utils/sampleData';

// Wrapper component for edit route to access params
const EditLetterWrapper = ({ letters, onSave }) => {
  const { id } = useParams();
  const existingLetter = letters.find(l => l.id === id);
  
  return (
    <>
      <PageHeader title="Edit Cover Letter" />
      <div className="container-fluid">
        <LetterForm 
          letters={letters}
          onSave={onSave}
          existingLetter={existingLetter}
        />
      </div>
    </>
  );
};

// Wrapper component for AllLetters route to handle navigation
const AllLettersWrapper = ({ letters, onDelete, onDuplicate }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <PageHeader 
        title="Cover Letters" 
        subtitle="View and manage all your cover letters"
        actions={
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/letters/new')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            New Letter
          </button>
        }
      />
      <div className="container-fluid">
        <AllLetters 
          letters={letters} 
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      </div>
    </>
  );
};

function App() {
  const [letters, setLetters] = useState([]);
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    try {
      // Check if first run
      const isFirstRun = !storage.get(STORAGE_KEYS.FIRST_RUN);

      // Load or initialize letters
      const storedLetters = storage.get(STORAGE_KEYS.LETTERS);
      if (isFirstRun && !storedLetters) {
        storage.set(STORAGE_KEYS.LETTERS, sampleLetters);
        storage.set(STORAGE_KEYS.FIRST_RUN, 'false');
        setLetters(normalizeLetters(sampleLetters));
      } else {
        setLetters(normalizeLetters(storedLetters || []));
      }

      // Load or initialize profile
      const storedProfile = storage.get(STORAGE_KEYS.PROFILE);
      setProfile(normalizeProfile(storedProfile));

      // Load or initialize settings
      const storedSettings = storage.get(STORAGE_KEYS.SETTINGS);
      setSettings(normalizeSettings(storedSettings));

      setLoading(false);
    } catch (error) {
      console.error('Error initializing data:', error);
      // Initialize with empty data on error
      setLetters([]);
      setProfile(normalizeProfile(null));
      setSettings(normalizeSettings(null));
      setLoading(false);
    }
  };

  const saveLetter = (letter) => {
    try {
      const normalizedLetter = { ...letter, updatedAt: new Date().toISOString() };
      const existingIndex = letters.findIndex(l => l.id === letter.id);
      
      let updatedLetters;
      if (existingIndex >= 0) {
        updatedLetters = [...letters];
        updatedLetters[existingIndex] = normalizedLetter;
      } else {
        updatedLetters = [...letters, normalizedLetter];
      }

      setLetters(updatedLetters);
      storage.set(STORAGE_KEYS.LETTERS, updatedLetters);
      return true;
    } catch (error) {
      console.error('Error saving letter:', error);
      return false;
    }
  };

  const deleteLetter = (id) => {
    try {
      const updatedLetters = letters.filter(l => l.id !== id);
      setLetters(updatedLetters);
      storage.set(STORAGE_KEYS.LETTERS, updatedLetters);
      return true;
    } catch (error) {
      console.error('Error deleting letter:', error);
      return false;
    }
  };

  const duplicateLetter = (id) => {
    try {
      const originalLetter = letters.find(l => l.id === id);
      if (!originalLetter) return false;

      const duplicatedLetter = {
        ...originalLetter,
        id: generateId(),
        name: `${originalLetter.name} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedLetters = [...letters, duplicatedLetter];
      setLetters(updatedLetters);
      storage.set(STORAGE_KEYS.LETTERS, updatedLetters);
      return true;
    } catch (error) {
      console.error('Error duplicating letter:', error);
      return false;
    }
  };

  const updateProfile = (newProfile) => {
    try {
      setProfile(newProfile);
      storage.set(STORAGE_KEYS.PROFILE, newProfile);
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  const updateSettings = (newSettings) => {
    try {
      setSettings(newSettings);
      storage.set(STORAGE_KEYS.SETTINGS, newSettings);
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <PageHeader 
                  title="Dashboard" 
                  subtitle="Manage your cover letters"
                />
                <div className="container-fluid">
                  <Dashboard letters={letters} />
                </div>
              </>
            } />
            
            <Route path="/letters" element={
              <AllLettersWrapper 
                letters={letters} 
                onDelete={deleteLetter}
                onDuplicate={duplicateLetter}
              />
            } />
            
            <Route path="/letters/new" element={
              <>
                <PageHeader 
                  title="Create Cover Letter" 
                  subtitle="Fill in the details to create a new cover letter"
                />
                <div className="container-fluid">
                  <LetterForm 
                    letters={letters}
                    onSave={saveLetter}
                    existingLetter={null}
                  />
                </div>
              </>
            } />
            
            <Route path="/letters/:id" element={
              <>
                <PageHeader title="View Cover Letter" />
                <div className="container-fluid">
                  <ViewLetter 
                    letters={letters}
                    onDelete={deleteLetter}
                    onDuplicate={duplicateLetter}
                  />
                </div>
              </>
            } />
            
            <Route path="/letters/:id/edit" element={
              <EditLetterWrapper 
                letters={letters}
                onSave={saveLetter}
              />
            } />
            
            <Route path="/letters/:id/preview" element={
              <>
                <div className="container-fluid">
                  <PreviewLetter letters={letters} />
                </div>
              </>
            } />
            
            <Route path="/settings" element={
              <>
                <PageHeader 
                  title="Settings" 
                  subtitle="Manage your profile and application settings"
                />
                <div className="container-fluid">
                  <Settings 
                    profile={profile}
                    settings={settings}
                    onProfileUpdate={updateProfile}
                    onSettingsUpdate={updateSettings}
                  />
                </div>
              </>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
