import { useState } from 'react'
import './App.css'

const scenarios = [
  { name: 'Продажи', icon: '↗', title: 'Каждой заявке — внимание. Сразу.', text: 'AI-ассистент отвечает на вопросы, уточняет потребность и передаёт менеджеру подготовленную заявку.', input: 'Нужна CRM для команды из 12 человек', action: 'Определена потребность · CRM', result: 'Лид квалифицирован', detail: 'Контакт и задача переданы в CRM' },
  { name: 'Поддержка', icon: '◉', title: 'Ответы есть. Даже после шести.', text: 'Ассистент находит ответы в вашей базе знаний и подключает специалиста, когда вопрос требует участия человека.', input: 'Как изменить адрес доставки?', action: 'Найдена инструкция · База знаний', result: 'Ответ подготовлен', detail: 'Сложные вопросы — специалисту' },
  { name: 'Документы', icon: '▤', title: 'Меньше копирования. Больше смысла.', text: 'Извлекайте данные из документов, проверяйте реквизиты и собирайте сводки для согласования сотрудником.', input: 'Проверь счёт и извлеки реквизиты', action: 'Распознаны поля · Документ', result: 'Данные структурированы', detail: 'Готово к проверке сотрудником' },
]
function App() {
 const [active, setActive] = useState(0)
 const [menu, setMenu] = useState(false)
 const [plan, setPlan] = useState('Пилот')
 const [ready, setReady] = useState(false)
 const s = scenarios[active]
 function downloadBrief(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const blob = new Blob([`Бриф на AI-интеграцию\nФормат: ${plan}\nИмя: ${data.get('name')}\nКонтакт: ${data.get('contact')}\nЗадача: ${data.get('task')}`], {type:'text/plain;charset=utf-8'})
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'ai-brief.txt'; link.click(); URL.revokeObjectURL(url); setReady(true)
 }
 return <>
  <header className="header wrap"><a className="brand" href="#" aria-label="Контур AI — главная"><span className="brand-mark">✳</span> контур<span className="brand-ai">ai</span></a><nav className={menu ? 'nav open' : 'nav'} aria-label="Навигация">{[['Решения','solutions'],['Как работаем','process'],['Стоимость','pricing'],['Вопросы','faq']].map(([name,id])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}>{name}</a>)}</nav><a className="nav-cta" href="#contact">Обсудить задачу <span>↗</span></a><button className="menu-toggle" aria-expanded={menu} aria-label="Меню" onClick={()=>setMenu(!menu)}>☰</button></header>
  <main>
   <section className="hero hero-spotlight" aria-labelledby="hero-title">
    <div className="hero-atmosphere" aria-hidden="true"><div className="light-stream stream-left"/><div className="light-stream stream-right"/><div className="beam beam-left"/><div className="beam beam-right"/><div className="hero-particles"/></div>
    <div className="hero-copy">
     <div className="hero-signature"><span>✳</span> контур ai</div>
     <h1 id="hero-title">Больше возможностей.<br/>Меньше рутины.</h1>
     <p>Внедряем AI в ваш бизнес — от первого ассистента<br className="desktop"/> до процессов, которые работают сами.</p>
     <div className="hero-actions"><a className="button primary" href="#contact">Обсудить внедрение <span aria-hidden="true">↗</span></a><a className="button hero-secondary" href="#solutions">Посмотреть решения</a></div>
     <div className="hero-note">Начнём с вашей задачи. Определим, где AI принесёт пользу.</div>
    </div>
    <a className="hero-scroll" href="#solutions" aria-label="Перейти к решениям"><span aria-hidden="true">↓</span></a>
   </section>
   <section className="integrations wrap"><p>Работаем с инструментами,<br/>которыми вы уже пользуетесь</p><div>Битрикс<span>24</span></div><div>amo<span>CRM</span></div><div className="telegram">◈ Telegram</div><div>1С</div><div className="notion">▣ Notion</div><span className="more">и другими через API</span></section>
   <section className="section wrap" id="solutions"><div className="section-heading"><h2>Не просто AI.<br/>Решение вашей задачи.</h2><p>Начинаем с процессов, где автоматизация<br className="desktop"/> принесёт понятную пользу.</p></div><div className="solution-tabs" role="tablist" aria-label="Направления автоматизации">{scenarios.map((item,i)=><button key={item.name} role="tab" id={'tab-'+i} aria-controls="solution-panel" aria-selected={active===i} onClick={()=>setActive(i)}><span>{item.icon}</span>{item.name}<span>↗</span></button>)}</div><div className="solution-panel" id="solution-panel" role="tabpanel" aria-labelledby={'tab-'+active}><div><span className="subtle">AI для {active===0?'отдела продаж':active===1?'службы поддержки':'работы с документами'}</span><h3>{s.title}</h3><p>{s.text}</p><a className="text-link" href="#contact">Обсудить такой сценарий ↗</a></div><div className="demo"><small>Пример работы · не реальный клиентский кейс</small><div className="chat">{s.input}</div><div className="demo-action"><span>✳</span>{s.action}</div><div className="demo-result"><span>✓</span><div><strong>{s.result}</strong><p>{s.detail}</p></div></div></div></div></section>
   <section className="process-section" id="process"><div className="wrap"><div className="section-heading"><h2>От «а что, если»<br/>до «уже работает».</h2><p>Прозрачный процесс. Небольшие шаги.<br/>Контроль остаётся у вашей команды.</p></div><div className="steps">{[['Разбираемся в бизнесе','Изучаем процесс, находим узкие места и определяем, что стоит автоматизировать.'],['Проверяем на пилоте','Запускаем один сценарий. Сравниваем результат с исходными показателями.'],['Встраиваем в работу','Подключаем инструменты, обучаем команду и настраиваем контроль качества.'],['Развиваем систему','Следим за результатом и масштабируем то, что действительно приносит пользу.']].map(([title,desc],i)=><article key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>
   <section className="section wrap" id="pricing"><div className="section-heading"><h2>Начните с одного процесса.</h2><p>Формат зависит от задачи.<br/>Стоимость фиксируем после оценки объёма.</p></div><div className="prices">{[{name:'Аудит',desc:'Понять, с чего начать',price:'Оценка по запросу',items:['Карта текущих процессов','Приоритеты автоматизации','План внедрения']},{name:'Пилот',desc:'Проверить идею на практике',price:'Расчёт после аудита',items:['Один рабочий AI-сценарий','Интеграция с вашими данными','Оценка качества и эффекта']},{name:'Масштабирование',desc:'Объединить процессы в систему',price:'Индивидуально',items:['Несколько связанных сценариев','Обучение вашей команды','Поддержка и развитие']}].map((p,i)=><article className={'price '+(i===1?'featured':'')} key={p.name}>{i===1&&<span className="recommended">Хороший первый шаг</span>}<h3>{p.name}</h3><p>{p.desc}</p><h4>{p.price}</h4><ul>{p.items.map(x=><li key={x}>✓ <span>{x}</span></li>)}</ul><a className={'button '+(i===1?'primary':'secondary')} href="#contact" onClick={()=>setPlan(p.name)}>Обсудить {p.name.toLowerCase()} <span>↗</span></a></article>)}</div><p className="pricing-note">Расходы на модели и внешние сервисы рассчитываются отдельно — до начала работ.</p></section>
   <section className="faq wrap" id="faq"><h2>Хорошие вопросы.<br/>Прямые ответы.</h2><div>{[['Нужно ли менять нашу CRM?','Обычно нет. Сначала проверяем возможности API вашей системы и подключаем AI к существующим инструментам. Если есть ограничения, обсуждаем их до начала работ.'],['Что происходит с нашими данными?','До внедрения согласуем, какие данные можно обрабатывать, где они хранятся и кто имеет к ним доступ. Подбираем архитектуру под ваши требования.'],['А если AI ошибётся?','Для важных действий предусматриваем проверку сотрудником. На пилоте тестируем ответы и определяем, когда ассистент должен передать задачу человеку.'],['Как понять, что внедрение окупается?','До пилота фиксируем исходные показатели: время обработки, нагрузку команды или качество ответа. После запуска сравниваем их с результатом и учитываем расходы на сервисы.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
   <section className="contact wrap" id="contact"><div><span className="contact-label">Ваш следующий шаг</span><h2>Давайте найдём,<br/>где AI будет полезен<br/>именно вам.</h2><p>Расскажите о задаче — начните с короткого брифа.<br/>Без сложных технических заданий.</p><div className="contact-symbol">✳</div></div><form onSubmit={downloadBrief}><label>Как к вам обращаться<input name="name" placeholder="Ваше имя" required maxLength={100}/></label><label>Email или Telegram<input name="contact" placeholder="name@company.ru или @username" required maxLength={150}/></label><label>Формат работы<select value={plan} onChange={e=>setPlan(e.target.value)}><option>Аудит</option><option>Пилот</option><option>Масштабирование</option></select></label><label>Что хотите автоматизировать?<textarea name="task" placeholder="Например, ответы на типовые вопросы клиентов" required maxLength={3000}/></label><button className="button primary" type="submit">Подготовить бриф <span>↗</span></button><p className="form-note" role="status">{ready?'Бриф скачан. Вы можете передать его выбранному подрядчику.':'Бриф сохранится файлом на вашем устройстве. Данные никуда не отправляются.'}</p></form></section>
  </main><footer className="site-footer">
   <div className="footer-inner wrap">
    <div className="footer-top">
     <div className="footer-intro"><span className="footer-kicker"><i/> Технологии с практическим смыслом</span><h2>Следующий шаг<br/>за вашим бизнесом.</h2><a className="footer-project" href="#contact">Начать с задачи <span aria-hidden="true">↗</span></a></div>
     <nav className="footer-nav" aria-label="Навигация в подвале"><h3>На странице</h3><a href="#solutions">Решения</a><a href="#process">Как работаем</a><a href="#pricing">Форматы работы</a><a href="#faq">Вопросы и ответы</a></nav>
     <div className="footer-next"><h3>Есть идея?</h3><p>Опишите процесс, который<br/>хотите сделать проще.</p><a href="#contact">Подготовить бриф <span aria-hidden="true">↗</span></a><span className="footer-local">Без регистрации</span></div>
    </div>
    <a href="#" className="footer-wordmark" aria-label="Контур AI — вернуться в начало"><span className="footer-flower" aria-hidden="true">✳</span><span>контур<span className="footer-ai">ai</span></span></a>
    <div className="footer-bottom"><small>© {new Date().getFullYear()} Контур AI</small><p>Искусственный интеллект. Практическая польза.</p><a href="#">Наверх <span aria-hidden="true">↑</span></a></div>
   </div>
  </footer>
 </>
}
export default App
