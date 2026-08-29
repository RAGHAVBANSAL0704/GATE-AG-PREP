import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
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
import QuestionEditorModal from './components/QuestionEditorModal';
import AdminQuestionManager from './components/AdminQuestionManager';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import SupportPage from './components/SupportPage';
import GamesZone from './components/GamesZone';
import PracticeHub from './components/PracticeHub';
import LearningHub from './components/LearningHub';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';

import { checkCurrentSession, logoutStudent } from './services/authService';
import { initAutoSyncOnReconnect } from './services/testAttemptService';
import { saveToIDB } from './utils/indexedDB';

import initialQuestions from './data/questions.json';
import initialMockPapers from './data/mock_papers.json';
import preloadedCustomMock01 from './data/custom_mock_2027_01.json';
import preloadedCustomMock02 from './data/custom_mock_2027_02.json';
import preloadedCustomMock03 from './data/custom_mock_2027_03.json';
import preloadedCustomMock04 from './data/custom_mock_2027_04.json';
import preloadedCustomMock05 from './data/custom_mock_2027_05.json';
import preloadedCustomMock06 from './data/custom_mock_2027_06.json';
import preloadedCustomMock07 from './data/custom_mock_2027_07.json';
import preloadedCustomMock08 from './data/custom_mock_2027_08.json';
import preloadedCustomMock09 from './data/custom_mock_2027_09.json';
import preloadedCustomMock10 from './data/custom_mock_2027_10.json';
import preloadedCustomMock11 from './data/custom_mock_2027_11.json';
import preloadedCustomMock12 from './data/custom_mock_2027_12.json';
import preloadedCustomMock13 from './data/custom_mock_2027_13.json';
import preloadedCustomMock14 from './data/custom_mock_2027_14.json';
import preloadedCustomMock15 from './data/custom_mock_2027_15.json';
import preloadedCustomMock16 from './data/custom_mock_2027_16.json';
import preloadedCustomMock17 from './data/custom_mock_2027_17.json';
import preloadedCustomMock18 from './data/custom_mock_2027_18.json';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const validTabs = ['dashboard', 'practicehub', 'practice', 'custompractice', 'customtest', 'learninghub', 'concepts', 'simulators', 'flashcards', 'chat', 'qa', 'revision', 'formulas', 'mocktest', 'games', 'admin', 'feedback', 'downloads', 'syllabus', 'creator', 'support'];
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
      const validTabs = ['dashboard', 'practicehub', 'practice', 'custompractice', 'customtest', 'learninghub', 'concepts', 'simulators', 'flashcards', 'chat', 'qa', 'revision', 'formulas', 'mocktest', 'games', 'admin', 'feedback', 'downloads', 'syllabus', 'creator', 'support'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const cleanup = initAutoSyncOnReconnect();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const [currentStudent, setCurrentStudent] = useState(() => checkCurrentSession());
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logoutStudent();
    setCurrentStudent(null);
    setIsProfileOpen(false);
  };

  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('gate_ag_theme') || 'cyber-dark';
    } catch (e) {
      return 'cyber-dark';
    }
  });

  useEffect(() => {
    localStorage.setItem('gate_ag_theme', currentTheme);
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-cyber-dark', 'theme-slate-light');

    if (currentTheme === 'cyber-dark') {
      root.classList.add('dark', 'theme-cyber-dark');
    } else {
      root.classList.add('theme-slate-light');
    }
  }, [currentTheme]);

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
    preloadedCustomMock04,
    preloadedCustomMock05,
    preloadedCustomMock06,
    preloadedCustomMock07,
    preloadedCustomMock08,
    preloadedCustomMock09,
    preloadedCustomMock10,
    preloadedCustomMock11,
    preloadedCustomMock12,
    preloadedCustomMock13,
    preloadedCustomMock14,
    preloadedCustomMock15,
    preloadedCustomMock16,
    preloadedCustomMock17,
    preloadedCustomMock18,
    ...userUploadedMocks
  ];

  const [editedQuestionsMap, setEditedQuestionsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_edited_questions_map');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    localStorage.setItem('gate_ag_edited_questions_map', JSON.stringify(editedQuestionsMap));
  }, [editedQuestionsMap]);

  const handleSaveEditedQuestion = (updatedQ) => {
    setEditedQuestionsMap(prev => {
      const nextMap = { ...prev, [updatedQ.id]: updatedQ };
      try {
        localStorage.setItem('gate_ag_edited_questions_map', JSON.stringify(nextMap));
      } catch (e) {}
      return nextMap;
    });
    saveToIDB('edited_questions', updatedQ);
  };

  // Dynamically apply manual question edits across all question pools
  const questions = useMemo(() => {
    const existingIds = new Set(initialQuestions.map(q => q.id));
    const baseQuestions = initialQuestions.map(q => editedQuestionsMap[q.id] || q);
    
    // Include newly created questions saved in editedQuestionsMap
    const newlyAddedQuestions = Object.values(editedQuestionsMap).filter(q => q && q.id && !existingIds.has(q.id));
    
    return [...baseQuestions, ...newlyAddedQuestions];
  }, [editedQuestionsMap]);

  const mockPapers = useMemo(() => {
    return initialMockPapers.map(paper => ({
      ...paper,
      questions: (paper.questions || []).map(q => editedQuestionsMap[q.id] || q)
    }));
  }, [editedQuestionsMap]);

  const customMockPapers = useMemo(() => {
    return allCustomMockPapers.map(paper => ({
      ...paper,
      questions: (paper.questions || []).map(q => editedQuestionsMap[q.id] || q)
    }));
  }, [allCustomMockPapers, editedQuestionsMap]);

  useEffect(() => {
    localStorage.setItem('gate_ag_custom_uploaded_mocks', JSON.stringify(userUploadedMocks));
  }, [userUploadedMocks]);

  const handleUploadCustomMock = (newPaper) => {
    setUserUploadedMocks(prev => [newPaper, ...prev.filter(p => p.id !== newPaper.id)]);
  };

  const handleDeleteCustomMock = (paperId) => {
    if (paperId && paperId.startsWith('GATE_2027_MOCK_')) return; // Pre-loaded cannot be deleted
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
    <div className="min-h-screen flex text-slate-900 dark:text-slate-100 transition-colors font-sans">
      
      {/* Strict Access Modal: Rendered if not logged in */}
      {!currentStudent && (
        <AuthModal onLoginSuccess={(student) => setCurrentStudent(student)} />
      )}

      {/* Single Unified Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        onOpenCalc={() => setIsCalcOpen(true)}
        currentStudent={currentStudent}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Wide Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 max-w-7xl 2xl:max-w-[1500px] w-full mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-6 pb-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              questions={questions}
              mockPapers={mockPapers}
              customMockPapers={customMockPapers}
              userStats={userStats}
              onStartMock={handleStartMock}
              onStartSectionPractice={handleStartSectionPractice}
              setActiveTab={setActiveTab}
            />
          )}

          {['practicehub', 'practice', 'custompractice', 'customtest'].includes(activeTab) && (
            <PracticeHub
              activeSubTab={activeTab === 'practicehub' ? 'practice' : activeTab}
              onSubTabChange={(subTab) => setActiveTab(subTab)}
              questions={questions}
              customMockPapers={customMockPapers}
              mockPapers={mockPapers}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              practiceSection={practiceSection}
              onOpenCalc={() => setIsCalcOpen(true)}
              onEditQuestion={(q) => setEditingQuestion(q)}
              onStartCustomTest={handleStartCustomTest}
            />
          )}

          {['learninghub', 'concepts', 'simulators', 'flashcards', 'chat', 'qa', 'revision', 'formulas'].includes(activeTab) && (
            <LearningHub
              activeSubTab={activeTab === 'learninghub' ? 'concepts' : activeTab}
              onSubTabChange={(subTab) => setActiveTab(subTab)}
              questions={questions}
              customMockPapers={customMockPapers}
              userStats={userStats}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onOpenCalc={() => setIsCalcOpen(true)}
              onEditQuestion={(q) => setEditingQuestion(q)}
              currentStudent={currentStudent}
            />
          )}

          {activeTab === 'mocktest' && (
            <MockTestMode
              mockPapers={mockPapers}
              customMockPapers={customMockPapers}
              customPaper={customTestPaper}
              directLaunchPaper={directLaunchPaper}
              onOpenCalc={() => setIsCalcOpen(true)}
              onFinishTest={handleFinishTest}
              onEditQuestion={(q) => setEditingQuestion(q)}
              currentStudent={currentStudent}
            />
          )}

          {activeTab === 'analytics' && (
            <PerformanceAnalytics 
              currentStudent={currentStudent} 
              questions={questions} 
            />
          )}

          {activeTab === 'leaderboard' && (
            <Leaderboard 
              currentStudent={currentStudent} 
            />
          )}

          {activeTab === 'admin' && (
            <AdminQuestionManager
              questions={questions}
              mockPapers={mockPapers}
              customMockPapers={customMockPapers}
              editedQuestionsMap={editedQuestionsMap}
              onSaveEditedQuestion={handleSaveEditedQuestion}
              onOpenCalc={() => setIsCalcOpen(true)}
            />
          )}

          {activeTab === 'feedback' && (
            <FeedbackForum />
          )}

          {activeTab === 'downloads' && (
            <DownloadsHub
              customMockPapers={customMockPapers}
              onStartMock={handleStartMock}
              onDeleteMock={handleDeleteCustomMock}
            />
          )}

          {activeTab === 'syllabus' && (
            <SyllabusTracker
              userProgress={syllabusProgress}
              onUpdateProgress={handleUpdateSyllabusProgress}
              onStartSectionPractice={handleStartSectionPractice}
            />
          )}

          {activeTab === 'support' && (
            <SupportPage currentStudent={currentStudent} />
          )}

          {activeTab === 'games' && (
            <GamesZone />
          )}

          {activeTab === 'creator' && (
            <CreatorPage />
          )}
        </main>
        <Footer setActiveTab={setActiveTab} />
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

      {editingQuestion && (
        <QuestionEditorModal
          question={editingQuestion}
          onSave={handleSaveEditedQuestion}
          onClose={() => setEditingQuestion(null)}
        />
      )}

      {isProfileOpen && currentStudent && (
        <UserProfileModal
          student={currentStudent}
          onClose={() => setIsProfileOpen(false)}
          onProfileUpdated={(updatedStudent) => setCurrentStudent(updatedStudent)}
        />
      )}

    </div>
  );
}
