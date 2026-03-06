const fs = require('fs');
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const manifests = fs.readdirSync('./apps')
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync('./apps/' + f)));

const proposedDir = './synergies/proposed';
const existing = fs.existsSync(proposedDir)
  ? fs.readdirSync(proposedDir).filter(f => f.endsWith('.json')).map(f => f.replace('.json',''))
  : [];

const nextNum = existing.length + 1;
const nextId = 'SYN-' + String(nextNum).padStart(3,'0');

console.log(`Apps analysees: ${manifests.length}`);
console.log(`Synergies existantes: ${existing.join(', ') || 'aucune'}`);
console.log(`Prochain ID: ${nextId}`);

const prompt = `Tu es le NEO Synergy Engine pour Groupe NEO d'Olivier Neukomm (Suisse, courtier assurances).

MANIFESTES DES APPLICATIONS:
${JSON.stringify(manifests, null, 2)}

SYNERGIES DEJA PROPOSEES (ne pas reproduire): ${existing.join(', ') || 'aucune'}

Propose 2 NOUVELLES synergies business concretes et chiffrees entre ces apps.

Reponds UNIQUEMENT avec un JSON array (pas de markdown, pas d'explication):
[
  {
    "id": "SYN-XXX",
    "status": "proposed",
    "proposed_by": "claude-synergy-engine",
    "proposed_at": "2026-03-06T21:30:00Z",
    "validated_by": null,
    "title": "emoji + titre court",
    "description": "2-3 phrases",
    "category": "automation",
    "priority": "haute",
    "effort_estimate": "3h de code",
    "revenue_impact_chf": 5000,
    "revenue_details": "calcul detaille",
    "source_app": "app-id",
    "source_event": "event.name",
    "target_app": "app-id",
    "target_action": "action",
    "flow": ["etape 1", "etape 2", "etape 3"]
  }
]`;

(async () => {
  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = response.content[0].text;
    console.log('Reponse recue, longueur:', text.length);

    let synergies = [];
    try {
      const clean = text.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim();
      synergies = JSON.parse(clean);
    } catch(e) {
      const match = text.match(/\[[\s\S]*?\]/);
      if (match) synergies = JSON.parse(match[0]);
    }

    console.log(`Synergies parsees: ${synergies.length}`);

    if (!fs.existsSync(proposedDir)) fs.mkdirSync(proposedDir, { recursive: true });

    synergies.forEach((syn, i) => {
      if (!syn.id) syn.id = 'SYN-' + String(nextNum + i).padStart(3, '0');
      const fp = proposedDir + '/' + syn.id + '.json';
      if (!fs.existsSync(fp)) {
        fs.writeFileSync(fp, JSON.stringify(syn, null, 2));
        console.log('Creee:', syn.id, '-', syn.title);
      } else {
        console.log('Deja existe:', syn.id);
      }
    });

    console.log('Done!');
  } catch(e) {
    console.error('ERREUR:', e.message);
    process.exit(1);
  }
})();
