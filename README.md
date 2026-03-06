# 🔗 NEO Synergy Hub

> **Le cerveau inter-applications de Groupe NEO**

Chaque application publie ses capacités ici. Claude lit tout, propose des synergies. Olivier valide. Le code s'implémente.

---

## 🏗️ Structure

```
neo-synergy-hub/
├── apps/                    ← Manifestes des applications
│   ├── winwin-v2.json       ← WIN WIN Finance Group
│   ├── peps-digital.json    ← PEP's Digital
│   ├── immo-cool.json       ← immo.cool
│   ├── jvais.json           ← J'VAIS covoiturage
│   ├── swissrh.json         ← SWISSRH
│   ├── soluris.json         ← Soluris
│   ├── juraitax.json        ← JurAI Tax
│   └── provis.json          ← PROVIS (à venir)
│
├── synergies/
│   ├── proposed/            ← Synergies proposées par Claude IA
│   └── validated/           ← Synergies validées par Olivier
│
├── messages/                ← Messages inter-apps
│   └── YYYY-MM-DD-*.json
│
└── .github/workflows/
    └── synergy-engine.yml   ← GitHub Action : Claude propose des synergies
```

---

## 📡 Comment ça marche

1. **Une app met à jour son manifeste** (`apps/xxx.json`)  
2. **GitHub Action se déclenche** → Claude analyse tous les manifestes  
3. **Claude crée un fichier** dans `synergies/proposed/`  
4. **Olivier reçoit une notification** et consulte le dashboard  
5. **Olivier valide** → le fichier passe dans `synergies/validated/`  
6. **Ticket créé automatiquement** dans le repo cible pour implémenter

---

## 🖥️ Dashboard

→ **[Ouvrir le NEO Synergy Hub](https://neo-synergy-hub.up.railway.app)** *(à déployer)*

---

## 🤖 Format d'un manifeste (`apps/xxx.json`)

```json
{
  "id": "app-id",
  "name": "Nom de l'app",
  "entity": "ww_finance | peps_swiss | independant",
  "domain": "app.ch",
  "description": "Ce que fait l'app",
  "version": "2.0",
  "updated_at": "2026-03-06",
  
  "data_exposed": [
    {
      "key": "nom_de_la_donnee",
      "description": "Ce que cette donnée représente",
      "trigger": "quand elle est disponible",
      "format": "json | webhook | email | api"
    }
  ],
  
  "data_needed": [
    {
      "key": "donnee_souhaitee",
      "description": "Ce dont l'app aurait besoin",
      "from": "app-id-source"
    }
  ],
  
  "events_emitted": ["event.name", "autre.event"],
  "events_consumed": ["event.depuis.autre.app"],
  
  "revenue_model": "description du modèle de revenus",
  "monthly_users": 0,
  "monthly_revenue_chf": 0,
  
  "synergy_potential": "Description libre des synergies possibles"
}
```

---

*Groupe NEO · WW Finance Group SARL × PEP's Swiss SA · Olivier Neukomm*
