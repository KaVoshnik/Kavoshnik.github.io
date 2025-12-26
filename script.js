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
    { name: 'help', description: 'список команд', category: 'Система' },
    { name: 'clear', description: 'очистка экрана', category: 'Система' },
    { name: 'uptime', description: 'время работы системы', category: 'Система' },
    { name: 'mem', description: 'информация о памяти', category: 'Система' },
    { name: 'testmem', description: 'тест аллокатора памяти', category: 'Система' },
    { name: 'history', description: 'история команд', category: 'Система' },
    { name: 'poweroff', description: 'выключение системы', category: 'Система' },
    { name: 'reboot', description: 'перезагрузка системы', category: 'Система' },

    { name: 'pwd', description: 'текущая директория', category: 'Файловая система' },
    { name: 'ls [PATH]', description: 'список файлов', category: 'Файловая система' },
    { name: 'cd PATH', description: 'смена директории', category: 'Файловая система' },
    { name: 'touch PATH', description: 'создание файла', category: 'Файловая система' },
    { name: 'cat PATH', description: 'вывод файла', category: 'Файловая система' },
    { name: 'write PATH DATA', description: 'запись в файл', category: 'Файловая система' },
    { name: 'append PATH DATA', description: 'добавление в файл', category: 'Файловая система' },
    { name: 'mkdir PATH', description: 'создание директории', category: 'Файловая система' },
    { name: 'rm [-r] PATH', description: 'удаление', category: 'Файловая система' },
    { name: 'cp SRC DEST', description: 'копирование', category: 'Файловая система' },
    { name: 'mv SRC DEST', description: 'перемещение', category: 'Файловая система' },

    { name: 'find [PATH] PATTERN', description: 'поиск файлов', category: 'Поиск и анализ' },
    { name: 'grep PATTERN FILE', description: 'поиск в файле', category: 'Поиск и анализ' },
    { name: 'head [FILE] [LINES]', description: 'начало файла', category: 'Поиск и анализ' },
    { name: 'tail [FILE] [LINES]', description: 'конец файла', category: 'Поиск и анализ' },
    { name: 'wc FILE', description: 'подсчет строк/слов/символов', category: 'Поиск и анализ' },
    { name: 'hexdump FILE', description: 'hex-дамп файла', category: 'Поиск и анализ' },

    { name: 'echo TEXT', description: 'вывод строки', category: 'Утилиты' },
    { name: 'diskinfo', description: 'информация о диске', category: 'Утилиты' },
    { name: 'savefs', description: 'сохранение ФС на диск', category: 'Утилиты' },
    { name: 'loadfs', description: 'загрузка ФС с диска', category: 'Утилиты' },
    { name: 'ansi', description: 'тест ANSI последовательностей', category: 'Утилиты' },
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

function observeElements() {
    const fadeElems = document.querySelectorAll('.fade-in-section, .feature-card, .screenshot-card, .wiki-card, .cmd-category');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElems.forEach(elem => {
            observer.observe(elem);
        });
    } else {
        fadeElems.forEach(elem => {
            elem.classList.add('is-visible');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

window.addEventListener('load', () => {
    const terminalOutput = document.querySelector('.terminal-body .output');
    if (terminalOutput) {
        const originalText = terminalOutput.textContent;
        terminalOutput.style.opacity = '0';

        setTimeout(() => {
            terminalOutput.style.opacity = '1';
            terminalOutput.style.transition = 'opacity 0.3s';
            typeWriter(terminalOutput, originalText, 30);
        }, 1500);
    }

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Copy to clipboard for commands
const copyToClipboard = (text, button) => {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.background = 'rgba(34, 197, 94, 0.3)';
        button.style.borderColor = '#22c55e';
        button.style.color = '#22c55e';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
        }, 2000);
    }).catch(() => {
        button.textContent = '✗ Failed';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 1500);
    });
};

// Back to top functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

const badgeCmds = document.querySelectorAll('.badge-cmd');
badgeCmds.forEach(badge => {
    badge.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// News page functionality
function toggleNewsContent(button) {
    const card = button.closest('.news-card');
    const fullContent = card.querySelector('.news-full-content');
    const isExpanded = fullContent.style.display !== 'none';

    if (isExpanded) {
        fullContent.style.display = 'none';
        button.innerHTML = 'Читать полностью<span class="arrow-icon">→</span>';
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        fullContent.style.display = 'block';
        button.innerHTML = 'Свернуть<span class="arrow-icon">↑</span>';
    }
}
