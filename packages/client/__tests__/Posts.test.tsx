import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';

import Posts from '../src/app/posts/page';

describe('Posts Component', () => {
    afterEach(() => {
        fetchMock.reset();
    });

    it('should render with the correct post data', async () => {
        const mockPosts = [
            { id: 1, title: 'Post 1' },
            { id: 2, title: 'Post 2' },
            { id: 3, title: 'Post 3' },
        ];

        // Mock the fetch request with sample data
        fetchMock.mock('https://jsonplaceholder.typicode.com/posts', mockPosts);

        render(<Posts />);

        // Wait for the data to be fetched and rendered
        await waitFor(() => screen.getByText('Total Post 3'));

        // Assert that the total post count is correct
        expect(screen.getByText('Total Post 3')).toBeInTheDocument();

        // Assert that each post title is correctly rendered
        mockPosts.forEach((post) => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
        });
    });



    it('should handle fetch error', async () => {
        // Mock the fetch request with an error
        fetchMock.mock('https://jsonplaceholder.typicode.com/posts', 500);

        render(<Posts />);

        // Wait for the component to handle the fetch error
        await waitFor(() => screen.getByText('Total Post 0'));
        await waitFor(() => screen.getByText('post fetch fail'));

        // Assert that the error message is rendered on the component
        expect(screen.getByText('Total Post 0')).toBeInTheDocument();
        expect(screen.getByText('post fetch fail')).toBeInTheDocument();
    });
});
