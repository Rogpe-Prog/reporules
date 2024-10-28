import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import RuleList from './components/RuleList';
import RuleForm from './components/RuleForm';
import Sidebar from './components/Sidebar';

function App() {
    const [rules, setRules] = useState([]); // Estado para armazenar as regras
    const [newRule, setNewRule] = useState({ name: '', status: false }); // Estado para nova regra

    // Função para buscar as regras do backend
    useEffect(() => {
        fetchRules();
    }, []);

    const fetchRules = async () => {
        try {
            const response = await axios.get('http://localhost:5000/rules'); // Substitua com o endpoint do backend
            setRules(response.data);
        } catch (error) {
            console.error('Erro ao buscar regras:', error);
        }
    };

    // Função para adicionar uma nova regra
    const addRule = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/rules', newRule); // Substitua com o endpoint do backend
            setRules([...rules, response.data]); // Adiciona a nova regra ao estado
            setNewRule({ name: '', status: false }); // Reseta o formulário
        } catch (error) {
            console.error('Erro ao adicionar regra:', error);
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <h1>Gerenciamento de Regras</h1>

                {/* Seção para listar as regras */}
                <section>
                    <h2>Lista de Regras</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Condições</th>
                                <th>Ações</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rules.map((rule) => (
                                <tr key={rule._id}>
                                    <td>{rule.name}</td>
                                    <td>{rule.conditions ? rule.conditions.join(', ') : 'Nenhuma'}</td>
                                    <td>{rule.actions ? rule.actions.join(', ') : 'Nenhuma'}</td>
                                    <td>{rule.status ? 'Ativo' : 'Inativo'}</td>
                                    <td>
                                        {/* Aqui você pode adicionar botões para editar e deletar */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Seção para adicionar nova regra */}
                <section>
                    <h2>Nova Regra</h2>
                    <form onSubmit={addRule}>
                        <label>
                            Nome:
                            <input
                                type="text"
                                name="name"
                                value={newRule.name}
                                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Status:
                            <input
                                type="checkbox"
                                name="status"
                                checked={newRule.status}
                                onChange={(e) => setNewRule({ ...newRule, status: e.target.checked })}
                            />
                        </label>
                        <button type="submit">Salvar</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default App;
