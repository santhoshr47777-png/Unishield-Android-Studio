import React, { useState } from 'react';
import { STREAM_FRAMES } from '../data/mockData';

interface PacketInspectorViewProps {
  onBack: () => void;
}

export const PacketInspectorView: React.FC<PacketInspectorViewProps> = ({
  onBack,
}) => {
  const [activeFrame, setActiveFrame] = useState(4208);
  const [inspectorMode, setInspectorMode] = useState<
    'hex_ascii' | 'raw_hex' | 'payload'
  >('hex_ascii');
  const [searchTerm, setSearchTerm] = useState('SSH-2.0');
  const [showTooltip, setShowTooltip] = useState(true);
  const [copied, setCopied] = useState(false);
  const [pcapStatus, setPcapStatus] = useState<string | null>(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setPcapStatus('Packaging Stream Archive (14.2 MB)...');
    setTimeout(() => {
      setPcapStatus('PCAP Dispatched to Local Storage');
      setTimeout(() => setPcapStatus(null), 3000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-2xl mx-auto pb-20 animate-fadeIn">
      {/* Stream Context Bar & Telemetry Meta */}
      <div className="flex flex-col bg-[#181b25] rounded-xl p-4 shadow-md border border-[#31353f] space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#bac9cc] hover:text-[#00e5ff] transition-colors min-h-[36px] group active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">
              Back to Alerts
            </span>
          </button>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#31353f] border border-[#00e5ff]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
            <span className="font-label-caps text-[9px] text-[#00e5ff] font-bold">
              STREAM 04 // TCP SYN-ACK FOLLOW
            </span>
          </div>
        </div>

        {/* Directional Session Card */}
        <div className="flex flex-col bg-[#1c1f29] rounded-lg p-3 border border-[#31353f]/60 space-y-2">
          <div className="flex items-center justify-between text-[#bac9cc]">
            <span className="font-label-caps text-[10px] uppercase text-[#00e5ff] font-bold">
              Inbound Malicious Vector
            </span>
            <span className="font-label-caps text-[9px] text-[#ffe7e6] bg-[#93000a] px-2 py-0.5 rounded font-bold border border-[#ffb4ab]/30">
              HYDRA SPRAY / HIGH RISK
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-[9px] text-[#bac9cc] font-bold uppercase">
                SOURCE
              </span>
              <span className="font-data-token text-[12px] text-[#ffb4ab] truncate font-bold">
                194.26.29.112:44320
              </span>
              <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase truncate">
                AS44050 [RU / BULLETPROOF]
              </span>
            </div>
            <div className="flex flex-col items-center px-1">
              <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
                sync_alt
              </span>
              <span className="font-label-caps text-[9px] text-[#bac9cc]">
                PORT 22
              </span>
            </div>
            <div className="flex flex-col items-end min-w-0">
              <span className="font-label-caps text-[9px] text-[#bac9cc] font-bold uppercase">
                TARGET ENCLAVE
              </span>
              <span className="font-data-token text-[12px] text-[#dfe2ef] truncate font-bold">
                10.0.1.45:22
              </span>
              <span className="font-label-caps text-[9px] text-[#b0c6ff] truncate">
                PROD-DMZ-SSH-01
              </span>
            </div>
          </div>
        </div>

        {/* Capture Telemetry Counters */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="flex flex-col bg-[#262a34] rounded p-2 text-center border border-[#31353f]/60">
            <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
              Index
            </span>
            <span className="font-data-metric text-[16px] text-[#00e5ff] font-bold">
              4,208
              <span className="text-[#bac9cc] text-[10px] font-normal">/12.8k</span>
            </span>
          </div>
          <div className="flex flex-col bg-[#262a34] rounded p-2 text-center border border-[#31353f]/60">
            <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
              Stream Size
            </span>
            <span className="font-data-metric text-[16px] text-[#dfe2ef] font-bold">
              64.2{' '}
              <span className="text-[#bac9cc] text-[10px] font-normal">KB</span>
            </span>
          </div>
          <div className="flex flex-col bg-[#262a34] rounded p-2 text-center border border-[#31353f]/60">
            <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase font-bold">
              Buffer State
            </span>
            <span className="font-data-metric text-[16px] text-[#00e5ff] font-bold">
              READY
            </span>
          </div>
        </div>
      </div>

      {/* Frame Navigation & Scrub Ribbon */}
      <div className="flex flex-col bg-[#181b25] rounded-xl p-3 border border-[#31353f] space-y-2 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">
              view_timeline
            </span>
            <span className="font-label-caps text-[10px] uppercase text-[#dfe2ef] font-semibold">
              Frame Chronology Scrubber
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveFrame((prev) => Math.max(4206, prev - 1))}
              className="px-2 py-1 bg-[#262a34] hover:bg-[#31353f] rounded text-[#dfe2ef] font-label-caps text-[10px] uppercase flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_left</span>
              Prev
            </button>
            <button
              onClick={() => setActiveFrame((prev) => Math.min(4210, prev + 1))}
              className="px-2 py-1 bg-[#262a34] hover:bg-[#31353f] rounded text-[#00e5ff] font-label-caps text-[10px] uppercase flex items-center gap-0.5"
            >
              Next
              <span className="material-symbols-outlined text-[13px]">arrow_right</span>
            </button>
          </div>
        </div>

        {/* Packet selector horizontal stream strip */}
        <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar scroll-smooth">
          {STREAM_FRAMES.map((f) => {
            const isCurr = activeFrame === f.frameNum;
            return (
              <div
                key={f.frameNum}
                onClick={() => setActiveFrame(f.frameNum)}
                className={`flex flex-col min-w-[104px] p-2 rounded cursor-pointer transition-all border ${
                  isCurr
                    ? 'bg-[#00e5ff]/15 border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                    : 'bg-[#262a34] border-[#31353f] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-data-token text-[11px] font-bold ${
                      isCurr ? 'text-[#00e5ff]' : 'text-[#bac9cc]'
                    }`}
                  >
                    #{f.frameNum}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      f.isAlert ? 'bg-[#ffb4ab] animate-ping' : 'bg-[#b0c6ff]'
                    }`}
                  ></span>
                </div>
                <span className="font-data-token text-[12px] text-[#dfe2ef] font-semibold mt-1">
                  {f.type}
                </span>
                <span
                  className={`font-label-caps text-[9px] ${
                    f.isAlert
                      ? 'text-[#ffb4ab] font-bold'
                      : 'text-[#bac9cc]'
                  }`}
                >
                  {f.delta}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dissected Protocol Stack */}
      <div className="flex flex-col bg-[#181b25] rounded-xl p-4 border border-[#31353f] shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
              account_tree
            </span>
            <span className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              Dissected Protocol Stack
            </span>
          </div>
          <span className="font-label-caps text-[10px] text-[#bac9cc]">
            4 LAYERS RESOLVED
          </span>
        </div>

        <div className="space-y-2">
          {/* Layer 2 */}
          <details className="group bg-[#1c1f29] rounded-lg border border-[#31353f]/60 overflow-hidden">
            <summary className="flex items-center justify-between p-3 cursor-pointer list-none select-none hover:bg-[#262a34] transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[16px] text-[#00e5ff] group-open:rotate-90 transition-transform">
                  chevron_right
                </span>
                <span className="font-label-caps text-[10px] text-[#00e5ff] uppercase font-bold">
                  Frame 4208:
                </span>
                <span className="font-data-token text-[11px] text-[#dfe2ef] truncate">
                  Ethernet II, Src: 00:1A:2B:3C:4D:5E
                </span>
              </div>
              <span className="font-label-caps text-[9px] text-[#bac9cc] px-1.5 py-0.5 rounded bg-[#0a0e17]">
                L2
              </span>
            </summary>
            <div className="p-3 pt-0 space-y-1 bg-[#0a0e17]/80 font-data-token text-[11px] text-[#bac9cc]">
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="text-[#dfe2ef]">00:0c:29:84:11:f2 (VMware_84:11:f2)</span>
              </div>
              <div className="flex justify-between">
                <span>Source:</span>
                <span className="text-[#dfe2ef]">00:1a:2b:3c:4d:5e (Cisco_3c:4d:5e)</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="text-[#00e5ff]">IPv4 (0x0800)</span>
              </div>
            </div>
          </details>

          {/* Layer 3 */}
          <details className="group bg-[#1c1f29] rounded-lg border border-[#31353f]/60 overflow-hidden">
            <summary className="flex items-center justify-between p-3 cursor-pointer list-none select-none hover:bg-[#262a34] transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[16px] text-[#00e5ff] group-open:rotate-90 transition-transform">
                  chevron_right
                </span>
                <span className="font-label-caps text-[10px] text-[#00e5ff] uppercase font-bold">
                  IPv4:
                </span>
                <span className="font-data-token text-[11px] text-[#dfe2ef] truncate">
                  Src: 194.26.29.112, Dst: 10.0.1.45
                </span>
              </div>
              <span className="font-label-caps text-[9px] text-[#bac9cc] px-1.5 py-0.5 rounded bg-[#0a0e17]">
                L3
              </span>
            </summary>
            <div className="p-3 pt-0 space-y-1 bg-[#0a0e17]/80 font-data-token text-[11px] text-[#bac9cc]">
              <div className="flex justify-between">
                <span>Time to Live (TTL):</span>
                <span className="text-[#dfe2ef]">52 (Observed hop count: 12)</span>
              </div>
              <div className="flex justify-between">
                <span>Flags:</span>
                <span className="text-[#dfe2ef]">0x02, Don't Fragment (DF)</span>
              </div>
              <div className="flex justify-between">
                <span>Autonomous System:</span>
                <span className="text-[#ffb4ab]">AS44050 // Bulletproof Hosting NL/RU</span>
              </div>
            </div>
          </details>

          {/* Layer 4 */}
          <details className="group bg-[#1c1f29] rounded-lg border border-[#31353f]/60 overflow-hidden">
            <summary className="flex items-center justify-between p-3 cursor-pointer list-none select-none hover:bg-[#262a34] transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[16px] text-[#00e5ff] group-open:rotate-90 transition-transform">
                  chevron_right
                </span>
                <span className="font-label-caps text-[10px] text-[#00e5ff] uppercase font-bold">
                  TCP:
                </span>
                <span className="font-data-token text-[11px] text-[#dfe2ef] truncate">
                  Src Port: 44320, Dst Port: 22 [PSH, ACK]
                </span>
              </div>
              <span className="font-label-caps text-[9px] text-[#bac9cc] px-1.5 py-0.5 rounded bg-[#0a0e17]">
                L4
              </span>
            </summary>
            <div className="p-3 pt-0 space-y-1 bg-[#0a0e17]/80 font-data-token text-[11px] text-[#bac9cc]">
              <div className="flex justify-between">
                <span>Sequence Number:</span>
                <span className="text-[#dfe2ef]">3847291024</span>
              </div>
              <div className="flex justify-between">
                <span>Window Size:</span>
                <span className="text-[#dfe2ef]">65535</span>
              </div>
            </div>
          </details>

          {/* Layer 7 (Flagged Alert) */}
          <details
            className="group bg-[#1c1f29] rounded-lg border border-[#ffb4ab]/50 overflow-hidden"
            open
          >
            <summary className="flex items-center justify-between p-3 cursor-pointer list-none select-none bg-[#93000a]/20 transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[16px] text-[#ffb4ab] group-open:rotate-90 transition-transform">
                  chevron_right
                </span>
                <span className="font-label-caps text-[10px] text-[#ffb4ab] uppercase font-bold">
                  SSH-2.0 Payload:
                </span>
                <span className="font-data-token text-[11px] text-[#ffb4ab] truncate font-bold">
                  Malicious Handshake Probe Detected
                </span>
              </div>
              <span className="font-label-caps text-[9px] text-[#ffe7e6] bg-[#93000a] px-1.5 py-0.5 rounded font-bold">
                L7 ALERT
              </span>
            </summary>
            <div className="p-3 space-y-1.5 bg-[#0a0e17]/90 font-data-token text-[11px]">
              <div className="flex items-center gap-1.5 text-[#ffb4ab]">
                <span className="material-symbols-outlined text-[15px]">
                  bug_report
                </span>
                <span className="font-semibold text-[11px]">
                  Signature: HYDRA_SSH_BRUTE_v9.2_SIGN
                </span>
              </div>
              <p className="text-[11px] text-[#bac9cc] leading-relaxed">
                Banner identification strings contain altered cipher list matching automated credential pump suite. Non-standard padding pattern at offset <code className="text-[#00e5ff]">0x002e</code>.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Raw Packet Stream Inspector */}
      <div className="flex flex-col bg-[#181b25] rounded-xl p-4 border border-[#31353f] shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
              terminal
            </span>
            <span className="font-headline font-semibold text-[15px] text-[#dfe2ef]">
              Raw Packet Stream Inspector
            </span>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 bg-[#262a34] p-1 rounded-lg self-start border border-[#31353f]">
            <button
              onClick={() => setInspectorMode('hex_ascii')}
              className={`px-2.5 py-1 rounded font-label-caps text-[10px] font-bold uppercase transition-all ${
                inspectorMode === 'hex_ascii'
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'text-[#bac9cc] hover:text-[#dfe2ef]'
              }`}
            >
              Hex + ASCII
            </button>
            <button
              onClick={() => setInspectorMode('raw_hex')}
              className={`px-2.5 py-1 rounded font-label-caps text-[10px] uppercase transition-all ${
                inspectorMode === 'raw_hex'
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'text-[#bac9cc] hover:text-[#dfe2ef]'
              }`}
            >
              Raw Hex
            </button>
            <button
              onClick={() => setInspectorMode('payload')}
              className={`px-2.5 py-1 rounded font-label-caps text-[10px] uppercase transition-all ${
                inspectorMode === 'payload'
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'text-[#bac9cc] hover:text-[#dfe2ef]'
              }`}
            >
              Payload Only
            </button>
          </div>
        </div>

        {/* Live Filter & Byte Search */}
        <div className="relative flex items-center bg-[#0a0e17] rounded-lg px-3 py-2 border border-[#31353f]">
          <span className="text-[#00e5ff] font-mono text-sm mr-2 font-bold">&gt;</span>
          <input
            className="bg-transparent border-none text-[#dfe2ef] font-data-token text-[12px] focus:outline-none w-full placeholder-[#849396]"
            placeholder="Find hex or string (e.g. 0x90, /bin/sh)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="font-label-caps text-[10px] text-[#00e5ff] bg-[#262a34] px-2 py-0.5 rounded-full whitespace-nowrap border border-[#00e5ff]/30">
            3 MATCHES
          </span>
        </div>

        {/* Active Tooltip Banner */}
        {showTooltip && (
          <div className="flex items-center justify-between bg-[#93000a]/25 border border-[#ffb4ab]/40 p-2.5 rounded-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">
                verified_user
              </span>
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] text-[#ffb4ab] font-bold uppercase">
                  MALICIOUS_SIGNATURE_MATCH
                </span>
                <span className="font-data-token text-[11px] text-[#dfe2ef]">
                  Target Offset: <span className="text-[#00e5ff]">0x0000 - 0x0017</span> (SSH Banner Injection)
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#bac9cc] hover:text-[#dfe2ef] p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* Terminal Hex Grid Container */}
        <div className="relative bg-[#0a0e17] rounded-lg p-3 overflow-x-auto border border-[#31353f] shadow-inner">
          <div className="min-w-[460px] font-data-token text-[11px] leading-[22px] select-all space-y-0.5">
            {/* Header Column Labels */}
            <div className="flex text-[#849396] font-label-caps text-[10px] pb-1 border-b border-[#31353f] mb-1">
              <span className="w-16">OFFSET</span>
              <span className="flex-1">
                00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F
              </span>
              {inspectorMode !== 'raw_hex' && (
                <span className="w-36 text-right">ASCII DUMP</span>
              )}
            </div>

            {/* Line 0000 */}
            <div className="flex items-center hover:bg-[#262a34]/40 rounded px-1 transition-colors">
              <span className="w-16 text-[#00e5ff] font-mono">0000:</span>
              <div className="flex-1 font-mono tracking-tight">
                <span className="bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold px-0.5 rounded">
                  53 53 48 2d
                </span>
                <span className="bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold px-0.5 rounded">
                  32 2e 30 2d
                </span>
                <span className="bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold px-0.5 rounded mr-1">
                  4f 70 65 6e
                </span>
                <span className="bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold px-0.5 rounded">
                  53 53 48 5f
                </span>
              </div>
              {inspectorMode !== 'raw_hex' && (
                <div className="w-36 text-right font-mono bg-[#93000a]/20 text-[#ffb4ab] px-1 rounded">
                  |SSH-2.0-OpenSSH_|
                </div>
              )}
            </div>

            {/* Line 0010 */}
            <div className="flex items-center hover:bg-[#262a34]/40 rounded px-1 transition-colors">
              <span className="w-16 text-[#00e5ff] font-mono">0010:</span>
              <div className="flex-1 font-mono tracking-tight">
                <span className="bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold px-0.5 rounded">
                  38 2e 39 70
                </span>
                <span className="bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold px-0.5 rounded">
                  31 20 55 62
                </span>
                <span className="text-[#dfe2ef] mr-1">75 6e 74 75</span>
                <span className="text-[#dfe2ef]">-33 75 62 75</span>
              </div>
              {inspectorMode !== 'raw_hex' && (
                <div className="w-36 text-right font-mono text-[#dfe2ef]">
                  |<span className="text-[#ffb4ab]">8.9p1 Ub</span>untu-3ubu|
                </div>
              )}
            </div>

            {/* Line 0020 */}
            <div className="flex items-center hover:bg-[#262a34]/40 rounded px-1 transition-colors">
              <span className="w-16 text-[#00e5ff] font-mono">0020:</span>
              <div className="flex-1 font-mono tracking-tight text-[#bac9cc]">
                <span>6e 74 75 30</span>
                <span> 2e 36 0d 0a</span>
                <span className="mr-1 text-[#00e5ff]"> 00 00 01 4c</span>
                <span className="text-[#00e5ff]"> 08 14 9d e2</span>
              </div>
              {inspectorMode !== 'raw_hex' && (
                <div className="w-36 text-right font-mono text-[#bac9cc]">
                  |ntu0.6....L....|
                </div>
              )}
            </div>

            {/* Line 0030 */}
            <div className="flex items-center hover:bg-[#262a34]/40 rounded px-1 transition-colors">
              <span className="w-16 text-[#00e5ff] font-mono">0030:</span>
              <div className="flex-1 font-mono tracking-tight text-[#dfe2ef]">
                <span>8a 72 10 3b</span>
                <span> ff 29 a1 00</span>
                <span className="mr-1"> c4 d3 91 e0</span>
                <span> 11 09 a2 44</span>
              </div>
              {inspectorMode !== 'raw_hex' && (
                <div className="w-36 text-right font-mono text-[#bac9cc]">
                  |.r.;.).....!..D|
                </div>
              )}
            </div>

            {/* Line 0040 */}
            <div className="flex items-center hover:bg-[#262a34]/40 rounded px-1 transition-colors">
              <span className="w-16 text-[#00e5ff] font-mono">0040:</span>
              <div className="flex-1 font-mono tracking-tight text-[#dfe2ef]">
                <span>63 75 72 76</span>
                <span> 65 32 35 35</span>
                <span className="mr-1"> 31 39 2d 73</span>
                <span> 68 61 32 35</span>
              </div>
              {inspectorMode !== 'raw_hex' && (
                <div className="w-36 text-right font-mono text-[#00e5ff]">
                  |curve25519-sha25|
                </div>
              )}
            </div>

            {/* Line 0070 */}
            <div className="flex items-center hover:bg-[#262a34]/40 rounded px-1 transition-colors">
              <span className="w-16 text-[#00e5ff] font-mono">0070:</span>
              <div className="flex-1 font-mono tracking-tight text-[#dfe2ef]">
                <span>36 2c 73 73</span>
                <span> 68 2d 65 64</span>
                <span className="mr-1"> 32 35 35 31</span>
                <span className="text-[#ffb4ab] bg-[#93000a]/30 px-0.5 rounded">
                  39 00 00 00
                </span>
              </div>
              {inspectorMode !== 'raw_hex' && (
                <div className="w-36 text-right font-mono text-[#dfe2ef]">
                  |6,ssh-ed2551<span className="text-[#ffb4ab] font-bold">9...</span>|
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Micro Actions */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[#bac9cc] hover:text-[#00e5ff] transition-colors text-[11px] font-label-caps uppercase"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied Slice!' : 'Copy Stream Slice'}</span>
            </button>
            <span className="text-[#3b494c] text-[10px]">•</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[#bac9cc] hover:text-[#00e5ff] transition-colors text-[11px] font-label-caps uppercase"
            >
              <span className="material-symbols-outlined text-[15px]">code</span>
              <span>Raw C-Array</span>
            </button>
          </div>
          <span className="font-data-token text-[10px] text-[#bac9cc]">
            Offset range: 0x0000 - 0x007F (128 bytes)
          </span>
        </div>
      </div>

      {/* Forensic Stream Metadata & Hash Verification Deck */}
      <div className="flex flex-col bg-[#181b25] rounded-xl p-4 border border-[#31353f] shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[10px] text-[#bac9cc] uppercase font-bold">
            Evidence Chain Integrity
          </span>
          <div className="flex items-center gap-1 text-[#00e5ff]">
            <span className="material-symbols-outlined text-[15px]">gpp_good</span>
            <span className="font-label-caps text-[10px] font-bold">
              VERIFIED SOC DAEMON
            </span>
          </div>
        </div>
        <div className="flex items-center bg-[#0a0e17] rounded p-2.5 border border-[#31353f]">
          <span className="font-label-caps text-[9px] text-[#00e5ff] uppercase mr-2 font-bold shrink-0">
            SHA256:
          </span>
          <span className="font-data-token text-[10px] text-[#dfe2ef] truncate font-mono">
            e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          </span>
        </div>
      </div>

      {/* Action Deck & PCAP Export */}
      <div className="flex flex-col space-y-2 pt-1">
        <button
          onClick={handleDownload}
          className="w-full min-h-[48px] bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#00363d] rounded-xl font-headline text-[14px] font-bold flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(0,229,255,0.35)] active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[22px]">
            sim_card_download
          </span>
          <span>Download PCAP (14.2 MB)</span>
          <span className="ml-1 px-1.5 py-0.5 rounded bg-[#00363d]/15 text-[10px] font-label-caps uppercase font-bold">
            Ready
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => alert('Suricata rule exported:\nalert tcp 194.26.29.112 any -> $HOME_NET 22 (msg:"HYDRA SSH BRUTE"; sid:904201; rev:1;)')}
            className="min-h-[40px] bg-[#262a34] hover:bg-[#31353f] border border-[#31353f] text-[#dfe2ef] rounded-lg font-data-token text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">terminal</span>
            <span>Export Suricata Rule</span>
          </button>
          <button
            onClick={() => alert('Dispatched packet frames to Cuckoo/AnyRun Sandbox instance #7.')}
            className="min-h-[40px] bg-[#262a34] hover:bg-[#31353f] border border-[#31353f] text-[#dfe2ef] rounded-lg font-data-token text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">open_in_new</span>
            <span>Push to Sandbox</span>
          </button>
        </div>
      </div>

      {/* PCAP Notification toast */}
      {pcapStatus && (
        <div className="p-3 bg-[#00e5ff]/20 border border-[#00e5ff] rounded-xl text-[#c3f5ff] font-data-token text-[12px] flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[#00e5ff]">
            cloud_download
          </span>
          <span>{pcapStatus}</span>
        </div>
      )}
    </div>
  );
};
