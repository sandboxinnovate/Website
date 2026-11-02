---
title: "Contenido con IA sin sonar a robot: un sistema que conserva tu voz"
description: "Cómo usar IA para crear contenido sin que suene genérico: parte de entrevistas y fuentes reales, define una guía de voz y de afirmaciones, y edita con una checklist."
dek: "Los borradores de IA suenan igual que todos cuando parten de cero. Este es nuestro sistema: primero las fuentes, luego una guía de voz y de afirmaciones, edición humana con checklist y lo que nunca automatizamos."
date: 2026-11-02
lang: es
translationKey: ai-content-without-the-slop
unit: growth
tags:
  - contenido con ia
  - voz de marca
  - marketing de contenidos
readingMinutes: 10
takeaways:
  - "El contenido genérico con IA es un problema de fuentes, no del modelo. Un prompt sin nada detrás devuelve el promedio de internet."
  - "Arma primero una biblioteca de fuentes: entrevistas con los fundadores, notas de llamadas de venta, tickets de soporte y tus propios datos. El modelo redacta a partir de eso, no de memoria."
  - "Una guía de una página con lo que decimos, lo que nunca decimos y la evidencia que podemos mostrar mejora más la calidad que cualquier truco de prompt."
  - "Google evalúa el contenido por su calidad y utilidad, no por cómo se produjo. Lo que su política de spam persigue es publicar páginas en masa sin aportar valor."
  - "La opinión, la verificación final y la decisión de publicar quedan en manos de una persona con nombre. Lo que se automatiza es el borrador y la adaptación de formatos."
faq:
  - q: "¿Hay que avisarles a los lectores que la IA ayudó a escribir el contenido?"
    a: "La propia guía de Google sugiere aclararlo cuando un lector se preguntaría razonablemente cómo se hizo algo. En un artículo que sale de la entrevista con tu socio y que tu equipo editó, lo importante es que quede claro de quién es el conocimiento. En cosas muy automatizadas, como descripciones de productos generadas en volumen, una nota breve es lo honesto. Decídelo una vez, escríbelo en tu política y aplícalo igual en todos lados."
  - q: "¿No basta con entrenar un modelo con nuestros artículos viejos y dejarlo escribir?"
    a: "Los artículos viejos le enseñan al modelo cómo suenas, y eso ayuda. Pero no le dan nada nuevo que decir. Sin material fresco, un modelo ajustado a tu voz produce paráfrasis convincentes de lo que ya publicaste. Usa tus mejores piezas como ejemplos de estilo dentro de la guía y sigue alimentando el sistema con entrevistas, llamadas y datos nuevos. Voz sin sustancia sigue siendo contenido de relleno, solo que con tu acento."
  - q: "¿Cuántas piezas por semana son realistas para un equipo pequeño?"
    a: "Depende de cuánto material de origen captures, no de qué tan rápido escriba el modelo. Un buen ritmo para empezar es una conversación grabada por semana convertida en un artículo y las piezas que salen de ahí. Cuando editar ese paquete ya sea rutina, suma una segunda fuente. Los equipos que suben el volumen antes de tener estable la revisión suelen terminar publicando piezas que nadie revisó de verdad."
author: sandbox
---

La responsable de marketing abre el chat y escribe: "Redacta un artículo de 1,500 palabras sobre cómo elegir un proveedor de logística". Cuarenta segundos después lo tiene. Está bien escrito, bien estructurado, con subtítulos. Y podría publicarse en el sitio de cualquiera de sus competidores, porque no contiene nada que solo su empresa sepa.

Eso es contenido de relleno, y la culpa no es de la máquina. El texto se escribió desde la nada. Un modelo de lenguaje al que le pides texto sin darle material hace exactamente aquello para lo que fue construido: devuelve la versión más probable de lo que ya se dijo sobre el tema. Lo probable y lo promedio son parientes cercanos.

Un mejor prompt no lo arregla, y otra herramienta tampoco. Lo que lo arregla es un sistema en el que el modelo nunca empieza frente a una hoja en blanco. Aquí está el que usamos y enseñamos, paso a paso, con un ejemplo completo y las partes que jamás le dejaríamos a una máquina.

## Por qué todos los borradores de IA suenan igual

Cuando le das a un modelo un tema y nada más, rellena los huecos con las frases más seguras y comunes que encuentra. Obtienes listas equilibradas de consejos, recomendaciones con mil matices y ejemplos tan generales que podrían ser de cualquier empresa. El modelo no es flojo. Simplemente no tiene acceso a tus llamadas de venta, a tus márgenes ni a la discusión que tu fundador tiene una y otra vez con los clientes.

Los lectores lo notan rápido, aunque no sepan explicar por qué. Estas son las señales que buscamos al revisar un borrador:

- **Nadie podría estar en desacuerdo.** Cada afirmación es tan segura que no aporta información.
- **Ejemplos sin nombres, cifras ni lugares.** "Una empresa mejoró su eficiencia" en lugar de una situación concreta con números concretos.
- **Simetría por todos lados.** Todas las listas tienen tres puntos, todas las secciones miden lo mismo, todos los párrafos cierran con una frase redonda.
- **Vocabulario de catálogo.** "Soluciones integrales", "de vanguardia", "en un mercado cada vez más competitivo" y sus primos.
- **Definiciones como arranque.** El primer párrafo le explica qué significa un término a alguien que justamente lo buscó.
- **Estadísticas sin fuente,** o con una fuente que no dice lo que afirma la frase.
- **Un cierre que repite la introducción** en vez de decirle al lector qué hacer después.

Si un borrador tiene tres o más de estas señales, el problema casi nunca es la redacción. El borrador no tenía nada que decir, y ninguna edición se lo va a agregar.

## Lo que Google dice realmente sobre el contenido con IA

Muchos equipos no se animan por miedo a que Google los penalice por "contenido de IA". La postura de Google es más precisa. En su [guía de 2023 sobre contenido generado por IA](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content?hl=es), explica que sus sistemas de clasificación buscan premiar el contenido original y de alta calidad sin importar cómo se haya producido, y que el uso adecuado de la IA o la automatización no va en contra de sus directrices. Su documentación actual mantiene esa postura.

La línea que traza tiene que ver con el propósito y el valor. Sus [políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies?hl=es) definen el abuso de contenido a escala como generar muchas páginas con el objetivo principal de manipular los rankings, y ponen como ejemplo usar herramientas de IA generativa para crear muchas páginas sin aportar valor a los usuarios. Su [guía sobre el uso de contenido generado con IA](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=es) va más allá: pide revisar y verificar todo el contenido generado con IA antes de publicarlo, incluidos metadatos como los títulos, las metadescripciones, los datos estructurados y el texto alternativo de las imágenes.

En la práctica, a Google no le importa quién tecleó la frase. Revisa si la página merecía existir. Un sistema construido sobre tu propio material pasa esa prueba por diseño. Un sistema hecho para publicar cien páginas casi idénticas por semana la reprueba, las escriba quien las escriba.

El mismo razonamiento aplica a los asistentes de IA cuando deciden a quién citar, algo que explicamos en nuestra [guía de GEO para aparecer en respuestas de IA](/es/blog/guia-geo-como-aparecer-en-respuestas-de-ia/). Los asistentes citan fuentes que dicen algo específico. Una paráfrasis del consenso no les da nada que citar.

## Paso uno: arma la biblioteca de fuentes antes de escribir un prompt

Cada pieza de contenido debería poder rastrearse hasta material que solo tu empresa tiene. Lo ordenamos en cuatro cajones:

1. **Entrevistas con expertos.** Una conversación grabada de 30 minutos con un fundador, socio o especialista senior, guiada por preguntas que los clientes hacen de verdad. Es la fuente más rica y la más desaprovechada.
2. **Notas y grabaciones de llamadas de venta.** Las objeciones, comparaciones y preguntas de "¿y ustedes cómo manejan…?" que aparecen cada semana. Son tus mejores temas, ya formulados como los formula el comprador.
3. **Tickets de soporte y dudas de onboarding.** Dónde se confunden los clientes te dice qué explicar y en qué orden. Si atiendes por WhatsApp, esas conversaciones también cuentan.
4. **Tus propios datos.** Patrones anonimizados de proyectos, tiempos, mapas de procesos antes y después. Hasta un conteo interno sencillo vale más que una estadística prestada.

Guárdalo todo en un solo lugar, con una etiqueta breve por elemento: quién lo dijo, cuándo y si se puede citar en público. El modelo redacta solo con lo que está en la biblioteca para esa pieza. Si una sección necesita un dato que no está ahí, el borrador lo marca con un espacio pendiente en lugar de inventarlo.

> **Regla práctica:** Si no puedes señalar la línea de la fuente que respalda un párrafo, ese párrafo es opinión (está bien si es tuya y se presenta como tal) o es relleno (bórralo).

## Paso dos: escribe una guía de voz y de afirmaciones

La mayoría de los documentos de "voz de marca" describen adjetivos: cercana, experta, accesible. Un modelo no puede hacer mucho con adjetivos. Lo que sí puede seguir son reglas concretas, y las más útiles son sobre afirmaciones, no sobre tono.

Mantenla en una página, con tres columnas:

| Lo que decimos | Lo que nunca decimos | La evidencia que podemos mostrar |
|---|---|---|
| "Una primera versión suele estar funcionando en unas semanas" | "Resultados inmediatos" o cualquier garantía | La página de proceso y los plazos que publicamos |
| Frases cortas, verbos simples, números específicos | "Líderes", "los mejores", "de clase mundial" | Métodos con nombre, documentación pública |
| "Empezaríamos por X, porque…" | "Depende", sin decir de qué | Ejemplos trabajados, señalados como ejemplos |

Luego agrega un bloque de estilo corto que el modelo recibe con cada borrador:

```text
VOZ
- Escribe como un operador senior que le explica algo a un colega. Directo, tranquilo, específico.
- Párrafos cortos (1 a 4 oraciones). Varía el largo de las oraciones.
- Tutea al lector. Español neutro latinoamericano.
- Toma una postura y da la razón.

AFIRMACIONES
- Usa solo datos de las fuentes adjuntas. Marca los datos faltantes como [FALTA FUENTE].
- Ninguna estadística sin un enlace a la fuente primaria.
- Ningún nombre, resultado o cita de clientes salvo que la fuente indique que está aprobado.

NUNCA
- Arranques que definen el tema. Cierres que repiten la introducción.
- Palabras: soluciones integrales, de vanguardia, de clase mundial, "en un mercado cada vez más competitivo".

EJEMPLOS DE NUESTRO MEJOR TRABAJO
- [pega dos o tres párrafos de los que te sientas orgulloso]
```

La columna de evidencia importa más de lo que parece. Frena el tipo de relleno más dañino: afirmaciones contundentes que tu empresa no puede respaldar cuando un comprador pregunta.

## Paso tres: redacta contra las fuentes y edita como editor

Con la biblioteca y la guía listas, redactar es la parte menos interesante. Dale al modelo las fuentes de una pieza, la guía y un brief de un párrafo que diga quién es el lector y cuál es la única idea que la pieza debe dejar, y pídele primero un esquema. Corrige el esquema antes de que exista una sola línea de texto. Mover una sección cuesta mucho menos que reescribirla.

Después, una persona edita el borrador con una checklist. Esta es la nuestra:

- ¿La apertura pone al lector en una situación real o hace una afirmación que se podría discutir?
- ¿Cada dato se puede rastrear hasta una fuente de la biblioteca o una fuente primaria enlazada?
- ¿Hay al menos una cosa aquí que un competidor no podría publicar?
- ¿Eliminamos cada frase que sobreviviría intacta en el sitio de otra empresa?
- ¿Los ejemplos son específicos (personas, cifras, secuencias) y están marcados cuando son hipotéticos?
- ¿El experto al que entrevistamos lo firmaría como suyo?

Esa última pregunta carga con casi todo el peso. Si el socio lee el artículo y dice "yo nunca lo diría así", la voz está mal, diga lo que diga la guía de estilo.

## Un ejemplo completo: una entrevista, una semana de contenido

Así se convierte una sola conversación en una semana de distribución. La empresa y los tiempos son hipotéticos, pero la secuencia es la que seguimos. Los pasos marcados con **[persona]** se quedan en manos de alguien del equipo.

Imagina una firma contable de 40 personas. La responsable de marketing agenda 30 minutos con un socio y le hace las seis preguntas que más repitieron los prospectos en las llamadas de venta de ese mes.

| Paso | Quién | Resultado |
|---|---|---|
| 1. Elegir las preguntas a partir de las notas de venta | **[persona]** marketing | Seis preguntas, priorizadas |
| 2. Grabar la entrevista | **[persona]** socio + marketing | Grabación de 30 minutos |
| 3. Transcribir y etiquetar afirmaciones, historias y opiniones | IA | Transcripción etiquetada |
| 4. Armar el esquema de un artículo con la mejor respuesta | IA, luego **[persona]** aprueba | Esquema con líneas de fuente |
| 5. Redactar el artículo con la transcripción y la guía | IA | Borrador de unas 1,500 palabras |
| 6. Editar con la checklist, verificar datos, sumar cifras | **[persona]** editor | Artículo final |
| 7. El socio lo lee y lo aprueba | **[persona]** socio | Aprobación |
| 8. Sacar cuatro posts de LinkedIn de las otras respuestas | IA redacta, **[persona]** edita | Cuatro posts con la voz del socio |
| 9. Escribir el bloque del newsletter o el mensaje para la lista de difusión de WhatsApp | IA redacta, **[persona]** edita | Un bloque que enlaza al artículo |
| 10. Elegir tres clips de 45 a 60 segundos de la grabación | IA sugiere, **[persona]** elige | Tres clips cortos con subtítulos |

En este ejemplo, el socio dedica unos 30 minutos a hablar y 15 a leer. La responsable de marketing invierte unas horas en elegir y editar, en lugar de días en escribir. El modelo hace lo que hace bien: transcribir, estructurar, redactar primeras versiones y adaptar formatos. Cada afirmación de cada pieza se puede rastrear hasta algo que el socio dijo en la grabación.

> **Nota:** Los clips y los posts salen de respuestas que el artículo no usó. Reutilizar contenido funciona mejor cuando cada formato toma una parte distinta de la fuente, no cuando se reescribe el mismo párrafo cinco veces.

## Lo que nunca automatizaríamos

Algunas partes del trabajo de contenido parecen tareas, pero en realidad son criterio. En todos los sistemas que construimos se quedan con una persona con nombre, y también deberían estar en tu [política de uso de IA](/es/blog/politica-de-uso-de-ia-plantilla/):

- **El punto de vista.** Lo que tu empresa cree y está dispuesta a defender en público. Un modelo puede redactar una opinión, pero no puede sostenerla por ti.
- **La verificación final.** Las cifras, los nombres, las normas y las fechas los revisa una persona contra la fuente primaria antes de publicar.
- **Todo lo que hable de un cliente específico.** Los detalles de un caso, los resultados y las citas necesitan la aprobación explícita del cliente, y no debería ser un modelo quien la pida.
- **Las respuestas a personas reales.** Los comentarios, las quejas y las preguntas de periodistas los responde alguien que pueda hacerse cargo de la respuesta.
- **La decisión de publicar.** Alguien aprueba cada pieza, con nombre y apellido.

## Por dónde empezaríamos

No empezaríamos por una herramienta. Empezaríamos por una entrevista grabada esta semana y por las preguntas que aparecieron en las llamadas de venta del mes pasado. Escribe la guía de voz y de afirmaciones en una tarde. Haz el ejemplo de arriba una vez, de principio a fin, y mide cuánto tarda cada paso humano.

Después de dos o tres ciclos vas a saber dónde está tu verdadero cuello de botella. Lo más probable es que sea capturar el material de origen, no escribir. Esa es la parte que conviene sistematizar primero, y así armamos el Motor de contenido con IA en [Growth](/es/services/growth/): el conocimiento de tu equipo como insumo, borradores con tu voz como resultado y una persona aprobando cada pieza antes de que salga.
