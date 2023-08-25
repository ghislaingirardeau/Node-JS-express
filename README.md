npx nodemon

# Routing

Si route pour Render Html set header "Content-Type", "text/html" et renvoie une view

Si route API pour envoie de donnée set header "Content-Type", "application/json" et renvoie une vue

# Views

Res avec render() ou sendfile()
j'envoie le html depuis l'url server

# Public

Express utilise tous les fichiers dans le dossier "Public", pour les rendre accessible coté client

Ce qui génère le html Static si il en contient
app.use(express.static(path.resolve(\_\_dirname, "public")));
