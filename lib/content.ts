/**
 * Every word on the site lives here, in both languages.
 * Numbers are taken verbatim from the CV — do not round them.
 */

export type Lang = "ru" | "en";
export type L = Record<Lang, string>;

const t = (ru: string, en: string): L => ({ ru, en });

/* ---------------------------------------------------------------- person */

export const person = {
  first: t("Александр", "Alexander"),
  last: t("Маркелов", "Markelov"),
  full: t("Александр Маркелов", "Alexander Markelov"),
  role: t("Python Backend Developer", "Python Backend Developer"),
  grade: t("Middle", "Middle"),
  tenure: t("4 года 2 месяца", "4 yrs 2 mos"),
  city: t("Санкт-Петербург", "Saint Petersburg"),
  status: t("Открыт к предложениям", "Open to offers"),
  tagline: t(
    "Снижаю задержки и убираю ручной труд из систем, которые работают каждый день",
    "I cut latency and take manual work out of systems that run every day",
  ),
  summary: t(
    "Middle Python Backend Developer с 4+ годами коммерческого опыта. Специализация — backend-сервисы и REST API на FastAPI, асинхронные интеграции через RabbitMQ, оптимизация PostgreSQL и кеширование в Redis.",
    "Middle Python backend developer with 4+ years of commercial experience. I build backend services and REST APIs on FastAPI, wire up asynchronous integrations over RabbitMQ, tune PostgreSQL and cache in Redis.",
  ),
  summary2: t(
    "Работал в финтех- и медицинском доменах: снизил задержку API с 800 мс до 450 мс, автоматизировал обработку 200+ документов в месяц, подключил учреждение к федеральным API.",
    "I have worked in fintech and healthcare: brought API latency down from 800 ms to 450 ms, automated 200+ documents a month, and connected an organisation to federal APIs.",
  ),
};

/* -------------------------------------------------------------- contacts */

export const contacts = {
  phone: { value: "+7 (921) 650-49-35", href: "tel:+79216504935" },
  email: { value: "mrklv001@yandex.ru", href: "mailto:mrklv001@yandex.ru" },
  telegram: { value: "@Mrklv001", href: "https://t.me/Mrklv001" },
  github: { value: "github.com/Marke-Love", href: "https://github.com/Marke-Love" },
};

export const preferences: { label: L; value: L }[] = [
  {
    label: t("Занятость", "Employment"),
    value: t("Полная занятость", "Full time"),
  },
  {
    label: t("Формат", "Work format"),
    value: t("Офис или удалённо", "On-site or remote"),
  },
  {
    label: t("Переезд", "Relocation"),
    value: t("Не рассматриваю, командировки — да", "Not considering, open to business trips"),
  },
  {
    label: t("Гражданство", "Citizenship"),
    value: t("Россия", "Russia"),
  },
];

/* ------------------------------------------------------- headline impact */

export type Metric = {
  id: string;
  from?: number;
  to: number;
  suffix: L;
  prefix?: string;
  decimals?: number;
  label: L;
  note: L;
};

export const metrics: Metric[] = [
  {
    id: "latency",
    from: 800,
    to: 450,
    suffix: t("мс", "ms"),
    label: t("Задержка между сервисами", "Inter-service latency"),
    note: t("5 микросервисов, переход с REST на события", "5 microservices moved from REST to events"),
  },
  {
    id: "timeouts",
    to: 90,
    prefix: "−",
    suffix: t("%", "%"),
    label: t("Таймаутов", "Timeouts"),
    note: t("после перехода на RabbitMQ", "after the move to RabbitMQ"),
  },
  {
    id: "tasks",
    to: 2000,
    suffix: t("/сутки", "/day"),
    label: t("Фоновых задач", "Background jobs"),
    note: t("без блокировки API", "without blocking the API"),
  },
  {
    id: "queries",
    to: 60,
    prefix: "−",
    suffix: t("%", "%"),
    label: t("Обращений к PostgreSQL", "PostgreSQL round trips"),
    note: t("кеш справочников в Redis", "reference data cached in Redis"),
  },
  {
    id: "docs",
    to: 200,
    suffix: t("+/мес", "+/mo"),
    label: t("Документов без человека", "Documents, hands-free"),
    note: t("отчётность в контролирующие ведомства", "regulatory reporting"),
  },
];

/* ---------------------------------------------------------- hero waterfall */

export type Span = {
  name: L;
  before: number;
  after: number;
};

/** The hero trace: same request, before and after the refactor. */
export const trace: { spans: Span[]; before: number; after: number } = {
  before: 800,
  after: 450,
  spans: [
    { name: t("gateway", "gateway"), before: 60, after: 55 },
    { name: t("auth", "auth"), before: 90, after: 45 },
    { name: t("orders", "orders"), before: 240, after: 120 },
    { name: t("billing", "billing"), before: 260, after: 95 },
    { name: t("notify", "notify"), before: 150, after: 135 },
  ],
};

/* ------------------------------------------------------------- experience */

export type Job = {
  id: string;
  company: L;
  companyNote?: L;
  position: L;
  place: L;
  period: L;
  duration: L;
  start: string;
  end: string;
  tags?: L[];
  site?: { label: string; href: string };
  achievements: L[];
  duties: L[];
  stack: string[];
};

export const jobs: Job[] = [
  {
    id: "kvantron",
    company: t("Квантрон", "Kvantron"),
    companyNote: t(
      "Информационные технологии, системная интеграция, разработка ПО",
      "IT, systems integration, software development",
    ),
    position: t("Python-разработчик", "Python developer"),
    place: t("Санкт-Петербург", "Saint Petersburg"),
    period: t("Май 2025 — Май 2026", "May 2025 — May 2026"),
    duration: t("1 год 1 месяц", "1 yr 1 mo"),
    start: "2025-05",
    end: "2026-05",
    tags: [t("Микросервисы", "Microservices"), t("Высокая нагрузка", "High load")],
    achievements: [
      t(
        "Снизил среднюю задержку взаимодействия между 5 микросервисами с 800 мс до 450 мс и уменьшил количество таймаутов на 90% за счёт перевода синхронного REST на событийную модель через RabbitMQ",
        "Cut average latency between 5 microservices from 800 ms to 450 ms and reduced timeouts by 90% by moving synchronous REST calls to an event-driven model over RabbitMQ",
      ),
      t(
        "Обеспечил обработку до 2000 задач в сутки без блокировки API, реализовав фоновые воркеры для генерации документов, интеграций и отправки уведомлений",
        "Enabled up to 2,000 jobs a day without blocking the API by building background workers for document generation, integrations and notifications",
      ),
      t(
        "Сократил время ответа ключевых эндпоинтов с 1,5 с до 400 мс путём оптимизации PostgreSQL: композитные индексы, переписывание JOIN-запросов, устранение N+1",
        "Brought key endpoint response time down from 1.5 s to 400 ms by tuning PostgreSQL: composite indexes, rewritten JOINs, N+1 elimination",
      ),
      t(
        "Снизил количество обращений к PostgreSQL на 60% и стабилизировал время ответа API до 200 мс под нагрузкой, внедрив кеширование справочников и результатов запросов в Redis",
        "Reduced PostgreSQL round trips by 60% and held API response time at 200 ms under load by caching reference data and query results in Redis",
      ),
      t(
        "Сократил среднее время диагностики инцидентов с 3 часов до 45 минут, настроив централизованное логирование (ELK) и мониторинг метрик (latency, error rate, длина очередей RabbitMQ) в Grafana",
        "Cut average incident diagnosis time from 3 hours to 45 minutes with centralised logging (ELK) and metric monitoring in Grafana (latency, error rate, RabbitMQ queue depth)",
      ),
    ],
    duties: [
      t(
        "Разрабатывал и поддерживал backend-сервисы и REST API на Python (FastAPI)",
        "Built and maintained backend services and REST APIs in Python (FastAPI)",
      ),
      t(
        "Реализовывал интеграции между внутренними сервисами и внешними API с использованием RabbitMQ",
        "Implemented integrations between internal services and external APIs over RabbitMQ",
      ),
      t(
        "Оптимизировал работу с PostgreSQL и MySQL: индексы, запросы, транзакции",
        "Optimised PostgreSQL and MySQL work: indexes, queries, transactions",
      ),
      t(
        "Писал unit-тесты (Pytest), реализовывал обработку ошибок, логирование и мониторинг",
        "Wrote unit tests (Pytest), implemented error handling, logging and monitoring",
      ),
      t("Поддерживал CI/CD-пайплайн деплоя сервисов", "Maintained the CI/CD deployment pipeline"),
    ],
    stack: [
      "Python", "FastAPI", "Async/Await", "Docker", "PostgreSQL", "MySQL",
      "SQLAlchemy", "Redis", "RabbitMQ", "Linux", "Git",
    ],
  },
  {
    id: "dib3",
    company: t("СПб ГБУЗ Детская инфекционная больница №3", "Children's Infectious Diseases Hospital No. 3"),
    companyNote: t("Государственное медицинское учреждение", "State healthcare institution"),
    position: t("Python-разработчик", "Python developer"),
    place: t("Санкт-Петербург", "Saint Petersburg"),
    period: t("Апрель 2022 — Май 2025", "April 2022 — May 2025"),
    duration: t("3 года 2 месяца", "3 yrs 2 mos"),
    start: "2022-04",
    end: "2025-05",
    tags: [t("Техлид команды 3–4 человека", "Tech lead, team of 3–4"), t("Федеральные интеграции", "Federal integrations")],
    site: { label: "dib3.spb.ru", href: "https://dib3.spb.ru/" },
    achievements: [
      t(
        "Построил с нуля автоматизированную систему отправки отчётности в контролирующие ведомства: 200+ документов в месяц обрабатываются без участия человека, доля успешной обработки выросла с ~0% до 80%+",
        "Built regulatory reporting automation from scratch: 200+ documents a month processed with no human involvement, success rate up from ~0% to 80%+",
      ),
      t(
        "Разработал API-интеграцию с федеральной системой экстренной медпомощи (СЭМП): учреждение впервые подключено к федеральному контуру, 100+ врачей и сотрудников получили доступ к актуальным данным",
        "Delivered an API integration with the federal emergency care system (SEMP): the hospital joined the federal network for the first time, giving 100+ doctors and staff access to live data",
      ),
      t(
        'Связал МИС «Самсон» со сторонней больницей через REST API: межбольничный обмен результатами анализов в реальном времени, исключён ручной перенос данных',
        "Connected the Samson medical information system to another hospital over REST API: real-time exchange of test results, manual data transfer eliminated",
      ),
      t(
        "Техлид команды 3–4 человека: декомпозиция задач, код-ревью, координация с медицинским персоналом как заказчиком",
        "Tech lead of a 3–4 person team: task breakdown, code review, working with medical staff as the client",
      ),
    ],
    duties: [
      t(
        'Разрабатывал и оптимизировал кодовую базу на Python для автоматизации процессов в медицинском ПО «Самсон»',
        "Developed and optimised the Python codebase automating processes in the Samson medical software",
      ),
      t(
        "Управлял и поддерживал веб-ресурс больницы: разработка, обновление, SEO-оптимизация, защита данных",
        "Ran and maintained the hospital website: development, updates, SEO, data protection",
      ),
      t(
        "Интегрировал внешние системы через REST API для взаимодействия с медицинскими платформами",
        "Integrated external systems over REST API to work with medical platforms",
      ),
      t(
        "Настроил и доработал приложение генерации документов на FastAPI",
        "Set up and extended the document generation service on FastAPI",
      ),
      t(
        "Поддерживал IT-инфраструктуру: диагностика, устранение ошибок, стабильная работа серверных решений",
        "Supported the IT infrastructure: diagnostics, troubleshooting, keeping server systems stable",
      ),
    ],
    stack: ["Python", "FastAPI", "Asyncio", "PostgreSQL", "SQLAlchemy", "Redis", "Docker", "Git"],
  },
];

/* ------------------------------------------------------------------ cases */

export type Case = {
  id: string;
  at: L;
  title: L;
  problem: L;
  action: L;
  result: L;
  chart: {
    unit: L;
    before: number;
    after: number;
    beforeLabel: L;
    afterLabel: L;
    /** true when a lower number is the better one */
    lowerIsBetter: boolean;
  };
  tech: string[];
};

export const cases: Case[] = [
  {
    id: "events",
    at: t("Квантрон", "Kvantron"),
    title: t("Синхронный REST → событийная модель", "Synchronous REST → event-driven"),
    problem: t(
      "Пять микросервисов ходили друг к другу синхронно по REST. Каждый вызов ждал ответа соседа, медленный сервис тормозил всю цепочку, под нагрузкой копились таймауты.",
      "Five microservices called each other synchronously over REST. Every call waited on its neighbour, one slow service stalled the whole chain, and timeouts piled up under load.",
    ),
    action: t(
      "Перевёл межсервисное взаимодействие на события через RabbitMQ: выделил контракты сообщений, добавил очереди с ретраями и разнёс долгие операции в асинхронные потребители.",
      "Moved inter-service communication to events over RabbitMQ: defined message contracts, added queues with retries, and pushed long operations into asynchronous consumers.",
    ),
    result: t(
      "Средняя задержка упала с 800 мс до 450 мс, количество таймаутов снизилось на 90%. Отказ одного сервиса перестал останавливать остальные.",
      "Average latency dropped from 800 ms to 450 ms and timeouts fell by 90%. One service failing no longer stops the rest.",
    ),
    chart: {
      unit: t("мс", "ms"),
      before: 800,
      after: 450,
      beforeLabel: t("Было", "Before"),
      afterLabel: t("Стало", "After"),
      lowerIsBetter: true,
    },
    tech: ["RabbitMQ", "FastAPI", "Async/Await", "Python"],
  },
  {
    id: "postgres",
    at: t("Квантрон", "Kvantron"),
    title: t("Профилирование PostgreSQL", "PostgreSQL profiling"),
    problem: t(
      "Ключевые эндпоинты отвечали 1,5 секунды. В планах запросов — последовательные сканы и классический N+1 на связанных сущностях.",
      "Key endpoints answered in 1.5 seconds. Query plans showed sequential scans and a classic N+1 on related entities.",
    ),
    action: t(
      "Разобрал планы выполнения, добавил композитные индексы под реальные фильтры, переписал JOIN-запросы и убрал N+1 на уровне SQLAlchemy.",
      "Read the execution plans, added composite indexes matching the real filters, rewrote the JOINs and removed the N+1 at the SQLAlchemy level.",
    ),
    result: t(
      "Время ответа ключевых эндпоинтов — 400 мс вместо 1,5 с. Почти четырёхкратное ускорение без изменения инфраструктуры.",
      "Key endpoints now answer in 400 ms instead of 1.5 s — close to a fourfold speed-up with no infrastructure changes.",
    ),
    chart: {
      unit: t("мс", "ms"),
      before: 1500,
      after: 400,
      beforeLabel: t("Было", "Before"),
      afterLabel: t("Стало", "After"),
      lowerIsBetter: true,
    },
    tech: ["PostgreSQL", "SQLAlchemy", "EXPLAIN ANALYZE"],
  },
  {
    id: "redis",
    at: t("Квантрон", "Kvantron"),
    title: t("Кеширование справочников в Redis", "Reference data caching in Redis"),
    problem: t(
      "Справочники и повторяющиеся выборки запрашивались из PostgreSQL на каждый запрос. База становилась узким местом, время ответа плавало под нагрузкой.",
      "Reference tables and repeated selects hit PostgreSQL on every request. The database became the bottleneck and response time drifted under load.",
    ),
    action: t(
      "Внедрил кеширование справочников и результатов запросов в Redis с продуманной инвалидацией по ключам и TTL под характер данных.",
      "Introduced Redis caching for reference data and query results, with key-based invalidation and TTLs matched to how the data actually changes.",
    ),
    result: t(
      "Обращений к PostgreSQL стало на 60% меньше, время ответа API стабилизировалось на 200 мс под нагрузкой.",
      "PostgreSQL round trips fell by 60% and API response time settled at 200 ms under load.",
    ),
    chart: {
      unit: t("% запросов в БД", "% of DB calls"),
      before: 100,
      after: 40,
      beforeLabel: t("Было", "Before"),
      afterLabel: t("Стало", "After"),
      lowerIsBetter: true,
    },
    tech: ["Redis", "PostgreSQL", "FastAPI"],
  },
  {
    id: "observability",
    at: t("Квантрон", "Kvantron"),
    title: t("Логи и метрики вместо догадок", "Logs and metrics instead of guesswork"),
    problem: t(
      "Инцидент означал ручной поиск по логам на разных машинах. Средняя диагностика занимала около трёх часов.",
      "An incident meant grepping logs by hand across machines. Diagnosis took around three hours on average.",
    ),
    action: t(
      "Настроил централизованное логирование в ELK и дашборды в Grafana: latency, error rate, длина очередей RabbitMQ.",
      "Set up centralised logging in ELK and Grafana dashboards: latency, error rate and RabbitMQ queue depth.",
    ),
    result: t(
      "Среднее время диагностики инцидента — 45 минут вместо 3 часов. Деградацию очередей стало видно до того, как её заметят пользователи.",
      "Average incident diagnosis is now 45 minutes instead of 3 hours, and queue degradation shows up before users notice it.",
    ),
    chart: {
      unit: t("минут на диагностику", "minutes to diagnose"),
      before: 180,
      after: 45,
      beforeLabel: t("Было", "Before"),
      afterLabel: t("Стало", "After"),
      lowerIsBetter: true,
    },
    tech: ["ELK", "Grafana", "RabbitMQ", "Linux"],
  },
  {
    id: "reporting",
    at: t("Детская инфекционная больница №3", "Children's Hospital No. 3"),
    title: t("Отчётность в ведомства без человека", "Regulatory reporting, hands-free"),
    problem: t(
      "Отчётность в контролирующие ведомства собиралась и отправлялась вручную. Автоматически проходило около нуля документов.",
      "Reports to regulators were assembled and submitted by hand. Practically nothing went through automatically.",
    ),
    action: t(
      "Построил с нуля систему на Python и FastAPI: сбор данных из МИС, генерация документов, отправка и разбор ответов ведомств.",
      "Built a system from scratch on Python and FastAPI: pulling data from the medical system, generating documents, submitting them and parsing the responses.",
    ),
    result: t(
      "200+ документов в месяц обрабатываются без участия человека, доля успешной обработки выросла с ~0% до 80%+.",
      "200+ documents a month are processed with no human involvement, and the success rate went from ~0% to 80%+.",
    ),
    chart: {
      unit: t("% успешной обработки", "% processed successfully"),
      before: 0,
      after: 80,
      beforeLabel: t("Было", "Before"),
      afterLabel: t("Стало", "After"),
      lowerIsBetter: false,
    },
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker"],
  },
];

/* ------------------------------------------------------------------ stack */

export type SkillGroup = {
  id: string;
  label: L;
  items: { name: string; note: L }[];
};

export const stack: SkillGroup[] = [
  {
    id: "backend",
    label: t("Сервисы", "Services"),
    items: [
      { name: "Python", note: t("основной язык, 4+ года", "main language, 4+ years") },
      { name: "FastAPI", note: t("основной фреймворк сервисов и API", "main framework for services and APIs") },
      { name: "Async/Await", note: t("асинхронные обработчики и воркеры", "async handlers and workers") },
      { name: "REST API", note: t("проектирование и интеграции", "design and integrations") },
      { name: "Django", note: t("поддержка и доработка проектов", "maintaining and extending projects") },
      { name: "gRPC", note: t("межсервисное взаимодействие", "service-to-service communication") },
      { name: "ООП", note: t("структура кодовой базы", "how the codebase is structured") },
    ],
  },
  {
    id: "data",
    label: t("Данные", "Data"),
    items: [
      { name: "PostgreSQL", note: t("индексы, планы запросов, транзакции", "indexes, query plans, transactions") },
      { name: "SQLAlchemy", note: t("ORM и устранение N+1", "ORM and N+1 elimination") },
      { name: "Redis", note: t("кеш справочников, −60% запросов в БД", "reference cache, −60% DB calls") },
      { name: "MySQL", note: t("поддержка legacy-хранилищ", "legacy storage support") },
    ],
  },
  {
    id: "messaging",
    label: t("Обмен", "Messaging"),
    items: [
      { name: "RabbitMQ", note: t("событийная модель, 800 → 450 мс", "event-driven model, 800 → 450 ms") },
      { name: "Apache Kafka", note: t("потоковая обработка событий", "event streaming") },
    ],
  },
  {
    id: "infra",
    label: t("Инфраструктура", "Infrastructure"),
    items: [
      { name: "Docker", note: t("упаковка и запуск сервисов", "packaging and running services") },
      { name: "Kubernetes", note: t("оркестрация контейнеров", "container orchestration") },
      { name: "CI/CD", note: t("пайплайны деплоя", "deployment pipelines") },
      { name: "Linux", note: t("рабочая и серверная среда", "everyday and server environment") },
      { name: "Git", note: t("ветвление, код-ревью", "branching, code review") },
      { name: "Pytest", note: t("unit-тесты сервисов", "unit tests for services") },
    ],
  },
];

/* -------------------------------------------------------------- education */

export type Study = {
  year: string;
  degree: L;
  school: L;
  faculty: L;
};

export const education: Study[] = [
  {
    year: "2024",
    degree: t("Магистр", "Master's"),
    school: t(
      "Санкт-Петербургский национальный исследовательский университет ИТМО",
      "ITMO University, Saint Petersburg",
    ),
    faculty: t(
      "Факультет технологического менеджмента и инноваций, Инноватика",
      "Faculty of Technological Management and Innovation, Innovation Studies",
    ),
  },
  {
    year: "2022",
    degree: t("Магистр и бакалавр", "Master's and bachelor's"),
    school: t(
      "Санкт-Петербургский государственный экономический университет",
      "Saint Petersburg State University of Economics",
    ),
    faculty: t("Факультет управления, Менеджмент", "Faculty of Management, Management"),
  },
];

export const languages: { name: L; level: L }[] = [
  { name: t("Русский", "Russian"), level: t("Родной", "Native") },
  { name: t("Английский", "English"), level: t("B2 — средне-продвинутый", "B2 — upper intermediate") },
];

/* ------------------------------------------------------------ ui strings */

export const ui = {
  nav: {
    about: t("О себе", "About"),
    experience: t("Опыт", "Experience"),
    cases: t("Кейсы", "Cases"),
    api: t("API", "API"),
    stack: t("Стек", "Stack"),
    education: t("Образование", "Education"),
    contact: t("Контакты", "Contact"),
  },
  hero: {
    scroll: t("Листайте", "Scroll"),
    traceTitle: t("Один запрос через пять сервисов", "One request across five services"),
    traceBefore: t("До рефакторинга", "Before the refactor"),
    traceAfter: t("После перехода на RabbitMQ", "After moving to RabbitMQ"),
    replay: t("Проиграть заново", "Replay"),
    writeTg: t("Написать в Telegram", "Message on Telegram"),
    call: t("Позвонить", "Call"),
  },
  impact: {
    eyebrow: t("Результаты в цифрах", "Impact in numbers"),
    note: t(
      "Цифры из резюме — результаты измеримых изменений, а не оценки",
      "The numbers below are measured outcomes, not estimates",
    ),
  },
  about: {
    eyebrow: t("О себе", "About"),
    heading: t("Бэкенд, который не приходится чинить по ночам", "Backend you don't have to fix at night"),
  },
  experience: {
    eyebrow: t("Опыт работы", "Experience"),
    heading: t("Где и что я строил", "Where I built things"),
    achievements: t("Результаты", "Results"),
    duties: t("Обязанности", "Responsibilities"),
    stack: t("Стек", "Stack"),
    present: t("по настоящее время", "present"),
  },
  cases: {
    eyebrow: t("Разбор задач", "Case studies"),
    heading: t("Было → стало", "Before → after"),
    problem: t("Задача", "Problem"),
    action: t("Что сделал", "What I did"),
    result: t("Результат", "Outcome"),
    better: t("лучше", "better"),
  },
  api: {
    eyebrow: t("Тот же профиль, машиночитаемо", "The same profile, machine readable"),
    heading: t("Запросите что угодно", "Query anything"),
    hint: t("Выберите эндпоинт", "Pick an endpoint"),
    sending: t("Запрос отправлен", "Request sent"),
    time: t("время", "time"),
  },
  stack: {
    eyebrow: t("Инструменты", "Tools"),
    heading: t("Чем пользуюсь", "What I work with"),
    all: t("Всё", "All"),
    hint: t("Контекст применения — под каждым названием", "Context of use sits under each name"),
  },
  education: {
    eyebrow: t("Образование", "Education"),
    heading: t("Учился управлять и строить", "Trained to manage and to build"),
    languages: t("Языки", "Languages"),
  },
  contact: {
    eyebrow: t("Контакты", "Contact"),
    heading: t("Давайте поговорим", "Let's talk"),
    copy: t("Скопировать", "Copy"),
    copied: t("Скопировано", "Copied"),
    marquee: t("Открыт к предложениям", "Open to offers"),
  },
};

/** Sections in scroll order, used by the rail and the scroll spy. */
export const sections = [
  { id: "about", label: ui.nav.about },
  { id: "experience", label: ui.nav.experience },
  { id: "cases", label: ui.nav.cases },
  { id: "api", label: ui.nav.api },
  { id: "stack", label: ui.nav.stack },
  { id: "education", label: ui.nav.education },
  { id: "contact", label: ui.nav.contact },
] as const;
