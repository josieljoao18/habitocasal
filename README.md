<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#10b981">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="HabitFlow">
    <meta name="description" content="Acompanhe seus hábitos e cresça junto com seu parceiro">
    
    <title>HabitFlow Casal Cristão - Hábitos para dois</title>
    
    <!-- TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Firebase SDKs -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
        import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";
        
        const firebaseConfig = {
            apiKey: "AIzaSyAFz57Ku9PqgZzLe9DF1CFKDGz740TvwjA",
            authDomain: "habitflow-casal-57723.firebaseapp.com",
            databaseURL: "https://habitflow-casal-57723-default-rtdb.firebaseio.com",
            projectId: "habitflow-casal-57723",
            storageBucket: "habitflow-casal-57723.firebasestorage.app",
            messagingSenderId: "205690500990",
            appId: "1:205690500990:web:4afcaeef3e297dc351a52f"
        };
        
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const database = getDatabase(app);
        
        window.firebaseAuth = auth;
        window.firebaseDatabase = database;
        window.firebaseSignIn = signInWithEmailAndPassword;
        window.firebaseCreateUser = createUserWithEmailAndPassword;
        window.firebaseSignOut = signOut;
        window.firebaseOnAuthStateChanged = onAuthStateChanged;
        window.firebaseRef = ref;
        window.firebaseSet = set;
        window.firebaseGet = get;
        window.firebaseUpdate = update;
        window.firebaseRemove = remove;
    </script>
    
    <!-- React -->
    <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
    
    <!-- Babel -->
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            background: #0a0a0f;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            transition: all 0.3s ease;
        }
        
        body.light-mode {
            background: #f5f5f5;
        }
        
        body.light-mode .bg-card {
            background: #ffffff !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        body.light-mode .text-primary {
            color: #1a1a2e !important;
        }
        
        body.light-mode .text-secondary {
            color: #6b6b7a !important;
        }
        
        body.light-mode .border-primary {
            border-color: #e0e0e8 !important;
        }
        
        body.light-mode .tab-inactive {
            background: #e8e8f0 !important;
            color: #6b6b7a !important;
        }
        
        body.light-mode .check-button-pending {
            background: #e8e8f0 !important;
            border-color: #d0d0d8 !important;
        }
        
        body.light-mode .bottom-nav {
            background: rgba(255, 255, 255, 0.98) !important;
            border-top-color: #e0e0e8 !important;
        }
        
        body.light-mode .glass-effect {
            background: rgba(255, 255, 255, 0.95) !important;
        }
        
        body.light-mode .bg-dark-bg {
            background: #f5f5f5 !important;
        }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; }
        ::-webkit-scrollbar-thumb { background: #2d2d44; border-radius: 9999px; }
        body.light-mode ::-webkit-scrollbar-track { background: #e0e0e8; }
        body.light-mode ::-webkit-scrollbar-thumb { background: #c0c0c8; }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        
        .tab-active {
            background: linear-gradient(135deg, #10b981, #059669);
            box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
        }
        
        .tab-inactive { background: #2d2d44; }
        
        .check-button {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            flex-shrink: 0;
        }
        
        .check-button-completed {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }
        
        .check-button-pending {
            background: #2d2d44;
            color: #6b6b7a;
            border: 2px solid #3d3d55;
        }
        
        .check-button-pending:hover {
            background: #3d3d55;
            color: #a1a1aa;
            transform: scale(1.05);
        }
        
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(15, 15, 25, 0.98);
            backdrop-filter: blur(10px);
            border-top: 1px solid #2d2d44;
            padding: 12px 24px;
            z-index: 50;
        }
        
        .bottom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px 16px;
            border-radius: 16px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .bottom-nav-active {
            background: rgba(16, 185, 129, 0.15);
            color: #10b981;
        }
        
        .bottom-nav-inactive {
            color: #6b6b7a;
        }
        
        .bottom-nav-inactive:hover {
            background: rgba(45, 45, 68, 0.8);
            color: #e0e0e8;
        }
        
        .week-calendar {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding: 4px 0;
            scrollbar-width: thin;
        }
        
        .week-calendar::-webkit-scrollbar { height: 4px; }
        
        .week-day {
            flex-shrink: 0;
            width: 55px;
            text-align: center;
            padding: 8px 4px;
            border-radius: 16px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        
        .week-day:hover {
            background: rgba(16, 185, 129, 0.15);
            transform: translateY(-2px);
        }
        
        .week-day-selected {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
        }
        
        .week-day-completed { position: relative; }
        .week-day-completed::after {
            content: '✓';
            position: absolute;
            top: 2px;
            right: 6px;
            font-size: 10px;
            color: #10b981;
            font-weight: bold;
        }
        .week-day-selected.week-day-completed::after { color: white; }
        
        .couple-name-highlight {
            background: linear-gradient(135deg, #10b981, #34d399);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
        
        .avatar-container {
            position: relative;
            cursor: pointer;
        }
        
        .avatar-overlay {
            position: absolute;
            bottom: -5px;
            right: -5px;
            background: #10b981;
            border-radius: 50%;
            padding: 4px;
            font-size: 10px;
        }
        
        .switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 28px;
        }
        
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #3d3d55;
            transition: 0.3s;
            border-radius: 34px;
        }
        
        .slider:before {
            position: absolute;
            content: "🌙";
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            width: 24px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
            font-size: 12px;
        }
        
        input:checked + .slider {
            background-color: #10b981;
        }
        
        input:checked + .slider:before {
            transform: translateX(24px);
            content: "☀️";
        }
        
        .text-primary { color: #e8e8f0; }
        .text-secondary { color: #9ca3af; }
        .bg-card { background: rgba(20, 20, 35, 0.8); backdrop-filter: blur(10px); }
        .border-primary { border-color: #2d2d44; }
        .glass-effect { background: rgba(20, 20, 35, 0.8); backdrop-filter: blur(10px); }
        
        .context-menu {
            position: fixed;
            background: #1a1a2e;
            border: 1px solid #2d2d44;
            border-radius: 12px;
            padding: 8px;
            z-index: 100;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            min-width: 150px;
        }
        
        .context-menu-item {
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
        }
        
        .context-menu-item:hover { background: #2d2d44; }
        .context-menu-item.delete { color: #ef4444; }
        .context-menu-item.delete:hover { background: rgba(239, 68, 68, 0.1); }
        
        .stat-card {
            transition: all 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-3px);
        }
        
        .period-button {
            transition: all 0.2s ease;
        }
        .period-button-active {
            background: #10b981;
            color: white;
        }
        
        @media (max-width: 640px) {
            .week-day { width: 45px; padding: 6px 2px; }
            .week-day .text-lg { font-size: 16px; }
            .check-button { width: 40px; height: 40px; font-size: 20px; }
            .bottom-nav-item { padding: 6px 12px; }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <div id="installPWA" style="display: none; position: fixed; bottom: 80px; right: 20px; z-index: 100;">
        <button id="installBtn" class="text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2" style="background: linear-gradient(135deg, #10b981, #059669);">
            📱 Instalar App
        </button>
    </div>
    
    <script type="text/babel">
        // ===== PWA INSTALLATION =====
        let deferredPrompt;
        const installDiv = document.getElementById('installPWA');
        const installBtn = document.getElementById('installBtn');
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installDiv.style.display = 'block';
            installBtn.onclick = async () => {
                installDiv.style.display = 'none';
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') console.log('App instalado!');
                deferredPrompt = null;
            };
        });
        
        // ===== UTILITÁRIOS =====
        const getToday = () => new Date().toISOString().split('T')[0];
        const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const formatDayName = (date) => date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        
        const getWeekDays = () => {
            const today = new Date();
            const days = [];
            for (let i = 3; i >= 0; i--) { const d = new Date(); d.setDate(today.getDate() - i); days.push(d); }
            for (let i = 1; i <= 3; i++) { const d = new Date(); d.setDate(today.getDate() + i); days.push(d); }
            return days.sort((a,b) => a - b);
        };
        
        const getDateRange = (period) => {
            const today = new Date();
            const dates = [];
            const days = period === 'week' ? 7 : 30;
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                dates.push(date.toISOString().split('T')[0]);
            }
            return dates;
        };
        
        const calculateStreak = (dates) => {
            if (!dates || dates.length === 0) return 0;
            const sorted = [...dates].sort().reverse();
            let streak = 1;
            let current = new Date(sorted[0]);
            for (let i = 1; i < sorted.length; i++) {
                const prev = new Date(sorted[i]);
                const diff = Math.floor((current - prev) / (1000 * 60 * 60 * 24));
                if (diff === 1) { streak++; current = prev; }
                else break;
            }
            return streak;
        };
        
        const calculateLevel = (total) => {
            const level = Math.floor(total / 30) + 1;
            const nextLevel = (level * 30) - total;
            return { level, nextLevel };
        };
        
        // ===== HÁBITOS DO CASAL CRISTÃO =====
        const coupleHabits = [
            { title: 'Elogiar o parceiro', description: 'Diga algo positivo', icon: '❤️', tag: 'amor', frequency: { type: 'daily' } },
            { title: 'Conversar sem celular', description: 'Momento sem distrações', icon: '💬', tag: 'comunicação', frequency: { type: 'daily' } },
            { title: 'Gratidão diária', description: 'Agradecer a Deus', icon: '🙏', tag: 'espiritual', frequency: { type: 'daily' } },
            { title: 'Mensagem carinhosa', description: 'Enviar mensagem', icon: '💌', tag: 'amor', frequency: { type: 'daily' } },
            { title: 'Tempo de qualidade', description: 'Dedicar tempo ao casal', icon: '💑', tag: 'relacionamento', frequency: { type: 'daily' } },
            { title: 'Check-in emocional', description: 'Como você está?', icon: '🧠', tag: 'comunicação', frequency: { type: 'daily' } },
            { title: 'Oração juntos', description: 'Orar em casal', icon: '✝️', tag: 'espiritual', frequency: { type: 'daily' } },
            { title: 'Ler a Bíblia', description: 'Devocional diário', icon: '📖', tag: 'espiritual', frequency: { type: 'daily' } },
            { title: 'Exercício físico', description: 'Praticar atividade', icon: '🏃', tag: 'saúde', frequency: { type: 'daily' } },
            { title: 'Dormir bem', description: '7-8 horas de sono', icon: '😴', tag: 'saúde', frequency: { type: 'daily' } },
            { title: 'Fazer refeições juntos', description: 'Compartilhar momentos', icon: '🍽️', tag: 'relacionamento', frequency: { type: 'daily' } },
            { title: 'Planejamento financeiro', description: 'Organizar finanças', icon: '💰', tag: 'finanças', frequency: { type: 'weekly', day: 1 } },
            { title: 'Definir metas', description: 'Traçar objetivos', icon: '🎯', tag: 'crescimento', frequency: { type: 'weekly', day: 0 } },
            { title: 'Caminhada juntos', description: 'Caminhar ao ar livre', icon: '🚶', tag: 'saúde', frequency: { type: 'custom', interval: 2 } },
            { title: 'Tempo offline', description: 'Desconectar das telas', icon: '📵', tag: 'desconexão', frequency: { type: 'custom', interval: 3 } },
            { title: 'Resolver conflitos', description: 'Não deixar para depois', icon: '🤝', tag: 'comunicação', frequency: { type: 'daily' } },
            { title: 'Carinho físico', description: 'Abraços e beijos', icon: '💖', tag: 'amor', frequency: { type: 'daily' } },
            { title: 'Celebrar conquistas', description: 'Comemorar vitórias', icon: '🎉', tag: 'celebração', frequency: { type: 'weekly', day: 5 } }
        ];
        
        const allEmojis = ['❤️', '💬', '🙏', '💌', '💑', '🧠', '✝️', '📖', '🏃', '😴', '🍽️', '💰', '🎯', '🚶', '📵', '🤝', '💖', '🎉', '💪', '🧘', '🥗', '😌', '🎨', '📝', '⭐', '✨', '🌟'];
        
        // ===== COMPONENTES =====
        const WeekCalendar = ({ selectedDate, onDateSelect, habits }) => {
            const weekDays = getWeekDays();
            const today = new Date();
            const isDateCompleted = (date) => {
                const dateStr = date.toISOString().split('T')[0];
                return habits.some(h => h.completedDates?.includes(dateStr));
            };
            return (
                <div className="bg-card border border-primary rounded-2xl p-3">
                    <div className="week-calendar">
                        {weekDays.map((day, idx) => {
                            const isSelected = selectedDate && day.toDateString() === new Date(selectedDate).toDateString();
                            const isToday = day.toDateString() === today.toDateString();
                            return (
                                <div key={idx} onClick={() => onDateSelect(day)} className={`week-day ${isSelected ? 'week-day-selected' : ''} ${isDateCompleted(day) ? 'week-day-completed' : ''}`}>
                                    <div className="text-xs font-medium">{formatDayName(day)}</div>
                                    <div className={`text-lg font-bold ${isToday && !isSelected ? 'text-green-400' : 'text-primary'}`}>{day.getDate()}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        };
        
        // ===== GRÁFICO DE RADAR =====
        const RadarChart = ({ habits, period }) => {
            const chartRef = React.useRef(null);
            const chartInstance = React.useRef(null);
            
            React.useEffect(() => {
                if (chartRef.current) {
                    if (chartInstance.current) chartInstance.current.destroy();
                    const dateRange = getDateRange(period);
                    const categories = ['Amor', 'Comunicação', 'Espiritual', 'Saúde', 'Relacionamento'];
                    const categoryData = categories.map(cat => {
                        const catHabits = habits.filter(h => {
                            if (cat === 'Amor') return h.tag === 'amor';
                            if (cat === 'Comunicação') return h.tag === 'comunicação';
                            if (cat === 'Espiritual') return h.tag === 'espiritual';
                            if (cat === 'Saúde') return h.tag === 'saúde';
                            if (cat === 'Relacionamento') return h.tag === 'relacionamento';
                            return false;
                        });
                        let total = 0;
                        catHabits.forEach(h => {
                            total += h.completedDates?.filter(d => dateRange.includes(d)).length || 0;
                        });
                        const maxPossible = catHabits.length * dateRange.length;
                        return maxPossible > 0 ? (total / maxPossible) * 100 : 0;
                    });
                    chartInstance.current = new Chart(chartRef.current, {
                        type: 'radar',
                        data: { labels: categories, datasets: [{ label: 'Taxa (%)', data: categoryData, backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981', borderWidth: 2, pointBackgroundColor: '#10b981' }] },
                        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af' } } }, scales: { r: { beginAtZero: true, max: 100, ticks: { color: '#9ca3af', stepSize: 20 }, grid: { color: '#2d2d44' }, pointLabels: { color: '#e8e8f0' } } } }
                    });
                }
                return () => { if (chartInstance.current) chartInstance.current.destroy(); };
            }, [habits, period]);
            
            return (
                <div className="bg-card border border-primary rounded-2xl p-4">
                    <h3 className="text-sm font-semibold text-primary mb-3">📡 Radar por Categoria</h3>
                    <div style={{ height: '250px' }}><canvas ref={chartRef}></canvas></div>
                </div>
            );
        };
        
        // ===== GRÁFICO MENSAL =====
        const MonthlyChart = ({ habits }) => {
            const chartRef = React.useRef(null);
            const chartInstance = React.useRef(null);
            
            React.useEffect(() => {
                if (chartRef.current) {
                    if (chartInstance.current) chartInstance.current.destroy();
                    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                    const currentMonth = new Date().getMonth();
                    const last6Months = [];
                    for (let i = 5; i >= 0; i--) last6Months.push(months[(currentMonth - i + 12) % 12]);
                    const monthlyData = last6Months.map((_, idx) => {
                        const monthNum = (currentMonth - (5 - idx) + 12) % 12;
                        let total = 0;
                        habits.forEach(h => {
                            total += h.completedDates?.filter(d => new Date(d).getMonth() === monthNum).length || 0;
                        });
                        return habits.length > 0 ? total / habits.length : 0;
                    });
                    chartInstance.current = new Chart(chartRef.current, {
                        type: 'bar',
                        data: { labels: last6Months, datasets: [{ label: 'Média de Conclusões', data: monthlyData, backgroundColor: 'rgba(16, 185, 129, 0.7)', borderRadius: 8 }] },
                        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af' } } }, scales: { y: { beginAtZero: true, ticks: { color: '#9ca3af' }, grid: { color: '#2d2d44' } }, x: { ticks: { color: '#9ca3af' }, grid: { color: '#2d2d44' } } } }
                    });
                }
                return () => { if (chartInstance.current) chartInstance.current.destroy(); };
            }, [habits]);
            
            return (
                <div className="bg-card border border-primary rounded-2xl p-4">
                    <h3 className="text-sm font-semibold text-primary mb-3">📅 Média de Conclusões por Mês</h3>
                    <div style={{ height: '220px' }}><canvas ref={chartRef}></canvas></div>
                </div>
            );
        };
        
        // ===== COMPONENTE HABIT CARD =====
        const HabitCard = ({ habit, onToggle, onEdit, onDelete, selectedDate }) => {
            const dateToCheck = selectedDate ? selectedDate.toISOString().split('T')[0] : getToday();
            const completed = habit.completedDates?.includes(dateToCheck) || false;
            const [showMenu, setShowMenu] = React.useState(false);
            const [menuPos, setMenuPos] = React.useState({ x: 0, y: 0 });
            
            const getFreqText = () => {
                if (!habit.frequency) return '📅 Todo dia';
                if (habit.frequency.type === 'daily') return '📅 Todo dia';
                if (habit.frequency.type === 'weekly') return `📆 ${['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'][habit.frequency.day]}`;
                return `🔄 A cada ${habit.frequency.interval} dias`;
            };
            
            return (
                <>
                    <div className="bg-card border border-primary rounded-2xl p-3 hover:border-green-500/30 transition-all">
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{habit.icon}</span>
                                    <div>
                                        <h3 className="text-primary font-semibold text-sm">{habit.title}</h3>
                                        <p className="text-secondary text-xs">{getFreqText()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-orange-400">🔥 {habit.streak || 0}</span>
                                    <span className="text-secondary text-xs">✅ {habit.completedDates?.length || 0}</span>
                                    <span className="text-xs text-green-400">{habit.tag}</span>
                                </div>
                                {habit.description && <p className="text-secondary text-xs mt-1">{habit.description}</p>}
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <button onClick={(e) => { e.stopPropagation(); setMenuPos({ x: e.clientX, y: e.clientY }); setShowMenu(true); }} className="text-secondary text-xl">⋮</button>
                                <button onClick={() => onToggle(habit.id, dateToCheck)} className={`check-button ${completed ? 'check-button-completed' : 'check-button-pending'}`} style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                                    {completed ? '✓' : '○'}
                                </button>
                            </div>
                        </div>
                    </div>
                    {showMenu && (
                        <div className="context-menu" style={{ top: menuPos.y - 60, left: menuPos.x - 120 }}>
                            <div className="context-menu-item" onClick={() => { onEdit(habit); setShowMenu(false); }}>✏️ Editar Hábito</div>
                            <div className="context-menu-item delete" onClick={() => { if (confirm(`Deletar "${habit.title}"?`)) onDelete(habit.id); setShowMenu(false); }}>🗑️ Deletar Hábito</div>
                        </div>
                    )}
                </>
            );
        };
        
        // ===== TELA DE LOGIN =====
        const LoginScreen = ({ onLogin }) => {
            const [email, setEmail] = React.useState('');
            const [password, setPassword] = React.useState('');
            const [isRegister, setIsRegister] = React.useState(false);
            const [loading, setLoading] = React.useState(false);
            const [error, setError] = React.useState('');
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setError('');
                try {
                    if (isRegister) await window.firebaseCreateUser(window.firebaseAuth, email, password);
                    else await window.firebaseSignIn(window.firebaseAuth, email, password);
                    onLogin();
                } catch (err) { setError(err.message); }
                setLoading(false);
            };
            
            return (
                <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#0f0f1a] flex items-center justify-center p-4">
                    <div className="glass-effect rounded-3xl p-8 max-w-md w-full border border-primary animate-fade-in">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-3">💑</div>
                            <h1 className="text-3xl font-bold couple-name-highlight">HabitFlow</h1>
                            <p className="text-secondary text-sm mt-2">Casal Cristão</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-[#2d2d44] text-primary placeholder:text-secondary focus:outline-none focus:border-green-500" required />
                            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-xl bg-[#2d2d44] text-primary placeholder:text-secondary focus:outline-none focus:border-green-500" required />
                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold">{loading ? 'Carregando...' : (isRegister ? 'Criar Conta' : 'Entrar')}</button>
                            <p className="text-center text-secondary text-sm">{isRegister ? 'Já tem conta?' : 'Não tem conta?'}{' '}<button type="button" onClick={() => setIsRegister(!isRegister)} className="text-green-400">{isRegister ? 'Fazer login' : 'Cadastre-se'}</button></p>
                        </form>
                    </div>
                </div>
            );
        };
        
        // ===== VISÃO DE ESTATÍSTICAS =====
        const StatisticsView = ({ habits, personName }) => {
            const [period, setPeriod] = React.useState('week');
            const totalCompletions = habits.reduce((acc, h) => acc + (h.completedDates?.length || 0), 0);
            const totalStreak = habits.reduce((acc, h) => acc + (h.streak || 0), 0);
            const bestHabit = habits.reduce((best, h) => (h.streak > (best?.streak || 0) ? h : best), null);
            const level = calculateLevel(totalCompletions);
            const dateRange = getDateRange(period);
            let periodCompletions = 0;
            habits.forEach(h => { periodCompletions += h.completedDates?.filter(d => dateRange.includes(d)).length || 0; });
            const avgPerDay = dateRange.length > 0 ? (periodCompletions / dateRange.length).toFixed(1) : 0;
            
            const tagStats = {};
            habits.forEach(h => { tagStats[h.tag] = (tagStats[h.tag] || 0) + (h.completedDates?.length || 0); });
            
            return (
                <div className="space-y-4 pb-20">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-card border border-primary rounded-2xl p-3 stat-card"><p className="text-secondary text-xs">Total de Hábitos</p><p className="text-2xl font-bold text-primary">{totalCompletions}</p><p className="text-secondary text-xs">concluídos</p></div>
                        <div className="bg-card border border-primary rounded-2xl p-3 stat-card"><p className="text-secondary text-xs">Streak Total</p><p className="text-2xl font-bold text-primary">{totalStreak}</p><p className="text-secondary text-xs">dias acumulados