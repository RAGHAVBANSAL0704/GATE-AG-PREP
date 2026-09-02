import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PracticeHub from './components/PracticeHub';
import Footer from './components/Footer';
import CommandPaletteModal from './components/CommandPaletteModal';
import ThemeSelectorModal from './components/ThemeSelectorModal';
import { Sparkles } from 'lucide-react';

// Robust lazy loading wrapper that auto-reloads the page if a chunk is missing due to a new deployment
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    const pageHasBeenRefreshed = JSON.parse(
      window.sessionStorage?.getItem('gate_ag_chunk_refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage?.setItem('gate_ag_chunk_refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasBeenRefreshed) {
        window.sessionStorage?.setItem('gate_ag_chunk_refreshed', 'true');
        window.location.reload();
        return { default: () => null };
      }
      throw error;
    }
  });
}

// Code-split heavy sub-tabs for ultra-fast initial page load (< 200ms) with deployment resilience
const MockTestMode = lazyWithRetry(() => import('./components/MockTestMode'));
const LearningHub = lazyWithRetry(() => import('./components/LearningHub'));
const CommunityHub = lazyWithRetry(() => import('./components/CommunityHub'));
const CreatorAdminHQ = lazyWithRetry(() => import('./components/CreatorAdminHQ'));
const PerformanceAnalytics = lazyWithRetry(() => import('./components/PerformanceAnalytics'));
const Leaderboard = lazyWithRetry(() => import('./components/Leaderboard'));
const FeedbackForum = lazyWithRetry(() => import('./components/FeedbackForum'));
const DownloadsHub = lazyWithRetry(() => import('./components/DownloadsHub'));
const SyllabusTracker = lazyWithRetry(() => import('./components/SyllabusTracker'));
const GamesZone = lazyWithRetry(() => import('./components/GamesZone'));
const ScientificCalculator = lazyWithRetry(() => import('./components/ScientificCalculator'));
const TestResultModal = lazyWithRetry(() => import('./components/TestResultModal'));
const QuestionEditorModal = lazyWithRetry(() => import('./components/QuestionEditorModal'));
const AuthModal = lazyWithRetry(() => import('./components/AuthModal'));
const UserProfileModal = lazyWithRetry(() => import('./components/UserProfileModal'));

function TabLoadingSkeleton() {
  return (
    <div className="p-8 space-y-4 max-w-4xl mx-auto animate-pulse">
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-2xl w-1/3"></div>
      <div className="h-32 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl"></div>
        <div className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl"></div>
        <div className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl"></div>
      </div>
    </div>
  );
}

import { checkCurrentSession, logoutStudent } from './services/authService';
import { initAutoSyncOnReconnect } from './services/testAttemptService';
import { saveAndBroadcastQuestion, subscribeToLiveQuestionSync } from './services/questionSyncService';
import { subscribeToLiveRoleSync } from './services/userRoleService';
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
      const validTabs = ['dashboard', 'practicehub', 'practice', 'custompractice', 'customtest', 'learninghub', 'concepts', 'simulators', 'flashcards', 'community', 'chat', 'qa', 'discussions', 'ai_tutor', 'aisolver', 'aitutor', 'revision', 'formulas', 'mocktest', 'games', 'admin', 'feedback', 'downloads', 'syllabus', 'creator', 'support', 'hq'];
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
      const validTabs = ['dashboard', 'practicehub', 'practice', 'custompractice', 'customtest', 'learninghub', 'concepts', 'simulators', 'flashcards', 'community', 'chat', 'qa', 'discussions', 'ai_tutor', 'aisolver', 'aitutor', 'revision', 'formulas', 'mocktest', 'games', 'admin', 'feedback', 'downloads', 'syllabus', 'creator', 'support', 'hq'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const cleanup = initAutoSyncOnReconnect();
    const handleSwUpdate = (e) => {
      const registration = e?.detail;
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      setTimeout(() => {
        window.location.reload();
      }, 200);
    };
    window.addEventListener('sw-updated', handleSwUpdate);
    return () => {
      if (typeof cleanup === 'function') cleanup();
      window.removeEventListener('sw-updated', handleSwUpdate);
    };
  }, []);

  const [currentStudent, setCurrentStudent] = useState(() => checkCurrentSession());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    const session = checkCurrentSession();
    if (session) return false;
    try {
      if (localStorage.getItem('gate_ag_guest_mode') === 'true') {
        return false;
      }
    } catch (e) {}
    return true;
  });
  const [authModalReason, setAuthModalReason] = useState('');

  const handleContinueAsGuest = () => {
    try {
      localStorage.setItem('gate_ag_guest_mode', 'true');
    } catch (e) {}
    setIsAuthModalOpen(false);
    setAuthModalReason('');
  };

  const handleOpenAuth = (reason = '') => {
    setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (student) => {
    setCurrentStudent(student);
    setIsAuthModalOpen(false);
    setAuthModalReason('');
    try {
      localStorage.removeItem('gate_ag_guest_mode');
    } catch (e) {}
  };

  useEffect(() => {
    const unsub = subscribeToLiveRoleSync((update) => {
      if (!update || !currentStudent) return;
      const isTargetUser = 
        currentStudent.id === update.userId || 
        currentStudent.email === update.userId || 
        currentStudent.username === update.userId;

      if (isTargetUser) {
        setCurrentStudent(prev => ({
          ...prev,
          role: update.role,
          is_solver: update.role === 'solver',
          is_mentor: update.role === 'mentor',
          is_faculty: update.role === 'faculty' || update.role === 'mentor',
          contributor_badge: update.contributor_badge
        }));
      }
    });

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, [currentStudent]);

  const handleLogout = () => {
    logoutStudent();
    setCurrentStudent(null);
    setIsProfileOpen(false);
    try {
      localStorage.removeItem('gate_ag_guest_mode');
    } catch (e) {}
    setIsAuthModalOpen(false);
  };

  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('gate_ag_theme') || 'obsidian-emerald';
    } catch (e) {
      return 'obsidian-emerald';
    }
  });

  useEffect(() => {
    localStorage.setItem('gate_ag_theme', currentTheme);
    const root = document.documentElement;
    root.classList.remove(
      'dark', 
      'theme-cyber-dark', 
      'theme-slate-light', 
      'theme-obsidian-emerald', 
      'theme-matte-titanium', 
      'theme-midnight-aurora', 
      'theme-pure-monocle',
      'theme-oxford-sage',
      'theme-cream-parchment',
      'theme-porcelain-studio',
      'theme-sunrise-amber'
    );

    const darkThemes = ['obsidian-emerald', 'matte-titanium', 'midnight-aurora', 'pure-monocle', 'cyber-dark'];
    const isDark = darkThemes.includes(currentTheme);

    if (isDark) {
      const themeClass = currentTheme === 'cyber-dark' ? 'theme-obsidian-emerald' : `theme-${currentTheme}`;
      root.classList.add('dark', themeClass);
    } else {
      const themeClass = currentTheme === 'slate-light' ? 'theme-oxford-sage' : `theme-${currentTheme}`;
      root.classList.add(themeClass);
    }
  }, [currentTheme]);

  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);
  
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

  // Live Multi-Device Sync: subscribe to realtime question updates
  useEffect(() => {
    const unsubscribe = subscribeToLiveQuestionSync((remoteUpdatedQ) => {
      if (remoteUpdatedQ && remoteUpdatedQ.id) {
        setEditedQuestionsMap(prev => ({
          ...prev,
          [remoteUpdatedQ.id]: remoteUpdatedQ
        }));
      }
    });
    return unsubscribe;
  }, []);

  const handleSaveEditedQuestion = (updatedQ) => {
    setEditedQuestionsMap(prev => {
      const nextMap = { ...prev, [updatedQ.id]: updatedQ };
      try {
        localStorage.setItem('gate_ag_edited_questions_map', JSON.stringify(nextMap));
      } catch (e) {}
      return nextMap;
    });
    saveToIDB('edited_questions', updatedQ);
    saveAndBroadcastQuestion(updatedQ);
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
    if (!currentStudent) {
      handleOpenAuth("Sign In or Register free to attempt full 180-minute official CBT Mock Tests and calculate your All-India Rank (AIR) Tier!");
      return;
    }
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
    if (!currentStudent) {
      handleOpenAuth("Sign In or Register free to create custom speed tests, submit answers, and save performance records!");
      return;
    }
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
      
      {/* Login / Registration / Guest Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsAuthModalOpen(false)}
          onContinueAsGuest={handleContinueAsGuest}
          customPromptReason={authModalReason}
        />
      )}

      {/* Single Unified Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        onOpenCalc={() => setIsCalcOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        currentStudent={currentStudent}
        onOpenProfile={() => {
          if (currentStudent) {
            setIsProfileOpen(true);
          } else {
            handleOpenAuth();
          }
        }}
        onLogout={handleLogout}
      />

      {/* Main Wide Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 max-w-7xl 2xl:max-w-[1500px] w-full mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-6 pb-8">
          
          {/* Guest Visitor Mode Top Banner */}
          {!currentStudent && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Guest Visitor Mode
                    </h3>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      Preview
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    You are exploring formulas, syllabus & questions freely. Sign in to attempt timed CBT mock tests & track your AIR rank!
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAuth('Sign In or Register free to unlock full CBT mock tests, practice answer checks, and AIR tier calculation!')}
                className="shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Sign In / Register Free</span>
              </button>
            </div>
          )}

          <Suspense fallback={<TabLoadingSkeleton />}>
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
                currentStudent={currentStudent}
                onRequireAuth={handleOpenAuth}
              />
            )}

            {['learninghub', 'concepts', 'radar', 'simulators', 'flashcards', 'revision', 'formulas'].includes(activeTab) && (
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
                onStartCustomTest={handleStartCustomTest}
                currentStudent={currentStudent}
                onRequireAuth={handleOpenAuth}
              />
            )}

            {['community', 'chat', 'qa', 'discussions', 'ai_tutor', 'aisolver', 'aitutor'].includes(activeTab) && (
              <CommunityHub
                activeSubTab={['qa', 'discussions'].includes(activeTab) ? 'qa' : ['ai_tutor', 'aisolver', 'aitutor'].includes(activeTab) ? 'ai_tutor' : 'chat'}
                onSubTabChange={(subTab) => setActiveTab(subTab)}
                currentStudent={currentStudent}
                questions={questions}
                mockPapers={mockPapers}
                onOpenCalc={() => setIsCalcOpen(true)}
                onToggleBookmark={handleToggleBookmark}
                onRequireAuth={handleOpenAuth}
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
                onRequireAuth={handleOpenAuth}
              />
            )}

            {activeTab === 'analytics' && (
              <PerformanceAnalytics 
                currentStudent={currentStudent} 
                questions={questions} 
                customMockPapers={customMockPapers}
                onStartCustomTest={handleStartCustomTest}
                onOpenCalc={() => setIsCalcOpen(true)}
              />
            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard 
                currentStudent={currentStudent} 
              />
            )}

            {activeTab === 'feedback' && (
              <FeedbackForum />
            )}

            {activeTab === 'downloads' && (
              <DownloadsHub
                questions={questions}
                mockPapers={mockPapers}
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

            {activeTab === 'games' && (
              <GamesZone />
            )}

            {(activeTab === 'creator' || activeTab === 'support' || activeTab === 'admin' || activeTab === 'hq') && (
              <CreatorAdminHQ
                initialSubTab={activeTab === 'admin' ? 'admin' : activeTab === 'support' ? 'support' : 'creator'}
                questions={questions}
                mockPapers={mockPapers}
                customMockPapers={customMockPapers}
                editedQuestionsMap={editedQuestionsMap}
                onSaveEditedQuestion={handleSaveEditedQuestion}
                onOpenCalc={() => setIsCalcOpen(true)}
                currentStudent={currentStudent}
              />
            )}
          </Suspense>
        </main>
        <Footer setActiveTab={setActiveTab} />
      </div>

      <Suspense fallback={null}>
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

        <CommandPaletteModal
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={(tab) => {
            setActiveTab(tab);
            setIsCommandPaletteOpen(false);
          }}
          onStartMock={(paper) => {
            handleStartMock(paper);
            setIsCommandPaletteOpen(false);
          }}
          onOpenCalc={() => {
            setIsCalcOpen(true);
            setIsCommandPaletteOpen(false);
          }}
          darkMode={currentTheme !== 'slate-light'}
          setDarkMode={(isDark) => setCurrentTheme(isDark ? 'obsidian-emerald' : 'slate-light')}
          onSelectTheme={(t) => {
            setCurrentTheme(t);
            setIsCommandPaletteOpen(false);
          }}
          onOpenThemeModal={() => {
            setIsCommandPaletteOpen(false);
            setIsThemeModalOpen(true);
          }}
          mockPapers={mockPapers}
          customMockPapers={customMockPapers}
        />

        <ThemeSelectorModal
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
          currentTheme={currentTheme}
          onSelectTheme={(t) => setCurrentTheme(t)}
        />
      </Suspense>

    </div>
  );
}
