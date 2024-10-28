const mongoose = require('mongoose');

// Definindo o esquema para as condições
const conditionSchema = new mongoose.Schema({
    field: { type: String, required: true },   // Campo a ser avaliado
    operator: { type: String, required: true }, // Operador de comparação (ex: "==", ">", "<")
    value: { type: mongoose.Schema.Types.Mixed, required: true } // Valor a ser comparado
});

// Definindo o esquema para as ações
const actionSchema = new mongoose.Schema({
    type: { type: String, required: true },  // Tipo de ação (ex: "notify", "log", "execute")
    params: { type: mongoose.Schema.Types.Mixed } // Parâmetros da ação
});

// Definindo o esquema principal da regra
const ruleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Nome da regra
    conditions: { type: [conditionSchema], required: true }, // Condições para a regra
    actions: { type: [actionSchema], required: true }, // Ações a serem executadas
    status: { type: Boolean, default: true } // Status da regra (ativa ou inativa)
}, {
    timestamps: true // Adiciona campos de createdAt e updatedAt
});

// Exportando o modelo
const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;
