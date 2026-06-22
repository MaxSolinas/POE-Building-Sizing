# POE Building Sizing

Widget de dimensionnement des adoucisseurs Aqua Purify pour le Luxembourg.

Le widget propose une recherche par commune ou localite, affiche la durete de
l'eau, recommande un equipement Kinetico et genere un rapport PDF pour les
projets collectifs.

## Integration

Ajoutez ce bloc dans la page Odoo :

```html
<div id="wyws-dealer-widget" style="width:100%; min-height:950px;"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://scripts.aquapurify.lu/poe-building-sizing.js"></script>
```

Remplacez `scripts.aquapurify.lu` par le domaine Cloudflare Pages retenu.

## Apercu local

Depuis le dossier du projet :

```bash
python3 -m http.server 8080
```

Puis ouvrez `http://localhost:8080`.

## Deploiement Cloudflare Pages

1. Importez ce depot dans Cloudflare Pages.
2. Choisissez la branche de production `main`.
3. Laissez la commande de compilation vide.
4. Utilisez `/` comme repertoire de sortie.
5. Ajoutez ensuite le domaine personnalise, par exemple
   `scripts.aquapurify.lu`.

Chaque push sur `main` publiera automatiquement la nouvelle version.

## Fichiers publics

- `poe-building-sizing.js` : widget a integrer au site.
- `index.html` : page de demonstration et controle visuel.
- `_headers` : politique de cache et en-tetes de securite Cloudflare Pages.

## Versionnement

Pour une modification incompatible, publiez egalement une copie versionnee,
par exemple `poe-building-sizing-v2.js`, puis changez l'URL dans Odoo.
Cela permet de tester et de revenir rapidement a la version precedente.

## Licence

Code proprietaire Aqua Purify. Voir [LICENSE](LICENSE).
