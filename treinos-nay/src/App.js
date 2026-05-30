import { useState, useEffect, useRef } from "react";

const GOALS = { proteina: 146, agua: 2.9, carbo: 180, calorias: 1650 };

const DEFAULT_WORKOUTS = {
  Segunda: {
    focus: "Braço", emoji: "💪", color: "#FF6B35",
    links: [
      { id: 1, source: "@the_french_fit", url: "https://www.instagram.com/p/DXgI_jbjiWf/", title: "Full Body — Só Halteres", details: [{ name: "Circuit A (3 rodadas)", items: ["Agachamento Sumô com Remada Alta × 12", "Levantamento Terra Romeno × 12", "Descanso 45s"] }, { name: "Circuit B (3 rodadas)", items: ["Rosca Martelo com Press Acima da Cabeça × 10", "Remada com Rotação × 8-10 cada lado", "Descanso 45s"] }, { name: "Circuit C (3 rodadas)", items: ["Avanço Reverso Rápido e Baixo × 10 cada lado", "Flexão com Toque no Ombro × 10", "Descanso 45s"] }, { name: "Finisher (2 rodadas)", items: ["Starfish Crunch × 45s", "Descanso 15s"] }] },
      { id: 2, source: "@the_french_fit", url: "https://www.instagram.com/p/DXbyA3MjZ0C/", title: "Full Body — Haltere + Kettlebell", details: [{ name: "Circuit A (3 rodadas)", items: ["Desenvolvimento com Agachamento × 10", "Remada com Rotação × 8-10 cada lado", "Avanço Reverso com Joelho Alto × 8 cada perna", "Abdominal com Peso × 15", "Descanso 60s"] }, { name: "Circuit B (3 rodadas)", items: ["Terra Romeno + Remada × 10", "Press com Impulso × 10-12", "Pullover × 12", "Ponte de Glúteo × 10 total + 10 meia + 10s segurando", "Descanso 60-75s"] }, { name: "Finisher (8 min AMRAP)", items: ["Snatch Alternado × 10", "Swing com Agachamento × 12", "Escalador × 30s"] }] },
      { id: 3, source: "@elvt.app", url: "https://www.instagram.com/p/DWqylpJjIcq/", title: "Full Body — Só Halteres (30-40 min)", details: [{ name: "2-3 rodadas", items: ["Avanço com Press × 14", "Agachamento Lateral com Rosca Bíceps × 12", "Remada Curvada × 15", "Agachamento com Elevação de Panturrilha × 12", "Ponte com Tríceps Testa × 15", "Superman Prancha × 10", "Knee Tuck × 15"] }] },
      { id: 4, source: "@proposito.fit", url: "https://www.instagram.com/p/DX2vNKHjUnG/", title: "Treino Híbrido — Força + Cardio", details: [{ name: "Formato", items: ["40s execução | 20s descanso", "4 rodadas | 1 min entre rodadas", "Exercícios no vídeo"] }] },
      { id: 5, source: "Instagram", url: "https://www.instagram.com/reel/DYS1kc3xgnj/", title: "Reel de Treino", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
    ],
  },
  Terça: {
    focus: "Perna", emoji: "🦵", color: "#E63946",
    links: [
      { id: 1, source: "@geisy.laryfit", url: "https://www.instagram.com/reel/DIXa695MaGV/", title: "Full Body", details: [{ name: "5 séries / 12-15 reps / Descanso 1min20s", items: ["Exercícios no vídeo"] }] },
      { id: 2, source: "Instagram", url: "https://www.instagram.com/reel/DY20hqxxg0K/", title: "Treino de Perna", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 3, source: "Instagram", url: "https://www.instagram.com/reel/DYnfto5Ry-A/", title: "Treino de Perna", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 4, source: "Instagram", url: "https://www.instagram.com/reel/DYSzhPRx7IB/", title: "Treino de Perna", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 5, source: "Instagram", url: "https://www.instagram.com/reel/DXPpLssEaqr/", title: "Treino de Perna", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
    ],
  },
  Quarta: {
    focus: "ABS / Core", emoji: "🔥", color: "#F4A261",
    links: [
      { id: 1, source: "@geisy.laryfit", url: "https://www.instagram.com/reel/DX68ndGxmsB/", title: "ABS Abdômen Trincado", details: [{ name: "5 séries / 15-20 reps / Descanso 1min", items: ["Exercícios no vídeo"] }] },
      { id: 2, source: "Instagram", url: "https://www.instagram.com/reel/DWjylGikXry/", title: "Treino ABS", details: [{ name: "", items: ["Exercícios e quantidades no vídeo"] }] },
      { id: 3, source: "@geisy.laryfit", url: "https://www.instagram.com/reel/DWbi_W_kRiI/", title: "ABS Workout", details: [{ name: "40s cada / 6 rounds / Descanso 1min", items: ["Exercícios no vídeo"] }] },
      { id: 4, source: "Instagram", url: "https://www.instagram.com/reel/DTiUBa9ke7k/", title: "Treino ABS", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 5, source: "@geisy.laryfit", url: "https://www.instagram.com/reel/DTOaX2lkZAs/", title: "Treino ABS", details: [{ name: "6 rounds / 12 reps / Descanso 1min30s", items: ["Exercícios no vídeo"] }] },
    ],
  },
  Quinta: {
    focus: "Costas + Ombro", emoji: "🏋️", color: "#2A9D8F",
    links: [
      { id: 1, source: "@geisy.laryfit", url: "https://www.instagram.com/reel/DGi4N8jPcHB/", title: "Treino de Costas", details: [{ name: "5 exercícios", items: ["Exercício 1: 4×15", "Exercício 2: 4×12", "Exercício 3: 4×10", "Exercício 4: 4×20", "Exercício 5: 4×12", "Detalhes no vídeo"] }] },
      { id: 2, source: "Instagram", url: "https://www.instagram.com/reel/DT3t60zEb1x/", title: "Costas + Ombro", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 3, source: "Instagram", url: "https://www.instagram.com/reel/DSDHAzNEyiq/", title: "Costas + Ombro", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 4, source: "Instagram", url: "https://www.instagram.com/p/DTp-siykdB0/", title: "Costas + Ombro", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 5, source: "Instagram", url: "https://www.instagram.com/reel/DOyCmawDbIt/", title: "Costas + Ombro", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
    ],
  },
  Sexta: {
    focus: "HIIT Corpo Todo", emoji: "⚡", color: "#9B5DE5",
    links: [
      { id: 1, source: "Instagram", url: "https://www.instagram.com/reel/DX4hCSNxofR/", title: "HIIT Corpo Todo", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 2, source: "Instagram", url: "https://www.instagram.com/reel/DXkQykskZiz/", title: "HIIT Corpo Todo", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 3, source: "Instagram", url: "https://www.instagram.com/reel/DXcpZflEU4t/", title: "HIIT Corpo Todo", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 4, source: "Instagram", url: "https://www.instagram.com/p/DXIMIY-EY7F/", title: "HIIT Corpo Todo", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
      { id: 5, source: "Instagram", url: "https://www.instagram.com/reel/DWh6zzskURO/", title: "HIIT Corpo Todo", details: [{ name: "", items: ["Exercícios no vídeo"] }] },
    ],
  },
};

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const STORAGE_KEY = "nay_treino_v2";

function getWeekKey() {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  return `${now.getFullYear()}_w${Math.floor((now - jan1) / (7 * 24 * 60 * 60 * 1000))}`;
}
function getWeekNumber() {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
}
function getTodayName() {
  return { 1: "Segunda", 2: "Terça", 3: "Quarta", 4: "Quinta", 5: "Sexta" }[new Date().getDay()] || null;
}
function load() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function save(s) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} }

const motivations = [
  "A pochete some com consistência. Você já está no caminho. 🔥",
  "Cada treino é um voto para a versão que você quer ser. 💪",
  "Não é sobre perfeição. É sobre presença. Você apareceu hoje!",
  "73kg hoje, definição amanhã. O processo é bonito. ✨",
  "Creatina tomada, bike feita, treino marcado. Isso se chama disciplina.",
  "Seu corpo responde ao que você faz todo dia, não às vezes.",
];

export default function App() {
  const todayName = getTodayName();
  const [tab, setTab] = useState("treino");
  const [selectedDay, setSelectedDay] = useState(todayName || "Segunda");
  const [expandedLink, setExpandedLink] = useState(null);
  const [editDay, setEditDay] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", source: "", url: "" });
  const [saveMsg, setSaveMsg] = useState("");
  const [notifHour, setNotifHour] = useState("07");
  const [notifMin, setNotifMin] = useState("00");
  const [notifStatus, setNotifStatus] = useState("");
  const photoRef = useRef();

  // Timer state
  const [timerWork, setTimerWork] = useState(40);
  const [timerRest, setTimerRest] = useState(20);
  const [timerRounds, setTimerRounds] = useState(6);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPhase, setTimerPhase] = useState("work"); // "work" | "rest" | "done"
  const [timerSeconds, setTimerSeconds] = useState(40);
  const [timerCurrentRound, setTimerCurrentRound] = useState(1);
  const timerRef = useRef(null);
  const audioCtx = useRef(null);

  const [state, setState] = useState(() => {
    const saved = load();
    const today = new Date().toDateString();
    const weekKey = getWeekKey();
    if (!saved) return { weekKey, checkedDays: {}, checklist: { treino: false, bike: false, creatina: false, pretreino: false }, nutrition: { proteina: 0, agua: 0, carbo: 0, calorias: 0 }, checklistDay: null, nutritionDay: null, customWorkouts: null, photo: null, notifTime: "07:00" };
    return {
      ...saved,
      weekKey,
      checkedDays: saved.weekKey === weekKey ? (saved.checkedDays || {}) : {},
      checklist: saved.checklistDay === today ? (saved.checklist || { treino: false, bike: false, creatina: false, pretreino: false }) : { treino: false, bike: false, creatina: false, pretreino: false },
      nutrition: saved.nutritionDay === today ? (saved.nutrition || { proteina: 0, agua: 0, carbo: 0, calorias: 0 }) : { proteina: 0, agua: 0, carbo: 0, calorias: 0 },
      checklistDay: saved.checklistDay === today ? saved.checklistDay : null,
      nutritionDay: saved.nutritionDay === today ? saved.nutritionDay : null,
    };
  });

  useEffect(() => { save(state); }, [state]);
  useEffect(() => {
    if (state.notifTime) {
      const [h, m] = state.notifTime.split(":");
      setNotifHour(h); setNotifMin(m);
    }
  }, []);

  const workouts = {};
  days.forEach(day => {
    const def = DEFAULT_WORKOUTS[day];
    const custom = state.customWorkouts?.[day];
    workouts[day] = { ...def, links: def.links.map((l, i) => custom?.[i] ? { ...l, ...custom[i] } : l) };
  });

  const weekNum = getWeekNumber();
  const workout = workouts[selectedDay];
  const weeklyLink = workout.links[weekNum % workout.links.length];
  const trainedDays = Object.keys(state.checkedDays).length;
  const accentColor = workout.color;
  const today = new Date().toDateString();

  function toggleDay(day) {
    setState(s => { const n = { ...s.checkedDays }; if (n[day]) delete n[day]; else n[day] = true; return { ...s, checkedDays: n }; });
  }
  function toggleChecklist(key) {
    setState(s => ({ ...s, checklistDay: today, checklist: { ...s.checklist, [key]: !s.checklist[key] } }));
  }
  function updateNutrition(key, val) {
    setState(s => ({ ...s, nutritionDay: today, nutrition: { ...s.nutrition, [key]: parseFloat(val) || 0 } }));
  }
  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setState(s => ({ ...s, photo: ev.target.result }));
    reader.readAsDataURL(file);
  }
  function openEdit(day, idx) {
    const link = workouts[day].links[idx];
    setEditDay(day); setEditIdx(idx);
    setEditForm({ title: link.title, source: link.source, url: link.url });
  }
  function saveEdit() {
    setState(s => {
      const custom = { ...(s.customWorkouts || {}) };
      if (!custom[editDay]) custom[editDay] = {};
      custom[editDay][editIdx] = { ...editForm };
      return { ...s, customWorkouts: custom };
    });
    setEditDay(null); setEditIdx(null);
    setSaveMsg("Salvo com sucesso!"); setTimeout(() => setSaveMsg(""), 2500);
  }
  function resetLink(day, idx) {
    setState(s => {
      const custom = { ...(s.customWorkouts || {}) };
      if (custom[day]) { const d = { ...custom[day] }; delete d[idx]; custom[day] = d; }
      return { ...s, customWorkouts: custom };
    });
    setSaveMsg("Resetado para o original!"); setTimeout(() => setSaveMsg(""), 2500);
  }

  async function requestNotifications() {
    if (!('Notification' in window)) { setNotifStatus("Seu navegador não suporta notificações."); return; }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      const time = `${notifHour}:${notifMin}`;
      setState(s => ({ ...s, notifTime: time }));
      scheduleNotification(parseInt(notifHour), parseInt(notifMin));
      setNotifStatus(`✓ Notificação ativada para ${time} todos os dias!`);
    } else {
      setNotifStatus("Permissão negada. Ative nas configurações do celular.");
    }
  }

  function scheduleNotification(hour, min) {
    const now = new Date();
    const next = new Date();
    next.setHours(hour, min, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const ms = next - now;
    setTimeout(() => {
      const day = getTodayName();
      if (day && Notification.permission === 'granted') {
        new Notification('Treinos da Nay 💪', {
          body: day ? `Hoje é ${day} — ${workouts[day]?.focus}. Bora treinar!` : 'Hora de treinar!',
          icon: '/icon192.png',
        });
      }
      scheduleNotification(hour, min);
    }, ms);
  }

  // Timer audio beep
  function playBeep(type) {
    try {
      if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = type === "work" ? 880 : type === "rest" ? 440 : 660;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (type === "done" ? 0.8 : 0.3));
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + (type === "done" ? 0.8 : 0.3));
      if (type === "done") {
        setTimeout(() => {
          const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
          o2.connect(g2); g2.connect(ctx.destination);
          o2.frequency.value = 1100; o2.type = "sine";
          g2.gain.setValueAtTime(0.4, ctx.currentTime);
          g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          o2.start(ctx.currentTime); o2.stop(ctx.currentTime + 0.5);
        }, 350);
      }
    } catch {}
  }

  function startTimer() {
    setTimerPhase("work");
    setTimerSeconds(timerWork);
    setTimerCurrentRound(1);
    setTimerRunning(true);
    playBeep("work");
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerPhase("work");
    setTimerSeconds(timerWork);
    setTimerCurrentRound(1);
  }

  useEffect(() => {
    if (!timerRunning) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setTimerSeconds(s => {
        if (s <= 1) {
          setTimerPhase(phase => {
            if (phase === "work") {
              playBeep("rest");
              setTimerSeconds(timerRest);
              return "rest";
            } else {
              setTimerCurrentRound(r => {
                if (r >= timerRounds) {
                  clearInterval(timerRef.current);
                  setTimerRunning(false);
                  setTimerPhase("done");
                  playBeep("done");
                  return r;
                }
                playBeep("work");
                setTimerSeconds(timerWork);
                return r + 1;
              });
              return "work";
            }
          });
          return s;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timerWork, timerRest, timerRounds]);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', sans-serif", color: "#f0f0f0", paddingBottom: 80, maxWidth: 480, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
        .tab-btn{flex:1;padding:10px 2px;background:transparent;border:none;color:#444;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:color 0.2s;position:relative}
        .day-chip{padding:7px 12px;border-radius:100px;border:1px solid #1e1e1e;background:transparent;color:#555;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s;white-space:nowrap}
        .day-chip.active{border-color:transparent;color:#000;font-weight:700}
        .link-card{background:#0f0f0f;border:1px solid #191919;border-radius:14px;padding:14px;cursor:pointer;transition:all 0.2s;margin-bottom:8px}
        .link-card:hover{border-color:#2a2a2a}
        .checklist-row{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#0f0f0f;border:1px solid #191919;border-radius:12px;margin-bottom:8px;cursor:pointer;transition:all 0.2s}
        .check-box{width:22px;height:22px;border-radius:6px;border:2px solid #2a2a2a;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0}
        .nutrition-card{background:#0f0f0f;border:1px solid #191919;border-radius:14px;padding:14px 16px;margin-bottom:8px}
        .progress-bar-bg{height:6px;background:#1a1a1a;border-radius:3px;overflow:hidden}
        .progress-bar-fill{height:100%;border-radius:3px;transition:width 0.4s ease}
        .num-input{background:#1a1a1a;border:1px solid #252525;border-radius:8px;color:#f0f0f0;font-family:'DM Sans',sans-serif;font-size:18px;font-weight:600;width:80px;padding:6px 8px;text-align:center;outline:none;transition:border-color 0.2s}
        .num-input:focus{border-color:#333}
        .insta-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:100px;border:none;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;cursor:pointer;text-decoration:none;transition:all 0.15s}
        .edit-input{width:100%;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;color:#f0f0f0;font-family:'DM Sans',sans-serif;font-size:13px;padding:10px 12px;outline:none;margin-bottom:8px}
        .edit-input:focus{border-color:#444}
        .edit-card{background:#0f0f0f;border:1px solid #1e1e1e;border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer}
        .btn-primary{padding:10px 20px;border-radius:100px;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer}
        .btn-ghost{padding:8px 14px;border-radius:100px;border:1px solid #2a2a2a;background:transparent;color:#666;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer}
        .time-input{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;color:#f0f0f0;font-family:'DM Sans',sans-serif;font-size:22px;font-weight:700;width:64px;padding:8px;text-align:center;outline:none}
        .time-input:focus{border-color:#444}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.3s ease both}
      `}</style>

      {/* HEADER */}
      <div style={{ padding: "28px 20px 0", background: "linear-gradient(180deg,#0e0e0e 0%,#080808 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div onClick={() => photoRef.current.click()} style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${accentColor}`, overflow: "hidden", cursor: "pointer", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {state.photo ? <img src={state.photo} alt="perfil" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 20 }}>👤</span>}
            </div>
            <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#f0f0f0", lineHeight: 1.1 }}>Treinos da Nay</div>
              <div style={{ fontSize: 11, color: "#444", fontStyle: "italic" }}>{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</div>
            </div>
          </div>
          {todayName && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#111", border: "1px solid #1e1e1e", borderRadius: 100, padding: "5px 10px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 10, color: "#4ade80", fontWeight: 700, letterSpacing: 1 }}>HOJE</span>
            </div>
          )}
        </div>
        <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 12, padding: "10px 14px", margin: "12px 0 0", fontSize: 12, color: "#666", fontStyle: "italic" }}>
          {motivations[weekNum % motivations.length]}
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid #151515", marginTop: 14 }}>
          {[["treino","🏋️","Treino"],["checklist","✅","Check"],["timer","⏱","Timer"],["semana","📅","Semana"],["config","⚙️","Config"]].map(([key, icon, label]) => (
            <button key={key} className={`tab-btn ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}
              style={tab === key ? { color: accentColor } : {}}>
              {tab === key && <span style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 2, background: accentColor, borderRadius: 1 }} />}
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* TREINO */}
      {tab === "treino" && (
        <div className="fade-up" style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
            {days.map(day => (
              <button key={day} className={`day-chip ${selectedDay === day ? "active" : ""}`}
                style={selectedDay === day ? { background: workouts[day].color } : {}}
                onClick={() => { setSelectedDay(day); setExpandedLink(null); }}>
                {state.checkedDays[day] ? "✓ " : ""}{day}
              </button>
            ))}
          </div>
          <div style={{ background: `linear-gradient(135deg,${workout.color}18,#0f0f0f)`, border: `1px solid ${workout.color}30`, borderRadius: 18, padding: "18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 42 }}>{workout.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: workout.color }}>{selectedDay}-feira</div>
              <div style={{ fontSize: 14, color: "#bbb", fontWeight: 500, marginTop: 2 }}>{workout.focus}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 6 }}>🚴 Bike · aquecimento ou finalização</div>
            </div>
            <button onClick={() => toggleDay(selectedDay)} style={{ background: state.checkedDays[selectedDay] ? workout.color : "transparent", border: `1.5px solid ${state.checkedDays[selectedDay] ? workout.color : "#2a2a2a"}`, borderRadius: 10, padding: "8px 12px", color: state.checkedDays[selectedDay] ? "#000" : "#444", fontSize: 18, cursor: "pointer", transition: "all 0.2s" }}>
              {state.checkedDays[selectedDay] ? "✓" : "○"}
            </button>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 3, height: 14, background: workout.color, borderRadius: 2, display: "block" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#444", textTransform: "uppercase" }}>Esta semana</span>
              <span style={{ fontSize: 10, color: workout.color, fontWeight: 700, background: `${workout.color}18`, padding: "2px 8px", borderRadius: 100 }}>Semana {(weekNum % 5) + 1} de 5</span>
            </div>
            <div className="link-card" style={{ border: `1px solid ${workout.color}40`, background: "linear-gradient(135deg,#141414,#0f0f0f)" }}
              onClick={() => setExpandedLink(expandedLink === "featured" ? null : "featured")}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>{weeklyLink.source}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#eee" }}>{weeklyLink.title}</div>
                </div>
                <span style={{ color: "#333", fontSize: 16 }}>{expandedLink === "featured" ? "▲" : "▼"}</span>
              </div>
              {expandedLink === "featured" && (
                <div style={{ marginTop: 14, borderTop: `1px solid ${workout.color}20`, paddingTop: 14 }}>
                  {weeklyLink.details.map((s, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      {s.name && <div style={{ fontSize: 10, fontWeight: 700, color: workout.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{s.name}</div>}
                      {s.items.map((item, j) => (
                        <div key={j} style={{ fontSize: 12, color: "#888", padding: "4px 0", borderBottom: "1px solid #151515", display: "flex", gap: 8 }}>
                          <span style={{ color: workout.color, fontSize: 9, marginTop: 4 }}>▸</span>{item}
                        </div>
                      ))}
                    </div>
                  ))}
                  <a href={weeklyLink.url} target="_blank" rel="noopener noreferrer" className="insta-btn"
                    style={{ background: workout.color, color: "#000", marginTop: 10 }} onClick={e => e.stopPropagation()}>
                    📱 Ver no Instagram
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 3, height: 14, background: "#222", borderRadius: 2, display: "block" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#444", textTransform: "uppercase" }}>Todos os treinos</span>
            </div>
            {workout.links.map((link, idx) => (
              <div key={link.id} className="link-card"
                style={idx === weekNum % workout.links.length ? { borderColor: `${workout.color}30` } : {}}
                onClick={() => setExpandedLink(expandedLink === idx ? null : idx)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: idx === weekNum % workout.links.length ? workout.color : "#1a1a1a", color: idx === weekNum % workout.links.length ? "#000" : "#555", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{idx + 1}</span>
                    <div>
                      <div style={{ fontSize: 11, color: "#444" }}>{link.source}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#ccc" }}>{link.title}</div>
                    </div>
                  </div>
                  <span style={{ color: "#333", fontSize: 14 }}>{expandedLink === idx ? "▲" : "▼"}</span>
                </div>
                {expandedLink === idx && (
                  <div style={{ marginTop: 12, borderTop: "1px solid #161616", paddingTop: 12 }}>
                    {link.details.map((s, i) => (
                      <div key={i} style={{ marginBottom: 8 }}>
                        {s.name && <div style={{ fontSize: 10, fontWeight: 700, color: "#555", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{s.name}</div>}
                        {s.items.map((item, j) => (
                          <div key={j} style={{ fontSize: 12, color: "#777", padding: "3px 0", borderBottom: "1px solid #141414", display: "flex", gap: 8 }}>
                            <span style={{ color: workout.color, fontSize: 9, marginTop: 4 }}>▸</span>{item}
                          </div>
                        ))}
                      </div>
                    ))}
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="insta-btn"
                      style={{ background: "#1a1a1a", color: "#aaa", border: "1px solid #222", marginTop: 8 }} onClick={e => e.stopPropagation()}>
                      📱 Ver no Instagram
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHECKLIST */}
      {tab === "checklist" && (
        <div className="fade-up" style={{ padding: "20px" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Checklist de hoje</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: 20, fontStyle: "italic" }}>{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</div>
          {[
            { key: "treino", icon: "🏋️", label: "Treino feito", sub: todayName ? `${todayName} — ${workouts[todayName]?.focus}` : "Sem treino hoje" },
            { key: "bike", icon: "🚴", label: "Bike feita", sub: "Vertical · aquecimento ou finalização" },
            { key: "creatina", icon: "💊", label: "Creatina tomada", sub: "3-5g com água" },
            { key: "pretreino", icon: "⚡", label: "Pré-treino tomado", sub: "30 min antes do treino" },
          ].map(({ key, icon, label, sub }) => {
            const checked = state.checklist[key];
            return (
              <div key={key} className="checklist-row" onClick={() => toggleChecklist(key)}>
                <div className="check-box" style={checked ? { background: accentColor, borderColor: accentColor } : {}}>
                  {checked && <span style={{ color: "#000", fontSize: 13, fontWeight: 700 }}>✓</span>}
                </div>
                <div style={{ fontSize: 20 }}>{icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: checked ? "#fff" : "#aaa" }}>{label}</div>
                  <div style={{ fontSize: 11, color: "#444", marginTop: 1 }}>{sub}</div>
                </div>
              </div>
            );
          })}
          <div style={{ background: "#0f0f0f", border: "1px solid #191919", borderRadius: 14, padding: "14px 16px", marginTop: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: "#555", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Progresso do dia</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: accentColor }}>{Object.values(state.checklist).filter(Boolean).length}/4</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${(Object.values(state.checklist).filter(Boolean).length / 4) * 100}%`, background: accentColor }} />
            </div>
          </div>
        </div>
      )}

      {/* NUTRIÇÃO */}
      {tab === "nutri" && (
        <div className="fade-up" style={{ padding: "20px" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Nutrição de hoje</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: 20, fontStyle: "italic" }}>Metas para 73kg · foco em definição</div>
          {[
            { key: "proteina", icon: "🥩", label: "Proteína", unit: "g", goal: GOALS.proteina, color: "#FF6B35" },
            { key: "agua", icon: "💧", label: "Água", unit: "L", goal: GOALS.agua, color: "#38BDF8" },
            { key: "carbo", icon: "🍚", label: "Carboidrato", unit: "g", goal: GOALS.carbo, color: "#F4A261" },
            { key: "calorias", icon: "🔥", label: "Calorias", unit: "kcal", goal: GOALS.calorias, color: "#E63946" },
          ].map(({ key, icon, label, unit, goal, color }) => {
            const val = state.nutrition[key] || 0;
            const pct = Math.min((val / goal) * 100, 100);
            const done = val >= goal;
            return (
              <div key={key} className="nutrition-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{label}</div>
                      <div style={{ fontSize: 11, color: "#444" }}>Meta: {goal}{unit}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="number" className="num-input" value={val || ""} placeholder="0"
                      onChange={e => updateNutrition(key, e.target.value)}
                      style={{ borderColor: done ? color : "#252525" }} />
                    <span style={{ fontSize: 12, color: "#555", width: 28 }}>{unit}</span>
                  </div>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: done ? color : `${color}88` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                  <span style={{ fontSize: 10, color: "#333" }}>{Math.round(pct)}%</span>
                  {done && <span style={{ fontSize: 10, color, fontWeight: 700 }}>✓ Meta atingida!</span>}
                  {!done && val > 0 && <span style={{ fontSize: 10, color: "#444" }}>faltam {(goal - val).toFixed(key === "agua" ? 1 : 0)}{unit}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SEMANA */}
      {tab === "semana" && (
        <div className="fade-up" style={{ padding: "20px" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Progresso semanal</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: 20, fontStyle: "italic" }}>Semana {(weekNum % 52) + 1} do ano</div>
          <div style={{ background: `linear-gradient(135deg,${accentColor}15,#0f0f0f)`, border: `1px solid ${accentColor}25`, borderRadius: 18, padding: "20px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 56, fontWeight: 900, color: accentColor, lineHeight: 1 }}>{trainedDays}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>de 5 dias treinados</div>
            <div style={{ marginTop: 12 }}>
              <div className="progress-bar-bg" style={{ height: 8 }}>
                <div className="progress-bar-fill" style={{ width: `${(trainedDays / 5) * 100}%`, background: accentColor }} />
              </div>
            </div>
            {trainedDays === 5 && <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginTop: 10 }}>🏆 Semana perfeita, Nay!</div>}
            {trainedDays >= 3 && trainedDays < 5 && <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>Quase lá! Mais {5 - trainedDays} dia{5 - trainedDays > 1 ? "s" : ""}.</div>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 20 }}>
            {days.map(day => {
              const done = state.checkedDays[day]; const isToday = day === todayName;
              return (
                <div key={day} onClick={() => toggleDay(day)}
                  style={{ background: done ? workouts[day].color : "#0f0f0f", border: `1.5px solid ${isToday && !done ? workouts[day].color : done ? workouts[day].color : "#1e1e1e"}`, borderRadius: 14, padding: "14px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{done ? "✓" : workouts[day].emoji}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: done ? "#000" : isToday ? workouts[day].color : "#555" }}>{day.slice(0, 3).toUpperCase()}</div>
                  {isToday && !done && <div style={{ fontSize: 8, color: workouts[day].color, marginTop: 2, fontWeight: 700 }}>HOJE</div>}
                </div>
              );
            })}
          </div>
          <div style={{ background: "#0f0f0f", border: "1px solid #191919", borderRadius: 14, padding: "16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#444", textTransform: "uppercase", marginBottom: 12 }}>Resumo</div>
            {days.map(day => (
              <div key={day} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #141414" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{workouts[day].emoji}</span>
                  <span style={{ fontSize: 13, color: state.checkedDays[day] ? "#ddd" : "#555" }}>{day}</span>
                  <span style={{ fontSize: 11, color: "#333" }}>— {workouts[day].focus}</span>
                </div>
                <span style={{ fontSize: 12, color: state.checkedDays[day] ? workouts[day].color : "#2a2a2a", fontWeight: 700 }}>
                  {state.checkedDays[day] ? "✓ feito" : day === todayName ? "hoje" : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONFIG — Editar treinos + notificações + foto */}
      {tab === "config" && (
        <div className="fade-up" style={{ padding: "20px" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Configurações</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: 20, fontStyle: "italic" }}>Foto, notificações e gerenciar treinos</div>

          {/* Foto */}
          <div style={{ background: "#0f0f0f", border: "1px solid #191919", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Foto de Perfil</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", border: `2px solid ${accentColor}`, overflow: "hidden", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {state.photo ? <img src={state.photo} alt="perfil" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 26 }}>👤</span>}
              </div>
              <div>
                <button className="btn-primary" onClick={() => photoRef.current.click()} style={{ background: accentColor, color: "#000", marginBottom: 6 }}>
                  📷 {state.photo ? "Trocar foto" : "Adicionar foto"}
                </button>
                {state.photo && <div><button className="btn-ghost" onClick={() => setState(s => ({ ...s, photo: null }))}>Remover</button></div>}
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div style={{ background: "#0f0f0f", border: "1px solid #191919", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Lembrete de Treino</div>
            <div style={{ fontSize: 13, color: "#777", marginBottom: 14 }}>Receba uma notificação todo dia no horário escolhido.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <input type="number" className="time-input" value={notifHour} min="0" max="23"
                onChange={e => setNotifHour(e.target.value.padStart(2, "0"))} />
              <span style={{ fontSize: 24, color: "#555", fontWeight: 700 }}>:</span>
              <input type="number" className="time-input" value={notifMin} min="0" max="59"
                onChange={e => setNotifMin(e.target.value.padStart(2, "0"))} />
              <span style={{ fontSize: 13, color: "#555" }}>hrs</span>
            </div>
            <button className="btn-primary" onClick={requestNotifications} style={{ background: accentColor, color: "#000" }}>
              🔔 Ativar notificação
            </button>
            {notifStatus && <div style={{ fontSize: 12, color: notifStatus.startsWith("✓") ? "#4ade80" : "#E63946", marginTop: 10, fontWeight: 600 }}>{notifStatus}</div>}
          </div>

          {/* Editar treinos */}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Gerenciar Treinos</div>

          {saveMsg && (
            <div style={{ background: "#0f2a0f", border: "1px solid #1a5c1a", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#4ade80", fontWeight: 600 }}>✓ {saveMsg}</div>
          )}

          {editDay !== null && (
            <div style={{ background: "#111", border: `1px solid ${workouts[editDay].color}40`, borderRadius: 16, padding: "18px", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: workouts[editDay].color }}>{workouts[editDay].emoji} {editDay} · Treino {editIdx + 1}</div>
                <button className="btn-ghost" onClick={() => { setEditDay(null); setEditIdx(null); }}>✕</button>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Título</div>
              <input className="edit-input" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} placeholder="Ex: Treino de Braço" />
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Fonte / @perfil</div>
              <input className="edit-input" value={editForm.source} onChange={e => setEditForm(f => ({ ...f, source: e.target.value }))} placeholder="Ex: @the_french_fit" />
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Link do Instagram</div>
              <input className="edit-input" value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))} placeholder="https://www.instagram.com/reel/..." />
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <button className="btn-primary" onClick={saveEdit} style={{ background: workouts[editDay].color, color: "#000" }}>Salvar</button>
                <button className="btn-ghost" onClick={() => { resetLink(editDay, editIdx); setEditDay(null); setEditIdx(null); }}>Resetar</button>
              </div>
            </div>
          )}

          {days.map(day => {
            const w = workouts[day];
            return (
              <div key={day} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>{w.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: w.color }}>{day}</span>
                  <span style={{ fontSize: 12, color: "#555" }}>— {w.focus}</span>
                </div>
                {w.links.map((link, idx) => {
                  const isCustomized = state.customWorkouts?.[day]?.[idx];
                  return (
                    <div key={idx} className="edit-card"
                      style={isCustomized ? { borderColor: `${w.color}30` } : {}}
                      onClick={() => openEdit(day, idx)}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <span style={{ width: 22, height: 22, borderRadius: "50%", background: isCustomized ? w.color : "#1a1a1a", color: isCustomized ? "#000" : "#555", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{idx + 1}</span>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: "#ccc" }}>{link.title}</div>
                            <div style={{ fontSize: 11, color: "#444" }}>{link.source}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 14, color: w.color }}>✎</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* TIMER TAB */}
      {tab === "timer" && (
        <div className="fade-up" style={{ padding: "20px" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Timer de Treino</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: 24, fontStyle: "italic" }}>Configure execução, pausa e rounds</div>

          {/* Config inputs */}
          {!timerRunning && timerPhase !== "done" && (
            <div style={{ background: "#0f0f0f", border: "1px solid #191919", borderRadius: 14, padding: "16px", marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { label: "Execução", unit: "seg", val: timerWork, set: setTimerWork },
                  { label: "Pausa", unit: "seg", val: timerRest, set: setTimerRest },
                  { label: "Rounds", unit: "×", val: timerRounds, set: setTimerRounds },
                ].map(({ label, unit, val, set }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <button onClick={() => set(v => Math.max(5, v - 5))}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#aaa", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "#f0f0f0", lineHeight: 1 }}>{val}</div>
                        <div style={{ fontSize: 10, color: "#555" }}>{unit}</div>
                      </div>
                      <button onClick={() => set(v => v + 5)}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#aaa", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timer display */}
          <div style={{
            background: timerPhase === "work" && timerRunning ? "linear-gradient(135deg,#1a0a00,#0f0f0f)" :
                        timerPhase === "rest" && timerRunning ? "linear-gradient(135deg,#001a0a,#0f0f0f)" :
                        timerPhase === "done" ? "linear-gradient(135deg,#0a001a,#0f0f0f)" : "linear-gradient(135deg,#111,#0f0f0f)",
            border: `1px solid ${timerPhase === "work" && timerRunning ? "#FF6B3540" : timerPhase === "rest" && timerRunning ? "#2A9D8F40" : timerPhase === "done" ? "#9B5DE540" : "#191919"}`,
            borderRadius: 20, padding: "32px 20px", textAlign: "center", marginBottom: 20
          }}>
            {timerPhase === "done" ? (
              <div>
                <div style={{ fontSize: 56 }}>🏆</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: "#9B5DE5", marginTop: 8 }}>Treino concluído!</div>
                <div style={{ fontSize: 14, color: "#666", marginTop: 8 }}>{timerRounds} rounds completos</div>
              </div>
            ) : (
              <div>
                {/* Phase label */}
                <div style={{
                  display: "inline-block", padding: "4px 16px", borderRadius: 100,
                  background: timerPhase === "work" ? "#FF6B3520" : "#2A9D8F20",
                  border: `1px solid ${timerPhase === "work" ? "#FF6B3540" : "#2A9D8F40"}`,
                  fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                  color: timerPhase === "work" ? "#FF6B35" : "#2A9D8F", marginBottom: 16
                }}>
                  {timerRunning ? (timerPhase === "work" ? "🔥 EXECUTE" : "😮‍💨 PAUSA") : "PRONTO"}
                </div>

                {/* Countdown circle */}
                <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 16px" }}>
                  <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#1a1a1a" strokeWidth="8" />
                    <circle cx="90" cy="90" r="80" fill="none"
                      stroke={timerPhase === "work" ? "#FF6B35" : "#2A9D8F"}
                      strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 80}`}
                      strokeDashoffset={`${2 * Math.PI * 80 * (1 - timerSeconds / (timerPhase === "work" ? timerWork : timerRest))}`}
                      style={{ transition: "stroke-dashoffset 0.9s linear" }}
                    />
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 900, color: "#f0f0f0", lineHeight: 1 }}>{timerSeconds}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>segundos</div>
                  </div>
                </div>

                {/* Round counter */}
                <div style={{ fontSize: 14, color: "#666" }}>
                  Round <span style={{ color: "#f0f0f0", fontWeight: 700 }}>{timerCurrentRound}</span> de <span style={{ color: "#f0f0f0", fontWeight: 700 }}>{timerRounds}</span>
                </div>

                {/* Round dots */}
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
                  {Array.from({ length: timerRounds }).map((_, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < timerCurrentRound - 1 ? "#2A9D8F" : i === timerCurrentRound - 1 ? "#FF6B35" : "#1a1a1a", transition: "all 0.3s" }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {timerPhase === "done" ? (
              <button onClick={resetTimer} className="btn-primary" style={{ background: accentColor, color: "#000", padding: "14px 40px", fontSize: 15 }}>
                🔄 Reiniciar
              </button>
            ) : timerRunning ? (
              <>
                <button onClick={() => setTimerRunning(false)} className="btn-primary"
                  style={{ background: "#1a1a1a", color: "#aaa", border: "1px solid #2a2a2a", padding: "14px 32px", fontSize: 15 }}>
                  ⏸ Pausar
                </button>
                <button onClick={resetTimer} className="btn-ghost" style={{ padding: "14px 24px" }}>
                  ✕ Parar
                </button>
              </>
            ) : (
              <>
                <button onClick={startTimer} className="btn-primary"
                  style={{ background: accentColor, color: "#000", padding: "14px 48px", fontSize: 16, fontWeight: 800 }}>
                  ▶ INICIAR
                </button>
                {timerSeconds !== timerWork && (
                  <button onClick={() => setTimerRunning(true)} className="btn-primary"
                    style={{ background: "#2A9D8F", color: "#000", padding: "14px 32px", fontSize: 15 }}>
                    ▶ Continuar
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#0a0a0a", borderTop: "1px solid #141414", display: "flex", padding: "8px 0 16px" }}>
        {[["treino","🏋️","Treino"],["checklist","✅","Check"],["timer","⏱","Timer"],["semana","📅","Semana"],["config","⚙️","Config"]].map(([key, icon, label]) => (
          <button key={key} onClick={() => setTab(key)}
            style={{ flex: 1, background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0" }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: tab === key ? accentColor : "#333", textTransform: "uppercase" }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
