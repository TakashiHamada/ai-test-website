// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTAボタンのクリックイベント
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// フォーム送信イベント
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // フォームデータの取得
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // 簡単なバリデーション
        if (name && email && message) {
            alert('お問い合わせありがとうございます！\n送信内容を受け付けました。');
            contactForm.reset();
        } else {
            alert('すべての項目を入力してください。');
        }
    });
}

// スクロール時のナビゲーションバーの背景変更
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    lastScrollTop = scrollTop;
});

// ページ読み込み時のアニメーション
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// フィーチャーカードの順次アニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// アナログ時計の機能
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 時針、分針、秒針の角度を計算
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

    // 針の要素を取得
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    // 針の角度を設定
    if (hourHand) {
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }
    if (minuteHand) {
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    }
    if (secondHand) {
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    }

    // デジタル時計の更新
    const digitalTime = document.getElementById('digital-time');
    if (digitalTime) {
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        digitalTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}

// 時計を初期化して1秒ごとに更新
function initClock() {
    updateClock(); // 初回実行
    setInterval(updateClock, 1000); // 1秒ごとに更新
}

// ページ読み込み時に時計を開始
if (document.getElementById('hour-hand')) {
    initClock();
    console.log('⏰ Analog clock initialized!');
}

console.log('GitHub Pages template loaded successfully! 🚀');
