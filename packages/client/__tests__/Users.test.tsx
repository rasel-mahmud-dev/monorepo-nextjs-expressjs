
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Users from "../src/app/users/page";

// Create a mock store
const mockStore = configureMockStore([thunk]);
const store = mockStore({
    userState: {
        users: [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }],
    },
});


// Create a mock fetchUsersAction
const mockFetchUsersAction = jest.fn().mockResolvedValue([{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }]);

jest.mock('@/store/actions', () => ({
    fetchUsersAction: mockFetchUsersAction,
}));


describe('Page Component', () => {
    it('should render the user list', () => {
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );

        expect(screen.getByText('Users List 2')).toBeInTheDocument();
        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
    });

    it('should dispatch fetchUsersAction on mount', async () => {
        // Create a new mock store to track dispatched actions
        const dispatchMockStore = mockStore({
            userState: { users: [] },
        });

        render(
            <Provider store={dispatchMockStore}>
                <Users />
            </Provider>
        );


        // After rendering, we wait for the fetchUsersAction to be dispatched and the state to be updated
        await waitFor(() => expect(mockFetchUsersAction).toHaveBeenCalledTimes(1));

        // We can also check if the component renders the correct content after the fetchUsersAction is completed
        expect(screen.getByText('Users List 2')).toBeInTheDocument();
        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
    });
});
