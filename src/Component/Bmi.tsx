import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Input = styled.input`
  margin: 10px;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid #fff;
  border-radius: 30px;
  width: 250px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  text-align: center;
  transition: background 0.3s, box-shadow 0.3s;

  &:focus {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1rem;
  color: #ff7e5f;
  background-color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #f1f1f1;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const Result = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #fff;
  border-radius: 30px;
  width: 250px;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-in-out;
`;

const Emoji = styled.div`
  font-size: 2rem;
  margin-top: 10px;
`;

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(2)));
    }
  };

  const getBMIStatus = () => {
    if (!bmi) return null;
    if (bmi < 18.5) {
      return { status: 'Underweight', emoji: '😢', color: '#1e90ff' };
    } else if (bmi < 24.9) {
      return { status: 'Normal weight', emoji: '😊', color: '#28a745' };
    } else if (bmi < 29.9) {
      return { status: 'Overweight', emoji: '😐', color: '#ffc107' };
    } else {
      return { status: 'Obese', emoji: '😟', color: '#dc3545' };
    }
  };

  const bmiStatus = getBMIStatus();

  return (
    <Container>
      <Title>BMI Calculator</Title>
      <Input
        type="number"
        placeholder="Height in cm"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Weight in kg"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />
      <Button onClick={calculateBMI}>Calculate BMI</Button>
      {bmi && (
        <Result style={{ borderColor: bmiStatus?.color }}>
          <h2>Your BMI is: {bmi}</h2>
          <p>Status: {bmiStatus?.status}</p>
          <Emoji>{bmiStatus?.emoji}</Emoji>
        </Result>
      )}
    </Container>
  );
};

export default BMICalculator;
