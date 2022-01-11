import React from 'react';
import {
  Layout,
  Header,
  Section,
  ReaperForm,
  ContactForm,
  About,
  Intro,
} from '../components';

// ========================
const IndexPage = () => {
  const [active, setActive] = React.useState('');
  const handleButtonClick = (name) => setActive(name);
  const handleClose = () => setActive('');
  return (
    <Layout>
      <Header active={active} handleButtonClick={handleButtonClick} />
      <Section
        justifyEvenly
        active={active}
        handleClose={handleClose}
        name="intro"
      >
        <Intro />
      </Section>
      <Section active={active} handleClose={handleClose} name="reaper">
        <ReaperForm />
      </Section>
      <Section active={active} handleClose={handleClose} name="about">
        <About />
      </Section>
      <Section active={active} handleClose={handleClose} name="contact">
        <ContactForm />
      </Section>
    </Layout>
  );
};

export default IndexPage;
