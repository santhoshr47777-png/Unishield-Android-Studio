export type ScreenTab = 'overview' | 'alerts' | 'analysis' | 'telemetry' | 'inspector';

export interface ThreatAlert {
  id: string;
  displayId: string;
  title: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  riskScore: number;
  mitreTactic: string;
  srcIp: string;
  srcMeta: string;
  dstIp: string;
  dstMeta: string;
  statsLabel: string;
  statsValue: string;
  protocolTag: string;
  confidence: string;
  status: string;
  statusColor: string;
  mitigationNote: string;
  actionPrimary: string;
}

export interface FrameInfo {
  frameNum: number;
  type: string;
  delta: string;
  isAlert?: boolean;
}

export interface ShapFeature {
  name: string;
  weightText: string;
  percentage: number;
  colorClass: string;
  description: string;
}
