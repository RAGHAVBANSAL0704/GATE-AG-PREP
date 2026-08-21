import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("GATE AG Portal Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('gate_ag_user_stats');
      localStorage.removeItem('gate_ag_bookmarks');
      localStorage.removeItem('gate_ag_progress');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full card-3d rounded-3xl p-8 space-y-6 bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">GATE AG Portal Recovered</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                The portal encountered a transient browser state error. Click below to refresh and restore full portal functionality.
              </p>
              {this.state.error && (
                <div className="p-3 mt-3 bg-red-950/50 border border-red-800/50 rounded-xl text-left font-mono text-[11px] text-red-300 max-h-40 overflow-y-auto">
                  <div className="font-bold text-red-200">{this.state.error.name}: {this.state.error.message}</div>
                  {this.state.error.stack && <pre className="mt-1 text-[10px] text-red-400/80 whitespace-pre-wrap">{this.state.error.stack}</pre>}
                </div>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Portal</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full text-xs text-slate-400 hover:text-rose-400 underline transition font-medium"
              >
                Reset Saved State & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
