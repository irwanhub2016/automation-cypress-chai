# Flip :: This project there are 2 parts: automation-chai (API) and automation-cypress (WEB)

###  ⏺ Requirement An Automation Testing
* Assume you have instal nodejs

Clone the repository and install all gems depedency:
```shell
$ git clone https://github.com/irwanhub2016/testing-flip.git
```

### Running Scenario Test API

`$ cd automation-chai`
`$ npm install mocha chai chai-http axios`
`$ npm test`

### Running Scenario Test WEB

`$ cd automation-cypress`
`$ npm install npm install cypres cypres-xpath`
`$ npx cypress run`
or to run tests using a specific spec file:
`npx cypress run --spec "cypress/e2e/spec.cy.js"`
