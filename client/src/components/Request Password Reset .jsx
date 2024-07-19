import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './RequestPasswordReset.css';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/request-password-reset', { email });
      setMessage('Password reset email sent.');
    } catch (err) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg custom-card">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Request Password Reset</h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </Card>
    </Container>
  );
};

export default RequestPasswordReset;
