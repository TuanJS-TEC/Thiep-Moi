// Cấu hình mật khẩu truy cập (Bạn có thể đổi pass ở đây)
const ADMIN_PASSWORD = "123456"; // Đổi thành mật khẩu bạn muốn
const BASE_URL = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');

function checkLogin() {
    const pass = document.getElementById('admin-password').value;
    if (pass === ADMIN_PASSWORD) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard-screen').style.display = 'block';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function logout() {
    location.reload();
}

function generateInvitation() {
    const nameInput = document.getElementById('guest-name-input').value.trim();
    
    if (!nameInput) {
        alert("Vui lòng nhập tên khách mời!");
        return;
    }

    // 1. Mã hóa tên để đưa lên URL (đảm bảo tiếng Việt không lỗi)
    const encodedName = encodeURIComponent(nameInput);
    
    // 2. Tạo đường link hoàn chỉnh
    const finalLink = `${BASE_URL}?guest=${encodedName}`;

    // 3. Tạo nội dung tin nhắn mẫu
    const message = `Thân mời ${nameInput} tới dự đám cưới của Thành Luân & Yến Yến.\n\nMời bạn xem thiệp online tại đây: \n${finalLink}\n\nRất mong sự hiện diện của bạn! ❤`;

    // 4. Hiển thị kết quả ra màn hình
    document.getElementById('result-area').style.display = 'block';
    
    // Điền vào các ô input
    document.getElementById('generated-link').value = finalLink;
    document.getElementById('generated-msg').value = message;
    
    // Cập nhật nút xem thử
    document.getElementById('preview-btn').href = finalLink;

    // Cập nhật link gửi mail (mailto)
    // Lưu ý: mailto không hỗ trợ tốt HTML body, chỉ text cơ bản
    const subject = `Thiệp mời đám cưới: Thành Luân & Yến Yến mời ${nameInput}`;
    const mailBody = encodeURIComponent(message);
    document.getElementById('btn-send-mail').href = `mailto:?subject=${encodeURIComponent(subject)}&body=${mailBody}`;
}

function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* Cho mobile */
    
    navigator.clipboard.writeText(copyText.value).then(() => {
        alert("Đã copy thành công!");
    });
}

// Cho phép nhấn Enter để login
document.getElementById('admin-password').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkLogin();
    }
});