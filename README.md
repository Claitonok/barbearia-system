# 💈 Barber Manager - Sistema de Gestão de Barbearia

Sistema Full-Stack de agendamentos e gestão para barbearias, focado em alta performance, segurança e experiência do usuário. O projeto utiliza uma arquitetura moderna com Front-end em **Next.js** e um ecossistema Back-end robusto em **Spring Boot**.

## 🚀 Tecnologias Principais

### Front-end
*   **Next.js 14+**: Renderização híbrida (SSR/Client Components) e roteamento avançado.
*   **Tailwind CSS**: Estilização "Premium Dark" personalizada.
*   **Middleware**: Controle de acesso e proteção de rotas privadas.
*   **Sonner**: Feedback visual de notificações e promessas (toasts).
*   **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.

### Back-end (API Rest)
*   **Java 17 & Spring Boot**: Core da aplicação.
*   **Spring Data JPA**: Abstração de banco de dados e persistência.
*   **Spring Security & JWT**: Autenticação stateless e controle de permissões por **Roles**.
*   **RabbitMQ**: Mensageria assíncrona para fluxos críticos.
*   **Docker**: Conteinerização da API e serviços de infraestrutura (RabbitMQ).
*   **JUnit**: Testes unitários para garantir a estabilidade do código.
*   **Lombok**: Produtividade na escrita de modelos e DTOs.

---

## 🛠️ Arquitetura e Funcionalidades

### 📧 Fluxo de Recuperação de Senha com RabbitMQ
Para garantir que o envio de e-mails de recuperação não trave a aplicação e seja resiliente a falhas, implementamos o **RabbitMQ**:
1.  **Solicitação**: O usuário solicita o código de 6 dígitos.
2.  **Produtor**: A API gera o código e envia os dados para uma **Exchange** no RabbitMQ.
3.  **Fila (Queue)**: A mensagem aguarda em uma fila persistente.
4.  **Consumidor**: Um serviço dedicado consome essa fila e realiza o disparo via SMTP.
    *   *Vantagem*: Caso o servidor de e-mail fique instável, a requisição não retorna erro para o usuário; ela permanece na fila para reprocessamento automático.

### 🔐 Segurança e Autenticação
*   **JWT (JSON Web Token)**: Implementado para manter a sessão do usuário segura e leve.
*   **CORS Config**: Configuração granular para permitir apenas que o domínio do Front-end Next.js consuma os recursos da API.
*   **Role-Based Access Control (RBAC)**: Diferenciação de acessos entre `ROLE_ADMIN` (gestão) e usuários comuns.
*   **Middleware Next.js**: No front-end, o middleware intercepta as requisições para verificar a presença do token antes de renderizar páginas sensíveis.

### 🏗️ Padronização e Erros
*   **DTOs (Data Transfer Objects)**: Utilizados para desacoplar a camada de persistência da camada de apresentação, melhorando a segurança e a performance.
*   **Global Exception Handler**: Tratamento centralizado de erros utilizando `MyRuntimeException`. Isso garante que a API retorne mensagens claras e padronizadas, facilitando o debug e a experiência do usuário final.

---

## 🐳 Como Executar o Projeto

1.  **Pré-requisitos**: Ter o Docker e Docker Compose instalados.
2.  **Subir Infraestrutura**:
    ```bash
    # Na raiz do projeto back-end
    docker-compose up -d

---

# Na pasta do projeto Next.js

* npm install
* npm run dev

---

## 📅 Funcionalidades do Sistema
- [x] Agendamento inteligente com validação de horário de funcionamento.
- [x] Painel Administrativo para controle de serviços.
- [x] Login seguro com JWT.
- [x] Recuperação de senha via Token de 6 dígitos (E-mail assíncrono).
- [x] Interface Responsiva e adaptada para dispositivos móveis.

---

* Desenvolvido com foco em escalabilidade por **Nexora Systems**.