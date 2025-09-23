import React from "react";
import "./AboutMe.scss";

function AboutMe() {
  return (
    <div className="about">
      <header className="about__hero">
        <h1>Привет 👋 Я Frontend-разработчик</h1>
        <p>
          Коммерческий опыт <b>более года</b> в разработке интерфейсов:{" "}
          <b>React, TypeScript, Redux Toolkit, Ant Design, REST API</b>.  
          Люблю чистый код, быстро разбираюсь в новых технологиях.  
        </p>
        <p className="highlight">
          🔥 Готов к собеседованию, выполнению тестового и работе над разовыми проектами для заказчиков.
        </p>
      </header>

      <section className="about__section">
        <h2>Опыт работы</h2>

        <div className="card">
          <h3>👨‍💻 Frontend-разработчик — Гос. проект (РОСАТОМ)</h3>
          <span className="date">09.2023 – настоящее время</span>
          <ul>
            <li>Разработка интерфейсов на <b>React + TypeScript</b>.</li>
            <li>Использовал: Ant Design, Redux Toolkit, Axios, React Router, classnames, dompurify, qwebchannel, Jest, RTL.</li>
            <li>Реализовал виджеты с состоянием и модальными окнами.</li>
            <li>Интеграция REST API и хранение данных в локальном состоянии.</li>
            <li>Адаптивная вёрстка, динамические таблицы.</li>
            <li>Кастомные компоненты, включая собственный <b>useState-хук</b> для динамического обновления интерфейсов.</li>
            <li>Участие в код-ревью и внедрении новых функций.</li>
          </ul>
        </div>

        <div className="card">
          <h3>🔧 Разработка внутренних инструментов</h3>
          <ul>
            <li>Автоматизация процессов (JavaScript, Python, SQL).</li>
            <li>Работа с документацией и настройка сервисов на Linux (Ubuntu).</li>
            <li>Создание вспомогательных скриптов и утилит.</li>
          </ul>
        </div>
      </section>

      <section className="about__section">
        <h2>Навыки</h2>
        <div className="skills">
          <div className="skill">⚛️ React, Redux Toolkit</div>
          <div className="skill">🟦 TypeScript, JavaScript (ES6+)</div>
          <div className="skill">🎨 Ant Design, Tailwind, SCSS</div>
          <div className="skill">📱 Адаптивная верстка, Flex/Grid</div>
          <div className="skill">🗄️ Node.js (базово), SQL, Python</div>
          <div className="skill">🐧 Linux (Ubuntu)</div>
          <div className="skill">🌐 REST API, интеграция сервисов</div>
          <div className="skill">🛠️ Git, GitHub/GitLab, Webpack, Vite</div>
          <div className="skill">✅ Jest, React Testing Library</div>
        </div>
      </section>

      <section className="about__section">
        <h2>Дополнительно</h2>
        <ul className="extras">
          <li>🚀 Быстро учусь, умею работать с документацией.</li>
          <li>🎯 Ответственный, нацеленный на результат.</li>
          <li>
            🐙 GitHub с pet-проектами:{" "}
            <a href="https://github.com/thebilderberg" target="_blank" rel="noreferrer">
              github.com/thebilderberg
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AboutMe;
