import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/a4555edc-3faa-4bb0-ae53-8e65062a440a/files/89a7d5cd-2e97-4b51-a91c-1cd97dcd09d9.jpg";
const PROJECT_IMAGE_1 = "https://cdn.poehali.dev/projects/a4555edc-3faa-4bb0-ae53-8e65062a440a/files/c9a5f1eb-a944-42c8-92de-c3b27c58faa8.jpg";
const TEAM_IMAGE = "https://cdn.poehali.dev/projects/a4555edc-3faa-4bb0-ae53-8e65062a440a/files/398846c8-5823-4777-8b08-bd97f1bdd7da.jpg";

const projects = [
  {
    id: 1,
    title: "Shadows of Eternity",
    genre: "RPG / Dark Fantasy",
    description: "Эпическая RPG с процедурно генерируемым миром и тактической боевой системой. 200+ часов игрового контента.",
    image: PROJECT_IMAGE_1,
    goal: 5000000,
    raised: 3750000,
    backers: 1247,
    daysLeft: 18,
    tags: ["RPG", "Open World", "PvE"],
    color: "cyan",
  },
  {
    id: 2,
    title: "Neon Velocity",
    genre: "Racing / Cyberpunk",
    description: "Аркадные гонки в неоновом мегаполисе 2077 года. 40 трасс, 120 автомобилей, онлайн-мультиплеер.",
    image: PROJECT_IMAGE_1,
    goal: 2000000,
    raised: 2100000,
    backers: 892,
    daysLeft: 5,
    tags: ["Racing", "Multiplayer", "Cyberpunk"],
    color: "purple",
  },
  {
    id: 3,
    title: "Pixel Kingdom",
    genre: "Strategy / Pixelart",
    description: "Пиксельная стратегия с элементами roguelike. Стройте королевство, сражайтесь с монстрами.",
    image: PROJECT_IMAGE_1,
    goal: 1000000,
    raised: 420000,
    backers: 534,
    daysLeft: 34,
    tags: ["Strategy", "Roguelike", "Pixel"],
    color: "pink",
  },
];

const tiers = [
  {
    name: "Новичок",
    price: "499 ₽",
    icon: "⚔️",
    perks: ["Ваше имя в титрах", "Цифровой саундтрек", "Ранний доступ к бета-версии"],
    badge: "tier-novice",
  },
  {
    name: "Воин",
    price: "1 490 ₽",
    icon: "🛡️",
    perks: ["Все из «Новичка»", "Эксклюзивный скин", "Доступ к закрытому форуму", "Цифровой артбук"],
    badge: "tier-warrior",
    popular: true,
  },
  {
    name: "Чемпион",
    price: "3 990 ₽",
    icon: "🏆",
    perks: ["Все из «Воина»", "Физическая коробка", "Постер с подписью команды", "«Особые благодарности»"],
    badge: "tier-champion",
  },
  {
    name: "Легенда",
    price: "12 000 ₽",
    icon: "👑",
    perks: ["Все из «Чемпиона»", "Видеозвонок с командой", "Ваш персонаж в игре", "Статуэтка лимитед"],
    badge: "tier-legend",
  },
];

const stats = [
  { value: "124", label: "Проекта запущено", icon: "Rocket" },
  { value: "48 700", label: "Бэкеров", icon: "Users" },
  { value: "₽ 312М", label: "Собрано", icon: "TrendingUp" },
  { value: "89%", label: "Успешных проектов", icon: "Award" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const progress = Math.round((project.raised / project.goal) * 100);
  const textColorMap: Record<string, string> = {
    cyan: "neon-text-cyan",
    purple: "neon-text-purple",
    pink: "neon-text-pink",
  };

  return (
    <div className="card-game rounded-xl overflow-hidden animate-on-scroll" style={{ transitionDelay: `${index * 0.15}s` }}>
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A1460] to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2 flex-wrap">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-md bg-black/60 border border-white/20 text-white/80 font-rubik">
              {tag}
            </span>
          ))}
        </div>
        {project.raised >= project.goal && (
          <div className="absolute top-3 left-3 tier-badge tier-novice text-xs">
            ✓ ПРОФИНАНСИРОВАН
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs text-muted-foreground font-rubik uppercase tracking-widest mb-1">{project.genre}</p>
        <h3 className="font-russo text-xl text-white mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground font-rubik leading-relaxed mb-4">{project.description}</p>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1.5">
            <span className={`font-russo text-sm ${textColorMap[project.color]}`}>{progress}% собрано</span>
            <span className="text-muted-foreground font-rubik">{project.raised.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground font-rubik mb-4">
          <span className="flex items-center gap-1">
            <Icon name="Users" size={12} />
            {project.backers.toLocaleString("ru-RU")} бэкеров
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Clock" size={12} />
            {project.daysLeft} дней осталось
          </span>
        </div>

        <button className="btn-neon w-full py-2.5 px-4 rounded-lg text-sm cursor-pointer">
          ПОДДЕРЖАТЬ ПРОЕКТ
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "about", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A14] font-rubik" ref={sectionsRef}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1E1E3F] bg-[#0A0A14]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/a4555edc-3faa-4bb0-ae53-8e65062a440a/bucket/dc412269-39c0-46e1-9290-d4bc3738db62.png"
              alt="Level Up"
              className="h-10 w-auto object-contain"
            />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "home", label: "Главная" },
              { id: "projects", label: "Проекты" },
              { id: "about", label: "О платформе" },
              { id: "contact", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
            <button className="btn-neon px-5 py-2 rounded-lg text-sm">
              Запустить проект
            </button>
          </div>

          <button className="md:hidden text-[#00F5FF]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#1E1E3F] bg-[#0A0A14] px-6 py-4 flex flex-col gap-4">
            {[
              { id: "home", label: "Главная" },
              { id: "projects", label: "Проекты" },
              { id: "about", label: "О платформе" },
              { id: "contact", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-left ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <div className="scan-line" />
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14]/50 via-transparent to-[#0A0A14]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, #BF00FF15 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #00F5FF15 0%, transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="tier-badge tier-warrior mb-6 inline-flex">
              <span>🎮 КРАУДФАНДИНГ ДЛЯ ГЕЙМЕРОВ</span>
            </div>

            <h1 className="section-title text-white mb-6 leading-tight">
              ЗАПУСТИ ИГРУ
              <br />
              <span className="neon-text-cyan">СВОЕЙ МЕЧТЫ</span>
              <br />
              В РЕАЛЬНОСТЬ
            </h1>

            <p className="text-muted-foreground text-lg font-rubik leading-relaxed mb-8 max-w-lg">
              Платформа для поддержки независимых игровых проектов. Выбирай уровень вознаграждения и становись частью создания лучших игр.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="btn-purple px-8 py-3.5 rounded-xl text-base cursor-pointer"
              >
                🚀 Смотреть проекты
              </button>
              <button className="btn-neon px-8 py-3.5 rounded-xl text-base cursor-pointer">
                + Добавить проект
              </button>
            </div>

            <div className="flex gap-8 mt-10">
              {[
                { v: "124+", l: "Проектов" },
                { v: "48K+", l: "Бэкеров" },
                { v: "89%", l: "Успех" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-russo text-2xl neon-text-cyan">{s.v}</div>
                  <div className="text-xs text-muted-foreground font-rubik uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative animate-float">
              <div className="card-game neon-border-cyan rounded-2xl p-6 w-80" style={{ border: "1px solid #00F5FF", boxShadow: "0 0 20px #00F5FF30" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#BF00FF] flex items-center justify-center text-2xl">
                    🎮
                  </div>
                  <div>
                    <p className="font-russo text-white text-sm">Shadows of Eternity</p>
                    <p className="text-xs text-muted-foreground">RPG / Dark Fantasy</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="neon-text-cyan font-russo">75% собрано</span>
                    <span className="text-muted-foreground">₽ 3 750 000</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "75%" }} />
                  </div>
                </div>
                <div className="flex justify-between">
                  {[{ v: "1 247", l: "бэкеров" }, { v: "18", l: "дней" }, { v: "4", l: "уровня" }].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="font-russo text-white text-lg">{s.v}</p>
                      <p className="text-xs text-muted-foreground">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#BF00FF] blur-sm opacity-80" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#00F5FF] blur-sm opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-[#1E1E3F] bg-[#06060F] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BF00FF10] via-transparent to-[#00F5FF10]" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl border border-[#00F5FF30] bg-[#00F5FF10] flex items-center justify-center">
                    <Icon name={stat.icon as "Rocket"} size={22} className="text-[#00F5FF]" />
                  </div>
                </div>
                <span className="font-russo text-3xl md:text-4xl neon-text-cyan">{stat.value}</span>
                <p className="text-sm text-muted-foreground font-rubik mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, #BF00FF08 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="tier-badge tier-warrior mb-4 inline-flex">🔥 АКТИВНЫЕ КАМПАНИИ</span>
            <h2 className="section-title text-white mt-4">
              ГОРЯЩИЕ<span className="neon-text-purple"> ПРОЕКТЫ</span>
            </h2>
            <p className="text-muted-foreground font-rubik mt-4 max-w-xl mx-auto">
              Поддержи разработчиков прямо сейчас и получи эксклюзивные вознаграждения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <button className="btn-neon px-10 py-3.5 rounded-xl text-base cursor-pointer">
              Все проекты →
            </button>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="py-24 bg-[#06060F] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="tier-badge tier-legend mb-4 inline-flex">👑 УРОВНИ ПОДДЕРЖКИ</span>
            <h2 className="section-title text-white mt-4">
              ВЫБЕРИ СВОЙ
              <span style={{ color: "#FFE600", textShadow: "0 0 10px #FFE60080" }}> УРОВЕНЬ</span>
            </h2>
            <p className="text-muted-foreground font-rubik mt-4 max-w-xl mx-auto">
              Каждый уровень открывает уникальные вознаграждения от команды разработчиков
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`card-game rounded-xl p-6 relative animate-on-scroll ${tier.popular ? "ring-2 ring-[#BF00FF] ring-offset-2 ring-offset-[#06060F]" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="tier-badge tier-champion text-xs px-3 py-1">⭐ ПОПУЛЯРНЫЙ</span>
                  </div>
                )}

                <div className="text-4xl mb-4">{tier.icon}</div>
                <span className={`tier-badge ${tier.badge} mb-3 inline-flex`}>{tier.name}</span>
                <div className="font-russo text-3xl text-white mb-4">{tier.price}</div>

                <ul className="space-y-2.5 mb-6">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground font-rubik">
                      <Icon name="Check" size={14} className="text-[#00F5FF] mt-0.5 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-2.5 px-4 rounded-lg text-sm cursor-pointer ${tier.popular ? "btn-purple" : "btn-neon"}`}>
                  ВЫБРАТЬ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, #00F5FF08 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <span className="tier-badge tier-warrior mb-6 inline-flex">🎯 О ПЛАТФОРМЕ</span>
              <h2 className="section-title text-white mt-4 mb-6">
                МЫ ВЕРИМ В<br />
                <span className="neon-text-cyan">INDIE ИГРЫ</span>
              </h2>
              <p className="text-muted-foreground font-rubik leading-relaxed mb-6">
                LEVELUP — первая в России платформа краудфандинга, созданная специально для игровой индустрии. Мы соединяем независимых разработчиков с настоящими фанатами игр.
              </p>
              <p className="text-muted-foreground font-rubik leading-relaxed mb-8">
                Наша система уровней вознаграждений делает поддержку проектов по-настоящему игровым опытом — от «Новичка» до легендарного статуса с эксклюзивными привилегиями.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield", text: "Безопасные платежи" },
                  { icon: "Zap", text: "Быстрый запуск" },
                  { icon: "Globe", text: "Международная аудитория" },
                  { icon: "HeartHandshake", text: "Поддержка 24/7" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-lg border border-[#1E1E3F]">
                    <Icon name={item.icon as "Shield"} size={18} className="text-[#00F5FF]" />
                    <span className="text-sm font-rubik text-white">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-on-scroll">
              <div className="rounded-2xl overflow-hidden border border-[#1E1E3F]">
                <img src={TEAM_IMAGE} alt="Команда" className="w-full h-80 object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 card-game rounded-xl p-4 w-48" style={{ border: "1px solid #00F5FF40", boxShadow: "0 0 15px #00F5FF20" }}>
                <p className="font-russo text-white text-sm mb-1">Лучший старт</p>
                <p className="neon-text-cyan font-russo text-2xl">2024</p>
                <p className="text-xs text-muted-foreground">по версии GameDev Awards</p>
              </div>
            </div>
          </div>

          {/* TEAM */}
          <div className="mt-20">
            <div className="text-center mb-10 animate-on-scroll">
              <span className="tier-badge tier-cyan mb-3 inline-flex" style={{ background: "#00F5FF15", border: "1px solid #00F5FF", color: "#00F5FF" }}>👾 НАША КОМАНДА</span>
              <h3 className="font-russo text-white text-2xl md:text-3xl mt-3">Люди за <span className="neon-text-cyan">платформой</span></h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  name: "Алексей Громов",
                  role: "Основатель & CEO",
                  emoji: "🧠",
                  color: "#00F5FF",
                  bg: "#00F5FF15",
                  border: "#00F5FF30",
                  desc: "10 лет в игровой индустрии. Бывший продюсер Nival.",
                },
                {
                  name: "Мария Соколова",
                  role: "Директор по развитию",
                  emoji: "🚀",
                  color: "#BF00FF",
                  bg: "#BF00FF15",
                  border: "#BF00FF30",
                  desc: "Запустила 40+ успешных краудфандинг-кампаний.",
                },
                {
                  name: "Дмитрий Ким",
                  role: "Технический директор",
                  emoji: "⚡",
                  color: "#FF006E",
                  bg: "#FF006E15",
                  border: "#FF006E30",
                  desc: "Архитектор платформы. Ранее — Mail.ru Games.",
                },
              ].map((person, i) => (
                <div
                  key={person.name}
                  className="card-game rounded-2xl p-6 text-center animate-on-scroll"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
                    style={{ background: person.bg, border: `1px solid ${person.border}`, boxShadow: `0 0 20px ${person.bg}` }}
                  >
                    {person.emoji}
                  </div>
                  <p className="font-russo text-white text-lg mb-1">{person.name}</p>
                  <p className="text-xs font-russo uppercase tracking-widest mb-3" style={{ color: person.color }}>
                    {person.role}
                  </p>
                  <p className="text-sm text-muted-foreground font-rubik leading-relaxed">{person.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-[#06060F] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BF00FF20] via-[#00F5FF10] to-[#BF00FF20]" />
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center animate-on-scroll">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="section-title text-white mb-4">
            ГОТОВ ЗАПУСТИТЬ<br />
            <span className="neon-text-purple">СВОЙ ПРОЕКТ?</span>
          </h2>
          <p className="text-muted-foreground font-rubik text-lg mb-8">
            Присоединяйся к сотням разработчиков, которые уже нашли свою аудиторию на LEVELUP
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-purple px-10 py-4 rounded-xl text-lg cursor-pointer">
              Создать кампанию
            </button>
            <button className="btn-neon px-10 py-4 rounded-xl text-lg cursor-pointer">
              Узнать подробнее
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 80%, #FF006E08 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="tier-badge tier-warrior mb-4 inline-flex">📡 СВЯЗЬ</span>
            <h2 className="section-title text-white mt-4">
              СВЯЖИСЬ С<span className="neon-text-pink"> НАМИ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="card-game rounded-2xl p-8 animate-on-scroll">
              <h3 className="font-russo text-white text-xl mb-6">Напишите нам</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-russo text-muted-foreground uppercase tracking-wider mb-2">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Игровой ник или имя"
                    className="w-full bg-[#06060F] border border-[#1E1E3F] rounded-lg px-4 py-3 text-white font-rubik text-sm focus:outline-none focus:border-[#00F5FF] transition-all placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-russo text-muted-foreground uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-[#06060F] border border-[#1E1E3F] rounded-lg px-4 py-3 text-white font-rubik text-sm focus:outline-none focus:border-[#00F5FF] transition-all placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-russo text-muted-foreground uppercase tracking-wider mb-2">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Расскажите о вашем проекте..."
                    className="w-full bg-[#06060F] border border-[#1E1E3F] rounded-lg px-4 py-3 text-white font-rubik text-sm focus:outline-none focus:border-[#00F5FF] transition-all placeholder:text-muted-foreground resize-none"
                  />
                </div>
                <button className="btn-purple w-full py-3 rounded-lg cursor-pointer">
                  ОТПРАВИТЬ СООБЩЕНИЕ
                </button>
              </div>
            </div>

            <div className="space-y-6 animate-on-scroll">
              {[
                { icon: "Mail", color: "#00F5FF", bg: "#00F5FF15", border: "#00F5FF30", title: "Email", value: "hello@levelup.games", sub: "Отвечаем в течение 24 часов" },
                { icon: "MessageCircle", color: "#BF00FF", bg: "#BF00FF15", border: "#BF00FF30", title: "Telegram", value: "@levelup_games", sub: "Сообщество разработчиков" },
                { icon: "MapPin", color: "#FF006E", bg: "#FF006E15", border: "#FF006E30", title: "Офис", value: "Москва, ул. Арбат, 1", sub: "Пн–Пт: 10:00–19:00" },
              ].map((c) => (
                <div key={c.title} className="card-game rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                      <Icon name={c.icon as "Mail"} size={22} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="font-russo text-white text-sm mb-1">{c.title}</p>
                      <p className="text-muted-foreground font-rubik text-sm">{c.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card-game rounded-2xl p-6" style={{ borderColor: "#FFE60030" }}>
                <p className="font-russo text-sm mb-2" style={{ color: "#FFE600" }}>🎮 Хочешь запустить проект?</p>
                <p className="text-muted-foreground font-rubik text-sm">
                  Напиши нам — поможем с настройкой кампании и уровнями вознаграждений
                </p>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="animate-on-scroll">
            <div className="card-game rounded-2xl overflow-hidden" style={{ border: "1px solid #1E1E3F" }}>
              <div className="px-6 py-4 border-b border-[#1E1E3F] flex items-center gap-3">
                <Icon name="MapPin" size={18} className="text-[#FF006E]" />
                <span className="font-russo text-white text-sm">Москва, ул. Арбат, 1</span>
                <span className="text-xs text-muted-foreground font-rubik ml-auto">Пн–Пт: 10:00–19:00</span>
              </div>
              <div className="relative h-72 overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.595714%2C55.752023&z=15&pt=37.595714,55.752023,pm2rdm&lang=ru_RU"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Карта офиса"
                  className="w-full h-full"
                  style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-[#1E1E3F] bg-[#06060F]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#BF00FF] flex items-center justify-center text-[#0A0A14] font-russo text-xs font-bold">
              LV
            </div>
            <span className="font-russo text-white">LEVEL<span className="neon-text-cyan">UP</span></span>
          </div>
          <p className="text-xs text-muted-foreground font-rubik">
            © 2024 LEVELUP. Краудфандинг для создателей игр.
          </p>
          <div className="flex gap-6">
            {["Условия", "Конфиденциальность", "Помощь"].map((link) => (
              <button key={link} className="text-xs text-muted-foreground hover:text-[#00F5FF] transition-colors font-rubik">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}