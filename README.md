# Desafio EOS Rio Hackathon 2018 - Bluchain

## Tema
Rede de fidelidade em blockchain, chamada Renova, que incentiva a coleta seletiva de resíduos recicláveis, promovida por comerciantes e centros de coleta preocupados com meio ambiente e sustentabilidade.

## Descrição do projeto

Atualmente, a maior produção mundial gerada pelo homem é o descarte de lixo. Em 2018, a produção é de 1,3 bilhão de toneladas por ano e deve crescer até 2,2 bilhões de toneladas por ano até 2022, segundo as estimativas do Programa das Nações Unidas para o Meio Ambiente (Pnuma) [1]. No Brasil, são descartados mais de 79 mil toneladas por ano, segundo dados da  Associação Brasileira de Empresas de Limpeza Pública e Resíduos Especiais (Abrelpe) [2]. Para agravar a situação, apenas 18% dos municípos tem programas de coleta seletiva, que representam cerca de 15% da população brasileira. Ou seja, 85% dos brasileiros não têm como destinar resíduos para a reciclagem [3].

Por outro lado, uma conhecida forma para engajar consumidores são programas de fidelidade. Para as marcas, é de 6 a 7 vezes mais caro adquirir um novo consumidor do que manter um, de modo que consumidores fiéis facilitam a previsibilidade do fluxo de caixa. Segundo estudos, aumentar a retenção de consumidores em 5%, pode aumentar aas vendas em até 95%. Além disso, 73% dos consumidores acreditam que os programas de fidelidade devem ser voltados para eles [4].

A fim de conscientizar a população brasileira e mundial para a importância da coleta seletiva, a proposta deste projeto é criar o token Renova (RNV), um sistema que motiva cidadãos a selecionarem corretamente o seu lixo e o encaminhar para centros de coleta por desconto em produtos e dada por estabelecimentos comerciais conectados a rede. Em suma, o consumidor vai conseguir trocar um resíduo ao descartá-lo corretamente por um produto novo em uma loja participante. Como incentivo, é gerado para o consumidor uma quantidade de tokens RNV proporcional a quantidade e o tipo do resíduo entregue e verificado pelo centro de coleta. 

Com esse token, o consumidor poderá acessar um aplicativo no qual consegue visualizar promomoções de produtos e serviços das lojas participantes da Renova.

Outras formas de conseguir o token no futuro:
reward different types of customer interactions with points ‒ interactions like review writing, referring a friend, watching a product video ‒ and not just purchasing a product, which seems more like a cold business relationship.

Os benefícios para o comerciante em participar da Renova são criar um relacionamento com o consumidor baseado na mútua preocupação com o meio ambiente e um lead para a compra de seus produtos ou serviços.

Inicialmente o token RNV poderá ser utilizado apenas para desconto em produtos e serviços nos comércios participantes, nas quando o token tiver sua blockchain pública, ele poderá ser revertido em criptomoedas em exchanges, transferido entre usuários ou ter outras funcionalidades que a comunidade encontrar para ele.

Os principais atores do ecossistema são consumidores, comerciantes e centros de coleta e reciclagem.

### Funcionalidade do aplicativo

A solução é voltada para comerciantes que apoiam a coleta seletiva e a reciclagem e querem incentivar os seus consumidores a aderirem essas práticas.

O comerciante é o ator mais importante da rede pois é ele que promove o incentivo econômico para os demais atores participarem, tanto o consumidor que vai conseguir vouchers de descontos quanto para o, quanto é ele que valida o time que o consumidor está descartando

(O comerciante se cadastra na plataforma, preenchendo as informações da sua loja (nome da loja, CNPJ, endereço, logo), e )

(Já o usuário
Inicialmente, papel, plástico e alumínio)

### Principais funcionalidades para o usuário

- Carteira digital do programa fidelidade
- Histórico de transações
- Criar um ID digital único
- Encontrar o estabelecimento comercial mais próximo para retornar embalagens
- Visualizar ofertas de várias lojas
- Visualizar vouchers obtidos

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

## Descrição do Proof-of-concept (POC)

### Token Renova (RNV)

- Token EOS fungível
- Emissão de tokens pelos centros de coleta em troca de material recicláveis
- Quando os tokens são gastos em troca de produtos ou serviços, *eles são queimados (deixam de existir)*

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

- Onboard
  - Cadastro da conta
  - Importação da carteira
- Carteira de token RNV
  - Visualizar saldo
- *Transferência para comerciante*
- Lista de centro de coletas
    - Perfil do centro de coleta
    - Materiais aceitos pelo centro de coleta
- *Lista de comerciantes*
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
  - Emissão RNV
- Exportar carteira

### POC aplicativo do comerciante

- Carteira de token RNV
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
