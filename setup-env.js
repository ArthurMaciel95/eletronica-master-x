const fs = require('fs');
const path = require('path');

console.log('🔧 Configuração do Ambiente - Antonio Store');
console.log('============================================\n');

// Verificar se .env.local já existe
const envPath = path.join(__dirname, '.env.local');

if (fs.existsSync(envPath)) {
  console.log('✅ Arquivo .env.local já existe!');
  console.log('📝 Verifique se a variável MONGODB_URI está configurada corretamente.\n');
} else {
  console.log('❌ Arquivo .env.local não encontrado!');
  console.log('📝 Criando arquivo .env.local com configurações padrão...\n');
  
  const envContent = `# MongoDB Connection String
# ⚠️ IMPORTANTE: Substitua pela sua string de conexão do MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/antonio-store?retryWrites=true&w=majority

# Next.js Configuration
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (Development Only)
ADMIN_EMAIL=admin@antonio.com
ADMIN_PASSWORD=admin123

# ⚠️ CONFIGURAÇÃO NECESSÁRIA:
# 1. Acesse: https://www.mongodb.com/atlas
# 2. Crie uma conta gratuita
# 3. Crie um cluster gratuito
# 4. Clique em "Connect" e escolha "Connect your application"
# 5. Copie a string de conexão
# 6. Substitua username, password e cluster pelos seus dados
# 7. Cole a string completa na variável MONGODB_URI acima
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env.local criado com sucesso!');
  console.log('📝 Agora configure sua string de conexão MongoDB.\n');
}

console.log('🚀 Próximos passos:');
console.log('1. Configure sua string de conexão MongoDB no arquivo .env.local');
console.log('2. Execute: npm run dev');
console.log('3. Teste a conexão: http://localhost:3000/api/test-db');
console.log('4. Acesse o admin: http://localhost:3000/admin/login');
console.log('\n📚 Documentação completa: README.md'); 