---
title: "Por qué se estancan los pilotos de IA y cómo llevarlos a producción"
description: "Por qué los pilotos de IA se estancan después de una buena demo, qué dicen de verdad los estudios y cinco decisiones antes de construir. Con checklist de una página."
dek: "La demo funcionó. Tres meses después, el equipo sigue trabajando como antes. El limbo de los pilotos casi nunca es culpa del modelo: viene de decisiones que nadie tomó antes de empezar."
date: 2026-11-02
lang: es
translationKey: why-ai-pilots-stall
unit: consulting
tags:
  - estrategia de ia
  - pilotos de ia
  - gestión del cambio
readingMinutes: 9
takeaways:
  - "La mayoría de los pilotos estancados no fracasan: simplemente nunca reemplazan nada. Las causas suelen ser de organización más que técnicas."
  - "Las tasas de fracaso que circulan (80%, 95%) tienen matices importantes. Lee el método antes de repetir la cifra."
  - "Toma cinco decisiones antes de construir: un responsable, un número, datos y permisos reales, un camino para las excepciones y una fecha de cambio."
  - "Un piloto sin fecha para dejar el proceso anterior es un experimento sin final, y compite para siempre con la costumbre."
  - "Si no puedes llenar el checklist de una página de abajo, todavía no estás listo para construir. Estás listo para una auditoría."
faq:
  - q: "¿Cuánto tiempo debe durar un piloto de IA antes de decidir?"
    a: "Lo suficiente para ver volumen real y lo bastante corto para que nadie olvide por qué empezó. Para un solo proceso planeamos una o dos semanas de preparación con datos reales y unas dos en modo sombra, así que un primer agente suele estar funcionando en tres a cinco semanas. Después, dale un mes con el volumen completo y compáralo con la línea base. Si para entonces el número no se movió, el problema suele ser la métrica o el volumen, y más semanas no lo van a arreglar."
  - q: "¿Conviene reiniciar un piloto estancado o cerrarlo?"
    a: "Pásalo por las cinco decisiones. Si hoy puedes nombrar un responsable, un número con línea base y una fecha de cambio, reinícialo con eso definido; buena parte de lo construido suele servir. Si nadie lo quiere asumir, o el número que movería no le importa a nadie en la dirección, ciérralo a propósito y explica por qué. Un cierre limpio cuesta menos que un piloto que sigue vivo un año."
  - q: "¿Hay que limpiar los datos antes de cualquier piloto de IA?"
    a: "Normalmente no como proyecto aparte. Los datos desordenados son lo normal: clientes duplicados, códigos de producto escritos de tres formas, PDF que en realidad son fotos. Resolver eso es parte de la construcción, y la bandeja de excepciones atrapa lo que las reglas no cubren. Limpia solo lo que bloquea el proceso que vas a pilotear. Una limpieza de meses antes de que alguien vea un resultado es de las formas más seguras de estancarse."
author: sandbox
---

La demo sale bien. Alguien reenvía un correo desordenado de un cliente y, treinta segundos después, la IA ya identificó el pedido, encontró los productos y redactó la respuesta. En la sala, todos se inclinan hacia la pantalla. El director de operaciones dice: "hagamos un piloto".

Doce semanas después, el piloto sigue corriendo, y el proceso de siempre también. La coordinadora revisa cada resultado de la IA y luego ingresa el pedido ella misma en el ERP, porque la integración "ya viene". Nadie canceló nada. Tampoco salió nada a producción.

Esto es el limbo de los pilotos, y es la forma más común en que vemos terminar los proyectos de IA en empresas medianas: no con un fracaso que alguien pueda señalar, sino apagándose poco a poco. Las causas son predecibles. Casi todas se resuelven, o se quedan sin resolver, antes de que alguien escriba el primer prompt.

## Qué dicen los estudios, y qué no dicen

Seguramente ya viste las cifras de los titulares. Léelas con cuidado antes de repetirlas frente a la junta directiva.

Un [informe de RAND de 2024](https://www.rand.org/pubs/research_reports/RRA2680-1.html), basado en entrevistas con 65 científicos de datos e ingenieros con experiencia, abre diciendo que, según algunas estimaciones, más del 80% de los proyectos de IA fracasan. Esa cifra viene de estimaciones de otros, no es una medición de RAND. Lo valioso son las entrevistas. Tres de las cinco causas de fondo que identifican los autores no tienen nada que ver con la capacidad del modelo: líderes que entienden o comunican mal el problema, organizaciones que no tienen los datos para resolverlo bien y equipos que persiguen la tecnología de moda en lugar de resolver un problema real para quienes la van a usar.

En 2025 circuló mucho un informe del Project NANDA del MIT que afirmaba que el 95% de las organizaciones no obtiene ningún retorno de la IA generativa. El informe en sí es más modesto. Se presenta como hallazgos preliminares, y su método son entrevistas con personas de 52 organizaciones, una encuesta a 153 líderes en cuatro conferencias del sector y una revisión de más de 300 iniciativas publicadas. "Éxito" quiere decir que usuarios o directivos reportaron un impacto marcado y sostenido en productividad o en resultados financieros, y los autores aclaran que sus cifras son aproximadas, porque se basan en entrevistas y no en reportes de las empresas. Es una definición estrecha y una muestra pequeña. Sirve como señal, no como censo.

Gartner, por su parte, [pronosticó en julio de 2024](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025) que al menos el 30% de los proyectos de IA generativa se abandonarían después de la prueba de concepto a finales de 2025, por mala calidad de datos, controles de riesgo insuficientes, costos crecientes o valor de negocio poco claro. Es un pronóstico, no un conteo.

Más allá de los porcentajes, lo útil son las causas que nombran estas fuentes: problemas mal definidos, datos que faltan, valor poco claro, riesgos que nadie previó, herramientas que no encajan con cómo se trabaja de verdad. Muy pocas tienen que ver con si el modelo podía hacer la tarea. Los proyectos se estancan en el espacio entre la demo y el trabajo de todos los días.

## Cómo muere una demo que funcionaba

Cuando revisamos un piloto estancado, casi siempre encontramos alguna combinación de estas seis causas. Suelen aparecer en momentos predecibles.

| Causa | Cómo se ve en la semana 8 |
|---|---|
| Nadie a cargo con autoridad | El proyecto tiene un entusiasta al que le gustó la demo, pero nadie que pueda cambiar cómo trabaja el equipo. Las decisiones esperan a la siguiente junta. |
| Sin número de partida | Todos coinciden en que "parece útil". Nadie puede decir si superó al proceso anterior, así que nadie puede justificar el siguiente paso. |
| Datos de juguete | Se construyó con 40 ejemplos escogidos a mano. Los casos reales incluyen PDF escaneados, cadenas reenviadas, audios de WhatsApp y clientes que escriben como quieren. |
| Fuera del flujo de trabajo | Los resultados quedan en otra herramienta. La gente copia y pega, lo que agrega un paso en lugar de quitarlo. |
| Sin diseño para excepciones | El primer caso raro sale mal, alguien toma una captura de pantalla y la confianza cae más rápido de lo que cualquier gráfico de precisión la puede reconstruir. |
| Sin gestión del cambio | La forma anterior sigue funcionando y nadie dijo cuándo se iba a dejar, así que el equipo la sigue usando. |

Fíjate en que solo una de las seis tiene que ver con datos, y ninguna con el modelo que elegiste.

## Cinco decisiones antes de que alguien construya

Cada causa de la tabla corresponde a una decisión. Tómalas por escrito, antes de construir, y el piloto tiene un camino a producción. Sáltalas y lo que tienes es una demo con fecha de caducidad más larga.

### 1. Un responsable, con autoridad sobre el proceso

No un comité ni la persona que encontró la herramienta. El responsable es quien dirige hoy ese proceso: quien puede cambiar la rutina del equipo, aprobar las reglas que sigue la IA y responder "¿esto ya es suficientemente bueno?" sin escalarlo.

> **Regla práctica:** Si el responsable no puede cambiar quién hace qué el lunes por la mañana, es un patrocinador, no un responsable. Necesitas a los dos, pero el piloto vive o muere con el responsable.

### 2. Un número acordado desde el inicio

Elige una métrica principal, mide su línea base antes de empezar y escribe la meta. Suma una métrica de control que no puede empeorar. "Tiempo ahorrado" sirve solo si de verdad mediste el tiempo; si no, usa algo que el sistema ya registra, como el tiempo de la solicitud a la respuesta, las veces que alguien toca cada pedido o la tasa de errores. Lo vemos a fondo en [cómo medir el ROI de la IA sin engañarte](/es/blog/como-medir-el-roi-de-la-ia/).

Escribe también el criterio para detenerlo: "si en la semana cuatro la IA resuelve menos de la mitad de los casos sin corrección, paramos o redefinimos". Un piloto que no puede fracasar tampoco puede tener éxito.

### 3. Datos y permisos reales desde el primer día

Construye sobre el correo real, el WhatsApp del negocio, los documentos reales y una conexión real al sistema principal, con los accesos que tendrá en producción. La revisión de seguridad y de TI se hace ahora, no después de la demo. En nuestra experiencia, los datos que tardan tres meses en estar disponibles son la razón más común por la que un piloto de 4 semanas se convierte en uno de 6 meses.

### 4. El camino de las excepciones, diseñado

Decide qué debe hacer la IA cuando no está segura y quién lo recibe. Cada excepción va a una bandeja con nombre y con el motivo a la vista ("código de producto desconocido", "el precio no coincide con la lista"), para que quien la atiende actúe en segundos. Decide qué acciones necesitan siempre aprobación humana, por lo menos al principio. Las excepciones no son una señal de que el sistema falló. Son parte del sistema, y se diseñan como tal.

### 5. Una fecha en que reemplaza al proceso anterior

Es la decisión que más se salta y la que más pesa. Fija la fecha en que se deja la forma anterior: cambia la regla del correo, desaparece la carga manual, el rol del equipo pasa a revisar excepciones. Avísale al equipo con tiempo, explica qué cambia para cada quien y capacítalos en la nueva rutina antes de la fecha, no después.

Mientras esa fecha no exista, el piloto compite con la costumbre, y la costumbre lleva años de ventaja.

## Un ejemplo concreto: la mesa de pedidos

> **Ejemplo:** Una distribuidora hipotética de 30 personas. Todos los números son ilustrativos.

La mesa de pedidos recibe unos 350 pedidos por semana, por correo y por WhatsApp, en PDF, hojas de cálculo y texto suelto. Tres coordinadoras leen cada uno y lo ingresan en el ERP, en unos 7 minutos por pedido. Son alrededor de 41 horas a la semana. Más o menos 1 de cada 40 pedidos necesita una corrección después de ingresarse.

Así se ven las cinco decisiones para esta mesa:

- **Responsable:** la gerente de operaciones que supervisa a las tres coordinadoras. No el líder de TI ni el dueño de la empresa.
- **Número:** la métrica principal es el porcentaje de pedidos que entran sin que nadie los toque, de cero a una meta del 70% en el primer mes después del cambio. Métrica de control: la tasa de correcciones se mantiene en 1 de cada 40 o menos.
- **Datos:** el correo compartido real, el WhatsApp de ventas y una conexión con permiso de escritura al módulo de pedidos del ERP, aprobada por TI en la primera semana. Se prueba con los pedidos reales de los últimos tres meses, incluidos los más feos.
- **Excepciones:** código desconocido, precio que no coincide, cliente nuevo o crédito bloqueado van a la bandeja de una coordinadora con el motivo y el mensaje original. Los clientes nuevos siempre requieren aprobación.
- **Fecha:** dos semanas en modo sombra (la IA prepara, las coordinadoras comparan) y luego, un lunes fijo de la semana cinco, los pedidos nuevos pasan por la IA de forma predeterminada.

Si se cumple la meta, 245 pedidos a la semana entran sin intervención. Los otros 105 siguen necesitando a una persona, pero la IA ya hizo casi toda la lectura, así que digamos 4 minutos cada uno: unas 7 horas. La mesa pasa de unas 41 horas de carga manual a unas 7 horas de manejo de excepciones. Las coordinadoras no desaparecen; su trabajo pasa a ser los casos que requieren criterio, más los clientes a los que nunca tenían tiempo de devolverles la llamada.

Los números son inventados. Lo que importa es la estructura: cada uno se escribió antes de construir, así que un mes después del cambio nadie tiene que discutir si funcionó.

## El checklist de una página antes del piloto

Cópialo en un documento y llénalo con el responsable del proceso. Si alguna línea queda en blanco, ese es el trabajo pendiente antes de construir, no durante.

```text
CHECKLIST ANTES DEL PILOTO

Proceso: ______________________________________________
Responsable (dirige hoy este proceso): _______________
Patrocinador en la dirección: ________________________

EL NÚMERO
Métrica principal: ____________________________________
Línea base (medida, con fecha): ______________________
Meta y para cuándo: ___________________________________
Métrica de control que no puede empeorar: ____________
Criterio para detener o redefinir: ___________________

DATOS Y ACCESOS
Casos reales usados para probar (origen, cuántos): ___
Sistemas de los que lee: ______________________________
Sistemas en los que escribe: _________________________
Accesos aprobados por (nombre, fecha): _______________

EXCEPCIONES
Casos que la IA debe pasar a una persona: ____________
Quién los recibe y en qué bandeja: ___________________
Acciones que siempre requieren aprobación humana: ____

CAMBIO
Periodo en modo sombra (fechas): _____________________
Fecha en que se deja el proceso anterior: ____________
Equipo capacitado para (fecha): ______________________
Quién revisa los resultados cada semana: _____________
```

Cabe en una página a propósito. Si llenarlo toma más de una hora con las personas correctas en la sala, el proceso todavía no está listo para ser un piloto.

## Por dónde empezaríamos

Si ya tienes un piloto estancado, llena el checklist con el responsable del proceso antes de que alguien toque los prompts o la integración. Las líneas en blanco son tu plan para reiniciarlo, y casi siempre son el responsable, el número o la fecha de cambio, no algo técnico.

Si estás eligiendo qué pilotear, empieza por el proceso, no por la herramienta. Nuestra guía para [elegir tu primer agente de IA](/es/blog/como-elegir-tu-primer-agente-de-ia/) tiene una matriz de puntuación para eso.

Así están armados también nuestros [servicios de consultoría](/es/services/consulting/). La Auditoría de oportunidades de IA dura de 2 a 3 semanas: entrevistas con la dirección y con 6 a 12 personas del equipo, un mapa de cómo fluye realmente el trabajo, una revisión de preparación de datos y seguridad, y una hoja de ruta a 90 días con los tres primeros proyectos definidos. Para nosotros, "definido" quiere decir este checklist lleno para cada uno. Después, el Sprint de implementación toma de 4 a 8 semanas para automatizar dos o tres de esos procesos de punta a punta, con métricas de antes y después para cada uno y un manual de traspaso para que tu equipo los opere.

Si quieres una segunda opinión sobre un piloto que lleva tiempo "casi listo", [agenda una llamada](/es/contact/) y trae el checklist, aunque esté a medio llenar.
