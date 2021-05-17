type FAQItem = { question: string; answer: string };
type FAQ = { en: FAQItem; es: FAQItem; key: string };

export const FAQ_LIST: FAQ[] = [
  {
    key: "contacts",
    en: {
      question: "How do I add new contacts?",
      answer:
        "In this version of Connect, you can receive but not send contact requests. Anyone on your currently approved call list can request you as a contact once they download the Connect app on their smartphone. When someone requests you as a contact, their status will appear as pending until their photo ID is verified by a facility staff member. Once verified, they will be added to your active contact list and able to schedule calls with you.",
    },
    es: {
      question: "¿Cómo puedo agregar contactos nuevos?",
      answer:
        "En esta versión de Connect, puedes recibir pero no solicitar contactos.  Cualquier persona en tu lista de llamadas aprobadas puede solicitar ser tu contacto, tan solo con descargar la app de Connect en su celular. Cuando alguien solicita ser tu contacto , su estado aparecerá como pendiente hasta que un miembro del personal del centro verifique su identificación con fotografía. Una vez verificados, serán añadidos a tu lista de contactos activos y podrán programar llamadas contigo.",
    },
  },
  {
    key: "callsScheduled",
    en: {
      question: "How are calls scheduled?",
      answer:
        "In this version of Connect, your contacts can schedule calls with you, but you cannot schedule calls with them. When logged into your account, you can see all of the upcoming calls that your contacts have scheduled with you. Call times are shown in each person’s respective time zones.",
    },
    es: {
      question: "¿Cómo son programadas las llamadas?",
      answer:
        "En esta versión de Connect, tus contactos pueden programar llamadas pero tu no puedes programar llamadas con ellos. Cuando inicies sesión en tu cuenta, podrás ver todas las próximas llamadas que tus contactos han programado.  Las horas de las llamadas se muestran en las respectivas zonas horarias de tus contactos.",
    },
  },
  {
    key: "reschedule",
    en: {
      question: "What happens if I can’t make a scheduled call?",
      answer:
        "If you can’t make a scheduled call, you can cancel it whenever you’re logged into your account by selecting ‘View details’ on a given call. In this version of Connect, you may send a cancellation reason to help your contact reschedule for a time that works better for you. When you cancel a call, your contact will receive a notification and be given the immediate option to reschedule.",
    },
    es: {
      question: "¿Qué pasa si no puedo llegar a una llamada programada?",
      answer:
        'Si no puedes realizar una llamada programada, puedes cancelarla en tu cuenta seleccionando "Ver detalles" de la llamada.  En esta versión de Connect, puedes enviar un motivo de cancelación para ayudar a tu contacto a reprogramar una hora más conveniente. Cuando canceles una llamada, tu contacto recibirá una notificación y tendrá la opción inmediata de reprogramar.',
    },
  },
  {
    key: "storm",
    en: {
      question:
        "If an unexpected event happens that prevents me from participating in a scheduled call (i.e. lockdown, storm, etc.), will my contact be notified?",
      answer:
        "If you can’t make a scheduled call, you can cancel it whenever you’re logged into your account by selecting ‘View details’ on a given call. In this version of Connect, you may send a cancellation reason to help your contact reschedule for a time that works better for you. When you cancel a call, your contact will receive a notification and be given the immediate option to reschedule.",
    },
    es: {
      question:
        "Si se produce un acontecimiento inesperado que me impide participar en una llamada programada (por ejemplo, un cierre, una tormenta, etc.), ¿se notificará a mi contacto?",
      answer:
        "Lamentablemente, no en este momento. Sin embargo, entendemos la importancia de esta notificación y estamos trabajando para asegurar que pueda usarse en el futuro.",
    },
  },
  {
    key: "expectation",
    en: {
      question: "What can I expect for a call?",
      answer:
        "You may enter the video call Waiting Room up to 10 minutes before your scheduled time. While you are waiting, you can test the in-call features as well as check your video and audio connection.  (We recommend checking your video and audio connection at least once prior to a call.) Once the facility staff member is stationed and both you and your contact are in the Waiting Room, your call will automatically connect at the scheduled start time. All calls are [20] minutes long, and you may check how much time is remaining by toggling the in-call countdown display on/off. You may also leave and rejoin the call anytime within this [20]-minute time frame.",
    },
    es: {
      question: "¿Qué puedo esperar de una llamada?",
      answer:
        "Puedes entrar en la sala de espera de la videollamada hasta 10 minutos antes de la hora programada. Mientras esperas, puedes hacer una prueba de las funciones de la llamada y comprobar tu conexión de vídeo y audio. (Se recomienda comprobar la conexión de vídeo y audio al menos una vez antes de la llamada).\nUna vez que el miembro del personal de la instalación se encuentre y tanto usted como su contacto estén en la Sala de Espera, su llamada se conectará automáticamente a la hora programada.\nnTodas las llamadas tienen una duración de [20]minutos. Puedes comprobar el tiempo restante en el teléfono. También puedes salir y volver a entrar en la llamada en cualquier momento dentro de este margen de tiempo de [20] minutos.\nTodas las llamadas tienen una duración de [20]minutos. Puedes comprobar el tiempo restante en el teléfono. También puedes salir y volver a entrar en la llamada en cualquier momento dentro de este margen de tiempo de [20] minutos.",
    },
  },
  {
    key: "features",
    en: {
      question: "What specific features are available to me in a call?",
      answer: "",
    },
    es: {
      question: "De qué funciones específicas dispongo en una llamada?",
      answer:
        "Activar/desactivar el micrófono, activar/desactivar la cámara de vídeo, activar/desactivar la cuenta atrás del reloj, intercambiar mensajes de chat durante la llamada con tu contacto (todos los mensajes son supervisados), informar de un problema técnico, abandonar la llamada (incluso si la abandona, puede reanudar la llamada en cualquier momento dentro de los 20 minutos programados.",
    },
  },
];
