import React, { useState } from 'react';

interface ExportBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
}

export const ExportBatchModal: React.FC<ExportBatchModalProps> = ({
  isOpen,
  onClose,
  selectedCount,
}) => {
  const [format, setFormat] = useState<'pcap' | 'siem' | 'stix'>('pcap');
  const [dest, setDest] = useState<'download' | 'webhook'>('download');
  const [includePayload, setIncludePayload] = useState(true);
  const [maskPii, setMaskPii] = useState(true);
  const [attachShap, setAttachShap] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExecute = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[92vh] bg-[#0a0e17] border-t border-[#00e5ff]/40 rounded-t-2xl shadow-2xl flex flex-col overflow-hidden z-10 animate-slideUp">
        {/* Handle */}
        <div className="pt-2.5 pb-1 flex flex-col items-center">
          <div className="w-10 h-1 rounded-full bg-[#31353f]"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#262a34]">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
              </span>
              <h3 className="font-headline text-[14px] sm:text-[15px] text-[#dfe2ef] font-bold uppercase truncate">
                EXPORT BATCH // TELEMETRY DISPATCH
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-0.5 font-data-token text-[11px]">
              <span className="text-[#00e5ff] font-semibold">
                {selectedCount || 3} Incidents Selected
              </span>
              <span className="text-[#849396]">•</span>
              <span className="text-[#bac9cc]">14.2 MB / 12,840 frames</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#262a34] text-[#bac9cc] hover:text-[#dfe2ef] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto px-4 py-3 space-y-4 text-[#dfe2ef]">
          {/* Format selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">
                  layers
                </span>
                Select Output Format
              </span>
              <span className="font-data-token text-[11px] text-[#00e5ff]">
                Standard RFC
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label
                onClick={() => setFormat('pcap')}
                className={`relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  format === 'pcap'
                    ? 'border-[#00e5ff] bg-[#00e5ff]/10 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'border-[#31353f] bg-[#181b25]/60 hover:bg-[#262a34]'
                }`}
              >
                <input
                  type="radio"
                  name="export_format"
                  checked={format === 'pcap'}
                  onChange={() => setFormat('pcap')}
                  className="mt-1 h-4 w-4 accent-[#00e5ff]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-headline text-[13px] font-bold text-[#c3f5ff]">
                      PCAP Multi-Stream Archive (.pcap.gz)
                    </span>
                    <span className="font-data-token text-[11px] text-[#00e5ff] font-bold bg-[#00e5ff]/20 px-1.5 py-0.5 rounded">
                      14.2 MB
                    </span>
                  </div>
                  <p className="font-headline text-[11px] text-[#bac9cc] mt-0.5">
                    Full L2-L7 raw packet frames, reassembled TCP streams, decrypted TLS session secrets.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setFormat('siem')}
                className={`relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  format === 'siem'
                    ? 'border-[#00e5ff] bg-[#00e5ff]/10'
                    : 'border-[#31353f] bg-[#181b25]/60 hover:bg-[#262a34]'
                }`}
              >
                <input
                  type="radio"
                  name="export_format"
                  checked={format === 'siem'}
                  onChange={() => setFormat('siem')}
                  className="mt-1 h-4 w-4 accent-[#00e5ff]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-headline text-[13px] font-semibold text-[#dfe2ef]">
                      SIEM Event Stream (Syslog CEF / JSON)
                    </span>
                    <span className="font-data-token text-[11px] text-[#b0c6ff] font-bold bg-[#0068ed]/20 px-1.5 py-0.5 rounded">
                      ECS Schema
                    </span>
                  </div>
                  <p className="font-headline text-[11px] text-[#bac9cc] mt-0.5">
                    Common Event Format with FastAPI ML triage metrics for Splunk / Sentinel.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setFormat('stix')}
                className={`relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  format === 'stix'
                    ? 'border-[#00e5ff] bg-[#00e5ff]/10'
                    : 'border-[#31353f] bg-[#181b25]/60 hover:bg-[#262a34]'
                }`}
              >
                <input
                  type="radio"
                  name="export_format"
                  checked={format === 'stix'}
                  onChange={() => setFormat('stix')}
                  className="mt-1 h-4 w-4 accent-[#00e5ff]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-headline text-[13px] font-semibold text-[#dfe2ef]">
                      STIX 2.1 / TAXII Threat Intelligence
                    </span>
                    <span className="font-data-token text-[11px] text-[#ffb4ab] font-bold bg-[#93000a]/30 px-1.5 py-0.5 rounded">
                      CTI Feed
                    </span>
                  </div>
                  <p className="font-headline text-[11px] text-[#bac9cc] mt-0.5">
                    Structured threat intelligence formatted for MISP & AlienVault OTX feeds.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Sanitization Options */}
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">
                tune
              </span>
              Sanitization &amp; Options
            </span>
            <div className="bg-[#181b25] rounded-xl p-3 border border-[#31353f] space-y-2">
              <label className="flex items-center justify-between gap-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includePayload}
                    onChange={(e) => setIncludePayload(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#00e5ff]"
                  />
                  <span className="font-data-token text-[11px] text-[#dfe2ef]">
                    Include Intercepted Hex/ASCII Payload
                  </span>
                </div>
                <span className="font-label-caps text-[9px] text-[#00e5ff] bg-[#00e5ff]/10 px-1.5 py-0.5 rounded">
                  FULL DUMP
                </span>
              </label>

              <label className="flex items-center justify-between gap-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={maskPii}
                    onChange={(e) => setMaskPii(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#00e5ff]"
                  />
                  <span className="font-data-token text-[11px] text-[#dfe2ef]">
                    Mask Internal PII / Sanitize Subnets
                  </span>
                </div>
                <span className="font-label-caps text-[9px] text-[#bac9cc] bg-[#262a34] px-1.5 py-0.5 rounded">
                  RFC 1918
                </span>
              </label>

              <label className="flex items-center justify-between gap-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={attachShap}
                    onChange={(e) => setAttachShap(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#00e5ff]"
                  />
                  <span className="font-data-token text-[11px] text-[#dfe2ef]">
                    Attach ML SHAP Explainability Matrix
                  </span>
                </div>
                <span className="font-label-caps text-[9px] text-[#b0c6ff] bg-[#0068ed]/20 px-1.5 py-0.5 rounded">
                  SOC TRIAGE
                </span>
              </label>
            </div>
          </div>

          {/* Dispatch Destination */}
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">
                hub
              </span>
              Dispatch Destination
            </span>
            <div className="grid grid-cols-2 gap-2 bg-[#181b25] p-1 rounded-xl border border-[#31353f]">
              <button
                onClick={() => setDest('download')}
                className={`py-1.5 text-center rounded-lg font-data-token text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
                  dest === 'download'
                    ? 'bg-[#00e5ff] text-[#00363d]'
                    : 'text-[#bac9cc] hover:text-[#dfe2ef]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  download
                </span>
                Direct (.gz)
              </button>
              <button
                onClick={() => setDest('webhook')}
                className={`py-1.5 text-center rounded-lg font-data-token text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
                  dest === 'webhook'
                    ? 'bg-[#00e5ff] text-[#00363d]'
                    : 'text-[#bac9cc] hover:text-[#dfe2ef]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  cell_tower
                </span>
                Forward SIEM
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#181b25] border-t border-[#31353f] flex items-center justify-between gap-3 pb-safe">
          <button
            onClick={onClose}
            className="text-[#bac9cc] hover:text-[#dfe2ef] font-label-caps text-[10px] font-semibold py-2 px-2"
          >
            Cancel
          </button>
          <button
            onClick={handleExecute}
            className="flex-1 max-w-[240px] bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#00363d] font-label-caps text-[10px] font-bold py-2.5 px-3 rounded-lg shadow-[0_0_16px_rgba(0,229,255,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">
              {exportSuccess ? 'done_all' : isExporting ? 'sync' : 'download'}
            </span>
            <span>
              {exportSuccess
                ? 'Export Complete!'
                : isExporting
                ? 'Packaging...'
                : 'Download PCAP (14.2 MB)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
