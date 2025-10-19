# 🥐 Boulangerie Microservices

## 🍞 Description du projet

**Boulangerie** est une application web basée sur une **architecture microservices**.  
Elle permet de gérer les **utilisateurs** et leurs **commandes** à travers deux services Spring Boot, un frontend Angular, et des bases de données **RDS MySQL** distinctes.  
Le tout est déployé via **terraform** sur **AWS (EKS)**.

---

## 🧱 Architecture du projet

```text
┌─────────────────────────────┐
│         Utilisateur         │
└──────────────┬──────────────┘
               │ (HTTP)
               ▼
       ┌────────────────────┐
       │  Frontend Angular  │
       │  (port 4200 / 80)  │
       └────────┬───────────┘
                │ REST API
                ▼
┌──────────────────────────────────────────┐
│        Ingress / Load Balancer (EKS)     │
│ Routes /api/users → user-service         │
│ Routes /api/orders → order-service       │
└────────┬──────────────────────┬──────────┘
         │                      │
         ▼                      ▼
┌──────────────────┐     ┌──────────────────┐
│  user-service    │     │  order-service   │
│  Spring Boot 8082│     │  Spring Boot 8081│
└────────┬─────────┘     └────────┬─────────┘
         │                        │
         ▼                        ▼
┌──────────────────┐     ┌──────────────────┐
│ MySQL userdb     │     │ MySQL orderdb    │
│ port 3307        │     │ port 3308        │
└──────────────────┘     └──────────────────┘



---

## ⚙️ Technologies utilisées

| Couche | Technologies |
|--------|---------------|
| Frontend | Angular, TypeScript, HTML, CSS |
| Backend | Java 21, Spring Boot, Spring Data JPA |
| Base de données | MySQL 8 |
| Infrastructure | Docker, Kubernetes (EKS), AWS |
| Sécurité | Kubernetes Secrets |
| CI/CD | GitHub Actions |

---

## 👨‍💻 Auteur

**Malik DUPUIS**  
🚗 Expert Devops passionné par la tech et le développement logiciel.  
💻 Créateur du projet *Boulangerie Microservices*, une architecture complète basée sur **Spring Boot**, **Angular** et **Kubernetes (EKS)**.  
📍 Basé en France  

---
