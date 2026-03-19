// Contact/Feedback form handler for a fashion site
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Optionally, you could send this data to a backend here
    form.reset();
    successMsg.style.display = "block";
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 4000);
  });
});
