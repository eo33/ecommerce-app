<!--<div>marker</div>-->
<br><br>
<div align="center">
   <a href="https://www.thefurniturebros.com/"><img src="./client/public/assets/logo.jpeg" /></a><br>
</div>

<p align="center">An eCommerce web application made using the MERN stack</p>

<p align="center">
    <a href="https://www.thefurniturebros.com/"><b>Website</b></a> •
    <a href="https://docs.thefurniturebros.com/"><b>Documentation</b></a>
</p>
<p align="center">
  <a href="https://github.com/eo33/ecommerce-app/commits/main">
    <img src="https://img.shields.io/github/last-commit/eo33/ecommerce-app?style=flat-square" alt="Last Commit" />
  </a>
  <a href="https://github.com/eo33/ecommerce-app/issues">
    <img src="https://img.shields.io/github/issues/eo33/ecommerce-app?style=flat-square" alt="Issues" />
  </a>
  <a href="https://github.com/eo33/ecommerce-app">
    <img src="https://img.shields.io/github/repo-size/eo33/ecommerce-app?style=flat-square" alt="Repo Size" />
  </a>
</p>


# Ecommerce app

I'm building an Ecommerce app using Mongo, Express, React and Node (MERN) stack.

1. There are 8 features that are going to be implemented.
1. Check out the deployed app [here](https://desolate-reef-25578-0bcc1c956f71.herokuapp.com/)!
1. Watch a video explanation of the web app [here](https://www.loom.com/share/9e074a6cea434832a18eb4518fa9def6?sid=4e9e9e9d-53c4-4da3-85be-8c4a738c9741).

## Run this repository locally

To run this repository locally, run the following commands:
1. Install the backend dependencies using:
```
npm install
```
2. Install the frontend dependencies using:
```
cd client
npm install
cd ..
```
2. Run the local application using:
```
npm run dev
```

## Account credential demo

You can access the web app using the following credential:

1. Regular account:

- Username: first_account@gmail.com
- Password: 123456

2. Admin account

- Username: john_doe@gmail.com
- Password: 123456

## Table of content

1. [Development plan](#development-plan)
1. [Feature 1: User auth](#feature-1-user-authentication-and-authorization)
1. [Feature 2: Product listings](#feature-2-product-listings)
1. [Feature 3: Product details](#feature-3-product-details)
1. [Feature 4: Shopping cart](#feature-4-shopping-cart)
1. [Feature 5: Checkout](#feature-5-checkout)
1. [Feature 6: Orders](#feature-6-orders)
1. [Feature 7: Admin panel](#feature-7-admin-panel)
1. [Feature 8: Landing pages, deployment & docs](#feature-8-landing-page-deployment-docs)
1. [Bugs found](#bugs-found)
1. [References](#reference)

## Development plan

The ecommerce project is planned to be completed within 8 weeks (1 week break), finishing in W47.

| No  |                Feature                | W35 | W40 | W41 | W42 | W43 | W44 | W45 | W46 | W47 | W48 | W49 |
| :-: | :-----------------------------------: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  1  | User Authentication and Authorization | •   | •   |     |     |     |     |     |     |     |     |     |
|  2  |           Product Listings            |     | •   | •   | •   |     |     |     |     |     |     |     |
|  3  |            Product Details            |     |     |     |     | •   |     |     |     |     |     |     |
|  4  |             Shopping Cart             |     |     |     |     | •   | •   |     | •   |     |     |     |
|  5  |               Checkout                |     |     |     |     |     |     |     | •   | •   |     |     |
|  6  |                Orders                 |     |     |     |     |     |     |     | •   | •   |     |     |
|  7  |              Admin Panel              |     |     |     |     |     |     |     |     | •   | •   |     |
|  8  |    Landing page, Deployment, Docs     |     |     |     |     |     |     |     |     |     |     | •   |

- _Note 1: Week 35 (W35) starts from 28 Aug 2023_
- _Note 2: Added 2 weeks (W48 & W49) because some features took additional time to complete_
- _Note 3: Feature, user stories and tasks are partially generated with the help of ChatGPT._

### Packages used for backend (Express):

- Config (for deployment)
- Express
- Mongoose
- Express validator
- Concurrently
- Bcrypt
- jsonwebtoken
- Nodemon (dev only)
- Multer (for file upload)
- heroku cli (for deployment)
- swagger-jsdoc (for generateing docs)
- swagger-ui-express (to server swagger ui)
- cors (to enable cross origin requests)

### Packages used for frontend (React):

- Bootstrap
- React-Bootstrap
- Axios
- React router dom
- Redux-devtools-extension
- React-image-magnify
- React-google-autocomplete
- React-paginate

### Third party API:

- Google places (for address lookup)

## Feature 1: User Authentication and Authorization

1. Allow users to sign up and log in.
1. Implement authentication flows using tokens or cookies.
1. Differentiate between guest users and authenticated users.

### User stories:

- As a new user, I want to be able to sign up for an account so that I can access the ecommerce app.
- As a registered user, I want to log in securely using my credentials to access my personalized account.
- As an authenticated user, I want my session to persist across different pages so that I don't have to log in repeatedly.
- As a guest user, I want to be able to browse the app without needing to sign up.
- As an authenticated user, I want to have access to features like adding items to my cart and placing orders.

### Tasks:

1. Set up user registration form. (DONE)
1. Implement user registration API endpoint. (DONE)
1. (Custom) Implement server side validation. (DONE)
1. (Custom) Design user signup and login form using Figma. (DONE)
1. Implement user signup and login form. (DONE)
1. Create user login API endpoint with authentication. (DONE)
1. Implement password hashing for user security. (DONE)
1. Set up JWT generation and validation. (DONE)
1. Create protected routes for authenticated users. (DONE)
1. Add user logout functionality. (DONE)

### Side notes

#### Work progress

- 29 Aug 2023: Wrote user stories, setup local environemnt, and configured MongoDB Atlas Cluster.
- 30 Aug 2023: Setup express server: register route, ignore node.
- 31 Aug 2023: Setup mongoose and completed register route request.
- 01 Sept 2023: Implemented server side validation using express-validator, and design UI using Figma—[**Link to design**](https://www.figma.com/file/SeMCwhaQm3TieAG5Eo7COL/Ecommerce?type=design&node-id=0%3A1&mode=design&t=VHVPkV9jfHeoMaRj-1). Installed concurrently to run express and react together.
- 02 Sept 2023: Learned how to implement authentication.
- 02 Oct 2023: Implemented Bcrypt for user registration.
- 03 Oct 2023: Implemented JWT for authentication.
- 04 Oct 2023: Created user login API endpoint.
- 05 Oct 2023: Implemented protected route and useContext API.

## Feature 2: Product Listings

1. Display a list of available furniture products with images, names, prices, and brief descriptions.
1. Implement sorting and filtering options for users to find products easily.

### User stories:

1. As a customer, I want to see a list of available furniture products on the website so that I can browse and select the items I'm interested in.
1. As a customer, I want the list of products to include essential information such as product images, names, and prices, so that I can make informed choices.
1. As a customer, I want the product listings to be sortable, so that I can easily arrange products based on my preferences.
1. As a customer, I want the product listings to be filterable, allowing me to narrow down my choices by various criteria like category and price range.
1. As a customer, I want the product listings to be paginated if there are many products available, so that I can navigate through the list without overwhelming scrolling.
1. As an administrator, I want to easily manage and update the product listings, including adding new products and modifying existing ones.
1. As an administrator, I want to include images, names, prices, and descriptions when adding or editing products, ensuring that customers have accurate and appealing information.
1. As a developer, I want to optimize the performance of the product listings to ensure fast loading times, even when handling large datasets.
1. As a developer, I want to ensure that the product listings are responsive and work seamlessly on various devices, including desktops, tablets, and mobile phones.

#### Tasks:

1. Design product listing UI with placeholders for products.(DONE [Link](https://www.figma.com/file/SeMCwhaQm3TieAG5Eo7COL/Ecommerce?type=design&node-id=0-1&mode=design&t=salzlFiicX1p1Nng-0))
1. Create API endpoint to fetch list of products. (DONE)
1. Integrate API call to fetch and display products on frontend. (DONE)
1. Implement sorting options (e.g., by highest price, lowest price, sold count, etc) in UI. (DONE)
1. Add filtering options (e.g., by items sold, price range). (DONE)
1. Task (Admin Functionality): Develop a secure admin panel with features for adding, editing, and deleting products. (DONE)
1. Task (Admin Functionality): Enhance the admin panel to include fields for uploading images and providing product details. (DONE)
1. Task (Development): Implement efficient database queries and frontend rendering techniques to achieve optimal performance. (DONE)
1. Task (Development): Implement responsive design principles to adapt the product listing UI to different screen sizes. (DONE)

### Side notes

#### Work progress

- 06 Oct 2023 - Understanding the requirements
- 09 Oct 2023 - Designed the interface
- 10 Oct 2023 - Learned Multer to upload images in the file system. Also implemented it to the product API.
- 11 Oct 2023 - Work on products backend API
- 12 Oct 2023 - Work on frontend product component (API call and sorting)
- 16 Oct 2023 - Work on advance filter
- 17 Oct 2023 - Completed filters
- 18 Oct 2023 - Completed adding products from client side as an admin
- 19 Oct 2023 - Completed backend API for deleting and updating product as admin
- 23 Oct 2023 - Fix incorrect event handling

## Feature 3: Product Details:

1. Create individual product pages with detailed information about each item.
1. Allow users to view product images in a gallery and read product descriptions.

### User stories:

1. As a customer, I want to be able to click on a product from the product listings and view a dedicated product details page with comprehensive information.
1. As a customer, I want to see a gallery of product images on the product details page so that I can view the item from different angles and get a better understanding of its appearance.
1. As a customer, I want to read detailed product descriptions and specifications on the product details page to learn more about the product's features and characteristics.
1. As a customer, I expect the product details page to load quickly and provide a smooth browsing experience, even for pages with large images.
1. As a customer, I want to navigate easily between different product details pages and return to the product listings page when I'm done.
1. As a customer, I expect the product details page to be responsive and user-friendly on various devices, including mobile phones and tablets.
1. As an administrator, I want to have the ability to update and manage the detailed information for each product, including images, descriptions, and specifications.
1. As a developer, I want to ensure that the product details are retrieved efficiently from the backend, minimizing load times for customers viewing the product details.

#### Tasks:

1. Create the user interface for the product detail page. (Done)
1. Display product descriptions and specifications on the product detail page. (Done)
1. Optimize the performance of the product details page, including image loading and rendering. (Done)
1. Implement navigation controls that allow users to move between product detail pages and return to the product listings. (Done)
1. Implement zoom control that allow users to zoom at the product image. (DONE)
1. Ensure that the product details page is designed to be responsive and accessible on different screen sizes. (Done)
1. (Admin Functionality): Provide a secure admin panel with features for editing and updating product details. (Done)
1. (Development): Optimize the API endpoint for retrieving product details and implement effective caching mechanisms.(Done)

#### Work progress

- 23 Oct 2023 - Made figma design
- 25 Oct 2023 - Implemented Figma design
- 26 Oct 2023 - Installed `react-image-magnify` so user can magnify images. Completed all the listed tasks.

## Feature 4: Shopping Cart:

1. Enable users to add products to their cart.
1. Show a summary of the items in the cart with quantities and prices.
1. Implement the ability to modify or remove items from the cart.

### User stories:

1. As a customer, I want to be able to add products to my cart while browsing, so that I can keep track of items I intend to purchase.
1. As a customer, I want to see a concise summary of the items in my cart, including quantities and prices, so that I can review my selections before proceeding to checkout.
1. As a customer, I want to have the ability to modify the quantities of items in my cart, allowing me to adjust my purchase quantities based on my preferences.
1. As a customer, I want to be able to remove items from my cart easily, giving me the flexibility to change my mind about certain products.
1. As a customer, I want to see the total price of all the items in my cart, including any applicable taxes or fees, so that I can understand the overall cost of my purchase.
1. As a customer, I expect my shopping cart to be accessible and persist across different pages, allowing me to add items to the cart from various product pages.
1. As a customer, I expect the shopping cart to update dynamically when I add or remove items, providing me with real-time feedback on my shopping selections.

#### Tasks:

1. Implement an intuitive mechanism for adding products to the shopping cart from the product page. (DONE)
1. Develop a user-friendly cart interface that displays a clear summary of the items, quantities, and individual prices.(DONE)
1. Implement functionality that enables users to modify the quantities of items directly within the cart interface. (DONE)
1. Integrate a simple process that allows users to remove items from the cart with minimal effort. (DONE)
1. Calculate and display the total price of the items in the cart, considering any taxes or fees that may apply. (DONE)
1. Implement a persistent shopping cart functionality that remains accessible throughout the user's browsing session. (DONE)
1. Integrate dynamic updates to the shopping cart interface to reflect changes in quantities and items without requiring a page refresh. (DONE)

#### Work progress

- 26 Oct 2023 - Added the user stories, tasks and understanding the requirement.
- 28 Oct 2023 - Worked on cart schema and API backend.
- 30 Oct 2023 - Worked on add cart API, and cart interface design in Figma. Finished task #1.
- 31 Oct 2023 - Implemented Figma design.
- 12 Nov 2023 - Worked on updating the product qty in the frontend and backend.
- 13 Nov 2023 - Made backend API for deleting item. Added it to the frontend.
- 14 Nov 2023 - Added total items and price calculation

## Feature 5: Checkout :

1. Create a checkout process that guides users through providing shipping and payment information.
1. Generate order summaries with a breakdown of costs and delivery details.

### User stories:

1. As a customer, I want a streamlined checkout process that guides me through providing shipping and payment information, making it convenient for me to complete my purchase.
1. As a customer, I want to be able to add multiple addresses that can be saved, and later select.
1. As a customer, I want to be able to pick the shipment method for each type of item.
1. As a customer, I want to be able to see the detailed breakdown of costs, including item prices, taxes, shipping fees, and the total amount due.
1. As a customer, I want to be able to see if my orders go through.

#### Tasks:

1. Task: Develop a user-friendly checkout interface with clear steps for providing shipping and payment details. (DONE)
1. Task: Implement a functionality that allows user to save multiple addresses. (DONE)
1. Task: Implement a functionality that allows user to select the type of shipping for each item. (DONE)
1. Task: Display a comprehensive order summary, outlining all relevant cost details. (DONE)

#### Work progress

- 15 Nov 2023 - Made figma design for checkout page, and work on how to add an addresss
- 16 Nov 2023 - Installed `react-google-autocomplete` for address form.
- 17 Nov 2023 - Finished address functionality
- 19 Nov 2023 - Finished type of shipping for each item functionality
- 20 Nov 2023 - Finished order sumamary functionality, and made a new feature task.

## Feature 6: Orders :

1. Allow users to view their current order status page.

### User stories:

1. As a customer, I want to be able to see the thank you page when my orders go through.
1. As a customer, I want to be able to access the order status page.
1. As a customer, I want to be able to view my order status, such as: pending, shipping, arrived.

#### Tasks:

1. Task: Display a 'thank you' page to show that the orders go through. (DONE)
1. Task: Implement a user-friendly that allows customers to access the current status of the order. (DONE)
1. Task: Implement a functionality that allows user to see the order status of their orders. (DONE)
1. Task: Implement pagination that limits order shown. (DONE)

#### Work progress

- 21 Nov 2023 - Created orders functionality, such as the db schema, API and client-side request. Also made a thank you page to show the orders go through. Worked on the Figma design as well.
- 22 Nov 2023 - Worked on the backend logic to retrieve data
- 23 Nov 2023 - Worked on the frontend functionality, which includes the filtering.
- 24 Nov 2023 - Worked on pagination. Used `react-paginate` to implement it.

## Feature 7: Admin Panel:

1. Implement an admin panel to manage products, orders, and users.
1. Add functionality for adding new products, updating existing ones, and managing inventory.

### User stories:

1. As an administrator, I want to access a secure admin panel that allows me to manage products, orders, and users efficiently, enabling me to oversee and control various aspects of the e-commerce platform.
1. As an administrator, I want to have the ability to add new products to the platform easily, including uploading product images, providing detailed descriptions, and specifying pricing and inventory information.
1. As an administrator, I want to be able to update existing product information, enabling me to make necessary changes to product details, prices, and inventory levels as required.
1. As an administrator, I want to view and manage incoming orders, including processing orders, updating order statuses, and addressing customer inquiries related to orders.
1. As an administrator, I want to have the ability to manage user accounts, including viewing user profiles, modifying user information, and addressing any account-related issues or inquiries.
1. As an administrator, I want to ensure that the admin panel is user-friendly and intuitive, providing me with a seamless experience for managing products, orders, and users without encountering technical difficulties.
1. As an administrator, I want to be able to manage and process incoming orders efficiently, enabling me to track order statuses, update delivery information, and handle customer inquiries.

#### Tasks:

1. [ROUTING] Set up a secure login system for administrators to access the admin panel. (DONE)
1. [ADMIN] Design and develop an intuitive user interface for the admin panel, focusing on ease of use and efficient management of key e-commerce platform elements. (DONE)
1. [ADMIN] In the admin page, add a sidebar so that user can navigate through the different routes, show important information, and product statistics table. (DONE)
1. [PRODUCTS] Implement functionality within the admin panel that allows administrators to modify and update existing product information seamlessly. (DONE)
1. [PRODUCTS] Develop a user-friendly interface in the admin panel that facilitates the addition of new products with comprehensive details. (DONE)
1. [ORDERS] Develop an order management system within the admin panel that allows administrators to handle incoming orders and track their statuses.(DONE)
1. [USERS] Implement user management functionalities in the admin panel, enabling administrators to oversee and manage user accounts effectively. (DONE)

#### Work progress

- 24 Nov 2023 - Understand the user stories. Also worked on setting up the admin routes.
- 25 Nov 2023 - Made the figma design for admin dashboard.
- 26 Nov 2023 - Configured routes and work on sidebar to make it a shared component for the children routes.
- 27 Nov 2023 - Finish sidebar and admin dashboard requests.
- 28 Nov 2023 - Added pagination to products. Worked on order functionality (design, routing, backend API and front display).
- 29 Nov 2023 - Implemented update status and delete button. Finished the figma design, backend API and routing for users.
- 30 Nov 2023 - Worked on the user table for FE. Added pagination on product.

## Feature 8: Landing page, Deployment, Docs

1. Create the landing page.
2. Deploy the web app.
3. Finish up the documentation.

### User stories:

1. As a user, I want to be able to see the landing page.
2. As a user, I should be able to access the app from the web.
3. As a developer, I want to see how the web app is built.

#### Tasks:

1. Create the landing page, and set up the fetch request to request for random products. (DONE)
2. Deploy the web app. (DONE)
3. Finish up remianing docs. (DONE)

#### Work progress

- 1 Dec 2023 - Finished the FE design, and implement it. Also made API to retrieve random product data.
- 4 Dec 2023 - Finished the deployment to heroku. Uninstalled some dependencies for deployment to work.

## Feature 9: Enhance the Docs

1. Setup GitBook for the documentation.
2. Setup the repository for the OAS file.
3. Add Postman collection to the GitBook.

### User stories

1. As a user, I want to be able to view the documentation.
2. As a developer, I want to view and modify the OAS 3.0 file
3. As a user, I want to be able to download the Postman collection.
4. As a user, I want to make sure that the code snippets in the docs are working.
5. As a user, I want to know about REST API and how to make my first request.
6. As a developer, I want to test out the API endpoints easily.
7. As a developer, I want to know the latest updates to the API.

#### Tasks

1. Setup a Gitbook instance and configure it to host the documentation
2. Create and configure a repository for storing the OAS file, ensuring proper version control and access management.
3. Upload and embed the Postman collection into GitBook, providing clear instructions for users on how to use the collection to test API endpoints.
4. Create the secondary content to support the Open API docs, inclduing the info about REST API and release notes.

#### Work progress

- 26 Nov 2024 - Setup the GitBook instance for the Furnitures bros API docs. Made the structure for the GitBook. Added various pages for the docs: _Introduction_, _Auhtentication_, _Tokens_, _Pagination_, _Errors_, and _Release Notes_. I also added the API endpoints section following the structure in Postman. View docs: https://edwards-organization-17.gitbook.io/the-furniture-bros-api-docs
- 27 Nov 2024 - Explored GitBook, the documentation site, and Scalar, the tool that powers the OAS 3.0 rendering for GitBook. Also enabled the CORS for the server to make the API publicly available. Now you can make requests from other sources.
- 28 Nov 2024 - Finished the documentation for the "account" category. Sync the endpoints available in Postman and OAS. Tested the docs in OAS and made sure it works properly.
- 29 Nov 2024 - Worked on the docs for "products" category. Also added helpful desc to the "200" response section of the endpoints.
- 30 Nov 2024 - Completed the docs for the "products" and "checkout" category.
- 1 Dec 2024 - Completed the docs for "orders" and "stats" category.
- 2 Dec 2024 - Tested the OAS docs in GitBook (powered by Scalar). There was an error in the `multipart/form-data`, but it's a Scalar issue. Modified some of the OAS docs as well to improve clarity.
- 3 Dec 2024 - Started working on the secondary content, including Postman collection and the _Start here_ pages. Modified Postman collection and removed security tokens so that it can be run publicly.
- 4 Dec 2024 - Continue working on the secondary content. Worked on the Introduction, Get started, authentication.
- 5 Dec 2024 - Continue working on the secondary content. Worked on making a request, examples, functionalities, release notes and glossary.

## Reference

1. Postman requests for testing API: [here](./Ecommerce.postman_collection.json)
1. ChatGPT link for features: https://chat.openai.com/c/a89c0192-59a3-4f8b-96ab-f0c0e0000752
1. ChatGPT link for docs: https://chatgpt.com/c/6745e157-ef50-8011-817f-90fb5a06700a
