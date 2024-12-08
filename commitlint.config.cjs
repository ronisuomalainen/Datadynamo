module.exports = {
    extends: [],
    rules: {
        'header.min.length': [2, 'always', 20],
        'header-case-start-capital': [2, 'always'],
        'header-end-period': [2, 'always'],
    },
    plugins: [
        'header-custom'  // Assuming you're registering a custom plugin with the name `header-custom`
    ],
    overrides: [
        {
            files: ['*'],  // Apply these rules to all files
            rules: {
                'header-case-start-capital': {
                    create: function(context) {
                        return {
                            'commit-msg': function(node) {
                                const message = node.value;
                                if (!/^[A-Z]/.test(message)) {
                                    context.report({
                                        node,
                                        message: 'Commit message must start with a capital letter'
                                    });
                                }
                            }
                        };
                    }
                },
                'header-end-period': {
                    create: function(context) {
                        return {
                            'commit-msg': function(node) {
                                const message = node.value;
                                if (!/\.$/.test(message)) {
                                    context.report({
                                        node,
                                        message: 'Commit message must end with a period'
                                    });
                                }
                            }
                        };
                    }
                }
            }
        }
    ]
};
