export const categories = [
  { slug: "philosophie", label: "Philosophische Argumente", description: "Moral, Logik, Konsequenz und Grundsatzfragen." },
  { slug: "natur-kultur-religion", label: "Natur, Kultur & Religion", description: "Argumente über Natürlichkeit, Tradition und Weltbilder." },
  { slug: "praktikabilitaet-gesellschaft-politik", label: "Praktikabilität, Gesellschaft & Politik", description: "Alltag, Wirtschaft, Politik und gesellschaftliche Umsetzbarkeit." },
  { slug: "gesundheit-umwelt-nachhaltigkeit", label: "Gesundheit, Umwelt & Nachhaltigkeit", description: "Nährstoffe, Klima, Landwirtschaft und Ressourcen." },
  { slug: "veganer-innen", label: "Veganer:innen", description: "Vorwürfe, Klischees und Debatten über die Bewegung selbst." },
] as const;

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
