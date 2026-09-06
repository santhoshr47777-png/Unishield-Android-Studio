import React from 'react';
import { ASSETS } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-[#1c1f29] border border-[#00e5ff]/40 rounded-2xl p-5 shadow-2xl z-10 flex flex-col items-center text-center animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#262a34] text-[#bac9cc] hover:text-[#dfe2ef] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="relative mb-3">
          <img
            src={ASSETS.analystPhotoLarge}
            alt="SOC Analyst"
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.4)]"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#00e5ff] border-2 border-[#1c1f29]"></span>
        </div>

        <h3 className="font-headline font-bold text-[18px] text-[#dfe2ef]">
          Elena Chen
        </h3>
        <p className="font-label-caps text-[10px] text-[#00e5ff] uppercase font-bold tracking-wider mt-0.5">
          Senior SOC Analyst // Shift Lead
        </p>
        <span className="font-data-token text-[11px] text-[#bac9cc] mt-1 bg-[#262a34] px-2 py-0.5 rounded border border-[#31353f]">
          BADGE: SEC-OPS-8892 • TS/SCI CLEARANCE
        </span>

        <div className="w-full mt-4 p-3 bg-[#0a0e17] rounded-xl border border-[#31353f] text-left space-y-1.5 font-data-token text-[11px]">
          <div className="flex justify-between text-[#bac9cc]">
            <span>Active Enclave:</span>
            <span className="text-[#dfe2ef] font-semibold">Tier-3 Command Node</span>
          </div>
          <div className="flex justify-between text-[#bac9cc]">
            <span>FastAPI Terminal:</span>
            <span className="text-[#00e5ff]">Connected (ws://soc.internal)</span>
          </div>
          <div className="flex justify-between text-[#bac9cc]">
            <span>Session Lease:</span>
            <span className="text-[#dfe2ef]">06h 42m remaining</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 bg-[#00e5ff] text-[#00363d] rounded-xl font-label-caps text-[11px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,229,255,0.3)] active:scale-95 transition-all"
        >
          Close Dossier
        </button>
      </div>
    </div>
  );
};
