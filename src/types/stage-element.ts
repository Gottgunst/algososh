import { TArrWithId } from '../utils/arrWithMemo';
import { ElementStates } from './element-states';

export type TStageElement<S> = (props: TStageElementProps<S>) => JSX.Element;
type TStageElementProps<S> = {
  stages: S;
  lap: number;
  phase?: 'initial' | 'animate' | 'finally';
  animation?: TElementAnimation[];
};
export type TElementAnimation = {
  state: ElementStates;
  index: number;
  link: TArrWithId<number>;
};
