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
-POST /request/send/Intrested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/ascepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET /user/connection
-GET /user/request/rejected
-GET /user/feed - GET others profile


Status : ignored,intrested,accepted,rejected