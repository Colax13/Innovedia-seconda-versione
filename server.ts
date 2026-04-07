import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Supabase (Server-side)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Initialize Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  const adminEmail = process.env.ADMIN_EMAIL || "colasantiludovico@gmail.com";

  // API Routes
  app.post("/api/leads/analisi", async (req, res) => {
    try {
      const data = req.body;
      
      // 1. Insert into Supabase
      const { error: supabaseError } = await supabase
        .from("leads_analisi")
        .insert([{ ...data, status: "nuovo" }]);

      if (supabaseError) throw supabaseError;

      // 2. Send email via Resend
      const { error: resendError } = await resend.emails.send({
        from: "Innovedia <onboarding@resend.dev>", // Use verified domain in production
        to: [adminEmail],
        subject: `Nuovo lead analisi — ${data.nome_attivita}`,
        html: `
          <h2>Nuova richiesta analisi gratuita</h2>
          <p><strong>Nome e Cognome:</strong> ${data.nome_cognome}</p>
          <p><strong>Nome Attività:</strong> ${data.nome_attivita}</p>
          <p><strong>Settore:</strong> ${data.settore}</p>
          <p><strong>Città:</strong> ${data.citta}</p>
          <hr />
          <p><strong>Ha un sito?</strong> ${data.ha_sito}</p>
          <p><strong>Attivo sui social?</strong> ${data.attivo_social}</p>
          <p><strong>URL Sito:</strong> ${data.url_sito || 'Non fornito'}</p>
          <p><strong>URL Instagram:</strong> ${data.url_instagram || 'Non fornito'}</p>
          <hr />
          <p><strong>Problema principale:</strong> ${data.problema_principale}</p>
          <p><strong>Obiettivo 6 mesi:</strong> ${data.obiettivo_6_mesi}</p>
          <hr />
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp || 'Non fornito'}</p>
          <p><strong>Canale preferito:</strong> ${data.canale_contatto}</p>
        `,
      });

      if (resendError) {
        console.error("Resend Error:", resendError);
        // We don't fail the whole request if only email fails, but we log it
      }

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Server Error:", error);
      res.status(500).json({ error: error.message || "Errore durante l'invio della richiesta" });
    }
  });

  app.post("/api/leads/servizi", async (req, res) => {
    try {
      const data = req.body;
      
      // 1. Insert into Supabase
      const { error: supabaseError } = await supabase
        .from("leads_servizi")
        .insert([{ ...data, status: "nuovo" }]);

      if (supabaseError) throw supabaseError;

      // 2. Send email via Resend
      const { error: resendError } = await resend.emails.send({
        from: "Innovedia <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `Nuovo lead servizio — ${data.tipo_richiedente} cerca ${data.servizi_richiesti.join(', ')}`,
        html: `
          <h2>Nuova richiesta servizio/collaborazione</h2>
          <p><strong>Tipo richiedente:</strong> ${data.tipo_richiedente}</p>
          <p><strong>Servizi richiesti:</strong> ${data.servizi_richiesti.join(', ')}</p>
          <p><strong>Descrizione progetto:</strong> ${data.descrizione_progetto}</p>
          <p style="font-size: 1.2em; color: #06b6d4;"><strong>Budget:</strong> ${data.budget}</p>
          <hr />
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp || 'Non fornito'}</p>
          <p style="font-size: 1.2em; color: #06b6d4;"><strong>Tempistiche:</strong> ${data.tempistiche}</p>
        `,
      });

      if (resendError) {
        console.error("Resend Error:", resendError);
      }

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Server Error:", error);
      res.status(500).json({ error: error.message || "Errore durante l'invio della richiesta" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
