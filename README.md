# Desafio EOS Rio Hackathon 2018 - Bluchain

## Tema
Rede de fidelidade em blockchain, chamada Renova, que incentiva a coleta seletiva de resíduos recicláveis, promovida por comerciantes preocupados com meio ambiente e sustentabilidade. A rede também conta com um sistema de vouchers em blockchain para descontos em produtos e serviços oferecidos pelos comerciantes da rede.

## Descrição do projeto

Atualmente, a maior produção mundial gerada pelo homem é o descarte de lixo. Em 2018, a produção é de 1,3 bilhão de toneladas por ano e deve crescer até 2,2 bilhões de toneladas por ano até 2022, segundo as estimativas do Programa das Nações Unidas para o Meio Ambiente (Pnuma) [1]. No Brasil, são descartados mais de 79 mil toneladas por ano, segundo dados da  Associação Brasileira de Empresas de Limpeza Pública e Resíduos Especiais (Abrelpe) [2]. Para agravar a situação, apenas 18% dos municípos tem programas de coleta seletiva, que representam cerca de 15% da população brasileira. Ou seja, 85% dos brasileiros não têm como destinar resíduos para a reciclagem [3].

A fim de concientizar a população brasileira e mundial para a importãncia da coleta seletiva, a proposta deste projeto é criar o token Renova (RNV), um sistema que motiva cidadãos a selecionarem corretamente o seu lixo por uma recompensa dada por estabelecimentos comerciais conectados a rede. A ideia é que o consumidor em vez de jogar seu resíduo reciclável na cesta de lixo, misturado com outros resíduos recicláveis ou não, leve essa embalagem até um comerciante que vai fazer o descarte seletivo e encaminhar para um centro de reciclagem. Como incentivo, é gerado para o consumidor uma quantidade de tokens RNV proporcional a quantidade e o tipo do resíduo entregue. Com esse token, o consumidor poderá acessar um aplicativo no qual consegue visualizar promomoções de produtos e serviços e trocar seus tokens por vouchers de desconto.

Os benefícios para o comerciante ao aderir essa rede são criar um relacionamento com o consumidor baseado na mútua preocupação com o meio ambiente e um lead para a compra de seus produtos ou serviços.

Inicialmente o token RNV poderá ser utilizado apenas para desconto em produtos e serviços nos comércios participantes, nas quando o token tiver sua blockchain pública, ele poderá ser revertido em criptomoedas em exchanges, transferido entre usuários ou ter outras funcionalidades que a comunidade encontrar para ele.

Os principais atores do ecossistema são consumidores, comerciantes e centros de coleta e reciclagem.

Embora inicialmente o projeto esteja mais voltado para o comeciante, no futuro a rede estará mais voltada para promover os centros de coleta, que é um dos serviços públicos mais caro em todo o mundo, em que essses agentes seriam os validadores das transações da rede, recebendo tokens RNV como incentivo econômico.

### Proposta de solução

A solução é voltada para comerciantes que apoiam a causa da reciclagem e querem incentivar os seus consumidores a aderirem essa prática.

O comerciante é o ator mais importante da rede pois é ele que promove o incentivo econômico para os demais atores participarem, tanto o consumidor que vai conseguir descontos 

(O comerciante se cadastra na plataforma, preenchendo as informações da sua loja (nome da loja, CNPJ, endereço, logo), e )

(Já o usuário
Inicialmente, papel, plástico e alumínio)

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

## Referências
[1] https://www.ecycle.com.br/component/content/article/38-no-mundo/1157-estimativa-revela-que-quantidade-de-lixo-produzida-no-mundo-sera-quase-70-maior-em-2030.html
[2] http://edicaodobrasil.com.br/2017/11/10/cada-brasileiro-produz-387-kg-de-lixo-por-ano/
[3] https://epoca.globo.com/colunas-e-blogs/blog-do-planeta/noticia/2016/06/85-dos-brasileiros-nao-tem-acesso-coleta-seletiva-mostra-estudo.html
