import React from 'react';
import PropTypes from 'prop-types';
import tw, { styled } from 'twin.macro';

const SectionWrapper = styled.div`
  ${tw`relative flex-col items-center justify-center w-full h-screen`}
  display: ${(props) => (props.showSection ? 'flex' : 'none')};
  opacity: ${(props) => (props.showSection ? 1 : 0)};
  transform: translateY(${(props) => (props.showSection ? 0 : 0.25)}rem);
  transition: transform 0.325s ease-in-out, filter 0.325s ease-in-out,
    opacity 0.325s ease-in-out, -webkit-transform 0.325s ease-in-out,
    -webkit-filter 0.325s ease-in-out;
  background-image: radial-gradient(rgba(0, 0, 0, 0.25) 25%, transparent 55%);
`;

const SectionInner = styled.div`
  ${tw`relative flex-col items-center px-5 md:px-8 pb-6 pt-8 md:pb-6 md:pt-10 bg-black-link rounded text-main text-base tracking-paragraph`}
  display: ${(props) => (props.showSection ? 'flex' : 'none')};
  opacity: ${(props) => (props.showSection ? 0.9 : 0)};
  transform: scale(${(props) => (props.showSection ? 1 : 0.95)});
  z-index: ${(props) => (props.showSection ? 10 : -1)};
  width: 42rem;
  transition: opacity 0.325s ease-in-out, transform 0.325s ease-in-out,
    -webkit-transform 0.325s ease-in-out;
  min-height: 50vh;
  height: max-content;
  justify-content: ${({ justifyEvenly }) =>
    justifyEvenly ? 'space-evenly' : 'flex-start'};
  @media (max-width: 700px) {
    width: 95%;
  }
`;

const SectionTitle = tw.h2`relative text-main border-b border-main mb-8 pb-2 text-2xl tracking-title mr-auto uppercase`;

const CloseButton = styled.button`
  ${tw`absolute z-20 top-2 right-2 flex items-center justify-center h-10 w-10 border-none shadow-none bg-transparent rounded-full`}
  transition: background-color .2s ease-in-out,color .2s ease-in-out;
  p {
    ${tw`relative h-full w-full text-center uppercase text-lg text-main font-bold leading-10`}
    transform: scaleX(1.5);
  }
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.075);
  }
`;

const Section = (props) => {
  const { name, active, children, handleClose, justifyEvenly } = props;
  if (name === active) {
    return (
      <SectionWrapper showSection>
        <SectionInner showSection justifyEvenly={justifyEvenly}>
          <CloseButton onClick={handleClose}>
            <p>X</p>
          </CloseButton>
          <SectionTitle>{name}</SectionTitle>
          {children}
        </SectionInner>
      </SectionWrapper>
    );
  }
  return <SectionWrapper />;
};
Section.propTypes = {
  active: PropTypes.string,
  children: PropTypes.any,
  name: PropTypes.string,
  handleClose: PropTypes.func,
  justifyEvenly: PropTypes.bool,
};

export default Section;
