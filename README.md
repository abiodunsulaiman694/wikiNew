I built the application with PHP(Server-side) and JavaScript(Client-side).

I used Laravel Framework for PHP as it takes off most boiler plate code and
scales nicely. Also, it works fluently with most frontend libraries like React.

For the front end, I used React as it helps to build user interfaces in components,
helping with reusability and also makes application fast with little DOM Manipulation.

For CSS, I used some utility styles from Bootstrap CSS to style the forms and buttons
due to the time limit.

Todo:

Due to time limit, there were aspects of the system I would have loved to work on
but could not, due to time constraint:

1) Tests- Automated tests for Client side and Server side
2) Confirmation dialog before deleting a page
3) Avoid redirect loops within pages
4) Support for older browsers and better responsiveness

Installation

To install the project, the following steps should be taken

1) Copy or unzip files to the Server
2) Install php dependencies from the terminal, within project directory with:
    composer install
    [Assuming machine has composer preinstalled]
3) Install JavaScript dependencies from the terminal, within project directory with:
    npm install
    [Assuming machine has NodeJS preinstalled]
4) Grant access to the storage, bootstrap and public directories from the terminal,
within project directory with:
    sudo chmod -R 777 ./storage
    sudo chmod -R 777 ./bootstrap
    sudo chmod -R 777 ./public
    [Might require sudo privilege]
4) Set up .env file at the root of the application.
    Copy .env.example to .env
    Most importantly, the following should be filled in the .env for the app to function
    correctly:

    APP_NAME

    #No trailing slash
    APP_URL=http://localhost/wikiNew/public

    #Same format as below. Starts with a slash. No trailing slash after
    APP_PUBLIC_DIRECTORY="/wikiNew/public"

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=wikinewdb
    DB_USERNAME=root
    DB_PASSWORD=

  5) Generate encryption key from the terminal, within the project rot directory, with:
      php artisan key:generate

  6)Migrate database files from the terminal, within project directory with:
      php artisan migrate

  7) Run project via the browser, by going to the public directory of the Server
    as specified in the .env file

Thank you.
