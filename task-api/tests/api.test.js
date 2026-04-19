//this iwll be coverign intergation test..
const request = require('supertest')
const app = require('../src/app.js');
const services  = require('../src/services/taskService.js')
describe('integration test of the APIs', () => {
    beforeEach(() => {
        services._reset();
    });
    test('POST /tasks - create task', async () =>{
        //here we are providing express app to the susupertest
        const res = await request(app).post('/tasks').send({title: 'task creation (api testing)'});
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('task creation (api testing)')
    })
    test ('GET /tasks - return all the tasks', async () => {
        //first we will craete a task
        await request(app).post('/tasks').send({title: 'task 1'});
        //then will retrieve all the tasks
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    })
    //getttign the tasks by id
    test('GET /tasks/:id - for valid id', async () => {
        //created a task using post request.
        const create = await request(app).post('/tasks').send({title: 'task 1'});
        //fetching the task
        const res = await request(app).get(`/tasks/${create.body.id}`);
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe('task 1')
    })
    test('GET /tasks/:id - for invalid id', async () => {
        const res = await request(app).get('/tasks/invalid-id');
        expect(res.statusCode).toBe(404);
    })
    test('DELETE /tasks/:id - delete specifc task', async () => {
        //creating a task
        const create = await request(app).post('/tasks').send ({title: 'taks to be deleted'});
        const res = await request(app).delete(`/tasks/${create.body.id}`);
        expect(res.statusCode).toBe(200)
    })
    //trying to delte the task which is invalid id
    test('DELETE /tasks/:id - invalid id (edge case)', async () => {
        const res = await request(app).delete('/tasks/wrong-id');

        expect(res.statusCode).toBe(404);
    });
})

