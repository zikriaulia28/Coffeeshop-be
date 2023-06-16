<div align='center'>

<img src="./public//icon-coffee.svg" alt="Logo" width="80" height="80">

<br/>
<br/>

[![Tech Stack](https://skillicons.dev/icons?i=nodejs,express,mongodb,postgres,vercel,firebase)](#tech-stack)

<h2>Coffee Shop.</h2>
<h3 align="center">Rest API for Coffee app!</h3>

[Demo](https://webcoffee-api.vercel.app/) · [Related Projects](#related-projects)

</div>

## Table of Contents

- [About Project](#about-Project) -[Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Route](#route)
- [Postman Documentation](#postman-documentation)
- [License](#license)
- [Report Bug](#report-bug)
- [Contributor](#contributor)

## About Project

"A coffee shop's backend server implementation, built with the Express framework, is a REST API that offers a reliable and scalable solution for handling different aspects of the coffee shop's operations. These operations include managing menu items, orders, customer details, and more.

The REST API adheres to the principles of Representational State Transfer (REST), enabling seamless integration with diverse clients, such as web and mobile applications. It leverages the HTTP protocol to facilitate communication, enabling clients to perform various operations like retrieving, creating, updating, and deleting resources."

### Features

- Authorization & Authentication
- Upload Images
- CRUD (Products, User, Transactions, Promo)
- Whitelisting JWT
- Remote Notification to Android & iOS App
- Error Handling & Validation

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (for storing data)
- [MongoDB](https://www.mongodb.com/) (for storing token whitelist)
- [Cloudinary](https://cloudinary.com/) (for storing images)
- [JSON Web Token](https://jwt.io/) (authorization)
- [Vercel](https://vercel.com/) (for deploying)
- [Firebase Admin](https://github.com/firebase/firebase-admin-node) (for sending remote notification)
- and other packages (you can see in package.json)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Firebase Account](https://firebase.google.com/)

### Instalation

1.  Clone this repository to your local

    ```bash
    https://github.com/zikriaulia28/CoffeeShop.git
    ```

2.  Install dependencies

    ```bash
    cd Coffeeshop-be && npm install
    ```

3.  Setup environments (you can see in `.env.example`)

    - Database server using postgreSQL

      ```env
      DB_HOST = [your database host]
      DB_NAME = [your database name]
      DB_PORT = [your database port]
      DB_USER = [your database username]
      DB_PASS = [your database password]
      SERVER_PORT = [your server port]
      ```

    - JSON Web Token Secret Key (prefer using random string) [[see more information]](<https://jwt.io/introduction>)

      ```env
      JWT_SECRET = [your JWT secret]
      ```

    - Database server using MongoDB [[you can create account in here]](<https://mongodb.com>)

      ```env
      MONGO_PASS = [your MongoDB password]
      MONGO_DBNAME = [your MongoDB name]
      MONGO_HOST = [your MongoDB host]
      MONGO_USER = [your MongoDB name]
      ```

    - Image server using Cloudinary [[you can create account in here]](<https://cloudinary.com/>)

      ```env
      CLOUD_NAME = [your Cloudinary name]
      CLOUD_KEY = [your Cloudinary key]
      CLOUD_SECRET = [your Cloudinary secret]
      ```

    - Firebase Admin (generate service-account json and encode base64) [[see more]](<https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments>)

      ```env
      GOOGLE_APPLICATION_CREDENTIALS = [your encoded service-account.json content]
      ```

4.  Last, run the app

    ```bash
    npm run dev
    ```

## Route

| Endpoint                     |  Method  | Info         | Remark                               |
| ---------------------------- | :------: | :----------- | :----------------------------------- |
| /auth                        |  `POST`  | Auth         | Login                                |
| /auth/logout                 | `PATCH`  | Auth         | LOGOUT                               |
| /auth/register               |  `POST`  | Auth         | Register                             |
| /auth                        | `PATCH`  | User         | Change Password                      |
| /auth/otp                    | `PATCH`  | User         | get otp                              |
| /auth/forgot                 | `PATCH`  | User         | forgot password                      |
| /transactions/get-all-order  |  `GET`   | Transactions | History transactios all users(admin) |
| /transactions                |  `GET`   | Transactions | History Transaction                  |
| /transactions                |  `POST`  | Transactions | Create Transaction                   |
| /transactions/:id            | `DELETE` | Transactions | Delete Transaction                   |
| /transactions/get-done-order | `PATCH`  | Transactions | status Transaction done (admin)      |
| /products                    |  `GET`   | Products     | See Products                         |
| /products                    |  `POST`  | Products     | Create product with prom             |
| /products/:id                |  `GET`   | Products     | Get detail product                   |
| /products/:id                | `PATCH`  | Products     | Edit product                         |
| /products/:id                | `DELETE` | Products     | Delete product                       |
| /promo                       |  `GET`   | Promo        | Get all Promo                        |
| /promo/:id                   |  `GET`   | Promo        | Get Detail promo                     |
| /promo                       |  `POST`  | Promo        | Create promo                         |
| /promo/:id                   | `PATCH`  | Promo        | Edit Promo                           |
| /promo/:id                   | `DELETE` | Promo        | Delete Promo                         |
| /users/:id                   |  `GET`   | Profile      | Get Profile                          |
| /users/:id                   | `PATCH`  | Profile      | Edit Profile                         |

## Postman Documentation

You can click [here!](https://documenter.getpostman.com/view/26102451/2s93saZsdr#f5ff7f36-a217-4640-b9f0-87d14b6e95c6)

## Related Projects

- [website](https://github.com/zikriaulia28/Coffeshop-fe)
- [mobile app](https://github.com/zikriaulia28/CoffeeShop-Mobile)

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Report Bug

Any error report you can pull request
or contact: <zikriaulia98@gmail.com>

## Contributor

  <table>
    <tr>
      <td >
        <a href="https://github.com/zikriaulia28">
          <img width="100" src="https://avatars.githubusercontent.com/u/103765843?v=4" alt=""><br/> 
          <div align="center">
          <sub><b>Zikri Aulia</b></sub>
          </div>
        </a>
        </td>
    </tr>
  </table>
