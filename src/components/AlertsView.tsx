import React, { useState } from 'react';
import { ThreatAlert } from '../types';

interface AlertsViewProps {
  alerts: ThreatAlert[];
  onInspectAlert: (alertId: string) => void;
  onOpenFilterSheet: () => void;
  onOpenExportModal: (count: number) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onInspectAlert,
  onOpenFilterSheet,
  onOpenExportModal,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlertIds, setSelectedAlertIds] = useState<string[]>([
    'FASTAPI-ALERT-9042',
    'SEC-DNS-4118',
    'SEC-INT-9901',
  ]);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const filterPills = [
    { label: 'All (42)', id: 'All' },
    { label: 'Critical (7)', id: 'Critical', isCrit: true },
    { label: 'High (18)', id: 'High' },
    { label: 'Tor Exit Nodes', id: 'Tor', isTag: true },
    { label: 'Ransomware C2', id: 'Ransomware', isTag: true },
    { label: 'Brute Force', id: 'BruteForce', isTag: true },
    { label: 'DGA Spikes', id: 'DGA', isTag: true },
    { label: 'Unresolved (12)', id: 'Unresolved' },
    { label: 'Quarantined (5)', id: 'Quarantined' },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAlertIds(alerts.map((a) => a.id));
    } else {
      setSelectedAlertIds([]);
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedAlertIds.includes(id)) {
      setSelectedAlertIds(selectedAlertIds.filter((item) => item !== id));
    } else {
      setSelectedAlertIds([...selectedAlertIds, id]);
    }
  };

  const showActionNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-2xl mx-auto pb-20 animate-fadeIn">
      {/* Stream Status & Timeframe Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffb4ab]"></span>
          </span>
          <span className="font-data-token text-[11px] text-[#ffb4ab] tracking-tight font-semibold uppercase truncate">
            LIVE MITRE VECTOR STREAM
          </span>
        </div>

        <button
          onClick={onOpenFilterSheet}
          className="flex items-center gap-1 bg-[#262a34] border border-[#31353f] px-2.5 py-1 rounded-lg text-[#dfe2ef] hover:bg-[#31353f] transition-colors min-h-[32px] shrink-0"
        >
          <span className="font-label-caps text-[9px] text-[#00e5ff] font-bold">
            WINDOW:
          </span>
          <span className="font-data-token text-[11px]">Live (1H)</span>
          <span className="material-symbols-outlined text-[16px] text-[#bac9cc]">
            arrow_drop_down
          </span>
        </button>
      </div>

      {/* Search & Command Input with Dedicated Filter Button */}
      <div className="flex items-center gap-2 w-full">
        <div
          onClick={onOpenFilterSheet}
          className="relative flex-1 cursor-pointer group"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#00e5ff]">
            <span className="font-data-token text-[12px] font-bold">&gt;</span>
          </div>
          <input
            className="w-full bg-[#0a0e17] text-[#dfe2ef] placeholder-[#bac9cc]/60 font-data-token text-[12px] pl-7 pr-10 py-2.5 rounded-xl shadow-inner border border-[#31353f]/80 focus:border-[#00e5ff] focus:outline-none transition-all cursor-pointer"
            placeholder="Filter by IP, CIDR, CVE, or Hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#bac9cc] pointer-events-none">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
        </div>

        <button
          onClick={onOpenFilterSheet}
          aria-label="Open Filter & Search Sheet"
          className="relative flex items-center justify-center h-10 w-10 shrink-0 bg-[#262a34] hover:bg-[#31353f] active:scale-95 text-[#00e5ff] border border-[#31353f] rounded-xl transition-all shadow-md group"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
            tune
          </span>
          <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-[#00e5ff] text-[#00363d] font-data-token text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,229,255,0.7)]">
            3
          </span>
        </button>
      </div>

      {/* Filter Pills Strip (Horizontally Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-2 px-2">
        {filterPills.map((pill) => {
          const isActive = activeFilter === pill.id;
          let colorStyle = 'bg-[#262a34] text-[#dfe2ef] border-[#31353f]';
          if (isActive) {
            colorStyle =
              'bg-[#00e5ff] text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)] border-[#00e5ff]';
          } else if (pill.isCrit) {
            colorStyle = 'bg-[#93000a] text-[#ffe7e6] border-[#ffb4ab]/40';
          } else if (pill.isTag) {
            colorStyle =
              'bg-[#181b25] text-[#b0c6ff] border-[#0068ed]/40 hover:bg-[#0068ed]/20';
          }

          return (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full font-label-caps text-[10px] uppercase border transition-all active:scale-95 ${colorStyle}`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Batch Selection Toolbar */}
      <div className="flex items-center justify-between bg-[#181b25]/95 border border-[#00e5ff]/40 p-2.5 rounded-xl backdrop-blur-md shadow-[0_0_16px_rgba(0,229,255,0.15)]">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={
                selectedAlertIds.length > 0 &&
                selectedAlertIds.length === alerts.length
              }
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="h-4 w-4 rounded bg-[#31353f] accent-[#00e5ff] cursor-pointer"
            />
            <span className="font-label-caps text-[10px] text-[#dfe2ef] font-semibold uppercase tracking-wider">
              Select All
            </span>
          </label>
          <span className="h-3 w-px bg-[#3b494c]/60"></span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/40 font-data-token text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
            {selectedAlertIds.length} Alerts Selected
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedAlertIds([])}
            className="flex items-center gap-1 bg-[#262a34] hover:bg-[#31353f] text-[#bac9cc] hover:text-[#dfe2ef] px-2 py-1.5 rounded-lg font-label-caps text-[10px] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">
              clear_all
            </span>
            Deselect
          </button>
          <button
            onClick={() => onOpenExportModal(selectedAlertIds.length)}
            className="flex items-center gap-1.5 bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#00363d] font-label-caps text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-[0_0_12px_rgba(0,229,255,0.4)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">
              file_download
            </span>
            Export Batch
          </button>
        </div>
      </div>

      {/* Incident Feed Stream */}
      <div className="flex flex-col space-y-3">
        {alerts.map((alert) => {
          const isSelected = selectedAlertIds.includes(alert.id);
          const isCritical = alert.severity === 'critical';
          const isHigh = alert.severity === 'high';

          return (
            <div
              key={alert.id}
              className={`relative bg-[#181b25]/90 backdrop-blur-md rounded-xl p-4 shadow-xl transition-all duration-200 border ${
                isSelected
                  ? 'border-[#00e5ff]/60 ring-1 ring-[#00e5ff]/30'
                  : 'border-[#31353f]/60'
              }`}
            >
              {/* Severity left stripe */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  isCritical
                    ? 'bg-[#ffb4ab] shadow-[0_0_12px_rgba(255,51,75,0.8)]'
                    : isHigh
                    ? 'bg-[#0068ed]'
                    : 'bg-[#31353f]'
                }`}
              ></div>

              <div className="flex flex-col space-y-2 pl-2">
                {/* Header Metadata & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-caps text-[10px] font-bold ${
                        isCritical
                          ? 'bg-[#93000a] text-[#ffe7e6] shadow-[0_0_8px_rgba(255,51,75,0.4)]'
                          : isHigh
                          ? 'bg-[#0068ed] text-[#f2f3ff]'
                          : 'bg-[#31353f] text-[#dfe2ef]'
                      }`}
                    >
                      {isCritical && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ffe7e6] animate-pulse"></span>
                      )}
                      {alert.severity.toUpperCase()} {alert.riskScore}
                    </span>
                    <span className="bg-[#31353f] text-[#00e5ff] px-2 py-0.5 rounded font-label-caps text-[9px] font-medium border border-[#00e5ff]/20">
                      {alert.mitreTactic}
                    </span>
                  </div>
                  <span className="font-data-token text-[11px] text-[#bac9cc]">
                    {alert.timestamp}
                  </span>
                </div>

                {/* Title & Checkbox */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2
                      onClick={() => onInspectAlert(alert.id)}
                      className="font-headline font-bold text-[15px] text-[#dfe2ef] hover:text-[#00e5ff] leading-tight tracking-tight cursor-pointer"
                    >
                      {alert.title}
                    </h2>
                    <span className="font-label-caps text-[10px] text-[#bac9cc] font-medium">
                      {alert.displayId}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(alert.id)}
                    aria-label="Select incident"
                    className="mt-1 h-4 w-4 rounded bg-[#31353f] accent-[#00e5ff] cursor-pointer"
                  />
                </div>

                {/* Telemetry Data Grid */}
                <div className="bg-[#0a0e17]/90 rounded-lg p-2.5 space-y-1.5 border border-[#31353f]/40">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-label-caps text-[10px] text-[#bac9cc]">
                        SRC:
                      </span>
                      <span className="font-data-token text-[11px] text-[#ffb4ab] truncate">
                        {alert.srcIp}{' '}
                        {alert.srcMeta && (
                          <span className="text-[#bac9cc] text-[10px]">
                            {alert.srcMeta}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-label-caps text-[10px] text-[#bac9cc]">
                        DST:
                      </span>
                      <span className="font-data-token text-[11px] text-[#dfe2ef] truncate">
                        {alert.dstIp}{' '}
                        {alert.dstMeta && (
                          <span className="text-[#00e5ff] text-[10px]">
                            {alert.dstMeta}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-y-1 text-[#bac9cc] border-t border-[#31353f]/40">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-[#ffb4ab]">
                        speed
                      </span>
                      <span className="font-data-token text-[11px] text-[#dfe2ef]">
                        {alert.statsValue}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-caps text-[10px] bg-[#262a34] px-1.5 py-0.5 rounded text-[#dfe2ef]">
                        {alert.protocolTag}
                      </span>
                      <span className="font-data-token text-[11px] text-[#00e5ff] font-semibold">
                        {alert.confidence}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Tactical Buttons */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isCritical
                          ? 'bg-[#ffb4ab] animate-ping'
                          : 'bg-[#b0c6ff]'
                      }`}
                    ></span>
                    <span
                      className={`font-label-caps text-[10px] font-bold uppercase truncate ${
                        isCritical ? 'text-[#ffb4ab]' : 'text-[#b0c6ff]'
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        showActionNotification(
                          `${alert.actionPrimary} applied to target.`
                        )
                      }
                      className="bg-[#93000a] hover:bg-[#b50028] text-[#ffe7e6] font-label-caps text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        block
                      </span>
                      {alert.actionPrimary}
                    </button>
                    <button
                      onClick={() => onInspectAlert(alert.id)}
                      className="bg-[#262a34] hover:bg-[#31353f] border border-[#31353f] text-[#00e5ff] font-label-caps text-[10px] px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-0.5 active:scale-95"
                    >
                      Breakdown
                      <span className="material-symbols-outlined text-[14px]">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Multi-Select Tactical Action Bar */}
      {selectedAlertIds.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-lg mx-auto bg-[#31353f]/95 border border-[#00e5ff]/40 backdrop-blur-xl rounded-xl p-3 shadow-[0_4px_24px_rgba(0,0,0,0.8),0_0_16px_rgba(0,229,255,0.2)] animate-slideUp">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
                  fact_check
                </span>
                <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] bg-[#00e5ff] text-[#00363d] font-data-token text-[9px] font-bold rounded-full flex items-center justify-center">
                  {selectedAlertIds.length}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-data-token text-[12px] text-[#00e5ff] font-bold truncate">
                  {selectedAlertIds.length} Alerts Filtered
                </span>
                <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase truncate">
                  14.2 MB Capture Ready
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  showActionNotification(
                    `Batch Triage initiated for ${selectedAlertIds.length} alerts.`
                  )
                }
                className="bg-[#181b25] hover:bg-[#262a34] text-[#bac9cc] hover:text-[#dfe2ef] px-2.5 py-1.5 rounded-lg font-label-caps text-[10px] font-semibold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">
                  checklist
                </span>
                Triage
              </button>
              <button
                onClick={() => onOpenExportModal(selectedAlertIds.length)}
                className="bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#00363d] font-label-caps text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-[0_0_12px_rgba(0,229,255,0.4)] active:scale-95 flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">
                  file_download
                </span>
                Export Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action success toast */}
      {actionSuccessMsg && (
        <div className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto bg-[#1c1f29] border border-[#00e5ff] text-[#dfe2ef] p-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-fadeIn">
          <span className="material-symbols-outlined text-[#00e5ff]">
            check_circle
          </span>
          <span className="font-data-token text-[12px] font-medium">
            {actionSuccessMsg}
          </span>
        </div>
      )}
    </div>
  );
};
