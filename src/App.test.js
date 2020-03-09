import React from 'react';
import renderer from 'react-test-renderer';
import Landing from './Landing.js';
import Login from './Login.js';
import Home from './Home.js';
import Profile from './Profile.js';
import { MemoryRouter } from 'react-router-dom';

it('Landing renders correctly', () => {
  const tree = renderer
  	.create(
  		<MemoryRouter>
			<Landing />
		</MemoryRouter>
	).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Login renders correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Profile renders correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<Profile />
			</MemoryRouter>
		).toJSON();
	expect(tree).toMatchSnapshot();
});