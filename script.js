
// ==========================================
// TAXPERTIZE WEBSITE - MAIN JAVASCRIPT
// ==========================================

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Footer year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact details
const config = window.TAXPERTIZE_CONFIG || {};
const emailLink = document.getElementById("emailLink");

if (emailLink && config.email && !config.email.includes("YOUR_EMAIL")) {
  emailLink.textContent = config.email;
  emailLink.href = `mailto:${config.email}`;
}

// ==========================================

// ==========================================
// CUSTOMER ENQUIRY FORM - EMAIL ONLY
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const note = document.getElementById("formNote");
    const button = form.querySelector('button[type="submit"]');
    const data = new FormData(form);

    button.disabled = true;
    note.textContent = "Submitting your enquiry...";

    try {
      const enquiry = {
        name: data.get("name"),
        mobile: data.get("phone"),
        service: data.get("service"),
        message: data.get("message"),
        _subject: "New TAXPERTIZE Website Enquiry",
        _template: "table"
      };

      const response = await fetch(
        "https://formsubmit.co/ajax/vijay.edukula@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(enquiry)
        }
      );

      const result = await response.json();

      if (!response.ok || result.success !== true && result.success !== "true") {
        throw new Error(result.message || "Email service rejected the enquiry");
      }

      form.reset();

      note.textContent =
        "Thank you for choosing TAXPERTIZE! Your enquiry has been received. Our team will review your requirements and get back to you shortly.";

    } catch (error) {
      console.error("TAXPERTIZE enquiry error:", error);

      note.textContent =
        "We couldn't submit your enquiry. Please try again later.";

    } finally {
      button.disabled = false;
    }
  });
}


// ==========================================
// TAXPERTIZE FIXED-ANSWER CHATBOT
// ==========================================

const chatPanel = document.getElementById("taxpertizeChat");
const chatLaunch = document.getElementById("chatLaunch");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function toggleChat(open) {
  if (!chatPanel || !chatLaunch) return;

  chatPanel.hidden = !open;
  chatLaunch.setAttribute("aria-expanded", String(open));

  if (open && chatInput) {
    chatInput.focus();
  }
}

if (chatLaunch) {
  chatLaunch.addEventListener("click", () => {
    toggleChat(chatPanel.hidden);
  });
}

if (chatClose) {
  chatClose.addEventListener("click", () => toggleChat(false));
}

function addChatMessage(text, className) {
  if (!chatMessages) return;

  const item = document.createElement("div");
  item.className = className;
  item.textContent = text;

  chatMessages.appendChild(item);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chatbot answers
function getTaxpertizeAnswer(question) {
  const q = question.toLowerCase();

  if (/service|offer|what do you do|help with/.test(q)) {
    return "TAXPERTIZE supports Income Tax Filing, GST services, accounting and bookkeeping, TDS and compliance, business registrations, tax audit support, net worth certificates, financial reports, wealth management and investment planning. Tell us what you need and we'll guide you to the right service.";
  }

  if (/startup|start.*business|business.*start|entrepreneur|idea/.test(q)) {
    return "TAXPERTIZE supports your journey: Idea → Finance Guidance → Business Setup → Compliance → Growth. We can help you understand business registration options, financial records and applicable compliance. Contact our team to discuss your startup.";
  }

  if (/gst/.test(q)) {
    return "TAXPERTIZE can assist with GST registration guidance, return filing and ongoing compliance. Requirements depend on your business and circumstances. Contact us to discuss your case.";
  }

  if (/income.?tax|itr|tax return|tax filing/.test(q)) {
    return "TAXPERTIZE provides income tax return and tax-related support. The documents and applicable form depend on your income sources and situation. Contact us for guidance specific to your case.";
  }

  if (/tds|roc|compliance|audit/.test(q)) {
    return "TAXPERTIZE offers support related to TDS, ROC and tax compliance, as well as tax audit assignments. Applicability and deadlines depend on your entity and circumstances. Please speak with our team.";
  }

  if (/account|bookkeep|financial report|net worth/.test(q)) {
    return "TAXPERTIZE can help with bookkeeping, financial reports and net worth certificate-related services. Contact us to confirm the documents and scope required.";
  }

  if (/price|cost|fee|charge/.test(q)) {
    return "Fees depend on the service, transaction volume and complexity. TAXPERTIZE can provide a quote after understanding your requirements. Contact our team for details.";
  }

  if (/contact|whatsapp|phone|call|talk/.test(q)) {
    return "You can contact TAXPERTIZE on WhatsApp at +91 80196 21852 or call +91 81432 26229. Email: vijay.edukula@gmail.com.";
  }

  if (/hello|hi|hey|good morning|good evening/.test(q)) {
    return "Hello! Welcome to TAXPERTIZE. We help individuals, entrepreneurs and businesses with tax, accounts, compliance and startup support. What would you like help with?";
  }

  return "I can help with general information about TAXPERTIZE services, Income Tax, GST, startup support, accounting and compliance. For a specific or complex question, please contact our team. We'll be happy to guide you.";
}

// Submit chatbot question
function submitChatQuestion(question) {
  const clean = question.trim();

  if (!clean) return;

  addChatMessage(clean, "user-message");
  addChatMessage(getTaxpertizeAnswer(clean), "bot-message");

  const quick = document.createElement("div");
  quick.className = "chat-quick";

  const link = document.createElement("a");

  link.href =
    "https://wa.me/918019621852?text=" +
    encodeURIComponent("Hello TAXPERTIZE, I have a question: " + clean);

  link.target = "_blank";
  link.rel = "noopener";
  link.className = "chat-quick-link";
  link.textContent = "Continue on WhatsApp";

  quick.appendChild(link);
  chatMessages.appendChild(quick);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chat form
if (chatForm && chatInput) {
  chatForm.addEventListener("submit", event => {
    event.preventDefault();
    submitChatQuestion(chatInput.value);
    chatInput.value = "";
  });
}

// Quick chatbot questions
document.querySelectorAll(".chat-quick button").forEach(button => {
  button.addEventListener("click", () => {
    submitChatQuestion(button.dataset.question);
  });
});
