import React from 'react';

function Sidebar() {
    return (
        <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '20px' }}>
            <h2>Navegação</h2>
            <ul>
                <li><a href="/">Regras</a></li>
                {/* Adicione mais links conforme necessário */}
            </ul>
        </div>
    );
}

export default Sidebar;
