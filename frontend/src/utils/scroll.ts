/** Smoothly scrolls to a section by its DOM id. */
export const scrollToSection = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
