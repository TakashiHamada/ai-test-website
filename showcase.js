// フィルター機能
const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // アクティブなボタンのスタイルを更新
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // カードのフィルタリング
        gameCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });

        // 統計の更新
        updateStats(filterValue);
    });
});

// 統計を更新する関数
function updateStats(filter) {
    const visibleCards = Array.from(gameCards).filter(card => {
        const category = card.getAttribute('data-category');
        return filter === 'all' || category === filter;
    });

    // ジャンル別のカウント
    const genres = {
        roguelike: 0,
        action: 0,
        adventure: 0,
        rpg: 0,
        puzzle: 0
    };

    visibleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (genres.hasOwnProperty(category)) {
            genres[category]++;
        }
    });

    console.log('Filtered stats:', genres);
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// スクロール時のナビゲーションバー効果
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// カードの遅延アニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

gameCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    cardObserver.observe(card);
});

// ページ読み込み時の処理
window.addEventListener('load', () => {
    console.log('🎮 Indie Games Showcase 2026 loaded!');
    console.log(`Total games: ${gameCards.length}`);

    // 初期統計の表示
    updateStats('all');
});

// ゲームカードのホバー効果強化
gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.game-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.game-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// アイコンのトランジション追加
document.querySelectorAll('.game-icon').forEach(icon => {
    icon.style.transition = 'transform 0.3s ease';
});

// キーボードショートカット（開発者向け）
document.addEventListener('keydown', (e) => {
    // Ctrl + F でフィルターボタンにフォーカス
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        filterButtons[0].focus();
    }
});

// ダイナミックなタイトル変更（タブがアクティブでない時）
let originalTitle = document.title;
let isTabActive = true;

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isTabActive = false;
        document.title = '🎮 戻ってきて！ - Indie Games Showcase';
    } else {
        isTabActive = true;
        document.title = originalTitle;
    }
});

// パフォーマンス測定
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Page loaded in ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        }, 0);
    });
}
