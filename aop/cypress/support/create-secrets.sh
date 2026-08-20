FILE='./cypress/support/secrets.js'
if test -f "$FILE"; then
    echo "cypress secrets file found; no action required"
else
    echo "cypress secrets file not found, generating..."
    echo "export const secrets = {
  username: \"\", //replace with actual values, do not commit this file
  password: \"\",
};
" > ./cypress/support/secrets.js
    echo "cypress secrets generated; see /cypress/support/secrets.js to add values"
fi



    