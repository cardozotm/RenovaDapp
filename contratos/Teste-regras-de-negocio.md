# Teste Regras de Negócio

## Todos os usuários

### Criação de conta

**Caso #1**

Alice quer se cadastrar como herói da reciclagem e no formulário de cadastro insere os seguintes dados:
- Herói da reciclagem (tipo da conta)
- aliceedwards (nome da conta)
- Alice Edwards (Nome)
- 46665843076 (CPF)
- 74455362 (CEP)
- 388 (Número da casa)

E clica no botão criar conta

Resultado esperado: Ao entrar com o CEP, Alice recebe as informações de endereço dela, restando apenas preencher o número de sua casa. Depois de todos os dados preenchidos, o cadastro é executado com sucesso e ela tem as chaves da conta recebidas com sucesso.

**Caso #2**

Alice quer se cadastrar como herói da reciclagem e no formulário de cadastro insere os seguintes dados:
- Herói da reciclagem (tipo da conta)
- alice99* (nome da conta)
- Alice Edwards (Nome)
- 15686308801 (CPF)
- 58090563 (CEP)
- 388 (Número da casa)

E clica no botão criar conta

Resultado esperado: Ao entrar com o CEP, o formulário não é automaticamente preenchido pois o CEP não existe. Mesmo corrigindo, Alice não consegue criar conta pois o nome da conta tem menos de 12 caracteres e contém números que não estão de 1-5 e caracteres especiais.

**Caso #3**

Bruno quer se cadastrar como lojista e no formulário de cadastro insere os seguintes dados:
- Lojista (tipo da conta)
- lojadobrunao (nome da conta)
- Loja do Brunão (Nome fantasia)
- 04337710000162 (CNPJ)
- 78090852 (CEP)
- 388 (Número da loja)

Resultado esperado: Ao entrar com o CEP, Bruno recebe as informações de endereço de sua loja, restando apenas preencher o número dela. Depois de todos os dados preenchidos, o cadastro é executado com sucesso e ele tem as chaves da conta recebidas com sucesso.

**Caso #4**

Carlos quer se cadastrar como centro de coleta e no formulário de cadastro insere os seguintes dados:
- Ecoponto (tipo da conta)
- reciclagem11 (nome da conta)
- Cooperativa de Reciclagem do Carlos (Nome fantasia)
- 69735214000102 (CNPJ)
- 57084818 (CEP)
- 388 (Número da loja)

Resultado esperado: Ao entrar com o CEP, Carlos recebe as informações de endereço de sua loja, restando apenas preencher o número dela. Depois de todos os dados preenchidos, o cadastro é executado com sucesso e ele tem as chaves da conta recebidas com sucesso.

### Editar dados

**Caso #1**

Alice desejar editar os seus dados de cadastro na página de perfil. Ela edita as informações:
- Alice Simmons (Nome Completo)
- 15686308800 (CPF)
- 29151845 (CEP)
- 378 (Número da casa)

Resultado Esperado: Alice consegue editar com sucesso seus dados.

**Caso #2**

Alice desejar editar os seus dados de cadastro na página de perfil. Ela edita as informações:
- Alice Simmons (Nome Completo)
- 15686308800 (CPF)
- 29151843 (CEP)
- 378 (Número da casa)

Resultado Esperado: Alice consegue não consegue salvar os novos dados pois o CEP informado não existe.

## Ecoponto

### Cadastro de material

**Caso #1**

Carlos quer cadastrar o recebimento de resíduos na plataforma como ecoponto e insere no formulário os dados:
- Plástico (tipo de resíduo)
- Plástico PE (Descrição)
- Kg (unidade de medida)
- 10 (Recompensa em RNV)

OBS: As opções de tipos de resíduo são plástico, papel e alumínio e de unidades de medida são kg ou unidade.

Resultado Esperado: Carlos consegue cadastrar com sucesso o material.

**Caso #2**

Carlos quer cadastrar o recebimento de resíduos na plataforma como ecoponto e insere no formulário os dados:
- Plástico (tipo de resíduo)
- Plástico PE (Descrição)
- Kg (unidade de medida)
- asdf (Recompensa em RNV)

Resultado Esperado: Carlos não consegue cadastrar o material pois o campo de recompensa não aceita caracteres, apenas números.

### Remover Material

**Caso #1**

Carlos quer remover o recebimento de plástico PE
- nº de ID Plástico PE (#ID do material)
- Remover oferta: Verdadeiro

Resultado esperado: Carlos consegue remover o recebimento de plástico PE

### Editar Material

**Caso #1**

Carlos quer atualizar os dados do material plástico PE. Ele edita as informações:
- Plástico (tipo de resíduo)
- Plástico PE - Branco (Descrição)
- Unidade (unidade de medida)
- 30 (Recompensa em RNV)

Resultado Esperado: Carlos consegue consegue editar com sucesso os dados do material.

### Entrega recompensa RNV

**Caso #1**

Carlos recebeu de Alice 5 kg de plástico PE e quer dar para ela 50 RNV de recompensa. No formulário de envio, ele coloca as informações:
- Plástico (tipo de resíduo)
- Plástico PE (Descrição)
- 5,0 (Quantidade)
- aliceedwards (Nome da conta)

Resultado Esperado: Carlos consegue finalizar a transação e Alice recebe 50 RNV em sua carteira.

**Caso #2**

Carlos recebeu de Alice 5 kg de plástico PE e quer dar para ela 50 RNV de recompensa. No formulário de envio, ele coloca as informações:
- Plástico (tipo de resíduo)
- Plástico PP (Descrição)
- 5,0 (Quantidade)
- alicedwards (Nome da conta)

Resultado Esperado: Carlos não consegue enviar os tokens para Alice pois ele não encontra a opção de plástico PP e o nome da conta de Alice está errado.

## Lojista

### Adicionar e impulsionar oferta

**Caso #1**

Bruno quer adicionar uma oferta para sua loja e preencheu no formulário de cadastro as informações:
- Coca-cola 2L (Nome do produto)
- 12345A (Código de referência)
- 6,0 (Preço em R$)
- 50 (Preço em RNV)
- 50 (Desconto em %)
- Coca-cola de 2 litros garrafa (Descrição)
Impulsionar: Falso

Resultado esperado: Bruno consegue criar uma oferta de 50% de desconto pela sua Coca-cola 2L por 50 RNV, de modo que na loja o usuário terá que pagar R$ 3,00 em vez de R$ 6,00. Bruno não precisa pagar para criar a oferta pois ele optou por não impulsioná-la.

**Caso #2**

Bruno quer adicionar e impulsionar uma oferta para sua loja e preencheu no formulário de cadastro as informações:
- Coca-cola 2L (Nome do produto)
- 12345A (Código de referência)
- 6,0 (Preço em R$)
- 50 (Preço em RNV)
- 50 (Desconto em %)
- Coca-cola de 2 litros garrafa (Descrição)
- Impulsionar: Verdadeiro
- Pagar com RNV: Verdadeiro

Resultado esperado: Bruno consegue criar uma oferta de 50% de desconto pela sua Coca-cola 2L por 50 RNV, de modo que na loja o usuário terá que pagar R$ 3,00 em vez de R$ 6,00. Por ele ter optado impulsionar a oferta, ele precisa pagar uma determinada quantidade de RNV para ela ser vistas com destaque no aplicativo do usuário. Como Bruno tem quantidade suficiente de RNV para pagar pelo impulsionamento, a ação é executada e sua oferta aparece como melhor oferta para os usuários.

**Caso #3**

Bruno quer adicionar e impulsionar uma oferta para sua loja e preencheu no formulário de cadastro as informações:
- Coca-cola 2L (Nome do produto)
- 12345A (Código de referência)
- 6,0 (Preço em R$)
- 50 (Preço em RNV)
- 50 (Desconto em %)
- Impulsionar: Verdadeiro
- Pagar com RNV: Falso

Resultado esperado: Bruno não consegue criar uma oferta pois optou por impulsionar a oferta, mas ele não tinha quantidade suficiente de RNV para pagar pelo impulsionamento.Coca-cola de 2 litros garrafa
Impulsionar: Verdadeiro

**Caso #4**

Bruno quer adicionar uma oferta para sua loja e preencheu no formulário de cadastro as informações:
- Coca-cola 2L (Nome do produto)
- 12345A (Código de referência)
- 6,0 (Preço em R$)
- 50 (Preço em RNV)
- 110 (Desconto em %)
- Impulsionar: Falso

Resultado esperado: Bruno não consegue criar uma oferta pois o desconto é maior que 100%.

### Remover oferta

**Caso #1**

Bruno quer remover uma oferta de Coca-cola 2L
- Nº de ID Coca-cola 2L (#ID da oferta)
- Remover oferta: Verdadeiro

Resultado esperado: Bruno consegue remover a oferta

### Editar oferta

**Caso #1**

Bruno quer passar a impulsionar a oferta de Coca-cola 2L. Ele edita as informações:
- Coca-cola 2L (Nome do produto)
- Impulsionar: Verdadeiro
- Pagar com RNV: Verdadeiro

Resultado esperado: Bruno tem tokens RNV suficiente e consegue impulsionar a oferta.

**Caso #2**

Bruno quer editar os dados da oferta de Coca-cola 2L que não foi impulsionada e que não foi resgata por ninguém. Ele edita as informações:
- Coca-cola 2,5L (Nome do produto)
- 12346B (Código de referência)
- 7,0 (Preço em R$)
- 70 (Preço em RNV)
- 40 (Desconto em %)
- Coca-cola de 2,5 litros garrafa  (Descrição)
- Impulsionar: Falso

Resultado esperado: Bruno consegue editar com sucesso.

**Caso #3**

Bruno quer editar os dados da oferta de Coca-cola 2L que foi impulsionada. Ele edita as informações:
- Coca-cola 2,5L (Nome do produto)
- 12346B (Código de referência)
- 7,0 (Preço em R$)
- 70 (Preço em RNV)
- 40 (Desconto em %)
- Coca-cola de 2,5 litros garrafa

Resultado esperado: Bruno não consegue editar a oferta.

**Caso #4**

Bruno quer editar os dados da oferta de Coca-cola 2L que foi resgata por Alice. Ele edita as informações:
- Coca-cola 2,5L (Nome do produto)
- 12346B (Código de referência)
- 7,0 (Preço em R$)
- 70 (Preço em RNV)
- 40 (Desconto em %)
- Coca-cola de 2,5 litros garrafa
- Impulsionar: Falso

Resultado esperado: Bruno não consegue editar a oferta.

### Resgatar cupom

**Caso #1**

Alice vai até a Loja do Brunão para resgatar a oferta de 50% de desconto na Coca-cola de 2L. 
- ID do código do cupom
- Resgate cupom: Verdadeiro

Resultado esperado: Bruno consegue resgatar o cupom de Alice e cobra 50% do preço pela sua Coca-cola 2L.

**Caso #2**

Alice vai até a Loja do Brunão para resgatar a oferta de 100% de desconto na Coca-cola de 2L. 
- ID do código do cupom
- Resgate cupom: Falso

Resultado esperado: Bruno não consegue recuperar o cupom de Alice pois a oferta do cupom não existe.

## Herói da reciclagem

### Resgatar ofertas

**Caso #1**

Alice quer usar os seus tokens RNV para resgatar uma oferta da loja do Brunão, pois ela viu a promoção de 50% de desconto pela Coca-cola 2L por 50 RNV. Alice tem 100 RNV em sua carteira. Ela acessa a página de descrição do produto e clica em resgatar oferta.
- Nº do ID da oferta Coca-cola 2L
- Resgatar oferta: Verdadeiro

Resultado esperado: Por possuir um saldo maior que 50 RNV, Alice consegue resgatar a oferta e recebe um cupom com as informações do desconto da oferta da Coca-cola de 2L.

**Caso #2**

Alice quer usar os seus tokens RNV para resgatar uma oferta da loja do Brunão, pois ela viu a promoção de 50% de desconto pela Coca-cola 2L por 50 RNV. Alice tem 40 RNV em sua carteira. Ela acessa a página de descrição do produto e clica em resgatar oferta.
- Nº do ID da oferta Coca-cola 2L
- Resgatar oferta: Falso

Resultado esperado: Por possuir um saldo menor que 50 RNV, Alice não consegue resgatar a oferta.
