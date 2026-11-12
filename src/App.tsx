import { useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretDownIcon,
  CheckIcon,
  CheckCircleIcon,
  ChartLineUpIcon,
  HeadsetIcon,
  FilesIcon,
  CpuIcon,
  ListIcon,
  XIcon,
  PlusIcon,
  ShareNetworkIcon,
  PhoneCallIcon,
  EnvelopeSimpleIcon,
  BriefcaseIcon,
  PathIcon,
  TagIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import "./App.css";
import { useLandingEffects } from "./useLandingEffects";
import instagramArt from "./assets/instagram.svg";

const scenarios = [
  {
    name: "Продажи",
    icon: ChartLineUpIcon,
    title: "Каждой заявке — внимание. Сразу.",
    text: "AI-ассистент отвечает на вопросы, уточняет потребность и передаёт менеджеру подготовленную заявку.",
    input: "Нужна CRM для команды из 12 человек",
    action: "Определена потребность · CRM",
    result: "Лид квалифицирован",
    detail: "Контакт и задача переданы в CRM",
  },
  {
    name: "Поддержка",
    icon: HeadsetIcon,
    title: "Ответы есть. Даже после шести.",
    text: "Ассистент находит ответы в вашей базе знаний и подключает специалиста, когда вопрос требует участия человека.",
    input: "Как изменить адрес доставки?",
    action: "Найдена инструкция · База знаний",
    result: "Ответ подготовлен",
    detail: "Сложные вопросы — специалисту",
  },
  {
    name: "Документы",
    icon: FilesIcon,
    title: "Меньше копирования. Больше смысла.",
    text: "Извлекайте данные из документов, проверяйте реквизиты и собирайте сводки для согласования сотрудником.",
    input: "Проверь счёт и извлеки реквизиты",
    action: "Распознаны поля · Документ",
    result: "Данные структурированы",
    detail: "Готово к проверке сотрудником",
  },
];

const cases = [
  {
    icon: ShareNetworkIcon,
    title: "Ведение соцсетей",
    description:
      "Готовит контент-план и черновики постов, адаптирует материалы для Instagram и YouTube, помогает оформлять страницы и группы. Публикации проходят ваше согласование.",
    tags: ["Контент-план", "Посты", "Оформление"],
    output: "План и посты на согласование",
    cta: "Обсудить соцсети",
  },
  {
    icon: ChartLineUpIcon,
    title: "Поиск клиентов и переписка",
    description:
      "Находит потенциальных клиентов по вашим критериям, помогает вести персональную переписку и фиксирует ответы. Менеджеру передаёт заинтересованные контакты; исходящие сообщения — по согласованному сценарию.",
    tags: ["Поиск контактов", "Переписка", "Квалификация"],
    output: "Контакты с историей переписки для менеджера",
    cta: "Обсудить поиск",
  },
  {
    icon: FilesIcon,
    title: "Анализ документов и данных",
    description:
      "Извлекает данные из документов и входящих сообщений, сверяет их с заданными правилами. Неполные и сомнительные значения отмечает для проверки сотрудником.",
    tags: ["Распознавание", "Проверка", "Сводки"],
    output: "Структурированные данные и список проверок",
    cta: "Обсудить документы",
  },
  {
    icon: PhoneCallIcon,
    title: "Заказы из звонков и АТС",
    description:
      "Разбирает заявки из звонков и АТС, создаёт карточку заказа, сортирует по типу и срочности и направляет в очередь ответственной команды. Нестандартные обращения можно передавать оператору.",
    tags: ["Звонки", "Заказы", "Маршрутизация"],
    output: "Очередь заказов по типу и срочности",
    cta: "Обсудить звонки",
  },
  {
    icon: EnvelopeSimpleIcon,
    title: "Входящая почта и сообщения",
    description:
      "Сортирует входящую почту и сообщения по теме и приоритету, назначает ответственного и формирует график обработки по срокам. Срочные обращения выделяет отдельно.",
    tags: ["Email и сообщения", "Приоритеты", "График задач"],
    output: "Входящие с приоритетом, сроком и ответственным",
    cta: "Обсудить сообщения",
  },
];

function moveCaseSpotlight(event: React.PointerEvent<HTMLElement>) {
  if (
    event.pointerType === "touch" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--spot-x",
    `${event.clientX - bounds.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--spot-y",
    `${event.clientY - bounds.top}px`,
  );
}

function App() {
  useLandingEffects();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [menu, setMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [plan, setPlan] = useState("Пилот");
  const s = scenarios[active];
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <header
        className="header wrap"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menu) {
            setMenu(false);
            menuButtonRef.current?.focus();
          }
        }}
      >
        <a className="brand" href="#" aria-label="Бизнес Контур — главная">
          <span className="brand-mark">✳</span> бизнес контур
        </a>
        <nav
          id="main-navigation"
          className={menu ? "nav open" : "nav"}
          aria-label="Навигация"
        >
          {[
            ["Решения", "solutions"],
            ["Кейсы", "cases"],
            ["Как работаем", "process"],
            ["Стоимость", "pricing"],
            ["Вопросы", "faq"],
          ].map(([name, id]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {name}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          Обсудить задачу{" "}
          <span>
            <ArrowUpRightIcon
              className="ui-icon"
              size={18}
              aria-hidden="true"
            />
          </span>
        </a>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          aria-controls="main-navigation"
          aria-expanded={menu}
          aria-label={menu ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? (
            <XIcon className="ui-icon" size={24} aria-hidden="true" />
          ) : (
            <ListIcon className="ui-icon" size={24} aria-hidden="true" />
          )}
        </button>
      </header>
      <nav className="mobile-bottom-nav" aria-label="Мобильная навигация">
        {[
          { label: "Решения", id: "solutions", icon: CpuIcon },
          { label: "Кейсы", id: "cases", icon: BriefcaseIcon },
          { label: "Как работаем", id: "process", icon: PathIcon },
          { label: "Стоимость", id: "pricing", icon: TagIcon },
          { label: "Вопросы", id: "faq", icon: QuestionIcon },
        ].map(({ label, id, icon: Icon }) => (
          <a key={id} href={`#${id}`}>
            <Icon size={22} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <main id="main-content" tabIndex={-1}>
        <section className="hero hero-spotlight" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="light-stream stream-left" />
            <div className="light-stream stream-right" />
            <div className="beam beam-left" />
            <div className="beam beam-right" />
            <div className="hero-particles" />
          </div>
          <div className="hero-copy">
            <div className="hero-signature">
              <span>✳</span> бизнес контур
            </div>
            <h1 id="hero-title">
              Больше возможностей.
              <br />
              Меньше рутины.
            </h1>
            <p>
              Внедряем AI в ваш бизнес — от первого ассистента
              <br className="desktop" /> до процессов, которые работают сами.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Обсудить внедрение{" "}
                <span aria-hidden="true">
                  <ArrowUpRightIcon className="ui-icon" size={20} />
                </span>
              </a>
              <a className="button hero-secondary" href="#solutions">
                Посмотреть решения
              </a>
            </div>
            {/* <div className="hero-note">
              Начнём с вашей задачи. Определим, где AI принесёт пользу.
            </div> */}
          </div>
          <a
            className="hero-scroll"
            href="#solutions"
            aria-label="Перейти к решениям"
          >
            <span aria-hidden="true">
              <ArrowDownIcon className="ui-icon" size={20} />
            </span>
          </a>
        </section>
        <section className="integrations wrap">
          <p>
            Работаем с инструментами,
            <br />
            которыми вы уже пользуетесь
          </p>
          <div className="telegram">Telegram</div>
          <div>WhatsApp</div>
          <div>Viber</div>
          <div>Facebook</div>
          <div>Gmail</div>
          <div className="notion">Notion</div>
          <span className="more">и другими через API</span>
        </section>
        <section className="section wrap" id="solutions">
          <div className="section-heading">
            <h2>
              Не просто AI.
              <br />
              Решение вашей задачи.
            </h2>
            <p>
              Начинаем с процессов, где автоматизация
              <br className="desktop" /> принесёт понятную пользу.
            </p>
          </div>
          <div
            className="solution-tabs"
            role="tablist"
            aria-label="Направления автоматизации"
          >
            {scenarios.map((item, i) => (
              <button
                key={item.name}
                role="tab"
                id={"tab-" + i}
                aria-controls="solution-panel"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[i] = element;
                }}
                onKeyDown={(event) => {
                  const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
                  if (!keys.includes(event.key)) return;
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? scenarios.length - 1
                        : (i +
                            (event.key === "ArrowRight" ? 1 : -1) +
                            scenarios.length) %
                          scenarios.length;
                  setActive(next);
                  tabRefs.current[next]?.focus();
                }}
                onClick={() => setActive(i)}
              >
                <span>
                  <item.icon
                    className="ui-icon"
                    size={22}
                    weight="regular"
                    aria-hidden="true"
                  />
                </span>
                {item.name}
                <span>
                  <ArrowUpRightIcon
                    className="ui-icon"
                    size={18}
                    aria-hidden="true"
                  />
                </span>
              </button>
            ))}
          </div>
          <div
            className="solution-panel"
            id="solution-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={"tab-" + active}
          >
            <div>
              <span className="subtle">
                AI для{" "}
                {active === 0
                  ? "отдела продаж"
                  : active === 1
                    ? "службы поддержки"
                    : "работы с документами"}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="text-link" href="#contact">
                Обсудить такой сценарий{" "}
                <ArrowUpRightIcon
                  className="ui-icon"
                  size={18}
                  aria-hidden="true"
                />
              </a>
            </div>
            <div className="demo" key={s.name}>
              <div className="demo-toolbar">
                <span className="demo-window-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>Бизнес Контур / {s.name}</span>
                <span className="demo-mode">Демо</span>
              </div>
              <div
                className="workflow-path"
                aria-label="Этапы: запрос, AI-обработка, результат"
              >
                <span>Запрос</span>
                <i aria-hidden="true" />
                <span>AI-обработка</span>
                <i aria-hidden="true" />
                <span>Результат</span>
              </div>
              <div className="demo-content">
                <div className="chat">{s.input}</div>
                <div className="demo-action">
                  <span aria-hidden="true">
                    <CpuIcon className="ui-icon" size={28} weight="regular" />
                  </span>
                  {s.action}
                </div>
                <div className="demo-result">
                  <span aria-hidden="true">
                    <CheckCircleIcon
                      className="ui-icon"
                      size={26}
                      weight="regular"
                    />
                  </span>
                  <div>
                    <strong>{s.result}</strong>
                    <p>{s.detail}</p>
                  </div>
                </div>
                <p className="demo-disclaimer">
                  Иллюстрация сценария, не результат реального внедрения.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section wrap cases"
          id="cases"
          aria-labelledby="cases-title"
        >
          {/* <div className="section-heading">
            <div>
              <h2 id="cases-title">
                AI берёт на себя рутину.
                <br />
                Команда — важные решения.
              </h2>
            </div>
            <p>
              Подключаем AI к привычным каналам и системам — с проверкой
              сотрудником там, где она нужна.
            </p>
          </div> */}
          <div className="case-grid">
            {cases.map((item, index) => (
              <article
                className="case-card"
                key={item.title}
                onPointerMove={moveCaseSpotlight}
              >
                {index === 0 ? (
                  <img
                    className="case-art"
                    src={instagramArt}
                    alt=""
                    aria-hidden="true"
                  />
                ) : (
                  <item.icon
                    className="case-art-icon"
                    size={190}
                    weight="thin"
                    aria-hidden="true"
                  />
                )}
                <div className="case-card-top">
                  <item.icon
                    className="case-icon ui-icon"
                    size={30}
                    weight="regular"
                    aria-hidden="true"
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="case-tags" aria-label="Возможности сценария">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="case-card-bottom">
                  <div className="case-result">
                    <span>На выходе</span>
                    <strong>{item.output}</strong>
                  </div>
                  <a
                    href="#contact"
                    className="case-cta"
                    aria-label={`Обсудить сценарий: ${item.title}`}
                  >
                    {item.cta}
                    <ArrowUpRightIcon
                      className="ui-icon"
                      size={18}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
          {/* <p className="cases-note">
            Это примеры сценариев, а не отчёты о внедрениях. Интеграции и правила
            автоматизации согласуем заранее; важные решения и нестандартные
            ситуации остаются под контролем вашей команды.
          </p> */}
        </section>
        <section className="process-section" id="process">
          <div className="wrap">
            <div className="section-heading">
              <h2>
                От «а что, если»
                <br />
                до «уже работает».
              </h2>
              <p>
                Прозрачный процесс. Небольшие шаги.
                <br />
                Контроль остаётся у вашей команды.
              </p>
            </div>
            <div className="steps">
              {[
                [
                  "Разбираемся в бизнесе",
                  "Изучаем процесс, находим узкие места и определяем, что стоит автоматизировать.",
                ],
                [
                  "Проверяем на пилоте",
                  "Запускаем один сценарий. Сравниваем результат с исходными показателями.",
                ],
                [
                  "Встраиваем в работу",
                  "Подключаем инструменты, обучаем команду и настраиваем контроль качества.",
                ],
                [
                  "Развиваем систему",
                  "Следим за результатом и масштабируем то, что действительно приносит пользу.",
                ],
              ].map(([title, desc], i) => (
                <article key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section wrap" id="pricing">
          <div className="section-heading">
            <h2>Начните с одного процесса.</h2>
            <p>
              Формат зависит от задачи.
              <br />
              Стоимость фиксируем после оценки объёма.
            </p>
          </div>
          <div className="prices">
            {[
              {
                name: "Аудит",
                desc: "Понять, с чего начать",
                price: "Оценка по запросу",
                items: [
                  "Карта текущих процессов",
                  "Приоритеты автоматизации",
                  "План внедрения",
                ],
              },
              {
                name: "Пилот",
                desc: "Проверить идею на практике",
                price: "Расчёт после аудита",
                items: [
                  "Один рабочий AI-сценарий",
                  "Интеграция с вашими данными",
                  "Оценка качества и эффекта",
                ],
              },
              {
                name: "Масштабирование",
                desc: "Объединить процессы в систему",
                price: "Индивидуально",
                items: [
                  "Несколько связанных сценариев",
                  "Обучение вашей команды",
                  "Поддержка и развитие",
                ],
              },
            ].map((p, i) => (
              <article
                className={"price " + (i === 1 ? "featured" : "")}
                key={p.name}
              >
                {i === 1 && (
                  <span className="recommended">Хороший первый шаг</span>
                )}
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <p className="price-value">{p.price}</p>
                <ul>
                  {p.items.map((x) => (
                    <li key={x}>
                      <CheckIcon
                        className="ui-icon"
                        size={18}
                        aria-hidden="true"
                      />{" "}
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="button primary"
                  href="#contact"
                  onClick={() => setPlan(p.name)}
                >
                  Обсудить {p.name.toLowerCase()}{" "}
                  <span>
                    <ArrowUpRightIcon
                      className="ui-icon"
                      size={18}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </article>
            ))}
          </div>
          <p className="pricing-note">
            Расходы на модели и внешние сервисы рассчитываются отдельно — до
            начала работ.
          </p>
        </section>
        <section className="faq wrap" id="faq">
          <h2>
            Хорошие вопросы.
            <br />
            Прямые ответы.
          </h2>
          <div>
            {[
              [
                "Нужно ли менять нашу CRM?",
                "Обычно нет. Сначала проверяем возможности API вашей системы и подключаем AI к существующим инструментам. Если есть ограничения, обсуждаем их до начала работ.",
              ],
              [
                "Что происходит с нашими данными?",
                "До внедрения согласуем, какие данные можно обрабатывать, где они хранятся и кто имеет к ним доступ. Подбираем архитектуру под ваши требования.",
              ],
              [
                "А если AI ошибётся?",
                "Для важных действий предусматриваем проверку сотрудником. На пилоте тестируем ответы и определяем, когда ассистент должен передать задачу человеку.",
              ],
              [
                "Как понять, что внедрение окупается?",
                "До пилота фиксируем исходные показатели: время обработки, нагрузку команды или качество ответа. После запуска сравниваем их с результатом и учитываем расходы на сервисы.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">
                    <PlusIcon className="ui-icon" size={20} />
                  </span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact wrap" id="contact">
          <div>
            <span className="contact-label">Ваш следующий шаг</span>
            <h2>
              Давайте найдём,
              <br />
              где AI будет полезен
              <br />
              именно вам.
            </h2>
            <p>
              Расскажите о задаче — начните с короткого брифа.
              <br />
              Без сложных технических заданий.
            </p>
            <div className="contact-symbol">✳</div>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              Как к вам обращаться
              <input
                autoComplete="name"
                name="name"
                placeholder="Ваше имя"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email или Telegram
              <input
                autoCapitalize="none"
                spellCheck={false}
                name="contact"
                placeholder="name@company.ru или @username"
                required
                maxLength={150}
              />
            </label>
            <label>
              Формат работы
              <span className="select-field">
                <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <option>Аудит</option>
                  <option>Пилот</option>
                  <option>Масштабирование</option>
                </select>
                <CaretDownIcon
                  className="select-chevron"
                  size={18}
                  weight="regular"
                  aria-hidden="true"
                />
              </span>
            </label>
            <label>
              Что хотите автоматизировать?
              <textarea
                name="task"
                placeholder="Например, ответы на типовые вопросы клиентов"
                required
                maxLength={3000}
              />
            </label>
            <button className="button primary" type="button">
              Обсудить бриф{" "}
              <span aria-hidden="true">
                <ArrowUpRightIcon
                  className="ui-icon"
                  size={20}
                  weight="regular"
                />
              </span>
            </button>
          </form>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-inner wrap">
          <div className="footer-top">
            <div className="footer-intro">
              <span className="footer-kicker">
                <i /> Технологии с практическим смыслом
              </span>
              <h2>
                Следующий шаг
                <br />
                за вашим бизнесом.
              </h2>
              <a className="footer-project" href="#contact">
                Начать с задачи{" "}
                <span aria-hidden="true">
                  <ArrowUpRightIcon className="ui-icon" size={20} />
                </span>
              </a>
            </div>
            <nav className="footer-nav" aria-label="Навигация в подвале">
              <h3>На странице</h3>
              <a href="#solutions">Решения</a>
              <a href="#cases">Кейсы</a>
              <a href="#process">Как работаем</a>
              <a href="#pricing">Форматы работы</a>
              <a href="#faq">Вопросы и ответы</a>
            </nav>
            <div className="footer-next">
              <h3>Есть идея?</h3>
              <p>
                Опишите процесс, который
                <br />
                хотите сделать проще.
              </p>
              <a href="#contact">
                Подготовить бриф{" "}
                <span aria-hidden="true">
                  <ArrowUpRightIcon className="ui-icon" size={20} />
                </span>
              </a>
              <span className="footer-local">Без регистрации</span>
            </div>
          </div>
          <a
            href="#"
            className="footer-wordmark"
            aria-label="Бизнес Контур — вернуться в начало"
          >
            <span className="footer-flower" aria-hidden="true">
              ✳
            </span>
            <span>бизнес контур</span>
          </a>
          <div className="footer-bottom">
            <small>© {new Date().getFullYear()} Бизнес Контур</small>
            <p>Искусственный интеллект. Практическая польза.</p>
            <a href="#">
              Наверх{" "}
              <span aria-hidden="true">
                <ArrowUpIcon className="ui-icon" size={18} />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default App;
