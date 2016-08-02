//创建数据库角色
db.createUser(
    {
        user: "taove",
        pwd: "taove",
        roles: [ "readWrite", "dbAdmin" ]
    }
)