# nodejs-start
Projeto base com NodeJs + TypeScript + Jest + Docker


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