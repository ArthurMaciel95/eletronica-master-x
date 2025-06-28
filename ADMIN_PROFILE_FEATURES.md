# Funcionalidades de Perfil do Administrador

## Visão Geral

O sistema agora inclui funcionalidades completas para que o administrador possa gerenciar seu próprio perfil e credenciais de acesso.

## Funcionalidades Implementadas

### 1. Acesso ao Perfil
- **Localização**: Dashboard Admin → "Meu Perfil"
- **URL**: `/admin/profile`
- **Descrição**: Interface para editar informações pessoais e alterar senha

### 2. Edição de Informações Pessoais
- **Campos editáveis**:
  - Nome completo
  - Endereço de email
- **Validações**:
  - Nome obrigatório (mínimo 2 caracteres, máximo 100)
  - Email obrigatório e válido
  - Verificação de email único (não pode ser usado por outro admin)
- **Informações exibidas** (somente leitura):
  - Função na plataforma (Admin/Super Admin)
  - Status da conta (Ativo/Inativo)
  - Data do último login
  - Data de criação da conta

### 3. Alteração de Senha
- **Campos necessários**:
  - Senha atual
  - Nova senha
  - Confirmação da nova senha
- **Validações**:
  - Senha atual deve estar correta
  - Nova senha deve ter pelo menos 6 caracteres
  - Nova senha deve ser diferente da atual
  - Confirmação deve coincidir com a nova senha

### 4. Interface do Usuário
- **Design**: Interface moderna com abas (tabs)
- **Responsividade**: Funciona em dispositivos móveis e desktop
- **Feedback**: Mensagens de sucesso e erro claras
- **Navegação**: Botão de voltar ao dashboard

## APIs Implementadas

### 1. `/api/admin/profile`
- **GET**: Buscar informações do perfil do admin logado
- **PUT**: Atualizar informações do perfil
- **Autenticação**: Requer token JWT válido

### 2. `/api/admin/change-password`
- **POST**: Alterar senha do admin
- **Autenticação**: Requer token JWT válido

## Segurança

### 1. Autenticação JWT
- Tokens JWT com expiração de 7 dias
- Verificação de token em todas as rotas protegidas
- Middleware atualizado para validar tokens JWT

### 2. Validações de Segurança
- Verificação de senha atual antes de permitir alteração
- Hash seguro de senhas com bcrypt
- Validação de email único
- Proteção contra acesso não autorizado

### 3. Variáveis de Ambiente
- `JWT_SECRET`: Chave secreta para assinatura de tokens JWT
- Deve ser configurada no arquivo `.env.local`

## Configuração

### 1. Variáveis de Ambiente
Adicione ao seu arquivo `.env.local`:
```
JWT_SECRET=sua-chave-secreta-aqui-minimo-32-caracteres
```

### 2. Dependências
As seguintes dependências foram adicionadas:
- `jsonwebtoken`: Para geração e validação de tokens JWT
- `@types/jsonwebtoken`: Tipos TypeScript para JWT

## Fluxo de Uso

1. **Login**: Admin faz login normalmente
2. **Acesso ao Perfil**: Clica em "Meu Perfil" no dashboard
3. **Edição de Informações**:
   - Aba "Informações do Perfil"
   - Edita nome e/ou email
   - Clica em "Salvar Alterações"
4. **Alteração de Senha**:
   - Aba "Alterar Senha"
   - Preenche senha atual e nova senha
   - Confirma a nova senha
   - Clica em "Alterar Senha"

## Tratamento de Erros

- **Erro de validação**: Mensagens específicas para cada tipo de erro
- **Erro de autenticação**: Redirecionamento para login
- **Erro de servidor**: Mensagens genéricas de erro interno
- **Sucesso**: Confirmações claras de operações realizadas

## Compatibilidade

- **Navegadores**: Todos os navegadores modernos
- **Dispositivos**: Desktop, tablet e mobile
- **Versões**: Compatível com a estrutura atual do projeto 