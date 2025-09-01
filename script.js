document.getElementById("bookingForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const bookingData = {
    phone: document.getElementById("phone").value,
    branch: document.getElementById("branch").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    people: document.getElementById("people").value,
    note: document.getElementById("note").value
  };

  console.log("Dữ liệu đặt chỗ:", bookingData);
  alert("Đặt chỗ thành công! (Dữ liệu đã được log trong console)");
});
