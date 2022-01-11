import React from 'react';
import tw, { styled } from 'twin.macro';
import { aboutCopy } from '../utils';
import { ReapedImage } from '../assets';

const AboutSubTitle = tw.h2`relative text-lg md:text-xl text-main font-thin uppercase tracking-paragraph sm:tracking-title flex justify-center items-center h-full w-auto`;
const AboutParagraph = tw.p`relative text-sm md:text-base text-main mb-3 font-thin uppercase tracking-paragraph w-full`;
const AboutTitleWrapper = tw.div`absolute top-32 sm:top-36 flex w-full items-center justify-between px-6 md:px-12 py-4 md:py-8 bg-black-link`;
const AboutParagraphWrapper = tw.div`relative mt-48 sm:mt-60 flex flex-col flex-grow w-full items-center justify-between`;
const AboutImage = styled.div`
  ${tw`relative flex items-center justify-center h-32 w-32 bg-center bg-contain bg-no-repeat ml-4`}
  background-image: url(${ReapedImage});
  min-width: 8rem;
`;

const About = () => (
  <>
    <AboutTitleWrapper>
      <AboutSubTitle>{aboutCopy.subtitle}</AboutSubTitle>
      <AboutImage />
    </AboutTitleWrapper>
    <AboutParagraphWrapper>
      {aboutCopy.paragraphs.map((p) => (
        <AboutParagraph key={p}>{p}</AboutParagraph>
      ))}
    </AboutParagraphWrapper>
  </>
);

export default About;
