// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table account {
  following_user_id integer
  followed_user_id integer
  desc string
  avatar string
}

Table users {
  id integer [primary key]
  user_name varchar
  email varchar
  password varchar
}

Table resource {
  id integer [primary key]
  owner varchar
  filename varchar
}

Table message {
  id integer [primary key]
  room varchar
  body text [note: 'Content of the post']
  user_id integer
}

Table room {
  id integer [primary key]
  socket_id varchar
  user_id varchar
  user_name varchar
  room_id varchar
  online boolean
}


Table trivia {
  id integer [primary key]
  owner varchar
  trivia_name varchar
  question_collection integer
  bg_bcolour varchar
  text_colour varchar
}

Table question {
  id integer [primary key]
  slide_rank integer
  owner varchar
  trivia integer
  category varchar
  type varchar
  question varchar
  options varchar
  answer varchar
  bgImg varchar
}


Ref: message.user_id > users.id // many-to-one

Ref: users.id < account.following_user_id

Ref: users.id < account.followed_user_id


Ref: "room"."id" < "message"."room"

Ref: "resource"."owner" < "users"."id"

Ref: "trivia"."owner" < "users"."id"

Ref: "question"."owner" < "users"."id"

Ref: "question"."trivia" < "trivia"."id"