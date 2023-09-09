# Para testar o projeto
- Inicialmente depois de clonar o repositório do git, tem que ser dado um "cd frontend" para entrar na pasta do front e assim rodar o comando "npm install", a fim de baixar todas as dependências do frontend

- Depois disso, é preciso dar um "cd .." para voltar um caminho, e da;i de novo damos um "cd backend"ser dado um  "cd backend" seguido de um "npm install" para instalar todas as dependências agora do backend

- Agora, ainda na pasta do backend, é preciso criar um arquivo chamado ".env" para armazenar as variáveis secretas do projeto, que terão a seguinte configuração:
```
    PORT=3333 #porta da aplicação
    MY_SQL_HOST=localhost #host da máquina local
    MY_SQL_USER=root #usuário padrão da máquina
    MY_SQL_PASS= #senha do ambiente mysql localmente(lembrar de editar)
    MY_SQL_DATABASE=shopper_app #nome do banco que será mais à frente criado localmente
```

# Instalando e configurando o MySQL localmente
- Instalar o MySQL através do link: https://dev.mysql.com/downloads/installer/
- Inicializar o servidor MySQL através do comando "mysql.server start"
- Conectar-se ao MySQL através do comando "mysql -u root -p" e inserir a senha do usuário que foi criada no passo 1
OBS: Possíveis erros nessa etapa até então podem ser solucionadas com esse vídeo: https://www.youtube.com/watch?v=8UT-oZzDW6c
- CREATE DATABASE shopper_app; (veja que é o nome do banco configurado anteriormente no arquivo .env do backend)
- Lembrar de depois desses passos voltar no .env da pasta backend para colocar a senha que configurada nos passos acima como resultado da variável MY_SQL_PASS
- Depois disso, ainda no terminal do mySQL, devemos rodar o comando USE shopper_app; (isso para entrarmos no banco de dados que criamos anteriormente)
- Agora finalmente vamos rodar os comandos para criar as tabelas do banco de dados e também para popular estas.
- Para criar a tabela products, vamos rodar no terminal o comando abaixo:
```
CREATE TABLE products 
( 
	code bigint PRIMARY KEY, # CODIGO DO PRODUTO 
	name varchar(100) NOT NULL, # NOME DO PRODUTO
	cost_price decimal(9,2) NOT NULL, # CUSTO DO PRODUTO
	sales_price decimal(9,2) NOT NULL # PRE�O DE VENDA DO PRODUTO
);

```

- Para a packs, vamos rodar no terminal o comando abaixo:
```
CREATE TABLE packs 
(
  id bigint AUTO_INCREMENT PRIMARY KEY, # id primario da tabela
  pack_id bigint NOT NULL,  # id do produto pack 
  product_id bigint NOT NULL, # id do produto componente
  qty bigint NOT NULL, # quantidade do produto componente no pack
  CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
  CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
);
```
- Depois para popular a tabela products, rodamos:
```
INSERT INTO products VALUES (16,'AZEITE  PORTUGU�S  EXTRA VIRGEM GALLO 500ML',18.44,20.49);
INSERT INTO products VALUES (18,'BEBIDA ENERG�TICA VIBE 2L',8.09,8.99);
INSERT INTO products VALUES (19,'ENERG�TICO  RED BULL ENERGY DRINK 250ML',6.56,7.29);
INSERT INTO products VALUES (20,'ENERG�TICO RED BULL ENERGY DRINK 355ML',9.71,10.79);
INSERT INTO products VALUES (21,'BEBIDA ENERG�TICA RED BULL RED EDITION 250ML',10.71,11.71);
INSERT INTO products VALUES (22,'ENERG�TICO  RED BULL ENERGY DRINK SEM A��CAR 250ML',6.74,7.49);
INSERT INTO products VALUES (23,'�GUA MINERAL BONAFONT SEM G�S 1,5L',2.15,2.39);
INSERT INTO products VALUES (24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99);
INSERT INTO products VALUES (26,'ROLO DE PAPEL ALUM�NIO WYDA 30CMX7,5M',5.21,5.79);
INSERT INTO products VALUES (1000,'BEBIDA ENERG�TICA VIBE 2L - 6 UNIDADES',48.54,53.94);
INSERT INTO products VALUES (1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78);
INSERT INTO products VALUES (1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00);
```

- E por fim, rodamos o comando para popular a tabela packs:
```
INSERT INTO packs (pack_id,prodPct_id, qty) VALUES (1000,18,6);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,24,1);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,26,1);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,19,3);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,21,3);
```
- Por fim, basta rodar o backend e o frontend. Para este primeiro, basta na raiz do projeto, entrar na pasta backend (através do comando "cd backend", e assim rodar o comando "npm run dev". Depois disso, com em um outro terminal pois temos que deixar o terminal do backend rodando, damos o comando "cd frontend" para entrar na pasta do frontend, e assim rodar o comando "npm start" para rodar a aplicação)
- A aplicação irá aparecer no navegador e estará pronta para uso.

# Observações
- Vale lembrar que esses são comandos que foram fornecidos dentro do arquivo .sql
- Acabou que para mim não ficou tão claro o que seria a tabela packs, umas vez que achei que de fato seria a tabela da entidade pacotes do sistema. Porém, entendi depois que ela era a tabela de relacionamento entre as entidades pacote-produto uma vez que a relação entre ambos é 'n' para 'n'. Por isso que a maior parte relacionada à entidade de pacotes, acabou que não consegui finalizar, visto que fui notar isso muito tarde, e fiquei receoso de alterar a definição das tabelas que foi fornecida pelo arquivo .sql,. Sendo assim, optei por entregar o que já tinha sido feito e já estava dando certo.
- Imagino que a falta de clareza quanto ao nomes das tabelas acabou gerando um certo retrabalho na hora de desenvolver os models(schemas) das entidades do pequeno sistema.