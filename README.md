
# Interactly - Contact Management API

This project allows you to manage contacts using either MySQL or FreshSales CRM.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Titli007/freshsales-CRM-management.git
    cd freshsales-CRM-management

    ```

2. Install the dependencies:
    ```bash
    yarn install
    ```

## MySQL Setup

1. Ensure that MySQL is installed and running on your machine.
2. Create your own MySQL database:
    ```sql
    CREATE DATABASE your_database_name;
    ```

3. Set up your own MySQL user and password, then update the `.env` file accordingly:
    ```
    MYSQL_USER=your_mysql_user
    MYSQL_PASSWORD=your_mysql_password
    MYSQL_HOST=localhost
    DATABASE_NAME=your_database_name
    ```

## Testing

To run the tests, use the following commands:

- For testing the database routes:
    ```bash
    npx jest DBtest.test.js
    ```

- For testing the FreshSales CRM routes:
    ```bash
    npx jest CRMtest.test.js
    ```

## Additional Info

- Ensure your MySQL database is up and running before running the tests.
- The `.env` file should also include your FreshSales API key and domain for testing the CRM functionality.


