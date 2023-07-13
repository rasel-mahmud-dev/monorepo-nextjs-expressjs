import request from 'supertest';
import app from '../app/app';
import fs from 'fs';
import {text} from "express";

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
        expect(response.body.token).toBeTruthy();
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



    test("Get /auth-validate should return 403 because expired token", async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjg5MjM0ODQ2LCJleHAiOjE2ODkyMzQ4NTZ9.1k8KEjnZwMNjbPQf4RPe8j8m9ygTqwgyl1XiB0-unY8"
        const response = await request(app)
            .get('/auth-validate')
            .set('token', token)

        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            message: "Please login again"
        });
    });



});



describe('File upload', function () {

    test("upload a single file", async ()=>{
        jest.mock('fs');

        const response = await request(app).post("/upload").attach("image", Buffer.from("text cotnent sdkfjs kldjflks djflsd j", "utf-8"), {
            filename: "test.file.txt"
        })

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'File upload success' });
    })


    test("upload a  big single file", async ()=>{
        jest.mock('fs');

        const response = await request(app).post("/upload").attach("image", Buffer.alloc(10 * 1024 * 1024, "asdfasd asdfsd", "utf-8"), {
            filename: "test.file.txt"
        })

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'File upload success' });
    })


})