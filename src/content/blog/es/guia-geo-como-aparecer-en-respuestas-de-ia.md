---
title: "GEO: cómo lograr que los asistentes de IA recomienden tu empresa"
description: "Guía práctica de GEO: cómo eligen ChatGPT, Gemini, Perplexity y Copilot a qué empresas mencionar y citar, qué corregir primero y cómo medirlo cada mes."
dek: "Cada vez más clientes le preguntan a un asistente a quién contratar, y tú no ves lo que les responde. Cómo eligen estos sistemas, qué los mueve de verdad y cómo medirlo sin adivinar."
date: 2026-11-02
lang: es
translationKey: generative-engine-optimization-guide
unit: growth
tags:
  - geo
  - búsqueda con ia
  - seo
featured: true
readingMinutes: 10
takeaways:
  - "Los asistentes que navegan se alimentan de índices de búsqueda. Si estás débil en buscadores, estás débil en respuestas de IA: el GEO empieza por el SEO básico."
  - "Sé una sola entidad clara: el mismo nombre, descripción y datos en tu sitio, perfiles y directorios. La inconsistencia hace que sea fácil dejarte fuera."
  - "Las menciones de terceros pesan más que cualquier cosa que digas de ti. Reseñas, listados, prensa y comunidades son el trabajo de fondo."
  - "Revisa tu robots.txt antes que nada. Los rastreadores de búsqueda y los de entrenamiento son distintos, y bloquear el equivocado te saca de las respuestas."
  - "Mide cada mes un conjunto fijo de preguntas de clientes: mención, cita, posición y tono. Espera cambios en trimestres, no en semanas."
faq:
  - q: "¿Cuánto tarda el GEO en dar resultados?"
    a: "Los ajustes técnicos, como permitir el acceso a un rastreador de búsqueda, pueden notarse en pocas semanas, cuando el índice del asistente se actualiza. Lo que depende de otros sitios, como reseñas nuevas, directorios o prensa, tarda más, porque esas páginas tienen que publicarse, rastrearse y ganar peso. Evalúa el avance por trimestre, con una medición mensual de las mismas preguntas para ver cuáles se movieron y cuáles no."
  - q: "¿Conviene bloquear GPTBot y otros rastreadores de entrenamiento?"
    a: "Es una decisión sobre el uso de tu contenido, no sobre visibilidad. En el caso de OpenAI, bloquear GPTBot te excluye del entrenamiento de modelos, mientras que OAI-SearchBot define si puedes aparecer en las respuestas de búsqueda de ChatGPT. Muchas empresas que quieren ser recomendadas permiten los rastreadores de búsqueda y deciden aparte sobre los de entrenamiento. Tómala a conciencia y déjala documentada, porque el bloqueo de bots con un solo interruptor de algunos CDN y servicios de hosting puede bloquear más de lo que crees."
  - q: "¿El marcado schema hace que la IA nos cite?"
    a: "Los datos estructurados ayudan a que las máquinas lean datos como nombre, dirección, horarios y servicios, y sirven para los resultados enriquecidos en la búsqueda normal. Google dice que no se necesita un schema especial para aparecer en sus funciones de IA, y ningún proveedor ha dicho que el marcado por sí solo consiga citas. Tómalo como higiene básica: correcto, igual a lo visible en la página y actualizado."
author: sandbox
---

La gerente de una planta de alimentos en Monterrey necesita un nuevo proveedor de mantenimiento. No abre Google. Le escribe a ChatGPT: "¿Qué empresas de mantenimiento industrial en Monterrey trabajan con bandas transportadoras y responden en menos de 24 horas?". Recibe tres nombres, una línea sobre cada uno y un par de enlaces. Les escribe por WhatsApp a dos.

Si tu empresa era la cuarta opción, nunca te vas a enterar. No hay un clic perdido en tu analítica ni una impresión en ningún tablero. La decisión se tomó dentro de una respuesta que no viste.

La optimización para motores generativos (GEO, por sus siglas en inglés) es el trabajo de entrar en esa respuesta. Atrae más promesas de las que merece, así que aquí va lo que está documentado, qué corregiríamos primero y cómo medirlo con honestidad.

## Cómo decide un asistente a quién mencionar

Un asistente puede responder desde dos lugares. El primero es lo que el modelo absorbió en su entrenamiento: una memoria comprimida y con fecha de corte de la web. El segundo es la búsqueda en vivo: el asistente hace consultas, lee unas cuantas páginas y redacta una respuesta basada en ellas, casi siempre con citas.

En preguntas del tipo "a quién contrato", manda la búsqueda en vivo, y esa búsqueda corre sobre índices. La búsqueda de ChatGPT combina el rastreador de búsqueda de OpenAI con proveedores de búsqueda externos, Perplexity rastrea la web para sus propios resultados, Copilot de Microsoft se apoya en Bing, y los AI Overviews y el Modo IA de Google se apoyan en la Búsqueda de Google. Google describe una técnica de ["expansión de consultas" (query fan-out)](https://developers.google.com/search/docs/appearance/ai-features?hl=es): el sistema lanza varias búsquedas relacionadas sobre subtemas y arma la respuesta con páginas de apoyo de todas ellas.

A partir de ahí, unas pocas cosas deciden si tu nombre llega a la respuesta final:

- **Claridad como entidad.** El sistema tiene que entender que tu nombre comercial, tu razón social y tu dominio son la misma empresa, y qué hace esa empresa.
- **Consenso entre fuentes.** Una empresa descrita igual en su sitio, en dos directorios, en el directorio de socios de una cámara industrial y en sus reseñas parece una recomendación más segura que una que solo habla de sí misma.
- **Contenido que se puede citar.** Las páginas que dicen las cosas concretas con claridad (zona de servicio, tiempos de respuesta, industrias, qué incluye) son fáciles de llevar a una respuesta. Las páginas hechas de eslóganes, no.
- **Actualidad.** En todo lo que cambia con el tiempo, las páginas actualizadas y las reseñas recientes suelen ganarle a lo viejo.

Ningún proveedor importante publica una fórmula para esto; quien diga tenerla está adivinando. Lo documentado es la infraestructura: rastreadores, índices y búsqueda.

## El GEO es casi todo SEO, con otro marcador

La verdad incómoda para quien vende el GEO como una disciplina aparte: Google dice con todas sus letras que [no hay requisitos adicionales ni optimizaciones especiales](https://developers.google.com/search/docs/appearance/ai-features?hl=es) para aparecer en AI Overviews o en el Modo IA. La página tiene que estar indexada y poder mostrarse con fragmento en la Búsqueda normal. Aplican los mismos fundamentos: páginas rastreables, enlaces internos, contenido importante en texto y datos estructurados que coincidan con lo visible.

Así que, si tu SEO está flojo, arregla eso primero. Pero hay tres cosas que sí cambian:

| | SEO clásico | GEO |
|---|---|---|
| Unidad de trabajo | Palabras clave | Preguntas completas de clientes, a menudo largas y específicas |
| Qué cuenta como éxito | Una posición y un clic | Que te nombren, te citen y te describan bien en la respuesta |
| Qué contenido importa | Sobre todo el tuyo | El tuyo, más cada página de terceros que el asistente lee sobre ti |

En la tercera fila está la mayor parte del trabajo nuevo. Un asistente que responde "mejor empresa de mantenimiento industrial en Monterrey" puede citar un directorio, el sitio de una cámara y una plataforma de reseñas, nunca tu página de inicio, y decidir con eso si te menciona.

## Sé una sola entidad clara

Empieza con un inventario de cada lugar donde aparece descrita tu empresa: tu sitio, el Perfil de Empresa de Google, LinkedIn, Bing Places, directorios de la industria, cámaras, plataformas de reseñas. Después compáralos.

> **Ejemplo:** Una empresa hipotética de 40 personas encuentra cinco versiones de sí misma. El sitio dice "mantenimiento industrial y automatización". LinkedIn dice "servicios de ingeniería". Un directorio muestra una dirección vieja; otro solo menciona aire acondicionado. Un asistente que lee esas fuentes no tiene una imagen estable de qué hace la empresa ni dónde, así que recomienda a un competidor cuyas descripciones coinciden.

La solución es poco glamorosa y funciona:

1. Escribe una descripción canónica: razón social, nombre comercial, resumen de una frase, servicios, industrias, zona de servicio, año de fundación y datos de contacto.
2. Haz que tu página "Nosotros" y tu página de inicio digan esos datos en texto plano.
3. Actualiza cada perfil para que coincida, empezando por los que aparecen cuando alguien busca tu marca.
4. Agrega datos estructurados de Organization o LocalBusiness que reflejen lo visible, con enlaces `sameAs` a tus perfiles oficiales.
5. Agenda una revisión periódica. Los directorios se desactualizan solos.

## Escribe páginas que un asistente pueda citar

Los asistentes responden preguntas, así que las páginas con forma de respuesta son las que se usan. Compara dos versiones de una página de servicios:

> **Ejemplo:** Versión A: "Ofrecemos soluciones de mantenimiento de clase mundial adaptadas a tus necesidades". Versión B: "Damos mantenimiento a bandas transportadoras, empacadoras y paletizadoras para plantas de alimentos y bebidas a menos de 250 km de Monterrey. En emergencias llegamos a planta en menos de 24 horas; el mantenimiento preventivo se programa mensual o trimestral".

La versión B se puede citar en la respuesta a la pregunta de la gerente de planta. La versión A no responde a ninguna pregunta.

Lo que construiríamos, en este orden:

- **Una página por servicio principal** que diga para quién es, qué incluye, dónde operas y cómo funciona, en los dos primeros párrafos.
- **Páginas comparativas** para las decisiones que tus clientes realmente evalúan: equipo interno contra tercerizar, tu enfoque contra la alternativa común. Sé justo: una comparación que solo te favorece se lee como anuncio.
- **Unas preguntas frecuentes de verdad**, armadas con lo que tu equipo de ventas escucha cada semana, respondidas en tres o cuatro frases.
- **Datos concretos en todas partes.** Cifras que puedas sostener, industrias con nombre, ciudades con nombre, plazos claros. La investigación académica apunta en la misma dirección: en el [artículo original sobre GEO](https://arxiv.org/abs/2311.09735), investigadores de Princeton y del IIT Delhi reescribieron páginas sobre un conjunto de consultas de prueba y encontraron que citar fuentes, agregar citas textuales y agregar estadísticas fueron los cambios más efectivos para la visibilidad en respuestas generadas. Es un entorno de laboratorio, no una garantía, pero la dirección es clara: lo específico le gana a lo vago.

La trampa es producir cientos de páginas de relleno, una para cada pregunta posible. Esa es la receta de las granjas de contenido, y falla en las respuestas de IA por la misma razón que falla en buscadores. Si vas a escalar contenido con IA, importa más el sistema que el volumen; lo explicamos en [contenido con IA sin sonar a robot](/es/blog/contenido-con-ia-sin-sonar-a-robot/).

## Gánate las menciones que no puedes escribir tú

Es la parte más lenta, y la que separa a las empresas que los asistentes recomiendan de las que ignoran. Tu propio sitio es apenas un voto. Dónde pondríamos el esfuerzo, en el orden en que solemos atacarlo:

- **Reseñas en las plataformas de tu categoría.** Google para servicios locales, G2 o Capterra para software, sitios especializados donde existan. Pídelas a cada cliente satisfecho, de forma constante. Si tus clientes te hablan por WhatsApp, como pasa en buena parte de Latinoamérica, manda por ahí el enlace directo a tu perfil de reseñas al cerrar cada trabajo. Importan el volumen y lo reciente.
- **Listados y directorios que aparecen para tu categoría.** Busca las preguntas principales de tus clientes y mira qué páginas de terceros salen. Esas son las que probablemente leen los asistentes. Aparecer ahí, con datos correctos, muchas veces es un formulario y un correo.
- **Prensa especializada y cámaras.** Una opinión citada en una publicación del sector, una charla en un evento de la cámara, tu ficha de socio.
- **Comunidades.** Foros, hilos de Reddit y grupos profesionales donde los compradores piden recomendaciones. Participa como una persona que sabe del tema, no como una marca que deja enlaces, o te sale al revés.

## Acceso técnico: deja entrar a los rastreadores correctos

Antes de tocar contenido, revisa tu robots.txt y la configuración de bots de tu CDN o firewall. Algunos CDN y servicios de hosting ofrecen bloquear los bots de IA con un solo interruptor, y es fácil activarlo sin darse cuenta de que también te saca de las respuestas de IA.

La clave: los proveedores separan sus rastreadores por propósito. Bloquear el entrenamiento no tiene por qué significar desaparecer de las respuestas.

| Proveedor | Búsqueda / respuestas | Entrenamiento de modelos | Visitas pedidas por un usuario |
|---|---|---|---|
| OpenAI | OAI-SearchBot | GPTBot | ChatGPT-User |
| Anthropic | Claude-SearchBot | ClaudeBot | Claude-User |
| Perplexity | PerplexityBot | (no se usa para entrenamiento) | Perplexity-User |
| Google | Googlebot (Búsqueda, AI Overviews, Modo IA) | Google-Extended (un token de robots.txt) | — |

Según la [documentación de OpenAI](https://developers.openai.com/api/docs/bots), los sitios que bloquean OAI-SearchBot no se muestran en las respuestas de búsqueda de ChatGPT (aunque pueden seguir apareciendo como simples enlaces de navegación), mientras que bloquear GPTBot indica que el contenido no debe usarse para entrenamiento. [Anthropic](https://support.claude.com/es/articles/8896518) documenta la misma separación, y Perplexity aclara que PerplexityBot no rastrea contenido para entrenar modelos fundacionales. Las visitas que pide un usuario son otra cosa: OpenAI y Perplexity aclaran que robots.txt puede no aplicar cuando una persona le pide al asistente abrir una página. Google indica que [Google-Extended](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers?hl=es) no afecta la inclusión ni el posicionamiento en la Búsqueda de Google; controla el uso de tu contenido para los modelos Gemini y para fundamentar respuestas fuera de la Búsqueda.

Un robots.txt para una empresa que quiere ser recomendada pero no quiere entrar al entrenamiento podría verse así:

```text
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

Bloquear o no el entrenamiento es una decisión de negocio; tómala a propósito. OpenAI y Perplexity indican que los cambios pueden tardar hasta unas 24 horas en registrarse. Asegúrate también de que el contenido clave esté en el HTML, no solo generado por scripts ni encerrado en PDF, y mantén tu sitemap al día.

> **Nota:** Vas a escuchar que todo sitio necesita un archivo llms.txt. Es una [propuesta](https://llmstxt.org/) de 2024 para un archivo en Markdown que señala a las herramientas de IA el contenido clave de un sitio. Agregarlo cuesta poco y puede ayudar a las herramientas que lo leen, pero es una convención de la comunidad, no un estándar, y Google dice que no se necesitan archivos de texto especiales para sus funciones de IA. Agrégalo si quieres. No esperes que cambie las recomendaciones.

## Mide con un conjunto fijo de preguntas

No puedes gestionar algo que solo revisas cuando alguien te reenvía una captura de pantalla. El método que usamos: un banco fijo de preguntas, formuladas igual cada mes.

Arma entre 20 y 40 preguntas con el lenguaje real de tus clientes: notas de llamadas de venta, tickets de soporte, consultas de Search Console, mensajes que llegan por WhatsApp. Combina tres tipos: preguntas de categoría ("mejor X para Y"), comparaciones ("X o Y") y preguntas de problema, donde tu servicio es una de varias respuestas posibles. Luego haz cada pregunta en los asistentes que usan tus clientes y registra cuatro cosas:

```text
Pregunta: ¿Qué empresas de mantenimiento industrial en Monterrey trabajan con bandas transportadoras?
Asistente: ChatGPT (búsqueda activada) | Fecha: 2026-11-02 | Intento: 1 de 3
Mención:     sí / no
Cita:        sí / no   (qué URL: nuestra / directorio / reseñas / otra)
Posición:    1.º, 2.º, 3.º… entre las empresas nombradas
Tono:        positivo / neutral / negativo / incorrecto
Fuentes citadas en la respuesta: ...
```

Las respuestas varían de un intento a otro, así que haz cada pregunta más de una vez y usa sesiones limpias o sin iniciar sesión cuando puedas. Mide el porcentaje de preguntas en las que apareces, no respuestas sueltas, y haz la primera medición antes de cambiar nada, por la razón que damos en [cómo medir el ROI de la IA sin engañarte](/es/blog/como-medir-el-roi-de-la-ia/): sin un antes, cada después es una opinión. Y lee las fuentes citadas cada vez: son tu lista de pendientes. Si sigue apareciendo un directorio en el que no estás, esa es la tarea de la semana siguiente.

Es la misma lógica de la simulación de nuestra página de inicio, que muestra [cómo un asistente lee fuentes y elige nombres](/es/#geo). Bing Webmaster Tools también tiene un reporte de rendimiento en IA (AI Performance, en versión preliminar pública desde febrero de 2026) que cuenta cuántas veces se citan tus páginas en Copilot y en los resúmenes con IA de Bing. Es gratis y vale la pena conectarlo si tus clientes trabajan con productos de Microsoft.

## Por dónde empezaríamos

Si tuviéramos un mes y una empresa con un SEO aceptable pero sin visibilidad en IA, este sería el orden:

1. **Semana 1:** corregir el acceso de los rastreadores y escribir la descripción canónica de la entidad. Hacer la primera medición del banco de preguntas como línea base.
2. **Semana 2:** actualizar cada perfil y directorio para que coincidan. Agregar datos estructurados que reflejen lo visible.
3. **Semana 3:** reescribir las páginas de servicios principales y las preguntas frecuentes para responder directo a las preguntas clave de tus clientes. Arreglar una página comparativa.
4. **Semana 4:** arrancar el plan de terceros: un proceso para pedir reseñas, los cinco directorios más citados donde no estás y una propuesta a una publicación del sector.

Después, mide cada mes y deja que las fuentes citadas te digan qué sigue. Nadie puede garantizar una cita; los asistentes cambian su forma de responder sin aviso. Lo que sí controlas es si eres rastreable, consistente, citable y mencionado por otros. Ahí está la mayor parte del trabajo. Si tienes una agencia y quieres ofrecer esto a tus propios clientes, explicamos el modelo de entrega en [cómo una agencia puede vender servicios de IA sin armar un equipo de IA](/es/blog/ia-marca-blanca-para-agencias/).

Si quieres una línea base de tu propia categoría, así empieza nuestro trabajo de [Visibilidad en buscadores de IA (GEO)](/es/services/growth/): un banco de preguntas construido con las consultas reales de tus clientes y una foto medida de dónde estás hoy.
