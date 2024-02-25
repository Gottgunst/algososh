import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './button';

// Тестирование компонента Button
describe('Button', () => {
  // Проверяем при помощи снэпшотов корректную отрисовку:
  // кнопки с текстом;
  it('Render with Text', () => {
    //############################## arrange
    const button = renderer.create(<Button text='Развернуть' />).toJSON();
    //############################## assert
    expect(button).toMatchSnapshot();
  });

  // кнопки без текста;
  it('Render without Text', () => {
    //############################## arrange
    const button = renderer.create(<Button />).toJSON();
    //############################## assert
    expect(button).toMatchSnapshot();
  });

  // заблокированной кнопки;
  it('Render disabled', () => {
    //############################## arrange
    const button = renderer
      .create(<Button text='Развернуть' disabled />)
      .toJSON();
    //############################## assert
    expect(button).toMatchSnapshot();
  });

  // кнопки с индикацией загрузки.
  it('Render isLoading', () => {
    //############################## arrange
    const button = renderer
      .create(<Button text='Развернуть' isLoader={true} />)
      .toJSON();
    //############################## assert
    expect(button).toMatchSnapshot();
  });

  // Проверяем корректность вызова колбека при клике на кнопку.
  it('Correct run callback onClick', () => {
    //############################## arrange
    const clearItem = jest.fn();
    render(<Button text='Очистить' onClick={clearItem} />);
    const button = screen.getByText('Очистить');

    //############################## act
    fireEvent.click(button);

    //############################## assert
    expect(clearItem).toHaveBeenCalled();
  });
});
