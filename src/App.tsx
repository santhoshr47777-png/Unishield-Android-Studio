import React, { useState } from 'react';
import { ScreenTab } from './types';
import { INITIAL_ALERTS } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OverviewView } from './components/OverviewView';
import { AlertsView } from './components/AlertsView';
import { AnalysisView } from './components/AnalysisView';
import { TelemetryView } from './components/TelemetryView';
import { PacketInspectorView } from './components/PacketInspectorView';
import { ExportBatchModal } from './components/ExportBatchModal';
import { FilterSheetModal } from './components/FilterSheetModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('overview');
  const [alerts] = useState(INITIAL_ALERTS);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [exportCount, setExportCount] = useState(3);

  const handleInspectAlert = (_alertId: string) => {
    setCurrentTab('inspector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenExportModal = (count: number) => {
    setExportCount(count || 3);
    setIsExportOpen(true);
  };

  const handleApplyFilter = (_query: string) => {
    // Keep alerts updated or filter if needed
  };

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ef] flex flex-col font-headline select-none">
      {/* Fixed Tactical Header */}
      <Header onProfileClick={() => setIsProfileOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1 w-full pt-20 pb-20 px-4">
        {currentTab === 'overview' && (
          <OverviewView
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onInspectAlert={handleInspectAlert}
          />
        )}

        {currentTab === 'alerts' && (
          <AlertsView
            alerts={alerts}
            onInspectAlert={handleInspectAlert}
            onOpenFilterSheet={() => setIsFilterOpen(true)}
            onOpenExportModal={handleOpenExportModal}
          />
        )}

        {currentTab === 'analysis' && (
          <AnalysisView
            onOpenInspector={() => {
              setCurrentTab('inspector');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'telemetry' && <TelemetryView />}

        {currentTab === 'inspector' && (
          <PacketInspectorView onBack={() => setCurrentTab('alerts')} />
        )}
      </main>

      {/* Fixed Bottom Navigation (hidden when in deep inspector or modal) */}
      {currentTab !== 'inspector' && (
        <Navigation
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          alertCount={alerts.length}
        />
      )}

      {/* Modals & Bottom Sheets */}
      <ExportBatchModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        selectedCount={exportCount}
      />

      <FilterSheetModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilter}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
