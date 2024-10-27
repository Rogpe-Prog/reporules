const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/rulesmongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Definição do esquema
const ruleSchema = new mongoose.Schema({
  name: String,
  condition: String,
});

const Rule = mongoose.model('Rule', ruleSchema);

// Endpoint para adicionar regras
app.post('/api/rules', async (req, res) => {
  const { name, condition } = req.body;
  const newRule = new Rule({ name, condition });
  await newRule.save();
  res.status(201).json(newRule);
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
