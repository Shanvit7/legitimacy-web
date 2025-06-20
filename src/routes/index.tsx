import { createFileRoute } from '@tanstack/react-router';
// PAGES
import LandingPage from '../pages/landing';


export const Route = createFileRoute('/')({
  component: LandingPage,
});