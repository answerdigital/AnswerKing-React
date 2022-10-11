import { fireEvent } from '@testing-library/react';
import { customRender } from 'custom-render';
import React from 'react';
import { OrderLoadForm } from './OrderLoadForm';

// I'd like to have placed this inside the actual test, but jest says NO.
const mockGetOrderMutate = jest.fn();
const mockGetOrderReset = jest.fn();
jest.mock('hooks/useOrder', () => {
  return {
    useOrder: () => {
      return {
        getOrder: {
          mutate: mockGetOrderMutate,
          reset: mockGetOrderReset,
        },
      };
    },
  };
});

describe('OrderLoadForm component', () => {
  it('should match the snapshot', () => {
    // Act
    const { asFragment } = customRender(<OrderLoadForm />);

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display an error when an invalid id is entered', () => {
    // Arrange
    const testId = 'invalid';

    // Act
    const { getByTestId } = customRender(<OrderLoadForm />);
    fireEvent.change(getByTestId('order-load-id-input'), { target: { value: testId } });
    fireEvent.click(getByTestId('order-load-submit-button'));

    // Assert
    expect(getByTestId('error-list')).toBeInTheDocument();
  });

  it('should display an error when no id is entered', () => {
    // Arrange
    const testId = '';

    // Act
    const { getByTestId } = customRender(<OrderLoadForm />);
    fireEvent.change(getByTestId('order-load-id-input'), { target: { value: testId } });
    fireEvent.click(getByTestId('order-load-submit-button'));

    // Assert
    expect(getByTestId('error-list')).toBeInTheDocument();
  });

  it('should fire an API request when a valid id is entered', () => {
    // Arrange
    const testId = '1';
    mockGetOrderMutate.mockReset();

    // Act
    const { getByTestId } = customRender(<OrderLoadForm />);
    fireEvent.change(getByTestId('order-load-id-input'), { target: { value: testId } });
    fireEvent.click(getByTestId('order-load-submit-button'));

    // Assert
    expect(mockGetOrderMutate).toHaveBeenCalledTimes(1);
  });
});
