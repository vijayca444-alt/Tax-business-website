const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

const config = window.TAXPERTIZE_CONFIG || {};
const emailLink = document.getElementById("emailLink");
if (config.email && !config.email.includes("YOUR_EMAIL")) {
  emailLink.textContent = config.email;
  emailLink.href = `mailto:${config.email}`;
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const service = String(data.get("service") || "").trim();
  const message = String(data.get("message") || "").trim();
  const body = `Name: ${name}\nMobile: ${phone}\nService: ${service}\nMessage: ${message}`;
  const subject = encodeURIComponent(`TAXPERTIZE enquiry - ${service}`);
  const encodedBody = encodeURIComponent(body);

  if (config.email && !config.email.includes("YOUR_EMAIL")) {
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${encodedBody}`;
    document.getElementById("formNote").textContent = "Your email app should open with the enquiry ready to send.";
  } else if (config.whatsapp && !config.whatsapp.includes("XXXXXXXXXX")) {
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent("TAXPERTIZE enquiry\n" + body)}`, "_blank", "noopener");
    document.getElementById("formNote").textContent = "WhatsApp should open with your enquiry ready to send.";
  } else {
    document.getElementById("formNote").textContent = "Before using the form, add your business email or WhatsApp number in config.js.";
  }
});
