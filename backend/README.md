
### All Router my Project ###

# GET: http://localhost:5000/ → Home route


##  Products Routers  ##

# GET: http://localhost:5000/api/products   → All Product Retruned  ** admin and user

# GET: http://localhost:5000/api/products/:id   → Product find with ID  ** admin and user

# GET: http://localhost:5000/api/products/order   → All Order History  ** admin

# GET: http://localhost:5000/api/products/my-order   → User Order History  ** admin and  user

# POST: http://localhost:5000/api/products   → Create Product ** admin

# POST: http://localhost:5000/api/products/cart/add   → Add Product to Cat ** user

# POST: http://localhost:5000/api/products/order/place   → Product Prtoducts ** user

# PUT: http://localhost:5000/api/products/:id   → Product Update  ** admin

# DELETE: http://localhost:5000/api/products/:id   → Product Detele   ** admin



##  User Routers   ##

# GET: http://localhost:5000/auth/users   → All User Returned

# GET: http://localhost:5000/auth/users/:id   → User find with ID

# GET: http://localhost:5000/auth/users/:id   → User profile find

# POST: http://localhost:5000/auth/register   → User Register

# POST: http://localhost:5000/auth/verify   → User Verification JWT Token

# POST: http://localhost:5000/auth/login   → User Login

# POST: http://localhost:5000/auth/logout   → User Logout

# POST: http://localhost:5000/auth/forgor-password   → User Password Reset

# PUT: http://localhost:5000/auth/users/:id   → User Data Update

# DELETE: http://localhost:5000/auth/users/:id   → User Delete



## Project Testing Router ##

# GET: http://localhost:5000/auth/seed/users   → Create a Users

# GET: http://localhost:5000/api/seed/products   → Create a Products




# day 1 → Node.js Express.js Environment Setup and Create Server and Database ConnectTion # done

# day 2 → User Schema and Model Create and Bcryptjs use password hash register nad login complite # don

# day 3 → Product Schema and Model Create and CRUD CRUD Oparetion complite # done

# day 4 → Cart modle and Order model create and product add a cart and remove cart product #




