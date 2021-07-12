# Imersão Fullcycle 3 - Deploy no Kubernetes
![Imersão Full Stack && Full Cycle](https://events-fullcycle.s3.amazonaws.com/events-fullcycle/static/site/img/grupo_4417.png)

## Sobre o repositório
Esse repositório contém o código do desafio 3, Deploy no Kubernetes.

Este documento possui as instruções de como rodar o projeto.

## Etapas de execução

- Na pasta `/k8s` estão os arquivos para configuração do cluster, separados em pastas de acordo com o container de cada aplicação:

```bash
# API
- k8s/api
  - deployment.yml
  - service.yml

# FRONTEND
- k8s/frontend
  - configmap.yml
  - deployment.yml
  - service.yml
```

- Para configuração do cluster, os seguintes comandos devem ser utilizados:

```bash
# API
cd k8s/api
kubectl apply -f deployment.yml
kubectl apply -f service.yml

# FRONTEND
cd ../frontend
kubectl apply -f configmap.yml
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```
-> PS: Deve ter instalado e configurado o `docker`, o `kind`, o `kubectl` e o repositório `helm`, também ter instalado com o helm o `bitnami/postgresql` e possuir um cluster configurado com kind.

-> PS2: Dentro das pastas `/api/.docker` e `/frontend/.docker` existem os arquivos `entrypoint.prod.sh` que devem possuir permissão de execução no bash.