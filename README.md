TD Authentication – MediSuivi

Q1)

L’application n’a pas besoin de stocker les mots de passe car Firebase Authentication le fait à sa place.

Les mots de passe sont envoyés à Firebase
Ils sont sécurisés (hashés) et stockés sur leurs serveurs
L’application reçoit uniquement un utilisateur authentifié, jamais le mot de passe

Q2)

L’utilisateur est géré par le fournisseur d’authentification (Firebase) et non par l’application.

Les informations sensibles (mot de passe) sont stockées et sécurisées côté serveur par Firebase.

L’application cliente reste responsable de :

l’interface utilisateur
la validation des formulaires
l’envoi des données
la gestion de l’état de connexion (accès, redirections, déconnexion)

Q3)

1. Rôle de l’application

La création de compte rend l’application plus active : elle gère l’inscription et communique avec Firebase.

2. Validation côté client

Même si Firebase vérifie, la validation côté client permet :

d’améliorer l’expérience utilisateur (feedback immédiat)
d’éviter des requêtes inutiles

Q4)

1. Politique plus stricte

Pas toujours plus sécurisée : elle peut pousser à des mots de passe prévisibles ou réutilisés.

2. Mot de passe réutilisé

S’il est compromis ailleurs, un attaquant peut accéder au compte (credential stuffing).

Q5)

Non renseigné.

Q6)

1. Différence
Compte local : géré par Firebase (email/mot de passe)
Authentification fédérée : gérée par un fournisseur externe (Google, etc.)
2. Mot de passe Google
L’application ne connaît jamais le mot de passe
Elle reçoit uniquement un token d’authentification


TD Réflexion – Passage à Pro Santé Connect


1. Fonctionnalités dépendantes d’un compte local

-formulaire de connexion

-création de compte

-mot de passe oublié

-tout ce qui repose sur email/mot de passe

2. Écrans à repenser
   
-login

-register

-reset password

Ces écrans sont remplacés par une redirection vers Pro Santé Connect.

3. Remplacement du formulaire de connexion

L’application doit rediriger l’utilisateur vers Pro Santé Connect (OIDC), puis récupérer un code échangé contre un token.

4. Nouvelles informations à configurer

-client ID

-client secret

-URL de redirection

-endpoints OIDC (authorization, token)

5. Changement de responsabilité
   
-Avant : Firebase gère l’authentification

-Après : l’application gère le flux OIDC (redirection et gestion des tokens)


6. Ce qu’on peut conserver
   
-l’interface utilisateur

- la navigation et les pages (dashboard, etc.)
  
-la logique d’affichage

7. Pourquoi c’est plus lourd
   
- utilisation des protocoles OIDC et OAuth2
  
- configuration serveur nécessaire
  
- gestion des tokens (JWT)
