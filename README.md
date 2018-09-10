# Desafio EOS Rio Hackathon 2018 - Bluchain

## Tema
Rede de fidelidade em blockchain, chamada Renova, que incentiva a reciclagem de embalagens descartáveis, promovida por comerciantes preocupados com a sustentabilidade do meio ambiente.

## Descrição do projeto

A proposta deste projeto é criar o token Renova (RNV), um sistema que motiva cidadãos a reciclarem o seu lixo por uma recompensa dada por estabelecimentos comerciais conectados a rede. O token pode ser utilizado para desconto em produtos e serviços nos comércios participantes, revertido em criptomoedas em exchanges, transferido entre usuários ou outras funcionalidades que a comunidade encontrar para ele.

Os atores do ecossistema são consumidores, comerciantes e centros de reciclagem.

### Proposta de solução

A solução é voltada para comerciantes que apoiam a causa da reciclagem e querem incentivar os seus consumidores a aderirem essa prática. 

Os comerciantes se cadastram na plataforma, preenchendo as informações da sua loja, 

### Principais funcionalidades para o usuário

- Carteira digital do programa fidelidade
- Histórico de transações
- Criar um ID digital único
- Encontrar o estabelecimento comercial mais próximo para retornar embalagens
- Visualizar ofertas de várias lojas
- Avaliar trocas com comerciantes

### Principais funcionalidades para o comerciante

- Carteira digital do programa fidelidade
- Criar um ID digital único
- Histórico de transações
- Lista de usuários cadastrados na rede
- Gestão de coleta de recicláveis
- Avaliar trocas com usuários
- Chat com comerciantes e centros de reciclagem
- Gestão de catálogos de produtos
- Agendar coleta de recicláveis 

### Principais funcionalidades para o centro de reciclagem

- Cadastrar interesse em receber os resíduos
- Receber solicitações de coleta
- Criar um ID digital único
- Chat com comerciantes


## Descrição do MVP

### Token Renova (RNV)

- Token EOS fungível
- Emissão de tokens pelos comerciantes em troca de embalagens recicláveis
- Quando os tokess são gastos em troca de produtos ou serviços, eles são queimados (deixam de existir)

### Blockchain

- Contrato que cria tokens
- Contrato que gerencia uso de tokens (burn)
- Acesso ao cadastro de IDs (gestão de identidade)
- Gestão de chaves privadas

### MVP aplicativo do usuário

- Carteira de token RNV
- Transferência para usuários
- Histórico de transações
- ID digital

### MVP aplicativo do usuário mockado

### MVP aplicativo do comerciante

- Emissão de tokens
- Lista de usuários
- Busca de usuários
- Histórico de transações

### MVP aplicativo do comerciante mockado

### Infraestrutura

Chain lateral EOS Bluchain
