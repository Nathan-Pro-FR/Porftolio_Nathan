// 1. Configuration centrale des étiquettes (Licences / Sources)
const LICENCES_CONFIG = {
  "Vocaloid": {
    style: "border-teal-400 text-teal-400 bg-teal-950/40"
  },
  "Helluva Boss": {
    style: "border-purple-400 text-purple-400 bg-purple-950/40"
  },
  "Animal Crossing": {
    style: "border-amber-400 text-amber-400 bg-amber-950/40"
  },
  "Pokémon": {
    style: "border-orange-400 text-orange-400 bg-orange-950/40"
  },
  "Shield Hero": {
    style: "border-amber-700 text-amber-500 bg-amber-950/30"
  },
  "Honkai: Star Rail": {
    style: "border-fuchsia-500 text-fuchsia-400 bg-fuchsia-950/40"
  },
  "Konosuba": {
    style: "border-blue-400 text-blue-400 bg-blue-950/40"
  },
  "Fairy Tail": {
    style: "border-red-600 text-red-500 bg-red-950/40"
  },
  "My Dress-Up Darling": {
    style: "border-rose-400 text-rose-300 bg-rose-950/40"
  },
  "Frieren": {
    style: "border-sky-300 text-sky-300 bg-sky-950/40"
  },
  "Genshin Impact": {
    style: "border-yellow-500 text-yellow-500 bg-yellow-950/40"
  },
  "Valorant": {
    style: "border-indigo-400 text-indigo-400 bg-indigo-950/40"
  },
  "TinyGayPirate": {
    style: "border-violet-400 text-violet-300 bg-violet-950/40"
  },
  "MiSide": {
    style: "border-rose-600 text-rose-500 bg-rose-950/40"
  },
  "Re:Zero": {
    style: "border-sky-400 text-sky-400 bg-sky-950/40"
}

};

// 2. Ton catalogue complet de Waifus
const WAIFUS_DATA = [
  {
    nom: "Hatsune Miku",
    anime: "Vocaloid",
    description: "L'idole virtuelle numéro un dans le monde. Avec ses longues couettes turquoise et sa voix légendaire, elle a conquis la planète entière.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500",
    tags: ["Idole", "Turquoise", "Musique"]
  },
  {
    nom: "Loona",
    anime: "Helluva Boss",
    description: "La secrétaire résignée et cynique de l'agence I.M.P. Sous ses airs distants et sa personnalité de louve solitaire, elle cache un attachement secret pour sa famille.",
    image: "images/Loona.jpg",
    tags: ["Gothique", "Louve", "Cynique"]
  },
  {
    nom: "Les Villageois",
    anime: "Animal Crossing",
    description: "Que ce soit Marie, Tom Nook ou l'adorable Rosie, les habitants de l'île apportent une dose infinie de mignonnerie, de chill et de bonne humeur quotidienne.",
    image: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?w=500",
    tags: ["Mignon", "Chill", "Animaux"]
  },
  {
    nom: "Sylveon (Nymphali)",
    anime: "Pokémon",
    description: "L'évolution de type Fée d'Évoli. Ses rubans apaisants émettent une aura qui efface instantanément toute hostilité et apporte la paix autour d'elle.",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=500",
    tags: ["Fée", "Rubans", "Mignon"]
  },
  {
    nom: "Vulpix (Goupix)",
    anime: "Pokémon",
    description: "Un Pokémon adoré pour sa fourrure magnifique et ses six queues soyeuses qui s'enroulent magnifiquement en grandissant. Un classique indémodable.",
    image: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=500",
    tags: ["Feu", "Renard", "Élégant"]
  },
  {
    nom: "Lopunny (Lockpin)",
    anime: "Pokémon",
    description: "Un Pokémon gracieux connu pour ses oreilles duveteuses et ses mouvements agiles. Très fière, elle déteste la saleté et prend grand soin de sa fourrure.",
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=500",
    tags: ["Normal", "Agile", "Gracieuse"]
  },
  {
    nom: "Delphox (Goupelin)",
    anime: "Pokémon",
    description: "Le Pokémon Sorcier de type Feu et Psy. Elle utilise sa branche enflammée comme une baguette magique pour lire l'avenir dans les flammes.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500",
    tags: ["Feu", "Psy", "Sorcier"]
  },
  {
    nom: "Meowscarade (Miascarade)",
    anime: "Pokémon",
    description: "Le Pokémon Magicien de type Plante et Ténèbres. Avec son masque mystérieux, elle crée des illusions d'optique pour piéger ses adversaires avec des fleurs explosives.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500",
    tags: ["Plante", "Ténèbres", "Magicien"]
  },
  {
    nom: "Gardevoir",
    anime: "Pokémon",
    description: "Un Pokémon d'une loyauté absolue capable de ressentir les émotions de son dresseur. Elle peut distordre les dimensions pour créer un petit trou noir afin de le protéger.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
    tags: ["Psy", "Fée", "Élégante"]
  },
  {
    nom: "Raphtalia",
    anime: "Shield Hero",
    description: "La première alliée et l'épée indéfectible du Héros au Bouclier. Cette jeune femme raton-laveur s'est transformée en une guerrière redoutable.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500",
    tags: ["Semi-Humaine", "Épéiste", "Dévouée"]
  },
  {
    nom: "Kafka",
    anime: "Honkai: Star Rail",
    description: "Membre mystérieuse et élégante des Chasseurs de Stellaron. Calme face au danger, elle manipule ses cibles grâce au murmure de l'esprit.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500",
    tags: ["Stellaron", "Fatale", "Élégante"]
  },
  {
    nom: "Aqua",
    anime: "Konosuba",
    description: "La déesse de l'eau un peu maladroite envoyée dans le monde fantastique. Certes capricieuse et dépensière, ses sorts de purification restent surpuissants.",
    image: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?w=500",
    tags: ["Déesse", "Eau", "Chill"]
  },
  {
    nom: "Erza Scarlet",
    anime: "Fairy Tail",
    description: "Surnommée Titania, la reine des fées. C'est la mage la plus forte de la guilde, capable de changer d'armure et d'armes instantanément.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500",
    tags: ["Titania", "Armures", "Guerrière"]
  },
  {
    nom: "Marin Kitagawa",
    anime: "My Dress-Up Darling",
    description: "Une lycéenne ultra pétillante, Otaku passionnée et fan absolue de cosplay. Son énergie débordante et sa gentillesse illuminent le quotidien.",
    image: "https://images.unsplash.com/photo-1523251343397-9225e4cb6319?w=500",
    tags: ["Cosplayeuse", "Pétillante", "Otaku"]
  },
  {
    nom: "Frieren",
    anime: "Frieren",
    description: "Une mage elfe millénaire qui a jadis vaincu le Roi des Démons. Elle parcourt désormais le monde à un rythme paisible, collectionnant des sorts farfelus.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
    tags: ["Elfe", "Mage", "Millénaire"]
  },
  {
    nom: "Chiori",
    anime: "Genshin Impact",
    description: "La célèbre styliste à la tête de la Maison Chioriya à Fontaine. Originaire d'Inazuma, elle possède un caractère bien trempé et un sens de la mode inégalé.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    tags: ["Styliste", "Inazuma", "Géo"]
  },
  {
    nom: "Furina",
    anime: "Genshin Impact",
    description: "L'ancienne star absolue de Fontaine. Reine de la scène théâtrale et de l'art dramatique, elle dissimule derrière son extravagance passée une incroyable résilience.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500",
    tags: ["Actrice", "Hydro", "Mignon"]
  },
  {
    nom: "Mavuika",
    anime: "Genshin Impact",
    description: "L'Archange Pyro actuelle de Natlan, la nation de la guerre. Imposante, charismatique et motarde à ses heures perdues, elle porte le feu sacré de son peuple.",
    image: "https://images.unsplash.com/photo-1543157145-f78c636d023d?w=500",
    tags: ["Archon Pyro", "Natlan", "Guerrière"]
  },
  {
    nom: "Clove",
    anime: "Valorant",
    description: "L'agent écossais immortel qui adore jouer avec la mort. Plein d'entrain et de malice, Clove continue de soutenir son équipe sous forme de spectre.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500",
    tags: ["Contrôleur", "Immortel", "Chill"]
  },
  {
    nom: "Neon",
    anime: "Valorant",
    description: "Une duelliste philippine capable de canaliser la bioélectricité à une vitesse fulgurante. Elle fonce à travers les lignes ennemies à coups de glissades électriques.",
    image: "https://images.unsplash.com/photo-1561715276-a2d087060f1d?w=500",
    tags: ["Duelliste", "Électricité", "Agile"]
  },
  {
    nom: "Apogee",
    anime: "TinyGayPirate",
    description: "Un personnage fascinant et marquant issu des créations et animations de l'artiste TinyGayPirate. Son design unique captive immédiatement la communauté.",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500",
    tags: ["Art / Indé", "Unique", "Chill"]
  },
  {
    nom: "Mita",
    anime: "MiSide",
    description: "L'héroïne du jeu MiSide. Derrière son apparence adorable de waifu virtuelle parfaite se cache une obsession maladive pour le joueur dès que la réalité bascule.",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=500",
    tags: ["Yandere", "Jeu Vidéo", "Obsessionnelle"]
  },
  {
    nom: "Rem",
    anime: "Re:Zero",
    description: "La servante aux cheveux bleus du manoir de Roswaal. Ultra dévouée, manie un fléau d'armes géant et possède une forme démon unique.",
    image: "LIEN_D_UNE_VRAIE_IMAGE_DE_REM.jpg", // <--- Mets ton lien ici !
    tags: ["Dévouée", "Cheveux Bleus", "Combat"]
}

];
