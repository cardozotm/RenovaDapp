# Desafio EOS Rio Hackathon 2018 - Bluchain

## Tema
Rede de fidelidade em blockchain, chamada Renova, que incentiva a coleta seletiva de resíduos recicláveis, promovida por comerciantes e centros de coleta preocupados com meio ambiente e sustentabilidade.

## Descrição do problema

Atualmente, a maior produção mundial gerada pelo homem é o descarte de resíduos. Em 2018, a produção é de 1,3 bilhão de toneladas por ano e deve crescer até 2,2 bilhões de toneladas por ano até 2022, segundo as estimativas do Programa das Nações Unidas para o Meio Ambiente (Pnuma) [1]. No Brasil, são descartados mais de 79 mil toneladas por ano, segundo dados da  Associação Brasileira de Empresas de Limpeza Pública e Resíduos Especiais (Abrelpe) [2]. Para agravar a situação, apenas 18% dos municípos tem programas de coleta seletiva, que representam cerca de 15% da população brasileira. Ou seja, 85% dos brasileiros não faz a destinação correta dos resíduos [3].

Por outro lado, uma conhecida forma para engajar consumidores são programas de fidelidade. No entanto, para que o engajamento de um programa de fidelidade vai além da compra entre o lojista e o consumidor.

A fim de conscientizar e engajar a população brasileira e mundial para a prática da coleta seletiva, a proposta deste projeto é criar o token Renova (RNV), um sistema que motiva cidadãos (heróis da reciclagem) a selecionarem corretamente o seu lixo e o encaminhar para centros de coleta (ecopontos) por desconto em produtos e dada por estabelecimentos comerciais (lojista) conectados a rede. Em resumo, o consumidor vai conseguir trocar um resíduo ao descartá-lo corretamente por um produto novo em uma loja participante. 

## Proposta de solução

Como incentivo ao entregar plático, papel ou alumínio ao ecoponto, é dado para o herói da reciclagem uma quantidade de tokens RNV proporcional a quantidade e o tipo do resíduo entregue e verificado pelo centro de coleta.

Com esse token, o herói poderá acessar um aplicativo no qual consegue visualizar promoções de produtos das lojas participantes da Renova.

O lojista poderá criar ofertas de seus produtos em sua plataforma gratuitamente, mas ele pode "impulsionar" a sua oferta especificando para qual região geográfica ele deseja provover seu produto, de modo que o usuário receberá a notificação daquela oferta.

Os benefícios para o comerciante em participar da Renova são criar um relacionamento com o consumidor baseado na mútua preocupação com o meio ambiente e um lead para a compra de seus produtos ou serviços.

Inicialmente o token RNV poderá ser utilizado apenas para desconto em produtos e serviços nos comércios participantes, nas quando o token tiver sua blockchain pública, ele poderá ser revertido em criptomoedas em exchanges, transferido entre usuários ou ter outras funcionalidades que a comunidade encontrar para ele.

Os principais atores do ecossistema são consumidores (heróis da reciclagem), comerciantes (lojistas) e centros de coleta e reciclagem (ecopontos).

## Economia e funcionamento da Renova

O principal objetivo da rede Renova é incentivar a destinação correta dos resíduos sólidos a atores que podem promover isso, principalmente a reciclagem. Assim, o ecoponto - um ponto de coleta de material reciclável - se registra na plataforma da Renova e está apto a começar a validar a entrega de resíduos para coleta. Quando um herói da reciclagem (um usuário) chega até o ecoponto, o ecoponto valida o tipo, a quantidade (com base em uma unidade de medida) e a recompensa em token RNV para o herói. O valor da recompensa será definido previamente pelo ecoponto e pode variar entre eles.

Enquanto não houver nenhum produto entregue para a coleta seletiva, não há tokens circulando na plataforma. Os primeiros tokens entram no sistema quando um ecoponto valida a entrega de um herói da reciclagem e encaminha para ele ou ela a quantidade de token condizente aos resíduos entregues. A emissão é feita na própria plataforma do ecoponto, que consegue visualizar a lista e buscar heróis da reciclagem e emitir para eles tokens.

Os tokens RNV que os ecopontos estão enviando para os heróis da reciclagem provém de tokens criados em uma oferta única. A oferta deve ser grande o suficiente para não faltar tokens a serem entregues para os heróis da reciclagem. Como os tokens serão retornados na rede será explicado posteriormente.  

Conforme dito, o herói da reciclagem ao entregar seu resíduo para a coleta seletiva recebe os tokens RNV. A ideia inicial de recompensa para o herói da reciclagem partiu do conceito de tornar a embalagem vazia de um produto novo e quando o produto é novamente utilizado, ele entra na cadeia com a "emissão" de novos tokens RNV. E aqueles que podem entrar na rede com novos produtos são os lojistas. A rede Renova quer atrair comerciantes preocupados com a sustentabilidade e com a destinação correta dos resíduos de seus produtos. A vantagem comercial para o lojista em participar dessa rede são leads para compra de seus produtos.

Na plataforma dos lojistas, eles poderão criar ofertas de produtos aceitando o pagamento parcialmente ou totalmente em tokens Renova. Para incentivar o uso do token RNV pelos comerciantes, eles podem impulsionar as suas ofertas que serão mostradas na página inicial do aplicativo do herói da reciclagem.

O herói da reciclagem pode visualizar as ofertas da lojas de três maneiras: na página inicial no campo melhores ofertas - que são ofertas impulsionadas - a página "Ofertas" que mostra todas as ofertas, com destaque para as impulsionadas, e dentro do perfil da loja, que mostra as ofertas daquela loja.

Quando o herói visualiza a oferta, ele tem a opção de resgatar a oferta em troca de uma determinada quantidade de token RNV e vai receber um código/cupom de desconto para o produto, que vai mostrar para o lojista quando for retirar o produto. Os tokes resgastados na oferta ficarão com o comerciante, que poderá utilizar esses tokens para impulsionar suas ofertas. Quando o lojista usar os seus tokens para impulsionar uma oferta, esses tokens são reservados para os ecopontos utilizarem para entregarem para os heróis da reciclagem quando esses vierem entregar novos materiais para a coleta seletiva. Antes de todos os tokens estiverem sido emitidos, a ideia é que o ponto de equilíbrio entre tokens entregues pela coleta de resíduos e tokens gastos em impulsionamento de ofertas varie dentro de um número coberto por essa oferta.

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
- Cadastro de resíduos
  - Tipo
  - Unidade de medida
  - Valores em RNV
- Calculadora de resíduo para RNV
  - Nome da conta
  - Tipo
  - Quantidade
  - Unidade de medida
  - Envio RNV
- Exportar carteira

### POC aplicativo do comerciante

- Saldo de token RNV
- Cadastro de ofertas [4]
  - Nome do produto
  - Código de referência (REF)
  - Preço (R$) - opcional
  - Preço (RNV)
  - Desconto (%) - opcional
  - Onde resgasta: Loja ou online
- Impulsionar oferta
- Gerenciamento de oferta
  - Ver ofertas registradas
  - Impulsionar oferta
  - Remover oferta
  - Editar oferta (não impulsionadas)

## Implementações Posteriores e Roadmap

## Referências
1. https://www.ecycle.com.br/component/content/article/38-no-mundo/1157-estimativa-revela-que-quantidade-de-lixo-produzida-no-mundo-sera-quase-70-maior-em-2030.html
1. http://edicaodobrasil.com.br/2017/11/10/cada-brasileiro-produz-387-kg-de-lixo-por-ano/
1. https://epoca.globo.com/colunas-e-blogs/blog-do-planeta/noticia/2016/06/85-dos-brasileiros-nao-tem-acesso-coleta-seletiva-mostra-estudo.html
1. https://docs.google.com/document/d/1I_vvpWdB5gHUv-tzg6x5ybj3RgIB7pvot4NM413Prlo/edit?usp=sharing
1. https://www.montgomerycountymd.gov/sws/footprint/
