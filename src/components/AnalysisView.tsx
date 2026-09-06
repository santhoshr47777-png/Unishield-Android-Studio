import React, { useState } from 'react';
import { SHAP_FEATURES, TIMELINE_EVENTS } from '../data/mockData';

interface AnalysisViewProps {
  onOpenInspector: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ onOpenInspector }) => {
  const [isolated, setIsolated] = useState(false);
  const [nullRouted, setNullRouted] = useState(false);
  const [pcapDumped, setPcapDumped] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleIsolate = () => {
    setIsolated(true);
    showToast('Host 10.0.1.45 placed into micro-segment isolation.');
  };

  const handleNullRoute = () => {
    setNullRouted(true);
    showToast('Border BGP announcement injected for 185.220.101.5.');
  };

  const handlePcap = () => {
    setPcapDumped(true);
    showToast('Trace buffer exported: trace-INC-2025-0892.pcap (48 MB)');
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-2xl mx-auto pb-20 animate-fadeIn">
      {/* Top Incident Banner Card */}
      <section className="flex flex-col bg-[#1c1f29] p-4 rounded-xl relative overflow-hidden shadow-xl border border-[#31353f]">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#93000a]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#00e5ff]/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Metadata & Severity Tag */}
        <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#31353f] text-[#c3f5ff] font-data-token text-[11px] font-semibold border border-[#00e5ff]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
              INC-2025-0892
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-[#93000a] text-[#ffdad6] font-label-caps text-[9px] uppercase tracking-wider font-bold">
              Active Threat Vector
            </span>
          </div>
          <span className="font-data-token text-[11px] text-[#bac9cc] flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            Just Now
          </span>
        </div>

        {/* Title & Description */}
        <div className="relative z-10 mb-3">
          <h1 className="font-headline font-bold text-[18px] sm:text-[20px] text-[#dfe2ef] tracking-tight mb-1">
            Cobalt Strike Beaconing &amp; Lateral Movement
          </h1>
          <p className="font-headline text-[13px] text-[#bac9cc] leading-relaxed">
            Heuristic behavioral correlation flagged sustained command-and-control polling with anomalous staging activity.
          </p>
        </div>

        {/* Composite Threat Score & Confidence Gauge */}
        <div className="grid grid-cols-2 gap-2 bg-[#0a0e17]/90 p-3 rounded-xl relative z-10 border border-[#31353f]/60">
          {/* Threat Score */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                <circle
                  className="text-[#262a34] stroke-current fill-none"
                  cx="24"
                  cy="24"
                  r="20"
                  strokeWidth="4"
                ></circle>
                <circle
                  className="text-[#ffb4ab] stroke-current fill-none"
                  cx="24"
                  cy="24"
                  r="20"
                  strokeDasharray="125.6"
                  strokeDashoffset="7.5"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-data-display text-[17px] font-bold text-[#ffb4ab] leading-none">
                  94
                </span>
                <span className="font-label-caps text-[8px] text-[#bac9cc] uppercase font-bold">
                  /100
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-[10px] text-[#ffb4ab] uppercase font-bold tracking-wider">
                CRITICAL RISK
              </span>
              <span className="font-data-token text-[11px] text-[#bac9cc] truncate">
                ML Conf: <strong className="text-[#dfe2ef]">99.1%</strong>
              </span>
            </div>
          </div>

          {/* Shield / Guard Vector Status */}
          <div className="flex items-center justify-end gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-[#262a34] border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shadow-inner">
              <span className="material-symbols-outlined text-[22px]">security</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase">
                ATT&amp;CK Matrix
              </span>
              <span className="font-data-token text-[13px] text-[#00e5ff] font-bold">
                T1071.001
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Containment Protocol Action Controls */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase tracking-wider font-semibold">
            Containment Protocol
          </span>
          <span className="font-label-caps text-[10px] text-[#00e5ff] font-bold">
            ELEVATED PRIVILEGES
          </span>
        </div>

        {/* Primary Containment Trigger */}
        <button
          onClick={handleIsolate}
          className={`w-full min-h-[48px] px-4 py-3 rounded-xl flex items-center justify-between font-headline text-[14px] font-semibold active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(255,180,171,0.25)] ${
            isolated
              ? 'bg-[#31353f] text-[#00e5ff] border border-[#00e5ff]'
              : 'bg-[#ffb4ab] text-[#690005] hover:bg-[#ffdad6]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">
              {isolated ? 'check_circle' : 'warning'}
            </span>
            <span>
              {isolated
                ? 'Host Isolated & Airgapped (10.0.1.45)'
                : 'Isolate Endpoint (10.0.1.45)'}
            </span>
          </div>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">
            {isolated ? 'ACTIVE' : 'ENGAGE'}
          </span>
        </button>

        {/* Secondary & Tertiary Response Triggers */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleNullRoute}
            className={`min-h-[44px] px-3 py-2 rounded-xl bg-[#262a34] border border-[#31353f] hover:bg-[#31353f] text-[#dfe2ef] flex items-center justify-center gap-1.5 font-headline text-[12px] font-semibold active:scale-[0.98] transition-all ${
              nullRouted ? 'text-[#00e5ff] border-[#00e5ff]/50' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb4ab]">
              {nullRouted ? 'check' : 'block'}
            </span>
            <span className="truncate">
              {nullRouted ? 'IP BGP Null-Routed' : 'Null-Route Attacker'}
            </span>
          </button>

          <button
            onClick={handlePcap}
            className={`min-h-[44px] px-3 py-2 rounded-xl bg-[#262a34] border border-[#31353f] hover:bg-[#31353f] text-[#dfe2ef] flex items-center justify-center gap-1.5 font-headline text-[12px] font-semibold active:scale-[0.98] transition-all ${
              pcapDumped ? 'text-[#00e5ff] border-[#00e5ff]/50' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">
              {pcapDumped ? 'cloud_done' : 'sim_card_download'}
            </span>
            <span className="truncate">
              {pcapDumped ? 'Dumped (48MB)' : 'Dump PCAP (48MB)'}
            </span>
          </button>
        </div>
      </section>

      {/* ML Explainability Breakdown (SHAP Features) */}
      <section className="flex flex-col bg-[#1c1f29] p-4 rounded-xl shadow-lg border border-[#31353f] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#262a34] border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
            <h2 className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              ML Explainability (SHAP)
            </h2>
          </div>
          <span className="font-label-caps text-[9px] text-[#bac9cc] bg-[#31353f] px-2 py-0.5 rounded font-bold">
            TreeExplainer v3
          </span>
        </div>
        <p className="font-headline text-[12px] text-[#bac9cc]">
          High-dimensional anomaly features driving the composite inference calculation:
        </p>

        {SHAP_FEATURES.map((feat) => (
          <div
            key={feat.name}
            className="flex flex-col space-y-1 bg-[#0a0e17] p-2.5 rounded-lg border border-[#31353f]/50"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-headline text-[12px] text-[#dfe2ef] font-semibold">
                {feat.name}
              </span>
              <span className="font-data-token text-[11px] text-[#ffb4ab] font-bold">
                {feat.weightText}
              </span>
            </div>
            <div className="w-full bg-[#31353f] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  feat.percentage > 50 ? 'bg-[#ffb4ab]' : 'bg-[#00e5ff]'
                }`}
                style={{ width: `${feat.percentage}%` }}
              ></div>
            </div>
            <span className="font-data-token text-[11px] text-[#bac9cc]">
              {feat.description}
            </span>
          </div>
        ))}
      </section>

      {/* Forensic Flow Stream */}
      <section className="flex flex-col bg-[#1c1f29] p-4 rounded-xl shadow-lg border border-[#31353f] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#262a34] border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
              <span className="material-symbols-outlined text-[18px]">hub</span>
            </div>
            <h2 className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              Forensic Flow Stream
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-[#31353f] text-[#c3f5ff] font-data-token text-[11px] border border-[#00e5ff]/20">
            TCP / SYN-ACK
          </span>
        </div>

        {/* Source -> Target Node Diagram */}
        <div className="flex flex-col bg-[#0a0e17] p-3 rounded-lg border border-[#31353f]/60 space-y-3">
          {/* Source IP */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping"></div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
                  Origin (Attacker)
                </span>
                <span className="font-data-token text-[12px] text-[#ffb4ab] font-bold truncate">
                  185.220.101.5:44342
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
                Geo Origin
              </span>
              <p className="font-data-token text-[11px] text-[#dfe2ef]">
                Frankfurt, DE (TOR)
              </p>
            </div>
          </div>

          {/* Arrow Flow Indicator */}
          <div className="flex items-center justify-center relative py-1">
            <div className="w-full h-0.5 bg-[#31353f]"></div>
            <div className="absolute px-3 py-0.5 rounded-full bg-[#262a34] border border-[#00e5ff]/40 text-[#00e5ff] flex items-center gap-1 font-label-caps text-[9px] uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-xs animate-pulse">
                east
              </span>
              <span>48.6 MB / 18m 42s</span>
            </div>
          </div>

          {/* Target Node */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-[#00e5ff]"></div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
                  Target (Internal)
                </span>
                <span className="font-data-token text-[12px] text-[#00e5ff] font-bold truncate">
                  10.0.1.45:8443
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
                Host Alias
              </span>
              <p className="font-data-token text-[11px] text-[#dfe2ef] truncate">
                Prod-Payment-Cluster
              </p>
            </div>
          </div>
        </div>

        {/* Monospace Hex/ASCII Packet Sample Viewer with button to Inspector */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase tracking-wider font-semibold">
              Intercepted Stream Payload
            </span>
            <button
              onClick={onOpenInspector}
              className="font-data-token text-[11px] text-[#00e5ff] hover:underline flex items-center gap-1"
            >
              Frame #4208
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </button>
          </div>
          <div
            onClick={onOpenInspector}
            className="bg-[#0a0e17] p-3 rounded-lg border border-[#31353f]/60 overflow-x-auto cursor-pointer hover:border-[#00e5ff]/40 transition-colors"
          >
            <pre className="font-data-token text-[11px] leading-relaxed text-[#bac9cc] select-all">
              <span className="text-[#00e5ff]">0000:</span> 48 54 54 50 2f 31 2e 31  20 32 30 30 20 4f 4b 0d  HTTP/1.1 200 OK.{'\n'}
              <span className="text-[#00e5ff]">0010:</span> 53 65 72 76 65 72 3a 20  4e 67 69 6e 78 0d 0a 43  Server: Nginx..C{'\n'}
              <span className="text-[#00e5ff]">0020:</span> 6f 6e 74 65 6e 74 2d 54  79 70 65 3a 20 61 70 70  ontent-Type: app{'\n'}
              <span className="text-[#ffb4ab]">0030:</span> fc e8 89 00 00 00 60 89  e5 31 d2 64 8b 52 30 8b  ......`..1.d.R0.{'\n'}
              <span className="text-[#ffb4ab]">0040:</span> 52 0c 8b 52 14 8b 72 28  0f b7 4a 26 31 ff 31 c0  R..R..r(..J&1.1.
            </pre>
          </div>
        </div>
      </section>

      {/* SOC Analyst Triage Log Timeline */}
      <section className="flex flex-col bg-[#1c1f29] p-4 rounded-xl shadow-lg border border-[#31353f] space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#262a34] border border-[#00e5ff]/30 flex items-center justify-center text-[#c3f5ff]">
              <span className="material-symbols-outlined text-[18px]">history</span>
            </div>
            <h2 className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              Incident Chronology
            </h2>
          </div>
          <span className="font-data-token text-[11px] text-[#bac9cc]">UTC-04:00</span>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#31353f]">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={idx} className="relative flex items-start gap-3 pl-7">
              <span
                className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full ring-4 ring-[#1c1f29] ${event.color}`}
              ></span>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-data-token text-[11px] font-bold text-[#c3f5ff]">
                    {event.time}
                  </span>
                  <span className="font-headline text-[12px] text-[#dfe2ef] font-semibold truncate">
                    {event.title}
                  </span>
                </div>
                <p className="font-headline text-[12px] text-[#bac9cc] mt-0.5 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating feedback toast */}
      {toastMsg && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab] p-3 rounded-xl shadow-2xl flex items-center justify-between animate-slideUp">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4ab]">
              check_circle
            </span>
            <span className="font-headline text-[12px] font-semibold">
              {toastMsg}
            </span>
          </div>
          <span className="font-data-token text-[10px] text-[#ffdad6] opacity-75 font-bold">
            ACK 200
          </span>
        </div>
      )}
    </div>
  );
};
