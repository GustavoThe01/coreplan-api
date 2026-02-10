# CorePlan API

![Java 17](https://img.shields.io/badge/Java-17-orange) 
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green) 
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

**CorePlan** é uma API RESTful corporativa desenvolvida para gerenciamento eficiente de tarefas e equipes. Este projeto serve como uma implementação de referência para arquiteturas backend modernas utilizando o ecossistema Spring.

---

## 🚀 Sobre o Projeto

O CorePlan foi projetado para demonstrar boas práticas de engenharia de software, focando em:
- **Clean Code & SOLID:** Arquitetura limpa e desacoplada.
- **Segurança & Robustez:** Validações estritas de entrada e tratamento global de erros.
- **Escalabilidade:** Pronto para containerização e deploy em nuvem.

## 🛠️ Tech Stack & Ferramentas

*   **Linguagem:** Java 17 (Records, Pattern Matching)
*   **Framework:** Spring Boot 3.2.2
*   **Dados:** Spring Data JPA, Hibernate, H2 (Dev), PostgreSQL (Prod)
*   **Documentação:** OpenAPI 3.0 / Swagger UI
*   **Utilitários:** Lombok, Maven
*   **Design:** DTO Pattern, Service Layer, Global Exception Handling (ProblemDetail)

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas clássica e eficiente:

1.  **Controller Layer (`/controller`):** Pontos de entrada REST, validação de requisições (`@Valid`) e documentação Swagger.
2.  **Service Layer (`/service`):** Regras de negócio, transações (`@Transactional`) e lógica de domínio.
3.  **Repository Layer (`/repository`):** Abstração de persistência usando Spring Data JPA.
4.  **Domain/Model (`/domain`):** Entidades JPA mapeadas para o banco de dados.

## 🔌 Endpoints Principais

### Tarefas
*   `GET /api/v1/tasks` - Listar todas as tarefas
*   `POST /api/v1/tasks` - Criar nova tarefa
*   `PUT /api/v1/tasks/{id}` - Atualizar tarefa
*   `DELETE /api/v1/tasks/{id}` - Remover tarefa

### Usuários
*   `GET /api/v1/users` - Listar usuários
*   `POST /api/v1/users` - Cadastrar usuário
*   `DELETE /api/v1/users/{id}` - Remover usuário

## 📦 Como Rodar

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/coreplan-api.git
    ```
2.  Compile o projeto com Maven:
    ```bash
    ./mvnw clean install
    ```
3.  Execute a aplicação:
    ```bash
    java -jar target/coreplan-api-1.0.0.jar
    ```
4.  Acesse o Swagger UI:
    `http://localhost:8080/swagger-ui.html`

---
Desenvolvido como demonstração técnica de proficiência em desenvolvimento Backend Java.