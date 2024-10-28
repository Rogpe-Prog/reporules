import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RuleForm({ selectedRule, setSelectedRule }) {
    const [name, setName] = useState('');
    const [conditions, setConditions] = useState([]);
    const [actions, setActions] = useState([]);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        if (selectedRule) {
            setName(selectedRule.name);
            setConditions(selectedRule.conditions);
            setActions(selectedRule.actions);
            setStatus(selectedRule.status);
        }
    }, [selectedRule]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ruleData = { name, conditions, actions, status };

        if (selectedRule) {
            await axios.put(`/rules/${selectedRule._id}`, ruleData);
        } else {
            await axios.post('/rules', ruleData);
        }

        setSelectedRule(null);
        resetForm();
    };

    function resetForm() {
        setName('');
        setConditions([]);
        setActions([]);
        setStatus(true);
    }

    return (
        <div>
            <h2>{selectedRule ? 'Editar' : 'Nova'} Regra</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                {/* Adicione inputs para conditions e actions */}
                <div>
                    <label>Status:</label>
                    <input type="checkbox" checked={status} onChange={e => setStatus(e.target.checked)} />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default RuleForm;
