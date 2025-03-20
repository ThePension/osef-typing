const TEXTS_DATABASE: { [key: string]: string[] } = {
  "FR": [
      "Le soleil brille haut dans le ciel, apportant chaleur et lumière à tous. Il illumine les champs, les rivières, et les montagnes, créant une scène paisible et magnifique. Ce moment de calme est un véritable cadeau de la nature.",
      "Les enfants jouent joyeusement dans le parc, courant et riant sans souci. Ils s'amusent avec leurs amis, inventant des jeux et des histoires incroyables. L'air est rempli de rires et de bonheur, et chaque sourire est une pureté.",
      "Un vent léger souffle à travers les arbres, faisant danser les feuilles. C'est un moment tranquille où l'on peut se perdre dans ses pensées. Le murmure du vent dans les branches semble raconter des secrets que seul le cœur peut entendre.",
      "Les vagues viennent s'échouer doucement sur le sable doré de la plage. Le bruit apaisant de l'océan calme l'esprit, et chaque vague semble être une caresse venant de l'infini. L'horizon lointain invite à la rêverie et à l'évasion.",
      "Chaque matin, le chant des oiseaux réveille les habitants du village. Leur mélodie est un hymne à la vie, remplissant l'air d'espoir et de joie. Le village se réveille lentement, les rues s'animent peu à peu, portées par ce chant matinal.",
      "Les étoiles scintillent dans le ciel nocturne, éclairant la nuit paisible. Elles sont comme des perles d'argent suspendues dans l'obscurité, guidant les rêveurs et les voyageurs. Le ciel semble infini, plein de mystères et d'histoires anciennes.",
      "Dans la forêt dense, les animaux vivent en harmonie avec la nature. Les oiseaux chantent dans les arbres, les animaux se déplacent silencieusement parmi les fougères et les fleurs. Chaque créature joue un rôle essentiel dans cet écosystème magique.",
      "Une tasse de café chaud réchauffe les mains lors des matinées froides. C'est un moment de réconfort, où l'on peut se poser et savourer la douceur de l'instant. Chaque gorgée semble réchauffer l'âme autant que le corps.",
      "Les montagnes enneigées offrent un paysage magnifique et majestueux. Leur cime semble toucher le ciel, et la neige recouvre chaque recoin, créant un tableau d'une pureté absolue. L'air frais de la montagne revigore le corps et l'esprit.",
      "L'odeur du pain frais sortant du four emplit la maison de bonheur. C'est une odeur réconfortante, qui évoque des souvenirs d'enfance et des moments passés en famille. Le pain chaud et croustillant est toujours un symbole de convivialité."
  ],
  "EN": [
      "The sun shines brightly in the sky, bringing warmth and light to all. It illuminates the fields, the rivers, and the mountains, creating a peaceful and magnificent scene. This moment of calm is truly a gift from nature, offering a sense of serenity and beauty.",
      "Children play happily in the park, running and laughing with joy. They invent games and stories with their friends, filling the air with laughter and happiness. Every smile they share is a symbol of pure innocence and joy, and the world seems full of possibilities.",
      "A gentle breeze blows through the trees, making the leaves dance. It's a peaceful moment, where one can lose themselves in thoughts. The whispering of the wind in the branches seems to tell secrets only the heart can hear, secrets of the earth.",
      "Waves crash softly onto the golden sand of the peaceful beach. The soothing sound of the ocean calms the mind, and each wave feels like a caress from infinity. The distant horizon invites dreams and escape, as if calling you to adventure.",
      "Every morning, the sound of birds wakes the villagers from sleep. Their melody is a hymn to life, filling the air with hope and joy. The village slowly awakens, the streets gradually come to life, carried by this morning song.",
      "Stars twinkle in the night sky, lighting up the peaceful evening. They are like silver pearls suspended in the darkness, guiding dreamers and travelers alike. The sky seems infinite, full of mysteries and ancient stories waiting to be discovered.",
      "In the dense forest, animals live together in perfect harmony with nature. Birds sing in the trees, and animals move quietly among ferns and flowers. Every creature plays a vital role in this magical ecosystem, where everything has its place.",
      "A warm cup of coffee soothes the hands on cold winter mornings. It's a moment of comfort, where one can sit and savor the sweetness of the moment. Each sip seems to warm the soul as much as the body, offering a peaceful break from the rush of life.",
      "The snow-covered mountains offer a breathtaking and majestic view. Their peaks seem to touch the sky, and the snow covers every nook and cranny, creating a picture of absolute purity. The crisp mountain air invigorates both the body and the mind.",
      "The smell of freshly baked bread fills the house with warmth and joy. It's a comforting aroma, one that evokes childhood memories and moments spent with family. Freshly baked bread, warm and crusty, is always a symbol of togetherness and home."
  ],
  "DE": [
      "Die Sonne scheint hell am Himmel und bringt Wärme und Licht für alle. Sie erleuchtet die Felder, die Flüsse und die Berge und schafft eine friedliche und majestätische Szenerie. Dieser Moment der Ruhe ist ein wahres Geschenk der Natur und lädt zum Staunen ein.",
      "Kinder spielen glücklich im Park, rennen und lachen vor Freude. Sie erfinden Spiele und Geschichten mit ihren Freunden und füllen die Luft mit Lachen und Glück. Jedes Lächeln, das sie teilen, ist ein Symbol für reine Unschuld und Freude.",
      "Eine sanfte Brise weht durch die Bäume und lässt die Blätter tanzen. Es ist ein ruhiger Moment, in dem man in Gedanken versinken kann. Das Flüstern des Windes in den Ästen scheint Geheimnisse zu erzählen, die nur das Herz hören kann.",
      "Die Wellen schlagen sanft auf den goldenen Sand des Strandes. Der beruhigende Klang des Ozeans stillt den Geist, und jede Welle fühlt sich wie eine Streicheleinheit aus dem Unendlichen an. Der ferne Horizont lädt zum Träumen und Entfliehen ein.",
      "Jeden Morgen weckt das Zwitschern der Vögel die Dorfbewohner aus ihrem Schlaf. Ihre Melodie ist ein Hymnus an das Leben und erfüllt die Luft mit Hoffnung und Freude. Das Dorf erwacht langsam, die Straßen leben allmählich auf, getragen von diesem morgendlichen Gesang.",
      "Die Sterne funkeln am Nachthimmel und erleuchten die ruhige Nacht. Sie sind wie silberne Perlen, die in der Dunkelheit schweben und die Träumer und Reisenden leiten. Der Himmel scheint unendlich und voller Geheimnisse und alter Geschichten, die darauf warten, entdeckt zu werden.",
      "Im dichten Wald leben die Tiere in perfekter Harmonie mit der Natur. Vögel singen in den Bäumen, und die Tiere bewegen sich leise zwischen Farnen und Blumen. Jede Kreatur spielt eine wesentliche Rolle in diesem magischen Ökosystem, wo alles seinen Platz hat.",
      "Eine warme Tasse Kaffee wärmt die Hände an kalten Wintermorgen. Es ist ein Moment des Trostes, in dem man sich hinsetzen und die Süße des Augenblicks genießen kann. Jeder Schluck scheint sowohl die Seele als auch den Körper zu erwärmen und bietet eine friedliche Auszeit vom hektischen Leben.",
      "Die schneebedeckten Berge bieten einen atemberaubenden und majestätischen Blick. Ihre Gipfel scheinen den Himmel zu berühren, und der Schnee bedeckt jede Ecke, was ein Bild absoluter Reinheit schafft. Die frische Bergluft belebt sowohl den Körper als auch den Geist.",
      "Der Duft von frisch gebackenem Brot erfüllt das Haus mit Wärme und Freude. Es ist ein beruhigender Duft, der Kindheitserinnerungen und Momente im Kreise der Familie weckt. Frisch gebackenes Brot, warm und knusprig, ist immer ein Symbol für Zusammengehörigkeit und Zuhause."
  ]
};

export function getTexts(lang: string): string[] {
  return (TEXTS_DATABASE[lang] || TEXTS_DATABASE["EN"])!;
}