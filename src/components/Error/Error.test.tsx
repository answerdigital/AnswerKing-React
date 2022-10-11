import { fireEvent } from '@testing-library/react';
import { customRender } from 'custom-render';
import React from 'react';
import { Error } from './Error';

describe('Error Component', () => {
  it('should match the snapshot', () => {
    // Act
    const { asFragment } = customRender(
      <Error>
        <li>A test error</li>
      </Error>
    );

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display errors as children of a list', () => {
    // Arrange
    const testError = 'A test error';

    // Act
    const { getByTestId } = customRender(
      <Error>
        <li>{testError}</li>
      </Error>
    );
    const errorList = getByTestId('error-list');

    // Assert
    expect(errorList).toBeInTheDocument();
    expect(errorList.firstElementChild?.innerHTML).toBe(testError);
  });

  it('should not display a button when no onClear method is passed as a prop', () => {
    // Arrange
    const testError = 'A test error';

    // Act
    const { queryByTestId } = customRender(
      <Error>
        <li>{testError}</li>
      </Error>
    );

    // Assert
    expect(queryByTestId('error-clear')).toBeNull();
  });

  it('should display a button when onClear method is passed as a prop', () => {
    // Arrange
    const testError = 'A test error';

    // Act
    const { getByTestId } = customRender(
      <Error onClear={jest.fn()}>
        <li>{testError}</li>
      </Error>
    );

    // Assert
    expect(getByTestId('error-clear')).toBeInTheDocument();
  });

  it('should call onClear when clear button is clicked', () => {
    // Arrange
    const mockOnClear = jest.fn();

    // Act
    const { getByTestId } = customRender(
      <Error onClear={mockOnClear}>
        <li>A test error</li>
      </Error>
    );
    fireEvent.click(getByTestId('error-clear'));

    // Assert
    expect(mockOnClear).toHaveBeenCalled();
  });
});
