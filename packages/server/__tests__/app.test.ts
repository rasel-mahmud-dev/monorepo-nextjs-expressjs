import request from 'supertest';
import app from '../app/app';

test('GET / should return "Hi there!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hi there!');
});

describe('Authentication', function () {

    let token = ""
    test("POST /login should return user and token", async () => {
        const response = await request(app)
            .post('/login')
            .send({email: "test@gmail.com", password: "123"})


        token = response.body.token
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            email: "test@gmail.com",
            password: "123"
        });
    });

    test("Get /auth-validate should return 403 because missing header token ", async () => {
        const response = await request(app).get('/auth-validate')

        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            message: "Please provide authentication token"
        });
    });


    test("Get /auth-validate should current logged user", async () => {
        const response = await request(app)
            .get('/auth-validate')
            .set('token', token)

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                email: "test@gmail.com",
            },
            message: "User successfully logged"
        });
    });


});
