export type CardRating = { verbreitung?: number; komplexitaet?: number; emotionalitaet?: number };

export type ArgumentCard = {
  id: number;
  slug: string;
  title: string;
  argument: string;
  shortReply: string;
  meaning: string;
  notMeaning: string;
  commonFormulations: string[];
  categorySlug: string;
  categoryLabel: string;
  ratings: CardRating;
};

export const cards: ArgumentCard[] = [
  {
    "id": 1,
    "slug": "argument-01",
    "title": "Pflanzen haben auch Gefühle.",
    "argument": "Pflanzen haben auch Gefühle.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 71,
      "komplexitaet": 55,
      "emotionalitaet": 60
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument stellt infrage, ob Veganismus Pflanzen moralisch willkürlich ausklammert. Es versucht, die Grenze zwischen empfindungsfähigen Tieren und Pflanzen zu verwischen.",
    "notMeaning": "Es zeigt nicht, dass Pflanzen nachweislich leidensfähig sind oder dass Tierhaltung deshalb unproblematisch wäre. Selbst wenn Pflanzen moralisch zählen würden, spräche das eher für Veganismus, weil Tierprodukte deutlich mehr Pflanzenverbrauch verursachen.",
    "commonFormulations": [
      "Pflanzen haben doch auch Gefühle.",
      "Wenn du Tiere nicht essen willst, darfst du Pflanzen auch nicht essen.",
      "Wo ziehst du denn dann die Grenze?"
    ]
  },
  {
    "id": 2,
    "slug": "argument-02",
    "title": "Ein Veganer mehr oder weniger ändert nichts.",
    "argument": "Ein Veganer mehr oder weniger ändert nichts.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 41,
      "komplexitaet": 19,
      "emotionalitaet": 59
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument behauptet, individuelle Konsumentscheidungen seien wirkungslos, weil große Systeme sich angeblich nicht durch einzelne Personen verändern.",
    "notMeaning": "Es zeigt nicht, dass Handlungen moralisch egal sind, sobald sie alleine nicht die ganze Welt verändern. Viele gesellschaftliche Veränderungen entstehen gerade durch viele einzelne Entscheidungen, die zusammen Nachfrage, Normen und Politik verschieben.",
    "commonFormulations": [
      "Ein einzelner Veganer ändert doch gar nichts.",
      "Ob ich das kaufe oder nicht, macht keinen Unterschied.",
      "Das Tier ist ja sowieso schon tot."
    ]
  },
  {
    "id": 3,
    "slug": "argument-03",
    "title": "Die große Mehrheit der Menschen isst Tierprodukte.",
    "argument": "Die große Mehrheit der Menschen isst Tierprodukte.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 55,
      "komplexitaet": 31,
      "emotionalitaet": 46
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument verweist auf die Mehrheitsmeinung oder Mehrheitsgewohnheit, um Veganismus als unrealistisch, übertrieben oder normabweichend darzustellen.",
    "notMeaning": "Es zeigt nicht, dass eine Handlung moralisch richtig ist. Viele heute kritisierte Praktiken waren historisch mehrheitsfähig; Mehrheit kann erklären, warum etwas normal wirkt, aber nicht, ob es gerechtfertigt ist.",
    "commonFormulations": [
      "Fast alle essen Fleisch.",
      "Wenn es so schlimm wäre, würden es nicht alle machen.",
      "Die Mehrheit kann doch nicht komplett falsch liegen."
    ]
  },
  {
    "id": 4,
    "slug": "argument-04",
    "title": "Das Fleisch im Supermarkt ist ja bereits tot.",
    "argument": "Das Fleisch im Supermarkt ist ja bereits tot.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 53,
      "komplexitaet": 29,
      "emotionalitaet": 23
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument trennt den Kauf von Tierprodukten vom vorherigen Töten und stellt den Konsum als bloße Nutzung eines bereits vorhandenen Produkts dar.",
    "notMeaning": "Es zeigt nicht, dass der Kauf folgenlos ist. Bezahlen schafft Nachfrage und trägt dazu bei, dass neue Tiere gezüchtet, gehalten und getötet werden.",
    "commonFormulations": [
      "Das Fleisch liegt doch schon im Supermarkt.",
      "Wenn ich es nicht kaufe, kauft es jemand anderes.",
      "Das Tier ist ja bereits tot."
    ]
  },
  {
    "id": 5,
    "slug": "argument-05",
    "title": "Tiere leben ja nur, weil wir sie züchten.",
    "argument": "Tiere leben ja nur, weil wir sie züchten.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 41,
      "komplexitaet": 25,
      "emotionalitaet": 50
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument stellt Zucht als eine Art Lebensgeschenk dar: Tiere hätten ohne Tierindustrie nie existiert, also sei ihre Nutzung gerechtfertigt.",
    "notMeaning": "Es zeigt nicht, dass es gut ist, ein Wesen nur zu erzeugen, um es auszubeuten und früh zu töten. Existenz allein rechtfertigt nicht automatisch die Bedingungen, unter denen ein Leben geschaffen wird.",
    "commonFormulations": [
      "Ohne uns gäbe es diese Tiere gar nicht.",
      "Die Tiere verdanken uns ihr Leben.",
      "Lieber kurz leben als gar nicht leben."
    ]
  },
  {
    "id": 6,
    "slug": "argument-06",
    "title": "Man lebt nur einmal, also gönn dir!",
    "argument": "Man lebt nur einmal, also gönn dir!",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 44,
      "komplexitaet": 33,
      "emotionalitaet": 58
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument beruft sich auf Genuss, Endlichkeit und Lebensfreude. Es stellt moralische Einschränkungen als unnötigen Verzicht dar.",
    "notMeaning": "Es zeigt nicht, dass Genuss jede Handlung rechtfertigt. Dass etwas Freude macht oder Tradition hat, beantwortet nicht die Frage, ob dafür vermeidbares Leid anderer in Kauf genommen werden sollte.",
    "commonFormulations": [
      "Man lebt nur einmal.",
      "Gönn dir doch einfach.",
      "Ich will mir nicht alles verbieten lassen."
    ]
  },
  {
    "id": 7,
    "slug": "argument-07",
    "title": "Alles in Maßen, einmal die Woche ist okay.",
    "argument": "Alles in Maßen, einmal die Woche ist okay.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 86,
      "komplexitaet": 39,
      "emotionalitaet": 69
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument versucht, Tierkonsum durch Reduktion zu entschärfen. Es sagt: Nicht täglich, sondern nur gelegentlich sei moralisch ausreichend.",
    "notMeaning": "Es zeigt nicht, dass gelegentliche Ausbeutung moralisch unproblematisch ist. Weniger Schaden kann besser sein als mehr Schaden, aber es erklärt noch nicht, warum vermeidbarer Schaden überhaupt nötig ist.",
    "commonFormulations": [
      "Alles in Maßen.",
      "Einmal die Woche ist doch okay.",
      "Ich esse ja schon weniger Fleisch."
    ]
  },
  {
    "id": 8,
    "slug": "argument-08",
    "title": "Auf einer einsamen Insel würdest du auch Tiere essen.",
    "argument": "Auf einer einsamen Insel würdest du auch Tiere essen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 63,
      "komplexitaet": 35,
      "emotionalitaet": 60
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument nutzt eine extreme Notsituation, um Veganismus im Alltag als unhaltbar erscheinen zu lassen.",
    "notMeaning": "Es zeigt nicht, was unter normalen Bedingungen moralisch geboten ist. Entscheidungen in Überlebenssituationen unterscheiden sich stark von Supermarkt-, Mensa- oder Restaurantentscheidungen.",
    "commonFormulations": [
      "Auf einer einsamen Insel würdest du auch Tiere essen.",
      "Wenn du verhungerst, wärst du auch nicht mehr vegan.",
      "In der Natur geht es ums Überleben."
    ]
  },
  {
    "id": 9,
    "slug": "argument-09",
    "title": "Vielleicht spüren Tiere gar keinen Schmerz.",
    "argument": "Vielleicht spüren Tiere gar keinen Schmerz.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 16,
      "komplexitaet": 13,
      "emotionalitaet": 51
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument stellt die Leidensfähigkeit von Tieren infrage und versucht, moralische Rücksicht von wissenschaftlicher Gewissheit abhängig zu machen.",
    "notMeaning": "Es zeigt nicht, dass Tiere keine Schmerzen empfinden. Gerade bei Unsicherheit wäre Vorsicht angebracht, zumal Verhalten, Nervensysteme und Forschung stark dafür sprechen, dass viele Tiere leidensfähig sind.",
    "commonFormulations": [
      "Vielleicht spüren Tiere gar keinen Schmerz.",
      "Wir wissen doch nicht, was Tiere fühlen.",
      "Das sind doch nur Instinkte."
    ]
  },
  {
    "id": 10,
    "slug": "argument-10",
    "title": "Es ist Tradition. Menschen haben schon immer Tierprodukte gegessen.",
    "argument": "Es ist Tradition. Menschen haben schon immer Tierprodukte gegessen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 88,
      "komplexitaet": 53,
      "emotionalitaet": 73
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Es ist Tradition. Menschen haben schon immer Tierprodukte gegessen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 11,
    "slug": "argument-11",
    "title": "Veganismus gefährdet meine Kultur und Identität.",
    "argument": "Veganismus gefährdet meine Kultur und Identität.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 48,
      "komplexitaet": 62,
      "emotionalitaet": 64
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganismus gefährdet meine Kultur und Identität.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 12,
    "slug": "argument-12",
    "title": "Fleischkonsum ist natürlich.",
    "argument": "Fleischkonsum ist natürlich.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 86,
      "komplexitaet": 18,
      "emotionalitaet": 70
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Fleischkonsum ist natürlich.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 13,
    "slug": "argument-13",
    "title": "Der Mensch steht an der Spitze der Nahrungskette.",
    "argument": "Der Mensch steht an der Spitze der Nahrungskette.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 58,
      "komplexitaet": 22,
      "emotionalitaet": 59
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Der Mensch steht an der Spitze der Nahrungskette.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 14,
    "slug": "argument-14",
    "title": "Menschen sind Allesfresser, also sollen sie auch alles essen dürfen.",
    "argument": "Menschen sind Allesfresser, also sollen sie auch alles essen dürfen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 65,
      "komplexitaet": 58,
      "emotionalitaet": 64
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Menschen sind Allesfresser, also sollen sie auch alles essen dürfen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 15,
    "slug": "argument-15",
    "title": "Die Tiere sterben ja sowieso irgendwann.",
    "argument": "Die Tiere sterben ja sowieso irgendwann.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 45,
      "komplexitaet": 27,
      "emotionalitaet": 61
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Die Tiere sterben ja sowieso irgendwann.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 16,
    "slug": "argument-16",
    "title": "Löwen essen auch Fleisch. Sie sind sogar darauf angewiesen.",
    "argument": "Löwen essen auch Fleisch. Sie sind sogar darauf angewiesen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 75,
      "komplexitaet": 51,
      "emotionalitaet": 90
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Löwen essen auch Fleisch. Sie sind sogar darauf angewiesen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 17,
    "slug": "argument-17",
    "title": "Mein Gott erlaubt es mir, (gewisses) Fleisch zu essen.",
    "argument": "Mein Gott erlaubt es mir, (gewisses) Fleisch zu essen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 66,
      "komplexitaet": 95,
      "emotionalitaet": 69
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Mein Gott erlaubt es mir, (gewisses) Fleisch zu essen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 18,
    "slug": "argument-18",
    "title": "Tiere sind zum Essen da. Dafür wurden sie erschaffen.",
    "argument": "Tiere sind zum Essen da. Dafür wurden sie erschaffen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 69,
      "komplexitaet": 48,
      "emotionalitaet": 50
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Natur, Kultur & Religion infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Tiere sind zum Essen da. Dafür wurden sie erschaffen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 19,
    "slug": "argument-19",
    "title": "Tiere würden uns auch essen, wenn sie könnten.",
    "argument": "Tiere würden uns auch essen, wenn sie könnten.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 59,
      "komplexitaet": 28,
      "emotionalitaet": 72
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Tiere würden uns auch essen, wenn sie könnten.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 20,
    "slug": "argument-20",
    "title": "Tiere würden sich unkontrolliert vermehren, wenn wir sie nicht essen.",
    "argument": "Tiere würden sich unkontrolliert vermehren, wenn wir sie nicht essen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 52,
      "komplexitaet": 13,
      "emotionalitaet": 49
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Tiere würden sich unkontrolliert vermehren, wenn wir sie nicht essen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 21,
    "slug": "argument-21",
    "title": "Wenn alle vegan werden, würden Landwirt:innen ihren Job verlieren.",
    "argument": "Wenn alle vegan werden, würden Landwirt:innen ihren Job verlieren.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 50,
      "komplexitaet": 53,
      "emotionalitaet": 81
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Wenn alle vegan werden, würden Landwirt:innen ihren Job verlieren.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 22,
    "slug": "argument-22",
    "title": "Konsequente Veganer dürften ihr Haus nicht verlassen, da sonst Tiere sterben.",
    "argument": "Konsequente Veganer dürften ihr Haus nicht verlassen, da sonst Tiere sterben.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 35,
      "komplexitaet": 66,
      "emotionalitaet": 75
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Konsequente Veganer dürften ihr Haus nicht verlassen, da sonst Tiere sterben.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 23,
    "slug": "argument-23",
    "title": "Wenn ich vegan werde, ende ich schwach, blass und untergewichtig.",
    "argument": "Wenn ich vegan werde, ende ich schwach, blass und untergewichtig.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 39,
      "komplexitaet": 35,
      "emotionalitaet": 67
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Wenn ich vegan werde, ende ich schwach, blass und untergewichtig.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 24,
    "slug": "argument-24",
    "title": "Ich kannte mal einen Veganer und der ist gestorben!",
    "argument": "Ich kannte mal einen Veganer und der ist gestorben!",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 39,
      "komplexitaet": 31,
      "emotionalitaet": 90
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Ich kannte mal einen Veganer und der ist gestorben!",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 25,
    "slug": "argument-25",
    "title": "Wenn alle vegan werden würden, gäbe es nicht genug Essen für alle.",
    "argument": "Wenn alle vegan werden würden, gäbe es nicht genug Essen für alle.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 47,
      "komplexitaet": 29,
      "emotionalitaet": 69
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Wenn alle vegan werden würden, gäbe es nicht genug Essen für alle.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 26,
    "slug": "argument-26",
    "title": "Wir müssen Jagen, um Ökosysteme im Gleichgewicht zu halten.",
    "argument": "Wir müssen Jagen, um Ökosysteme im Gleichgewicht zu halten.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 51,
      "komplexitaet": 61,
      "emotionalitaet": 33
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Wir müssen Jagen, um Ökosysteme im Gleichgewicht zu halten.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 27,
    "slug": "argument-27",
    "title": "Als nächstes schreibst du mir vor, was ich denken oder wen ich lieben soll!",
    "argument": "Als nächstes schreibst du mir vor, was ich denken oder wen ich lieben soll!",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 40,
      "komplexitaet": 14,
      "emotionalitaet": 87
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf dammbruchargumente infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Als nächstes schreibst du mir vor, was ich denken oder wen ich lieben soll!",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 28,
    "slug": "argument-28",
    "title": "Viele Anbauflächen sind nur für Tierhaltung nutzbar.",
    "argument": "Viele Anbauflächen sind nur für Tierhaltung nutzbar.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 51,
      "komplexitaet": 89,
      "emotionalitaet": 32
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Viele Anbauflächen sind nur für Tierhaltung nutzbar.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 29,
    "slug": "argument-29",
    "title": "Wir brauchen Tiere für Dünger.",
    "argument": "Wir brauchen Tiere für Dünger.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 22,
      "komplexitaet": 68,
      "emotionalitaet": 41
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Wir brauchen Tiere für Dünger.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 30,
    "slug": "argument-30",
    "title": "Fleischkonsum ist legal, daher kann es nicht so schlimm sein.",
    "argument": "Fleischkonsum ist legal, daher kann es nicht so schlimm sein.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 33,
      "komplexitaet": 27,
      "emotionalitaet": 31
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Fleischkonsum ist legal, daher kann es nicht so schlimm sein.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 31,
    "slug": "argument-31",
    "title": "Vegane Alternativen sind viel teurer als Tierprodukte.",
    "argument": "Vegane Alternativen sind viel teurer als Tierprodukte.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 22,
      "komplexitaet": 25,
      "emotionalitaet": 59
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Vegane Alternativen sind viel teurer als Tierprodukte.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 32,
    "slug": "argument-32",
    "title": "Wir sollten erst menschliches Leid lösen.",
    "argument": "Wir sollten erst menschliches Leid lösen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 41,
      "emotionalitaet": 66,
      "komplexitaet": 37
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Wir sollten erst menschliches Leid lösen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 33,
    "slug": "argument-33",
    "title": "Der Anbau von Soja zerstört den Regenwald.",
    "argument": "Der Anbau von Soja zerstört den Regenwald.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 83,
      "komplexitaet": 48,
      "emotionalitaet": 72
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Der Anbau von Soja zerstört den Regenwald.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 34,
    "slug": "argument-34",
    "title": "Es ist eine persönliche Entscheidung, ob jemand Tierprodukte unterstützt.",
    "argument": "Es ist eine persönliche Entscheidung, ob jemand Tierprodukte unterstützt.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 90,
      "komplexitaet": 22,
      "emotionalitaet": 94
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Es ist eine persönliche Entscheidung, ob jemand Tierprodukte unterstützt.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 35,
    "slug": "argument-35",
    "title": "Vegane Alternativen schmecken mir einfach nicht.",
    "argument": "Vegane Alternativen schmecken mir einfach nicht.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 92,
      "komplexitaet": 21,
      "emotionalitaet": 56
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Vegane Alternativen schmecken mir einfach nicht.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 36,
    "slug": "argument-36",
    "title": "Die Politik trägt die Verantwortung.",
    "argument": "Die Politik trägt die Verantwortung.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 43,
      "komplexitaet": 45,
      "emotionalitaet": 45
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Praktikabilität, Gesellschaft & Politik infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Die Politik trägt die Verantwortung.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 37,
    "slug": "argument-37",
    "title": "Veganern mangelt es oft an Proteinen, Vitamin B12, Kalzium und so weiter.",
    "argument": "Veganern mangelt es oft an Proteinen, Vitamin B12, Kalzium und so weiter.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 89,
      "komplexitaet": 70,
      "emotionalitaet": 32
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganern mangelt es oft an Proteinen, Vitamin B12, Kalzium und so weiter.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 38,
    "slug": "argument-38",
    "title": "Unsere Körper können pflanzliche Nährstoffe oft schlechter aufnehmen.",
    "argument": "Unsere Körper können pflanzliche Nährstoffe oft schlechter aufnehmen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 66,
      "komplexitaet": 81,
      "emotionalitaet": 34
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Unsere Körper können pflanzliche Nährstoffe oft schlechter aufnehmen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 39,
    "slug": "argument-39",
    "title": "Warum supplementieren, wenn es auch mit Tierprodukten geht?",
    "argument": "Warum supplementieren, wenn es auch mit Tierprodukten geht?",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 69,
      "komplexitaet": 27,
      "emotionalitaet": 67
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Warum supplementieren, wenn es auch mit Tierprodukten geht?",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 40,
    "slug": "argument-40",
    "title": "Gerade Kinder, Schwangere, Stillende und Ältere sollten Tierprodukte essen.",
    "argument": "Gerade Kinder, Schwangere, Stillende und Ältere sollten Tierprodukte essen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 61,
      "komplexitaet": 87,
      "emotionalitaet": 85
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Gerade Kinder, Schwangere, Stillende und Ältere sollten Tierprodukte essen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 41,
    "slug": "argument-41",
    "title": "Manche Menschen haben besondere Krankheiten, die Veganismus erschweren.",
    "argument": "Manche Menschen haben besondere Krankheiten, die Veganismus erschweren.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 24,
      "komplexitaet": 68,
      "emotionalitaet": 87
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Manche Menschen haben besondere Krankheiten, die Veganismus erschweren.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 42,
    "slug": "argument-42",
    "title": "Vegane Ersatzprodukte sind oft hochverarbeitet.",
    "argument": "Vegane Ersatzprodukte sind oft hochverarbeitet.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 83,
      "komplexitaet": 68,
      "emotionalitaet": 51
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Vegane Ersatzprodukte sind oft hochverarbeitet.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 43,
    "slug": "argument-43",
    "title": "Avokados und Mandeln sind schlimmer für die Umwelt als Fleisch.",
    "argument": "Avokados und Mandeln sind schlimmer für die Umwelt als Fleisch.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 51,
      "komplexitaet": 61,
      "emotionalitaet": 53
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Avokados und Mandeln sind schlimmer für die Umwelt als Fleisch.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 44,
    "slug": "argument-44",
    "title": "Regionale Bio-Fleischproduktion ist nachhaltig.",
    "argument": "Regionale Bio-Fleischproduktion ist nachhaltig.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 89,
      "komplexitaet": 79,
      "emotionalitaet": 65
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Regionale Bio-Fleischproduktion ist nachhaltig.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 45,
    "slug": "argument-45",
    "title": "Pestizide zerstören die Umwelt.",
    "argument": "Pestizide zerstören die Umwelt.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 10,
      "komplexitaet": 53,
      "emotionalitaet": 52
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Gesundheit, Umwelt & Nachhaltigkeit infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Pestizide zerstören die Umwelt.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 46,
    "slug": "argument-46",
    "title": "Veganer sind militant und missionieren ein extremes, absolutistisches Weltbild.",
    "argument": "Veganer sind militant und missionieren ein extremes, absolutistisches Weltbild.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 78,
      "komplexitaet": 35,
      "emotionalitaet": 81
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganer sind militant und missionieren ein extremes, absolutistisches Weltbild.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 47,
    "slug": "argument-47",
    "title": "Veganer lügen und zeigen immer nur die schlimmsten Zustände der Industrie.",
    "argument": "Veganer lügen und zeigen immer nur die schlimmsten Zustände der Industrie.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 32,
      "komplexitaet": 21,
      "emotionalitaet": 69
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganer lügen und zeigen immer nur die schlimmsten Zustände der Industrie.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 48,
    "slug": "argument-48",
    "title": "Veganer hassen Bauern und lieben Tiere mehr als Menschen.",
    "argument": "Veganer hassen Bauern und lieben Tiere mehr als Menschen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 53,
      "komplexitaet": 36,
      "emotionalitaet": 80
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganer hassen Bauern und lieben Tiere mehr als Menschen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 49,
    "slug": "argument-49",
    "title": "Veganer halten sich für was besseres und für moralisch überlegen.",
    "argument": "Veganer halten sich für was besseres und für moralisch überlegen.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 68,
      "komplexitaet": 15,
      "emotionalitaet": 81
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganer halten sich für was besseres und für moralisch überlegen.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 50,
    "slug": "argument-50",
    "title": "Veganer sind Heuchler, da sie SUVs fahren und jedes Jahr ein neues Handy haben.",
    "argument": "Veganer sind Heuchler, da sie SUVs fahren und jedes Jahr ein neues Handy haben.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 44,
      "komplexitaet": 33,
      "emotionalitaet": 51
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganer sind Heuchler, da sie SUVs fahren und jedes Jahr ein neues Handy haben.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 51,
    "slug": "argument-51",
    "title": "Veganer sind privilegiert und realitätsfern.",
    "argument": "Veganer sind privilegiert und realitätsfern.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 52,
      "komplexitaet": 54,
      "emotionalitaet": 78
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Veganer sind privilegiert und realitätsfern.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 52,
    "slug": "argument-52",
    "title": "Hitler war Vegetarier.",
    "argument": "Hitler war Vegetarier.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 35,
      "komplexitaet": 43,
      "emotionalitaet": 75
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Hitler war Vegetarier.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 53,
    "slug": "argument-53",
    "title": "Warum lassen Veganer ihr Essen aussehen und schmecken wie Tierprodukte?",
    "argument": "Warum lassen Veganer ihr Essen aussehen und schmecken wie Tierprodukte?",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 70,
      "komplexitaet": 27,
      "emotionalitaet": 78
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Warum lassen Veganer ihr Essen aussehen und schmecken wie Tierprodukte?",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  },
  {
    "id": 54,
    "slug": "argument-54",
    "title": "Vegane Landwirtschaft tötet auch Tiere, zum Beispiel bei der Ernte.",
    "argument": "Vegane Landwirtschaft tötet auch Tiere, zum Beispiel bei der Ernte.",
    "shortReply": "Das rechtfertigt vermeidbare Tierausbeutung nicht.",
    "ratings": {
      "verbreitung": 57,
      "komplexitaet": 55,
      "emotionalitaet": 39
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganer:innen",
    "meaning": "Dieses Argument wird häufig genutzt, um Veganismus mit Blick auf Veganer:innen infrage zu stellen. Es soll zeigen, dass die vegane Position angeblich übertrieben, einseitig oder praktisch schwer durchzuhalten sei.",
    "notMeaning": "Es zeigt nicht automatisch, dass Tierausbeutung moralisch unproblematisch ist. Meist verschiebt es die Diskussion weg von der konkreten Frage, ob vermeidbares Leid und Töten für Konsum gerechtfertigt sind.",
    "commonFormulations": [
      "Vegane Landwirtschaft tötet auch Tiere, zum Beispiel bei der Ernte.",
      "Das ist doch nicht so einfach.",
      "Da muss man auch die andere Seite sehen."
    ]
  }
] as const satisfies ArgumentCard[];

export const getCardById = (id: string | number) =>
  cards.find((card) => card.id === Number(id));
