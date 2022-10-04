# Zettabyte Life Test Section 1
In this test I decide to use only `graphql` library due to the unupdated
`express-graphql` since last 2 years. Therefore, I'm really sorry there is no
GraphQL playground but the Postman or VS Code Rest Client to play with.

# Setup
To run the app:

```
$ cp .env.example .env
$ npm start
```

Then, hit the `http://localhost:3000/graphql` with `POST` method.

This is the example of the designed GraphQL query in this project:

```
query {
    comments {
        id
        content
    }
}
```

```
mutation {
    createComment(content: "This is a new comment") {
        id
        content
    }
}
```

```
mutation {
    deleteComment(id: "<commentId>") {
        id
        content
    }
}
```

# Test
To run the test,

```
$ cp .env.example .env
$ npm run test
```
