import React from "react";
import './CardDescription.css'; // Archivo CSS

function CardDescription({ name, image, types, abilities, stats }) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={name} />
            </div>
            <div className="card-details">
                <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>

                {/* Mostrar tipos solo si hay elementos */}
                {types.length > 0 && (
                    <p><strong>Tipos:</strong> {types.join(', ')}</p>
                )}

                {/* Mostrar habilidades solo si hay elementos */}
                {abilities.length > 0 && (
                    <p><strong>Habilidades:</strong> {abilities.join(', ')}</p>
                )}

                {/* Mostrar stats solo si hay elementos */}
                {stats.length > 0 && (
                    <div className="card-stats">
                        <h3>Stats:</h3>
                        <ul>
                            {stats.map((stat) => (
                                <li key={stat.stat.name}>
                                    {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardDescription;
