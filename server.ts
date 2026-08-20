import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { defaultSiteData } from "./src/data/defaultData";
import { SiteData, ContactMessage } from "./src/types";

const ADMIN_EMAIL = "admin@thimiguys.com";
const ADMIN_PASSWORD = "thimi123";
const ADMIN_TOKEN = "surveypro_admin_session_token_thimi123";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site-data.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

// Ensure data directory exists and initialize site data on startup
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize file on disk immediately if not present
if (!fs.existsSync(DATA_FILE)) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultSiteData, null, 2), "utf-8");
    console.log("[SERVER] Initialized data/site-data.json with default content");
  } catch (e) {
    console.error("[SERVER] Failed to create initial data file:", e);
  }
}

// Helper to load or initialize site data
function loadSiteData(): SiteData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      if (content && content.trim()) {
        return JSON.parse(content);
      }
    }
  } catch (err) {
    console.error("Error reading site data file, using defaults:", err);
  }
  // Initialize with default
  saveSiteData(defaultSiteData);
  return defaultSiteData;
}

function saveSiteData(data: SiteData): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    console.log(`[SERVER] Saved updated site data to ${DATA_FILE} at ${new Date().toISOString()}`);
    return true;
  } catch (err) {
    console.error("Error writing site data file:", err);
    return false;
  }
}

// Helper to load or initialize messages
function loadMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const content = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading messages file:", err);
  }
  return [
    {
      id: "msg-1",
      name: "Ramesh Sharma",
      email: "ramesh.sharma@example.com",
      phone: "9841234567",
      subject: "Feasibility Study for 12 MW Hydro Project in Sankhuwasabha",
      projectType: "Hydropower",
      message: "Hello omsconsults team, we have obtained a survey license for a 12 MW run-of-the-river project in Sankhuwasabha. We would like to schedule a meeting for detailed engineering design and EIA consultation.",
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      read: true
    },
    {
      id: "msg-2",
      name: "Sunita Adhikari",
      email: "sunita.adhikari@greenfuture.np",
      phone: "9851098765",
      subject: "Commercial Rooftop Solar 500 kWp Quotation",
      projectType: "Solar",
      message: "We are looking for seasoned engineers to conduct structural load analysis and complete electrical design for our industrial facility in Butwal.",
      date: new Date(Date.now() - 86400000).toISOString(),
      read: false
    }
  ];
}

function saveMessages(messages: ContactMessage[]): boolean {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing messages file:", err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Middleware to authenticate Admin
  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization || (req.headers["x-admin-token"] as string);
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    
    if (!token || (token !== ADMIN_TOKEN && token !== "surveypro_admin_session_token_thimi123")) {
      console.warn(`[SERVER] Unauthorized admin request to ${req.method} ${req.path}`);
      return res.status(401).json({ error: "Unauthorized. Valid admin login session required." });
    }
    next();
  };

  // --- API Endpoints ---

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Auth: Login
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      console.log("[SERVER] Admin logged in successfully");
      return res.json({
        success: true,
        token: ADMIN_TOKEN,
        user: {
          email: ADMIN_EMAIL,
          name: "Ashok Bista (Admin)",
          role: "Administrator"
        }
      });
    }
    return res.status(401).json({ success: false, error: "Invalid email or password. Please use admin@thimiguys.com / thimi123" });
  });

  // Auth: Verify Token
  app.get("/api/auth/verify", (req, res) => {
    const authHeader = req.headers.authorization || (req.headers["x-admin-token"] as string);
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    if (token === ADMIN_TOKEN || token === "surveypro_admin_session_token_thimi123") {
      return res.json({
        valid: true,
        user: {
          email: ADMIN_EMAIL,
          name: "Ashok Bista (Admin)",
          role: "Administrator"
        }
      });
    }
    return res.status(401).json({ valid: false });
  });

  // Public: Get all site data (guaranteed no-cache so all devices see newest updates)
  app.get("/api/data", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    const data = loadSiteData();
    res.json(data);
  });

  // Admin: Update entire site data
  app.put("/api/data", requireAdmin, (req, res) => {
    const newData = req.body as SiteData;
    if (!newData || !newData.settings) {
      return res.status(400).json({ error: "Invalid site data payload" });
    }
    const success = saveSiteData(newData);
    if (success) {
      return res.json({ success: true, data: newData, message: "Site content successfully updated." });
    }
    return res.status(500).json({ error: "Failed to persist site data." });
  });

  // Admin: Update Site Settings
  app.put("/api/settings", requireAdmin, (req, res) => {
    const current = loadSiteData();
    current.settings = { ...current.settings, ...req.body };
    saveSiteData(current);
    res.json({ success: true, settings: current.settings });
  });

  // Projects CRUD
  app.post("/api/projects", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const newProject = {
      ...req.body,
      id: req.body.id || `proj-${Date.now()}`
    };
    current.projects = [newProject, ...current.projects];
    saveSiteData(current);
    res.json({ success: true, project: newProject, projects: current.projects });
  });

  app.put("/api/projects/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    const index = current.projects.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Project not found" });
    }
    current.projects[index] = { ...current.projects[index], ...req.body, id };
    saveSiteData(current);
    res.json({ success: true, project: current.projects[index], projects: current.projects });
  });

  app.delete("/api/projects/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    current.projects = current.projects.filter(p => p.id !== id);
    saveSiteData(current);
    res.json({ success: true, projects: current.projects });
  });

  // Team CRUD
  app.post("/api/team", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const newMember = {
      ...req.body,
      id: req.body.id || `team-${Date.now()}`
    };
    current.team = [...current.team, newMember];
    saveSiteData(current);
    res.json({ success: true, member: newMember, team: current.team });
  });

  app.put("/api/team/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    const index = current.team.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Team member not found" });
    }
    current.team[index] = { ...current.team[index], ...req.body, id };
    saveSiteData(current);
    res.json({ success: true, member: current.team[index], team: current.team });
  });

  app.delete("/api/team/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    current.team = current.team.filter(t => t.id !== id);
    saveSiteData(current);
    res.json({ success: true, team: current.team });
  });

  // Services CRUD
  app.post("/api/services", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const newService = {
      ...req.body,
      id: req.body.id || `srv-${Date.now()}`
    };
    current.services = [...current.services, newService];
    saveSiteData(current);
    res.json({ success: true, service: newService, services: current.services });
  });

  app.put("/api/services/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    const index = current.services.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Service not found" });
    }
    current.services[index] = { ...current.services[index], ...req.body, id };
    saveSiteData(current);
    res.json({ success: true, service: current.services[index], services: current.services });
  });

  app.delete("/api/services/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    current.services = current.services.filter(s => s.id !== id);
    saveSiteData(current);
    res.json({ success: true, services: current.services });
  });

  // Skills CRUD
  app.put("/api/skills", requireAdmin, (req, res) => {
    const current = loadSiteData();
    current.skills = req.body;
    saveSiteData(current);
    res.json({ success: true, skills: current.skills });
  });

  // FAQs CRUD
  app.post("/api/faqs", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const newFaq = {
      ...req.body,
      id: req.body.id || `faq-${Date.now()}`
    };
    current.faqs = [...current.faqs, newFaq];
    saveSiteData(current);
    res.json({ success: true, faq: newFaq, faqs: current.faqs });
  });

  app.put("/api/faqs/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    const index = current.faqs.findIndex(f => f.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    current.faqs[index] = { ...current.faqs[index], ...req.body, id };
    saveSiteData(current);
    res.json({ success: true, faq: current.faqs[index], faqs: current.faqs });
  });

  app.delete("/api/faqs/:id", requireAdmin, (req, res) => {
    const current = loadSiteData();
    const { id } = req.params;
    current.faqs = current.faqs.filter(f => f.id !== id);
    saveSiteData(current);
    res.json({ success: true, faqs: current.faqs });
  });

  // Hero Slides
  app.put("/api/slides", requireAdmin, (req, res) => {
    const current = loadSiteData();
    current.heroSlides = req.body;
    saveSiteData(current);
    res.json({ success: true, slides: current.heroSlides });
  });

  // About Cards
  app.put("/api/about-cards", requireAdmin, (req, res) => {
    const current = loadSiteData();
    current.aboutCards = req.body;
    saveSiteData(current);
    res.json({ success: true, aboutCards: current.aboutCards });
  });

  // Public Contact Form Submission
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, message, projectType } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    const messages = loadMessages();
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name || "Website Visitor",
      email: email.trim(),
      phone: phone || "",
      subject: subject || "New Inquiry via Website",
      message: message || "Contact request received.",
      projectType: projectType || "General Consultation",
      date: new Date().toISOString(),
      read: false
    };
    messages.unshift(newMessage);
    saveMessages(messages);
    res.json({ success: true, message: "Thank you! Your message has been received by our engineering team." });
  });

  // Admin: View Messages
  app.get("/api/inquiries", requireAdmin, (_req, res) => {
    const messages = loadMessages();
    res.json(messages);
  });

  // Admin: Mark message as read
  app.patch("/api/inquiries/:id/read", requireAdmin, (req, res) => {
    const messages = loadMessages();
    const { id } = req.params;
    const msg = messages.find(m => m.id === id);
    if (msg) {
      msg.read = true;
      saveMessages(messages);
    }
    res.json({ success: true, messages });
  });

  // Admin: Delete Message
  app.delete("/api/inquiries/:id", requireAdmin, (req, res) => {
    let messages = loadMessages();
    const { id } = req.params;
    messages = messages.filter(m => m.id !== id);
    saveMessages(messages);
    res.json({ success: true, messages });
  });

  // Admin: Reset to Template Defaults
  app.post("/api/reset-defaults", requireAdmin, (_req, res) => {
    saveSiteData(defaultSiteData);
    res.json({ success: true, data: defaultSiteData, message: "Restored all content to default engineering portfolio template." });
  });

  // Serve static dist in production or whenever dist directory exists
  const distPath = path.join(process.cwd(), "dist");
  const hasDist = fs.existsSync(path.join(distPath, "index.html"));

  if (hasDist || process.env.NODE_ENV === "production") {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  if (typeof PORT === "string" && (PORT.startsWith("/") || PORT.startsWith("\\\\.\\pipe\\"))) {
    app.listen(PORT, () => {
      console.log(`Survey Pro Pvt. Ltd. server listening on socket ${PORT}`);
    });
  } else {
    app.listen(Number(PORT) || 3000, "0.0.0.0", () => {
      console.log(`Survey Pro Pvt. Ltd. server running on http://localhost:${PORT}`);
    });
  }
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
