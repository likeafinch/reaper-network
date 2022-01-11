import React from 'react';
import tw from 'twin.macro';
import { ReaperActions } from '../utils';

const ReaperActionsWrapper = tw.div`relative flex w-full items-center justify-between px-6 sm:px-12 py-4 sm:py-8 mb-4 bg-black-link`;

const Intro = () => (
  <ReaperActionsWrapper>
    <ReaperActions />
  </ReaperActionsWrapper>
);

export default Intro;
