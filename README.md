# Desafio Wishlist

Serviço para gerenciamento da lista de produtos favoritos dos clientes.

## Instalação e Execução

```
npm install
```

Para execução do serviço em ambiente de desenvolvimento:

```
npm run dev
```
Para execução do serviço em ambiente de produção:
```
npm run build
npm run prod
```
Para execução dos testes unitários:

```
npm run test
```

Para visualizar a documentação em Swagger, acesse a rota `/api-docs`

## Variáveis de ambiente

O arquivo .env deve ser criado de acordo com o exemplo em .env.example. Modifique-o de acordo com o ambiente onde será executado o serviço.

O arquivo `docker-compose.yml` pode ser utilizado para execução do MongoDB e Redis.
