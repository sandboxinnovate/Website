import type { Lang } from '@/i18n';

/** Command palette copy (EN/ES). Item labels live in items.ts. */
export const COPY = {
  en: {
    dialog: 'Command menu',
    placeholder: 'Search or ask a question…',
    inputLabel: 'Search the site or ask a question',
    help: 'Use the up and down arrows to move, Enter to open, Tab to jump between groups and Escape to close.',
    close: 'Close',
    groups: {
      recent: 'Recent',
      answers: 'Quick answers',
      pages: 'Pages',
      sections: 'On the home page',
      actions: 'Actions',
      fallback: 'Try instead',
    },
    answerTag: 'Answer',
    here: 'You are here',
    empty: (q: string) => `Nothing matches “${q}”.`,
    emptyBody: 'Ask us directly. A person replies within one business day.',
    count: (n: number) => (n === 1 ? '1 result' : `${n} results`),
    noResults: 'No results',
    hints: { move: 'Move', open: 'Open', groups: 'Groups', close: 'Close', newTab: 'New tab' },
    copied: 'Email copied',
    copyFailed: 'Could not copy. The address is',
    try: 'Try',
    suggestions: ['pricing', 'how long', 'security', 'agencies'],
  },
  es: {
    dialog: 'Menú de comandos',
    placeholder: 'Busca o haz una pregunta…',
    inputLabel: 'Busca en el sitio o haz una pregunta',
    help: 'Usa las flechas arriba y abajo para moverte, Enter para abrir, Tab para saltar entre grupos y Escape para cerrar.',
    close: 'Cerrar',
    groups: {
      recent: 'Recientes',
      answers: 'Respuestas rápidas',
      pages: 'Páginas',
      sections: 'En la página de inicio',
      actions: 'Acciones',
      fallback: 'Prueba con',
    },
    answerTag: 'Respuesta',
    here: 'Estás aquí',
    empty: (q: string) => `Nada coincide con “${q}”.`,
    emptyBody: 'Pregúntanos directamente. Una persona te responde en un día hábil.',
    count: (n: number) => (n === 1 ? '1 resultado' : `${n} resultados`),
    noResults: 'Sin resultados',
    hints: { move: 'Moverse', open: 'Abrir', groups: 'Grupos', close: 'Cerrar', newTab: 'Nueva pestaña' },
    copied: 'Email copiado',
    copyFailed: 'No se pudo copiar. La dirección es',
    try: 'Prueba',
    suggestions: ['precios', 'plazos', 'seguridad', 'agencias'],
  },
} satisfies Record<Lang, unknown>;

export type PaletteCopy = (typeof COPY)['en'];
