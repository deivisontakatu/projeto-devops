# Projeto DevOps — Construindo do Zero

## Objetivo da Atividade

Este projeto tem como objetivo demonstrar práticas fundamentais de DevOps utilizando:

- Node.js
- Docker
- Kubernetes
- Terraform

Ao final da atividade, o aluno será capaz de:

- Criar uma aplicação Node.js simples
- Containerizar a aplicação com Docker
- Executar containers
- Realizar deploy em Kubernetes
- Provisionar infraestrutura com Terraform
- Compreender conceitos básicos de automação e CI/CD

---

# Visão Geral do Projeto

A aplicação será um servidor HTTP simples que responderá:

```text
Hello DevOps
```

na porta `3000`.

O foco principal da atividade é aprender:

- automação
- containerização
- orquestração
- infraestrutura como código

---

# Pré-requisitos

Antes de iniciar, o ambiente deve possuir:

- Node.js instalado
- Docker instalado
- kubectl configurado
- Terraform instalado
- Cluster Kubernetes disponível
- Conta em provedor de nuvem configurada (opcional)

---

# ETAPA 1 — Criar a Pasta do Projeto

## Objetivo

Criar a estrutura inicial do projeto.

## Comandos

```bash
mkdir projeto-devops
cd projeto-devops
```

## O que acontece?

- Uma nova pasta chamada `projeto-devops` será criada
- O terminal passará a operar dentro dela

---

# ETAPA 2 — Inicializar Projeto Node.js

## Objetivo

Criar o arquivo `package.json`.

## Comando

```bash
npm init -y
```

## O que acontece?

O Node.js cria automaticamente:

```text
package.json
```

Esse arquivo será responsável por:

- identificar o projeto
- armazenar dependências
- definir scripts de execução

---

# ETAPA 3 — Criar o Arquivo da Aplicação

## Objetivo

Criar o servidor HTTP da aplicação.

## Comando

```bash
touch index.js
```

---

# ETAPA 4 — Implementar a Aplicação

## Objetivo

Adicionar o código do servidor Node.js.

## Conteúdo do arquivo `index.js`

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello DevOps');
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
```

---

# ETAPA 5 — Executar a Aplicação

## Objetivo

Validar se a aplicação funciona localmente.

## Comando

```bash
node index.js
```

## Resultado esperado

O terminal deverá exibir:

```text
Servidor rodando na porta 3000
```

---

# ETAPA 6 — Testar a Aplicação

## Verificação

Abra o navegador e acesse:

```text
localhost:3000
```

## Resultado esperado

A aplicação deverá responder:

```text
Hello DevOps
```

---

# ETAPA 7 — Criar o Dockerfile

## Objetivo

Definir como a imagem Docker será criada.

## Comando

```bash
touch Dockerfile
```

---

# ETAPA 8 — Configurar o Dockerfile

## Conteúdo do arquivo `Dockerfile`

```dockerfile
FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

---

# ETAPA 9 — Entender o Dockerfile

## Explicação das instruções

| Instrução | Função |
|---|---|
| FROM | Define imagem base |
| WORKDIR | Define diretório interno |
| COPY | Copia arquivos |
| RUN | Executa comandos |
| EXPOSE | Expõe porta |
| CMD | Comando inicial |

---

# ETAPA 10 — Criar a Imagem Docker

## Objetivo

Gerar uma imagem da aplicação.

## Comando

```bash
docker build -t devops-app .
```

## O que acontece?

O Docker:

1. lê o Dockerfile
2. cria a imagem
3. empacota a aplicação

---

# ETAPA 11 — Verificar Imagens Docker

## Comando

```bash
docker images
```

## Objetivo

Confirmar se a imagem foi criada corretamente.

---

# ETAPA 12 — Executar o Container

## Objetivo

Executar a aplicação dentro de um container.

## Comando

```bash
docker run -p 3000:3000 devops-app
```

---

# ETAPA 13 — Validar o Container

## Verificação

Acesse novamente:

```text
localhost:3000
```

## Resultado esperado

A aplicação deverá responder normalmente.

---

# ETAPA 14 — Verificar Containers Ativos

## Comando

```bash
docker ps
```

## Objetivo

Visualizar containers em execução.

---

# ETAPA 15 — Criar o Arquivo Kubernetes

## Objetivo

Definir o deployment da aplicação.

## Comando

```bash
touch deployment.yaml
```

---

# ETAPA 16 — Configurar o Deployment

## Conteúdo do arquivo `deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: devops-app

spec:
  replicas: 1

  selector:
    matchLabels:
      app: devops-app

  template:
    metadata:
      labels:
        app: devops-app

    spec:
      containers:
      - name: devops-app
        image: devops-app
        imagePullPolicy: Never

        ports:
        - containerPort: 3000
```

---

# ETAPA 17 — Aplicar o Deployment

## Comando

```bash
kubectl apply -f deployment.yaml
```

## O que acontece?

O Kubernetes:

- cria os pods
- executa os containers
- gerencia o estado da aplicação

---

# ETAPA 18 — Verificar Pods

## Comando

```bash
kubectl get pods
```

## Resultado esperado

Os pods deverão aparecer com status:

```text
Running
```

---

# ETAPA 19 — Verificar Deployments

## Comando

```bash
kubectl get deployments
```

## Objetivo

Validar:

- número de réplicas
- disponibilidade
- status do deployment

---

# ETAPA 20 — Expor a Aplicação

## Objetivo

Permitir acesso à aplicação Kubernetes.

## Comando

```bash
kubectl port-forward deployment/devops-app 3000:3000
```

---

# ETAPA 21 — Testar Aplicação no Kubernetes

## Verificação

Acesse:

```text
localhost:3000
```

## Resultado esperado

A aplicação deverá responder normalmente.

---

# ETAPA 22 — Criar Arquivo Terraform

## Objetivo

Definir infraestrutura como código.

## Comando

```bash
touch main.tf
```

---

# ETAPA 23 — Configurar Terraform

## Conteúdo do arquivo `main.tf`

```terraform
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "devops_server" {
  ami           = "ami-xxxxxxxx"
  instance_type = "t2.micro"
}
```

---

# ETAPA 24 — Inicializar Terraform

## Comando

```bash
terraform init
```

## O que acontece?

O Terraform:

- baixa providers
- prepara o ambiente
- inicializa o projeto

---

# ETAPA 25 — Validar Infraestrutura

## Comando

```bash
terraform plan
```

## Objetivo

Visualizar:

- recursos que serão criados
- alterações previstas

---

# ETAPA 26 — Criar Infraestrutura

## Comando

```bash
terraform apply
```

## O que acontece?

O Terraform:

1. lê o arquivo `main.tf`
2. conecta ao provedor
3. provisiona os recursos

---

# ETAPA 27 — Remover Infraestrutura

## Objetivo

Evitar custos desnecessários.

## Comando

```bash
terraform destroy
```

---

# Conceitos DevOps Aplicados

| Conceito | Aplicação |
|---|---|
| Automação | Docker, Kubernetes e Terraform |
| Infraestrutura como código | Terraform |
| Containerização | Docker |
| Orquestração | Kubernetes |
| Escalabilidade | Kubernetes |
| Padronização | Containers reproduzíveis |

---

# Melhorias Futuras

Os alunos podem evoluir o projeto adicionando:

- testes automatizados
- pipelines CI/CD
- monitoramento
- logs centralizados
- banco de dados
- deploy automatizado

---

# Resultado Esperado

Ao concluir a atividade, o aluno terá experiência prática com:

- criação de aplicações Node.js
- Docker
- Kubernetes
- Terraform
- automação de infraestrutura
- conceitos fundamentais de DevOps