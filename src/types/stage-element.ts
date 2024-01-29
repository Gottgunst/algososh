export type TStageElement<S> = (props: TStageElementProps<S>) => JSX.Element;
type TStageElementProps<S> = {
  stages: S;
  lap: number;
  phase?: 'initial' | 'animate' | 'finally';
};
