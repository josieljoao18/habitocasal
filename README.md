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
        import { getDatabase, ref, set, get, update, remove, onValue, push, query, orderByChild } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";
        
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
        window.firebaseOnValue = onValue;
        window.firebasePush = push;
        window.firebaseQuery = query;
        window.firebaseOrderByChild = orderByChild;
    </script>
    
    <!-- React -->
    <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
    
    <!-- Babel -->
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    
    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            background: #0a0a0f;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            transition: all 0.3s ease;
        }
        
        body.light-mode {
            background: #f0f2f5;
        }
        
        body.light-mode .bg-card {
            background: #ffffff !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        
        body.light-mode .text-primary {
            color: #1a1a2e !important;
        }
        
        body.light-mode .text-secondary {
            color: #6b6b7a !important;
        }
        
        body.light-mode .border-primary {
            border-color: #e4e6eb !important;
        }
        
        body.light-mode .tab-inactive {
            background: #e8e8f0 !important;
            color: #6b6b7a !important;
        }
        
        body.light-mode .check-button-pending {
            background: #f0f2f5 !important;
            border-color: #d0d0d8 !important;
            color: #a0a0a8 !important;
        }
        
        body.light-mode .bottom-nav {
            background: rgba(255, 255, 255, 0.98) !important;
            border-top-color: #e4e6eb !important;
        }
        
        body.light-mode .glass-effect {
            background: rgba(255, 255, 255, 0.95) !important;
        }
        
        body.light-mode .bg-dark-bg {
            background: #f0f2f5 !important;
        }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #2d2d44; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #3d3d55; }
        body.light-mode ::-webkit-scrollbar-track { background: #e4e6eb; }
        body.light-mode ::-webkit-scrollbar-thumb { background: #c0c0c8; }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out; }
        .animate-pulse-fast { animation: pulse 0.5s ease-in-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        
        .tab-active {
            background: linear-gradient(135deg, #10b981, #059669);
            box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
        }
        
        .tab-inactive { background: #2d2d44; transition: all 0.3s ease; }
        .tab-inactive:hover { background: #3d3d55; transform: translateY(-2px); }
        
        .check-button {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
            border: none;
            flex-shrink: 0;
        }
        
        .check-button-completed {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
            animation: pulse 0.3s ease-in-out;
        }
        
        .check-button-pending {
            background: #2d2d44;
            color: #6b6b7a;
            border: 2px solid #3d3d55;
        }
        
        .check-button-pending:hover {
            background: #3d3d55;
            color: #a1a1aa;
            transform: scale(1.1);
        }
        
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(15, 15, 25, 0.98);
            backdrop-filter: blur(20px);
            border-top: 1px solid #2d2d44;
            padding: 10px 24px;
            z-index: 50;
        }
        
        .bottom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px 20px;
            border-radius: 20px;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
        }
        
        .bottom-nav-active {
            background: rgba(16, 185, 129, 0.15);
            color: #10b981;
            transform: translateY(-5px);
        }
        
        .bottom-nav-inactive { color: #6b6b7a; }
        .bottom-nav-inactive:hover { background: rgba(45, 45, 68, 0.8); color: #e0e0e8; transform: translateY(-3px); }
        
        .week-calendar {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 6px 0;
            scrollbar-width: thin;
            scroll-behavior: smooth;
        }
        
        .week-calendar::-webkit-scrollbar { height: 4px; }
        
        .week-day {
            flex-shrink: 0;
            width: 60px;
            text-align: center;
            padding: 10px 6px;
            border-radius: 20px;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
        }
        
        .week-day:hover {
            background: rgba(16, 185, 129, 0.15);
            transform: translateY(-3px);
        }
        
        .week-day-selected {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
            transform: scale(1.05);
        }
        
        .week-day-completed { position: relative; }
        .week-day-completed::after {
            content: '✓';
            position: absolute;
            top: 4px;
            right: 8px;
            font-size: 10px;
            color: #10b981;
            font-weight: bold;
        }
        .week-day-selected.week-day-completed::after { color: white; }
        
        .couple-name-highlight {
            background: linear-gradient(135deg, #10b981, #34d399, #059669);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .avatar-container {
            position: relative;
            cursor: pointer;
        }
        
        .avatar-overlay {
            position: absolute;
            bottom: -3px;
            right: -3px;
            background: #10b981;
            border-radius: 50%;
            padding: 4px;
            font-size: 10px;
            transition: transform 0.3s ease;
        }
        
        .avatar-container:hover .avatar-overlay { transform: scale(1.1); }
        
        .switch {
            position: relative;
            display: inline-block;
            width: 56px;
            height: 30px;
        }
        
        .switch input { opacity: 0; width: 0; height: 0; }
        
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
            height: 26px;
            width: 26px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
            font-size: 14px;
        }
        
        input:checked + .slider { background-color: #10b981; }
        input:checked + .slider:before {
            transform: translateX(26px);
            content: "☀️";
        }
        
        .text-primary { color: #e8e8f0; }
        .text-secondary { color: #9ca3af; }
        .bg-card { background: rgba(20, 20, 35, 0.8); backdrop-filter: blur(10px); }
        .border-primary { border-color: #2d2d44; }
        .glass-effect { background: rgba(20, 20, 35, 0.9); backdrop-filter: blur(20px); }
        
        .context-menu {
            position: fixed;
            background: #1a1a2e;
            border: 1px solid #2d2d44;
            border-radius: 16px;
            padding: 8px;
            z-index: 100;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            min-width: 160px;
            animation: fadeInUp 0.2s ease-out;
        }
        
        .context-menu-item {
            padding: 10px 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
        }
        
        .context-menu-item:hover { background: #2d2d44; transform: translateX(5px); }
        .context-menu-item.delete { color: #ef4444; }
        .context-menu-item.delete:hover { background: rgba(239, 68, 68, 0.15); }
        
        .stat-card {
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
        }
        .stat-card:hover { transform: translateY(-5px) scale(1.02); }
        
        .period-button {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .period-button-active {
            background: #10b981;
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }
        .period-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        .period-button:active::before {
            width: 300px;
            height: 300px;
        }
        
        .toast-notification {
            position: fixed;
            bottom: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: fadeInUp 0.3s ease-out;
            font-weight: 500;
            font-size: 14px;
            white-space: nowrap;
        }
        
        @media (max-width: 640px) {
            .week-day { width: 50px; padding: 8px 4px; }
            .week-day .text-lg { font-size: 14px; }
            .check-button { width: 42px; height: 42px; font-size: 18px; }
            .bottom-nav-item { padding: 6px 14px; }
            .text-2xl { font-size: 20px; }
            .toast-notification { font-size: 12px; padding: 10px 20px; bottom: 80px; }
        }
        
        /* Loading spinner */
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #2d2d44;
            border-top: 3px solid #10b981;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        /* Confetti animation */
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            background: #10b981;
            position: absolute;
            animation: confetti-fall 2s ease-out forwards;
            z-index: 1000;
        }
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        // ===== UTILITÁRIOS =====
        const getToday = () => new Date().toISOString().split('T')[0];
        const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formatDayName = (date) => date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        
        const showToast = (message, type = 'success') => {
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.style.background = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        };
        
        const showConfetti = () => {
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
                confetti.style.width = Math.random() * 8 + 4 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 2000);
            }
        };
        
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
            const progress = (total % 30) * 3.33;
            return { level, nextLevel, progress };
        };
        
        // ===== HÁBITOS DO CASAL =====
        const coupleHabits = [
            { title: 'Elogiar o parceiro', description: 'Diga algo positivo', icon: '❤️', tag: 'amor', category: 'amor', frequency: { type: 'daily' }, points: 10 },
            { title: 'Conversar sem celular', description: 'Momento sem distrações', icon: '💬', tag: 'comunicação', category: 'comunicação', frequency: { type: 'daily' }, points: 15 },
            { title: 'Gratidão diária', description: 'Agradecer a Deus', icon: '🙏', tag: 'espiritual', category: 'espiritual', frequency: { type: 'daily' }, points: 10 },
            { title: 'Mensagem carinhosa', description: 'Enviar mensagem', icon: '💌', tag: 'amor', category: 'amor', frequency: { type: 'daily' }, points: 10 },
            { title: 'Tempo de qualidade', description: 'Dedicar tempo ao casal', icon: '💑', tag: 'relacionamento', category: 'relacionamento', frequency: { type: 'daily' }, points: 20 },
            { title: 'Oração juntos', description: 'Orar em casal', icon: '✝️', tag: 'espiritual', category: 'espiritual', frequency: { type: 'daily' }, points: 15 },
            { title: 'Ler a Bíblia', description: 'Devocional diário'