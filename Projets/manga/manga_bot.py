import discord
from discord import app_commands
import json
import aiohttp
import os
from dotenv import load_dotenv

# Charge les variables contenant les clés secrètes depuis le fichier .env
load_dotenv()

# ==========================================
#         CONFIGURATION DU BOT (SÉCURISÉE)
# ==========================================
DISCORD_BOT_TOKEN = os.getenv("DISCORD_TOKEN")
GOOGLE_BOOKS_API_KEY = os.getenv("GOOGLE_BOOKS_API_KEY")

if not DISCORD_BOT_TOKEN or not GOOGLE_BOOKS_API_KEY:
    print("❌ Erreur : Le jeton Discord ou la clé API Google Books n'ont pas été trouvés.")
    print("Vérifiez que votre fichier .env existe et est correctement rempli.")
    exit(1)

COLLECTION_FILE = "collection_manga.json"
# ==========================================

class MangaBot(discord.Client):
    def __init__(self):
        intents = discord.Intents.default()
        
        # On active l'intent des émojis pour être sûr de pouvoir les lire correctement
        intents.emojis_and_stickers = True 

        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)

    async def on_ready(self):
        print(f'✅ Bot connecté en tant que : {self.user.name}')
        await self.tree.sync()
        print('✅ Commandes Slash synchronisées et prêtes !')

bot = MangaBot()

# ========================================== ========================================== 
# ========================================== ========================================== 
#        COMMANDE SLASH GLOBALE /PING               COMMANDE SLASH GLOBALE /PING       
# ========================================== ========================================== 
# ========================================== ========================================== 

@bot.tree.command(name="mping", description="Affiche le temps de réaction (latence) du bot.")
async def mping(interaction:discord.Interaction):
    latency = round(bot.latency * 1000)

    embed = discord.Embed(
        title="🏓 Pong !",
        description="Voici les performances réseau du bot.",
        color=0xFFB7C5
    )

    embed.add_field(
        name="Temps de réaction", 
        value=f"⏱️ `{latency} ms`", 
        inline=False
    )
    
    embed.set_footer(
        text=f"Demandé par {interaction.user.display_name}", 
        icon_url=interaction.user.display_avatar.url
    )

    await interaction.response.send_message(embed=embed)


# ========================================== ==========================================
# ========================================== ==========================================
#        GROUPE DE COMMANDES /MANGA                 GROUPE DE COMMANDES /MANGA
# ========================================== ==========================================
# ========================================== ==========================================
class MangaGroup(app_commands.Group):
    def __init__(self):
        super().__init__(name="manga", description="Gérer la collection de mangas")

    # ---------------------------------------------
    # ---------------------------------------------
    # --- Sous-commande : /manga ajouter [ISBN] ---
    # ---------------------------------------------
    # ---------------------------------------------

    @app_commands.command(name="ajouter", description="Ajouter un manga à la collection via son ISBN (10 ou 13 caractères)")
    @app_commands.describe(isbn="L'ISBN du manga (ex: 2811633107 ou 9782811633103)")
    async def ajouter(self, interaction: discord.Interaction, isbn: str):
        # Nettoyage automatique de la saisie (retrait des tirets/espaces et passage en majuscules pour le X de l'ISBN-10)
        isbn = isbn.replace("-", "").replace(" ", "").upper()

        # Validation de la structure de l'ISBN (10 ou 13 caractères)
        is_valid = False
        if len(isbn) == 13 and isbn.isdigit():
            is_valid = True
        elif len(isbn) == 10:
            # Les 9 premiers caractères doivent être des chiffres, le 10ème un chiffre ou la lettre X
            if isbn[:9].isdigit() and (isbn[9].isdigit() or isbn[9] == 'X'):
                is_valid = True

        if not is_valid:
            await interaction.response.send_message(
                "❌ Erreur : L'ISBN entré n'est pas valide (doit contenir 10 ou 13 caractères, le 'X' est accepté à la fin des ISBN-10).", 
                ephemeral=True
            )
            return

        # Discord patiente, la recherche API peut prendre du temps
        await interaction.response.defer(ephemeral=False)
        api_url = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}&key={GOOGLE_BOOKS_API_KEY}"
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url) as response:
                    if response.status != 200:
                        await interaction.followup.send("❌ Erreur lors de la communication avec l'API Google Books.")
                        return
                    
                    data = await response.json()
                    if data.get("totalItems", 0) == 0:
                        await interaction.followup.send(f"❌ Aucun manga trouvé pour l'ISBN {isbn}.")
                        return
                    
                    # Extraction des données du manga trouvées par Google
                    volume_info = data["items"][0]["volumeInfo"]
                    titre = volume_info.get("title", "Titre inconnu")
                    auteurs = volume_info.get("authors", ["Auteur inconnu"])
                    image_links = volume_info.get("imageLinks", {})
                    couverture_url = image_links.get("medium") or image_links.get("thumbnail") or "https://via.placeholder.com/150x220?text=No+Cover"

                    manga_entry = {
                        "id": str(discord.utils.time_snowflake(interaction.created_at)),
                        "isbn": isbn,
                        "title": titre,
                        "authors": auteurs,
                        "thumbnail": couverture_url,
                        "added_by": str(interaction.user),
                        "added_at": str(interaction.created_at)
                    }
                    
                    # Chargement du fichier JSON existant
                    collection = []
                    if os.path.exists(COLLECTION_FILE):
                        with open(COLLECTION_FILE, 'r', encoding='utf-8') as f:
                            try:
                                collection = json.load(f)
                            except json.JSONDecodeError:
                                collection = []

                    # Évite d'ajouter deux fois le même manga
                    if any(m['isbn'] == isbn for m in collection):
                        await interaction.followup.send(f"⚠️ Le manga **{titre}** est déjà dans votre collection.")
                        return

                    # Sauvegarde finale dans la base de données JSON
                    collection.append(manga_entry)
                    with open(COLLECTION_FILE, 'w', encoding='utf-8') as f:
                        json.dump(collection, f, indent=4, ensure_ascii=False)
                    
                    # Log visible directement dans le terminal VS Code
                    print(f"📖 [JSON LOG] Le manga '{titre}' (ISBN: {isbn}) a été ajouté avec succès par {interaction.user}.")
                    
                    # Envoi de la jolie fiche réponse sur Discord
                    embed = discord.Embed(title=f"✅ Manga ajouté : {titre}", color=0xFFB7C5)
                    embed.set_thumbnail(url=couverture_url)
                    embed.add_field(name="Auteur(s)", value=", ".join(auteurs), inline=True)
                    embed.add_field(name="ISBN", value=isbn, inline=True)
                    embed.set_footer(text=f"Ajouté par {interaction.user}")
                    
                    await interaction.followup.send(embed=embed)
        except Exception as e:
            print(f"Erreur API : {e}")
            await interaction.followup.send("❌ Une erreur inattendue est survenue.")

    # ---------------------------------------------
    # ---------------------------------------------
    # ------ Sous-commande : /manga exporter ------
    # ---------------------------------------------
    # ---------------------------------------------

    @app_commands.command(name="exporter", description="Exporter la collection complète au format JSON")
    async def exporter(self, interaction: discord.Interaction):
        await interaction.response.defer(ephemeral=True)

        if not os.path.exists(COLLECTION_FILE):
            await interaction.followup.send("❌ La collection est vide pour le moment.")
            return

        with open(COLLECTION_FILE, 'r', encoding='utf-8') as f:
            try:
                json.load(f)
            except json.JSONDecodeError:
                await interaction.followup.send("❌ Le fichier de collection est corrompu.")
                return

        file = discord.File(COLLECTION_FILE, filename="ma_collection_manga.json")
        await interaction.followup.send("Voici le fichier de sauvegarde JSON de votre collection :", file=file)

    # ---------------------------------------------
    # ---------------------------------------------
    # ------ Sous-commande : /manga emojis --------
    # ---------------------------------------------
    # ---------------------------------------------

    @app_commands.command(name="emojis", description="Affiche la liste de tous les émojis enregistrés sur les serveurs du bot.")
    async def emojis_command(self, interaction: discord.Interaction):
        # On récupère tous les émojis de tous les serveurs où se trouve le bot
        all_emojis = list(interaction.client.emojis)

        if not all_emojis:
            await interaction.response.send_message("🌸 Aucun émoji personnalisé n'a été trouvé sur mes serveurs.", ephemeral=False)
            return

        # Séparation des émojis animés et normaux pour faire un affichage propre
        animated_emojis = [str(e) for e in all_emojis if e.animated]
        static_emojis = [str(e) for e in all_emojis if not e.animated]

        embed = discord.Embed(
            title="🌸 Liste des Émojis du Bot",
            description=f"Le bot a accès à **{len(all_emojis)}** émoji(s) personnalisé(s).",
            color=0xFFB7C5
        )

        # Si la liste est trop longue, Discord limite à 1024 caractères par champ. 
        # On joint les émojis par un espace, s'il y en a trop, on coupe proprement.
        if static_emojis:
            static_text = " ".join(static_emojis)
            if len(static_text) > 1020: static_text = static_text[:1015] + "..."
            embed.add_field(name=f"📷 Émojis Fixes ({len(static_emojis)})", value=static_text, inline=False)

        if animated_emojis:
            animated_text = " ".join(animated_emojis)
            if len(animated_text) > 1020: animated_text = animated_text[:1015] + "..."
            embed.add_field(name=f"✨ Émojis Animés ({len(animated_emojis)})", value=animated_text, inline=False)

        embed.set_footer(text=f"Manga Sakura Collector • {interaction.user.display_name}")
        await interaction.response.send_message(embed=embed)

    # ---------------------------------------------
    # ---------------------------------------------
    # -------- Sous-commande : /manga help --------
    # ---------------------------------------------
    # ---------------------------------------------

    @app_commands.command(name="help", description="Affiche la liste des commandes disponibles")
    async def help_command(self, interaction: discord.Interaction):
        manga_cmd_id = ""
        mping_cmd_id = ""
        
        try:
            # Récupération de tous les identifiants pour rendre les commandes cliquables
            all_commands = await bot.tree.fetch_commands()
            for cmd in all_commands:
                if cmd.name == "manga":
                    manga_cmd_id = cmd.id
                elif cmd.name == "mping":
                    mping_cmd_id = cmd.id
        except Exception as e:
            print(f"Erreur lors de la récupération des IDs de commande : {e}")

        # Génération des mentions dynamiques (bleues et cliquables)
        mention_ajouter = f"</manga ajouter:{manga_cmd_id}>" if manga_cmd_id else "`/manga ajouter`"
        mention_exporter = f"</manga exporter:{manga_cmd_id}>" if manga_cmd_id else "`/manga exporter`"
        mention_emojis = f"</manga emojis:{manga_cmd_id}>" if manga_cmd_id else "`/manga emojis`"
        mention_help = f"</manga help:{manga_cmd_id}>" if manga_cmd_id else "`/manga help`"
        mention_mping = f"</mping:{mping_cmd_id}>" if mping_cmd_id else "`/mping`"

        embed = discord.Embed(
            title="🌸 Aide - Manga Sakura Collector",
            description="Bienvenue dans le gestionnaire de collection ! Voici les commandes disponibles. Vous pouvez cliquer directement sur les commandes en bleu pour les lancer.",
            color=0xFFB7C5
        )

        
        embed.add_field(
            name=f"{mention_ajouter} `[isbn]`",
            value="Ajoute un manga à ta collection en insérant son code ISBN (10 ou 13 caractères).\n*Exemples : /manga ajouter isbn:2811633107 ou /manga ajouter isbn:9782811633103*",
            inline=False
        )

        embed.add_field(
            name=mention_exporter,
            value="Génère et t'envoie un fichier de sauvegarde `json` contenant l'intégralité des mangas enregistrés.",
            inline=False
        )

        embed.add_field(
            name=mention_emojis,
            value="Affiche tous les émojis personnalisés disponibles et enregistrés dans les serveurs du bot.",
            inline=False
        )


        embed.add_field(
            name=mention_help,
            value="Affiche ce menu d'aide contextuel.",
            inline=False
        )

        embed.add_field(
            name=mention_mping,
            value="Affiche la latence du bot et son temps de réponse actuel par rapport aux serveurs de Discord.",
            inline=False
        )

        embed.set_footer(text="Manga Sakura Collector • Développé avec passion 🌸")
        
        await interaction.response.send_message(embed=embed)

# Ajout du groupe de commandes configuré à l'arbre global du bot
bot.tree.add_command(MangaGroup())

# Lancement de l'instance du bot
bot.run(DISCORD_BOT_TOKEN)