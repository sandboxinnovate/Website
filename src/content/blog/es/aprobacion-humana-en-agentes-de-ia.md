---
title: "Aprobación humana por diseño: cuándo un agente de IA debe pedir permiso"
description: "Cómo diseñar la aprobación humana en agentes de IA: cinco niveles de autonomía, una matriz para cada tarea, qué debe ver quien aprueba y cuándo dar más autonomía."
dek: "La aprobación no es el freno de un agente de IA. Es la forma en que se gana la confianza, un caso revisado a la vez. Así decides dónde firma una persona y cuándo puede dejar de hacerlo."
date: 2026-11-02
lang: es
translationKey: human-in-the-loop-ai-approvals
unit: brains
tags:
  - agentes de ia
  - aprobación humana
  - gobierno de la ia
readingMinutes: 9
takeaways:
  - "Usa cinco niveles por tarea: nunca automatizar, solo sugerir, redactar y aprobar, actuar y avisar con margen para deshacer, y actuar solo con registro de auditoría."
  - "Ubica cada paso del proceso con tres preguntas: ¿se puede deshacer?, ¿cuánto cuesta un error? y ¿lo va a ver un cliente?"
  - "Aprobar debe tomar segundos: contexto, fuentes, la acción propuesta con el antes y el después, y un toque para aprobar, editar o rechazar."
  - "Sube una tarea de nivel solo con evidencia, por ejemplo más de 200 casos con 95% aprobados sin cambios y cero errores graves, y bájala en cuanto eso deje de cumplirse."
  - "Escribe la lista de lo que nunca se automatiza antes de construir nada. Es el documento más corto del proyecto y el que todos recuerdan."
faq:
  - q: "¿Pedir aprobación no anula el tiempo que ahorra el agente?"
    a: "Mucho menos de lo que se cree. Lo lento de casi cualquier tarea es reunir el contexto: buscar el pedido, leer la política, revisar el historial, escribir la respuesta. El agente hace todo eso antes de que la persona vea algo. Revisar un caso preparado y con fuentes toma segundos, no minutos. Y a medida que las tareas demuestran que funcionan, pasan a niveles donde nadie aprueba caso por caso, así que la carga de revisión baja con el tiempo."
  - q: "¿Quién debería aprobar?"
    a: "La persona que hoy es dueña de esa decisión, con nombre y apellido, y con un suplente también definido. Si hoy la líder de soporte aprueba los reembolsos, ella aprueba los del agente. No mandes todo a un solo gerente ni a una bandeja compartida que no es de nadie. Define límites de aprobación iguales a la autoridad que cada persona ya tiene, para que el agente nunca le dé a alguien más poder del que tiene su puesto."
  - q: "¿El agente aprende solo de los rechazos?"
    a: "No por sí mismo, y es mejor así. El modelo no se reentrena con tus aprobaciones. Los motivos de rechazo quedan registrados y se revisan, normalmente cada semana, y se convierten en cambios concretos: una política que faltaba en la base de conocimiento, una instrucción más clara, un tipo de caso que pasa a una persona por defecto. Una persona decide cada cambio y se vuelve a correr el conjunto de evaluación antes de publicarlo."
author: sandbox
---

Es domingo, 11:40 de la noche, y una clienta escribe por WhatsApp: la licuadora llegó rota, manda una foto y pregunta si le devuelven el dinero. Tu agente de soporte ya leyó el mensaje, encontró el pedido, verificó la fecha de entrega y sacó la cláusula correspondiente de tu política de reembolsos. Tiene acceso al panel de la tienda. Podría hacer el reembolso ahora mismo.

La pregunta no es si puede. Es si debe hacerlo solo, a esta hora, por este monto y para esta clienta.

Casi todos los equipos responden mal, de una de dos maneras. Algunos hacen que una persona apruebe todo, y al mes la cola de aprobaciones es una segunda bandeja de entrada que la gente vacía haciendo clic en "aprobar" sin leer. Otros no aprueban nada, y el primer reembolso equivocado o el primer mensaje raro a una cuenta importante termina con el proyecto. Los dos errores vienen de tratar la aprobación como un interruptor de encendido y apagado. Funciona mejor como una decisión de diseño que tomas tarea por tarea y que revisas con datos.

## La aprobación es cómo un agente se gana la confianza

Piensa en las aprobaciones como el periodo de prueba del agente. Cada caso que revisa una persona deja un ejemplo etiquetado: aprobado tal cual, editado o rechazado con un motivo. Junta unos cientos y ya no tienes que adivinar si el agente maneja bien los reembolsos. Lo sabes, para ese tipo de reembolso, con esa política y ese volumen.

La aprobación también es un control de seguridad. El [OWASP Top 10 para aplicaciones con modelos de lenguaje](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) (en inglés) incluye la "agencia excesiva" (darle a un sistema más funciones, permisos o autonomía de los que necesita) entre los riesgos principales, y una de las medidas que recomienda es el control humano: que una persona apruebe las acciones de alto impacto antes de ejecutarlas. Un modelo puede equivocarse, y también puede ser manipulado por texto escondido en un correo o un documento que lee. Un paso de aprobación limita lo que cualquiera de esas fallas puede hacer.

Además, lo que diga o haga el agente es responsabilidad de tu empresa. En febrero de 2024, el Civil Resolution Tribunal de Columbia Británica (Canadá) hizo responsable a Air Canada por lo que el chatbot de su sitio le dijo a un cliente sobre las tarifas por duelo, y rechazó el argumento de que el chatbot respondía por sus propias palabras ([Moffatt v. Air Canada, 2024 BCCRT 149](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do), en inglés). Eso era un chatbot dando información. Un agente que actúa pesa más, no menos. (Esto es contexto, no asesoría legal.)

## Cinco niveles de autonomía

Asignamos cada paso de un proceso a uno de cinco niveles. El nivel es del paso, no del agente: el mismo agente puede consultar pedidos por su cuenta y aun así necesitar una firma para mover dinero.

| Nivel | Qué hace el agente | Qué hace la persona | Ejemplos típicos |
|---|---|---|---|
| 0. Nunca automatizar | Nada, o lo pasa a una persona | Se encarga de todo | Amenazas legales, requerimientos de autoridades, contrataciones y despidos, cambios de datos bancarios |
| 1. Solo sugerir | Recomienda; no ejecuta | Decide y actúa | Qué cuenta priorizar, cómo responder la queja de un cliente clave |
| 2. Redactar y aprobar | Prepara la acción completa | Aprueba, edita o rechaza antes de que se ejecute | Respuestas a clientes, reembolsos sobre un límite, cambios en el CRM de cuentas clave |
| 3. Actuar y avisar | Actúa, avisa y deja un margen para deshacer | Revisa después y puede revertir | Reembolsos pequeños dentro de la política, reprogramar una reunión, etiquetar tickets |
| 4. Actuar con registro | Actúa; cada paso queda registrado | Revisa una muestra del registro periódicamente | Consultar registros, resumir una conversación, archivar un documento |

El nivel 3 merece atención porque es el que más equipos se saltan. "Actuar y avisar" solo funciona si deshacer es real. Un reembolso que se liquida en el momento en que se emite no tiene nada que deshacer, salvo que lo retengas a propósito unos minutos antes; un mensaje que ya llegó al WhatsApp del cliente no se puede borrar de su teléfono. Si no puedes construir un margen real para deshacer, ese paso va en el nivel 2.

El nivel 0 es la lista que se escribe primero, antes de construir nada. Que sea corta y específica. La nuestra suele empezar así: todo lo que crea un compromiso legal o contractual, todo lo que cambia quién tiene acceso a qué, pagos a una cuenta bancaria nueva o modificada, respuestas a autoridades o abogados, y decisiones sobre el empleo de una persona. Tu lista sumará casos propios de tu industria.

## Tres preguntas para ubicar cada tarea

Para cada paso, pregunta tres cosas.

1. **¿Se puede deshacer?** Por completo, en parte o nada. Un borrador se borra. Un correo enviado, no.
2. **¿Cuánto cuesta un error?** Dinero, tiempo para corregirlo y el número más difícil: la relación con el cliente.
3. **¿Lo va a ver un cliente?** Los errores internos se corrigen en silencio. Los externos terminan en capturas de pantalla.

Luego aplica una regla simple: la peor respuesta define el nivel.

| ¿Reversible? | Costo de un error | ¿Lo ve el cliente? | Nivel inicial |
|---|---|---|---|
| Sí | Bajo | No | 4 |
| Sí | Bajo | Sí | 3 |
| En parte | Medio | Cualquiera | 2 |
| No | Bajo | Sí | 2 |
| No | Alto | Cualquiera | 1 o 0 |

> **Regla práctica:** Todo paso que escribe, envía o gasta empieza un nivel más abajo de lo que sugiere la matriz. Subir de nivel es barato y llega con datos. Bajar después de un incidente llega con una disculpa.

## Paso a paso: la licuadora rota

Volvamos al domingo en la noche. Así dividiría esa solicitud un agente de soporte bien diseñado, en una tienda hipotética cuya política dice que los productos que llegan dañados se reembolsan completos sin necesidad de devolverlos. El monto es pequeño, por debajo del límite que hoy aprueba sola la líder de soporte.

- **Leer y clasificar el mensaje:** nivel 4. Nada sale de la empresa.
- **Buscar el pedido y el historial de la clienta:** nivel 4. Solo lectura.
- **Relacionar el caso con la cláusula de la política:** nivel 4, pero la cláusula va citada para que quien aprueba la pueda verificar.
- **Hacer el reembolso:** nivel 2 al lanzar. Candidato a nivel 3 más adelante, para montos bajo el límite.
- **Responderle a la clienta:** nivel 2 al lanzar.
- **Reembolso de un pedido con un contracargo abierto:** nivel 0. Pasa a una persona con una nota.

Lo que recibe la persona que aprueba el lunes temprano, en el sistema de soporte o el chat del equipo que ya usa, se ve así:

```
SOLICITUD DE REEMBOLSO · Pedido 10482 · Clienta desde 2023, 4 pedidos, sin reembolsos previos
Solicitud:  Producto dañado al llegar (foto adjunta)
Política:   Cambios y reembolsos v3, sección 2: "Dañado al llegar: reembolso total,
            no requiere devolución"  [ver fuente]
Revisión:   Entregado hace 2 días: sí · Dentro de 30 días: sí · Bajo el límite: sí
Propuesta:  Reembolso del monto total del producto al medio de pago original
Respuesta:  "Lamentamos lo de la licuadora. Ya te reembolsamos el monto completo a tu
            tarjeta; lo verás en 3 a 5 días hábiles. No hace falta devolverla."
Por qué pregunta: Los reembolsos están en nivel 2 hasta que la tarea suba de nivel.

[ Aprobar ]   [ Editar ]   [ Rechazar: política incorrecta · falta información · otro ]
```

Quien aprueba lo lee en diez segundos y toca una vez. La clienta recibió esa misma noche un mensaje que le decía que una persona confirmaría el reembolso en la mañana, lo cual es honesto y casi siempre suficiente.

## Qué hace que aprobar tome segundos y no minutos

Si aprobar es más lento que hacer la tarea a mano, la gente va a esquivar al agente. Los detalles de diseño deciden esto.

**Muestra el trabajo, no solo la conclusión.** Quien aprueba necesita la solicitud, las fuentes que usó el agente, las verificaciones que hizo y la acción exacta que propone. Si se trata de cambiar un registro, muestra el antes y el después del campo, y nada más.

**Explica por qué pregunta.** "Tarea de nivel 2" y "monto sobre el límite" son motivos distintos, y el segundo merece más atención. Si el agente tiene dudas, debe decir sobre qué.

**Un toque para cada opción.** Aprobar, editar o rechazar. Para rechazar se elige un motivo de una lista corta, con texto libre opcional, porque esos motivos son la materia prima para mejorar el agente.

**Si nadie responde, se escala; nunca se aprueba.** Si nadie actúa dentro de un plazo definido (por ejemplo, dos horas hábiles para un reembolso), la solicitud pasa a un suplente con nombre. Si ese plazo también vence, llega al dueño del proceso. Una aprobación sin respuesta nunca debe convertirse en un sí por defecto.

**Registra todo.** Qué propuso el agente, qué cambió la persona, quién aprobó, cuándo y qué se ejecutó al final. Cuando algo sale mal tres semanas después, ese registro es la diferencia entre una respuesta en diez minutos y una semana de suposiciones. También es una de las [preguntas que debes hacerle a cualquier proveedor de IA](/es/blog/preguntas-de-seguridad-para-proveedores-de-ia/) antes de que su sistema toque tus datos.

## Cuándo una tarea se gana el ascenso

Subir de nivel debe ser una decisión con números detrás, tomada por el dueño del proceso, no algo que pasa solo. Seguimos tres cifras por tarea:

- **Tasa de aprobación sin cambios:** la proporción de propuestas aprobadas tal como se redactaron.
- **Tasa de edición:** qué tan seguido una persona cambió algo, y si fue de forma o de fondo.
- **Tasa de error:** los errores detectados después, incluidos los que pasaron la aprobación.

Un umbral razonable para pasar los reembolsos bajo el límite del nivel 2 al 3: al menos 200 casos a lo largo de cuatro semanas o más, 95% o más aprobados sin cambios, ediciones de tono y no de fondo, y cero errores graves.

> **Ejemplo:** En un primer mes hipotético, el agente redacta 240 reembolsos bajo el límite. 229 se aprueban sin cambios (95,4%), 9 se editan por tono y 2 se rechazan. Los dos rechazos vienen del mismo hueco: la política no dice nada sobre productos comprados en oferta. El equipo escribe la cláusula que faltaba, agrega ambos casos al conjunto de evaluación y mantiene la tarea en nivel 2 dos semanas más para confirmar el arreglo. Después la sube.

El ascenso no es permanente. Baja una tarea de nivel de inmediato después de un error grave, cuando cambia la política que la respalda, cuando cambias el modelo o una herramienta conectada, o cuando la tasa de edición empieza a subir. Después del ascenso, sigue revisando muestras: mirar una parte de las acciones de nivel 3 y 4 cada semana cuesta poco y detecta desviaciones a tiempo.

Ojo con una falla silenciosa: una tasa de aprobación de 100% con un tiempo promedio de revisión de dos segundos. Puede que el agente sea perfecto. Lo más común es que la gente dejó de leer. Mira los tiempos de revisión junto con la tasa de aprobación y, de vez en cuando, revisa tú mismo algunos casos aprobados.

## Por dónde empezaríamos

Elige un proceso y escribe tres cosas antes de que alguien construya: la lista de lo que nunca se automatiza, el nombre de quien aprueba y de su suplente, y el nivel de cada paso. Todo lo que solo lee empieza en nivel 4; todo lo que escribe, envía o gasta, en nivel 2. Acuerda desde el principio el umbral para subir de nivel, así darle más espacio al agente es una revisión de números y no una discusión.

Esto es lo que hacemos en la etapa Diseñar del proceso con el que construimos [brains y agentes](/es/services/brains/): definimos qué decide el agente solo, qué consulta y qué nunca toca, y tú apruebas ese plano antes de que escribamos código. Un primer agente suele estar en producción en 3 a 5 semanas, con las aprobaciones funcionando desde el primer día. Si prefieres ver el panorama completo primero, lee [qué es un brain de empresa](/es/blog/que-es-un-brain-de-empresa/).

Si hay un proceso que entregarías mañana mismo si pudieras confiar en él, [cuéntanos cuál](/es/contact/) y te mostramos dónde irían las aprobaciones.
