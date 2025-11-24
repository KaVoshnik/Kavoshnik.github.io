// Performance optimization - debounce
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.style.animation = 'pulse 0.3s ease';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });
}

// Close menu when link is clicked
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Commands data
const commands = [
    { name: 'help', description: 'список команд', category: 'System' },
    { name: 'clear', description: 'очистка экрана', category: 'System' },
    { name: 'uptime', description: 'аптайм в секундах', category: 'System' },
    { name: 'mem', description: 'статистика кучи', category: 'System' },
    { name: 'testmem', description: 'проверка аллокатора', category: 'System' },
    { name: 'history', description: 'список последних команд', category: 'System' },
    { name: 'echo TEXT', description: 'вывод строки', category: 'Utilities' },
    { name: 'pwd', description: 'показать текущий каталог', category: 'Filesystem' },
    { name: 'ls [PATH]', description: 'перечислить каталог (. по умолчанию)', category: 'Filesystem' },
    { name: 'cd PATH', description: 'перейти в каталог (/ по умолчанию)', category: 'Filesystem' },
    { name: 'touch PATH', description: 'создать/обнулить файл', category: 'Filesystem' },
    { name: 'cat PATH', description: 'вывести файл на экран', category: 'Filesystem' },
    { name: 'write PATH DATA', description: 'перезаписать файл строкой DATA', category: 'Filesystem' },
    { name: 'append PATH DATA', description: 'дописать строку DATA в конец файла', category: 'Filesystem' },
    { name: 'mkdir PATH', description: 'создать каталог', category: 'Filesystem' },
    { name: 'rm [-r] PATH', description: 'удалить файл или каталог (-r рекурсивно)', category: 'Filesystem' },
    { name: 'savefs', description: 'сохранить RAM-ФС на диск', category: 'Utilities' },
    { name: 'loadfs', description: 'перезагрузить снимок ФС с диска', category: 'Utilities' },
    { name: 'diskinfo', description: 'информация о подключённом диске', category: 'Utilities' },
    { name: 'poweroff', description: 'завершить работу виртуальной машины', category: 'Utilities' },
    { name: 'reboot', description: 'перезапустить виртуальную машину', category: 'Utilities' },
];

// Commands page functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', filterCommands);
    // Render initial commands
    renderCommands(commands);
}

function filterCommands() {
    const query = searchInput.value.toLowerCase();
    const filtered = commands.filter(cmd =>
        cmd.name.toLowerCase().includes(query) ||
        cmd.description.toLowerCase().includes(query)
    );

    renderCommands(filtered, query);
}

function renderCommands(filtered, searchQuery = '') {
    const container = document.getElementById('commandsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    if (!container) return;

    container.innerHTML = '';

    // Update results count
    if (searchQuery) {
        resultsCount.style.display = 'block';
        document.getElementById('resultCount').textContent = filtered.length;
    } else {
        resultsCount.style.display = 'none';
    }

    // Group by category
    const grouped = {};
    filtered.forEach(cmd => {
        if (!grouped[cmd.category]) {
            grouped[cmd.category] = [];
        }
        grouped[cmd.category].push(cmd);
    });

    // Render categories
    if (Object.keys(grouped).length === 0) {
        noResults.style.display = 'block';
        document.getElementById('noResultsText').textContent =
            `К сожалению, по вашему запросу "${searchQuery}" ничего не найдено.`;
        container.innerHTML = '';
        return;
    }

    noResults.style.display = 'none';

    Object.entries(grouped).forEach(([category, cmds]) => {
        const section = document.createElement('div');
        section.className = 'command-category-section';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `
            <h2>${category}</h2>
            <span class="category-count">${cmds.length}</span>
        `;

        const table = document.createElement('table');
        table.className = 'commands-table';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Команда</th>
                <th>Описание</th>
            </tr>
        `;

        const tbody = document.createElement('tbody');
        cmds.forEach((cmd, idx) => {
            const row = document.createElement('tr');
            row.style.backgroundColor = idx % 2 === 0 ? 'rgba(99, 102, 241, 0.02)' : 'transparent';
            row.innerHTML = `
                <td class="command-name">${cmd.name}</td>
                <td class="command-desc">${cmd.description}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        section.appendChild(header);
        section.appendChild(table);
        container.appendChild(section);
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Optimize scroll performance with throttle
let lastScrollTime = 0;
const handleScroll = debounce(() => {
    const now = Date.now();
    if (now - lastScrollTime < 100) return;
    lastScrollTime = now;

    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 300) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current || (current === '' && href.includes('#home'))) {
            link.classList.add('active');
        }
    });
}, 50);

window.addEventListener('scroll', handleScroll, { passive: true });

// Optimize images and performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.loading = 'lazy';
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Performance: prefetch next page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'commands.html';
        document.head.appendChild(link);
    });
}
