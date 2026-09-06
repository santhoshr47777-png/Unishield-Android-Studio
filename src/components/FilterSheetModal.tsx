import React, { useState } from 'react';

interface FilterSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (query: string) => void;
}

export const FilterSheetModal: React.FC<FilterSheetModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [query, setQuery] = useState('asn:44050 status:critical');
  const [severities, setSeverities] = useState<string[]>(['critical', 'high']);
  const [selectedMitre, setSelectedMitre] = useState<string[]>([
    'Initial Access',
    'Execution & Discovery',
    'Credential Access',
  ]);
  const [selectedStatus, setSelectedStatus] = useState('Mitigation Required');
  const [timeWindow, setTimeWindow] = useState('1h');

  if (!isOpen) return null;

  const handlePreset = (syntax: string) => {
    if (!query) {
      setQuery(syntax);
    } else if (!query.includes(syntax)) {
      setQuery(`${query} ${syntax}`);
    }
  };

  const toggleSeverity = (sev: string) => {
    if (severities.includes(sev)) {
      setSeverities(severities.filter((s) => s !== sev));
    } else {
      setSeverities([...severities, sev]);
    }
  };

  const toggleMitre = (item: string) => {
    if (selectedMitre.includes(item)) {
      setSelectedMitre(selectedMitre.filter((m) => m !== item));
    } else {
      setSelectedMitre([...selectedMitre, item]);
    }
  };

  const handleReset = () => {
    setQuery('');
    setSeverities(['critical']);
    setSelectedMitre([]);
    setSelectedStatus('All');
  };

  const handleApply = () => {
    onApplyFilters(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] bg-[#0a0e17] border-t border-[#31353f] rounded-t-2xl shadow-2xl flex flex-col z-10 animate-slideUp">
        {/* Handle */}
        <div className="pt-2.5 pb-1 flex flex-col items-center">
          <div className="w-10 h-1 rounded-full bg-[#31353f]"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#262a34]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
            <h3 className="font-headline text-[15px] text-[#dfe2ef] font-bold tracking-tight">
              Tactical Filter &amp; Query
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] font-label-caps text-[9px] font-bold uppercase">
              Live SOC Sync
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#262a34] text-[#bac9cc] hover:text-[#dfe2ef] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 py-3 space-y-4 text-[#dfe2ef]">
          {/* Query Syntax */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">
                  terminal
                </span>
                Advanced Search Syntax
              </label>
              <span className="font-label-caps text-[10px] text-[#00e5ff]">
                Regex &amp; CIDR
              </span>
            </div>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#00e5ff] font-data-token text-[12px] font-bold">
                &gt;
              </span>
              <input
                className="w-full bg-[#181b25] text-[#dfe2ef] font-data-token text-[12px] pl-7 pr-8 py-2 rounded-lg border border-[#31353f] focus:border-[#00e5ff] focus:outline-none"
                placeholder="e.g. src:194.26.* cve:2024-*"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#bac9cc] hover:text-[#dfe2ef]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    backspace
                  </span>
                </button>
              )}
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
              <span className="font-label-caps text-[9px] text-[#bac9cc] whitespace-nowrap uppercase">
                Presets:
              </span>
              {[
                { label: 'Tor Exit Nodes', syn: 'tag:tor-exit', isCrit: true },
                { label: 'Ransomware C2', syn: 'mitre:ransomware-c2', isCyan: true },
                { label: 'Brute Force', syn: 'tactic:T1110' },
                { label: 'DGA Spikes', syn: 'pattern:dga-spike' },
                { label: 'asn:44050', syn: 'asn:44050' },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => handlePreset(p.syn)}
                  className={`whitespace-nowrap px-2 py-0.5 rounded font-data-token text-[11px] border transition-colors ${
                    p.isCrit
                      ? 'bg-[#93000a]/20 border-[#ffb4ab]/50 text-[#ffb4ab]'
                      : p.isCyan
                      ? 'bg-[#00e5ff]/15 border-[#00e5ff]/50 text-[#00e5ff]'
                      : 'bg-[#262a34] border-[#31353f] text-[#bac9cc] hover:text-[#dfe2ef]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Severity Threshold */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider">
                Severity Threshold
              </span>
              <span className="font-data-token text-[10px] text-[#bac9cc]">
                Multi-Select
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toggleSeverity('critical')}
                className={`flex items-center justify-between p-2 rounded-lg border transition-all text-left ${
                  severities.includes('critical')
                    ? 'bg-[#93000a]/30 border-[#ffb4ab] text-[#ffe7e6] shadow-[0_0_10px_rgba(255,51,75,0.25)]'
                    : 'bg-[#181b25] border-[#31353f] text-[#bac9cc]'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse"></span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-caps text-[10px] font-bold">
                      Critical [90-100]
                    </span>
                    <span className="font-data-token text-[9px] text-[#ffb4ab]">
                      Active breaches
                    </span>
                  </div>
                </div>
                <span className="font-data-token text-[11px] font-bold ml-1 bg-[#93000a] px-1.5 py-0.5 rounded">
                  7
                </span>
              </button>

              <button
                onClick={() => toggleSeverity('high')}
                className={`flex items-center justify-between p-2 rounded-lg border transition-all text-left ${
                  severities.includes('high')
                    ? 'bg-[#0068ed]/25 border-[#0068ed] text-[#f2f3ff]'
                    : 'bg-[#181b25] border-[#31353f] text-[#bac9cc]'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#0068ed]"></span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-caps text-[10px] font-bold">
                      High [70-89]
                    </span>
                    <span className="font-data-token text-[9px] text-[#b0c6ff]">
                      Targeted scans
                    </span>
                  </div>
                </div>
                <span className="font-data-token text-[11px] font-bold ml-1 bg-[#262a34] px-1.5 py-0.5 rounded">
                  18
                </span>
              </button>
            </div>
          </div>

          {/* MITRE ATT&CK Categories */}
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider">
              MITRE ATT&amp;CK® Vectors
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Initial Access',
                'Execution & Discovery',
                'Command & Control',
                'Credential Access',
                'Exfiltration',
              ].map((m) => {
                const isSel = selectedMitre.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleMitre(m)}
                    className={`px-2.5 py-1.5 rounded-lg font-label-caps text-[10px] font-semibold border transition-all ${
                      isSel
                        ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#c3f5ff]'
                        : 'bg-[#181b25] border-[#31353f] text-[#bac9cc]'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status & Mitigation */}
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider">
              Status &amp; Mitigation
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Mitigation Required', 'Investigating', 'Auto-Throttled'].map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-2.5 py-1 rounded font-label-caps text-[10px] font-bold border transition-all ${
                      selectedStatus === st
                        ? 'bg-[#00e5ff] text-[#00363d] border-[#00e5ff]'
                        : 'bg-[#181b25] text-[#bac9cc] border-[#31353f]'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Time Window */}
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider">
              Time Window Horizon
            </span>
            <div className="grid grid-cols-5 gap-1.5 bg-[#181b25] p-1 rounded-lg border border-[#31353f]">
              {['15m', '1h', '6h', '24h', '7d'].map((tw) => (
                <button
                  key={tw}
                  onClick={() => setTimeWindow(tw)}
                  className={`py-1 text-center rounded font-data-token text-[11px] font-bold transition-all ${
                    timeWindow === tw
                      ? 'bg-[#00e5ff] text-[#00363d]'
                      : 'text-[#bac9cc]'
                  }`}
                >
                  {tw}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#181b25] border-t border-[#31353f] flex items-center justify-between gap-3 pb-safe">
          <button
            onClick={handleReset}
            className="text-[#bac9cc] hover:text-[#dfe2ef] font-label-caps text-[10px] font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">
              restart_alt
            </span>
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 max-w-[220px] bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#00363d] font-label-caps text-[10px] font-bold py-2.5 px-3 rounded-lg shadow-[0_0_16px_rgba(0,229,255,0.45)] active:scale-[0.98] transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">
              filter_alt_check
            </span>
            Apply Filters (7 Alerts)
          </button>
        </div>
      </div>
    </div>
  );
};
