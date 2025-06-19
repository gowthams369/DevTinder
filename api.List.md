# DevTinder APIs

## auth controller
-POST /signup
-POST /login
-POST /logout

## profile controller
-GET /Profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter
-POST /request/send/status/:userId  
-POST /request/review/status/:requestId

## userRouter
-GET /user/connection
-GET /user/request/rejected
-GET /user/feed - GET others profile


Status : ignored,intrested,accepted,rejected