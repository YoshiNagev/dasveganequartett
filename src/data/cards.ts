export type CardRating = {
  verbreitung: number;
  komplexitaet: number;
  emotionalitaet: number;
  deluluFaktor: number;
  ragebaitFaktor: number;
  ablenkungsfaktor: number;
};

export type ArgumentCard = {
  id: number;
  slug: string;
  title: string;
  argument: string;
  officialShortAnswer: string;
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
    "officialShortAnswer": "Pflanzen besitzen nach heutigem Kenntnisstand kein Nervensystem und kein bewusstes Schmerzempfinden. Außerdem werden für Tierprodukte aktuell mehr Pflanzen verbraucht als für eine direkte pflanzliche Ernährung.",
    "ratings": {
      "verbreitung": 69,
      "komplexitaet": 26,
      "emotionalitaet": 41,
      "deluluFaktor": 97,
      "ragebaitFaktor": 67,
      "ablenkungsfaktor": 89
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument stellt infrage, dass Tiere moralisch relevant seien, Pflanzen jedoch nicht. Befürworter weisen darauf hin, dass Pflanzen auf Licht, Berührung, Trockenheit, Nährstoffmangel und viele andere Umweltreize reagieren können. Manche Pflanzen schließen ihre Blätter bei Berührung, andere senden chemische Warnsignale an benachbarte Pflanzen. weitere Beispiele gibt es zu Genüge.",
    "notMeaning": "Dieses Argument sagt nicht, dass wir aufhören sollten, überhaupt noch was zu essen. Außerdem sagt es nicht, dass Tierausbeutung gerechtfertigt sei. Es versucht bloß, zu zeigen, dass Veganismus nicht unbedingt die beste Lösung ist, wenn es darum geht, keine Lebewesen zu töten.",
    "commonFormulations": [
      "Pflanzen haben doch auch Gefühle.",
      "Dein Gemüse schreit auch!"
    ]
  },
  {
    "id": 2,
    "slug": "argument-02",
    "title": "Ein Veganer mehr oder weniger ändert nichts.",
    "argument": "Ein Veganer mehr oder weniger ändert nichts.",
    "officialShortAnswer": "Jede Kaufentscheidung beeinflusst Angebot und Nachfrage. Schon eine einzelne vegane Lebensweise erspart im Durchschnitt vielen Tieren Leid und trägt zusammen mit den Entscheidungen anderer zu gesellschaftlichem Wandel bei.",
    "ratings": {
      "verbreitung": 62,
      "komplexitaet": 27,
      "emotionalitaet": 51,
      "deluluFaktor": 60,
      "ragebaitFaktor": 38,
      "ablenkungsfaktor": 63
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Befürworter dieses Arguments meinen, dass veganwerden nichts beziehungsweise nahezu nichts bewirken würde, da die Tiere dann von jemand anderem ausgebeutet werden würden. Eine einzige Person kann das etablierte System nicht ändern.",
    "notMeaning": "Das Argument verneint nicht, dass Tierhaltung moralisch verwerflich sei. Es meint nur, dass dass der Unterschied, den eine einzelne Person bewirken kann, praktisch gesehen zu vernachlässigen sei.",
    "commonFormulations": [
      "Ein einzelner Veganer ändert doch gar nichts.",
      "Wenn ich vegan werde, würden halt andere Menschen die Tiere essen, die ich sonst gegessen hätte.",
      "Du kannst eh nicht alle retten!"
    ]
  },
  {
    "id": 3,
    "slug": "argument-03",
    "title": "Die große Mehrheit der Menschen isst Tierprodukte.",
    "argument": "Die große Mehrheit der Menschen isst Tierprodukte.",
    "officialShortAnswer": "Die Beliebtheit einer Handlung entscheidet nicht über ihre moralische Richtigkeit. Viele heute als falsch anerkannte Praktiken waren einst gesellschaftliche Mehrheit. Zudem sind die Tiere in der Mehrheit und sie wollen leben.",
    "ratings": {
      "verbreitung": 71,
      "komplexitaet": 13,
      "emotionalitaet": 67,
      "deluluFaktor": 42,
      "ragebaitFaktor": 51,
      "ablenkungsfaktor": 80
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Befürworter dieses Arguments beziehen sich auf das Gute im Menschen. Die Menschheit besteht aus hauptsächlich guten Menschen, also kann es gar nicht sein, dass der Konsum von Tierprodukten so verwerflich sei.",
    "notMeaning": "Dieses Argument versucht nicht, zu zeigen, dass Veganismus eine unzureichende Lösung für ein Problem sei. Stattdessen versucht es, zu zeigen, dass nicht-vegan-sein gar kein gravierendes Problem sei.",
    "commonFormulations": [
      "Wenn es so schlimm wäre, würden es nicht alle machen.",
      "Die Mehrheit kann doch nicht komplett falsch liegen.",
      "Ich kenne gute Menschen, die Fleisch essen."
    ]
  },
  {
    "id": 4,
    "slug": "argument-04",
    "title": "Das Fleisch im Supermarkt ist ja bereits tot.",
    "argument": "Das Fleisch im Supermarkt ist ja bereits tot.",
    "officialShortAnswer": "Dass ein Tier bereits getötet wurde, macht den Kauf nicht folgenlos. Jeder Kauf erhöht die Nachfrage und trägt dazu bei, dass weitere Tiere gezüchtet, ausgebeutet und getötet werden.",
    "ratings": {
      "verbreitung": 54,
      "komplexitaet": 25,
      "emotionalitaet": 41,
      "deluluFaktor": 75,
      "ragebaitFaktor": 62,
      "ablenkungsfaktor": 58
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Befürworter dieses Arguments begründen den Konsum von Tierprodukten mit dem Fakt, dass dem toten Tier im Supermarkt nicht mehr geholfen werden kann. Dementsprechend sei es sogar eine Verschwendung, das Stück Fleisch nicht zu kaufen.",
    "notMeaning": "Dieses Argument meint, nicht vegan zu sein, sei kein großes Problem, da der Schaden ja schon angerichtet wurde. Das Tier jetzt zu essen, macht wenigstes das beste aus dieser Situation.",
    "commonFormulations": [
      "Für das Tier im Supermarkt ist es bereits zu spät.",
      "Das Tier ist ja bereits tot.",
      "Ich mache damit doch nur das Beste aus dieser Situation."
    ]
  },
  {
    "id": 5,
    "slug": "argument-05",
    "title": "Wir schenken Tieren das Leben, also dürfen wir es auch nehmen.",
    "argument": "Wir schenken Tieren das Leben, also dürfen wir es auch nehmen.",
    "officialShortAnswer": "Jemandem das Leben zu schenken bedeutet nicht, das Recht zu besitzen, es nach Belieben wieder zu beenden. Nach derselben Logik dürften Eltern auch über Leben und Tod ihrer Kinder entscheiden.",
    "ratings": {
      "verbreitung": 46,
      "komplexitaet": 30,
      "emotionalitaet": 50,
      "deluluFaktor": 83,
      "ragebaitFaktor": 70,
      "ablenkungsfaktor": 33
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument rechtfertigt das Töten nichtmenschlicher Tiere mit einer Art Hierarchie. Wir haben den Tieren einen Platz in dieser Welt geschaffen, den sie ohne uns nicht hätten, was uns das Recht gibt, Ihnen diesen Platz auch wieder zu nehmen.",
    "notMeaning": "Dieses Argument behauptet nicht, dass wir das Recht haben, alles mit den Tieren zu tun, das uns gefällt. Diese Hierarchie gäbe uns lediglich das Recht, sie zu töten, nicht aber, sie zu foltern.",
    "commonFormulations": [
      "Ohne uns gäbe es diese Tiere gar nicht.",
      "Die Tiere verdanken uns ihr Leben."
    ]
  },
  {
    "id": 6,
    "slug": "argument-06",
    "title": "Man lebt nur einmal, also gönn dir!",
    "argument": "Man lebt nur einmal, also gönn dir!",
    "officialShortAnswer": "Dass wir nur einmal leben, gilt auch für die Tiere. Persönlicher Genuss allein rechtfertigt nicht, einem anderen fühlenden Lebewesen vermeidbares Leid oder den Tod zuzufügen.",
    "ratings": {
      "verbreitung": 22,
      "komplexitaet": 7,
      "emotionalitaet": 57,
      "deluluFaktor": 72,
      "ragebaitFaktor": 74,
      "ablenkungsfaktor": 79
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument beruft sich auf Genuss, Endlichkeit und Lebensfreude. Es stellt moralische Einschränkungen als unnötigen Verzicht dar.",
    "notMeaning": "Es sagt nicht, dass durch Tierprodukte kein Leid entstünde. Stattdessen zieht es den eigenen Genuss den Tieren vor.",
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
    "officialShortAnswer": "Weniger Tierprodukte zu konsumieren verursacht zwar weniger Schaden als häufiger Konsum. Für das einzelne Tier wird die Ausbeutung aber nicht dadurch gerechtfertigt, dass sie nur selten stattfindet. Weniger Tierausbeutung ist besser, Ausbeutung von Tieren sollte dennoch vermieden werden.",
    "ratings": {
      "verbreitung": 89,
      "komplexitaet": 24,
      "emotionalitaet": 73,
      "deluluFaktor": 73,
      "ragebaitFaktor": 64,
      "ablenkungsfaktor": 56
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument akzeptiert teilweise, dass Tierausbeutung problematisch sein kann, zieht daraus aber nur eine Reduktionsforderung. Befürworter stellen seltenen Konsum als vernünftigen Mittelweg dar: weniger Fleisch, weniger Schuld, weniger Extrem. Es appelliert an Maßhalten, Kompromissbereitschaft und das Gefühl, dass kleine Mengen moralisch kaum ins Gewicht fallen.",
    "notMeaning": "Das Argument zeigt nicht, dass Tierausbeutung gerechtfertigt sei. Es wägt lediglich ein Extrem mit einem anderen ab und versucht, einen guten Mittelweg zu finden.",
    "commonFormulations": [
      "Alles in Maßen.",
      "Einmal die Woche Fleisch ist doch okay.",
      "Ich esse ja schon viel weniger als früher.",
      "Man muss nicht gleich komplett extrem werden.",
      "Ich bin doch schon zu 90% vegetarisch"    ]
  },
  {
    "id": 8,
    "slug": "argument-08",
    "title": "Auf einer einsamen Insel würdest du auch Tiere essen.",
    "argument": "Auf einer einsamen Insel würdest du auch Tiere essen.",
    "officialShortAnswer": "In Extremsituationen sind viele Handlungen ethisch vertretbar, die es im Alltag nicht wären. Glücklicherweise sind wir aber nicht auf einer einsamen Insel und müssen uns gegenseitig Meucheln, sondern können in den Supermarkt gehen und uns unser Essen kaufen.",
    "ratings": {
      "verbreitung": 57,
      "komplexitaet": 29,
      "emotionalitaet": 53,
      "deluluFaktor": 68,
      "ragebaitFaktor": 45,
      "ablenkungsfaktor": 84
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument nutzt eine extreme Notsituation, um die Alltagstauglichkeit von Veganismus infrage zu stellen. Befürworter wollen zeigen, dass Veganismus keine absolut ausnahmslose Regel sein könne, wenn selbst Veganer in einer Überlebenssituation Tiere essen würden. Es verschiebt die Diskussion von normalen Konsumentscheidungen zu Grenzfällen.",
    "notMeaning": "Das Argument zeigt nicht, dass Tierprodukte in einer normalen Supermarkt- oder Restaurant-Situation notwendig sind. Stattdessen versucht das Argument lediglich, zu begründen, warum Veganismus keine universelle Lösung für alle Menschen in allen Situationen sein kann.",
    "commonFormulations": [
      "Auf einer einsamen Insel würdest du auch Tiere essen.",
      "Was wäre, wenn du sonst verhungerst?",
      "In manchen Regionen kann man gar nicht vegan leben.",
      "Bei den Inuit wäre Veganismus unmöglich."
    ]
  },
  {
    "id": 9,
    "slug": "argument-09",
    "title": "Vielleicht spüren Tiere gar keinen Schmerz.",
    "argument": "Vielleicht spüren Tiere gar keinen Schmerz.",
    "officialShortAnswer": "Bei vielen Tieren sprechen Nervensystem, Gehirnstrukturen, Verhalten und Reaktionen auf Schmerzmittel deutlich für bewusstes Schmerzempfinden. Absolute Gewissheit über fremdes Erleben haben wir auch bei anderen Menschen nicht. Vernünftig ist deshalb, die starke Evidenz ernst zu nehmen und im Zweifel kein vermeidbares Leid zu riskieren.",
    "ratings": {
      "verbreitung": 37,
      "komplexitaet": 23,
      "emotionalitaet": 42,
      "deluluFaktor": 97,
      "ragebaitFaktor": 67,
      "ablenkungsfaktor": 30
    },
    "categorySlug": "philosophie",
    "categoryLabel": "Philosophische Argumente",
    "meaning": "Dieses Argument stellt die Leidensfähigkeit von Tieren infrage. Befürworter verlangen eine besonders hohe Gewissheit darüber, ob Tiere Schmerz bewusst erleben, bevor ihnen moralische Rücksicht eingeräumt wird. Es versucht, Unsicherheit über inneres Erleben gegen die vegane Position zu verwenden.",
    "notMeaning": "Das Argument beweist nicht, dass Tiere keine Schmerzen oder kein Leid empfinden. Es verlangt lediglich, dass tierisches Empfinden ohne Zweifel bewiesen werden muss, bevor wir sie ethisch in Erwägung ziehen.",
    "commonFormulations": [
      "Vielleicht spüren Tiere gar keinen Schmerz.",
      "Das sind doch nur Reflexe.",
      "Wir können nicht wissen, was Tiere fühlen.",
      "Sollen wir jetzt auch Bakterien berücksichtigen?"
    ]
  },
  {
    "id": 10,
    "slug": "argument-10",
    "title": "Es ist Tradition. Menschen haben schon immer Tierprodukte gegessen.",
    "argument": "Es ist Tradition. Menschen haben schon immer Tierprodukte gegessen.",
    "officialShortAnswer": "Dass Menschen etwas schon lange tun, macht es nicht automatisch moralisch richtig. Es gibt viele Beispiele von unmoralischen Dingen, die lange Zeit als Tradition galten.",
    "ratings": {
      "verbreitung": 88,
      "komplexitaet": 17,
      "emotionalitaet": 79,
      "deluluFaktor": 49,
      "ragebaitFaktor": 60,
      "ablenkungsfaktor": 70
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument beruft sich auf historische Kontinuität und Gewohnheit. Wenn etwas bereits seit Generationen gemacht wird, dann kann es doch gar nicht so schlimm sein. Außerdem sei Tradition wertvoll und die Abschaffung einer Tradition kann größeren Schaden anrichten als die Tradition selbst.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass jede traditionelle Handlung richtig oder unveränderlich sei. Es argumentiert vielmehr, dass die lange kulturelle Verankerung des Tierproduktkonsums für seine Legitimität spricht und dass eine Abkehr davon einen begründungsbedürftigen Bruch mit bewährten Lebensweisen darstellt.",
    "commonFormulations": [
      "Menschen haben schon immer Fleisch gegessen.",
      "Das gehört zu unserer Tradition.",
      "Bei uns isst man das seit Generationen.",
      "Warum sollte plötzlich alles falsch sein?"
    ]
  },
  {
    "id": 11,
    "slug": "argument-11",
    "title": "Veganismus gefährdet meine Kultur und Identität.",
    "argument": "Veganismus gefährdet meine Kultur und Identität.",
    "officialShortAnswer": "Kulturen verändern sich fortlaufend, und traditionelle Gerichte oder Rituale können oft tierfrei weitergeführt werden. Außerdem sollte man hinterfragen, ob andere unmoralischen Dinge akzeptabel werden, nur weil sie jemandes Kultur oder Identität bilden.",
    "ratings": {
      "verbreitung": 27,
      "komplexitaet": 28,
      "emotionalitaet": 86,
      "deluluFaktor": 67,
      "ragebaitFaktor": 37,
      "ablenkungsfaktor": 80
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument betrachtet Veganismus als Angriff auf kulturelle Zugehörigkeit. Befürworter fürchten, dass typische Gerichte, Familienrituale oder religiös geprägte Essgewohnheiten abgewertet werden. Es geht dabei oft weniger um Nährstoffe als um Identität, Anerkennung und soziale Bindung.",
    "notMeaning": "Das Argument soll zeigen, dass kulturelle Praktiken moralisch unangreifbar sind, wenn sie Menschen Identität schenken. Wenn das nicht so wäre, dann wäre es in Ordnung, andere Kulturen auszulöschen.",
    "commonFormulations": [
      "Veganismus bedroht meine Kultur.",
      "Unsere Gerichte gehören zu unserer Identität.",
      "Du kannst anderen Kulturen nicht vorschreiben, was sie essen.",
      "Das ist Teil meiner Herkunft."
    ]
  },
  {
    "id": 12,
    "slug": "argument-12",
    "title": "Fleischkonsum ist natürlich.",
    "argument": "Fleischkonsum ist natürlich.",
    "officialShortAnswer": "Nur weil etwas natürlich ist, ist es nicht gleich erstrebenswewrt. Ebenso ist etwas nicht automatisch schlecht, wenn es unnatürlich ist. Außerdem hat moderne Tierhaltung nichts mehr mit Natur zu tun.",
    "ratings": {
      "verbreitung": 86,
      "komplexitaet": 31,
      "emotionalitaet": 61,
      "deluluFaktor": 49,
      "ragebaitFaktor": 56,
      "ablenkungsfaktor": 79
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument verweist auf die Natürlichkeit von Fleichkonsum, um diesen zu rechtfertigen.",
    "notMeaning": "Dieses Argument ist separat von dem Argument, dass Menschen biologisch gesehen Allesfresser sind.",
    "commonFormulations": [
      "Fleisch essen ist natürlich.",
      "Der Mensch ist eben ein Tier."
    ]
  },
  {
    "id": 13,
    "slug": "argument-13",
    "title": "Der Mensch steht an der Spitze der Nahrungskette.",
    "argument": "Der Mensch steht an der Spitze der Nahrungskette.",
    "officialShortAnswer": "Eine Nahrungskette beschreibt, wer wen frisst, sie rechtfertigt es jedoch nicht. Eine Beschreibung der Zustände ist nicht gleichzusetzen mit einer Rechtfertigung.",
    "ratings": {
      "verbreitung": 70,
      "komplexitaet": 19,
      "emotionalitaet": 53,
      "deluluFaktor": 57,
      "ragebaitFaktor": 61,
      "ablenkungsfaktor": 66
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument nutzt ein hierarchisches Naturbild. Befürworter sehen Menschen darin gerechtfertigt, andere Tiere zu essen, da es die natürliche Nahrungskette so vorgesehen hat.",
    "notMeaning": "Dieses Argument ist separat von dem Argument, dass Menschen biologisch gesehen Allesfresser sind.",
    "commonFormulations": [
      "Der Mensch steht an der Spitze der Nahrungskette.",
      "Wir sind nun mal überlegen.",
      "Stärkere Tiere essen schwächere Tiere.",
      "So funktioniert die Natur."
    ]
  },
  {
    "id": 14,
    "slug": "argument-14",
    "title": "Menschen sind Allesfresser, also sollen sie auch alles essen dürfen.",
    "argument": "Menschen sind Allesfresser, also sollen sie auch alles essen dürfen.",
    "officialShortAnswer": "Allesfresser zu sein bedeutet, sowohl pflanzliche als auch tierische Nahrung verwerten zu können, nicht aber, beides essen zu müssen. Unsere biologische Flexibilität eröffnet uns eine Wahl. Wenn eine ausgewogene pflanzliche Ernährung möglich ist, rechtfertigt die Fähigkeit zum Fleischkonsum noch keine Tierausbeutung.",
    "ratings": {
      "verbreitung": 67,
      "komplexitaet": 29,
      "emotionalitaet": 51,
      "deluluFaktor": 47,
      "ragebaitFaktor": 49,
      "ablenkungsfaktor": 85
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument verweist auf den Menschen als Allesfresser. Befürworter meinen, dass eine omnivore Fähigkeit auch eine omnivore Ernährung rechtfertige. Veganismus erscheint dadurch als künstliche Einschränkung einer natürlichen Bandbreite.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass Menschen ausschließlich oder besonders viele Tierprodukte essen müssten. Es argumentiert vielmehr, dass Tierprodukte aufgrund der omnivoren Natur des Menschen einen legitimen Bestandteil seiner Ernährung darstellen und nicht grundsätzlich ausgeschlossen werden sollten.",
    "commonFormulations": [
      "Menschen sind Allesfresser.",
      "Wir sollen von allem etwas essen.",
      "Wir haben Eckzähne, frontal ausgerichtete Augen und viele weitere Merkmale von Karnivoren.",
      "Warum sollte man eine ganze Lebensmittelgruppe streichen?"
    ]
  },
  {
    "id": 15,
    "slug": "argument-15",
    "title": "Die Tiere sterben ja sowieso irgendwann.",
    "argument": "Die Tiere sterben ja sowieso irgendwann.",
    "officialShortAnswer": "Dass jedes Lebewesen irgendwann stirbt, rechtfertigt nicht, seinen Tod absichtlich vorzuverlegen. Durch die Tötung verliert ein Tier die gesamte Zukunft, die es andernfalls noch erlebt hätte. Mit derselben Begründung ließe sich auch das Töten eines Menschen nicht rechtfertigen.",
    "ratings": {
      "verbreitung": 56,
      "komplexitaet": 16,
      "emotionalitaet": 54,
      "deluluFaktor": 73,
      "ragebaitFaktor": 63,
      "ablenkungsfaktor": 43
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument relativiert das Töten von Tieren durch den Hinweis auf ihre Sterblichkeit. Befürworter stellen den Tod als unvermeidbaren Teil des Lebens dar und sehen deshalb weniger Problem darin, Tiere früher für menschliche Zwecke zu töten.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass Tiere während ihres Lebens leiden dürfen oder dass die Art ihrer Tötung bedeutungslos sei. Es argumentiert vielmehr, dass der Tod selbst weniger problematisch ist, weil er ohnehin eintreten wird, und dass Menschen ihn deshalb unter geeigneten Bedingungen vorziehen dürfen.",
    "commonFormulations": [
      "Die Tiere sterben doch sowieso irgendwann.",
      "Niemand lebt für immer.",
      "In der Natur sterben Tiere auch."
    ]
  },
  {
    "id": 16,
    "slug": "argument-16",
    "title": "Löwen essen auch Fleisch. Sie sind sogar darauf angewiesen.",
    "argument": "Löwen essen auch Fleisch. Sie sind sogar darauf angewiesen.",
    "officialShortAnswer": "In der Wildnis sind Löwen auf tierische Nahrung angewiesen. Aber in der Wildnis töten Löwen auch die Jungtiere ihrer Rivalen. Wieso sollte eine willkürliche Verhaltensweise einer anderen Spezies unser Verhalten vorschreiben? Außerdem können sie ihr Verhalten nicht moralisch reflektieren. Menschen verfügen dagegen über Alternativen und können die Folgen ihrer Entscheidungen verstehen.",
    "ratings": {
      "verbreitung": 87,
      "komplexitaet": 11,
      "emotionalitaet": 65,
      "deluluFaktor": 74,
      "ragebaitFaktor": 68,
      "ablenkungsfaktor": 86
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument vergleicht den Menschen mit fleischfressenden Tieren. Weil Raubtiere andere Tiere töten und fressen, wird Fleischkonsum als natürlicher Bestandteil des Lebens betrachtet. Wenn Löwen für dieses Verhalten nicht moralisch verurteilt werden, erscheint es inkonsequent, dieselbe grundlegende Handlung beim Menschen abzulehnen.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass Menschen dieselben Bedürfnisse und Fähigkeiten wie Löwen besitzen. Es argumentiert vielmehr, dass das Fressen anderer Tiere ein natürlicher und grundsätzlich legitimer Vorgang ist und dass Menschen als Teil der Natur ebenfalls daran teilnehmen dürfen.",
    "commonFormulations": [
      "Löwen essen auch Fleisch.",
      "Raubtiere sind auch nicht vegan.",
      "Willst du Löwen jetzt auch moralisch verurteilen?"
    ]
  },
  {
    "id": 17,
    "slug": "argument-17",
    "title": "Mein Gott erlaubt es mir, (gewisses) Fleisch zu essen.",
    "argument": "Mein Gott erlaubt es mir, (gewisses) Fleisch zu essen.",
    "officialShortAnswer": "Eine religiöse Erlaubnis ist nicht gleichzusetzen mit einem Gebot oder einer moralischen Empfehlung. Viele Glaubenstraditionen betonen zugleich Mitgefühl, Barmherzigkeit und den verantwortungsvollen Umgang mit Tieren. Außerdem kann argumentiert werden, dass die Religion zunächst als wahr erwiesen werden muss, bevor man mit ihr etwas potentiell schädliches rechtfertigt.",
    "ratings": {
      "verbreitung": 80,
      "komplexitaet": 53,
      "emotionalitaet": 87,
      "deluluFaktor": 94,
      "ragebaitFaktor": 59,
      "ablenkungsfaktor": 71
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument gründet die moralische Erlaubnis des Fleischkonsums auf göttliche Autorität. Wenn religiöse Schriften oder Überlieferungen den Verzehr bestimmter Tiere gestatten, wird daraus geschlossen, dass diese Handlung nicht grundsätzlich unmoralisch sein kann. Religiöse Gebote und Erlaubnisse erhalten dabei Vorrang vor einer rein säkularen tierethischen Bewertung.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass Gläubige Fleisch essen müssen oder dass jede Form der Tierhaltung religiös erwünscht ist. Es argumentiert vielmehr, dass der Konsum religiös erlaubter Tierprodukte moralisch zulässig ist und nicht allein aufgrund veganer Maßstäbe als grundsätzlich falsch bezeichnet werden kann.",
    "commonFormulations": [
      "Mein Gott erlaubt mir Fleisch zu essen.",
      "In meiner Religion ist das erlaubt.",
      "Wenn Gott es verboten hätte, stünde es klar da."
    ]
  },
  {
    "id": 18,
    "slug": "argument-18",
    "title": "Tiere sind zum Essen da. Dafür wurden sie erschaffen.",
    "argument": "Tiere sind zum Essen da. Dafür wurden sie erschaffen.",
    "officialShortAnswer": "Wenn Tiere für uns erschaffen wurden, warum hat Gott ihnen dann eigene Interessen gegeben? Nur weil Menschen Tiere für bestimmte Zwecke gezüchtet haben und sie als „Nutztiere“ bezeichnen, existieren Tiere nicht ausschließlich für die Zwecke der Menschen.",
    "ratings": {
      "verbreitung": 73,
      "komplexitaet": 31,
      "emotionalitaet": 71,
      "deluluFaktor": 84,
      "ragebaitFaktor": 66,
      "ablenkungsfaktor": 61
    },
    "categorySlug": "natur-kultur-religion",
    "categoryLabel": "Natur, Kultur & Religion",
    "meaning": "Dieses Argument betrachtet bestimmte Tierarten aufgrund ihrer Zuchtgeschichte oder religiösen Bestimmung als für den menschlichen Gebrauch vorgesehen. Ihre Funktion besteht demnach darin, Nahrung und andere Produkte bereitzustellen. Weil sie gerade zu diesem Zweck gehalten oder erschaffen wurden, erscheint ihre Nutzung als Erfüllung ihrer vorgesehenen Rolle.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass Menschen Tiere beliebig quälen oder ihre Bedürfnisse vollständig ignorieren dürfen. Es argumentiert vielmehr, dass sogenannte Nutztiere grundsätzlich für menschliche Zwecke verwendet und getötet werden dürfen, sofern dies ihrer zugeschriebenen Bestimmung entsprechend und unter angemessenen Bedingungen geschieht.",
    "commonFormulations": [
      "Tiere sind zum Essen da.",
      "Nutztiere heißen nicht ohne Grund Nutztiere.",
      "Dafür wurden sie gezüchtet.",
      "Eine Kuh ist eben kein Haustier."
    ]
  },
  {
    "id": 19,
    "slug": "argument-19",
    "title": "Tiere würden uns auch essen, wenn sie könnten.",
    "argument": "Tiere würden uns auch essen, wenn sie könnten.",
    "officialShortAnswer": "Wir züchten und essen Tiere nicht aus Gründen der Selbstverteidigung. Wenn uns gewisse Tiere wirklich essen würden, wenn sie könnten, dann sollten wir sie sie in Schach halten, und nicht extra züchten und essen. Laut derselben Logik müssten wir auch Kannibalen essen, bevor sie uns essen würden. Außerdem sind Hühner, Kühe und Schweine keine Prädatoren.",
    "ratings": {
      "verbreitung": 42,
      "komplexitaet": 22,
      "emotionalitaet": 48,
      "deluluFaktor": 89,
      "ragebaitFaktor": 57,
      "ablenkungsfaktor": 85
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument beruft sich auf hypothetische Gegenseitigkeit. Befürworter meinen, dass Tiere Menschen ebenfalls verletzen oder essen würden, wenn sie könnten, und dass Menschen deshalb keine besondere Rücksicht schulden. Es stellt Moral als eine Art gegenseitigen Vertrag dar.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass jedes Tier tatsächlich Menschen fressen würde oder aktiv bösartig sei. Es argumentiert vielmehr, dass Wesen, die selbst keine moralische Rücksicht auf uns nehmen würden, auch keinen Anspruch auf eine solche Rücksicht durch uns haben.",
    "commonFormulations": [
      "Tiere würden uns auch essen, wenn sie könnten.",
      "Ein Schwein würde dich auch nicht verschonen.",
      "Warum soll ich Rücksicht nehmen, wenn Tiere es nicht tun?"
    ]
  },
  {
    "id": 20,
    "slug": "argument-20",
    "title": "Tiere würden sich unkontrolliert vermehren, wenn wir sie nicht essen.",
    "argument": "Tiere würden sich unkontrolliert vermehren, wenn wir sie nicht essen.",
    "officialShortAnswer": "Die meisten sogenannten Nutztiere existieren in so großer Zahl, weil Menschen sie gezielt künstlich züchten. Wenn die Nachfrage nach Tierprodukten sinkt, werden schrittweise weniger Tiere gezüchtet, die bestehenden Tiere werden nicht plötzlich freigelassen und vermehren sich unkontrolliert. Eine vegane Entwicklung würde die Populationen daher verkleinern, nicht vergrößern.",
    "ratings": {
      "verbreitung": 56,
      "komplexitaet": 15,
      "emotionalitaet": 48,
      "deluluFaktor": 84,
      "ragebaitFaktor": 44,
      "ablenkungsfaktor": 74
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument behauptet, menschlicher Konsum kontrolliere Tierpopulationen. Befürworter stellen Tierhaltung oder Jagd als notwendiges Mittel dar, damit bestimmte Tiere nicht überhandnehmen.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass die heutige Anzahl landwirtschaftlich gehaltener Tiere wünschenswert sei. Es argumentiert vielmehr, dass ihre regelmäßige Tötung und Nutzung notwendig ist, um ihre weitere Vermehrung zu begrenzen und eine unkontrollierbare Überpopulation zu verhindern.",
    "commonFormulations": [
      "Wenn wir sie nicht essen, vermehren sie sich unkontrolliert.",
      "Dann wären überall Kühe und Schweine.",
      "Ohne Schlachtung gäbe es viel zu viele Tiere.",
      "Irgendwer muss die Bestände regulieren."
    ]
  },
  {
    "id": 21,
    "slug": "argument-21",
    "title": "Wenn alle vegan werden, würden Landwirte ihren Job verlieren.",
    "argument": "Wenn alle vegan werden, würden Landwirte ihren Job verlieren.",
    "officialShortAnswer": "Eine vegane Gesellschaft entsteht nicht über Nacht. Mit sinkender Nachfrage würden sich landwirtschaftliche Betriebe schrittweise umstellen und neue Arbeitsplätze in anderen Bereichen der Lebensmittelproduktion entstehen. Betroffene Menschen sollten bei diesem Wandel unterstützt werden, aber die wirtschaftliche Abhängigkeit von einer Praxis macht diese nicht automatisch moralisch richtig. Unmoralische Berufe sind nicht gerechtfertigt, weil jemand davon finanziell abhängig ist.",
    "ratings": {
      "verbreitung": 46,
      "komplexitaet": 32,
      "emotionalitaet": 60,
      "deluluFaktor": 63,
      "ragebaitFaktor": 41,
      "ablenkungsfaktor": 93
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument verweist auf wirtschaftliche Folgen eines veganen Wandels. Befürworter sorgen sich um Landwirt:innen, Arbeitsplätze und ländliche Strukturen. Die Kritik richtet sich oft weniger gegen das ethische Ziel als gegen die sozialen Kosten einer Umstellung.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass Tierhaltung moralisch unproblematisch sei. Es argumentiert vielmehr, dass ihre Abschaffung wegen der wirtschaftlichen Abhängigkeit vieler Menschen unverhältnismäßige soziale Schäden verursachen würde und deshalb zumindest nicht vollständig oder zu schnell erfolgen sollte.",
    "commonFormulations": [
      "Dann verlieren Bauern ihren Job.",
      "Was soll aus der Landwirtschaft werden?",
      "Du zerstörst Existenzen.",
      "Nicht jeder kann einfach veganen Hafer anbauen."
    ]
  },
  {
    "id": 22,
    "slug": "argument-22",
    "title": "Konsequente Veganer dürften ihr Haus nicht verlassen, da sonst Tiere sterben.",
    "argument": "Konsequente Veganer dürften ihr Haus nicht verlassen, da sonst Tiere sterben.",
    "officialShortAnswer": "Gerade vegane Aktivistinnen und Aktivisten haben das Recht, ihr Haus zu verlassen: Sie setzen sich für Tiere ein, für die es keineswegs egal ist, ob Menschen handeln oder schweigen. Die angeblich konsequente Alternative wäre, zu Hause zu bleiben und schließlich zu verhungern, ohne dadurch einem konkreten Kleintier zuverlässig ein längeres Leben zu ermöglichen. Viele wildlebende Kleintiere sterben ohnehin früh durch Fressfeinde, Naturgewalten, Krankheiten oder Nahrungsknappheit. Sich deshalb selbst zur völligen Untätigkeit zu verurteilen, hilft ihnen kaum, verhindert aber den Einsatz gegen die gezielte Zucht, Ausbeutung und Tötung sogenannter Nutztiere.",
    "ratings": {
      "verbreitung": 38,
      "komplexitaet": 57,
      "emotionalitaet": 62,
      "deluluFaktor": 51,
      "ragebaitFaktor": 65,
      "ablenkungsfaktor": 92
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument treibt vegane Konsequenz ins Extreme. Befürworter weisen darauf hin, dass auch im Alltag unbeabsichtigt Tiere sterben, etwa durch Verkehr, Wohnen oder Landwirtschaft. Daraus soll folgen, dass Veganismus inkonsequent oder unmöglich sei.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass es keinen Unterschied zwischen absichtlicher Tierausbeutung und unbeabsichtigten Schäden gibt. Es argumentiert vielmehr, dass Veganismus keine klare Grenze ziehen kann, wenn jedes vermeidbare Tierleid berücksichtigt werden soll, und deshalb entweder inkonsequent bleibt oder zu praktisch unmöglichen Forderungen führt.",
    "commonFormulations": [
      "Beim Spazieren tötest du auch Insekten.",
      "Konsequente Veganer dürften ihr Haus nicht verlassen.",
      "Auch für dein Gemüse sterben Tiere.",
      "Ganz ohne Schaden geht es nie."
    ]
  },
  {
    "id": 23,
    "slug": "argument-23",
    "title": "Wenn ich vegan werde, ende ich schwach, blass und untergewichtig.",
    "argument": "Wenn ich vegan werde, ende ich schwach, blass und untergewichtig.",
    "officialShortAnswer": "Vegane Spitzensportlerinnen und Sportler liefern direkte Gegenbeispiele, eine simple Google Suche liefert zahlreiche davon. Diese Beispiele beweisen nicht, dass jede vegane Ernährung gesund ist, widerlegen aber die Behauptung, sie führe zwangsläufig zu Schwäche oder Untergewicht. Entscheidend sind eine ausreichende Energie-, Protein- und Nährstoffzufuhr sowie die Ergänzung von Vitamin B12.",
    "ratings": {
      "verbreitung": 52,
      "komplexitaet": 26,
      "emotionalitaet": 63,
      "deluluFaktor": 72,
      "ragebaitFaktor": 62,
      "ablenkungsfaktor": 76
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument warnt vor gesundheitlichen Folgen einer veganen Ernährung. Der Verzicht auf sämtliche Tierprodukte wird mit Nährstoffmängeln, Gewichtsverlust, körperlicher Schwäche und einem kränklichen Erscheinungsbild verbunden. Tierische Lebensmittel gelten dabei als notwendig, um langfristig gesund und leistungsfähig zu bleiben.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass jede vegan lebende Person sofort krank oder untergewichtig wird. Es argumentiert vielmehr, dass eine rein pflanzliche Ernährung ein erhebliches oder langfristiges Gesundheitsrisiko darstellt und Tierprodukte für eine sichere Nährstoffversorgung benötigt werden.",
    "commonFormulations": [
      "Veganer sehen immer so blass aus.",
      "Ohne Fleisch wird man schwach.",
      "Du bekommst doch keine Muskeln.",
      "Von Salat schrumpft der Biceps."
    ]
  },
  {
    "id": 24,
    "slug": "argument-24",
    "title": "Ich kannte mal einen Veganer und der ist gestorben!",
    "argument": "Ich kannte mal einen Veganer und der ist gestorben!",
    "officialShortAnswer": "Einzelne Anekdoten fallen mitunter den schwächsten Formen der Evidenz. Sie sind oft ausgearbeitet oder verallgemeinern eine ungesunde pflanzliche Ernährung als Veganismus. Außerdem sind sie in den aller meisten Fällen nicht falsifizierbar. Studien mit sehr vielen Teilnehmenden zeigen keine höhere Gesamtsterblichkeit in Verbindung mit einer veganen Ernährung.",
    "ratings": {
      "verbreitung": 38,
      "komplexitaet": 15,
      "emotionalitaet": 79,
      "deluluFaktor": 86,
      "ragebaitFaktor": 58,
      "ablenkungsfaktor": 78
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument verwendet die Erfahrung mit einer vegan lebenden Person als Beleg gegen Veganismus. Wenn vegane Personen krank wurden, Mängel entwickelten, ihre Ernährung abbrechen mussten oder starben, wird daraus geschlossen, dass die vegane Lebensweise selbst gefährlich oder nicht dauerhaft durchführbar ist.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass ausschließlich Veganerinnen und Veganer krank werden oder dass jede vegane Person dasselbe Schicksal erleiden wird. Es argumentiert vielmehr, dass ein konkreter negativer Fall die möglichen Gefahren veganer Ernährung sichtbar macht und deshalb gegen ihre allgemeine Sicherheit spricht.",
    "commonFormulations": [
      "Ich kannte mal einen Veganer und der ist gestorben.",
      "Eine Bekannte musste wegen Veganismus ins Krankenhaus."
    ]
  },
  {
    "id": 25,
    "slug": "argument-25",
    "title": "Wenn alle vegan werden würden, gäbe es nicht genug Essen für alle.",
    "argument": "Wenn alle vegan werden würden, gäbe es nicht genug Essen für alle.",
    "officialShortAnswer": "Für Tierprodukte müssen große Mengen an Pflanzen zunächst an Tiere verfüttert werden, wobei ein erheblicher Teil der enthaltenen Energie verloren geht. Wenn Menschen mehr Pflanzen direkt essen, werden insgesamt meist weniger Anbauflächen und Futtermittel benötigt. Eine stärker pflanzliche Landwirtschaft könnte daher mehr Nahrung für Menschen bereitstellen, nicht weniger.",
    "ratings": {
      "verbreitung": 47,
      "komplexitaet": 22,
      "emotionalitaet": 46,
      "deluluFaktor": 83,
      "ragebaitFaktor": 50,
      "ablenkungsfaktor": 77
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument bezweifelt, dass eine vollständig pflanzliche Landwirtschaft die Weltbevölkerung ernähren könnte. Die verfügbaren Ackerflächen, Erntemengen und pflanzlichen Nährstoffquellen werden als unzureichend betrachtet, während Tiere auch für Menschen ungenießbare Pflanzen und nicht ackerfähige Flächen zur Lebensmittelproduktion nutzen können.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass pflanzliche Lebensmittel unwichtig sind oder dass die heutige Tierhaltung unverändert bleiben muss. Es argumentiert vielmehr, dass tierische Landwirtschaft für die globale Ernährungssicherheit notwendig ist und eine vollständig vegane Versorgung an begrenzten Flächen, Ressourcen oder Nährstoffquellen scheitern würde.",
    "commonFormulations": [
      "Wenn alle vegan wären, gäbe es nicht genug Essen.",
      "So viele Pflanzen kann man gar nicht anbauen.",
      "Die Welt kann nicht vegan ernährt werden.",
      "Das funktioniert nur für reiche Länder."
    ]
  },
  {
    "id": 26,
    "slug": "argument-26",
    "title": "Wir müssen Jagen, um Ökosysteme im Gleichgewicht zu halten.",
    "argument": "Wir müssen Jagen, um Ökosysteme im Gleichgewicht zu halten.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 42,
      "komplexitaet": 65,
      "emotionalitaet": 41,
      "deluluFaktor": 46,
      "ragebaitFaktor": 53,
      "ablenkungsfaktor": 66
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument stellt Jagd als ökologische Notwendigkeit dar. Befürworter verweisen auf Wildbestände, fehlende Raubtiere oder Schäden an Wäldern und Feldern. Dadurch wird das Töten von Tieren als Naturschutzmaßnahme verstanden.",
    "notMeaning": "Das Argument zeigt nicht, dass Jagd als Freizeit, Tradition oder Fleischquelle moralisch unproblematisch ist. Selbst wenn bestimmte Eingriffe nötig wären, folgt daraus nicht, dass jede Form von Jagd gerechtfertigt ist. Es beantwortet auch nicht, welche Alternativen zur Bestandsregulation bestehen.",
    "commonFormulations": [
      "Jagd hält Ökosysteme im Gleichgewicht.",
      "Ohne Jäger gäbe es zu viele Rehe.",
      "Wildtiere würden sonst den Wald zerstören.",
      "Jagen ist aktiver Naturschutz."
    ]
  },
  {
    "id": 27,
    "slug": "argument-27",
    "title": "Als nächstes schreibst du mir vor, was ich denken oder wen ich lieben soll!",
    "argument": "Als nächstes schreibst du mir vor, was ich denken oder wen ich lieben soll!",
    "officialShortAnswer": "Veganismus ist das ethische Prinzip, dass Menschen ohne Ausbeutung nicht-menschlicher Tiere leben sollten. Das hat nichts mit Gedankenpolizei oder Autoritarismus zu tun. Gefordert werden lediglich Grundlegende Rechte für alle Tiere.",
    "ratings": {
      "verbreitung": 27,
      "komplexitaet": 10,
      "emotionalitaet": 94,
      "deluluFaktor": 84,
      "ragebaitFaktor": 44,
      "ablenkungsfaktor": 94
    },
    "categorySlug": "dammbruchargumente",
    "categoryLabel": "Dammbruchargumente",
    "meaning": "Dieses Argument deutet Forderungen nach veganem Verhalten als möglichen Beginn immer weiter reichender Bevormundung. Wenn die Gesellschaft Menschen vorschreiben darf, was sie essen, könnten später auch Gedanken, Beziehungen und andere höchstpersönliche Entscheidungen kontrolliert werden. Der Schutz individueller Freiheit soll deshalb bereits beim ersten Eingriff verteidigt werden.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass vegane Menschen bereits sämtliche Lebensbereiche kontrollieren wollen. Es argumentiert vielmehr, dass die gesellschaftliche Akzeptanz von Vorschriften über persönliche Konsumentscheidungen einen gefährlichen Präzedenzfall schaffen und langfristig weitere Eingriffe in die individuelle Freiheit erleichtern könnte.",
    "commonFormulations": [
      "Als Nächstes willst du mir vorschreiben, was ich denken soll.",
      "Das ist Bevormundung.",
      "Heute nimmst du mir Fleisch, morgen alles andere."
    ]
  },
  {
    "id": 28,
    "slug": "argument-28",
    "title": "Viele Anbauflächen sind nur für Tierhaltung nutzbar.",
    "argument": "Viele Anbauflächen sind nur für Tierhaltung nutzbar.",
    "officialShortAnswer": "Dass eine Fläche nicht für den Ackerbau geeignet ist, bedeutet nicht, dass sie zur Tierhaltung genutzt werden muss. Menschen können durch den direkten Verzehr pflanzlicher Nahrung mit deutlich weniger Fläche ernährt werden. Nicht benötigte Weideflächen könnten der Natur zurückgegeben werden und wieder Lebensraum für wildlebende Tiere sowie natürliche Kohlenstoffspeicher bilden.",
    "ratings": {
      "verbreitung": 37,
      "komplexitaet": 58,
      "emotionalitaet": 27,
      "deluluFaktor": 38,
      "ragebaitFaktor": 42,
      "ablenkungsfaktor": 67
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument verweist auf Grünland, Gebirgsregionen und andere Flächen, auf denen sich kaum Lebensmittel für Menschen anbauen lassen. Wiederkäuer können das dort wachsende Gras verwerten und daraus Fleisch oder Milch erzeugen. Tierhaltung erscheint deshalb als sinnvolle oder notwendige Nutzung von Flächen, die andernfalls keinen Beitrag zur menschlichen Ernährung leisten würden.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass auf allen landwirtschaftlichen Flächen Tiere gehalten werden sollten oder Tierhaltung generell besonders effizient sei. Es argumentiert vielmehr, dass zumindest auf nicht ackerfähigem Grünland Tiere zur Lebensmittelproduktion eingesetzt werden sollten, weil diese Flächen nicht unmittelbar für den Anbau menschlicher Nahrung genutzt werden können.",
    "commonFormulations": [
      "Viele Flächen sind nur als Weide nutzbar.",
      "Da kann man kein Gemüse anbauen.",
      "Ohne Tiere wären diese Flächen wertlos.",
      "Gras können Menschen nun mal nicht essen."
    ]
  },
  {
    "id": 29,
    "slug": "argument-29",
    "title": "Wir brauchen Tiere für Dünger.",
    "argument": "Wir brauchen Tiere für Dünger.",
    "officialShortAnswer": "Mit sinkenden Tierbeständen gäbe es deshalb zwar weniger tierischen Dünger, aber auch erheblich weniger Futtermittelanbau und damit weniger Düngerbedarf. Die verbleibenden Pflanzen könnten durch Leguminosen, pflanzliche Reststoffe, zurückgewonnene Nährstoffe sowie mineralische und synthetische Dünger versorgt werden.",
    "ratings": {
      "verbreitung": 22,
      "komplexitaet": 49,
      "emotionalitaet": 26,
      "deluluFaktor": 55,
      "ragebaitFaktor": 36,
      "ablenkungsfaktor": 71
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument betrachtet Mist und Gülle als unverzichtbare Grundlage der Pflanzenproduktion. Tiere würden Pflanzen und für Menschen ungeeignete Biomasse verwerten und die darin enthaltenen Nährstoffe anschließend als Dünger auf die Felder zurückbringen. Ohne Tierhaltung gäbe es demnach nicht genügend Dünger, um dauerhaft ausreichende Ernten und fruchtbare Böden zu erhalten.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass ausschließlich tierischer Dünger verwendet werden kann oder jede heutige Form der Tierhaltung allein wegen ihrer Ausscheidungen gerechtfertigt ist. Es argumentiert vielmehr, dass der Wegfall großer Tierbestände eine so erhebliche Lücke in der Nährstoffversorgung verursachen würde, dass pflanzliche Landwirtschaft nicht mehr ausreichend produktiv oder nachhaltig betrieben werden könnte.",
    "commonFormulations": [
      "Wir brauchen Tiere für Dünger.",
      "Ohne Mist wächst nichts.",
      "Vegane Landwirtschaft ist unmöglich.",
      "Kreisläufe funktionieren nur mit Nutztieren."
    ]
  },
  {
    "id": 30,
    "slug": "argument-30",
    "title": "Fleischkonsum ist legal, daher kann es nicht so schlimm sein.",
    "argument": "Fleischkonsum ist legal, daher kann es nicht so schlimm sein.",
    "officialShortAnswer": "Gesetze beschreiben, was eine Gesellschaft zu einem bestimmten Zeitpunkt erlaubt, nicht, was moralisch richtig ist. Viele heute anerkannte Ungerechtigkeiten waren früher legal, bevor gesellschaftlicher Widerstand zu neuen Rechten führte. Gesetze ändern sich, Moral nicht.",
    "ratings": {
      "verbreitung": 54,
      "komplexitaet": 11,
      "emotionalitaet": 51,
      "deluluFaktor": 65,
      "ragebaitFaktor": 60,
      "ablenkungsfaktor": 76
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument leitet aus der rechtlichen Zulässigkeit des Fleischkonsums eine moralische Entlastung ab. Da der Staat Tierhaltung, Schlachtung und den Verkauf von Fleisch unter bestimmten Vorschriften erlaubt, erscheint der Konsum als gesellschaftlich akzeptierte und grundsätzlich legitime Handlung. Eine wirklich schwerwiegende Ungerechtigkeit wäre demnach bereits verboten.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass alles Legale automatisch moralisch vorbildlich ist. Es argumentiert vielmehr, dass die gesetzliche Regulierung und breite gesellschaftliche Akzeptanz des Fleischkonsums starke Gründe dafür liefern, ihn nicht mit eindeutigem Unrecht gleichzusetzen.",
    "commonFormulations": [
      "Fleisch essen ist legal.",
      "Wenn es schlimm wäre, wäre es verboten."
    ]
  },
  {
    "id": 31,
    "slug": "argument-31",
    "title": "Vegane Alternativen sind viel teurer als Tierprodukte.",
    "argument": "Vegane Alternativen sind viel teurer als Tierprodukte.",
    "officialShortAnswer": "Die pauschale Behauptung, vegane Alternativen seien viel teurer als Tierprodukte, ist empirisch nicht haltbar: Preisvergleiche ergeben je nach Produkt, Händler und Zeitpunkt unterschiedliche Ergebnisse, und pflanzliche Alternativen sind teilweise bereits günstiger. Doch selbst wenn ein bestimmtes Ersatzprodukt etwas mehr kostet, entsteht daraus kein Recht, Tiere zu züchten, auszubeuten und zu töten. Hinzu kommt, dass Tierprodukte nicht von Natur aus billig sind, sondern durch die starke Subventionierung der Tierhaltung und des Futtermittelanbaus künstlich begünstigt werden. Ein politisch erzeugter Preisvorteil ist keine moralische Rechtfertigung für Tierausbeutung.",
    "ratings": {
      "verbreitung": 76,
      "komplexitaet": 25,
      "emotionalitaet": 55,
      "deluluFaktor": 60,
      "ragebaitFaktor": 38,
      "ablenkungsfaktor": 86
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument verweist darauf, dass Fleisch-, Käse- und Milchersatz, angereicherte Produkte sowie andere vegane Alternativen tierischer Lebensmittel mehr kosten können als ihre gewohnten Gegenstücke. Für Menschen mit geringem Einkommen könnten zusätzliche Kosten selbst dann entscheidend sein, wenn sie moralische Einwände gegen Tierprodukte teilen. Veganismus erscheint dadurch als privilegierte Lebensweise, die nicht von allen Menschen gleichermaßen verlangt werden kann.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass jedes pflanzliche Lebensmittel teuer ist oder wohlhabende Menschen keinerlei vegane Möglichkeiten haben. Es argumentiert vielmehr, dass eine vollständig vegane Versorgung für manche Menschen höhere Kosten verursacht und deshalb nicht als allgemeine moralische Verpflichtung vorausgesetzt werden sollte.",
    "commonFormulations": [
      "Vegane Alternativen sind viel zu teuer.",
      "Nicht jeder kann sich Veganismus leisten.",
      "Hafermilch kostet mehr als Kuhmilch.",
      "Vegan ist ein Luxusproblem."
    ]
  },
  {
    "id": 32,
    "slug": "argument-32",
    "title": "Wir sollten erst menschliches Leid lösen.",
    "argument": "Wir sollten erst menschliches Leid lösen.",
    "officialShortAnswer": "Menschliches und tierliches können parallel angegangen werden. Wir können mehrere Formen von Unrecht gleichzeitig bekämpfen, zumal Tierausbeutung auch Menschen schadet. Würden Tiere erst berücksichtigt, nachdem jedes menschliche Problem gelöst wurde, könnte ihre Ausbeutung unbegrenzt fortgesetzt werden.",
    "ratings": {
      "verbreitung": 60,
      "komplexitaet": 28,
      "emotionalitaet": 80,
      "deluluFaktor": 49,
      "ragebaitFaktor": 60,
      "ablenkungsfaktor": 93
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument räumt menschlichen Problemen moralische und politische Priorität ein. Armut, Krieg, Diskriminierung, Obdachlosigkeit und fehlende Gesundheitsversorgung verursachen enormes Leid, während gesellschaftliche Aufmerksamkeit und finanzielle Mittel begrenzt sind. Der Einsatz für Tiere erscheint deshalb als nachrangig oder als Ablenkung von dringlicheren Verpflichtungen gegenüber Menschen.",
    "notMeaning": "Das Argument behauptet nicht unbedingt, dass Tiere keinerlei moralischen Wert besitzen oder absichtlich gequält werden dürfen. Es argumentiert vielmehr, dass menschliches Leid schwerer wiegt und begrenzte gesellschaftliche Ressourcen deshalb zunächst zur Lösung menschlicher Probleme eingesetzt werden sollten, bevor umfassende Veränderungen zugunsten von Tieren verlangt werden.",
    "commonFormulations": [
      "Wir sollten erst menschliches Leid lösen.",
      "Es gibt wichtigere Probleme.",
      "Tiere sind nicht unsere größte Sorge."
    ]
  },
  {
    "id": 33,
    "slug": "argument-33",
    "title": "Der Anbau von Soja zerstört den Regenwald.",
    "argument": "Der Anbau von Soja zerstört den Regenwald.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 66,
      "komplexitaet": 36,
      "emotionalitaet": 41,
      "deluluFaktor": 52,
      "ragebaitFaktor": 50,
      "ablenkungsfaktor": 74
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument verbindet Soja mit Regenwaldzerstörung und richtet diese Kritik gegen Veganismus. Befürworter stellen pflanzliche Ernährung als ökologisch problematisch dar, weil Soja mit Entwaldung assoziiert ist. Es nutzt ein reales Umweltproblem als Einwand gegen vegane Konsumentscheidungen.",
    "notMeaning": "Das Argument zeigt nicht automatisch, dass vegane Ernährung Regenwaldzerstörung antreibt. Ein großer Teil des weltweit angebauten Sojas wird als Tierfutter genutzt. Entscheidend ist also, wofür Soja angebaut wird und welche Produkte Nachfrage erzeugen.",
    "commonFormulations": [
      "Für euer Soja wird der Regenwald zerstört.",
      "Tofu ist schlecht fürs Klima.",
      "Veganer essen Soja und zerstören den Amazonas.",
      "Fleisch ist nicht das einzige Umweltproblem."
    ]
  },
  {
    "id": 34,
    "slug": "argument-34",
    "title": "Es ist eine persönliche Entscheidung, ob jemand Tierprodukte unterstützt.",
    "argument": "Es ist eine persönliche Entscheidung, ob jemand Tierprodukte unterstützt.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 79,
      "komplexitaet": 26,
      "emotionalitaet": 81,
      "deluluFaktor": 69,
      "ragebaitFaktor": 71,
      "ablenkungsfaktor": 91
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument beschreibt Tierproduktkonsum als reine Privatsache. Befürworter stellen Essen als persönlichen Geschmack, Lebensstil oder individuelle Freiheit dar. Moralische Kritik wird dadurch als Einmischung in private Entscheidungen wahrgenommen.",
    "notMeaning": "Das Argument zeigt nicht, dass eine Entscheidung nur deshalb privat ist, weil sie am eigenen Teller endet. Wenn andere fühlende Wesen betroffen sind, hat die Entscheidung eine Außenwirkung. Persönliche Freiheit erklärt nicht automatisch, warum die Interessen der Tiere weniger zählen sollen.",
    "commonFormulations": [
      "Das ist meine persönliche Entscheidung.",
      "Jeder soll essen, was er will.",
      "Misch dich nicht in mein Essen ein.",
      "Leben und leben lassen."
    ]
  },
  {
    "id": 35,
    "slug": "argument-35",
    "title": "Vegane Alternativen schmecken mir einfach nicht.",
    "argument": "Vegane Alternativen schmecken mir einfach nicht.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 82,
      "komplexitaet": 21,
      "emotionalitaet": 78,
      "deluluFaktor": 55,
      "ragebaitFaktor": 67,
      "ablenkungsfaktor": 86
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument beruft sich auf Geschmack und Genuss. Befürworter sehen vegane Alternativen als unbefriedigend und halten den Verzicht deshalb für unzumutbar. Es betont subjektive Vorlieben stärker als ethische Abwägung.",
    "notMeaning": "Das Argument zeigt nicht, dass Geschmack moralisch schwerer wiegt als Leid und Tötung. Es kann erklären, warum Umstellung schwerfällt, aber nicht automatisch, warum Tierausbeutung gerechtfertigt ist. Geschmack ist außerdem veränderbar und Alternativen entwickeln sich weiter.",
    "commonFormulations": [
      "Vegane Alternativen schmecken mir nicht.",
      "Ohne Käse könnte ich nie leben.",
      "Fleisch schmeckt einfach zu gut.",
      "Ich will beim Essen Genuss haben."
    ]
  },
  {
    "id": 36,
    "slug": "argument-36",
    "title": "Die Politik trägt die Verantwortung.",
    "argument": "Die Politik trägt die Verantwortung.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 60,
      "komplexitaet": 30,
      "emotionalitaet": 52,
      "deluluFaktor": 58,
      "ragebaitFaktor": 47,
      "ablenkungsfaktor": 75
    },
    "categorySlug": "praktikabilitaet-gesellschaft-politik",
    "categoryLabel": "Praktikabilität, Gesellschaft & Politik",
    "meaning": "Dieses Argument verlagert Verantwortung von Einzelpersonen auf Politik und Institutionen. Befürworter meinen, nur Gesetze, Subventionen oder strukturelle Veränderungen könnten wirklich etwas bewirken. Individueller Konsum erscheint dagegen machtlos.",
    "notMeaning": "Das Argument zeigt nicht, dass individuelles Handeln bedeutungslos ist. Politische und persönliche Verantwortung können nebeneinander bestehen. Wer Strukturwandel fordert, kann trotzdem vermeiden, selbst Nachfrage nach Tierausbeutung zu erzeugen.",
    "commonFormulations": [
      "Die Politik muss das regeln.",
      "Einzelne können nichts ändern.",
      "Solange es erlaubt ist, bringt Verzicht nichts.",
      "Erst müssen die Rahmenbedingungen stimmen."
    ]
  },
  {
    "id": 37,
    "slug": "argument-37",
    "title": "Veganern mangelt es oft an Proteinen, Vitamin B12, Kalzium und so weiter.",
    "argument": "Veganern mangelt es oft an Proteinen, Vitamin B12, Kalzium und so weiter.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 80,
      "komplexitaet": 36,
      "emotionalitaet": 47,
      "deluluFaktor": 61,
      "ragebaitFaktor": 53,
      "ablenkungsfaktor": 72
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument stellt vegane Ernährung als mangelanfällig dar. Befürworter verweisen auf Protein, Vitamin B12, Kalzium, Eisen oder Omega-3 und befürchten, dass Tierprodukte für eine sichere Versorgung nötig seien. Es ist oft ein Gesundheits- und Sicherheitsargument.",
    "notMeaning": "Das Argument zeigt nicht, dass vegane Ernährung zwangsläufig mangelhaft ist. Einige Nährstoffe müssen bewusst geplant werden, insbesondere Vitamin B12. Planungspflicht bedeutet aber nicht Unmöglichkeit und gilt in unterschiedlicher Form für viele Ernährungsweisen.",
    "commonFormulations": [
      "Veganern fehlen Proteine.",
      "Was ist mit Vitamin B12?",
      "Ohne Milch bekommst du kein Kalzium.",
      "Das kann doch nicht gesund sein."
    ]
  },
  {
    "id": 38,
    "slug": "argument-38",
    "title": "Unsere Körper können pflanzliche Nährstoffe oft schlechter aufnehmen.",
    "argument": "Unsere Körper können pflanzliche Nährstoffe oft schlechter aufnehmen.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 32,
      "komplexitaet": 57,
      "emotionalitaet": 42,
      "deluluFaktor": 47,
      "ragebaitFaktor": 38,
      "ablenkungsfaktor": 73
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument verweist auf Bioverfügbarkeit. Befürworter meinen, dass Nährstoffe aus pflanzlichen Quellen schlechter aufgenommen werden und tierische Produkte deshalb überlegen seien. Es betrachtet nicht nur Nährstoffmengen, sondern deren Nutzbarkeit im Körper.",
    "notMeaning": "Das Argument zeigt nicht, dass pflanzliche Ernährung unzureichend ist. Geringere Bioverfügbarkeit kann durch Auswahl, Zubereitung, Kombination und Menge berücksichtigt werden. Es verlangt eine differenzierte Planung, widerlegt Veganismus aber nicht pauschal.",
    "commonFormulations": [
      "Pflanzliches Eisen wird schlechter aufgenommen.",
      "Proteine aus Pflanzen sind minderwertig.",
      "Der Körper kann das nicht so gut verwerten.",
      "Tierische Nährstoffe sind einfach bioverfügbarer."
    ]
  },
  {
    "id": 39,
    "slug": "argument-39",
    "title": "Warum supplementieren, wenn es auch mit Tierprodukten geht?",
    "argument": "Warum supplementieren, wenn es auch mit Tierprodukten geht?",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 53,
      "komplexitaet": 30,
      "emotionalitaet": 53,
      "deluluFaktor": 66,
      "ragebaitFaktor": 75,
      "ablenkungsfaktor": 79
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument betrachtet Supplementierung als Zeichen einer unnatürlichen oder mangelhaften Ernährung. Befürworter fragen, warum man Tabletten nehmen sollte, wenn Tierprodukte bestimmte Nährstoffe liefern können. Besonders Vitamin B12 steht im Mittelpunkt.",
    "notMeaning": "Das Argument zeigt nicht, dass Supplementierung schlecht oder unvernünftig ist. Viele Nährstoffe werden auch in nichtveganen Systemen indirekt ergänzt, etwa über Tierfutter oder angereicherte Produkte. Entscheidend ist Versorgungssicherheit, nicht ob ein Nährstoff aus einer Tablette oder aus einem Tierprodukt kommt.",
    "commonFormulations": [
      "Warum supplementieren, wenn man Fleisch essen kann?",
      "Eine natürliche Ernährung braucht keine Tabletten.",
      "Ohne B12-Pillen geht vegan nicht.",
      "Das beweist doch, dass vegan unnatürlich ist."
    ]
  },
  {
    "id": 40,
    "slug": "argument-40",
    "title": "Gerade Kinder, Schwangere, Stillende und Ältere sollten Tierprodukte essen.",
    "argument": "Gerade Kinder, Schwangere, Stillende und Ältere sollten Tierprodukte essen.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 43,
      "komplexitaet": 61,
      "emotionalitaet": 68,
      "deluluFaktor": 31,
      "ragebaitFaktor": 40,
      "ablenkungsfaktor": 75
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument verweist auf besonders vulnerable Gruppen. Befürworter sorgen sich, dass Kinder, Schwangere, Stillende oder ältere Menschen durch vegane Ernährung stärker gefährdet sein könnten. Es betont Verantwortung und Sicherheitsmargen.",
    "notMeaning": "Das Argument zeigt nicht, dass vegane Ernährung für diese Gruppen grundsätzlich unmöglich ist. Es zeigt aber, dass Planung, Fachwissen und Kontrolle wichtiger sind. Die moralische Frage wird dadurch nicht aufgehoben, sondern mit gesundheitlicher Sorgfalt verbunden.",
    "commonFormulations": [
      "Kinder sollten nicht vegan ernährt werden.",
      "Schwangere brauchen Tierprodukte.",
      "Bei Babys ist vegan gefährlich.",
      "Ältere Menschen sollten kein Risiko eingehen."
    ]
  },
  {
    "id": 41,
    "slug": "argument-41",
    "title": "Manche Menschen haben besondere Krankheiten, die Veganismus erschweren.",
    "argument": "Manche Menschen haben besondere Krankheiten, die Veganismus erschweren.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 29,
      "komplexitaet": 75,
      "emotionalitaet": 66,
      "deluluFaktor": 29,
      "ragebaitFaktor": 34,
      "ablenkungsfaktor": 82
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument verweist auf Krankheiten, Allergien, Essstörungen oder andere Einschränkungen, die eine vegane Ernährung erschweren können. Befürworter nutzen reale Sonderfälle, um die allgemeine Forderung nach Veganismus zu relativieren.",
    "notMeaning": "Das Argument zeigt nicht, dass alle Menschen mit normalen Möglichkeiten Tierprodukte brauchen. Veganismus wird meist als Vermeidung von Tierausbeutung verstanden, soweit es praktikabel und möglich ist. Schwierige Sonderfälle können Ausnahmen erklären, aber nicht jede vermeidbare Nutzung rechtfertigen.",
    "commonFormulations": [
      "Manche Menschen können aus gesundheitlichen Gründen nicht vegan leben.",
      "Was ist mit Allergien?",
      "Bei bestimmten Krankheiten geht das nicht.",
      "Nicht jeder Körper verträgt Veganismus."
    ]
  },
  {
    "id": 42,
    "slug": "argument-42",
    "title": "Vegane Ersatzprodukte sind oft hochverarbeitet.",
    "argument": "Vegane Ersatzprodukte sind oft hochverarbeitet.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 63,
      "komplexitaet": 25,
      "emotionalitaet": 56,
      "deluluFaktor": 68,
      "ragebaitFaktor": 59,
      "ablenkungsfaktor": 79
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument kritisiert vegane Ersatzprodukte als industriell und ungesund. Befürworter stellen Burger, Würstchen oder Käsealternativen als hochverarbeitete Produkte dar und schließen daraus, dass vegan nicht automatisch besser sei.",
    "notMeaning": "Das Argument zeigt nicht, dass vegane Ernährung insgesamt aus Ersatzprodukten bestehen muss. Es betrifft vor allem bestimmte Produktgruppen und nicht Hülsenfrüchte, Getreide, Gemüse, Obst oder Nüsse. Außerdem ist Gesundheit nicht die einzige Frage, wenn es um Tierausbeutung geht.",
    "commonFormulations": [
      "Vegane Ersatzprodukte sind total verarbeitet.",
      "Da ist nur Chemie drin.",
      "Vegan heißt nicht gesund.",
      "Lieber echtes Fleisch als Laborpampe."
    ]
  },
  {
    "id": 43,
    "slug": "argument-43",
    "title": "Avokados und Mandeln sind schlimmer für die Umwelt als Fleisch.",
    "argument": "Avokados und Mandeln sind schlimmer für die Umwelt als Fleisch.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 32,
      "komplexitaet": 27,
      "emotionalitaet": 49,
      "deluluFaktor": 81,
      "ragebaitFaktor": 80,
      "ablenkungsfaktor": 85
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument verweist auf problematische pflanzliche Produkte wie Avocados oder Mandeln. Befürworter wollen zeigen, dass auch vegane Lebensmittel ökologische Kosten haben. Es richtet sich gegen die Vorstellung, vegan sei automatisch umweltperfekt.",
    "notMeaning": "Das Argument zeigt nicht, dass Fleisch deshalb ökologisch besser ist. Einzelne problematische Pflanzenprodukte definieren nicht die gesamte vegane Ernährung. Außerdem kann man vegan leben, ohne besonders viele Avocados oder Mandeln zu konsumieren.",
    "commonFormulations": [
      "Avocados sind schlimmer als Fleisch.",
      "Mandeln verbrauchen viel Wasser.",
      "Veganer zerstören auch die Umwelt.",
      "Eure Lebensmittel sind auch nicht perfekt."
    ]
  },
  {
    "id": 44,
    "slug": "argument-44",
    "title": "Regionale Bio-Fleischproduktion ist nachhaltig.",
    "argument": "Regionale Bio-Fleischproduktion ist nachhaltig.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 79,
      "komplexitaet": 28,
      "emotionalitaet": 64,
      "deluluFaktor": 72,
      "ragebaitFaktor": 69,
      "ablenkungsfaktor": 67
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument stellt regionale Bio-Tierhaltung als nachhaltige Alternative zur industriellen Produktion dar. Befürworter betonen kurze Wege, bessere Haltung und vermeintlich natürliche Kreisläufe. Dadurch wirkt Fleischkonsum verantwortungsvoller und weniger problematisch.",
    "notMeaning": "Das Argument zeigt nicht, dass regionale oder biologische Produktion das Töten und Ausnutzen von Tieren moralisch aufhebt. Auch bessere Bedingungen ändern nichts daran, dass Tiere für menschliche Zwecke gezüchtet, genutzt und getötet werden. Zudem müssen Umweltbehauptungen konkret geprüft werden.",
    "commonFormulations": [
      "Ich kaufe nur regionales Bio-Fleisch.",
      "Bei meinem Bauern geht es den Tieren gut.",
      "Nachhaltige Weidehaltung ist okay.",
      "Nicht alles ist Massentierhaltung."
    ]
  },
  {
    "id": 45,
    "slug": "argument-45",
    "title": "Pestizide zerstören die Umwelt.",
    "argument": "Pestizide zerstören die Umwelt.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 30,
      "komplexitaet": 41,
      "emotionalitaet": 41,
      "deluluFaktor": 43,
      "ragebaitFaktor": 28,
      "ablenkungsfaktor": 83
    },
    "categorySlug": "gesundheit-umwelt-nachhaltigkeit",
    "categoryLabel": "Gesundheit, Umwelt & Nachhaltigkeit",
    "meaning": "Dieses Argument verweist auf Schäden durch Pestizide im Pflanzenbau. Befürworter betonen, dass auch pflanzliche Landwirtschaft Tiere und Umwelt beeinträchtigen kann. Es kritisiert Veganismus als nicht schadensfrei.",
    "notMeaning": "Das Argument zeigt nicht, dass Tierhaltung deshalb weniger schädlich ist. Tiere müssen häufig mit angebauten Pflanzen gefüttert werden, wodurch zusätzlicher Pflanzenbau entsteht. Es zeigt eher, dass Landwirtschaft verbessert werden sollte, nicht dass Tierausbeutung gerechtfertigt ist.",
    "commonFormulations": [
      "Für Pflanzen sterben durch Pestizide auch Tiere.",
      "Ackerbau zerstört Lebensräume.",
      "Dein Gemüse ist auch nicht unschuldig.",
      "Vegan ist nicht automatisch umweltfreundlich."
    ]
  },
  {
    "id": 46,
    "slug": "argument-46",
    "title": "Veganer sind militant und missionieren ein extremes, absolutistisches Weltbild.",
    "argument": "Veganer sind militant und missionieren ein extremes, absolutistisches Weltbild.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 67,
      "komplexitaet": 10,
      "emotionalitaet": 90,
      "deluluFaktor": 78,
      "ragebaitFaktor": 80,
      "ablenkungsfaktor": 86
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument richtet sich gegen Auftreten und Rhetorik von Veganer:innen. Befürworter empfinden vegane Kritik als aggressiv, dogmatisch oder missionarisch. Die Debatte verschiebt sich dadurch von Tierausbeutung zu Stil, Ton und Gruppenimage.",
    "notMeaning": "Das Argument zeigt nicht, dass die vegane Position falsch ist. Selbst wenn einzelne Menschen unangenehm auftreten, beantwortet das nicht die moralische Frage nach Tieren. Kritik am Verhalten von Aktivist:innen kann berechtigt sein, ersetzt aber keine Auseinandersetzung mit dem Inhalt.",
    "commonFormulations": [
      "Veganer sind militant.",
      "Ihr missioniert die ganze Zeit.",
      "Veganismus ist extrem.",
      "Ihr seid wie eine Religion."
    ]
  },
  {
    "id": 47,
    "slug": "argument-47",
    "title": "Veganer lügen und zeigen immer nur die schlimmsten Zustände der Industrie.",
    "argument": "Veganer lügen und zeigen immer nur die schlimmsten Zustände der Industrie.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 49,
      "komplexitaet": 31,
      "emotionalitaet": 71,
      "deluluFaktor": 81,
      "ragebaitFaktor": 62,
      "ablenkungsfaktor": 67
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument unterstellt veganer Aufklärung Manipulation. Befürworter meinen, Aktivist:innen zeigten nur Extremfälle, lügen oder verzerren die Realität. Dadurch wird das Vertrauen in Bilder, Berichte und Kritik an der Industrie geschwächt.",
    "notMeaning": "Das Argument zeigt nicht, dass die gezeigten Zustände falsch oder irrelevant sind. Selbst wenn Beispiele ausgewählt sind, muss geprüft werden, ob sie systematisch auftreten oder gesetzlich erlaubt sind. Der Vorwurf der Übertreibung ersetzt keine konkrete Widerlegung.",
    "commonFormulations": [
      "Veganer zeigen nur die schlimmsten Fälle.",
      "Das ist alles Propaganda.",
      "Die meisten Bauern sind nicht so.",
      "Ihr lügt mit Schockbildern."
    ]
  },
  {
    "id": 48,
    "slug": "argument-48",
    "title": "Veganer hassen Bauern und lieben Tiere mehr als Menschen.",
    "argument": "Veganer hassen Bauern und lieben Tiere mehr als Menschen.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 44,
      "komplexitaet": 21,
      "emotionalitaet": 78,
      "deluluFaktor": 71,
      "ragebaitFaktor": 59,
      "ablenkungsfaktor": 83
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument wirft Veganer:innen Menschenfeindlichkeit oder Bauernhass vor. Befürworter erleben Tierethik als Abwertung menschlicher Interessen, besonders derjenigen, die in Tierhaltung arbeiten. Es emotionalisiert die Debatte über Loyalität zu Menschen.",
    "notMeaning": "Das Argument zeigt nicht, dass Sorge um Tiere Sorge um Menschen ausschließt. Man kann Arbeitsbedingungen, Bauern und ländliche Regionen ernst nehmen und trotzdem Tierausbeutung kritisieren. Die moralische Frage wird durch den Vorwurf der Menschenfeindlichkeit nicht beantwortet.",
    "commonFormulations": [
      "Veganer hassen Bauern.",
      "Ihr liebt Tiere mehr als Menschen.",
      "Euch sind Landwirte egal.",
      "Ihr stellt Tiere über Menschen."
    ]
  },
  {
    "id": 49,
    "slug": "argument-49",
    "title": "Veganer halten sich für was besseres und für moralisch überlegen.",
    "argument": "Veganer halten sich für was besseres und für moralisch überlegen.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 53,
      "komplexitaet": 14,
      "emotionalitaet": 88,
      "deluluFaktor": 43,
      "ragebaitFaktor": 60,
      "ablenkungsfaktor": 79
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument kritisiert den sozialen Eindruck moralischer Überlegenheit. Befürworter fühlen sich durch Veganismus verurteilt oder herabgesetzt. Die Abwehr richtet sich oft gegen Scham, Schuld und den Verdacht, als schlechter Mensch zu gelten.",
    "notMeaning": "Das Argument zeigt nicht, dass die Kritik an Tierausbeutung falsch ist. Dass eine Position moralisch herausfordernd wirkt, macht sie nicht automatisch arrogant. Es unterscheidet auch nicht immer zwischen persönlicher Abwertung und Kritik an einer Handlung.",
    "commonFormulations": [
      "Veganer halten sich für etwas Besseres.",
      "Ihr seid moralisch überlegen.",
      "Ihr schaut auf andere herab.",
      "Mit euch kann man nicht normal reden."
    ]
  },
  {
    "id": 50,
    "slug": "argument-50",
    "title": "Veganer sind Heuchler, da sie SUVs fahren und jedes Jahr ein neues Handy haben.",
    "argument": "Veganer sind Heuchler, da sie SUVs fahren und jedes Jahr ein neues Handy haben.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 45,
      "komplexitaet": 43,
      "emotionalitaet": 65,
      "deluluFaktor": 64,
      "ragebaitFaktor": 54,
      "ablenkungsfaktor": 94
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument wirft Veganer:innen Inkonsistenz vor. Befürworter verweisen auf SUVs, Smartphones, Reisen oder andere Konsumprobleme, um vegane Kritik als heuchlerisch darzustellen. Es nutzt echte oder vermeintliche Widersprüche der Person gegen die Position.",
    "notMeaning": "Das Argument zeigt nicht, dass Tierausbeutung gerechtfertigt ist. Eine unperfekte Person kann trotzdem bei einem bestimmten Thema recht haben. Moralische Inkonsistenz kann kritisiert werden, widerlegt aber nicht automatisch die konkrete Forderung, vermeidbares Tierleid zu reduzieren.",
    "commonFormulations": [
      "Veganer sind Heuchler.",
      "Du hast doch auch ein Handy.",
      "Du fährst Auto und redest von Moral.",
      "Erst perfekt werden, dann kritisieren."
    ]
  },
  {
    "id": 51,
    "slug": "argument-51",
    "title": "Veganer sind privilegiert und realitätsfern.",
    "argument": "Veganer sind privilegiert und realitätsfern.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 44,
      "komplexitaet": 21,
      "emotionalitaet": 74,
      "deluluFaktor": 73,
      "ragebaitFaktor": 53,
      "ablenkungsfaktor": 88
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument beschreibt Veganismus als privilegierten Lebensstil. Befürworter betonen Einkommen, Bildung, Wohnort, Zeit und Zugang zu Lebensmitteln. Veganismus erscheint dadurch als Forderung, die nicht zu den Lebensrealitäten vieler Menschen passt.",
    "notMeaning": "Das Argument zeigt nicht, dass Veganismus nur für Privilegierte möglich ist. Es weist aber darauf hin, dass soziale Bedingungen ernst genommen werden müssen. Schwierige Umstände erklären Grenzen der Umsetzbarkeit, rechtfertigen aber nicht jede vermeidbare Tierausbeutung in privilegierten Kontexten.",
    "commonFormulations": [
      "Veganismus ist privilegiert.",
      "Das können sich nur Großstadtmenschen leisten.",
      "Du bist realitätsfern.",
      "Nicht jeder lebt in deiner Bubble."
    ]
  },
  {
    "id": 52,
    "slug": "argument-52",
    "title": "Hitler war Vegetarier.",
    "argument": "Hitler war Vegetarier.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 38,
      "komplexitaet": 11,
      "emotionalitaet": 53,
      "deluluFaktor": 80,
      "ragebaitFaktor": 73,
      "ablenkungsfaktor": 90
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument versucht, vegetarische oder vegane Ideale durch eine negative historische Assoziation zu diskreditieren. Befürworter verweisen auf Hitler, um zu zeigen, dass Tierfreundlichkeit oder Fleischverzicht moralisch nichts bedeute.",
    "notMeaning": "Das Argument zeigt nicht, dass Veganismus falsch ist. Die moralische Bewertung einer Handlung hängt nicht davon ab, ob eine schlechte Person etwas Ähnliches getan haben soll. Es ist in der Regel eine Schuld-durch-Assoziation und keine sachliche Auseinandersetzung mit Tierethik.",
    "commonFormulations": [
      "Hitler war Vegetarier.",
      "Auch schlechte Menschen können tierlieb sein.",
      "Vegetarisch macht niemanden moralisch.",
      "Das sagt doch nichts über gute Werte aus."
    ]
  },
  {
    "id": 53,
    "slug": "argument-53",
    "title": "Warum lassen Veganer ihr Essen aussehen und schmecken wie Tierprodukte?",
    "argument": "Warum lassen Veganer ihr Essen aussehen und schmecken wie Tierprodukte?",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 56,
      "komplexitaet": 5,
      "emotionalitaet": 57,
      "deluluFaktor": 77,
      "ragebaitFaktor": 53,
      "ablenkungsfaktor": 87
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument wundert sich darüber, dass vegane Produkte Fleisch, Käse oder Milch imitieren. Befürworter sehen darin einen Widerspruch: Wenn Tierprodukte abgelehnt werden, warum sollen Alternativen ähnlich aussehen oder schmecken?",
    "notMeaning": "Das Argument zeigt nicht, dass Veganer:innen Tierausbeutung heimlich gutheißen. Viele Menschen mögen Geschmack, Textur oder Essgewohnheiten, lehnen aber die Produktion über Tiere ab. Eine pflanzliche Alternative kann vertraute Gerichte ermöglichen, ohne Tiere zu nutzen.",
    "commonFormulations": [
      "Warum imitiert ihr Fleisch?",
      "Wenn du Fleisch vermisst, iss doch echtes.",
      "Vegane Wurst ist widersprüchlich.",
      "Warum nennt ihr das Milch oder Käse?"
    ]
  },
  {
    "id": 54,
    "slug": "argument-54",
    "title": "Vegane Landwirtschaft tötet auch Tiere, zum Beispiel bei der Ernte.",
    "argument": "Vegane Landwirtschaft tötet auch Tiere, zum Beispiel bei der Ernte.",
    "officialShortAnswer": "",
    "ratings": {
      "verbreitung": 40,
      "komplexitaet": 51,
      "emotionalitaet": 43,
      "deluluFaktor": 46,
      "ragebaitFaktor": 39,
      "ablenkungsfaktor": 80
    },
    "categorySlug": "veganer-innen",
    "categoryLabel": "Veganerinnen & Veganer",
    "meaning": "Dieses Argument verweist auf Tiere, die im Pflanzenbau sterben, etwa bei Ernte, Bodenbearbeitung oder Schädlingsbekämpfung. Befürworter wollen zeigen, dass vegane Landwirtschaft ebenfalls nicht frei von Tierleid ist.",
    "notMeaning": "Das Argument zeigt nicht, dass absichtliche Tierhaltung und Tötung gleichzusetzen ist mit unbeabsichtigten Nebenfolgen der Nahrungsproduktion. Da Tierhaltung zusätzlich Futterpflanzen benötigt, kann sie insgesamt sogar mehr solcher Schäden verursachen. Es zeigt vor allem, dass auch pflanzliche Landwirtschaft verbessert werden sollte.",
    "commonFormulations": [
      "Bei der Ernte sterben auch Tiere.",
      "Für dein Gemüse werden Mäuse getötet.",
      "Vegan ist auch nicht leidfrei.",
      "Pflanzenbau tötet ebenfalls Tiere."
    ]
  }
] as const satisfies ArgumentCard[];

export const getCardById = (id: string | number) =>
  cards.find((card) => card.id === Number(id));
