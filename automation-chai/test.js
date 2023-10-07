const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const axios = require('axios');

chai.use(chaiHttp);
const baseUrl = 'https://gorest.co.in/public/v2';

describe('Todo API Test', () => {
  it('should get todos and expect the array not to be empty', async () => {
    const response = await axios.get(`${baseUrl}/todos`);

    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('array').that.is.not.empty;
    expect(response.data).to.have.lengthOf(10);
  });
});

describe('User API Test', () => {
    it('should get users and expect at least one user with status "inactive"', async () => {
        const response = await axios.get(`${baseUrl}/users`);
        expect(response.status).to.equal(200);
        const inactiveUser = response.data.find((user) => user.status === 'inactive');
        expect(inactiveUser).to.exist;
    });

    it('should get a specific inactive user', async () => {
        const response = await axios.get(`${baseUrl}/users`);
    
        expect(response.status).to.equal(200);
    
        expect(response.data).to.be.an('array');
    
        const inactiveUser = response.data.find((user) => user.status === 'inactive');
    
        expect(inactiveUser).to.exist;
        expect(inactiveUser.name).to.exist;
        expect(inactiveUser.email).to.exist;
        expect(inactiveUser.gender).to.exist;
        expect(inactiveUser.status).to.equal('inactive');
      });
});
