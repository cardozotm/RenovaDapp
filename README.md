# Desafio EOS Rio Hackathon 2018 - Bluchain

## Tema
Rede de fidelidade em blockchain, chamada Renova, que incentiva a coleta seletiva de resíduos recicláveis, promovida por comerciantes e centros de coleta preocupados com meio ambiente e sustentabilidade.

## Descrição do problema

Atualmente, a maior produção mundial gerada pelo homem é o descarte de lixo. Em 2018, a produção é de 1,3 bilhão de toneladas por ano e deve crescer até 2,2 bilhões de toneladas por ano até 2022, segundo as estimativas do Programa das Nações Unidas para o Meio Ambiente (Pnuma) [1]. No Brasil, são descartados mais de 79 mil toneladas por ano, segundo dados da  Associação Brasileira de Empresas de Limpeza Pública e Resíduos Especiais (Abrelpe) [2]. Para agravar a situação, apenas 18% dos municípos tem programas de coleta seletiva, que representam cerca de 15% da população brasileira. Ou seja, 85% dos brasileiros não faz a destinação correta dos resíduos [3].

Por outro lado, uma conhecida forma para engajar consumidores são programas de fidelidade. No entanto, para que o engajamento de um programa de fidelidade vai além da compra entre o lojista e o consumidor.

A fim de conscientizar e engajar a população brasileira e mundial para a prática da coleta seletiva, a proposta deste projeto é criar o token Renova (RNV), um sistema que motiva cidadãos (heróis da reciclagem) a selecionarem corretamente o seu lixo e o encaminhar para centros de coleta (ecopontos) por desconto em produtos e dada por estabelecimentos comerciais (lojista) conectados a rede. Em resumo, o consumidor vai conseguir trocar um resíduo ao descartá-lo corretamente por um produto novo em uma loja participante. 

## Proposta de solução

Como incentivo ao entregar plático, papel ou alumínio ao ecoponto, é dado para o herói da reciclagem uma quantidade de tokens RNV proporcional a quantidade e o tipo do resíduo entregue e verificado pelo centro de coleta.

Com esse token, o herói poderá acessar um aplicativo no qual consegue visualizar promomoções de produtos e serviços das lojas participantes da Renova.

O lojista poderá criar ofertas de seus produtos em sua plataforma gratuitamente, mas ele pode "impulsionar" a sua oferta especificando para qual região geográfica ele deseja provover seu produto, de modo que o usuário receberá a notificação daquela oferta.

Os benefícios para o comerciante em participar da Renova são criar um relacionamento com o consumidor baseado na mútua preocupação com o meio ambiente e um lead para a compra de seus produtos ou serviços.

Inicialmente o token RNV poderá ser utilizado apenas para desconto em produtos e serviços nos comércios participantes, nas quando o token tiver sua blockchain pública, ele poderá ser revertido em criptomoedas em exchanges, transferido entre usuários ou ter outras funcionalidades que a comunidade encontrar para ele.

Os principais atores do ecossistema são consumidores (heróis da reciclagem), comerciantes (lojistas) e centros de coleta e reciclagem (ecopontos).

## Descrição do Proof-of-concept (POC)

### Token Renova (RNV)

- Token EOS fungível
- Centros de coleta começam com uma quantidade inicial de coleta
- Centro de coleta entreguam tokens em troca de recicláveis

### Smart contracts 

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

- Onboard
  - Cadastro da conta
  - Importação da carteira
- Carteira de token RNV
  - Visualizar saldo
- Lista de centro de coletas
    - Perfil do centro de coleta
    - Materiais aceitos pelo centro de coleta
- Lista de comerciantes
  - Perfil do centro de coleta
  - Lista de ofertas
- Perfil
  - Histórico de transações
  - Ver/ editar informações de cadastro
- Exportação de carteira

### POC aplicativo do centro de coleta

- Onboard
  - Cadastro da conta
  - Importação da carteira
- Carteira de token RNV
- Cadastro de materiais
  - Tpois
  - Valores em RNV
- Calculadora de resíduo para RNV
  - Nome da conta
  - Tipo
  - Quantidade
  - Unidade
  - Envio RNV
- Exportar carteira

### POC aplicativo do comerciante

- Saldo de token RNV
- Cadastro de ofertas
  - Descrição
  - RNV
- Gerenciamento de oferta

### Infraestrutura

Chain lateral EOS Bluchain

## Implementações Posteriores e Roadmap

## Referências
1. https://www.ecycle.com.br/component/content/article/38-no-mundo/1157-estimativa-revela-que-quantidade-de-lixo-produzida-no-mundo-sera-quase-70-maior-em-2030.html
1. http://edicaodobrasil.com.br/2017/11/10/cada-brasileiro-produz-387-kg-de-lixo-por-ano/
1. https://epoca.globo.com/colunas-e-blogs/blog-do-planeta/noticia/2016/06/85-dos-brasileiros-nao-tem-acesso-coleta-seletiva-mostra-estudo.html
1. https://www.ecommerceceo.com/customer-loyalty-programs/
