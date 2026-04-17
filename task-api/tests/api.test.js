//this iwll be coverign intergation test..
const request = require('supertest')
const app = require('../src/app.js');
const services  = require('../src/services/taskService.js')
describe('integration test of the APIs', () => {
    beforeEach(() => {
        services._reset();
    });
    test('POST /test - create test', async () =>{
        //here we are providing express app to the susupertest
        const res = (await request(app).post('/task')).send({title: 'task creation (api testing)'});
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('task creation (api testing)')
        

    })
})
