const express = require('express');
const mongoose = require('mongoose');
const Rule = require('./models/Rule'); // Importando o modelo

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

// Definição do esquema e modelo
const ruleSchema = new mongoose.Schema({
    name: String,
    conditions: Array,
    actions: Array,
    status: Boolean,
  }, { timestamps: true });
  
  const Rule = mongoose.model('Rule', ruleSchema);

// Endpoint para criar uma nova regra
app.post('/rules', async (req, res) => {
    try {
        const newRule = new Rule(req.body);
        const savedRule = await newRule.save();
        res.status(201).json(savedRule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint para listar todas as regras
app.get('/rules', async (req, res) => {
    try {
        const rules = await Rule.find();
        res.json(rules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint para obter uma regra específica
app.get('/rules/:id', async (req, res) => {
    try {
        const rule = await Rule.findById(req.params.id);
        if (!rule) {
            return res.status(404).json({ message: 'Regra não encontrada' });
        }
        res.json(rule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint para atualizar uma regra existente
app.put('/rules/:id', async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID da URL
        //console.log('Atualizando a regra com ID:', id); // Log para depuração
        const updatedRule = await Rule.findByIdAndUpdate(id, req.body, { new: true }); // Atualiza a regra e retorna a nova
        if (!updatedRule) {
            return res.status(404).json({ message: 'Regra não encontrada' }); // Caso a regra não exista
        }
        res.json(updatedRule); // Retorna a regra atualizada
    } catch (error) {
        console.error(error); // Log de erro
        res.status(400).json({ message: error.message }); // Retorna um erro se ocorrer
    }
});

// Endpoint para deletar uma regra
app.delete('/rules/:id', async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID da URL
        const deletedRule = await Rule.findByIdAndDelete(id); // Encontra e deleta a regra
        if (!deletedRule) {
            return res.status(404).json({ message: 'Regra não encontrada' });
        }
        res.json({ message: 'Regra deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
