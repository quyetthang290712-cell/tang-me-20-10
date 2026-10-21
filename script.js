// NỘI DUNG BỨC THƯ GỬI MẸ (Bạn có thể sửa lại lời chúc theo ý mình tại đây)
const letterContent = `Mẹ yêu của con!

Nhân ngày Phụ nữ Việt Nam 20-10, con muốn gửi đến mẹ ngàn lời chúc tốt đẹp và ấm áp nhất. Có những điều ngày thường con hay ngại ngùng chưa nói, nhưng sâu trong lòng, con luôn biết ơn mọi sự vất vả, tần tảo mà mẹ đã dành cho gia đình mình.

Con chúc mẹ lúc nào cũng thật nhiều sức khỏe, luôn trẻ trung và giữ mãi nụ cười hiền hậu trên môi. Con yêu mẹ nhiều lắm! ❤️`;

// DANH SÁCH THÔNG ĐIỆP BẤT NGỜ TRONG BONG BÓNG BAY
const bubbleMessages = [
    "🌸 Mẹ cười lên nhé, mẹ cười đẹp lắm!",
    "💖 Con tự hào vì được làm con của mẹ!",
    "🌷 Hôm nay mẹ hãy nghỉ ngơi thật nhiều nha!",
    "✨ Chúc mẹ 20/10 ngập tràn niềm vui!",
    "🍀 Cảm ơn mẹ vì những bữa cơm tuyệt vời!",
    "❤️ Mẹ luôn là người phụ nữ tuyệt vời nhất!"
];

const startBtn = document.getElementById('start-btn');
const introOverlay = document.getElementById('intro-overlay');
const mainContent = document.getElementById('main-content');
const typewriterElement = document.getElementById('typewriter-text');
const toastElement = document.getElementById('bubble-toast');

// 1. SỰ KIỆN KHI MẸ CHẠM VÀO TRÁI TIM MỞ ĐẦU
startBtn.addEventListener('click', () => {
    // Ẩn màn hình tối và chuyển sang giao diện sáng
    introOverlay.classList.add('hidden');
    document.body.classList.remove('dark-mode');
    mainContent.classList.remove('d-none');

    // Bắt đầu gõ chữ bức thư sau 800ms
    setTimeout(startTypewriter, 800);

    // Kích hoạt hoa rơi và bong bóng bay
    setInterval(createPetal, 450);
    setInterval(createBubble, 2800);
});

// 2. HÀM GÕ CHỮ TỰ ĐỘNG (TYPEWRITER EFFECT)
let charIndex = 0;
function startTypewriter() {
    if (charIndex < letterContent.length) {
        typewriterElement.textContent += letterContent.charAt(charIndex);
        charIndex++;
        setTimeout(startTypewriter, 45); // Tốc độ gõ 45ms mỗi chữ
    }
}

// 3. HÀM TẠO HIỆU ỨNG HOA RƠI
function createPetal() {
    const petalsContainer = document.getElementById('petals-container');
    const petal = document.createElement('div');
    const icons = ['🌸', '🌺', '🌷', '💮', '🩷'];
    
    petal.classList.add('petal');
    petal.innerText = icons[Math.floor(Math.random() * icons.length)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (Math.random() * 14 + 14) + 'px';
    petal.style.animationDuration = (Math.random() * 4 + 4) + 's';
    petal.style.opacity = Math.random() * 0.6 + 0.4;

    petalsContainer.appendChild(petal);

    // Xóa cánh hoa sau khi rơi xong để web luôn nhẹ
    setTimeout(() => {
        petal.remove();
    }, 8000);
}

// 4. HÀM TẠO BONG BÓNG BAY CHỨA THÔNG ĐIỆP
function createBubble() {
    const bubblesContainer = document.getElementById('bubbles-container');
    const bubble = document.createElement('div');
    const icons = ['🫧', '💝', '🌼', '✨'];

    bubble.classList.add('floating-bubble');
    bubble.innerText = icons[Math.floor(Math.random() * icons.length)];
    bubble.style.left = (Math.random() * 80 + 10) + 'vw';
    bubble.style.animationDuration = (Math.random() * 4 + 7) + 's';

    // Khi mẹ chạm vào bong bóng
    bubble.addEventListener('click', () => {
        const randomMsg = bubbleMessages[Math.floor(Math.random() * bubbleMessages.length)];
        showToast(randomMsg);
        bubble.style.transform = 'scale(1.6)';
        bubble.style.opacity = '0';
        setTimeout(() => bubble.remove(), 200);
    });

    bubblesContainer.appendChild(bubble);

    setTimeout(() => {
        if (bubble.parentElement) bubble.remove();
    }, 11000);
}

// Hiển thị thông báo nhỏ khi bấm vỡ bong bóng
let toastTimeout;
function showToast(message) {
    toastElement.innerText = message;
    toastElement.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}

// 5. HÀM MỞ HỘP QUÀ BÍ MẬT CUỐI TRANG
function openGift() {
    const giftBox = document.getElementById('gift-box');
    const giftContent = document.getElementById('gift-content');

    // Đổi icon hộp quà và hiện Voucher
    giftBox.innerText = '🎉';
    giftBox.style.animation = 'none';
    giftContent.classList.remove('d-none');

    // Tung thêm hiệu ứng tim bay chúc mừng
    for (let i = 0; i < 15; i++) {
        setTimeout(createPetal, i * 100);
    }
}