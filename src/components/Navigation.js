import React from 'react';
import PropTypes from 'prop-types';
import tw, { styled } from 'twin.macro';

const NavigationWrapper = styled.ul`
  ${tw`relative flex items-center justify-evenly list-none w-full md:w-4/5 lg:w-3/5 max-w-md h-12 rounded border border-main divide-x`}
  margin-top: -1px;
  margin-right: 1px;
`;

const NavigationButtonWrapper = tw.li`relative flex items-center justify-center h-full w-1/4`;

const NavigationButton = styled.button`
  ${tw`relative flex items-center justify-center h-full w-full border-none shadow-none uppercase tracking-paragraph text-sm text-main font-thin bg-transparent`}
  transition: background-color .2s ease-in-out,color .2s ease-in-out;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.075);
  }
`;

const NavigationItem = (props) => {
  const { name, handleButtonClick } = props;
  const handleClick = () => handleButtonClick(name);
  return (
    <NavigationButtonWrapper>
      <NavigationButton onClick={handleClick}>{name}</NavigationButton>
    </NavigationButtonWrapper>
  );
};

NavigationItem.propTypes = {
  handleButtonClick: PropTypes.func,
  name: PropTypes.string,
};

const Navigation = (props) => {
  const { handleButtonClick, sectionNames } = props;
  const NavigationItems = sectionNames.map((name) => (
    <NavigationItem
      key={name}
      name={name}
      handleButtonClick={handleButtonClick}
    />
  ));
  return <NavigationWrapper>{NavigationItems}</NavigationWrapper>;
};

Navigation.propTypes = {
  sectionNames: PropTypes.array,
  handleButtonClick: PropTypes.func,
};

Navigation.defaultProps = {
  sectionNames: ['intro', 'reaper', 'about', 'contact'],
};

export default Navigation;
