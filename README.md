# Ecommerce app

I'm building an Ecommerce app using the MERN stack. There are 10 features I'm going to implement.

_Note: Feature, user stories and tasks are auto-generated using ChatGPT. Texts that are not auto generated are labelled with (Custom). Texts under side notes are written by me._

## Development plan

The ecommerce project is planned to be completed within 9 weeks (1 week break).

| No  |                Feature                | W35 | W40 | W41 | W42 | W43 | W44 | W45 | W46 | W47 | W48 |
| :-: | :-----------------------------------: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  1  | User Authentication and Authorization | •   | •   |     |     |     |     |     |     |     |     |
|  2  |           Product Listings            |     | •   | •   | •   |     |     |     |     |     |     |
|  3  |            Product Details            |     |     |     |     | •   |     |     |     |     |     |
|  4  |             Shopping Cart             |     |     |     |     | •   | •   |     | •   |     |     |
|  5  |          Checkout and Orders          |     |     |     |     |     |     |     | •   | •   |     |
|  6  |              Admin Panel              |     |     |     |     |     |     |     |     | •   |     |
|  7  |         Search Functionality          |     |     |     |     |     |     |     |     |     | •   |

_Note: W35 starts from 28 Aug 2023_

### Packages used for backend (Express):

- config (for deployment)
- Express
- Mongoose
- Express validator
- Concurrently
- Bcrypt
- jsonwebtoken
- Nodemon (dev only)
- Multer (for file upload)

### Packages used for frontend (React):

- Bootstrap
- Axios
- Router dom
- Redux-devtools-extension
- React-image-magnify

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
- 31 Aug 2023: Setup mongoose and completed register route request
- 01 Sept 2023: Implemented server side validation using express-validator, and design UI using Figma—[**Link to design**](https://www.figma.com/file/SeMCwhaQm3TieAG5Eo7COL/Ecommerce?type=design&node-id=0%3A1&mode=design&t=VHVPkV9jfHeoMaRj-1). Installed concurrently to run express and react together.
- 02 Sept 2023: Learning how to implement authentication
- 02 Oct 2023: Implemented Bcrypt for user registration
- 03 Oct 2023: Implemented JWT for authentication
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

## Feature 5: Checkout and Orders:

1. Create a checkout process that guides users through providing shipping and payment information.
1. Generate order summaries with a breakdown of costs and delivery details.
1. Allow users to view their order history.

### User stories:

1. As a customer, I want a streamlined checkout process that guides me through providing shipping and payment information, making it convenient for me to complete my purchase.
1. As a customer, I want to be able to add multiple addresses that can be saved, and later select.
1. As a customer, I want to be able to pick the shipment method for each type of item.
1. As a customer, I want to be able to see the detailed breakdown of costs, including item prices, taxes, shipping fees, and the total amount due.
1. As a customer, I expect to be able to view my order status, such as: pending, shipping, arrived.
1. As an administrator, I want to be able to manage and process incoming orders efficiently, enabling me to track order statuses, update delivery information, and handle customer inquiries.

#### Tasks:

1. Task: Develop a user-friendly checkout interface with clear steps for providing shipping and payment details. (DONE)
1. Task: Implement a functionality that allows user to save multiple addresses.
1. Task: Implement a functionality that allows user to select the type of shipping for each item.
1. Task: Display a comprehensive order summary, outlining all relevant cost details.
1. Task: Implement a user-friendly order history section that allows customers to access the current status of the order.
1. Task (Admin Functionality): Develop an admin panel feature that allows administrators to monitor and manage incoming orders effectively, including order processing and customer support.

#### Work progress

- 15 Nov 2023 - Made figma design for checkout page, and work on how to add an addresss
- 16 Nov 2023 - Installed `react-google-autocomplete` for address form.

## Feature 6: Admin Panel:

1. Implement an admin panel to manage products, orders, and users.
1. Add functionality for adding new products, updating existing ones, and managing inventory.

### User stories:

1. As an administrator, I want to access a secure admin panel that allows me to manage products, orders, and users efficiently, enabling me to oversee and control various aspects of the e-commerce platform.
1. As an administrator, I want to have the ability to add new products to the platform easily, including uploading product images, providing detailed descriptions, and specifying pricing and inventory information.
1. As an administrator, I want to be able to update existing product information, enabling me to make necessary changes to product details, prices, and inventory levels as required.
1. As an administrator, I need to manage product inventory effectively, including monitoring stock levels, receiving notifications for low inventory, and updating stock availability to prevent overselling.
1. As an administrator, I want to view and manage incoming orders, including processing orders, updating order statuses, and addressing customer inquiries related to orders.
1. As an administrator, I want to have the ability to manage user accounts, including viewing user profiles, modifying user information, and addressing any account-related issues or inquiries.
1. As an administrator, I want to ensure that the admin panel is user-friendly and intuitive, providing me with a seamless experience for managing products, orders, and users without encountering technical difficulties.
1. As an administrator, I want to be able to view and manage the active shopping carts of users, enabling me to provide support and assistance as needed.

#### Tasks:

1. Set up a secure login system for administrators to access the admin panel.
1. Task: Develop a user-friendly interface in the admin panel that facilitates the addition of new products with comprehensive details and inventory management options.
1. Implement functionality within the admin panel that allows administrators to modify and update existing product information seamlessly.
1. Integrate inventory management features into the admin panel, providing administrators with tools to track and manage product stock efficiently.
1. Develop an order management system within the admin panel that allows administrators to handle incoming orders and track their statuses.
1. Implement user management functionalities in the admin panel, enabling administrators to oversee and manage user accounts effectively.
1. Design and develop an intuitive user interface for the admin panel, focusing on ease of use and efficient management of key e-commerce platform elements.
1. Develop an admin panel feature that allows administrators to monitor and manage user shopping carts effectively.

#### Work progress

## Feature 7: Search Functionality:

1. Integrate a search bar that allows users to search for specific products based on keywords.

### User stories:

1. As a customer, I want to be able to use a search bar to find specific products quickly and efficiently based on relevant keywords, enabling me to locate desired items without the need for extensive browsing.

#### Tasks:

1. Task: Integrate a search bar prominently into the user interface, allowing customers to input keywords and search for products based on various attributes such as product names, categories, and descriptions.

#### Work progress

ChatGPT link: https://chat.openai.com/c/a89c0192-59a3-4f8b-96ab-f0c0e0000752
