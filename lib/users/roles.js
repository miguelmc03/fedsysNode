module.exports = {
    superadmin: {
        can: [
            'blog:*',
            'user:*'
        ],
        inherits: ['admin']
    },
    admin: {
        can: [
            'blog:write',
            'user:read'
        ],
        inherits: ['user']
    },
    user: {
        can: [
            'blog:read'
        ]
    }
}