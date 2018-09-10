# Desafio EOS Rio Hackathon 2018 - Bluchain

## Tema
Rede de fidelidade em blockchain, chamada Renova, que incentiva a reciclagem de embalagens descartáveis, promovida por comerciantes preocupados com a sustentabilidade do meio ambiente.

## Descrição do projeto

A proposta deste projeto é criar o token Renova (RNV), um sistema que motiva cidadãos a reciclarem o seu lixo por uma recompensa dada por estabelecimentos comerciais conectados a rede. O token pode ser utilizado para desconto em produtos e serviços nos comércios participantes, revertido em criptomoedas em exchanges, transferido entre usuários ou outras funcionalidades que a comunidade encontrar para ele.

Os atores do ecossistema são consumidores, comerciantes e centros de coleta.

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
- Chat com comerciantes e centros de coleta
- Gestão de catálogos de produtos

### Principais funcionalidades para o centro de coleta

- Criar um ID digital único
- Chat com comerciantes
- Gestão de coleta de recicláveis

## Descrição do POC

### Token Renova (RNV)

- Token EOS fungível
- Emissão de tokens pelos centros de coleta em troca de material recicláveis
- Quando os tokens são gastos em troca de produtos ou serviços, eles são queimados (deixam de existir)

### Blockchain

- Contrato que cria tokens
- Contrato consumidor
  - Cadastro (privado)
- Contrato comerciante
  - Cadastro (publico)
  - Ofertas
- Contrato coleta
  - Cadastro (publico)
  - Valor pago por materiais
- Acesso ao cadastro de IDs (gestão de identidade)
- Gestão de chaves privadas (wallet padrão)

### POC aplicativo do usuário

- Carteira de token RNV
- Transferência para comerciante
- Lista de centros de coleta
- Busca de centros de coleta
- Histórico de transações
- ID digital

### POC aplicativo do comerciante

- Carteira de token RNV
- Cadastro de ofertas
- Lista de usuários
- Busca de usuários
- Histórico de transações
- Transferência para centro de coleta

### POC aplicativo do centro de coleta

- Carteira de token RNV
- Cadastro de materiais e preços
- Lista de usuários
- Busca de usuários
- Histórico de transações
- Transferência para usuários (PDV)

### Infraestrutura

Chain lateral EOS Bluchain
