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