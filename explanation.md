#Handleiding

##Front en backend samewerking
Bij de front-end (de .svelte bestanden) zitten scirpt tags in die standaard javascript toevoegen.
Binnen deze javascript tags bevinden zich requests. Deze requets sturen vanuit de front-end een aanvraag naar de back-end.
Deze aanvraag word nagekeken door de back-end of:
- De meegegeven token klopt en toegang heeft.
- De juiste parameters meegegeven zijn.
Als deze allemaal meegegeven zijn dan kunnen wij de request aanvaarden end de juiste response terug sturen.

De meeste Post responses worden gemaakt door een XMLHTTPRequest. deze XMLHTTPRequest heeft de mogelijkheid om te kijken wat de status is van de request.
Hiermee kunnen wij meer feedback geven aan de gebruiker.
Voor de get requests zijn voornamelijk oude fetch requests gebruik. Deze waren makkelijker om te impleneteren.

##Component structuur
###-Nav
De nav zou eigenlijk de nav zou eigenlijk tussen de zoekbalk die zich bevind op de navbar en de index.svelte praten
om de gevonden auctions terug te geven.
Dit zou gedaan kunnen worden met svelte die via een context er voor kan zorgen dat 2 verschillende pagina's informatie
met elkaar kunnen uitdelen.

## toegevoegde libraries.
Aan dit project zitten alleen Sapper - Svelte.
Deze maakte het makkelijker om items die opgehaald worden dynamisch toe te voegen aan de website.
