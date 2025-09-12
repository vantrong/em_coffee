

const API_URL = 'https://script.google.com/macros/s/AKfycbwdyDOis3llzgDeZpdlzcVsiKOs195KMVY9e6CRbzHi8YPpsiriugte3tl9vRblYi29/exec';
const form = document.getElementById("bookingForm");

 

function showToast(message, type="success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  // Đổi màu theo loại thông báo
  toast.style.backgroundColor = type === "error" ? "#f44336": "#4CAF50";

  toast.className = "toast show";
  setTimeout(() => { toast.className = toast.className.replace("show",
        "");
    },
    3000);
}



document.addEventListener('DOMContentLoaded', function () {
    // Lấy ngày hiện tại
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2,
    "0");
  const dd = String(today.getDate()).padStart(2,
    "0");
  var dateInput = document.getElementById('date');
	 dateInput.value = `${yyyy
    }-${mm
    }-${dd
    }`; // format chuẩn yyyy-mm-dd	
		
	
  var confirmModal = document.getElementById('confirmModal');
  var confirmBtn   = document.getElementById('confirmBtn');
  var cancelBtn    = document.getElementById('cancelBtn');
  var okBtn        = document.getElementById('okBtn');
 
   // Mở modal xác nhận
  confirmBtn.addEventListener('click', function () {
	   if (!form.checkValidity()) {
      form.reportValidity(); // hiển thị lỗi validate mặc định của HTML5
      return;
        }
     confirmModal.style.display = 'block';
	 confirmBtn.style.display = 'block';
    });

  // Đóng modal khi bấm Hủy
  cancelBtn.addEventListener('click', function () {
    confirmModal.style.display = 'none';
    });

  // Đồng ý -> đóng modal và submit form
  okBtn.addEventListener('click', function () {
    confirmModal.style.display = 'none';
    //document.getElementById('bookingForm').submit(); // đảm bảo hàm submitForm() đã được định nghĩa
	form.requestSubmit()
    });
  
	const openPdf = document.getElementById("openPdf");
	const pdfModal = document.getElementById("pdfModal");
	const closePdf = document.getElementById("closePdf");
	const agree = document.getElementById("agree");
  openPdf.addEventListener("click", function (e) {
    e.preventDefault(); // chặn link
    pdfModal.style.display = "block";
    });
  agree.onchange = function(){
	  let checked = this.checked;
	  if(checked == true)
	  {
		  openPdf.click()
	  }
  }
  closePdf.addEventListener("click", function () {
    pdfModal.style.display = "none";
    });

  window.addEventListener("click", function (e) {
    if (e.target === pdfModal) {
      pdfModal.style.display = "none";
        }
    });
});


document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading();
  const data = {
	name: document.getElementById('name').value.trim(),
	service: document.getElementById("service").value,
	phone: document.getElementById('phone').value.trim(),
	people: document.getElementById('people').value,
	date: document.getElementById('date').value,
	time: document.getElementById('time').value,
	note: document.getElementById('note').value.trim(),
    };

  // Nếu API_URL bắt đầu bằng link Google Apps Script thật thì sẽ gửi request
  if (API_URL.startsWith('https://script.google.com')) {
	await fetch(API_URL,
    { 
	  method: 'POST', 
	  body: JSON.stringify(data)
    });
	//alert('Cảm ơn bạn! Chúng mình sẽ liên hệ sớm.');
	
	showToast("Cảm ơn bạn! Chúng mình sẽ liên hệ sớm.");
} else {
    // Trường hợp chưa cấu hình link thật thì chỉ log ra console
	
	alert('Gửi yêu cầu thành công! (Demo: dữ liệu đã log ở console)');
}
  e.target.reset();
  hideLoading();
})

function showLoading() {
  document.getElementById("loadingSpinner").style.display = "flex";
}

function hideLoading() {
  document.getElementById("loadingSpinner").style.display = "none";
}