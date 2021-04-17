import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RegisterForm } from '../../src/components/containers/';
import mountComponent from '../utils/mountComponent';

describe('<RegisterForm />', () => {
  beforeEach(() => {
    mountComponent(<RegisterForm />);
  });

  test('show & hide incorrect format email message', async () => {
    require('dotenv').config();
    console.log(process.env.API_KEY);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const registerButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'admin@gmail.c' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(registerButton);

    let errorMessage;
    await waitFor(() => {
      errorMessage = screen.getByText(
        'You should fill the inputs with the correct format'
      ).parentElement;
    });

    const hasShowMessageClass = errorMessage.className.includes('ShowMessage');

    fireEvent.click(errorMessage);

    const hasHideMessageClass = errorMessage.className.includes('HideMessage');

    expect(errorMessage).toBeInTheDocument();
    expect(hasShowMessageClass).toBe(true);
    expect(hasHideMessageClass).toBe(true);
  });
});
