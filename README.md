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

#### Packages used for backend (Express):

- config (for deployment)
- Express
- Mongoose
- Express validator
- Concurrently
- Bcrypt
- jsonwebtoken
- Nodemon (dev only)

#### Packages used for frontend (React):

- Bootstrap
- Axios
- Router dom
- Redux
- React-redux
- Redux-thunk
- Redux-devtools-extension

## Feature 2: Product Listings

1. Display a list of available furniture products with images, names, prices, and brief descriptions.
1. Implement sorting and filtering options for users to find products easily.

### User stories:

1. As a user, I want to see pictures and names of furniture products on the homepage.
1. As a user, I want to know how much each product costs.
1. As a user, I want a short description of each product to understand what it's about.
1. As a user, I want to sort products by price to find affordable products faster.
1. As a user, I want to easily reset sorting and filtering to start over.
1. As a user, I want the website to look good and work well on both my computer and my phone.
1. As a user, I want to click on a product to see more details, like pictures and a longer description.
1. As a user, I want to add products to my cart with just one click.
1. As a user, I want to click on a product to learn more about it and maybe buy it.

#### Tasks:

1. Design the homepage layout to accommodate product listings. (DONE [Link](https://www.figma.com/file/SeMCwhaQm3TieAG5Eo7COL/Ecommerce?type=design&node-id=0-1&mode=design&t=salzlFiicX1p1Nng-0))
1. Create a database schema to store product information including names and image URLs. (DONE)
1. Implement a component to fetch and display product names and images on the homepage.
1. Extend the database schema to include product prices.
1. Update the homepage component to display product prices alongside names and images.
1. Modify the database schema to include short product descriptions.
1. Enhance the homepage component to show short descriptions for each product.
1. Add sorting functionality to the product listings, allowing users to sort by price.
1. Create UI elements for users to select sorting options.
1. Develop a feature that allows users to reset sorting and filtering options with a single action.
1. Add a "Reset" button or icon to the user interface.
1. Apply responsive design principles to ensure the website looks and works well on both desktop and mobile devices.
1. Test the website on various screen sizes and make adjustments as needed.
1. Design and create a product details page.
1. Implement navigation from product listings to the details page when a user clicks on a product.
1. Develop a feature that allows users to add products to their shopping cart with a single click.
1. Create a cart management system to store selected products.
1. Add a "Buy" button on the product details page to enable users to purchase a product they are interested in.
1. Integrate payment processing and order confirmation functionality.

## Feature 3: Product Details:

1. Create individual product pages with detailed information about each item.
1. Allow users to view product images in a gallery and read product descriptions.

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
