import { useEffect, useRef, useState } from "react";
import {
  MapPin, BookOpen, Headphones, PenLine, ArrowRight, ArrowUp,
  Play, Heart, Feather, Music, FileText, ExternalLink, Quote,
  CheckCircle2, XCircle, RotateCcw, Send, Trash2, Library, Flame, BadgeCheck,
  Clapperboard, Disc3, ScrollText, Camera, GraduationCap, Sparkles, Info
} from "lucide-react";
import { realPhotos, realVideos, docLinks, poemsReal } from "./real";
import { quizQuestions } from "./data";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${vis ? "visible" : ""} ${className}`}>{children}</div>;
}

function Photo({ id, dark = false }: { id: keyof typeof realPhotos; dark?: boolean }) {
  const p = realPhotos[id];
  return (
    <figure className={`rounded-[22px] overflow-hidden border ${dark ? "border-[#15120d]/15 bg-white" : "border-white/12 bg-white/[0.04]"}`}>
      <a href={p.page} target="_blank" rel="noreferrer" title="Адкрыць старонку файла на Wikimedia Commons">
        <img src={p.src} alt={p.caption} loading="lazy" className="w-full object-cover hover:scale-[1.02] transition duration-500" />
      </a>
      <figcaption className={`px-4 py-3 text-[11.5px] leading-relaxed ${dark ? "text-[#5b5340]" : "text-[#a89d80]"}`}>
        <span className={`block text-[12.5px] font-semibold ${dark ? "text-[#15120d]" : "text-[#e6dcc2]"}`}>{p.caption}</span>
        <span className="flex items-center gap-1 mt-1"><Camera className="w-3 h-3" /> Крыніца: {p.credit} • націсні, каб праверыць</span>
      </figcaption>
    </figure>
  );
}

function YT({ id }: { id: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="Рэальны запіс на YouTube"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

const timeline = [
  { y: "1891", t: "Нарадзіўся ў Мінску", d: "9 снежня, Траецкая гара. Бацька — этнограф Адам Багдановіч, маці — настаўніца Марыя Мякота." },
  { y: "1892–96", t: "Дзяцінства ў Гродне", d: "Дом на вул. 1 Мая, 10 (захаваўся — цяпер музей). У 1896-м памірае маці. Паэту 4 гады." },
  { y: "1896–08", t: "Ніжні Ноўгарад", d: "Гімназія, рэвалюцыя 1905-га, бацькава бібліятэка. У 1907-м «Наша Ніва» друкуе дэбют — апавяданне «Музыка». Яму 15." },
  { y: "1908–16", t: "Яраслаўль", d: "Юрыдычны ліцэй, газета «Голос», каханне да Ганны Какуевай, хвароба. Большасць «Вянка» напісана тут." },
  { y: "1914", t: "Выходзіць «Вянок»", d: "Вільня, друкарня Марціна Кухты, грошы Магдалены Радзівіл, тыраж 2000. На тытуле — 1913." },
  { y: "1916–17", t: "Мінск і «Пагоня»", d: "Праца ў харчовым камітэце, дапамога бежанцам вайны. Верш «Пагоня» (1916)." },
  { y: "1917", t: "Ялта. 25 траўня", d: "Памёр ад сухотаў ва ўзросце 25 гадоў. Пахаваны на Аўцкіх могілках у Ялце." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [poemId, setPoemId] = useState("tkachyhi");
  const [scan, setScan] = useState<"tkachyhi" | "romans" | "zimoj">("tkachyhi");
  const [qIdx, setQIdx] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [works, setWorks] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem("vianok_youth_wall") || "[]"); } catch { return []; }
  });
  const [form, setForm] = useState({ name: "", kind: "Кавер", text: "" });

  useEffect(() => { localStorage.setItem("vianok_youth_wall", JSON.stringify(works)); }, [works]);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const poem = poemsReal.find(p => p.id === poemId)!;
  const nav = [
    { id: "start", label: "Старт" },
    { id: "vianok", label: "«Вянок»" },
    { id: "poems", label: "Вершы" },
    { id: "media", label: "Відэа і аўдыё" },
    { id: "docs", label: "Дакументы" },
    { id: "places", label: "Месцы" },
    { id: "quiz", label: "Квіз" },
    { id: "create", label: "Ствары сам" },
  ];

  return (
    <div className="min-h-screen bg-[#15120d] text-[#f6efe1] antialiased">
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#c9a227] to-[#c1272d] z-[60] transition-all" style={{ width: `${progress * 100}%` }} />

      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#15120d]/88 border-b border-[#c9a227]/20 mt-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#start" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a227] to-[#7a5f12] grid place-items-center"><Flame className="w-5 h-5 text-[#15120d]" /></span>
            <span className="leading-tight">
              <span className="block font-serif-d font-bold text-[15px] md:text-lg">БАГДАНОВІЧ <span className="text-[#c9a227]">×</span> МОЛАДЗЬ</span>
              <span className="block text-[9px] md:text-[10px] tracking-[0.24em] uppercase text-[#c9a227]">25 гадоў, якія не скончыліся</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-1 text-[12.5px] font-bold">
            {nav.map(n => <a key={n.id} href={`#${n.id}`} className="px-2.5 py-2 rounded-full text-[#d8cdae] hover:bg-[#c9a227] hover:text-[#15120d] transition">{n.label}</a>)}
          </nav>
          <a href="#quiz" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#c1272d] text-white text-[12px] font-bold hover:bg-[#a01f24] transition">Квіз <ArrowRight className="w-3.5 h-3.5" /></a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 grid place-items-center rounded-xl border border-[#c9a227]/30">
            <span className="space-y-1.5">{[0, 1, 2].map(i => <span key={i} className="block w-5 h-0.5 bg-[#c9a227]" />)}</span>
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-[#c9a227]/15 bg-[#15120d] px-4 py-4 grid gap-1">
            {nav.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl bg-white/5 text-sm font-semibold">{n.label}</a>)}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="start" className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20 scroll-mt-20">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #f0d98c 1px, transparent 0)", backgroundSize: "26px 26px" }} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-[.95fr_1.05fr] gap-10 items-center relative">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 text-[11px] tracking-[0.2em] uppercase text-[#f0d98c]">
                <BadgeCheck className="w-3.5 h-3.5" /> 100% рэальныя фота • відэа • дакументы
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-serif-d mt-5 text-[44px] leading-[0.95] md:text-[76px] font-semibold">
                Яму было 25.<br />Ён паспеў <span className="gold-text italic">усё</span>.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-[15px] md:text-lg text-[#e6dcc2] leading-relaxed">
                Максім Багдановіч — паэт, які ў тваім узросце ўжо выдаў кнігу, якую праз 100 гадоў назавуць <strong className="text-white">найлепшай беларускай кнігай ХХ стагоддзя</strong>. Яго вершы — у трэках «Песняроў», у метро 2020-га і ў тваім падручніку. Давай разбяромся, чаму ён круты.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#media" className="px-6 py-3.5 rounded-full bg-[#c9a227] text-[#15120d] font-bold text-sm hover:bg-[#f0d98c] transition flex items-center gap-2"><Play className="w-4 h-4" fill="currentColor" /> Глядзець і слухаць</a>
                <a href="#vianok" className="px-6 py-3.5 rounded-full border border-white/25 bg-white/10 font-bold text-sm hover:bg-white/20 transition flex items-center gap-2"><BookOpen className="w-4 h-4" /> Узяць «Вянок»</a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap gap-2 text-[12px] font-bold">
                {[["25", "гадоў жыцця"], ["15", "гадоў — першая публікацыя"], ["2000", "асобнікаў «Вянка»"], ["№1", "кніга стагоддзя (2000)"]].map(([n, l]) => (
                  <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center">
                    <span className="font-serif-d text-2xl font-bold text-[#f0d98c]">{n}</span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#a89d80]">{l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="relative">
              <div className="rounded-[28px] overflow-hidden border border-[#c9a227]/30 shadow-2xl shadow-black/60 rotate-1 hover:rotate-0 transition duration-700 bg-[#0d0b07]">
                <img src={realPhotos.portrait.src} alt={realPhotos.portrait.caption} className="w-full aspect-[4/5] object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15120d] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 p-6 w-full">
                  <div className="font-hand text-2xl text-[#f0d98c] -rotate-1">сапраўднае фота, ~1910 год</div>
                  <div className="font-serif-d font-bold text-xl mt-1">Максім Багдановіч</div>
                  <div className="text-xs text-[#cdc3a9] tracking-widest uppercase">1891–1917 • паэт, перакладчык, журналіст</div>
                </div>
              </div>
              <a href={realPhotos.portrait.page} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-1.5 text-[11px] text-[#8f866d] hover:text-[#f0d98c]"><Camera className="w-3.5 h-3.5" /> {realPhotos.portrait.credit} — праверыць крыніцу</a>
              <div className="absolute -bottom-5 -left-3 md:-left-6 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#f6efe1] text-[#15120d] shadow-xl -rotate-2 max-w-[270px]">
                <Quote className="w-8 h-8 text-[#c1272d] shrink-0" />
                <div className="text-[13px] leading-snug"><strong>«Зорка Венера ўзышла над зямлёю…»</strong><br /><span className="text-[#6b6250]">верш 1912 года — слухай ніжэй</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-[#c9a227] text-[#15120d] overflow-hidden py-2.5">
        <div className="flex whitespace-nowrap animate-marquee gap-0 w-max font-serif-d italic font-semibold text-[15px]">
          {[0, 1].map(k => (
            <span key={k} className="flex gap-8 pr-8">
              <span>★ рэальныя запісы «Песняроў»</span><span>★ скан «Вянка» 1914 года</span><span>★ рукапісы паэта</span><span>★ «Пагоня», якую спявала ўся краіна</span><span>★ квіз і чэлендж для цябе</span>
            </span>
          ))}
        </div>
      </div>

      {/* ХТО ГЭТА */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c9a227]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c9a227]">Карацей пра галоўнае</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">Хлопец, які вывучыў мову па кнігах — і стаў яе голасам</h2>
          </Reveal>
          <div className="mt-8 grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
            <div className="grid gap-4">
              {[
                ["Сірата-кніжнік", "Маці памерла, калі яму было 4. Вырас у Расіі, а беларускую вывучыў па бацькавай бібліятэцы ў некалькі тысяч тамоў."],
                ["Дэбют у 15", "Першы твор — апавяданне «Музыка» — надрукавала «Наша Ніва» ў 1907 годзе."],
                ["Юрыст, які не працаваў юрыстам", "Скончыў юрыдычны ліцэй у Яраслаўлі, пісаў у газеты, дапамагаў бежанцам вайны ў Мінску."],
                ["Каханне ў вершах", "Ганна Какуева — дзяўчына, якой прысвечаны «Зорка Венера» і паэма «Вераніка». Яна захоўвала яго лісты ўсё жыццё."],
                ["Смерць у 25", "Сухотаў. Памёр у Ялце 25 траўня 1917 года — амаль твой равеснік."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 50}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex gap-4 hover:border-[#c9a227]/50 transition">
                    <span className="w-10 h-10 shrink-0 rounded-xl bg-[#c9a227]/15 border border-[#c9a227]/30 grid place-items-center font-serif-d font-bold text-[#f0d98c]">{i + 1}</span>
                    <div><div className="font-bold">{t}</div><p className="text-[13px] text-[#b9ad8d] mt-1 leading-relaxed">{d}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-24 space-y-4">
                <Photo id="minskHouse" />
                <div className="rounded-2xl border border-[#c9a227]/25 bg-[#c9a227]/[0.07] p-5">
                  <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#c9a227]">Лента жыцця</div>
                  <div className="mt-3 space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {timeline.map(t => (
                      <div key={t.y} className="flex gap-3">
                        <span className="shrink-0 w-[70px] font-serif-d font-bold text-[#f0d98c]">{t.y}</span>
                        <div className="text-[13px]"><strong>{t.t}.</strong> <span className="text-[#b9ad8d]">{t.d}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ВЯНОК */}
      <section id="vianok" className="paper text-[#15120d] py-16 md:py-24 relative scroll-mt-20 overflow-hidden">
        <div className="ornament-strip absolute top-0 inset-x-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c1272d]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c1272d]">Галоўная кніга</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">«Вянок»: кніга, якую можна патрымаць поглядам</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#5b5340] leading-relaxed">Ніжэй — не малюнкі нейрасеткі, а сапраўдныя сканы: вокладка выдання 1914 года і старонкі з тэкстамі вершаў. Кожны можна адкрыць у арыгінале на Wikimedia Commons.</p>
          </Reveal>
          <div className="mt-8 grid lg:grid-cols-[.9fr_1.1fr] gap-6 items-start">
            <Reveal><Photo id="vianokCover" dark /></Reveal>
            <Reveal delay={100}>
              <div className="rounded-[24px] bg-[#15120d] text-[#f6efe1] p-6 md:p-8">
                <h3 className="font-serif-d text-2xl font-bold flex items-center gap-2"><ScrollText className="w-6 h-6 text-[#c9a227]" /> Пашпарт кнігі (факты)</h3>
                <dl className="mt-5 grid sm:grid-cols-2 gap-3 text-[13px]">
                  {[["Дзе і калі", "Вільня, друкарня Марціна Кухты. На тытуле — 1913, фактычна — пачатак 1914"], ["Хто заплаціў", "Мецэнатка Магдалена Радзівіл"], ["Тыраж", "2000 асобнікаў"], ["Што ўнутры", "92 вершы і 2 паэмы: «Малюнкі і спевы», «Думы», «Мадонны»"], ["Прысвячэнне", "«Вянок на магілу С. Палуяну» — дадаў рэдактар Вацлаў Ластоўскі"], ["Статус сёння", "У 2000 г. — №1 у праекце «100 беларускіх кніг ХХ стагоддзя»"]].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-white/[0.05] border border-white/10 p-3.5"><dt className="text-[11px] uppercase tracking-widest text-[#8a7f64]">{k}</dt><dd className="font-semibold mt-1 leading-snug text-[#e6dcc2]">{v}</dd></div>
                  ))}
                </dl>
                <a href={realPhotos.vianok1927.page} target="_blank" rel="noreferrer" className="mt-5 flex items-center gap-2 text-[13px] font-bold text-[#f0d98c] hover:underline"><ExternalLink className="w-4 h-4" /> Другое выданне «Вянка» (1927) — глядзець скан у Сховішчы</a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-8 flex items-end justify-between flex-wrap gap-3">
              <h3 className="font-serif-d text-2xl md:text-3xl font-bold">Гартай арыгінал: старонкі выдання 1914 года</h3>
              <div className="flex gap-2">
                {(["tkachyhi", "romans", "zimoj"] as const).map(k => (
                  <button key={k} onClick={() => setScan(k)} className={`px-4 py-2 rounded-full text-[12px] font-bold border transition ${scan === k ? "bg-[#15120d] text-[#f0d98c] border-[#15120d]" : "border-[#15120d]/20 hover:border-[#15120d]"}`}>
                    {k === "tkachyhi" ? "«Слуцкія ткачыхі»" : k === "romans" ? "«Зорка Венера»" : "«Зімой»"}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="mt-4 grid lg:grid-cols-[1fr_.8fr] gap-6 items-start">
            <Reveal><Photo id={scan === "tkachyhi" ? "manuscriptTkachyhi" : scan === "romans" ? "manuscriptRomans" : "manuscriptZimoj"} dark /></Reveal>
            <Reveal delay={100}>
              <div className="grid gap-4">
                <Photo id="vianok1927" dark />
                <div className="rounded-[22px] bg-[#3a5fbf] text-white p-6">
                  <h4 className="font-serif-d text-xl font-bold">Як чытаць стары друк?</h4>
                  <p className="text-[13px] leading-relaxed mt-2 text-white/90">У выданні 1914 года — класічны правапіс з «ў» і мяккімі знакамі. Параўнай са сканам тэкст верша ў наступным раздзеле: знойдзеш, што змянілася за 100 гадоў. Гэта гатовае заданне для ўрока.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="ornament-strip absolute bottom-0 inset-x-0" />
      </section>

      {/* ВЕРШЫ */}
      <section id="poems" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c9a227]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c9a227]">Чытальня</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05]">Тры вершы, пасля якіх ты зразумееш усё</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#cdc3a9]">Тэксты — грамадскі набытак. Пад кожным — праверка: дзе чытаць арыгінал і дзе слухаць.</p>
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-2">
            {poemsReal.map(p => (
              <button key={p.id} onClick={() => setPoemId(p.id)} className={`px-4 py-2.5 rounded-full text-[13px] font-bold border transition ${poemId === p.id ? "bg-[#c9a227] text-[#15120d] border-[#c9a227]" : "border-white/15 text-[#d8cdae] hover:border-[#c9a227]/60"}`}>
                {p.title} <span className="opacity-60 font-normal">• {p.year}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid lg:grid-cols-[1fr_.9fr] gap-6 items-start">
            <Reveal>
              <div className="paper text-[#15120d] rounded-[24px] p-6 md:p-9">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a7f64]">{poem.note} • {poem.year}</div>
                <h3 className="font-serif-d text-3xl md:text-5xl font-bold mt-2">{poem.title}</h3>
                {!poem.full && <div className="mt-2 inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-[#c1272d]/10 text-[#c1272d] border border-[#c1272d]/30">паказаны пачатак — поўны тэкст па спасылцы ніжэй</div>}
                <div className="mt-5 poem-text font-serif-d text-[18px] md:text-[20px] text-[#221d12]">{poem.text}</div>
                <a href="https://be.wikisource.org/wiki/Аўтар:Максім_Багдановіч" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold underline underline-offset-4">Зверыць тэкст на Вікікрыніцах <ExternalLink className="w-3.5 h-3.5" /></a>
              </div>
            </Reveal>
            <div className="space-y-4">
              <Reveal delay={80}>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                  <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4 text-[#c9a227]" /> Пра што гэта (каротка)</h4>
                  <p className="text-[13.5px] text-[#d8cdae] leading-relaxed mt-2">{poem.about}</p>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="rounded-[24px] border border-[#c1272d]/30 bg-[#c1272d]/10 p-6">
                  <h4 className="font-bold flex items-center gap-2 text-[#ffb3b6]"><Disc3 className="w-4 h-4" /> Дзе гэта гучыць</h4>
                  <p className="text-[13.5px] text-[#e6dcc2] leading-relaxed mt-2">{poem.music}</p>
                  <a href="#media" className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#f0d98c]">Да відэа і аўдыё <ArrowRight className="w-4 h-4" /></a>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="rounded-[24px] paper text-[#15120d] p-6">
                  <h4 className="font-serif-d text-lg font-bold flex items-center gap-2"><Feather className="w-4 h-4" /> Хвілінка на падумаць</h4>
                  <p className="text-[13px] mt-2 leading-relaxed">Знайдзі ў тэксце адзін вобраз, які можна намаляваць, і адзін — які можна праспяваць. Што лягчэй перадаць: колер ці рытм? Адказ запішы ў чэлендж ніжэй.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* МЕДЫЯ */}
      <section id="media" className="py-16 md:py-24 scroll-mt-20 bg-[#100e09] border-y border-[#c9a227]/15">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c9a227]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c9a227]">Відэа і аўдыё • толькі рэальныя запісы</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05]">Націсні play — гэта ўсё сапраўднае</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#cdc3a9]">Канцэрты, хоры, тэлебачанне і сучасныя выканаўцы. Ніякіх згенераваных галасоў — толькі жывыя людзі.</p>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {realVideos.map((v, i) => (
              <Reveal key={v.yt} delay={Math.min(i * 60, 240)}>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 md:p-5 h-full">
                  <YT id={v.yt} />
                  <div className="px-1 pt-4 pb-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#c9a227]"><Clapperboard className="w-3.5 h-3.5" /> YouTube • рэальны запіс</div>
                    <div className="font-bold text-[16px] mt-1.5">{v.title}</div>
                    <div className="text-[12px] text-[#8f866d] mt-0.5">{v.who}</div>
                    <p className="text-[13px] text-[#b9ad8d] mt-2 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <a href="https://kamunikat.org/vershy-bagdanovich-maksim" target="_blank" rel="noreferrer" className="rounded-[24px] bg-gradient-to-br from-[#c1272d] to-[#6e1420] p-6 md:p-7 flex gap-4 items-start hover:scale-[1.01] transition group">
                <span className="w-12 h-12 shrink-0 rounded-2xl bg-white/15 grid place-items-center"><Headphones className="w-6 h-6" /></span>
                <span>
                  <span className="block text-[11px] font-bold tracking-[0.22em] uppercase text-white/70">Аўдыякніга • mp3</span>
                  <span className="block font-serif-d text-xl font-bold mt-1">Слухаць вершы голасам — Kamunikat.org</span>
                  <span className="block text-[13px] text-white/80 mt-1">«Зорка Венера», «Пагоня», «Слуцкія ткачыхі» і іншыя. Можна слухаць анлайн і спампоўваць. <span className="underline">Адкрыць бібліятэку</span></span>
                </span>
              </a>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 md:p-7 flex gap-4 items-start">
                <span className="w-12 h-12 shrink-0 rounded-2xl bg-[#c9a227]/15 border border-[#c9a227]/30 grid place-items-center"><Music className="w-6 h-6 text-[#f0d98c]" /></span>
                <div>
                  <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#8a7f64]">Плэйліст для дарогі</div>
                  <div className="font-bold mt-1">Збяры свой Багдановіч-плэйліст</div>
                  <p className="text-[13px] text-[#b9ad8d] mt-1 leading-relaxed">1. «Песняры» — «Слуцкія ткачыхі» 2. «Песняры» — «Пагоня» (1993) 3. Ляўчук і Павук — «Зорка Венера» 4. Спірыдовіч чытае «Слуцкія ткачыхі». Падзяліся плэйлістам з класам.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ДАКУМЕНТЫ */}
      <section id="docs" className="paper text-[#15120d] py-16 md:py-24 scroll-mt-20 relative overflow-hidden">
        <div className="ornament-strip absolute top-0 inset-x-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c1272d]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c1272d]">Друкаваныя крыніцы</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05]">Правер сам: дакументы і архівы</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#5b5340]">Кожны факт на гэтым сайце можна праверыць. Вось дзе ляжаць арыгіналы: тэксты, аўдыё, архіўныя запісы, музейныя старонкі.</p>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {docLinks.map((d, i) => (
              <Reveal key={d.title} delay={Math.min(i * 50, 250)}>
                <a href={d.url} target="_blank" rel="noreferrer" className="block h-full rounded-[24px] bg-white border border-[#15120d]/12 p-6 hover:border-[#c1272d] hover:-translate-y-1 transition group shadow-sm">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#c1272d]"><FileText className="w-3.5 h-3.5" /> {d.where}</div>
                  <div className="font-serif-d text-xl font-bold mt-2 group-hover:underline underline-offset-4">{d.title}</div>
                  <p className="text-[13px] text-[#5b5340] mt-2 leading-relaxed">{d.desc}</p>
                  <div className="mt-3 text-[12px] font-bold flex items-center gap-1.5">Адкрыць крыніцу <ExternalLink className="w-3.5 h-3.5" /></div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-6 grid lg:grid-cols-2 gap-4">
              <Photo id="zelenya" dark />
              <div className="rounded-[24px] bg-[#15120d] text-[#f6efe1] p-6 md:p-8 flex flex-col justify-center">
                <h3 className="font-serif-d text-2xl font-bold">Рукою паэта</h3>
                <p className="text-[14px] text-[#d8cdae] leading-relaxed mt-3">Злева — старонка рукапісуны зборніка «Зеляня» (1909–1913), які захоўваецца ў Літаратурным музеі ў Мінску. Малады Багдановіч перапісваў вершы ад рукі і дарыў блізкім — так выходзілі «кнігі» да друкаванага «Вянка». Рукапісы можна ўбачыць у музеі на вул. Багдановіча, 7а.</p>
                <a href="https://bagdanovichmuseum.by/biyagrafiya/" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#f0d98c]">Сайт музея <ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="ornament-strip absolute bottom-0 inset-x-0" />
      </section>

      {/* МЕСЦЫ */}
      <section id="places" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c9a227]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c9a227]">Геаграфія лёсу</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05]">Куды пайсці ўжывую</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#cdc3a9]">Рэальныя фота рэальных музеяў. Адрасы сапраўдныя — можна пабудаваць маршрут выхаднога дня.</p>
          </Reveal>
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <Reveal><Photo id="museumMinsk" /></Reveal>
            <Reveal delay={100}><Photo id="museumGrodno" /></Reveal>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Мінск", "Музей на вул. Багдановіча, 7а + Траецкае прадмесце, дзе ён нарадзіўся"],
              ["Гродна", "Дом-музей, вул. 1 Мая, 10 + Нёман і Каложа побач"],
              ["Вільня", "Вострая Брама з «Пагоні», друкарня Кухты, могілкі Роса"],
              ["Ялта", "Мемарыяльная дошка і магіла на Аўцкіх могілках"],
            ].map(([c, d], i) => (
              <Reveal key={c} delay={i * 60}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 h-full">
                  <div className="flex items-center gap-2 font-bold"><MapPin className="w-4 h-4 text-[#c9a227]" /> {c}</div>
                  <p className="text-[13px] text-[#b9ad8d] mt-2 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* КВІЗ */}
      <section id="quiz" className="paper text-[#15120d] py-16 md:py-24 scroll-mt-20 relative overflow-hidden">
        <div className="ornament-strip absolute top-0 inset-x-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c1272d]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c1272d]">Правер сябе</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05]">Квіз: ці ўважліва ты гартаў?</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#5b5340]">10 пытанняў. Усе адказы ёсць вышэй на гэтай старонцы — гэта не экзамен, а гульня.</p>
          </Reveal>
          <Reveal>
            <div className="mt-8 rounded-[24px] bg-[#15120d] text-[#f6efe1] p-6 md:p-10 max-w-3xl">
              {!qDone ? (
                <>
                  <div className="flex items-center justify-between text-[12px] font-bold text-[#8a7f64]"><span>Пытанне {qIdx + 1} з {quizQuestions.length}</span><span>Балы: {qScore}</span></div>
                  <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-[#c9a227] transition-all" style={{ width: `${(qIdx / quizQuestions.length) * 100}%` }} /></div>
                  <div className="font-bold text-lg md:text-xl mt-6 leading-snug">{quizQuestions[qIdx].q}</div>
                  <div className="mt-4 grid gap-2.5">
                    {quizQuestions[qIdx].options.map((o, i) => {
                      const isCorr = i === quizQuestions[qIdx].correct;
                      let cls = "border-white/12 bg-white/[0.05] hover:border-[#c9a227]/60";
                      if (picked !== null) {
                        if (isCorr) cls = "border-emerald-400 bg-emerald-400/15";
                        else if (picked === i) cls = "border-[#c1272d] bg-[#c1272d]/20";
                        else cls = "border-white/10 opacity-60";
                      }
                      return (
                        <button key={o} disabled={picked !== null} onClick={() => setPicked(i)} className={`text-left px-4 py-3.5 rounded-xl border text-[14px] font-semibold transition flex items-center justify-between gap-3 ${cls}`}>
                          <span>{o}</span>
                          {picked !== null && isCorr && <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />}
                          {picked === i && !isCorr && <XCircle className="w-5 h-5 text-red-300 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== null && (
                    <div className="mt-4 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/30 p-4 text-[13px] leading-relaxed">
                      <strong className={picked === quizQuestions[qIdx].correct ? "text-emerald-300" : "text-red-300"}>{picked === quizQuestions[qIdx].correct ? "Так! " : "Міма. "}</strong>
                      <span className="text-[#d8cdae]">{quizQuestions[qIdx].explain}</span>
                      <button onClick={() => {
                        if (picked === quizQuestions[qIdx].correct) setQScore(s => s + 1);
                        if (qIdx + 1 >= quizQuestions.length) setQDone(true); else { setQIdx(q => q + 1); setPicked(null); }
                      }} className="mt-3 w-full py-3 rounded-xl bg-[#c9a227] text-[#15120d] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#f0d98c] transition">
                        {qIdx + 1 >= quizQuestions.length ? "Паказаць вынік" : "Далей"} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <GraduationCap className="w-14 h-14 mx-auto text-[#c9a227]" />
                  <div className="font-serif-d text-5xl font-bold mt-4 text-[#f0d98c]">{qScore} / {quizQuestions.length}</div>
                  <div className="font-bold text-lg mt-2">{qScore >= 9 ? "Легенда «Вянка»" : qScore >= 6 ? "Упэўнены фан" : qScore >= 3 ? "Пачатковец" : "Толькі пачынаеш — і гэта крута"}</div>
                  <p className="text-[13px] text-[#b9ad8d] mt-3">{qScore >= 6 ? "Забірай сябра і ідзі ў музей на Багдановіча, 7а — будзеш там сваім." : "Прагартай старонку ўверх: усе адказы ў фота, відэа і тэкстах."}</p>
                  <button onClick={() => { setQIdx(0); setQScore(0); setQDone(false); setPicked(null); }} className="mt-5 px-6 py-3 rounded-full border border-[#c9a227]/40 font-bold text-sm inline-flex items-center gap-2 hover:bg-[#c9a227] hover:text-[#15120d] transition"><RotateCcw className="w-4 h-4" /> Яшчэ раз</button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
        <div className="ornament-strip absolute bottom-0 inset-x-0" />
      </section>

      {/* СТВАРЫ САМ */}
      <section id="create" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="h-px w-10 bg-[#c9a227]" /><span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c9a227]">Твой ход</span></div>
            <h2 className="font-serif-d text-3xl md:text-5xl font-semibold leading-[1.05]">Зрабі Багдановіча сваім</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#cdc3a9]">Папулярызацыя — гэта не толькі чытаць, але і ствараць. Выберы чэлендж, апублікуй вынік на сцяне (захоўваецца ў тваім браўзеры).</p>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Кавер-чэлендж", "Запішы «Зорку Венеру» пад гітару, біт ці акапэла. Выкладзі з хэштэгам #мойБагдановіч."],
              ["Reels па вершы", "60 секунд: чытаеш страфу + паказваеш месца з верша (поле, раку, горад)."],
              ["Васілёк у стужцы", "Знімі слуцкі пояс або арнамент у музеі/дома і падпішы радкамі з «Ткачых»."],
              ["Пераклад-батл", "Перакладзі страфу «Пагоні» на англійскую і параўнай з сябрам: што страцілася?"],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="rounded-[22px] border border-[#c9a227]/25 bg-white/[0.04] p-6 h-full">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#c9a227]">Чэлендж {i + 1}</span>
                  <div className="font-serif-d text-xl font-bold mt-2">{t}</div>
                  <p className="text-[13px] text-[#b9ad8d] mt-2 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid lg:grid-cols-[.9fr_1.1fr] gap-6 items-start">
            <Reveal>
              <div className="paper text-[#15120d] rounded-[24px] p-6 md:p-8">
                <h3 className="font-serif-d text-2xl font-bold flex items-center gap-2"><PenLine className="w-5 h-5" /> Сцяна моладзі</h3>
                <p className="text-[13px] text-[#6b6250] mt-1">Апішы сваю работу (або ўстаў спасылку на відэа) — няхай яе ўбачаць іншыя.</p>
                <div className="mt-4 space-y-3">
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Нік / імя, горад" className="w-full px-4 py-3 rounded-xl border border-[#15120d]/15 bg-white text-sm outline-none focus:border-[#c9a227]" />
                  <div className="flex gap-2 flex-wrap">
                    {["Кавер", "Відэа", "Фота", "Верш", "Мем-апісанне"].map(k => (
                      <button key={k} onClick={() => setForm({ ...form, kind: k })} className={`px-3 py-1.5 rounded-full text-[12px] font-bold border ${form.kind === k ? "bg-[#15120d] text-[#f0d98c] border-[#15120d]" : "border-[#15120d]/15 hover:border-[#15120d]"}`}>{k}</button>
                    ))}
                  </div>
                  <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={4} placeholder="Што ты зрабіў? Кінь спасылку або апішы…" className="w-full px-4 py-3 rounded-xl border border-[#15120d]/15 bg-white text-sm outline-none focus:border-[#c9a227] resize-none" />
                  <button onClick={() => { if (!form.name.trim() || !form.text.trim()) return; setWorks([{ ...form, likes: 0 }, ...works]); setForm({ name: "", kind: "Кавер", text: "" }); }} className="w-full py-3.5 rounded-xl bg-[#c1272d] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#a01f24] transition"><Send className="w-4 h-4" /> Закінуць на сцяну</button>
                </div>
              </div>
            </Reveal>
            <div className="space-y-4">
              {works.length === 0 && (
                <div className="rounded-[22px] border border-dashed border-white/20 p-8 text-center text-[13px] text-[#8f866d]">
                  <Sparkles className="w-8 h-8 mx-auto text-[#c9a227]" />
                  <p className="mt-3">Пакуль пуста — стань першым! Твая работа з'явіцца тут і захаваецца ў браўзеры.</p>
                </div>
              )}
              {works.map((w, i) => (
                <Reveal key={i} delay={Math.min(i * 40, 160)}>
                  <div className="rounded-[22px] border border-[#c9a227]/25 bg-white/[0.05] p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div><div className="font-bold text-[15px]">{w.name}</div><div className="text-[11px] font-bold tracking-widest uppercase text-[#c9a227] mt-1">{w.kind}</div></div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setWorks(works.map((x, xi) => xi === i ? { ...x, likes: (x.likes || 0) + 1 } : x))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c1272d]/15 border border-[#c1272d]/30 text-[12px] font-bold hover:bg-[#c1272d] hover:text-white transition"><Heart className="w-3.5 h-3.5" /> {w.likes || 0}</button>
                        <button onClick={() => setWorks(works.filter((_, xi) => xi !== i))} className="w-8 h-8 grid place-items-center rounded-full border border-white/15 hover:bg-white/10"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#e6dcc2] whitespace-pre-line">{w.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ФУТАР */}
      <footer className="bg-[#0d0b07] border-t border-[#c9a227]/20 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#c9a227] grid place-items-center"><Flame className="w-5 h-5 text-[#15120d]" /></span>
                <div><div className="font-serif-d font-bold text-xl">БАГДАНОВІЧ × МОЛАДЗЬ</div><div className="text-[11px] tracking-[0.25em] uppercase text-[#c9a227]">усе матэрыялы — сапраўдныя і правяраныя</div></div>
              </div>
              <p className="mt-4 text-[13px] text-[#8f866d] leading-relaxed max-w-lg">Ніякіх згенераваных фота і аўдыё: партрэт і сканы — Wikimedia Commons (public domain), відэа — рэальныя запісы на YouTube, тэксты — грамадскі набытак, факты — музеі, архівы і бібліятэкі (спасылкі побач). Калі заўважыў памылку — звер факты па крыніцах і напішы настаўніку.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {nav.map(n => <a key={n.id} href={`#${n.id}`} className="px-3.5 py-2 rounded-full border border-white/10 text-[12px] font-bold text-[#d8cdae] hover:border-[#c9a227] hover:text-[#f0d98c] transition">{n.label}</a>)}
              </div>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#c9a227] flex items-center gap-2"><Library className="w-4 h-4" /> Усе крыніцы сайта</div>
              <ul className="mt-4 space-y-2.5">
                {docLinks.map(s => (
                  <li key={s.title}><a href={s.url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 text-[13px] text-[#d8cdae] hover:text-[#f0d98c] group"><span>{s.where} — {s.title}</span><ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100" /></a></li>
                ))}
                <li><a href="https://commons.wikimedia.org/wiki/Category:Maksim_Bahdanovich" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 text-[13px] text-[#d8cdae] hover:text-[#f0d98c] group"><span>Wikimedia Commons — усе фота і сканы паэта</span><ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100" /></a></li>
              </ul>
            </div>
          </div>
          <div className="ornament-strip-red mt-10 opacity-60" />
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#6b6250]">
            <span>© 2026 • «І тчэ, забыўшыся, рука…» — зроблена з любоўю да беларускага слова</span>
            <a href="#start" className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#c9a227] hover:text-[#f0d98c] transition">Уверх <ArrowUp className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
