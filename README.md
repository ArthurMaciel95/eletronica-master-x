# Antonio Store - Catálogo de Produtos e Serviços

Um site moderno de catálogo de produtos e serviços de tecnologia, construído com Next.js, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Catálogo de Produtos**: Exibição de produtos com imagens, descrições e preços
- **Seção de Serviços**: Apresentação dos serviços oferecidos com características
- **Sistema Administrativo**: Painel para gerenciar produtos, serviços e configurações
- **Configurações Dinâmicas**: WhatsApp, telefone, email e informações da empresa configuráveis
- **Design Responsivo**: Interface moderna e adaptável a todos os dispositivos
- **Banco de Dados MongoDB**: Armazenamento persistente de dados

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB

## 📋 Pré-requisitos

- Node.js 18+ 
- MongoDB (local ou Atlas)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd antonio-site
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` e adicione sua URL do MongoDB:
```
MONGODB_URI=sua_url_do_mongodb_aqui
```

4. **Execute o projeto**
```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 🔐 Acesso Administrativo

- **URL**: `/admin/login`
- **Usuário**: `admin`
- **Senha**: `admin`

## 📱 Funcionalidades do Admin

### Dashboard
- Visão geral dos produtos, serviços e marcas
- Links rápidos para todas as seções

### Produtos
- Listar, criar, editar e excluir produtos
- Upload de imagens
- Categorização e destaque

### Serviços
- Gerenciar serviços oferecidos
- Configurar características e ícones
- Ordenação de exibição

### Marcas
- Adicionar/remover marcas do marquee
- Logos das empresas parceiras

### Configurações
- Nome e descrição do site
- Informações de contato (email, telefone, WhatsApp)
- Endereço da empresa

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Configurações do Site
Todas as informações de contato e textos são editáveis através do painel administrativo em `/admin/settings`.

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
│   ├── admin/          # Páginas administrativas
│   ├── api/            # APIs REST
│   └── globals.css     # Estilos globais
├── components/         # Componentes React
├── lib/               # Utilitários (MongoDB)
└── models/            # Modelos Mongoose
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure a variável `MONGODB_URI` no painel do Vercel
3. Deploy automático a cada push

### Outras Plataformas
O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do WhatsApp ou email configurado no painel administrativo.

---

Desenvolvido por [Arcode Soluções](https://arcodesolucoes.com.br/) 