import { default as loadable } from './LoadableBase';

export { default as Layout } from './Layout';
export const Button = loadable(() => import('./Button'));
export const ReaperForm = loadable(() => import('./ReaperForm'));
export const ContactForm = loadable(() => import('./ContactForm'));
export const Input = loadable(() => import('./Input'));
export const Textarea = loadable(() => import('./Textarea'));
export const Header = loadable(() => import('./Header'));
export const Navigation = loadable(() => import('./Navigation'));
export const Section = loadable(() => import('./Section'));
export const About = loadable(() => import('./About'));
export const Intro = loadable(() => import('./Intro'));
