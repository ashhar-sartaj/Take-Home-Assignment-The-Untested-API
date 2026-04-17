// this file will having all the unit tests of each task service
const services = require('../src/services/taskService.js');
// console.log('services are ', services);
describe('Task service - unit test', () => {
    beforeEach(() => {
        services._reset();

    });
    //documenting all the tests of the services 
    //test for creating a task
    test('create a task (should)', () => {
        const task = services.create({ title: 'Test Task' });

        expect(task).toHaveProperty('id');
        expect(task.title).toBe('Test Task');
        expect(task.status).toBe('todo');
    });
    //test for returning all the tasks
    test('should return all tasks', () => {
        services.create({ title: 'Task 1' });
        services.create({ title: 'Task 2' });

        const tasks = services.getAll();
        expect(tasks.length).toBe(2);
    });
    //test for finding the task by id
    test ('returnn the task (find by id)', () => {
        const task = services.create({ title: 'Find Me' });

        const found = services.findById(task.id);
        expect(found.title).toBe('Find Me');
    })
    //test to handle the fiding task if the id is invalid
    test ('shoudl be rrtuning undefined if the is is invalid', () => {
        const result = services.findById('invalid-id');
        expect(result).toBeUndefined();
    })
    //test: update should modify the task
    test ('update should be modify the task', () => {
        const task = services.create({ title: 'Old' });

        const updated = services.update(task.id, { title: 'New' });
        expect(updated.title).toBe('New');
    })
    //test: update should be returning null if the id entered is invalid
    test('update should return null for invalid id (edge case)', () => {
        const result = services.update('wrong-id', { title: 'X' });
        expect(result).toBeNull();
    });
    //test: for deleting the task
    test('remove should delete task', () => {
        const task = services.create({ title: 'Delete me' });

        const result = services.remove(task.id);
        expect(result).toBe(true);
        expect(services.getAll().length).toBe(0);
    });
    //test: return false if the task is not found.
    test('remove should return false if task not found', () => {
        const result = services.remove('wrong-id');
        expect(result).toBe(false);
    });
    //test: marks as done if the tas is complete
    test('completeTask should mark task as done', () => {
        const task = services.create({ title: 'Complete me' });

        const completed = services.completeTask(task.id);
        expect(completed.status).toBe('done');
        expect(completed.completedAt).not.toBeNull();
    });

    test('pagination should return correct slice', () => {
        for (let i = 0; i < 5; i++) {
            services.create({ title: `Task ${i}` });
        }

        const page = services.getPaginated(0, 2);
        expect(page.length).toBe(2);
    });
}) 
