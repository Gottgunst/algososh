import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

// Проверяем при помощи снэпшотов корректную отрисовку элемента:
describe('Circle', () => {
  // без буквы;
  it('Render without letter', () => {
    //############################## arrange
    const circle = renderer.create(<Circle />).toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // с буквами;
  it('Render with letter', () => {
    //############################## arrange
    const circle = renderer.create(<Circle letter='A' />).toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // с head;
  it('Render with head', () => {
    //############################## arrange
    const circle = renderer.create(<Circle letter='A' head='Top' />).toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // с react-элементом в head;
  it('Render with head Node', () => {
    //############################## arrange
    const headNode = <a href='ya.ru'>42</a>;
    const circle = renderer
      .create(<Circle letter='A' head={headNode} />)
      .toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // с tail;
  it('Render with tail', () => {
    //############################## arrange
    const circle = renderer.create(<Circle letter='A' tail='Top' />).toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // с react-элементом в tail;
  it('Render with tail Node', () => {
    //############################## arrange
    const tailNode = <a href='ya.ru'>42</a>;
    const circle = renderer
      .create(<Circle letter='A' tail={tailNode} />)
      .toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // с index;
  it('Render with index', () => {
    //############################## arrange
    const circle = renderer.create(<Circle letter='A' index={42} />).toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // с пропом isSmall ===  true;
  it('Render isSmall === true', () => {
    //############################## arrange
    const circle = renderer.create(<Circle letter='A' isSmall />).toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // в состоянии default;
  it('Render state — Default', () => {
    //############################## arrange
    const circle = renderer
      .create(<Circle letter='A' state={ElementStates.Default} />)
      .toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // в состоянии changing;
  it('Render state — Changing', () => {
    //############################## arrange
    const circle = renderer
      .create(<Circle letter='A' state={ElementStates.Changing} />)
      .toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });

  // в состоянии modified.
  it('Render state — Modified', () => {
    //############################## arrange
    const circle = renderer
      .create(<Circle letter='A' state={ElementStates.Modified} />)
      .toJSON();
    //############################## assert
    expect(circle).toMatchSnapshot();
  });
});
