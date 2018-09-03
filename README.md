# Desafio EOS Rio Hackathon 2018 - Bluchain

## Tema
Aplicação descentralizada de gestão de uso da malha viária pela cobrança de uso da via.

Como caso de estudo, será considerada a implantação no centro expandido da cidade de São Paulo, Brasil.

Mapa do centro expandido: https://www.google.com/maps/d/viewer?mid=1Xg6ACUNSiuS0IOr7p7t9c6IvLx4&msa=0&ll=-23.568949674056366%2C-46.660593500000004&z=13

## Descrição do projeto

### Descrição do problema
Uma das principais causas dos congestionamentos em grandes centros urbanos é o uso intensivo da malha viária, em que muitos veículos estão competindo pelo uso de um recurso limitado no mesmo intervalo de tempo.

O congestionamento tem vários impactos negativos, como a redução da produtividade do transporte, o aumento da poluição do ar e o aumento da morosidade do trânsito de pessoas. Economicamente, a crise de mobilidade em São Paulo custa por ano mais de R$ 40 bilhões, valor equivalente a 1% do PIB brasileiro e 7,5% do PIB paulistano. Reduzir esse desperdício é um desafio da gestão pública [1].

Nos horários de pico na capital paulista, em média, o tempo das viagens de automóvel é 69% maior entre as 7 e as 10 horas e entre as 17 e as 20 horas [2]. 

### Estudo sobre o problema
Dada a gravidade do problema, muitas são as propostas de solução:
- Ampliar ciclovias;
- Dsenvolver hidrovias como meio de transporte;
- Implantar pedágio urbano;
- Criar corredores que integrem diferentes modais;
- Implementar sistema de rodízio;
- Incentivar as caronas;
- Cobrar pelo uso da via.

### Proposta de solução - Cobrança de uso da via e incentivo a carona
Nossa proposta de solução é implementação de gestão da capacidade de uso de vias em função de sua demanda de uso no lugar do rodízio. 

Implica o uso de uma chain (infra propria)

Applicação que permite o uso de tokens para pleitear o uso do espaço da via
contratos em bc que controlam o uso dos tokens
contratos que define os custos de transição na via 
sistema de fiscalização que seria implentado no atual sistema de gestão de rodízio (câmeras)

#### Token
airdrop periodicos
gastar e queimar
não pode depender de um sistema da prefeitura
qual o incentivo para o cara sair?


## Descrição do protótipo

tokens compram tickets de acesso
(refinar regras de negócio)

back end
- Limitar/ gerir a capacidade do recurso
- contrato que mantem um saldo dentro de limites (capacidade de absorver o transito)
- contrato que o supply
- função (gráfico) de custo de alocação de tokens pela porcentagem de uso da via - preço dinâmico do ticket
- contratos de gestão de identidade (veiculo e motorista)
- acesso ao cadastro de veiculo (gestão de identidade)

apresentar no app
- custo do ticket
- projeção do custo no dia
- compra do ticket que vai permitir o acesso com o token
- transferir para outras pessoas tokens
- saldo da conta
- historico de uso
- cadastro de motorista na bc
- lista meus veiculos

infra
rodar a nossa chain (pelo menos 2 nos?)

o que precisa ser feito
- regras de criação de token (modo de distribuição, modo de alocação para usuário, supply)
- fluxo de cadastro de usuários
- fluxo cadastro de veiculos
- regras de negocio do cadastro de usuários (motoristas, proprieitarios de veiculos, cidadão habilitados...)
- regras de negócio do cadastro de veiculos (particular)
- modelagem do custo do ticket

### Referência
1) https://www.google.com/url?q=https://bibliotecadigital.fgv.br/dspace/bitstream/handle/10438/11576/TD%2520356%2520-%2520Marcos%2520Cintra.pdf&sa=D&source=hangouts&ust=1536081795857000&usg=AFQjCNEUSWDePqrUIY9QqaN16I_ybygeOg
2) https://exame.abril.com.br/brasil/em-horarios-de-pico-tempo-que-paulistanos-ficam-no-transito-e-69-maior/
