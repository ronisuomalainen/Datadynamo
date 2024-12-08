module.exports = {
    extends: [],
    rules: {
      // Ensure that the commit message starts with an uppercase letter
      'header-first-uppercase': [2, 'always', /^[A-Z].*/],
      
      // Ensure the commit message is at least 10 characters long
      'header-min-length': [2, 'always', 10]
    },
    plugins: [
      {
        rules: {
          // Custom rule to check for uppercase first letter
          'header-first-uppercase': ({ raw }) => {
            if (!/^[A-Z]/.test(raw)) {
              return [
                false,
                'The first letter of the commit message must be uppercase'
              ];
            }
            return [true];
          },
        },
      },
    ],
  };
  