# 🌸 Nathan LACROIX | Portfolio - Sakura & Glassmorphism

[![Langage](https://img.shields.io/badge/Langage-HTML5%20%2F%20CSS3%20%2F%20JavaScript-orange?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![Outils](https://img.shields.io/badge/Release-Standard--Version-brightgreen?style=for-the-badge&logo=conventionalcommits)](https://github.com/conventional-changelog/standard-version)
[![Style](https://img.shields.io/badge/Design-Glassmorphism-purple?style=for-the-badge)](https://css-tricks.com/glassmorphism-css/)

Bienvenue sur le dépôt officiel de mon portfolio principal. Cet espace présente un univers visuel épuré, transparent et poétique inspiré des cerisiers en fleurs (Sakura), tout en regroupant mes projets de développement web, d'applications et de scripts. 

---

## 🗂️ Sommaire

- [1. 🗺️ Architecture & Flux du Projet](#1-️-architecture--flux-du-projet)
- [2. 🌟 Fonctionnalités Clés](#2--fonctionnalites-cles)
- [3. 🔐 Sécurité & Intégrité du Code](#3--securite--integrite-du-code)
- [4. 🛠️ Stack Technique & Écosystème](#4--stack-technique--ecosysteme)
- [5. 🚀 Projets Présentés](#5--projets-presentes)
- [6. 🚀 Lancement Local](#6--lancement-local)
- [7. 🤝 Contributions](#7--contributions)
- [8. 🎵 Crédits & Remerciements](#8--credits--remerciements)
- [9. 📬 Me Contacter / Renseignements](#9--me-contacter--renseignements)

---

## 1. 🗺️ Architecture & Flux du Projet 

Voici l'organisation de l'écosystème de mes projets et de la structure globale. 

<details>
<summary><b>📐 Cliquez ici pour afficher/masquer le diagramme d'architecture complet (Mermaid)</b></summary>
<br>

```mermaid
graph LR
    %% --- RACINE (ID 0 à 2) ---
    ID0([RACINE])
    ID1[.gitignore]
    ID2[index.html]
    
    ID0 --> ID1
    ID0 --> ID2

    %% --- BRANCHE PROJETS (ID 3) ---
    ID3{Projets}
    ID0 --> ID3

    %% index-msc (ID 4 à 7)
    ID4([index-msc])
    ID5[conditions.html]
    ID6[confidentialite.html]
    ID7[index.html]
    
    ID3 --> ID4
    ID4 --> ID5
    ID4 --> ID6
    ID4 --> ID7

    %% manga (ID 8 à 10)
    ID8([manga])
    ID9[.gitignore]
    ID10[manga_bot.py]
    
    ID3 --> ID8
    ID8 --> ID9
    ID8 --> ID10

    %% Mes-Waifus-Preferees & images (ID 11 à 16)
    ID11([Mes-Waifus-Preferees])
    ID12[.gitignore]
    ID13[index.html]
    ID14[waifus_data.js]
    ID15([images])
    ID16[Loona.jpg]
    
    ID3 --> ID11
    ID11 --> ID12
    ID11 --> ID13
    ID11 --> ID14
    ID11 --> ID15
    ID15 --> ID16

    %% msc (ID 17 à 18)
    ID17([msc])
    ID18[index.html]
    
    ID3 --> ID17
    ID17 --> ID18

    %% --- BRANCHE SITE-PRINCIPAL (ID 19) ---
    ID19{Site-principal}
    ID0 --> ID19

    %% Fichiers de base Site-principal (ID 20 à 27)
    ID20[CHANGELOG.md]
    ID21[credit.txt]
    ID22[index.html]
    ID23[package-lock.json]
    ID24[package.json]
    ID25[projets.json]
    ID26[script.js]
    ID27[style.css]
    
    ID19 --> ID20
    ID19 --> ID21
    ID19 --> ID22
    ID19 --> ID23
    ID19 --> ID24
    ID19 --> ID25
    ID19 --> ID26
    ID19 --> ID27

    %% Dossier audio (ID 28 à 29)
    ID28([audio])
    ID29[melodigne-sakura-serenity...]
    
    ID19 --> ID28
    ID28 --> ID29

    %% Dossier Images & icons (ID 30 à 34)
    ID30([Images])
    ID31[Image_fond_v2.webp]
    ID32([icons])
    ID33[Favicon_Porfolio_sakura.svg]
    ID34[solid+play+pause...]
    
    ID19 --> ID30
    ID30 --> ID31
    ID30 --> ID32
    ID32 --> ID33
    ID32 --> ID34

    %% --- CONFIGURATION DES COULEURS (C) ---
    classDef C1 fill:#0366d6,stroke:#024ea1,stroke-width:2px,color:#ffffff;
    classDef C1_Fichier fill:#e6f2ff,stroke:#0366d6,stroke-width:1px,color:#0366d6;
    classDef C2 fill:#ea4aaa,stroke:#b83280,stroke-width:2px,color:#ffffff;
    classDef C2_Fichier fill:#ffeaf6,stroke:#ea4aaa,stroke-width:1px,color:#ea4aaa;
    classDef C3 fill:#2ea44f,stroke:#227a3b,stroke-width:2px,color:#ffffff;
    classDef C3_Fichier fill:#ebf7ee,stroke:#2ea44f,stroke-width:1px,color:#2ea44f;
    classDef C4 fill:#8a63d2,stroke:#6f42c1,stroke-width:2px,color:#ffffff;
    classDef C4_Fichier fill:#f1edfa,stroke:#8a63d2,stroke-width:1px,color:#8a63d2;
    classDef C5 fill:#00a2ae,stroke:#007a83,stroke-width:2px,color:#ffffff;
    classDef C5_Fichier fill:#e6f9fa,stroke:#00a2ae,stroke-width:1px,color:#00a2ae;
    classDef C6 fill:#cca700,stroke:#997d00,stroke-width:2px,color:#ffffff;
    classDef C6_Fichier fill:#fffde6,stroke:#cca700,stroke-width:1px,color:#cca700;
    classDef C7 fill:#f68a1e,stroke:#c46710,stroke-width:2px,color:#ffffff;
    classDef C7_Fichier fill:#fff3e6,stroke:#f68a1e,stroke-width:1px,color:#f68a1e;

    %% --- ATTRIBUTION DES CLASSES AUX NOEUDS ---
    class ID19 C1;
    class ID20,ID21,ID22,ID23,ID24,ID25,ID26,ID27 C1_Fichier;
    class ID8 C2;
    class ID9,ID10 C2_Fichier;
    class ID0,ID3 C3;
    class ID1,ID2 C3_Fichier;
    class ID4 C4;
    class ID5,ID6,ID7 C4_Fichier;
    class ID11 C5;
    class ID12,ID13,ID14 C5_Fichier;
    class ID17 C6;
    class ID18 C6_Fichier;
    class ID15,ID28,ID30,ID32 C7;
    class ID16,ID29,ID31,ID33,ID34 C7_Fichier;

```
</details>

### 📁 Aperçu rapide des dossiers principaux

| Emplacement | Rôle |
| --- | --- |
| `Site-principal/` | Contient le cœur du portfolio (styles glassmorphism, scripts audio et animation canvas). |
| `Projets/manga/` | Script Python complet pour le fonctionnement de votre **Manga Bot Discord**. |
| `Projets/index-msc/` | Page d'atterrissage, CGU et politiques de confidentialité de la Visionneuse Manga. |
| `Projets/Mes-Waifus-Preferees/` | Mini-application web interactive listant des personnages avec données stockées. |

>[hint] 💡 **À propos du design :** L'interface repose sur un effet *Glassmorphism* poussé (transparence, floutage d'arrière-plan avec `backdrop-filter`) combiné à une animation fluide de pluie de pétales de Sakura gérée via l'API Canvas de HTML5.

---

## 2. 🌟 Fonctionnalités Clés

* **🌸 Pluie de Sakura Interactive :** Un script d'arrière-plan ultra-léger via Canvas (`script.js`) pour animer des pétales avec vélocité et rotations aléatoires.
* **🎵 Ambiance Sonore Intégrée :** Un lecteur audio discret jouant *Sakura Serenity* avec un système de notifications dynamiques (*Music Toast*) pour avertir l'utilisateur lors de la lecture/pause.
* **📂 Grille de Projets Dynamique :** Chargement asynchrone des projets et des métadonnées via un fichier structuré `projets.json`.
* **📈 Suivi d'Audience Privacy-Friendly :** Intégration de GoatCounter pour l'analyse anonyme du trafic sans tracking intrusif.

---

## 3. 🔐 Sécurité & Intégrité du Code

Pour éviter toute tentative d'usurpation d'identité, de falsification (commits frauduleux à mon nom) ou de contributions malveillantes visant à tromper les utilisateurs, ce dépôt applique des règles strictes :

* **🛡️ Commits Signés obligatoires :** Tous mes commits officiels sont signés numériquement avec une clé GPG/SSH cryptographique. Si un commit ne possède pas le badge **"Verified"** sur GitHub, il ne provient pas de moi.
* **🚫 Protection de la branche principale :** La branche `main` (ou `master`) est verrouillée. Aucun push direct n'est autorisé sans vérification et validation des statuts de sécurité.
* **⚠️ Alerte Sécurité :** N'exécutez jamais de scripts provenant de forks non vérifiés de ce projet. Seul le code présent sur ce dépôt officiel (`Nathan-Pro-FR`) est audité et garanti sûr.

---

## 4. 🛠️ Stack Technique & Écosystème

### Technologies Principales

### 📦 Gestion des Dépendances & Écosystème Interne

Pour maintenir ce projet propre et suivre les conventions de commits, j'utilise une dépendance de développement principale qui installe tout un écosystème en cascade.

#### 🔹 Dépendance directe (`devDependencies`)

* **`standard-version` (^9.5.0)** : Automatisation des numéros de version (SemVer) et génération automatique du fichier `CHANGELOG.md`.

#### 🔹 Sous-dépendances clés installées en arrière-plan

Pour comprendre la mécanique complète installée par `standard-version` dans le dossier `node_modules`, voici les sous-dépendances clés requises :

* **Analyse Git & Commits Standards :** `conventional-changelog` (moteur d'analyse des commits selon la convention Angular/Conventional Commits), `git-raw-commits`, `git-semver-tags`.
* **Moteur de templates & parsing :** `handlebars` (pour la mise en page du changelog), `conventional-commits-parser`, `JSONStream`.
* **Outils CLI & Style Terminal :** `yargs` (gestion des arguments de ligne de commande), `chalk` (colorisation des logs de release).

---

## 5. 🚀 Projets Présentés

Gérés dynamiquement depuis `projets.json` :

1. **🌸 Mes Waifus Préférées :** Application interactive listant mes personnages favoris avec visuels dédiés.
2. **📚 Manga Sakura Collector (Application) :** Scanneur et gestionnaire de collection de mangas connecté sur l'API *Google Books*.
3. **🤖 Manga Bot (Discord) :** Un bot Python intelligent codé pour archiver et suivre ses mangas directement sur Discord.
4. **🖥️ Visionneuse Manga Sakura :** Page web dédiée à la lecture du fichier `.json` extrait par le bot Discord (incluant CGU et politiques de confidentialité).

---

## 6. 🚀 Lancement Local

1. **Cloner le projet :**

```bash
git clone [https://github.com/Nathan-Pro-FR/Porftolio_Nathan.git](https://github.com/Nathan-Pro-FR/Porftolio_Nathan.git)
cd Porftolio_Nathan

```

2. **Installer l'environnement de release (Optionnel) :**

```bash
npm install

```

3. **Générer une nouvelle version (Outils développeur) :**

```bash
npm run release

```

---

## 🤝 Contributions

Les contributions, signalements de bugs ou suggestions d'amélioration sont les bienvenus ! Néanmoins, pour des raisons de clarté et de sécurité :

1. Ouvrez d'abord une **Issue** pour discuter du changement que vous souhaitez apporter.
2. Évitez les Pull Requests directes sur la branche `main` sans discussion préalable.
3. Respectez le format de message des [Conventional Commits]() lors de vos propositions.

---

## 🎵 Crédits & Remerciements

Un grand merci aux créateurs des ressources en libre accès utilisées pour ce projet :

* **Composition Musicale :** *Sakura Serenity* par **Melodigne** (via Pixabay Music).
* **Design & Graphismes :** Set d'icônes *Solid Play Pause* par **Heroicons** (Licence MIT).
* **Optimisations :** Compressions d'images via *Squoosh* et formats audio optimisés.

---

## 📬 Me Contacter / Renseignements

Si vous avez besoin d'informations, de précisions ou si vous souhaitez échanger sur le projet, je suis joignable directement sur mes plateformes prioritaires :

* **💬 Discord :** [@Nathanfurry_lax]()
* **✈️ Telegram :** [@Nathanfurry_lax]()

---
