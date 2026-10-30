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

  if (config.whatsapp && !config.whatsapp.includes("XXXXXXXXXX")) {
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent("Hello TAXPERTIZE, I would like to enquire about your services.\n\n" + body)}`, "_blank", "noopener");
    document.getElementById("formNote").textContent = "WhatsApp will open with your enquiry ready to send.";
  } else if (config.email && !config.email.includes("YOUR_EMAIL")) {
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${encodedBody}`;
    document.getElementById("formNote").textContent = "Your email app should open with the enquiry ready to send.";
  } else {
    document.getElementById("formNote").textContent = "Please contact TAXPERTIZE using the phone or email details shown.";
  }
});


// TAXPERTIZE fixed-answer assistant (no external AI service or API key required)
const chatPanel = document.getElementById("taxpertizeChat");
const chatLaunch = document.getElementById("chatLaunch");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
function toggleChat(open) {
  chatPanel.hidden = !open;
  chatLaunch.setAttribute("aria-expanded", String(open));
  if (open) chatInput.focus();
}
chatLaunch.addEventListener("click", () => toggleChat(chatPanel.hidden));
chatClose.addEventListener("click", () => toggleChat(false));
function addChatMessage(text, className) {
  const item = document.createElement("div");
  item.className = className;
  item.textContent = text;
  chatMessages.appendChild(item);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function getTaxpertizeAnswer(question) {
  const q = question.toLowerCase();
  if (/service|offer|what do you do|help with/.test(q)) return "TAXPERTIZE supports Income Tax Filing, GST services, accounting and bookkeeping, TDS and compliance, business registrations, tax audit support, net worth certificates, financial reports, wealth management and investment planning. Tell us what you need and we’ll guide you to the right service.";
  if (/startup|start.*business|business.*start|entrepreneur|idea/.test(q)) return "TAXPERTIZE supports your journey: Idea → Finance Guidance → Business Setup → Compliance → Growth. We can help you understand business registration options, financial records and applicable compliance. Share your business idea with our team to discuss the next steps.";
  if (/gst/.test(q)) return "TAXPERTIZE can assist with GST registration guidance, return filing and ongoing compliance. The exact requirements depend on your business and circumstances. Contact us to discuss your case.";
  if (/income.?tax|itr|tax return|tax filing/.test(q)) return "TAXPERTIZE provides income tax return and tax-related support. The documents and applicable form depend on your income sources and situation. Please contact us for guidance specific to your case.";
  if (/tds|roc|compliance|audit/.test(q)) return "TAXPERTIZE offers support related to TDS, ROC and tax compliance, as well as tax audit assignments. Applicability and deadlines depend on your entity and facts—please speak with our team.";
  if (/account|bookkeep|financial report|net worth/.test(q)) return "TAXPERTIZE can help with bookkeeping, financial reports and net worth certificate-related services. Contact us to confirm the documents and scope required.";
  if (/price|cost|fee|charge/.test(q)) return "Fees depend on the service, transaction volume and complexity. TAXPERTIZE can provide a quote after understanding your requirement. Send us a WhatsApp message to discuss.";
  if (/contact|whatsapp|phone|call|talk/.test(q)) return "You can contact TAXPERTIZE on WhatsApp at +91 80196 21852 or call +91 81432 26229. Email: vijay.edukula@hotmail.com.";
  if (/hello|hi|hey|good morning|good evening/.test(q)) return "Hello! Welcome to TAXPERTIZE. We help individuals, entrepreneurs and businesses with tax, accounts, compliance and startup support. What would you like help with?";
  return "I can help with general information about TAXPERTIZE services, Income Tax, GST, startup support, accounting and compliance. For a specific or complex question, please contact our team on WhatsApp. We’ll be happy to guide you.";
}
function submitChatQuestion(question) {
  const clean = question.trim();
  if (!clean) return;
  addChatMessage(clean, "user-message");
  addChatMessage(getTaxpertizeAnswer(clean), "bot-message");
  const quick = document.createElement("div");
  quick.className = "chat-quick";
  const link = document.createElement("a");
  link.href = "https://wa.me/918019621852?text=" + encodeURIComponent("Hello TAXPERTIZE, I have a question: " + clean);
  link.target = "_blank";
  link.rel = "noopener";
  link.className = "chat-quick-link";
  link.textContent = "Continue on WhatsApp";
  quick.appendChild(link);
  chatMessages.appendChild(quick);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  submitChatQuestion(chatInput.value);
  chatInput.value = "";
});
document.querySelectorAll(".chat-quick button").forEach(button => button.addEventListener("click", () => submitChatQuestion(button.dataset.question)));
