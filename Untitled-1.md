

## Estrutura de dados

```javascript

    User: {
        id: uid,
        name: String,
        email: String,
        password: String,
    }


    Task: {
        name: String,
        description: String,
        State: <"toto" | "doing" | "done">,
        user: UserIdentity
    }
```



## back-end: 

ao selecionar no front, uma task, o usuário terá acesso a:
```
    - create task
    - delete task
    - update task
```


### Controles de requisições públicas:
```
    - CreateUser
    - Delete task
    - Update task
```


### Controles de requisições privadas/específicas:

```
    - UpdateUser
    - DeleteUser
```

