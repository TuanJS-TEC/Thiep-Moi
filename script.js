const params = new URLSearchParams(window.location.search);
let guestName = params.get('guest');
const guestElement = document.getElementById('guest-name');

if (guestName) {
    let formattedName = decodeURIComponent(guestName).replace(/[-_]/g, ' ');
    guestElement.textContent = formattedName;
} else {
    guestElement.textContent = "Bạn và Người thương";
}
// --- XỬ LÝ MỞ PHONG THƯ ---
function openEnvelope() {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const envelopeOverlay = document.getElementById('envelope-overlay');

    // 1. Hiệu ứng mở thư
    envelopeWrapper.classList.add('open');

    // 2. Đợi 0.8 giây cho nắp mở ra xong
    setTimeout(() => {
        // Làm mờ lớp màn che
        envelopeOverlay.style.opacity = '0';
        
        // 3. Sau khi mờ hẳn (thêm 1s nữa theo CSS transition)
        setTimeout(() => {
            envelopeOverlay.style.display = 'none';
            
            // QUAN TRỌNG: Cho phép cuộn trang trở lại
            document.body.classList.remove('no-scroll');
            
        }, 1000); 
    }, 800);
}

// --- COUNTDOWN TIMER ---
function startCountdown() {
    const countDate = new Date("Dec 14, 2025 09:00:00").getTime();

    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const gap = countDate - now;

        if (gap < 0) {
            clearInterval(updateTimer);
            document.getElementById("countdown").innerHTML = "<h3>Happy Wedding!</h3>";
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    }, 1000);
}

startCountdown();