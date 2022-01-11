import tw, { styled, css } from 'twin.macro';
import { keyframes } from '@emotion/react';
import {
  ReaperStepOneImage,
  ReaperStepTwoImage,
  ReaperStepThreeImage,
} from '../assets';

const fadeBackground = keyframes`
	from {
		opacity: .5;
	}
	to {
		opacity: 1;
	}
`;

export const fade = css`
  ${fadeBackground} 2s ease-in;
`;

const reaperFrames = keyframes`
  0% {
    background-image: url(${ReaperStepOneImage});
    opacity: .5;
  }
  12.5% {
    background-image: url(${ReaperStepOneImage});
    opacity: 1;
  }
  25% {
    background-image: url(${ReaperStepOneImage});
    opacity: .5;
  }
  37.5% {
    background-image: url(${ReaperStepTwoImage});
    opacity: .5;
  }
  50% {
    background-image: url(${ReaperStepTwoImage});
    opacity: 1;
  }
  62.5% {
    background-image: url(${ReaperStepTwoImage});
    opacity: .5;
  }
  75% {
    background-image: url(${ReaperStepThreeImage});
    opacity: .5;
  }
  87.5% {
    background-image: url(${ReaperStepThreeImage});
    opacity: 1;
  }
  100% {
    background-image: url(${ReaperStepThreeImage});
    opacity: .5;
  }
`;

export const ReaperActions = styled.div`
  ${tw`relative w-full h-96 bg-right bg-center bg-contain bg-no-repeat mt-auto`}
  transition: background-image 2s ease-in-out,opacity .2s ease-in-out;
  animation: ${reaperFrames} linear 2s infinite;
  background-image: url(${ReaperStepOneImage});
`;
