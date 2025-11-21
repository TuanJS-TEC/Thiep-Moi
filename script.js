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

// --- TỰ ĐỘNG ĐIỀN TÊN KHÁCH VÀO FORM ---
// Lấy tên khách từ biến guestName đã có ở phần đầu file script.js
if (guestName) {
    let formattedName = decodeURIComponent(guestName).replace(/[-_]/g, ' ');
    document.getElementById('form-name').value = formattedName;
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxvz5Z-7r1UG3QvW0XCdG9tuqCas8afjkM-KIPTAhAfxiD4bq5LLtIcDFo9DBA1fWo-bQ/exec';
const form = document.getElementById('wedding-form'); 
const btnSubmit = document.getElementById('btn-submit');
const msgSuccess = document.getElementById('msg-success');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Hiệu ứng nút đang gửi
        btnSubmit.innerHTML = "Đang gửi...";
        btnSubmit.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msgSuccess.style.display = "block";
                form.style.display = "none"; // Ẩn form sau khi gửi xong
                console.log('Success!', response);
                // Reset nút phòng trường hợp muốn gửi lại (tuỳ chọn)
                btnSubmit.innerHTML = "Đã gửi thành công";
            })
            .catch(error => {
                console.error('Error!', error.message);
                btnSubmit.innerHTML = "Lỗi, vui lòng thử lại";
                btnSubmit.disabled = false;
            });
    });
}