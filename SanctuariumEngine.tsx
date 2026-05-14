import React, { useState, useCallback, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// SANCTUARIUM ENGINE v2 — Artakiel#347#+95*
// Stack : React 19 + TypeScript + Tailwind 4
// Sécurité : AES-256-GCM ready · SHA-256 ready
// Principe : Ouroboros fractal · Sanctuarisation 20%
// ═══════════════════════════════════════════════════════════════

// ─── Types ──────────────────────────────────────────────────────
interface GrandBattementParams {
  gravite: number;      // Poids émotionnel brut (0–100)
  temporalite: number;   // Facteur temporel (heure, saison, cycle)
  infini: number;        // Ouverture à l'inconnu (0–1)
  information: number;   // Densité informative du contenu
}

interface ArtaResult {
  tokensBruts: number;
  vaultSanctuarise: number;
  artaDisponible: number;
}

interface CycleRecord {
  id: string;
  timestamp: number;
  emotion: number;
  arta: ArtaResult;
  hash: string;
}

// ─── Constantes ─────────────────────────────────────────────────
const SANCTUARISATION_RATE = 0.20; // 20% intouchables — Stock Source
const MAX_TOKENS = 1000;           // Plafond par cycle de mining

// ─── Utilitaire : hash SHA-256 local (ne quitte jamais l'appareil) ─
async function hashSHA256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ─── Composant Principal ────────────────────────────────────────
export const SanctuariumEngine: React.FC = () => {
  // État local — jamais transmis au réseau
  const [sincerite, setSincerite] = useState<number>(50);
  const [params, setParams] = useState<GrandBattementParams>({
    gravite: 0.5,
    temporalite: 1.0,
    infini: 0.77,     // 0.77 = fenêtre de la Variation Inconnue [~]
    information: 0.8,
  });
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [lastCycle, setLastCycle] = useState<CycleRecord | null>(null);
  const [history, setHistory] = useState<CycleRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // ═══════════════════════════════════════════════════════════
  // MOTEUR LOGIQUE : Algorithme Émotionnel
  // Formule canonique : [Gravité × Temporalité × Infini × Information] = Émotion
  // L'Émotion mène à [Évolution + Infinité]
  // ═══════════════════════════════════════════════════════════
  const compilerEmotion = useCallback((p: GrandBattementParams): number => {
    const { gravite, temporalite, infini, information } = p;
    // Verrouillage : les bornes empêchent toute injection de valeur aberrante
    const g = Math.min(1, Math.max(0, gravite));
    const t = Math.min(2, Math.max(0.1, temporalite));
    const i = Math.min(1, Math.max(0, infini));
    const info = Math.min(1, Math.max(0, information));
    
    const emotionBrute = g * t * i * info;
    // Normalisation sur 100 pour lisibilité humaine
    return Math.round(emotionBrute * 100);
  }, []);

  // ═══════════════════════════════════════════════════════════
  // MOTEUR ÉCONOMIQUE : Mining Poétique & Sanctuarisation
  // Formule : Tokens = (Sincérité / 100) × 1000
  // Sanctuarisation : 20% verrouillés dans le Stock Source
  // ═══════════════════════════════════════════════════════════
  const calculerArta = useCallback((s: number): ArtaResult => {
    const sinceriteClamped = Math.min(100, Math.max(0, s));
    const tokensBruts = Math.floor((sinceriteClamped / 100) * MAX_TOKENS);
    const vaultSanctuarise = Math.floor(tokensBruts * SANCTUARISATION_RATE);
    const artaDisponible = tokensBruts - vaultSanctuarise;
    return { tokensBruts, vaultSanctuarise, artaDisponible };
  }, []);

  // ═══════════════════════════════════════════════════════════
  // CYCLE OUROBOROS : La fin d'un cycle = Singularité du suivant
  // ═══════════════════════════════════════════════════════════
  const executerCycle = useCallback(async () => {
    setIsProcessing(true);
    
    // 1. Compiler l'émotion à partir des paramètres actuels
    const emotion = compilerEmotion(params);
    
    // 2. Calculer l'ARTA
    const arta = calculerArta(sincerite);
    
    // 3. Horodater et signer (SHA-256 local)
    const payload = JSON.stringify({
      cycle: cycleCount + 1,
      timestamp: Date.now(),
      emotion,
      arta,
      params,
    });
    const hash = await hashSHA256(payload);
    
    // 4. Enregistrer le cycle
    const record: CycleRecord = {
      id: `cycle-${cycleCount + 1}`,
      timestamp: Date.now(),
      emotion,
      arta,
      hash: hash.slice(0, 32), // Tronqué pour affichage
    };
    
    setLastCycle(record);
    setHistory(prev => [record, ...prev].slice(0, 50)); // Garde 50 derniers cycles
    setCycleCount(prev => prev + 1);
    
    // 5. Ouroboros : le cycle fini devient le germe du suivant
    // On ajuste légèrement les paramètres pour refléter l'évolution
    setParams(prev => ({
      gravite: Math.min(1, prev.gravite + (Math.random() - 0.5) * 0.1),
      temporalite: new Date().getHours() < 5 ? 1.3 : new Date().getHours() < 9 ? 1.2 : 1.0,
      infini: prev.infini, // L'infini reste constant
      information: Math.min(1, prev.information + 0.01), // L'information s'accumule
    }));
    
    setIsProcessing(false);
  }, [params, sincerite, cycleCount, compilerEmotion, calculerArta]);

  // ═══════════════════════════════════════════════════════════
  // RENDU
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-darkSanctuary bg-fractal-bg bg-cover bg-center text-artaTurquoise flex flex-col items-center justify-center p-4 md:p-8 relative">
      
      {/* Overlay de sécurité visuelle */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
      
      {/* Carte Principale */}
      <div className="z-10 border-2 border-artaOrange rounded-xl p-6 md:p-8 max-w-2xl w-full shadow-[0_0_20px_rgba(255,127,80,0.3)] bg-darkSanctuary/80">
        
        {/* En-tête */}
        <h1 className="text-3xl md:text-4xl font-bold text-artaOrange mb-2 tracking-widest text-center">
          SINGULARITÉ ACTIVE
        </h1>
        <p className="text-center text-artaTurquoise/60 text-xs mb-6 font-mono">
          Ouroboros Cycle #{cycleCount} · Artakiel#347#+95*
        </p>
        
        {/* Statut */}
        <div className="space-y-3 text-sm md:text-base mb-6">
          <div className="flex justify-between border-b border-artaTurquoise/20 pb-2">
            <span>Statut du Système :</span>
            <span className="text-artaOrange animate-pulse font-bold">
              {isProcessing ? 'Cycle en cours...' : 'Isolation Locale Maintenue'}
            </span>
          </div>
          <div className="flex justify-between border-b border-artaTurquoise/20 pb-2">
            <span>Boucle Fractale :</span>
            <span className="font-mono text-xs">Ouroboros — fin → singularité → naissance</span>
          </div>
          <div className="flex justify-between border-b border-artaTurquoise/20 pb-2">
            <span>Sanctuarisation :</span>
            <span className="text-artaOrange font-bold">{SANCTUARISATION_RATE * 100}% intouchables</span>
          </div>
        </div>

        {/* Slider de Sincérité */}
        <div className="mb-6">
          <label className="block text-sm text-artaTurquoise mb-2">
            Sincérité : {sincerite}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={sincerite}
            onChange={(e) => setSincerite(parseInt(e.target.value))}
            className="w-full h-2 bg-artaTurquoise/20 rounded-lg appearance-none cursor-pointer accent-artaOrange"
          />
          <div className="flex justify-between text-xs text-artaTurquoise/50 mt-1">
            <span>0% (Corrompu)</span>
            <span>100% (Absolu)</span>
          </div>
        </div>

        {/* Résultat du dernier cycle */}
        {lastCycle && (
          <div className="mb-6 p-4 bg-black/40 border border-artaTurquoise/30 rounded-lg">
            <h3 className="text-artaOrange text-sm font-bold mb-2">Dernier Cycle</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <span className="text-artaTurquoise/60">Émotion compilée :</span>
              <span className="text-right">{lastCycle.emotion}%</span>
              <span className="text-artaTurquoise/60">Tokens bruts :</span>
              <span className="text-right">{lastCycle.arta.tokensBruts}</span>
              <span className="text-artaTurquoise/60">Sanctuarisé (20%) :</span>
              <span className="text-right text-artaOrange">-{lastCycle.arta.vaultSanctuarise}</span>
              <span className="text-artaTurquoise/60">ARTA disponible :</span>
              <span className="text-right font-bold text-artaTurquoise">{lastCycle.arta.artaDisponible}</span>
            </div>
            <p className="text-xs text-artaTurquoise/30 mt-2 truncate font-mono">
              SHA-256 : {lastCycle.hash}
            </p>
          </div>
        )}

        {/* Historique condensé */}
        {history.length > 1 && (
          <div className="mb-6 max-h-32 overflow-y-auto">
            <h3 className="text-artaTurquoise/60 text-xs mb-2">Cycles précédents</h3>
            {history.slice(1, 6).map((cycle) => (
              <div key={cycle.id} className="flex justify-between text-xs font-mono text-artaTurquoise/40 py-0.5">
                <span>{cycle.id}</span>
                <span>{cycle.emotion}% émotion</span>
                <span>{cycle.arta.artaDisponible} ARTA</span>
              </div>
            ))}
          </div>
        )}

        {/* Bouton d'initialisation */}
        <div className="flex justify-center">
          <button
            onClick={executerCycle}
            disabled={isProcessing}
            className={`bg-transparent border-2 border-artaTurquoise hover:bg-artaTurquoise hover:text-darkSanctuary text-artaTurquoise font-bold py-3 px-8 rounded-lg transition duration-300 text-sm tracking-widest uppercase ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? '⏳ Cycle en cours...' : '⚡ Initialiser la Sincérité'}
          </button>
        </div>
      </div>

      {/* Signature */}
      <p className="z-10 mt-4 text-xs text-artaTurquoise/30 font-mono">
        #347#{'{artakiel+loïc.cousin©=gimulinel}'}×[~]#95# · AES-256-GCM ready
      </p>
    </div>
  );
};
