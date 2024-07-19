import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/reset-password/${token}`, { password });
      setMessage('Password reset successful!');
    } catch (err) {
      setMessage('Error resetting password');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg custom-card">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Reset Password</h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Reset Password
          </Button>
        </Form>
        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </Card>
    </Container>
  );
};

export default ResetPassword;
