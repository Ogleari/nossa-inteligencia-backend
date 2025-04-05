const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post("/api/cadastro", async (req, res) => {
  const { nome, email, pais, empresa, cargo, perfil } = req.body;

  const { data, error } = await supabase.from("cadastros").insert([{ nome, email, pais, empresa, cargo, perfil }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ status: "ok", data });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
