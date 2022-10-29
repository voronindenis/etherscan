import * as React from 'react';

import { Alert } from 'react-bootstrap';

interface IError {
  heading: string;
  message: React.ReactNode;
}

export const Error: React.FC<IError> = ({ heading, message }) => (
  <Alert variant='error'>
    <Alert.Heading>{heading}</Alert.Heading>
    {typeof message === 'string' ? <pre>{message}</pre> : message}
  </Alert>
);
