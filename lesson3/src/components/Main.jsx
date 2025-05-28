import React from 'react';
import sections from '../data/data.json';

export default function Main() {
    return (
        <main className="main">
            {sections.map(section => (
                <section key = {section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                </section>
            ))}
        </main>
    ) 
}