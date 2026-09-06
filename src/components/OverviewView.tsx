import React, { useState } from 'react';
import { ScreenTab } from '../types';

interface OverviewViewProps {
  onNavigate: (tab: ScreenTab) => void;
  onInspectAlert: (alertId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  onInspectAlert,
}) => {
  // Engine Controls states
  const [autoContainment, setAutoContainment] = useState(true);
  const [packetMirroring, setPacketMirroring] = useState(true);
  const [dpiAnalysis, setDpiAnalysis] = useState(true);

  // Incident Response Toast state
  const [showIrToast, setShowIrToast] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  const handleEngageResponse = () => {
    setIsArmed(true);
    setShowIrToast(true);
    setTimeout(() => {
      setShowIrToast(false);
      setIsArmed(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-2xl mx-auto pb-6 animate-fadeIn">
      {/* Status Summary Banner: Tactical Threat Index */}
      <div className="relative overflow-hidden rounded-xl bg-[#262a34] p-4 border border-[#31353f] shadow-2xl">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#93000a]/25 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-[#00e5ff]/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffb4ab]"></span>
              </span>
              <span className="font-label-caps text-[10px] text-[#ffb4ab] uppercase tracking-wider font-bold">
                DEFCON 3 // ELEVATED
              </span>
            </div>
            <h1 className="font-headline font-bold text-[20px] text-[#dfe2ef] tracking-tight leading-tight">
              Threat Index Active
            </h1>
            <p className="font-data-token text-[12px] text-[#bac9cc] truncate mt-0.5">
              FastAPI ML Engine: Active • 142.8k pkts/s
            </p>
          </div>

          {/* Radial Dial Risk Score */}
          <div className="relative flex items-center justify-center shrink-0 w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
              <circle
                className="text-[#31353f] stroke-current"
                cx="36"
                cy="36"
                fill="none"
                r="30"
                strokeWidth="6"
              />
              <circle
                className="text-[#ffb4ab] stroke-current"
                cx="36"
                cy="36"
                fill="none"
                r="30"
                strokeDasharray="188.5"
                strokeDashoffset="49"
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-data-display text-[22px] leading-5 font-bold text-[#ffb4ab]">
                74
              </span>
              <span className="font-label-caps text-[9px] leading-3 text-[#bac9cc] uppercase font-medium">
                /100
              </span>
            </div>
          </div>
        </div>

        {/* Micro telemetry alert pill inside banner */}
        <div className="mt-3 pt-2 flex items-center justify-between bg-[#0a0e17]/80 border border-[#31353f]/80 px-3 py-1.5 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f5ff] text-[18px]">
              security
            </span>
            <span className="font-data-token text-[11px] text-[#dfe2ef]">
              SOC Autopilot Vigilance: Strict
            </span>
          </div>
          <span className="font-label-caps text-[9px] text-[#00e5ff] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#00e5ff]/10">
            SYNCED
          </span>
        </div>
      </div>

      {/* Key Metric Telemetry Grid (2x2) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Stat 1: Active Threats */}
        <div
          onClick={() => onNavigate('alerts')}
          className="flex flex-col justify-between p-3.5 bg-[#262a34] rounded-xl border border-[#31353f] shadow-md hover:border-[#ffb4ab]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase font-semibold">
              Active Threats
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffe7e6] font-label-caps text-[9px] font-bold shadow-[0_0_8px_rgba(255,51,75,0.4)]">
              CRIT 3
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-data-display text-[26px] text-[#ffb4ab] font-bold leading-none">
              14
            </span>
            <span className="font-data-token text-[11px] text-[#ffb4ab] font-semibold">
              +3 (10m)
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[#bac9cc] text-[11px]">
            <span className="material-symbols-outlined text-[14px] text-[#ffb4ab]">
              crisis_alert
            </span>
            <span className="font-data-token">Immediate Action</span>
          </div>
        </div>

        {/* Stat 2: Packets Flow */}
        <div
          onClick={() => onNavigate('telemetry')}
          className="flex flex-col justify-between p-3.5 bg-[#262a34] rounded-xl border border-[#31353f] shadow-md hover:border-[#00e5ff]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase font-semibold">
              Packets Flow
            </span>
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">
              show_chart
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-data-display text-[24px] text-[#c3f5ff] font-bold leading-none">
              1.84M
            </span>
            <div className="w-14 h-6">
              {/* Inline micro sparkline SVG */}
              <svg className="w-full h-full" fill="none" viewBox="0 0 50 20">
                <path
                  className="stroke-[#00daf3]"
                  d="M1 18 L10 14 L18 16 L28 9 L38 12 L49 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[#00daf3]">
            <span className="material-symbols-outlined text-[14px]">
              north_east
            </span>
            <span className="font-data-token text-[11px] font-semibold">
              +8.2% baseline
            </span>
          </div>
        </div>

        {/* Stat 3: Anomaly Rate */}
        <div
          onClick={() => onNavigate('analysis')}
          className="flex flex-col justify-between p-3.5 bg-[#262a34] rounded-xl border border-[#31353f] shadow-md hover:border-[#b0c6ff]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase font-semibold">
              Anomaly Rate
            </span>
            <span className="font-data-token text-[10px] text-[#00e5ff] bg-[#00e5ff]/10 px-1 rounded">
              4.2ms
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-data-display text-[24px] text-[#dfe2ef] font-bold leading-none">
              2.4%
            </span>
            <span className="font-data-token text-[11px] text-[#b0c6ff]">
              IsoForest
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[#bac9cc]">
            <span className="material-symbols-outlined text-[14px] text-[#b0c6ff]">
              psychology
            </span>
            <span className="font-data-token text-[11px]">
              Model Confidence 98%
            </span>
          </div>
        </div>

        {/* Stat 4: Isolated Nodes */}
        <div
          onClick={() => onNavigate('analysis')}
          className="flex flex-col justify-between p-3.5 bg-[#262a34] rounded-xl border border-[#31353f] shadow-md hover:border-[#0068ed]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase font-semibold">
              Isolated Nodes
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#0068ed] text-[#f2f3ff] font-label-caps text-[9px] font-bold">
              L2 AIRGAP
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-data-display text-[24px] text-[#d9e2ff] font-bold leading-none">
              5
            </span>
            <span className="font-data-token text-[11px] text-[#bac9cc]">
              Hosts
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[#b0c6ff]">
            <span className="material-symbols-outlined text-[14px]">
              lock
            </span>
            <span className="font-data-token text-[11px]">
              Containment Stable
            </span>
          </div>
        </div>
      </div>

      {/* Engine Controls Row */}
      <div className="flex flex-col gap-1.5">
        <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase tracking-wider px-1">
          Engine Controls
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {/* Toggle 1 */}
          <button
            onClick={() => setAutoContainment(!autoContainment)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-on-surface shrink-0 active:scale-95 transition-all ${
              autoContainment
                ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#c3f5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                : 'bg-[#262a34] border-[#31353f] text-[#bac9cc]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              verified_user
            </span>
            <span className="font-data-token text-[12px] whitespace-nowrap">
              Auto-Containment
            </span>
            <span
              className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                autoContainment
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'bg-[#181b25] text-[#bac9cc]'
              }`}
            >
              {autoContainment ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Toggle 2 */}
          <button
            onClick={() => setPacketMirroring(!packetMirroring)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-on-surface shrink-0 active:scale-95 transition-all ${
              packetMirroring
                ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#c3f5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                : 'bg-[#262a34] border-[#31353f] text-[#bac9cc]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              sync_alt
            </span>
            <span className="font-data-token text-[12px] whitespace-nowrap">
              Packet Mirroring
            </span>
            <span
              className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                packetMirroring
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'bg-[#181b25] text-[#bac9cc]'
              }`}
            >
              {packetMirroring ? 'LIVE' : 'PAUSED'}
            </span>
          </button>

          {/* Toggle 3 */}
          <button
            onClick={() => setDpiAnalysis(!dpiAnalysis)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-on-surface shrink-0 active:scale-95 transition-all ${
              dpiAnalysis
                ? 'bg-[#b0c6ff]/20 border-[#b0c6ff] text-[#d9e2ff]'
                : 'bg-[#262a34] border-[#31353f] text-[#bac9cc]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              manage_search
            </span>
            <span className="font-data-token text-[12px] whitespace-nowrap">
              DPI Analysis
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#181b25] font-label-caps text-[9px] text-[#b0c6ff]">
              L7
            </span>
          </button>
        </div>
      </div>

      {/* Live Threat Pulse Feed */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="font-headline font-semibold text-[16px] text-[#dfe2ef]">
              Threat Pulse Stream
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
            </span>
          </div>
          <span className="font-data-token text-[11px] text-[#bac9cc]">
            3 Active Alerts
          </span>
        </div>

        {/* Threat Alert 1 */}
        <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-3.5 border border-[#31353f] shadow-md hover:border-[#ffb4ab]/40 transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ffb4ab]"></div>
          <div className="pl-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffe7e6] font-label-caps text-[9px] font-bold">
                  RISK 96 // CRIT
                </span>
                <span className="font-headline font-semibold text-[13px] text-[#dfe2ef] truncate">
                  Brute Force SSH Attack
                </span>
              </div>
              <span className="font-data-token text-[11px] text-[#bac9cc] shrink-0">
                2m ago
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-data-token text-[11px] text-[#bac9cc] mt-0.5">
              <span className="flex items-center gap-1">
                <span className="text-[#ffb4ab] material-symbols-outlined text-[13px]">
                  my_location
                </span>
                Src: <span className="text-[#dfe2ef]">185.220.101.5 [RU/Tor]</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#00e5ff] material-symbols-outlined text-[13px]">
                  dns
                </span>
                Dst: <span className="text-[#dfe2ef]">192.168.1.104</span>
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-label-caps text-[10px] text-[#ffb4ab] font-medium">
                Auto-mitigation: TCP RST injected
              </span>
              <button
                onClick={() => onInspectAlert('FASTAPI-ALERT-9042')}
                className="px-2.5 py-1 bg-[#262a34] hover:bg-[#31353f] border border-[#31353f] rounded text-[#dfe2ef] hover:text-[#00e5ff] font-label-caps text-[10px] uppercase font-bold tracking-wider transition-colors active:scale-95"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>

        {/* Threat Alert 2 */}
        <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-3.5 border border-[#31353f] shadow-md hover:border-[#b0c6ff]/40 transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0068ed]"></div>
          <div className="pl-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-[#31353f] text-[#b0c6ff] font-label-caps text-[9px] font-bold">
                  RISK 88 // HIGH
                </span>
                <span className="font-headline font-semibold text-[13px] text-[#dfe2ef] truncate">
                  DNS Tunneling Exfiltration
                </span>
              </div>
              <span className="font-data-token text-[11px] text-[#bac9cc] shrink-0">
                6m ago
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-data-token text-[11px] text-[#bac9cc] mt-0.5">
              <span className="flex items-center gap-1">
                <span className="text-[#b0c6ff] material-symbols-outlined text-[13px]">
                  arrow_outward
                </span>
                C2: <span className="text-[#dfe2ef] truncate max-w-[130px]">ns1.c2-exfil.xyz</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#00e5ff] material-symbols-outlined text-[13px]">
                  lan
                </span>
                Host: <span className="text-[#dfe2ef]">10.0.4.12</span>
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-label-caps text-[10px] text-[#b0c6ff] font-medium">
                Sinkhole Filter Applied
              </span>
              <button
                onClick={() => onInspectAlert('SEC-DNS-4118')}
                className="px-2.5 py-1 bg-[#262a34] hover:bg-[#31353f] border border-[#31353f] rounded text-[#dfe2ef] hover:text-[#00e5ff] font-label-caps text-[10px] uppercase font-bold tracking-wider transition-colors active:scale-95"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>

        {/* Threat Alert 3 */}
        <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-3.5 border border-[#31353f] shadow-md hover:border-[#00e5ff]/40 transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00e5ff]"></div>
          <div className="pl-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-[#31353f] text-[#9cf0ff] font-label-caps text-[9px] font-bold">
                  RISK 72 // MED
                </span>
                <span className="font-headline font-semibold text-[13px] text-[#dfe2ef] truncate">
                  Port Sweep SYN Flood
                </span>
              </div>
              <span className="font-data-token text-[11px] text-[#bac9cc] shrink-0">
                11m ago
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-data-token text-[11px] text-[#bac9cc] mt-0.5">
              <span className="flex items-center gap-1">
                <span className="text-[#00e5ff] material-symbols-outlined text-[13px]">
                  network_ping
                </span>
                Rate: <span className="text-[#dfe2ef]">14,200 pkts/s</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#bac9cc] material-symbols-outlined text-[13px]">
                  hub
                </span>
                Target: <span className="text-[#dfe2ef]">Subnet DMZ-02</span>
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-label-caps text-[10px] text-[#00e5ff] font-medium">
                Rate Throttling Enabled
              </span>
              <button
                onClick={() => onInspectAlert('SEC-INT-9901')}
                className="px-2.5 py-1 bg-[#262a34] hover:bg-[#31353f] border border-[#31353f] rounded text-[#dfe2ef] hover:text-[#00e5ff] font-label-caps text-[10px] uppercase font-bold tracking-wider transition-colors active:scale-95"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Response Tactical Trigger Drawer Button */}
      <div className="sticky bottom-2 z-30 pt-2">
        <button
          onClick={handleEngageResponse}
          className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-[#93000a] text-[#ffe7e6] shadow-[0_4px_20px_rgba(147,0,10,0.5)] border border-[#ffb4ab]/30 active:scale-[0.98] transition-all hover:bg-[#b50028] group"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
              local_police
            </span>
            <span className="font-headline text-[14px] sm:text-[15px] font-bold uppercase tracking-wider">
              Engage Incident Response
            </span>
          </div>
          <span className="flex items-center gap-1 font-label-caps text-[10px] bg-[#ffb4ab]/20 px-2 py-0.5 rounded font-bold border border-[#ffb4ab]/40">
            <span>{isArmed ? 'DISPATCHED' : 'ARMED'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </button>
      </div>

      {/* Toast popup */}
      {showIrToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 p-4 bg-[#31353f] text-[#dfe2ef] border border-[#ffb4ab]/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-start gap-3 animate-slideUp">
          <span className="material-symbols-outlined text-[#ffb4ab] text-[24px]">
            crisis_alert
          </span>
          <div className="flex flex-col flex-1">
            <span className="font-headline text-[14px] font-bold text-[#ffb4ab]">
              Incident Response Protocol Dispatched
            </span>
            <p className="font-headline text-[12px] text-[#bac9cc] mt-0.5">
              Isolated 5 compromised targets, snapshotted RAM buffers, and routed high-priority alerts to on-call SecOps lead.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
