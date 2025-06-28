# Configuração do MongoDB

## 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/antonio-store?retryWrites=true&w=majority

# Next.js
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (for development)
ADMIN_EMAIL=admin@antonio.com
ADMIN_PASSWORD=admin123
```

## 2. Estrutura do Banco de Dados

O sistema criará automaticamente as seguintes coleções:

### Products

- `name`: Nome do produto
- `description`: Descrição do produto
- `price`: Preço (número)
- `image`: URL da imagem
- `category`: Categoria do produto
- `inStock`: Se está em estoque (boolean)
- `featured`: Se é destaque (boolean)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### Brands

- `name`: Nome da marca
- `logo`: URL do logo
- `active`: Se está ativa (boolean)
- `order`: Ordem de exibição
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### Settings

- `siteName`: Nome do site
- `siteDescription`: Descrição do site
- `contactEmail`: Email de contato
- `contactPhone`: Telefone de contato
- `contactAddress`: Endereço
- `whatsappNumber`: Número do WhatsApp
- `companyDescription`: Descrição da empresa
- `socialMedia`: Redes sociais (opcional)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## 3. APIs Disponíveis

### Produtos

- `GET /api/products` - Listar todos os produtos
- `POST /api/products` - Criar novo produto
- `GET /api/products/[id]` - Buscar produto específico
- `PUT /api/products/[id]` - Atualizar produto
- `DELETE /api/products/[id]` - Excluir produto

### Marcas

- `GET /api/brands` - Listar marcas ativas
- `POST /api/brands` - Criar nova marca

### Configurações

- `GET /api/settings` - Buscar configurações do site
- `PUT /api/settings` - Atualizar configurações

## 4. Como Testar

1. Configure o arquivo `.env.local` com sua string de conexão MongoDB
2. Execute `npm run dev`
3. Acesse `http://localhost:3000/admin/login`
4. Use as credenciais: admin@antonio.com / admin123
5. Teste as funcionalidades de CRUD

## 5. Validações

O sistema inclui validações automáticas:

- **Produtos**: Nome obrigatório, preço positivo, URL de imagem válida
- **Marcas**: Nome obrigatório, URL de logo válida
- **Configurações**: Email válido, WhatsApp apenas números

## 6. Índices

O MongoDB criará automaticamente:

- Índice único para configurações (garante apenas uma configuração)
- Índices de timestamp para ordenação
