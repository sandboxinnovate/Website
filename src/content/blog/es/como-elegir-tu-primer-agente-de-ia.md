---
title: "Cómo elegir el primer proceso para delegar a un agente de IA"
description: "Cómo elegir tu primer agente de IA: cinco criterios del 1 al 5, dos filtros, un ejemplo con seis procesos, señales de alerta y qué debe estar listo en 3–5 semanas."
dek: "Tu primer agente se convierte en el veredicto del equipo sobre la IA. Puntúa a los candidatos con cinco criterios, aplica dos filtros y elige el proceso que pueda demostrar resultados en cinco semanas."
date: 2026-11-02
lang: es
translationKey: choosing-your-first-ai-agent
unit: brains
tags:
  - agentes de ia
  - automatización de procesos
  - estrategia de ia
readingMinutes: 11
takeaways:
  - "Puntúa cada proceso candidato del 1 al 5 en volumen, reglas vs. criterio, acceso a datos, riesgo y reversibilidad, y qué tan medible es el resultado."
  - "Usa el riesgo y la medición como filtros: un proceso con menos de 3 en cualquiera de los dos no es un primer agente, sin importar su total."
  - "En nuestro ejemplo hipotético de una empresa de 40 personas gana la calificación de leads entrantes: frecuente, basada en reglas, con errores recuperables y una métrica que el CRM ya registra."
  - "El filtrado de CV es una mala primera opción. Las herramientas de contratación son de alto riesgo según la Ley de IA de la UE, exigen auditorías de sesgo en Nueva York, y un rechazo injusto pasa inadvertido."
  - "Un primer agente está terminado cuando tiene un responsable, una métrica con línea base, aprobaciones por escrito y un registro de cada ejecución. Eso suele tomar 3–5 semanas."
faq:
  - q: "¿Cuántos procesos conviene puntuar antes de elegir?"
    a: "Los suficientes para tener una elección real, normalmente entre ocho y quince. Pregúntales a quienes hacen el trabajo, no solo a los gerentes: saben qué tareas se repiten, cuáles se caen en los días de más carga y dónde están realmente los datos. Cuando el grupo puntúa en conjunto los dos primeros, el resto avanza rápido. Guarda la lista completa, porque los que quedan atrás son tu hoja de ruta para el segundo y el tercer agente."
  - q: "¿Qué pasa si el equipo dueño del mejor candidato no quiere un agente?"
    a: "Tómalo en serio. Un responsable que no quiere el agente no va a revisar su registro ni a ajustar sus reglas. Averigua cuál es la objeción: muchas veces es miedo a ser medido o reemplazado, o una mala experiencia con un chatbot. El modo sombra ayuda, porque el equipo ve los borradores del agente durante semanas antes de que algo salga solo. Si la resistencia se mantiene, empieza por el segundo de la lista."
  - q: "¿El primer agente debería atender clientes o ser interno?"
    a: "Cualquiera de los dos puede funcionar. Los agentes internos son más fáciles de aprobar, pero sus resultados los notan una o dos personas, así que convencen a menos gente. Los que atienden clientes mueven números que ve toda la empresa. Los preferimos cuando un error es barato de corregir y cada mensaje saliente puede aprobarse durante las primeras semanas. Que decida el puntaje de riesgo, no la categoría."
author: sandbox
---

Seis semanas después de que un primer agente de IA entra en producción, alguien pregunta en la reunión del lunes cómo va. Si la respuesta es un número ("el tiempo de respuesta pasó de la mañana siguiente a ocho minutos"), la siguiente pregunta es qué proceso sigue. Si la respuesta es la historia del precio equivocado que le mandó a un buen cliente, cada idea de IA que venga después recibe la misma réplica: acuérdate de la última vez.

Por eso la primera elección pesa más que el modelo o el proveedor. El primer agente no se evalúa como un proyecto más; se convierte en el veredicto del equipo sobre la IA.

Gartner [proyecta que más del 40% de los proyectos de IA agéntica se cancelarán antes de que termine 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), por costos crecientes, valor de negocio poco claro o controles de riesgo insuficientes. Dos de esas tres causas se deciden en buena parte antes de escribir código, en el momento en que eliges el proceso. Esta es la matriz que usamos para elegir.

## Cinco criterios, del 1 al 5

Puntúa a cada candidato con las mismas cinco preguntas. El 5 siempre es el extremo bueno, así que un total más alto es mejor.

| Criterio | La pregunta | Un 5 se ve así | Un 1 se ve así |
|---|---|---|---|
| Volumen y frecuencia | ¿Cada cuánto pasa? | Decenas de veces por semana | Unas pocas veces al mes |
| Reglas vs. criterio | ¿Podrías escribir las reglas? | Caben en una página y dos personas las aplicarían igual | Sobre todo experiencia, olfato o negociación |
| Acceso a datos | ¿El agente llega a lo que necesita? | Está en herramientas con API o exportación, y el acceso toma días | Vive en la cabeza de una persona |
| Riesgo y reversibilidad | ¿Cuánto cuesta el peor error realista? | Interno, se detecta al revisar, se corrige en minutos | Afecta el empleo, el dinero, la salud o la situación legal de alguien; no tiene vuelta atrás |
| Resultado medible | ¿Vas a saber si funcionó? | Una métrica que ya registras, con línea base, que se mueve en semanas | El éxito es cuestión de opinión |

Tres de estos criterios se puntúan mal todo el tiempo.

**Reglas vs. criterio tiene una trampa.** Si tanto las reglas como la información de entrada son limpias (campos fijos de un formulario, un cambio de estado), una herramienta de automatización hará el trabajo más barato y con menos sorpresas que un agente. Los agentes se justifican donde las reglas claras se cruzan con entradas desordenadas: correos en texto libre, audios y mensajes de WhatsApp, PDF, formularios a medio llenar. Puntúa las reglas, no la entrada.

**El acceso a datos se trata de alcance, no de limpieza.** Que los datos estén desordenados es normal; ordenarlos es parte de la construcción. Lo que mata a un primer agente son los datos a los que no puede llegar: un proveedor que no da acceso a la API, una hoja de cálculo que vive en una sola computadora, criterios de calificación que solo conoce el jefe de ventas, consultas que llegan al WhatsApp personal de un vendedor. Si el acceso va a tardar más de una o dos semanas, ese no es tu primer agente.

**Puntúa el riesgo según el peor error realista, sin contar las aprobaciones.** Las aprobaciones reducen el riesgo, pero cuestan tiempo. Si una persona tiene que revisar cada resultado para siempre, construiste un generador de borradores caro. Pregúntate quién vería el error, cuánto costaría y si podrías deshacerlo antes del viernes.

Después aplica dos filtros. **Un primer agente necesita al menos un 3 en riesgo y al menos un 3 en resultado medible, sin importar su total.** Un proceso que no puedes medir produce una discusión, no un veredicto. Un proceso con 2 en riesgo produce justo la historia que nadie quiere escuchar el lunes. Si dos candidatos empatan, elige el de mejor puntaje de riesgo.

## Un ejemplo: seis candidatos en una empresa de 40 personas

> **Ejemplo:** Una empresa hipotética de 40 personas que instala y da mantenimiento a sistemas de aire acondicionado comercial. La dueña, el gerente de operaciones y la coordinadora administrativa dedican una hora a puntuar seis procesos candidatos. Todos los volúmenes y tiempos son ilustrativos.

| Candidato | Volumen | Reglas | Datos | Riesgo | Métrica | Total | Filtros |
|---|---|---|---|---|---|---|---|
| Calificación de leads entrantes | 4 | 4 | 4 | 4 | 5 | **21** | Pasa |
| Primera respuesta a tickets de soporte | 5 | 3 | 3 | 3 | 4 | 18 | Pasa |
| Reporte semanal de operaciones | 2 | 5 | 3 | 5 | 3 | 18 | Pasa |
| Conciliación de facturas | 4 | 5 | 3 | 2 | 4 | 18 | No pasa riesgo |
| Primeros borradores de propuestas | 3 | 2 | 2 | 3 | 2 | 12 | No pasa métrica |
| Filtrado de CV | 3 | 2 | 4 | 1 | 2 | 12 | No pasa ninguno |

Cómo llegaron a esos números:

- **Calificación de leads entrantes.** Llegan unas 40 solicitudes de cotización por semana, por el formulario web, por correo y, sobre todo, por WhatsApp, que entra a una cuenta de la empresa y no al celular de alguien. Los criterios caben en una página: zona de servicio, tipo de edificio, tamaño del sistema, plazo y si quien pregunta puede firmar. El CRM ya registra la hora de cada consulta y de cada primera respuesta, así que la línea base existe. El peor error realista, una respuesta torpe o un buen lead marcado como no calificado, se ve y se corrige con una llamada.
- **Primera respuesta a tickets de soporte.** El mayor volumen, unas 150 solicitudes de servicio por semana. Pero las reglas de urgencia tienen excepciones que solo conocen los técnicos con más experiencia, las condiciones de los contratos están en PDF y una emergencia mal derivada (una clínica sin aire acondicionado en plena ola de calor) sale cara.
- **Reporte semanal de operaciones.** El candidato más seguro: es interno y lo revisa quien lo lee. Pero se hace una vez por semana, una parte es automatización simple y ahorra unas pocas horas de una sola persona.
- **Conciliación de facturas.** Unas 300 facturas de proveedores al mes, cruzadas con órdenes de compra y comprobantes de entrega. Reglas nítidas y entradas desordenadas (PDF, fotos que mandan los técnicos desde la obra) son buen terreno para un agente. Pero el modo de falla es dinero que sale de la empresa por el monto equivocado.
- **Primeros borradores de propuestas.** Impresiona en una demo. En la práctica, el precio y el alcance dependen del criterio del cotizador, las propuestas anteriores están repartidas en carpetas y la tasa de cierre tarda meses en moverse.
- **Filtrado de CV.** Lo vemos en la siguiente sección.

### Por qué la calificación de leads va primero

Tiene el total más alto, pero importan más las razones detrás del número.

La métrica es una que a la dueña ya le importa. Supongamos que la coordinadora dedica seis minutos a cada consulta: leerla, revisar la zona, responder y registrarla en el CRM. Con 40 por semana son cuatro horas, y las respuestas esperan hasta que ella puede atenderlas, muchas veces a la mañana siguiente. Un agente que responde en minutos, pide los datos que faltan y agenda los leads calificados en el calendario del cotizador mueve dos números que el equipo ve: el tiempo hasta la primera respuesta y las visitas técnicas calificadas por semana. Medir eso con honestidad es una disciplina en sí misma: lo explicamos en [cómo medir el ROI de la IA sin engañarte](/es/blog/como-medir-el-roi-de-la-ia/).

Los errores aparecen rápido. Una mala respuesta queda en el registro el mismo día, y un lead descartado pasa a una cola de revisión en lugar de desaparecer.

Y construye lo que va a necesitar el segundo agente. El mapa de zonas, los tipos de edificio, el catálogo de servicios y la conexión con WhatsApp y el correo son casi todo lo que reutilizará un agente de soporte. Si solo contara el desempate, el reporte semanal quedaría segundo. Aun así, haríamos soporte después, porque reutiliza casi todo lo que construyó el agente de leads y mueve un número que los clientes sienten. Entra segundo cuando las condiciones de los contratos ya estén en la base de conocimiento y el equipo haya visto trabajar a un agente durante un mes. La conciliación de facturas viene después, con aprobación en cada pago. Así, un agente a la vez, se construye un [brain de empresa](/es/blog/que-es-un-brain-de-empresa/).

Si la dueña todavía no quiere nada que hable con clientes, el reporte semanal es la alternativa defendible. Es de bajo riesgo y rápido de lanzar; solo que no va a convencer a mucha gente.

## Por qué el filtrado de CV es un mal primer agente

En el papel, la contratación parece una buena candidata: volumen por temporadas, un dolor claro, datos ya cargados en un sistema de seguimiento de postulantes. Aun así, no la elegiríamos como primer agente de nadie.

Los reguladores la tratan como de alto riesgo. La Ley de IA de la Unión Europea (AI Act) clasifica como [de alto riesgo en su anexo III](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689) a los sistemas de IA que se usan para contratar o seleccionar personas, incluido analizar y filtrar solicitudes de empleo, y tras las modificaciones de 2026 esas reglas [se aplican desde el 2 de diciembre de 2027](https://eprs.europarl.europa.eu/EPRS_ATA%282025%29772906). En la ciudad de Nueva York, la [Ley Local 144](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page) prohíbe a los empleadores usar una herramienta automatizada de decisiones de empleo a menos que haya tenido una auditoría de sesgo en el último año, se publique un resumen de los resultados y se avise a los candidatos. Y la legislación contra la discriminación laboral de cada país aplica sin importar la herramienta. Esto no es asesoría legal; si vas a usar IA para contratar, involucra a un abogado laboralista.

La falla es silenciosa. Cuando un agente de leads escribe una mala respuesta, alguien lo nota. Cuando un agente de filtrado descarta a un candidato calificado por la razón equivocada, esa persona simplemente nunca recibe respuesta, y nada en tus métricas lo señala. Reuters [informó en 2018](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G) que el motor experimental de reclutamiento de Amazon, entrenado sobre todo con currículums de hombres, aprendió a penalizar la palabra "women's" ("de mujeres"), y el proyecto se abandonó. Amazon dijo que sus reclutadores nunca lo usaron para evaluar candidatos.

Además, una empresa de 40 personas rara vez recibe suficientes postulaciones como para distinguir un patrón de sesgo del simple ruido.

Más adelante hay trabajo de contratación con menos riesgo para la IA, como coordinar entrevistas o responder las preguntas de los postulantes sobre el puesto. Ordenar personas por puntaje es otro trabajo, y no es el indicado para aprender.

## Señales de alerta que el puntaje no muestra

Si alguna se cumple, resuélvela primero o elige otro proceso.

- **Nadie se pone de acuerdo en cómo funciona el proceso.** Si tres personas lo hacen de tres maneras distintas, el agente va a automatizar la discusión.
- **El responsable es un comité.** "Lo comparten ventas y operaciones" suele significar que nadie revisa el registro ni decide cuándo cambian las reglas.
- **Se eligió por la demo.** El caso más impresionante rara vez es el más medible. Un agente que redacta propuestas se luce en un video, pero deja poco que medir.
- **El resultado depende de un acceso que no tienes.** Si sacar los datos de un sistema requiere negociar con un proveedor, empieza esa gestión en paralelo y construye primero otra cosa.
- **Solo funciona si el agente lo hace todo.** Si el plan no tolera que una persona apruebe los resultados durante las primeras semanas, el plan está mal.

## Qué significa "terminado" en 3–5 semanas

Un primer agente suele estar en producción en 3–5 semanas. "En producción" necesita una definición, o el proyecto se convierte en un piloto eterno. Así se vería el ejemplo de calificación de leads:

- **Semana 1:** mapear el proceso con la coordinadora, escribir las reglas en una página, juntar 40 consultas pasadas como casos de prueba y conectar WhatsApp, el correo, el CRM y el calendario.
- **Semana 2:** escribir la especificación: qué activa al agente, qué decide solo (acusar recibo, pedir datos faltantes, clasificar), qué consulta (cualquier cosa fuera de la zona de servicio) y qué no hace nunca (dar precios, prometer fechas de instalación).
- **Semanas 3–4:** construir y probar con los casos pasados, y después correrlo en modo sombra: el agente redacta cada respuesta y la coordinadora decide qué se envía.
- **Semana 5:** en producción, con todas las respuestas salientes aprobadas al principio. Cada tipo de respuesta sale sola cuando el registro muestra que se aprobó sin cambios durante unas semanas.

La definición de terminado que le exigimos a cualquier primer agente:

- **Un responsable.** Una persona con nombre y apellido que revisa el registro cada semana y decide los cambios de reglas.
- **Una métrica, con línea base.** Medida en el proceso actual antes del lanzamiento, con una meta acordada desde el inicio.
- **Aprobaciones por escrito.** Qué acciones esperan a una persona y qué evidencia permitiría que cada una corra sola. Más en [dónde debe pedir permiso un agente de IA](/es/blog/aprobacion-humana-en-agentes-de-ia/).
- **Un registro de cada ejecución.** Entradas, pasos, decisiones y aprobaciones, legibles sin necesidad de un ingeniero.
- **Un "no lo sé" claro.** Cuando no está seguro, el agente le pasa el caso a una persona con un resumen, no con una suposición.
- **Un botón de apagado.** El equipo puede pausar el agente y volver al proceso anterior el mismo día.

## Por dónde empezaríamos

Reúne durante una hora a la persona responsable y a dos de quienes hacen el trabajo. Arma con ellos una lista de todos los procesos lo bastante repetitivos como para fastidiar a alguien y puntúa cada uno:

```text
MATRIZ PARA ELEGIR EL PRIMER AGENTE  (1–5, 5 = mejor)

Proceso:
Responsable (un solo nombre):

Volumen y frecuencia      __  ¿Cuántas veces por semana?
Reglas vs. criterio       __  ¿Las reglas caben en una página?
Acceso a datos            __  ¿El agente llega a ellos en dos semanas?
Riesgo y reversibilidad   __  ¿Peor error realista? ¿Se deshace antes del viernes?
Resultado medible         __  ¿Qué métrica? ¿Cuál es la línea base hoy?

Total (de 25):            __
Filtros: ¿riesgo >= 3 y resultado >= 3?   sí / no
Señales de alerta:
```

Toma los dos primeros que pasen los filtros, revísalos contra las señales de alerta y elige uno. No los dos: el segundo agente avanza más rápido cuando el primero ya construyó el conocimiento, las conexiones y el hábito de aprobar del equipo.

Si antes quieres una mirada externa, el [Diagnóstico de IA](/es/diagnostic/) toma tres minutos y mide tu preparación por dimensión. O trae tu mejor candidato a una llamada y te dibujamos el agente; en la [página de Brains](/es/services/brains/) puedes ver cómo se define un Agente único.
