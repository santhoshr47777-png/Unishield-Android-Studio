import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

export const TelemetryView: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<'1h' | '6h' | '24h' | '7d'>('24h');
  const [pingRunning, setPingRunning] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [exportRunning, setExportRunning] = useState(false);
  const [exportResult, setExportResult] = useState<string | null>(null);

  const handleRunPing = () => {
    setPingRunning(true);
    setPingResult(null);
    setTimeout(() => {
      setPingRunning(false);
      setPingResult('All 12 Gateways RTT < 4.2ms (Nominal)');
      setTimeout(() => setPingResult(null), 3000);
    }, 1200);
  };

  const handleExportSiem = () => {
    setExportRunning(true);
    setExportResult(null);
    setTimeout(() => {
      setExportRunning(false);
      setExportResult('Syslog CEF Stream Pushed (Batch #892)');
      setTimeout(() => setExportResult(null), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-2xl mx-auto pb-20 animate-fadeIn">
      {/* Subheader / Tactical Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping"></div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase tracking-widest truncate font-semibold">
              FLOW METERING // NODE 04
            </span>
            <span className="font-data-token text-[11px] text-[#c3f5ff] truncate font-bold">
              INTERFACE: eth0-100G-TRUNK
            </span>
          </div>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex items-center bg-[#262a34] p-0.5 rounded-lg border border-[#31353f] shadow-inner">
          {(['1h', '6h', '24h', '7d'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`px-2.5 py-1 rounded font-label-caps text-[10px] uppercase font-bold transition-all ${
                selectedTime === t
                  ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_8px_rgba(0,229,255,0.4)]'
                  : 'text-[#bac9cc] hover:text-[#dfe2ef]'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Bandwidth & Throughput Card */}
      <div className="bg-[#1c1f29]/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-[#31353f] relative overflow-hidden">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase tracking-wider font-semibold">
              AGGREGATE BANDWIDTH
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-data-display text-[32px] text-[#dfe2ef] font-bold tracking-tight leading-none">
                4.82
              </span>
              <span className="font-data-token text-[13px] text-[#00e5ff] font-bold uppercase">
                GBPS
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="material-symbols-outlined text-[14px] text-[#ffb4ab]">
                trending_up
              </span>
              <span className="font-data-token text-[11px] text-[#bac9cc]">
                Peak: <strong className="text-[#dfe2ef]">6.1 Gbps</strong> @ 14:20 UTC
              </span>
            </div>
          </div>

          {/* Live Throughput Badges */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#262a34] rounded-full border border-[#00e5ff]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
              <span className="font-label-caps text-[9px] text-[#c3f5ff] font-bold">
                INGRESS 3.14G
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#262a34] rounded-full border border-[#b0c6ff]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b0c6ff]"></span>
              <span className="font-label-caps text-[9px] text-[#b0c6ff] font-bold">
                EGRESS 1.68G
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry SVG Area Waveform with Anomaly Pin */}
        <div className="relative w-full h-36 mt-2">
          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 340 120"
          >
            <defs>
              <linearGradient id="grad-ingress" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00daf3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00daf3" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="grad-egress" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#b0c6ff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#b0c6ff" stopOpacity="0.0" />
              </linearGradient>
              <pattern
                height="24"
                id="grid-pattern"
                patternUnits="userSpaceOnUse"
                width="34"
              >
                <path
                  d="M 34 0 L 0 0 0 24"
                  fill="none"
                  stroke="rgba(132, 147, 150, 0.15)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>

            {/* Grid backplane */}
            <rect fill="url(#grid-pattern)" height="120" width="340" />

            {/* Ingress Area & Curve */}
            <path
              d="M 0,90 Q 30,75 60,82 T 120,60 T 180,72 T 220,20 T 260,65 T 300,50 T 340,40 L 340,120 L 0,120 Z"
              fill="url(#grad-ingress)"
            />
            <path
              d="M 0,90 Q 30,75 60,82 T 120,60 T 180,72 T 220,20 T 260,65 T 300,50 T 340,40"
              fill="none"
              stroke="#00daf3"
              strokeLinecap="round"
              strokeWidth="2.5"
            />

            {/* Egress Area & Curve */}
            <path
              d="M 0,105 Q 40,95 80,98 T 150,88 T 210,80 T 250,55 T 300,80 T 340,70 L 340,120 L 0,120 Z"
              fill="url(#grad-egress)"
            />
            <path
              d="M 0,105 Q 40,95 80,98 T 150,88 T 210,80 T 250,55 T 300,80 T 340,70"
              fill="none"
              stroke="#b0c6ff"
              strokeDasharray="3 3"
              strokeWidth="1.75"
            />

            {/* Anomaly Spike Marker at x=220, y=20 */}
            <line
              opacity="0.8"
              stroke="#ffb4ab"
              strokeDasharray="2 2"
              strokeWidth="1"
              x1="220"
              x2="220"
              y1="20"
              y2="120"
            />
            <circle
              cx="220"
              cy="20"
              fill="#93000a"
              r="4.5"
              stroke="#ffb4ab"
              strokeWidth="2"
            />
            <circle
              className="animate-ping"
              cx="220"
              cy="20"
              fill="none"
              opacity="0.5"
              r="8"
              stroke="#ffb4ab"
              strokeWidth="1"
            />
          </svg>

          {/* Anomaly Flag Chip Positioned Over Peak */}
          <div className="absolute top-1 left-[64%] transform -translate-x-1/2 flex items-center gap-1 bg-[#93000a] text-[#ffe7e6] border border-[#ffb4ab]/50 px-2 py-0.5 rounded shadow-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-[12px]">warning</span>
            <span className="font-label-caps text-[9px] font-bold tracking-tight">
              SPIKE 6.1G DETECTED
            </span>
          </div>
        </div>

        {/* Timeline markers */}
        <div className="flex justify-between items-center mt-2 text-[#bac9cc] font-label-caps text-[9px]">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span className="text-[#ffb4ab] font-bold">14:20 PEAK</span>
          <span>18:00</span>
          <span>NOW</span>
        </div>
      </div>

      {/* Protocol Distribution Segment */}
      <div className="bg-[#1c1f29]/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-[#31353f] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
              donut_large
            </span>
            <span className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              Protocol Distribution
            </span>
          </div>
          <span className="font-label-caps text-[10px] text-[#bac9cc] font-semibold">
            L4/L7 TELEMETRY
          </span>
        </div>

        {/* Stacked Multi-Color Progress Bar */}
        <div className="w-full h-3 bg-[#0a0e17] rounded-full overflow-hidden flex shadow-inner border border-[#31353f]">
          <div className="h-full bg-[#00e5ff]" style={{ width: '62%' }} title="HTTPS 62%"></div>
          <div className="h-full bg-[#0068ed]" style={{ width: '16%' }} title="DNS 16%"></div>
          <div className="h-full bg-[#b0c6ff]" style={{ width: '12%' }} title="SSH 12%"></div>
          <div className="h-full bg-[#ffb4ab] animate-pulse" style={{ width: '8%' }} title="Custom/Unknown TCP 8%"></div>
          <div className="h-full bg-[#849396]" style={{ width: '2%' }} title="ICMP 2%"></div>
        </div>

        {/* Protocol Rows Grid */}
        <div className="flex flex-col space-y-1.5 pt-1">
          {/* HTTPS */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#262a34]/60 border border-[#31353f]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#00e5ff]"></span>
              <span className="font-headline text-[13px] text-[#dfe2ef] font-medium">
                HTTPS / TLS 1.3
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-data-token text-[11px] text-[#bac9cc]">
                2.98 Gbps
              </span>
              <span className="font-data-metric text-[14px] text-[#dfe2ef] font-bold w-10 text-right">
                62%
              </span>
            </div>
          </div>

          {/* DNS / DoH */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#262a34]/60 border border-[#31353f]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#0068ed]"></span>
              <span className="font-headline text-[13px] text-[#dfe2ef] font-medium">
                DNS / DoH
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-data-token text-[11px] text-[#bac9cc]">
                771 Mbps
              </span>
              <span className="font-data-metric text-[14px] text-[#dfe2ef] font-bold w-10 text-right">
                16%
              </span>
            </div>
          </div>

          {/* SSH / SFTP */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#262a34]/60 border border-[#31353f]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#b0c6ff]"></span>
              <span className="font-headline text-[13px] text-[#dfe2ef] font-medium">
                SSH / SFTP Tunnel
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-data-token text-[11px] text-[#bac9cc]">
                578 Mbps
              </span>
              <span className="font-data-metric text-[14px] text-[#dfe2ef] font-bold w-10 text-right">
                12%
              </span>
            </div>
          </div>

          {/* Flagged Custom / Unknown TCP */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/40">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#ffb4ab]"></span>
              <span className="font-headline text-[13px] text-[#ffb4ab] font-semibold truncate">
                Custom / Unknown TCP
              </span>
              <span className="material-symbols-outlined text-[15px] text-[#ffb4ab] shrink-0">
                report
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-data-token text-[11px] text-[#ffb4ab] font-bold">
                385 Mbps
              </span>
              <span className="font-data-metric text-[14px] text-[#ffb4ab] font-bold w-10 text-right">
                8%
              </span>
            </div>
          </div>

          {/* ICMP / Other */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#262a34]/60 border border-[#31353f]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#849396]"></span>
              <span className="font-headline text-[13px] text-[#dfe2ef] font-medium">
                ICMP / Other Routing
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-data-token text-[11px] text-[#bac9cc]">
                96 Mbps
              </span>
              <span className="font-data-metric text-[14px] text-[#dfe2ef] font-bold w-10 text-right">
                2%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inference & DB Pipeline Bento Panel */}
      <div className="bg-[#1c1f29]/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-[#31353f] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
              terminal
            </span>
            <span className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              Inference &amp; DB Pipeline
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#00e5ff]/10 font-label-caps text-[9px] text-[#00e5ff] font-bold border border-[#00e5ff]/30">
            ALL OPERATIONAL
          </span>
        </div>

        <div className="flex flex-col space-y-2">
          {/* FastAPI Service */}
          <div className="p-3 bg-[#262a34]/70 rounded-lg border border-[#31353f]/60 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-headline text-[13px] text-[#dfe2ef] font-semibold">
                FastAPI Inference Pipeline
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff]"></span>
                <span className="font-data-token text-[12px] text-[#00e5ff] font-bold">
                  99.98%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[#bac9cc] font-data-token text-[11px] pt-0.5">
              <span>Avg Latency: <strong className="text-[#dfe2ef]">3.8 ms</strong></span>
              <span>Workers: 16 uvicorn</span>
            </div>
          </div>

          {/* PostgreSQL Telemetry DB */}
          <div className="p-3 bg-[#262a34]/70 rounded-lg border border-[#31353f]/60 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-headline text-[13px] text-[#dfe2ef] font-semibold">
                PostgreSQL Flow Telemetry DB
              </span>
              <span className="font-data-token text-[11px] text-[#b0c6ff] font-bold">
                42.8M rows/day
              </span>
            </div>
            <div className="flex items-center justify-between text-[#bac9cc] font-data-token text-[11px] pt-0.5">
              <span>Write Buffer: <strong className="text-[#00e5ff]">94% optimal</strong></span>
              <span>IOPS: 14.2k</span>
            </div>
          </div>

          {/* ML Anomaly Model */}
          <div className="p-3 bg-[#262a34]/70 rounded-lg border border-[#31353f]/60 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-headline text-[13px] text-[#dfe2ef] font-semibold">
                Anomaly Model (XGBoost + iForest v3.2)
              </span>
              <span className="px-1.5 py-0.5 bg-[#0068ed]/30 text-[#d9e2ff] font-label-caps text-[9px] font-bold rounded border border-[#0068ed]/40">
                ARMED &amp; SYNCING
              </span>
            </div>
            <div className="flex items-center justify-between text-[#bac9cc] font-data-token text-[11px] pt-0.5">
              <span>Accuracy F1: <strong className="text-[#dfe2ef]">0.994</strong></span>
              <span>Drift Score: 0.02 (Nominal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Geo-Traffic Threat Origins */}
      <div className="bg-[#1c1f29]/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-[#31353f] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
              public
            </span>
            <span className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              Geo-Traffic Threat Origins
            </span>
          </div>
          <span className="font-label-caps text-[10px] text-[#ffb4ab] font-bold bg-[#93000a]/30 px-2 py-0.5 rounded border border-[#ffb4ab]/30">
            8.4% ANOMALOUS
          </span>
        </div>

        {/* Static Map Hook */}
        <div
          className="w-full h-32 bg-cover bg-center rounded-lg relative overflow-hidden flex flex-col justify-end p-2.5 shadow-inner border border-[#31353f]"
          style={{ backgroundImage: `url('${ASSETS.mapFrankfurt}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#31353f]/90 px-2 py-0.5 rounded backdrop-blur-sm border border-[#31353f]">
              <span className="material-symbols-outlined text-[14px] text-[#ffb4ab]">
                fmd_bad
              </span>
              <span className="font-label-caps text-[9px] text-[#dfe2ef] font-semibold">
                BGP INGRESS MAP ACTIVE
              </span>
            </div>
            <span className="font-data-token text-[11px] text-[#00e5ff] font-bold">
              68 CLOUD POPS
            </span>
          </div>
        </div>

        {/* Geo Distribution Breakdown */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-[#181b25] p-2 rounded-lg border border-[#31353f]/60 flex flex-col">
            <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
              US-East
            </span>
            <span className="font-data-metric text-[16px] text-[#dfe2ef] font-bold mt-0.5">
              54%
            </span>
            <span className="font-data-token text-[10px] text-[#00e5ff]">
              Normal
            </span>
          </div>
          <div className="bg-[#181b25] p-2 rounded-lg border border-[#31353f]/60 flex flex-col">
            <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
              EU-Central
            </span>
            <span className="font-data-metric text-[16px] text-[#dfe2ef] font-bold mt-0.5">
              28%
            </span>
            <span className="font-data-token text-[10px] text-[#00e5ff]">
              Normal
            </span>
          </div>
          <div className="bg-[#93000a]/25 p-2 rounded-lg border border-[#ffb4ab]/40 flex flex-col">
            <span className="font-label-caps text-[9px] text-[#ffb4ab] uppercase font-bold">
              High-Risk Geo
            </span>
            <span className="font-data-metric text-[16px] text-[#ffb4ab] font-bold mt-0.5">
              8.4%
            </span>
            <span className="font-data-token text-[10px] text-[#ffb4ab] font-semibold">
              Sanctioned
            </span>
          </div>
        </div>
      </div>

      {/* Operational Action Triggers */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleRunPing}
          className="flex-1 flex items-center justify-center gap-2 bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#00363d] py-3 px-4 rounded-xl font-headline text-[14px] font-bold shadow-[0_0_16px_rgba(0,229,255,0.35)] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">
            {pingRunning ? 'sync' : 'bolt'}
          </span>
          <span>{pingRunning ? 'Pinging Gateways...' : 'Run Diagnostic Ping'}</span>
        </button>

        <button
          onClick={handleExportSiem}
          className="flex items-center justify-center gap-1.5 bg-[#262a34] hover:bg-[#31353f] border border-[#31353f] text-[#dfe2ef] py-3 px-4 rounded-xl font-headline text-[14px] font-semibold active:scale-[0.98] transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-[20px] text-[#00e5ff]">
            {exportRunning ? 'cloud_sync' : 'cloud_upload'}
          </span>
          <span>{exportRunning ? 'Streaming...' : 'Export SIEM'}</span>
        </button>
      </div>

      {/* Feedback messages */}
      {pingResult && (
        <div className="p-3 bg-[#0a0e17] border border-[#00e5ff] rounded-xl text-[#00e5ff] font-data-token text-[12px] flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{pingResult}</span>
        </div>
      )}

      {exportResult && (
        <div className="p-3 bg-[#0a0e17] border border-[#b0c6ff] rounded-xl text-[#b0c6ff] font-data-token text-[12px] flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined">done_all</span>
          <span>{exportResult}</span>
        </div>
      )}
    </div>
  );
};
