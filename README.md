# clean-arch-nodejs
Projeto Exemplo do curso de Clean Architecture e Clean Code do Rodrigo Branas

## Cenário

Vamos implementar um sistema de vendas online com a possibilidade de realizar pedidos com múltiplos itens, cada um deles com uma quantidade variável, calculando o frete, os impostos, aplicando um cupom de desconto e ainda interagindo com o estoque. Além disso teremos ainda fluxos de pagamento e cancelamento do pedido realizado.

# 
Subindo container
```sh
docker-compose up -d
```

Instalando dependencias
```sh
docker exec -it node-app yarn install
```
  
Rodando Testes
```sh
docker exec -it node-app yarn test
```

Rodando Coverage
```sh
docker exec -it node-app yarn coverage
```

Entrando no container
```sh
docker exec -it node-app sh
```