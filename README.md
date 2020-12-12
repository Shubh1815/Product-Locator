# Product Locator

**Login Page**

![](/imgs/login.png)

**Admin Dashboard**  
 
- Only Admin has the rights to create new users and warehouses. 
- A transaction could be created by any registered user.
- Admin could update or delete any transaction.

![](/imgs/admin-dashboard.png)

**User Dashboard**  

- A registered user could view all the warehouses and transactions in the database. 
- The user could only update or delete transactions which were created by him.

![](/imgs/user-dashboard.png)

**Warehouse (Arena) List**

![](/imgs/arena.png)

**Warehouse (Arena) Analytics**

![](/imgs/arena-analytics.png)

## Setting Up

**Backend**

```
  $ pip install pipenv
```

**Installing Dependencies**

```
  $ pipenv install
```

**Migrating to database**

```
  $ pipenv shell 
  $ python manage.py migrate
```

**Starting Server**

```
  $ pipenv shell
  $ python manage.py runserver
```

**Frontend**

**Installing Dependencies**

```
  $ npm install
```

**Starting Server**

```
  $ npm start
```

**Creating new admin**

```
  $ python manage.py createsuperuser
```
