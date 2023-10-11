# Ecommerce app

I'm building an Ecommerce app using the MERN stack. There are 10 features I'm going to implement.

_Note: Feature, user stories and tasks are auto-generated using ChatGPT. Texts that are not auto generated are labelled with (Custom). Texts under side notes are written by me._

## Development plan

The ecommerce project is planned to be completed within 9 weeks.

| No  |                Feature                | W35 | W40 | W41 | W42 | W43 | W44 | W45 | W46 | W47 | W48 |
| :-: | :-----------------------------------: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  1  | User Authentication and Authorization | •   | •   |     |     |     |     |     |     |     |     |
|  2  |           Product Listings            |     | •   | •   |     |     |     |     |     |     |     |
|  3  |            Product Details            |     |     | •   |     |     |     |     |     |     |     |
|  4  |             Shopping Cart             |     |     |     | •   |     |     |     |     |     |     |
|  5  |          Checkout and Orders          |     |     |     | •   | •   |     |     |     |     |     |
|  6  |              Admin Panel              |     |     |     |     | •   | •   |     |     |     |     |
|  7  |         Search Functionality          |     |     |     |     |     | •   | •   |     |     |     |
|  8  |          Payment Integration          |     |     |     |     |     |     | •   |     |     |     |
|  9  |          Reviews and Ratings          |     |     |     |     |     |     |     | •   |     |     |
| 10  |          Wishlist/Favorites           |     |     |     |     |     |     |     | •   |     |     |

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
1. As a customer, I want the list of products to include essential information such as product images, names, prices, and brief descriptions, so that I can make informed choices.
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
1. Integrate API call to fetch and display products on frontend.
1. Implement sorting options (e.g., by price, name) in UI.
1. Add filtering options (e.g., by category, price range).
1. Implement pagination for long product lists.
1. Task (Admin Functionality): Develop a secure admin panel with features for adding, editing, and deleting products.
1. Task (Admin Functionality): Enhance the admin panel to include fields for uploading images and providing product details.
1. Task (Development): Implement efficient database queries and frontend rendering techniques to achieve optimal performance.
1. Task (Development): Implement responsive design principles to adapt the product listing UI to different screen sizes.

### Side notes

#### Work progress

- 06 Oct 2023 - Understanding the requirements
- 09 Oct 2023 - Designed the interface
- 10 Oct 2023 - Learned Multer to upload images in the file system. Also implemented it to the product API.
- 11 Oct 2023 -

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

1. Create the user interface for the product detail page.
1. Implement an image gallery on the product details page.
1. Display product descriptions and specifications on the product detail page.
1. Optimize the performance of the product details page, including image loading and rendering.
1. Implement navigation controls that allow users to move between product detail pages and return to the product listings.
1. Ensure that the product details page is designed to be responsive and accessible on different screen sizes.
1. (Admin Functionality): Provide a secure admin panel with features for editing and updating product details.
1. (Development): Optimize the API endpoint for retrieving product details and implement effective caching mechanisms.

## Feature 4: Shopping Cart:

1. Enable users to add products to their cart.
1. Show a summary of the items in the cart with quantities and prices.
1. Implement the ability to modify or remove items from the cart.

## Feature 5: Checkout and Orders:

1. Create a checkout process that guides users through providing shipping and payment information.
1. Generate order summaries with a breakdown of costs and delivery details.
1. Allow users to view their order history.

## Feature 6: Admin Panel:

1. Implement an admin panel to manage products, orders, and users.
1. Add functionality for adding new products, updating existing ones, and managing inventory.

## Feature 7: Search Functionality:

1. Integrate a search bar that allows users to search for specific products based on keywords.

## Feature 8: Responsive Design:

1. Ensure your app is responsive and works well on different devices and screen sizes.

## Feature 9: Payment Integration:

1. Integrate a payment gateway to handle transactions securely. Popular options include Stripe or PayPal.

## Feature 10: Reviews and Ratings:

1. Allow users to leave reviews and ratings for products they've purchased.

## Feature 10: Wishlist/Favorites:

1. Implement a wishlist or favorites feature for users to save products for later.
