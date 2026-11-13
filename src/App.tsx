import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretDownIcon,
  CheckIcon,
  CheckCircleIcon,
  ChartLineUpIcon,
  UserFocusIcon,
  ChartBarIcon,
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
  QuestionIcon,
  FacebookLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import "./App.css";
import { useLandingEffects } from "./useLandingEffects";

const baseScenarios = [
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
    icon: UserFocusIcon,
    title: "Поиск клиентов и переписка",
    description:
      "Находит потенциальных клиентов по вашим критериям, помогает вести персональную переписку и фиксирует ответы. Менеджеру передаёт заинтересованные контакты; исходящие сообщения — по согласованному сценарию.",
    tags: ["Поиск контактов", "Переписка", "Квалификация"],
    output: "Контакты с историей переписки для менеджера",
    cta: "Обсудить поиск",
  },
  {
    icon: ChartBarIcon,
    title: "Анализ звонков, работы менеджеров и KPI",
    description:
      "Разбирает записи звонков: как менеджер выявляет потребность, работает с возражениями и договаривается о следующем шаге. По данным CRM собирает KPI — количество контактов, скорость обработки заявок и конверсию в сделки. Показывает руководителю сильные стороны и точки роста команды с примерами из разговоров.",
    tags: ["Анализ звонков", "Качество работы", "KPI команды"],
    output: "Отчёт по менеджерам: KPI, примеры и рекомендации",
    cta: "Обсудить анализ",
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

const scenarios = [
  ...baseScenarios,
  ...cases.map((item, index) => ({
    name: ["Соцсети", "Поиск клиентов", "Анализ", "Звонки", "Почта"][index],
    icon: item.icon,
    title: item.title,
    text: item.description,
    input: [
      "Подготовь контент-план на неделю",
      "Найди компании по нашему профилю клиента",
      "Проанализируй звонки менеджеров и KPI за неделю",
      "Прими заказ из записи звонка",
      "Разбери входящие обращения за сегодня",
    ][index],
    action: [
      "Учтены темы и формат площадок",
      "Контакты отобраны по критериям",
      "Разобраны звонки · Сопоставлены показатели CRM",
      "Выделены детали и срочность заказа",
      "Определены темы, приоритеты и сроки",
    ][index],
    result: item.output,
    detail: "Результат — на проверку сотруднику",
  })),
];

function App() {
  useLandingEffects();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [menu, setMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [plan, setPlan] = useState("Пилот");
  const briefDialogRef = useRef<HTMLDialogElement>(null);
  const briefOverflowRef = useRef("");
  function openBrief(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(max-width:720px)").matches) return;
    event.preventDefault();
    const dialog = briefDialogRef.current;
    if (!dialog || dialog.open) return;
    briefOverflowRef.current = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }
  useEffect(() => {
    const dialog = briefDialogRef.current;
    if (!dialog) return;
    const mobile = window.matchMedia("(max-width:720px)");

    const restoreScroll = () => {
      document.body.style.overflow = briefOverflowRef.current;
    };

    const resize = () => {
      if (!mobile.matches && dialog.open) dialog.close();
    };

    dialog.addEventListener("close", restoreScroll);
    mobile.addEventListener("change", resize);
    return () => {

      dialog.removeEventListener("close", restoreScroll);
      mobile.removeEventListener("change", resize);
      if (dialog.open) {
        dialog.close();
        restoreScroll();
      }
    };
  }, []);
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
        <a className="brand" href="#" aria-label="Бизнес контур — главная">
          <span className="brand-mark">✳</span> Бизнес контур
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
            ["Вопросы", "faq"],
          ].map(([name, id]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {name}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact" onClick={openBrief}>
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
              <span>✳</span> Бизнес контур
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
              <a className="button primary" href="#contact" onClick={openBrief}>
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
          <div>Google Документы</div>
          <div>CRM</div>
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
          <span id="cases" aria-hidden="true" />
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
              <span className="subtle">Направление · {s.name}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="text-link" href="#contact" onClick={openBrief}>
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
                <span>Бизнес контур / {s.name}</span>
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
          className="company-section wrap"
          id="about"
          aria-labelledby="company-title"
        >
          <div className="company-heading">
            <span className="company-eyebrow">
              <span aria-hidden="true">✳</span> О компании
            </span>
            <h2 id="company-title">
              Соединяем AI
              <br />с вашей
              <br />
              <span>ежедневной работой.</span>
            </h2>
            <a className="text-link" href="#contact" onClick={openBrief}>
              Познакомиться и обсудить задачу
              <ArrowUpRightIcon
                className="ui-icon"
                size={20}
                aria-hidden="true"
              />
            </a>
          </div>
          <div className="company-description">
            <p className="company-lead">
              Бизнес контур — компания по внедрению искусственного интеллекта и
              автоматизации бизнес-процессов.
            </p>
            <p>
              Помогаем связать обращения клиентов, документы и данные в понятную
              систему. Создаём AI-ассистентов и подключаем их к инструментам
              команды, чтобы информация попадала к нужным людям, а повторяющиеся
              задачи требовали меньше ручной работы.
            </p>
            <dl className="company-responsibilities">
              <div>
                <dt>
                  <UserFocusIcon size={22} aria-hidden="true" /> Продажи и
                  клиентский сервис
                </dt>
                <dd>
                  Создаём ассистентов для поиска клиентов, ответов на вопросы и
                  обработки заявок. Настраиваем сбор контактов, уточнение
                  потребности и передачу диалога менеджеру вместе с историей
                  общения.
                </dd>
              </div>
              <div>
                <dt>
                  <ChartBarIcon size={22} aria-hidden="true" /> Звонки, работа
                  менеджеров и KPI
                </dt>
                <dd>
                  Автоматизируем разбор звонков и создание заказов из
                  разговоров. Помогаем оценивать качество общения, находить
                  пропущенные договорённости и собирать отчёты по показателям
                  команды из CRM.
                </dd>
              </div>
              <div>
                <dt>
                  <FilesIcon size={22} aria-hidden="true" /> Документы, почта и
                  рабочие данные
                </dt>
                <dd>
                  Настраиваем извлечение реквизитов, проверку документов и
                  подготовку сводок. Входящие письма и сообщения распределяем по
                  теме, срочности и ответственным — с понятной очередью задач.
                </dd>
              </div>
              <div>
                <dt>
                  <ShareNetworkIcon size={22} aria-hidden="true" /> Контент и
                  социальные сети
                </dt>
                <dd>
                  Внедряем инструменты для составления контент-планов,
                  подготовки постов и адаптации материалов под разные площадки.
                  Черновики поступают на согласование вашей команде.
                </dd>
              </div>
            </dl>
          </div>
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
                  href="#contact" onClick={(event) => { setPlan(p.name); openBrief(event); }}
                  
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
        <dialog
          ref={briefDialogRef}
          className="brief-dialog"
          aria-label="Обсудить задачу"
          onClick={(event) => {
            if (event.target === event.currentTarget)
              event.currentTarget.close();
          }}
        >
          <section className="contact wrap" id="contact">
            <button
              type="button"
              className="brief-close"
              aria-label="Закрыть форму"
              onClick={() => briefDialogRef.current?.close()}
            >
              <XIcon size={22} aria-hidden="true" />
            </button>
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
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  >
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
        </dialog>
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
              <a className="footer-project" href="#contact" onClick={openBrief}>
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
              <a href="#faq">Вопросы и ответы</a>
            </nav>
            <div className="footer-next">
              <h3>Есть идея?</h3>
              <p>
                Опишите процесс, который
                <br />
                хотите сделать проще.
              </p>
              <a href="#contact" onClick={openBrief}>
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
            aria-label="Бизнес контур — вернуться в начало"
          >
            <span className="footer-flower" aria-hidden="true">
              ✳
            </span>
            <span>Бизнес контур</span>
          </a>
          <div className="footer-bottom">
            <small>© {new Date().getFullYear()} Бизнес контур</small>
            <p>Искусственный интеллект. Практическая польза.</p>
            <nav className="footer-socials" aria-label="Социальные сети">
              <a href="https://www.facebook.com/leverageindogroup" target="_blank" rel="noopener noreferrer" aria-label="Facebook — открыть в новой вкладке" title="Facebook">
                <FacebookLogoIcon size={24} weight="fill" aria-hidden="true" />
              </a>
              <a href="https://www.youtube.com/@I_am_Kramer" target="_blank" rel="noopener noreferrer" aria-label="YouTube — открыть в новой вкладке" title="YouTube">
                <YoutubeLogoIcon size={26} weight="fill" aria-hidden="true" />
              </a>
            </nav>
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
