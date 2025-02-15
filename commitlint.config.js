module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'function-rules/header-max-length': [
      2, // level: error
      'always',
      async (parsed) => {
        const regex = new RegExp(`^RX: ([a-zA-Z-&0-9 ]{1,})$`);

        if (regex.test(parsed.header)) {
          return [true];
        }

        return [
          false,
          'The name of the commit must look according to the formula: RX: <message>.',
        ];
      },
    ],
    'header-max-length': [0],
    'subject-empty': [0, 'never'],
    'type-empty': [0, 'never'],
    'type-enum': [0, 'never'],
  },
};
