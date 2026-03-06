# 🕵️ Stalkea AI — Deploy na Vercel

## Estrutura do Projeto

```
stalkea-vercel/
├── index.html          → Landing page principal
├── api/
│   └── instagram.js    → Serverless function (substitui api.php)
├── vercel.json         → Configuração da Vercel
├── package.json
├── images/
├── js/
└── css/
```

---

## 🚀 Como fazer o deploy

### 1. Criar repositório no GitHub

```bash
git init
git add .
git commit -m "feat: stalkea ai vercel deploy"
gh repo create stalkea-ai --public --push --source=.
```

### 2. Deploy na Vercel

**Via CLI:**
```bash
npm i -g vercel
vercel --prod
```

**Via Dashboard:**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe seu repositório GitHub
4. Clique em "Deploy" (sem configurações extras)

### 3. Variável de Ambiente (Opcional mas recomendado)

No painel da Vercel → Settings → Environment Variables:

```
RAPIDAPI_KEY = e3cd2d0d2fmsh0dced0acd30a539p1c7338jsn42c4ecbbcca6
```

---

## 📡 Endpoints da API

A serverless function em `/api/instagram.js` cobre todos os endpoints do RapidAPI:

| Action | Parâmetros | Descrição |
|--------|-----------|-----------|
| `profile` | `username` ou `id` | Dados do perfil |
| `id` | `username` | ID do usuário |
| `web-profile` | `username` | Perfil web completo |
| `feeds` | `id`, `count` | Posts do usuário |
| `reels` | `id`, `count` | Reels do usuário |
| `reposts` | `id` | Repostagens |
| `tagged` | `id`, `count` | Mídias marcadas |
| `related` | `id` | Perfis relacionados |
| `search-users` | `query` | Buscar usuários |
| `search-locations` | `query` | Buscar locais |
| `post` | `id` | Info de uma mídia |
| `location-info` | `id` | Info de localização |
| `location-feeds` | `id`, `tab` | Mídias por local |
| `sections` | — | Seções do Explore |
| `section` | `id`, `count` | Mídias por seção |

### Exemplos de chamada:

```js
// Perfil por username
fetch('/api/instagram?action=profile&username=cristiano')

// Posts de um usuário
fetch('/api/instagram?action=feeds&id=18527&count=12')

// Buscar usuários
fetch('/api/instagram?action=search-users&query=marcos')
```

---

## ⚠️ Nota sobre compatibilidade PHP → Vercel

A Vercel **não suporta PHP**. O arquivo `api.php` foi substituído pela Serverless Function em Node.js (`api/instagram.js`). 

O roteamento em `vercel.json` garante que chamadas para `/api.php` também sejam redirecionadas automaticamente para a nova função.
