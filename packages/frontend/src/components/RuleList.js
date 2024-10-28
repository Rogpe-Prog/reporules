import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RuleList({ onEdit }) {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        axios.get('/rules')
            .then(response => setRules(response.data))
            .catch(error => console.error("Erro ao carregar regras:", error));
    }, []);

    return (
        <div>
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
                    {rules.map(rule => (
                        <tr key={rule._id}>
                            <td>{rule.name}</td>
                            <td>{rule.conditions.length}</td>
                            <td>{rule.actions.length}</td>
                            <td>{rule.status ? 'Ativa' : 'Inativa'}</td>
                            <td>
                                <button onClick={() => onEdit(rule)}>Editar</button>
                                <button onClick={() => handleDelete(rule._id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    function handleDelete(id) {
        axios.delete(`/rules/${id}`)
            .then(() => setRules(rules.filter(rule => rule._id !== id)))
            .catch(error => console.error("Erro ao excluir regra:", error));
    }
}

export default RuleList;
