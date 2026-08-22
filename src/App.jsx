import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PracticeMode from './components/PracticeMode';
import MockTestMode from './components/MockTestMode';
import DownloadsHub from './components/DownloadsHub';
import CustomTestCreator from './components/CustomTestCreator';
import CustomPracticePool from './components/CustomPracticePool';
import FeedbackForum from './components/FeedbackForum';
import SyllabusTracker from './components/SyllabusTracker';
import FormulaSheet from './components/FormulaSheet';
import RevisionBank from './components/RevisionBank';
import ImportantConcepts from './components/ImportantConcepts';
import CreatorPage from './components/CreatorPage';
import ScientificCalculator from './components/ScientificCalculator';
import TestResultModal from './components/TestResultModal';

import initialQuestions from './data/questions.json';
import initialMockPapers from './data/mock_papers.json';
import preloadedCustomMock01 from './data/custom_mock_2027_01.json';
import preloadedCustomMock02 from './data/custom_mock_2027_02.json';
import preloadedCustomMock03 from './data/custom_mock_2027_03.json';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const validTabs = ['dashboard', 'practice', 'custompractice', 'mocktest', 'feedback', 'concepts', 'downloads', 'customtest', 'syllabus', 'formulas', 'revision', 'creator'];
      if (validTabs.includes(hash)) {
        return hash;
      }
    } catch (e) {
      // fallback
    }
    return 'dashboard';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const validTabs = ['dashboard', 'practice', 'custompractice', 'mocktest', 'feedback', 'concepts', 'downloads', 'customtest', 'syllabus', 'formulas', 'revision', 'creator'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('gate_ag_theme') || 'cyber-dark';
    } catch (e) {
      return 'cyber-dark';
    }
  });
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  
  const [practiceSection, setPracticeSection] = useState('All');
  const [customTestPaper, setCustomTestPaper] = useState(null);
  const [directLaunchPaper, setDirectLaunchPaper] = useState(null);
  const [testResult, setTestResult] = useState(null);

  const [userUploadedMocks, setUserUploadedMocks] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_custom_uploaded_mocks');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (e) {
      return [];
    }
  });

  const allCustomMockPapers = [
    preloadedCustomMock01,
    preloadedCustomMock02,
    preloadedCustomMock03,
    ...userUploadedMocks
  ];

  useEffect(() => {
    localStorage.setItem('gate_ag_custom_uploaded_mocks', JSON.stringify(userUploadedMocks));
  }, [userUploadedMocks]);

  const handleUploadCustomMock = (newPaper) => {
    setUserUploadedMocks(prev => [newPaper, ...prev.filter(p => p.id !== newPaper.id)]);
  };

  const handleDeleteCustomMock = (paperId) => {
    if (['GATE_2027_MOCK_01', 'GATE_2027_MOCK_02', 'GATE_2027_MOCK_03'].includes(paperId)) return; // Pre-loaded cannot be deleted
    setUserUploadedMocks(prev => prev.filter(p => p.id !== paperId));
  };

  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_user_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          attempted: Array.isArray(parsed?.attempted) ? parsed.attempted : [],
          correct: Array.isArray(parsed?.correct) ? parsed.correct : [],
          testHistory: Array.isArray(parsed?.testHistory) ? parsed.testHistory : []
        };
      }
      return { attempted: [], correct: [], testHistory: [] };
    } catch (e) {
      return { attempted: [], correct: [], testHistory: [] };
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_bookmarks');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (e) {
      return [];
    }
  });

  const [syllabusProgress, setSyllabusProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed === 'object' && parsed !== null ? parsed : {};
      }
      return {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('gate_ag_theme', currentTheme);
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-cyber-dark', 'theme-forest-emerald', 'theme-midnight-amethyst', 'theme-slate-light');
    
    if (currentTheme !== 'slate-light') {
      root.classList.add('dark', `theme-${currentTheme}`);
    } else {
      root.classList.add('theme-slate-light');
    }
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('gate_ag_user_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('gate_ag_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('gate_ag_progress', JSON.stringify(syllabusProgress));
  }, [syllabusProgress]);

  const handleToggleBookmark = (qId) => {
    if (bookmarks.includes(qId)) {
      setBookmarks(bookmarks.filter(id => id !== qId));
    } else {
      setBookmarks([...bookmarks, qId]);
    }
  };

  const handleUpdateSyllabusProgress = (key, status) => {
    setSyllabusProgress({ ...syllabusProgress, [key]: status });
  };

  const handleStartSectionPractice = (secName) => {
    setPracticeSection(secName);
    setActiveTab('practice');
  };

  const handleStartMock = (target) => {
    if (target && typeof target === 'object') {
      handleStartCustomTest(target);
      return;
    }
    if (target) {
      const paperObj = initialMockPapers.find(p => String(p.year) === String(target));
      if (paperObj) {
        setCustomTestPaper(null);
        setDirectLaunchPaper({ ...paperObj, _launchId: Date.now() });
      }
    }
    setActiveTab('mocktest');
  };

  const handleStartCustomTest = (customPaperObj) => {
    setDirectLaunchPaper(null);
    setCustomTestPaper({ ...customPaperObj, _launchId: Date.now() });
    setActiveTab('mocktest');
  };

  const handleFinishTest = (resultData) => {
    setTestResult(resultData);

    const newHistory = [
      {
        year: resultData.year,
        score: resultData.score,
        correctCount: resultData.correctCount,
        incorrectCount: resultData.incorrectCount,
        unattemptedCount: resultData.unattemptedCount,
        date: new Date().toISOString()
      },
      ...(userStats?.testHistory || [])
    ];

    setUserStats(prev => ({
      ...prev,
      testHistory: newHistory
    }));
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors font-sans">
      
      {/* Minimalist Slim Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        onOpenCalc={() => setIsCalcOpen(true)}
      />

      {/* Main Wide Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 pt-20 sm:pt-8 pb-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              questions={initialQuestions}
              mockPapers={initialMockPapers}
              userStats={userStats}
              onStartMock={handleStartMock}
              onStartSectionPractice={handleStartSectionPractice}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeMode
              questions={initialQuestions}
              customMockPapers={allCustomMockPapers}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              initialSection={practiceSection}
              onOpenCalc={() => setIsCalcOpen(true)}
            />
          )}

          {activeTab === 'mocktest' && (
            <MockTestMode
              mockPapers={initialMockPapers}
              customMockPapers={allCustomMockPapers}
              customPaper={customTestPaper}
              directLaunchPaper={directLaunchPaper}
              onOpenCalc={() => setIsCalcOpen(true)}
              onFinishTest={handleFinishTest}
            />
          )}

          {activeTab === 'custompractice' && (
            <CustomPracticePool
              customMockPapers={allCustomMockPapers}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onOpenCalc={() => setIsCalcOpen(true)}
            />
          )}

          {activeTab === 'feedback' && (
            <FeedbackForum />
          )}

          {activeTab === 'concepts' && (
            <ImportantConcepts />
          )}

          {activeTab === 'downloads' && (
            <DownloadsHub
              customMockPapers={allCustomMockPapers}
              onStartMock={handleStartMock}
              onDeleteMock={handleDeleteCustomMock}
            />
          )}

          {activeTab === 'customtest' && (
            <CustomTestCreator
              questions={initialQuestions}
              mockPapers={initialMockPapers}
              onStartCustomTest={handleStartCustomTest}
              onOpenCalc={() => setIsCalcOpen(true)}
            />
          )}

          {activeTab === 'syllabus' && (
            <SyllabusTracker
              userProgress={syllabusProgress}
              onUpdateProgress={handleUpdateSyllabusProgress}
              onStartSectionPractice={handleStartSectionPractice}
            />
          )}

          {activeTab === 'revision' && (
            <RevisionBank
              questions={initialQuestions}
              userStats={userStats}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onOpenCalc={() => setIsCalcOpen(true)}
            />
          )}

          {activeTab === 'formulas' && (
            <FormulaSheet
              onOpenCalc={() => setIsCalcOpen(true)}
            />
          )}

          {activeTab === 'creator' && (
            <CreatorPage />
          )}
        </main>

        <footer className="border-t border-[#E7E2D9] dark:border-[#2A2723] bg-white dark:bg-[#1A1917] py-6 px-6 text-center text-xs text-[#78716C] dark:text-[#A8A29E] space-y-3">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
            <div className="text-left space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-200">
                GATE Agricultural Engineering Practice Portal
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Grateful acknowledgement to the official GATE Organising Institutes (IITs & IISc) for official Question Papers & Answer Keys (2007–2026).
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-1.5 font-mono text-[11px]">
              <div className="flex items-center flex-wrap gap-3 md:justify-end">
                <button 
                  onClick={() => setActiveTab('feedback')} 
                  className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-extrabold hover:bg-emerald-600 hover:text-white transition"
                >
                  💬 Report Issue on WhatsApp
                </button>
                <button 
                  onClick={() => setActiveTab('creator')} 
                  className="font-extrabold text-amber-600 dark:text-amber-400 hover:underline transition"
                >
                  Crafted by Raghav Bansal • Made for his dear juniors • Run in browser
                </button>
              </div>
              <span className="text-slate-400">
                © {new Date().getFullYear()} GATE AG Prep • All Rights Reserved
              </span>
            </div>
          </div>
        </footer>
      </div>

      <ScientificCalculator
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
      />

      {testResult && (
        <TestResultModal
          result={testResult}
          onClose={() => setTestResult(null)}
          onRetake={() => {
            setTestResult(null);
            setActiveTab('mocktest');
          }}
        />
      )}

    </div>
  );
}
