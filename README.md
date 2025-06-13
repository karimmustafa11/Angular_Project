# Meem - Your Online E-commerce Store

## Project Overview
This is an e-commerce web application built using **Angular** for the frontend, **Tailwind CSS** for styling, and **JSON Server** as a mock backend. The application supports two main user roles: **Users** and **Admins**, each with distinct functionalities tailored to their needs. The platform allows users to browse products, add items to their favorites, make purchases, and manage their profiles, while admins can manage products and view orders.

## Demo Video
A video demonstration of the project is available [here](https://drive.google.com/drive/folders/181M5j-zn5qibIkfps6ASK_YklCbcc6zG?usp=sharing).

## Features

### User Features
- **Sign Up & Login**: Users can create an account and log in securely.
- **Product Search**: Search for products using keywords.
- **Favorites List**: Add or remove products to/from a favorites list.
- **Purchase Flow**: Add products to the cart, proceed to checkout, and receive order confirmation.
- **Profile Management**: Users can update basic profile information (e.g., name, email, etc.).

### Admin Features
- **Order Management**: View all orders placed by users.
- **Product Management**: Add, edit, or delete products from the catalog.

## Technologies Used
- **Frontend**: Angular , Tailwind CSS
- **Backend**: JSON Server (mock API)

## Project Structure
```
e-commerce-project/
├── .angular
├── .vscode
├── dist
├── node_modules
├── public
├── server
│   ├── node_modules
│   ├── db.json           # Mock backend data
│   ├── package-lock.json
│   ├── package.json
│   └── server.js         # JSON Server script
├── src
│   ├── app
│   │   ├── admin-dashboard    # Admin dashboard component
│   │   ├── checkout-layout    # Checkout layout component
│   │   ├── Components         #  Main components directory
│   │   ├── empty-layout-component
│   │   ├── full-layout-component
│   │   └── services           # Service files for API and logic
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   ├── editorconfig
│   ├── .gitignore
│   ├── .hintrc
│   ├── index.html
│   ├── main.ts
│   ├── main.css
│   ├── styles.css
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.spec.json
│   └── vercel.json
├── OUTLINE
└── TIMELINE
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI
- JSON Server (`npm install -g json-server`)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/karimmustafa11/e-commerce-project.git
   cd e-commerce-project
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run JSON Server**:
   Navigate to the `server` directory and start the mock backend:
   ```bash
   cd server
   json-server --watch db.json
   ```
   The mock API will be available at `http://localhost:3000`.

4. **Run the Angular Application**:
   ```bash
   ng serve
   ```
   The app will be available at `http://localhost:4200`.

## Usage

### For Users
1. Navigate to the homepage to browse products.
2. Use the search bar to find specific products.
3. Add products to your favorites or cart.
4. Proceed to checkout to place an order.
5. Visit the profile section to update your information.

### For Admins
1. Log in with admin credentials.
2. Access the admin dashboard to view all orders.
3. Use the product management section to add, edit, or delete products.




## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out via [GitHub](https://github.com/karimmustafa11).