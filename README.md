# Flip :: This project there are 2 parts: automation-chai (API) and automation-cypress (WEB)

###  ⏺ Requirement An Automation Testing
* Assume you have instal nodejs

Clone the repository and install all gems depedency:
```shell
$ git clone https://github.com/irwanhub2016/testing-flip.git
```

### Running Scenario Test API
```shell
$ cd automation-chai
$ npm install mocha chai chai-http axios
$ npm test
```

### Running Scenario Test WEB

```shell
$ cd automation-cypress
$ npm install npm install cypres cypres-xpath
$ npx cypress run
```

Click test_flip.cy.js then run

or to run tests using a specific spec file:
```shell
npx cypress run --spec "cypress/e2e/test_flip.cy.js"
```
