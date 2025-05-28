const sectionTitles = ['Початок роботи', 'Контекст', 'Перенаправлення рефів', 'Фрагменти', 'Рефи та DOM'];
    
export default function Sidebar() {

    return (
        <aside className="sidebar">
            <ul>
                {sectionTitles.map((title,index) => (
                    <li key={index}>{title}</li>
                ))}
            </ul>
        </aside>
    )
}