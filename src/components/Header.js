import PropTypes from 'prop-types';
import React from 'react';
import { default as Navigation } from './Navigation';
import { useMetaMask } from '../hooks';
import { ReaperImage } from '../assets';
import tw, { styled } from 'twin.macro';

const ReaperWrapper = styled.div`
  ${tw`relative flex-col items-center justify-center w-full md:w-2/3 h-screen`}
  display: ${(props) => (props.showHeader ? 'flex' : 'none')};
  opacity: ${(props) => (props.showHeader ? 1 : 0)};
  transform: translateY(${(props) => (props.showHeader ? 0 : 0.25)}rem);
  transition: transform 0.325s ease-in-out, filter 0.325s ease-in-out,
    opacity 0.325s ease-in-out, -webkit-transform 0.325s ease-in-out,
    -webkit-filter 0.325s ease-in-out;
  background-image: radial-gradient(rgba(0, 0, 0, 0.25) 25%, transparent 55%);
`;

const ReaperLogoWrapper = styled.div`
  ${tw`relative flex items-center justify-center h-24 w-24 p-1 bg-contain bg-top bg-no-repeat border border-main rounded-full hover:cursor-pointer`}
  margin-bottom: -1px;
`;
const ReaperImg = tw.img`relative w-full h-auto`;

const ReaperHeader = styled.div`
  ${tw`relative flex flex-col items-center justify-center h-52 border-t border-b border-main py-12 px-8 my-14`}
  transition: max-height .75s ease,padding .75s ease,opacity .325s ease-in-out;
  transition-delay: 0.25s;
  max-height: 40rem;
  width: 42rem;
  @media (max-width: 700px) {
    width: 100%;
  }
  &:before,
  &:after {
    ${tw`absolute h-14 bg-main`}
    content: " ";
    width: 1px;
    left: calc(50% - 0.5px);
  }
  &:before {
    ${tw`-top-14`}
  }
  &:after {
    ${tw`-bottom-14`}
  }
`;
const ReaperTitle = tw.h1`relative text-2xl md:text-4xl text-main font-bold text-center mb-4 uppercase tracking-title`;
const ReaperParagraph = tw.p`relative text-xs md:text-sm text-main text-center font-thin uppercase tracking-paragraph`;

const Header = ({ children, active, handleButtonClick }) => {
  const { requestAccount } = useMetaMask();
  if (active === '') {
    return (
      <ReaperWrapper showHeader>
        <ReaperLogoWrapper onClick={requestAccount}>
          <ReaperImg src={ReaperImage} alt="reaper logo" />
        </ReaperLogoWrapper>
        <ReaperHeader>
          <ReaperTitle>Reaper Network</ReaperTitle>
          <ReaperParagraph>
            {`Pseudo Burn ERC-721 [Non Fungible Tokens] mints and receive a Reaper
        confirmation token`}
          </ReaperParagraph>
        </ReaperHeader>
        <Navigation handleButtonClick={handleButtonClick} />
      </ReaperWrapper>
    );
  }
  return <ReaperWrapper />;
};

Header.propTypes = {
  active: PropTypes.string,
  children: PropTypes.any,
  handleButtonClick: PropTypes.func,
};

export default Header;
